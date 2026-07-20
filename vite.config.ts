import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { getClientIp, handleChat } from "./api/_chat-core";

// Vite's dev server only serves static files — it has no concept of the
// /api/*.ts serverless functions Vercel provides in production. This plugin
// adds a matching /api/chat route to the dev server, backed by the exact
// same handler (api/_chat-core.ts) the Vercel function calls, so `npm run
// dev` behaves like the deployed site instead of 404ing on every message.
function apiChatDevMiddleware(env: Record<string, string>): Plugin {
    const handleRequest = async (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) => {
        if (req.method !== "POST") {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
        }

        for (const key of ["AZURE_OPENAI_ENDPOINT", "AZURE_OPENAI_API_KEY", "AZURE_OPENAI_DEPLOYMENT", "AZURE_OPENAI_API_VERSION"]) {
            if (env[key] && !process.env[key]) process.env[key] = env[key];
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        let body: unknown = {};
        try {
            body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
        } catch {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid request body." }));
            return;
        }

        const ip = getClientIp(req.headers as Record<string, string | string[] | undefined>);
        const result = await handleChat(ip, body);

        res.statusCode = result.status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result.body));
    };

    return {
        name: "api-chat-dev-middleware",
        configureServer(server) {
            server.middlewares.use("/api/chat", handleRequest);
        },
        configurePreviewServer(server) {
            server.middlewares.use("/api/chat", handleRequest);
        },
    };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), apiChatDevMiddleware(env)],
        server: {
            port: 5180,
        },
    };
});
