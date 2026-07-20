import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, X } from "lucide-react";

type Role = "user" | "assistant";
type ChatMessage = {
    role: Role;
    content: string;
    suggestedPage?: { path: string; label: string } | null;
    error?: boolean;
};

const MAX_INPUT_LEN = 1500;

const GREETING: ChatMessage = {
    role: "assistant",
    content:
        "Hi, I'm Nova — ask me anything about Nuvae: the product, pricing, or security. For anything urgent, use the Contact page.",
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, open, sending]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    async function send() {
        const text = input.trim().slice(0, MAX_INPUT_LEN);
        if (!text || sending) return;

        const history = [...messages, { role: "user" as const, content: text }];
        setMessages(history);
        setInput("");
        setSending(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: history
                        .filter((m) => !m.error)
                        .map((m) => ({ role: m.role, content: m.content })),
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "The assistant is temporarily unavailable.");
            }

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply, suggestedPage: data.suggestedPage ?? null },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    error: true,
                    content:
                        err instanceof Error
                            ? err.message
                            : "The assistant is temporarily unavailable — try again shortly, or use the Contact page.",
                },
            ]);
        } finally {
            setSending(false);
        }
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }

    return (
        <div className="chatw">
            {open && (
                <div className="chatw-panel glass" role="dialog" aria-label="Chat with Nova, the Nuvae assistant">
                    <div className="chatw-head">
                        <div>
                            <b>Nova</b>
                            <span>Nuvae assistant</span>
                        </div>
                        <button className="chatw-close" onClick={() => setOpen(false)} aria-label="Close chat">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="chatw-body" ref={scrollRef}>
                        {messages.map((m, i) => (
                            <div className={`chatw-msg ${m.role} ${m.error ? "error" : ""}`} key={i}>
                                <p>{m.content}</p>
                                {m.suggestedPage && (
                                    <Link className="chatw-suggest" to={m.suggestedPage.path} onClick={() => setOpen(false)}>
                                        {m.suggestedPage.label} →
                                    </Link>
                                )}
                            </div>
                        ))}
                        {sending && (
                            <div className="chatw-msg assistant">
                                <span className="chatw-typing">
                                    <i />
                                    <i />
                                    <i />
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="chatw-input-row">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LEN))}
                            onKeyDown={onKeyDown}
                            placeholder="Ask about Nuvae..."
                            rows={1}
                            maxLength={MAX_INPUT_LEN}
                        />
                        <button
                            className="chatw-send"
                            onClick={send}
                            disabled={sending || !input.trim()}
                            aria-label="Send message"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                    <p className="chatw-disclaimer">
                        AI assistant — verify anything important. For sales or support,{" "}
                        <Link to="/contact" onClick={() => setOpen(false)}>
                            contact us directly
                        </Link>
                        .
                    </p>
                </div>
            )}

            <button
                className="chatw-bubble"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close chat" : "Open chat with Nova"}
                aria-expanded={open}
            >
                {open ? <X size={22} /> : <MessageCircle size={22} />}
            </button>
        </div>
    );
}
