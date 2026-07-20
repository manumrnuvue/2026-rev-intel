// Vercel Node serverless function — proxies chat to Azure OpenAI.
// Keeps the API key server-side only; the browser never sees it.
//
// Required env vars (set in the Vercel project, never committed):
//   AZURE_OPENAI_ENDPOINT     e.g. https://your-resource.openai.azure.com
//   AZURE_OPENAI_API_KEY
//   AZURE_OPENAI_DEPLOYMENT   the chat model deployment name
//   AZURE_OPENAI_API_VERSION  optional, defaults below
//
// The actual logic (guardrails + Azure call) lives in ./_chat-core so the
// Vite dev-server middleware (vite.config.ts) can run the exact same code
// locally under `npm run dev` — this file is just the Vercel adapter.

import { getClientIp, handleChat } from "./_chat-core";

interface VercelReq {
    method?: string;
    headers: Record<string, string | string[] | undefined>;
    body: unknown;
}
interface VercelRes {
    status: (code: number) => VercelRes;
    json: (body: unknown) => void;
}

export default async function handler(req: VercelReq, res: VercelRes) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    let body: unknown;
    try {
        body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    } catch {
        res.status(400).json({ error: "Invalid request body." });
        return;
    }

    const ip = getClientIp(req.headers);
    const result = await handleChat(ip, body);
    res.status(result.status).json(result.body);
}
