import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Where demo requests are delivered. Internal recipient — never exposed to the
// client. Override in the environment; falls back to the sales inbox alias.
const CONTACT_TO = process.env.CONTACT_TO || "manu@nuvae.ai";
const CONTACT_FROM = process.env.CONTACT_FROM || "Nuvae Website <no-reply@nuvae.ai>";

type Payload = {
    fullName?: unknown;
    workEmail?: unknown;
    organization?: unknown;
    phone?: unknown;
    role?: unknown;
    message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strip CR/LF so field values can't inject extra mail headers, and cap length.
function clean(v: unknown, max = 2000): string {
    return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function esc(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
    let raw: Payload;
    try {
        raw = (await req.json()) as Payload;
    } catch {
        return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    const fullName = clean(raw.fullName, 200);
    const workEmail = clean(raw.workEmail, 200);
    const organization = clean(raw.organization, 300);
    const phone = clean(raw.phone, 60);
    const role = clean(raw.role, 120);
    const message = clean(raw.message, 4000);

    if (!fullName || !workEmail || !organization) {
        return Response.json(
            { ok: false, error: "Please fill in name, work email, and organization." },
            { status: 400 },
        );
    }
    if (!EMAIL_RE.test(workEmail)) {
        return Response.json({ ok: false, error: "Please enter a valid work email." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    if (!host || !user || !pass) {
        // Don't lose the lead if mail isn't wired up yet in this environment.
        console.error("[contact] SMTP not configured — submission not emailed", {
            fullName,
            workEmail,
            organization,
        });
        return Response.json(
            { ok: false, error: "The demo request could not be sent right now. Please email us directly." },
            { status: 500 },
        );
    }

    const rows: Array<[string, string]> = [
        ["Full name", fullName],
        ["Work email", workEmail],
        ["Organization", organization],
        ["Phone", phone || "—"],
        ["Role", role || "—"],
        ["Message", message || "—"],
    ];

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    const html = `
        <h2 style="margin:0 0 12px">New demo request — Nuvae.ai</h2>
        <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
            ${rows
                .map(
                    ([k, v]) =>
                        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><b>${esc(
                            k,
                        )}</b></td><td style="padding:4px 0">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
                )
                .join("")}
        </table>
    `;

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        });

        await transporter.sendMail({
            from: CONTACT_FROM,
            to: CONTACT_TO,
            replyTo: `${fullName} <${workEmail}>`,
            subject: `Demo request — ${fullName} (${organization})`,
            text,
            html,
        });

        return Response.json({ ok: true });
    } catch (err) {
        console.error("[contact] sendMail failed", err);
        return Response.json(
            { ok: false, error: "The demo request could not be sent right now. Please try again." },
            { status: 502 },
        );
    }
}
