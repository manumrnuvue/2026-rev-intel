import { getClientIp, handleChat } from "../../../src/server/chat-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const headers = Object.fromEntries(req.headers.entries());
    const ip = getClientIp(headers);
    const result = await handleChat(ip, body);
    return Response.json(result.body, { status: result.status });
}
