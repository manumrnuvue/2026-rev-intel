// Best-effort persistence for chat transcripts, read back by the daily digest
// cron (app/api/cron/chat-digest/route.ts) and emailed out.
//
// Writes to the OS temp dir rather than the project directory — on
// serverless hosts (Vercel) only /tmp is writable at runtime. This means logs
// don't survive a cold start/redeploy indefinitely, which is fine for a
// same-day digest but is NOT durable storage — swap for a real datastore if
// you need history beyond "today."

import { appendFile, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export type ChatLogEntry = {
    time: string;
    ip: string;
    userMessage: string;
    reply: string;
    source: "deterministic" | "llm" | "guardrail" | "error";
    suggestedPage?: { path: string; label: string } | null;
};

const LOG_DIR = join(tmpdir(), "nuvae-chat-logs");

function fileFor(date: string): string {
    return join(LOG_DIR, `${date}.jsonl`);
}

export function todayUtc(): string {
    return new Date().toISOString().slice(0, 10);
}

export async function logChatInteraction(entry: ChatLogEntry): Promise<void> {
    try {
        await mkdir(LOG_DIR, { recursive: true });
        await appendFile(fileFor(todayUtc()), JSON.stringify(entry) + "\n", "utf8");
    } catch (err) {
        // Never let logging failures break the chat response.
        console.error("[chat-log] append failed", err);
    }
}

export async function readChatLog(date: string): Promise<ChatLogEntry[]> {
    try {
        const raw = await readFile(fileFor(date), "utf8");
        return raw
            .split("\n")
            .filter(Boolean)
            .map((line) => {
                try {
                    return JSON.parse(line) as ChatLogEntry;
                } catch {
                    return null;
                }
            })
            .filter((e): e is ChatLogEntry => e !== null);
    } catch {
        return [];
    }
}

export async function clearChatLog(date: string): Promise<void> {
    try {
        await rm(fileFor(date), { force: true });
    } catch (err) {
        console.error("[chat-log] clear failed", err);
    }
}
