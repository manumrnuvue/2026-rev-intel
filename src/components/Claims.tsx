import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

export default function Claims() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) return;

            revealWords(root);
            revealCopy(root);

            gsap.from(".engines-panel", {
                opacity: 0,
                y: 80,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".engines-panel", start: "top 82%" },
            });
            gsap.from(".erow:not(.erow-head)", {
                opacity: 0,
                y: 18,
                stagger: 0.16,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: ".engines-panel", start: "top 62%" },
            });
            gsap.from(".sugg-card", {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: ".sugg", start: "top 85%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene claims-scene" id="claims" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">Chapter 06 — Claims intelligence</p>
                <h2 className="h-big">
                    <Words lines={["Every claim priced twice.", "Before the payer pays once."]} />
                </h2>
                <p className="sub mt-26">
                    Two independent rate engines price every claim against your contract. If they
                    disagree by even a dollar, a human sees it. If the payer disagrees, Nuvae does.
                </p>

                <div style={{ marginTop: 56 }}>
                    <div className="panel engines-panel">
                        <div className="panel-bar">
                            <span className="dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            Expected reimbursement · dual engine
                            <span className="status">Cross-checking</span>
                        </div>
                        <div className="engines">
                            <div className="erow erow-head">
                                <span className="head">Claim</span>
                                <span className="head" style={{ textAlign: "right" }}>
                                    Engine A
                                </span>
                                <span className="head" style={{ textAlign: "right" }}>
                                    Engine B
                                </span>
                                <span className="head" style={{ justifySelf: "end" }}>
                                    Verdict
                                </span>
                            </div>
                            <div className="erow">
                                <span>
                                    <b>Knee arthroplasty</b>
                                    <small>BlueShield PPO · DRG 470</small>
                                </span>
                                <span className="ev num">$28,904</span>
                                <span className="ev num">$28,904</span>
                                <span className="verdict match">MATCH</span>
                            </div>
                            <div className="erow">
                                <span>
                                    <b>ED visit, high severity</b>
                                    <small>Aetna HMO · 99285</small>
                                </span>
                                <span className="ev num">$1,142</span>
                                <span className="ev num">$1,142</span>
                                <span className="verdict match">MATCH</span>
                            </div>
                            <div className="erow">
                                <span>
                                    <b>Cardiac cath, diagnostic</b>
                                    <small>United · 93458</small>
                                </span>
                                <span className="ev num">$4,860</span>
                                <span className="ev num">$4,411</span>
                                <span className="verdict miss">→ HUMAN REVIEW</span>
                            </div>
                        </div>
                    </div>

                    <div className="sugg">
                        <div className="sugg-card">
                            <span className="sk">AI SUGGESTION</span>
                            <span>
                                Modifier 59 missing on line 3 — supported by the operative note.
                            </span>
                            <span className="gain num">+$312</span>
                        </div>
                        <div className="sugg-card">
                            <span className="sk">AI SUGGESTION</span>
                            <span>
                                Uncoded secondary diagnosis found in documentation — DRG shifts.
                            </span>
                            <span className="gain num">+$2,890</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
