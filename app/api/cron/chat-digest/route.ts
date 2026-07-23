import nodemailer from "nodemailer";
import { clearChatLog, readChatLog, todayUtc, type ChatLogEntry } from "../../../../src/server/chat-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Where the daily chat-interaction digest is sent (internal — never shown on
// the site). Falls back to the same inbox contact-form leads go to.
const CHATLOG_TO = process.env.CHATLOG_TO || process.env.CONTACT_TO || "manu@nuvae.ai";
const CONTACT_FROM = process.env.CONTACT_FROM || "Nuvae Website <no-reply@nuvae.ai>";

function esc(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildEmail(date: string, entries: ChatLogEntry[]) {
    const text = entries
        .map(
            (e, i) =>
                `#${i + 1} [${e.time}] (${e.source}, ip ${e.ip})\nUser: ${e.userMessage}\nNova: ${e.reply}` +
                (e.suggestedPage ? `\nSuggested: ${e.suggestedPage.label} (${e.suggestedPage.path})` : ""),
        )
        .join("\n\n");

    const rows = entries
        .map(
            (e) => `
        <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;color:#666;font-size:12px;white-space:nowrap">${esc(e.time)}<br/><span style="text-transform:uppercase">${esc(e.source)}</span></td>
            <td style="padding:8px;border-bottom:1px solid #eee">${esc(e.userMessage)}</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${esc(e.reply)}</td>
        </tr>`,
        )
        .join("");

    const html = `
        <h2 style="margin:0 0 4px">Nova chat digest — ${esc(date)}</h2>
        <p style="color:#666;font-size:13px;margin:0 0 16px">${entries.length} interaction${entries.length === 1 ? "" : "s"}</p>
        <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:13px;width:100%">
            <thead>
                <tr style="text-align:left">
                    <th style="padding:8px;border-bottom:2px solid #ccc">When</th>
                    <th style="padding:8px;border-bottom:2px solid #ccc">User</th>
                    <th style="padding:8px;border-bottom:2px solid #ccc">Nova</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;

    return { text: `Nova chat digest — ${date} (${entries.length} interactions)\n\n${text}`, html };
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const secret = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || searchParams.get("secret");

    if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
        return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const date = searchParams.get("date") || todayUtc();
    const force = searchParams.get("force") === "1";

    const entries = await readChatLog(date);
    if (entries.length === 0 && !force) {
        return Response.json({ ok: true, date, count: 0, sent: false });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    if (!host || !user || !pass) {
        console.error("[chat-digest] SMTP not configured — digest not sent", { date, count: entries.length });
        return Response.json({ ok: false, error: "Email is not configured." }, { status: 500 });
    }

    try {
        const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
        const { text, html } = buildEmail(date, entries);

        await transporter.sendMail({
            from: CONTACT_FROM,
            to: CHATLOG_TO,
            subject: `Nova chat digest — ${date} (${entries.length})`,
            text,
            html,
        });

        await clearChatLog(date);
        return Response.json({ ok: true, date, count: entries.length, sent: true });
    } catch (err) {
        console.error("[chat-digest] sendMail failed", err);
        return Response.json({ ok: false, error: "Failed to send digest." }, { status: 502 });
    }
}
