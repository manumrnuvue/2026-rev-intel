"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

export default function Assistant() {
    const rootRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) {
                gsap.set(".msg", { opacity: 1, y: 0 });
                return;
            }

            revealWords(root);
            revealCopy(root);

            gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "+=160%",
                    scrub: 0.5,
                    pin: pinRef.current,
                },
            })
                .to(".msg-1", { opacity: 1, y: 0, duration: 0.2 }, 0.05)
                .to(".msg-2", { opacity: 1, y: 0, duration: 0.25 }, 0.3)
                .to(".msg-3", { opacity: 1, y: 0, duration: 0.2 }, 0.6)
                .to(".msg-4", { opacity: 1, y: 0, duration: 0.25 }, 0.82);
        },
        { scope: rootRef },
    );

    return (
        <section className="scene assistant" id="assistant" ref={rootRef}>
            <div className="chat-pin" ref={pinRef}>
                <div className="chat-grid">
                    <div>
                        <p className="kicker">Chapter 02 — The assistant</p>
                        <h2 className="h-big">
                            <Words lines={["Not sure which module", "has the answer?"]} />
                        </h2>
                        <p className="sub mt-26">
                            One assistant spans every module — contracts, denials, eligibility,
                            claims, rates. If you're unsure where to look, just ask. Every answer
                            shows which tools it used and which page it read. No black box.
                        </p>
                        <div className="topic-row" aria-hidden="true">
                            <span className="topic-chip">Contracts</span>
                            <span className="topic-chip">Denials</span>
                            <span className="topic-chip">Eligibility</span>
                            <span className="topic-chip">Rates</span>
                            <span className="topic-chip">Claims</span>
                        </div>
                    </div>
                    <div className="panel chat-panel">
                        <div className="panel-bar">
                            <span className="dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            Nuvae Assistant
                            <span className="status">28 tools connected</span>
                        </div>
                        <div className="chat-body">
                            <div className="msg user msg-1">
                                Which BlueShield denials from May are still worth appealing?
                            </div>
                            <div className="msg bot msg-2">
                                <span className="tools-used">
                                    <span className="tl">appeal_deadline</span>
                                    <span className="tl">contract_terms</span>
                                    <span className="tl">denial_search</span>
                                </span>
                                <b>14 denials, $186,420 at stake.</b> Your contract allows 365 days
                                from the EOB — earliest deadline May 12, 2027. 9 score above 0.8 on
                                appealability.
                                <span className="src">Source: BlueShield PPO §7.4, page 82</span>
                            </div>
                            <div className="msg user msg-3">Draft the top three appeals.</div>
                            <div className="msg bot msg-4">
                                <span className="tools-used">
                                    <span className="tl">appeal_letter</span>
                                    <span className="tl">evidence_check</span>
                                </span>
                                Done. Three letters drafted with contract citations. One is missing
                                an operative note — I've flagged it for upload.{" "}
                                <b>Waiting on your approval.</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
