"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

export default function Denials() {
    const rootRef = useRef<HTMLDivElement>(null);
    const pinSectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) {
                gsap.set(".den-card", { opacity: 1, y: 0 });
                gsap.set(".meter i, .den-lines .ln", { scale: 1 });
                return;
            }

            revealWords(root);
            revealCopy(root);

            gsap.timeline({
                scrollTrigger: {
                    trigger: pinSectionRef.current,
                    start: "top top",
                    end: "+=180%",
                    scrub: 0.5,
                    pin: pinRef.current,
                },
            })
                .to(".den-1", { opacity: 1, y: 0, duration: 0.18 }, 0.05)
                .to(".den-2", { opacity: 1, y: 0, duration: 0.18 }, 0.28)
                .to(".den-2 .meter i", { scaleX: 0.87, duration: 0.22, ease: "power2.out" }, 0.36)
                .to(".den-3", { opacity: 1, y: 0, duration: 0.18 }, 0.55)
                .to(
                    ".den-3 .ln",
                    { scaleX: 1, duration: 0.14, stagger: 0.045, ease: "none" },
                    0.62,
                )
                .to(".den-4", { opacity: 1, y: 0, duration: 0.18 }, 0.85);

            gsap.from(".den-proof .proof-item", {
                opacity: 0,
                y: 30,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: ".den-proof", start: "top 88%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef}>
            <section className="scene denials" id="denials" ref={pinSectionRef}>
                <div className="den-pin" ref={pinRef}>
                    <div className="den-grid">
                        <div>
                            <p className="kicker">Chapter 04 — Appeal generation</p>
                            <h2 className="h-big">
                                <Words lines={["Denied is not", "the end."]} />
                            </h2>
                            <p className="sub mt-26">
                                Fewer than 1 in 3 denied claims is ever appealed — yet properly
                                pursued appeals win 57–82% of the time. The constraint was never
                                the law, it was the hours per letter. Nuvae drafts in minutes, so
                                your team fights the claims that were being written off, not just
                                the big ones.
                            </p>
                        </div>
                        <div className="den-stack">
                            <div className="den-card den-1">
                                <div className="dk">
                                    <span>Denial received</span>
                                    <span className="neg">CO-197 · NO PRIOR AUTH</span>
                                </div>
                                <div className="den-title">
                                    MRI brain w/wo contrast — $14,208
                                    <small>Aetna HMO · claim CLM-77120</small>
                                </div>
                            </div>
                            <div className="den-card den-2">
                                <div className="dk">
                                    <span>Appealability score</span>
                                    <span className="pos">WORTH FIGHTING</span>
                                </div>
                                <div className="meter">
                                    <i />
                                </div>
                                <div className="den-score">
                                    <span>Auth was on file — payer error</span>
                                    <b className="num">0.87 · PURSUE</b>
                                </div>
                            </div>
                            <div className="den-card den-3">
                                <div className="dk">
                                    <span>Appeal drafted</span>
                                    <span className="pos">CONTRACT §7.4 CITED</span>
                                </div>
                                <div className="den-lines">
                                    <span className="ln" style={{ width: "92%" }} />
                                    <span className="ln" style={{ width: "100%" }} />
                                    <span className="ln hl" style={{ width: "84%" }} />
                                    <span className="ln" style={{ width: "68%" }} />
                                </div>
                                <div className="den-evidence">
                                    <span>✓ AUTH RECORD</span>
                                    <span>✓ CLINICAL NOTE</span>
                                    <span>✓ EOB</span>
                                    <span>✓ PDR FORM</span>
                                </div>
                            </div>
                            <div className="den-card den-4">
                                <div className="den-filed">
                                    <div className="fstamp">FILED</div>
                                    <p>
                                        Approved by your team, filed with the payer.{" "}
                                        <b>$14,208 back in play.</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="scene light den-proof">
                <div className="wrap">
                    <div className="proof-row">
                        <div className="proof-item">
                            <b>30–40%</b>
                            <span>of eligible denials get appealed at most healthcare providers today</span>
                            <span className="proof-src">CEPR 2025 · JAMA Health Forum 2025</span>
                        </div>
                        <div className="proof-item">
                            <b>57–82%</b>
                            <span>overturn rate on denials that are properly pursued</span>
                            <span className="proof-src">Health Affairs, Jan 2026</span>
                        </div>
                        <div className="proof-item">
                            <b>5–8×</b>
                            <span>faster letter drafting — 3–4 hours down to 20–30 minutes</span>
                            <span className="proof-src">Nuvae pilot deployments 2024–2025</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
