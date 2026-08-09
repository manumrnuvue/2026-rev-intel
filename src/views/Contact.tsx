"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const ROLES = [
    "Revenue cycle / RCM leader",
    "Finance / CFO",
    "Operations",
    "IT / Integration",
    "Clinical",
    "Other",
];

const BENEFITS = [
    "How AI agents automate complex RCM workflows",
    "Integration with your existing EHR systems",
    "Real-world results from early deployments",
    "Custom implementation roadmap for your healthcare provider",
];

export default function Contact() {
    const rootRef = useRef<HTMLElement>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (status === "sending") return;
        setError("");

        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
            fullName: String(data.get("fullName") || "").trim(),
            workEmail: String(data.get("workEmail") || "").trim(),
            organization: String(data.get("organization") || "").trim(),
            phone: String(data.get("phone") || "").trim(),
            role: String(data.get("role") || "").trim(),
            message: String(data.get("message") || "").trim(),
        };

        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const body = await res.json().catch(() => null);
            if (!res.ok || !body?.ok) {
                throw new Error(body?.error || "Something went wrong. Please try again.");
            }
            setStatus("sent");
            form.reset();
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
    }

    return (
        <section className="scene light demo-scene" id="contact" ref={rootRef}>
            <div className="wrap">
                <div className="demo-grid">
                    <div className="demo-aside">
                        <p className="kicker">Get in touch</p>
                        <h1 className="h-giant">
                            See Nuvae.ai
                            <br />
                            in action.
                        </h1>
                        <p className="sub">
                            Schedule a personalized demo and discover how Nuvae protects revenue
                            across your revenue cycle. Prefer to talk first? Our assistant in the
                            corner can answer most questions right now.
                        </p>
                        <ul className="demo-benefits">
                            {BENEFITS.map((b) => (
                                <li key={b}>
                                    <Check size={17} strokeWidth={2.4} />
                                    {b}
                                </li>
                            ))}
                        </ul>
                        <div className="demo-badges">
                            <span className="trust-chip">HIPAA Certified</span>
                            <span className="trust-chip">SOC 2 Certified</span>
                        </div>
                    </div>

                    <div className="panel demo-form-panel">
                        <div className="panel-bar">
                            <span className="dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            Request a demo
                            {status !== "sent" && <span className="status">Ready</span>}
                        </div>
                        <div className="demo-form-body">
                            {status === "sent" ? (
                                <div className="demo-success" role="status">
                                    <h2>Thank you.</h2>
                                    <p>
                                        Your request is in. Our team will reach out within one
                                        business day to schedule your demo.
                                    </p>
                                </div>
                            ) : (
                                <form className="demo-form" onSubmit={onSubmit} noValidate>
                                    <div className="demo-form-row">
                                        <div className="demo-field">
                                            <label htmlFor="fullName">
                                                Full Name <span className="req">*</span>
                                            </label>
                                            <input id="fullName" name="fullName" type="text" required autoComplete="name" />
                                        </div>
                                        <div className="demo-field">
                                            <label htmlFor="workEmail">
                                                Work Email <span className="req">*</span>
                                            </label>
                                            <input id="workEmail" name="workEmail" type="email" required autoComplete="email" />
                                        </div>
                                    </div>

                                    <div className="demo-form-row">
                                        <div className="demo-field">
                                            <label htmlFor="organization">
                                                Healthcare Provider / Organization <span className="req">*</span>
                                            </label>
                                            <input id="organization" name="organization" type="text" required autoComplete="organization" />
                                        </div>
                                        <div className="demo-field">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input id="phone" name="phone" type="tel" autoComplete="tel" />
                                        </div>
                                    </div>

                                    <div className="demo-field">
                                        <label htmlFor="role">Your Role</label>
                                        <select id="role" name="role" defaultValue="">
                                            <option value="" disabled>
                                                Select your role
                                            </option>
                                            {ROLES.map((r) => (
                                                <option key={r} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="demo-field">
                                        <label htmlFor="message">Tell us about your needs</label>
                                        <textarea id="message" name="message" rows={4} />
                                    </div>

                                    {status === "error" && (
                                        <p className="demo-error" role="alert">
                                            {error}
                                        </p>
                                    )}

                                    <button className="btn-big demo-submit" type="submit" disabled={status === "sending"}>
                                        {status === "sending" ? "Sending…" : "Request Demo"}
                                    </button>

                                    <p className="demo-legal">
                                        By submitting this form, you agree to our privacy policy and
                                        terms of service.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
