import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

export default function VoiceAgent() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) return;

            revealWords(root);
            revealCopy(root);

            gsap.from(".ar-queue", {
                opacity: 0,
                x: -70,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".ar-grid", start: "top 78%" },
            });
            gsap.from(".ar-call", {
                opacity: 0,
                x: 70,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".ar-grid", start: "top 78%" },
            });
            gsap.from(".transcript span", {
                opacity: 0,
                y: 14,
                stagger: 0.18,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: { trigger: ".ar-call", start: "top 60%" },
            });
            gsap.from(".outcome", {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "back.out(1.6)",
                scrollTrigger: { trigger: ".ar-call", start: "top 45%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene light" id="ar" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">Chapter 05 — The AR agent</p>
                <h2 className="h-giant">
                    <Words lines={["It sits on hold.", "So nobody else has to."]} />
                </h2>
                <p className="sub mt-30">
                    Unpaid claims age out in phone queues. Nuvae's voice agent works the list all
                    day — dials the payer, asks the questions, documents every answer.
                </p>

                <div className="ar-grid">
                    <div className="panel ar-queue">
                        <div className="panel-bar">
                            <span className="dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            AR follow-up queue
                            <span className="status">Working</span>
                        </div>
                        <div className="queue-rows">
                            <div className="qrow calling">
                                <span>
                                    <b>CLM-77120 · Aetna</b>
                                    <span className="qc">Unpaid 47 days · priority 94</span>
                                </span>
                                <span className="amt num">$14,208</span>
                                <span className="pillx g">ON CALL</span>
                            </div>
                            <div className="qrow">
                                <span>
                                    <b>CLM-81554 · United</b>
                                    <span className="qc">Unpaid 39 days · priority 88</span>
                                </span>
                                <span className="amt num">$9,640</span>
                                <span className="pillx a">QUEUED</span>
                            </div>
                            <div className="qrow">
                                <span>
                                    <b>CLM-79302 · Cigna</b>
                                    <span className="qc">Unpaid 61 days · priority 86</span>
                                </span>
                                <span className="amt num">$7,112</span>
                                <span className="pillx a">QUEUED</span>
                            </div>
                            <div className="qrow">
                                <span>
                                    <b>CLM-80917 · BlueShield</b>
                                    <span className="qc">Called Jul 2 · recheck Jul 21</span>
                                </span>
                                <span className="amt num">$18,430</span>
                                <span className="pillx g">SCHEDULED</span>
                            </div>
                        </div>
                    </div>

                    <div className="pa-card ar-call">
                        <span className="t-k">Live call · 03:42</span>
                        <h3>Aetna provider line</h3>
                        <div className="wave" aria-hidden="true">
                            {Array.from({ length: 18 }).map((_, i) => (
                                <i key={i} />
                            ))}
                        </div>
                        <div className="transcript">
                            <span>
                                <i>NUVAE</i> Calling about claim ending 7120, tax ID on file.
                            </span>
                            <span>
                                <i className="them">PAYER</i> One moment… that claim is in
                                reprocessing.
                            </span>
                            <span>
                                <i>NUVAE</i> Can I get a reference number and a date?
                            </span>
                            <span>
                                <i className="them">PAYER</i> AET-2260-88413, expect 15 business
                                days.
                            </span>
                        </div>
                        <div className="outcome">
                            <span>Reprocessing confirmed · ref captured</span>
                            <span className="num">Recheck auto-set: Jul 21</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
