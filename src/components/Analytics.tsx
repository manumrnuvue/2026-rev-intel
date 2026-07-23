"use client";

import { useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

const PROMPT = "Show denial rate by payer, last 12 months";

const BARS: Array<{ label: string; h: string; hi?: boolean }> = [
    { label: "UNITED", h: "38%" },
    { label: "AETNA", h: "52%" },
    { label: "CIGNA", h: "44%" },
    { label: "BLUE", h: "86%", hi: true },
    { label: "KAISER", h: "30%" },
    { label: "HUMANA", h: "58%" },
    { label: "MOLINA", h: "47%" },
    { label: "ANTHEM", h: "64%" },
];

export default function Analytics() {
    const rootRef = useRef<HTMLElement>(null);
    const promptRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) {
                if (promptRef.current) promptRef.current.textContent = PROMPT;
                gsap.set(".cbar i", { scaleY: 1 });
                return;
            }

            revealWords(root);
            revealCopy(root);

            gsap.from(".aichart-panel", {
                opacity: 0,
                y: 80,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".aichart-panel", start: "top 82%" },
            });

            const type = { n: 0 };
            gsap.timeline({
                scrollTrigger: { trigger: ".aichart-panel", start: "top 62%" },
            })
                .to(type, {
                    n: PROMPT.length,
                    duration: 1.6,
                    ease: "none",
                    onUpdate: () => {
                        if (promptRef.current) {
                            promptRef.current.textContent = PROMPT.slice(0, Math.round(type.n));
                        }
                    },
                })
                .from(".ctitle", { opacity: 0, duration: 0.4 }, "+=0.2")
                .to(
                    ".cbar i",
                    { scaleY: 1, stagger: 0.07, duration: 0.6, ease: "power3.out" },
                    "<",
                );
        },
        { scope: rootRef },
    );

    return (
        <section className="scene lighter" id="analytics" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">Chapter 08 — Analytics</p>
                <h2 className="h-big">
                    <Words lines={["Type a question.", "Get a dashboard."]} />
                </h2>
                <p className="sub mt-26">
                    No report builder. No ticket to the data team. Describe the chart you want, in
                    plain English, and it appears on your dashboard — live.
                </p>

                <div className="panel aichart-panel" style={{ marginTop: 56 }}>
                    <div className="panel-bar">
                        <span className="dots">
                            <i />
                            <i />
                            <i />
                        </span>
                        Widget builder
                        <span className="status">AI</span>
                    </div>
                    <div className="promptbar">
                        <span ref={promptRef} />
                        <span className="cursor" />
                        <span className="send">↑</span>
                    </div>
                    <div className="chartarea">
                        <div className="ctitle">
                            <span>Denial rate by payer · trailing 12 months</span>
                            <span style={{ color: "var(--red-ink)", fontWeight: 700 }}>
                                BLUESHIELD OUTLIER — 11.2%
                            </span>
                        </div>
                        <div className="cbars" aria-hidden="true">
                            {BARS.map((b) => (
                                <div className={`cbar ${b.hi ? "hi" : ""}`} key={b.label}>
                                    <i style={{ "--h": b.h } as CSSProperties} />
                                    <span>{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
