import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

export default function PreAuth() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) return;

            revealWords(root);
            revealCopy(root);

            gsap.from(".pa-phone", {
                opacity: 0,
                x: -70,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".pa-grid", start: "top 78%" },
            });
            gsap.from(".pa-portal", {
                opacity: 0,
                x: 70,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".pa-grid", start: "top 78%" },
            });
            gsap.from(".report", {
                opacity: 0,
                y: 80,
                scale: 0.94,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".report", start: "top 88%" },
            });
            gsap.from(".report .stamp", {
                scale: 2.4,
                opacity: 0,
                rotate: 20,
                duration: 0.6,
                ease: "back.out(1.8)",
                scrollTrigger: { trigger: ".report", start: "top 75%" },
            });
            gsap.from(".preauth-stage .proof-item", {
                opacity: 0,
                y: 30,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: ".preauth-stage .proof-row", start: "top 90%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef}>
            <section className="scene light chapter-intro" id="eligibility">
                <div className="wrap">
                    <p className="kicker">Chapter 03 — Eligibility verification</p>
                    <h2 className="h-giant">
                        <Words lines={["Verified before the", "patient sits down."]} />
                    </h2>
                    <p className="sub mt-30">
                        Roughly one in four front-end denials starts here. Eligibility used to mean
                        3–5 minutes per check across payer portals and phone trees — Nuvae's agent
                        calls the payer and checks the portal at the same time, and returns a report
                        in seconds.
                    </p>
                </div>
            </section>

            <section className="scene lighter preauth-stage">
                <div className="wrap">
                    <div className="pa-grid">
                        <div className="pa-card pa-phone">
                            <span className="t-k">Agent one · On the phone</span>
                            <h3>It calls. It waits. You don't.</h3>
                            <div className="wave" aria-hidden="true">
                                {Array.from({ length: 18 }).map((_, i) => (
                                    <i key={i} />
                                ))}
                            </div>
                            <div className="pa-log">
                                <span>
                                    <i>0:04</i> Navigated payer phone tree
                                </span>
                                <span>
                                    <i>0:31</i> Member ID + provider NPI given
                                </span>
                                <span>
                                    <i>1:58</i> Coverage confirmed · copay $40
                                </span>
                                <span>
                                    <i>2:12</i> Reference number captured
                                </span>
                            </div>
                        </div>
                        <div className="pa-card pa-portal">
                            <span className="t-k">Agent two · On the portal</span>
                            <h3>It checks the portal too.</h3>
                            <div className="browser" aria-hidden="true">
                                <div className="b-bar">
                                    <span className="url">payer-portal.com/eligibility</span>
                                </div>
                                <div className="b-body">
                                    <div className="skel" style={{ width: "70%" }} />
                                    <div className="skel" style={{ width: "90%" }} />
                                    <div className="skel" style={{ width: "55%" }} />
                                    <div className="found">
                                        <span>Plan active · PPO</span>
                                        <span>Deductible met: $1,850 / $3,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pa-log" style={{ marginTop: 16 }}>
                                <span>
                                    <i>0:07</i> Logged in, member located
                                </span>
                                <span>
                                    <i>0:19</i> Benefits page parsed
                                </span>
                                <span>
                                    <i>0:26</i> Prior-auth required:{" "}
                                    <b style={{ color: "var(--amber-ink)" }}>YES — MRI brain</b>
                                </span>
                            </div>
                        </div>
                        <div className="report">
                            <div className="stamp">VERIFIED</div>
                            <div>
                                <h3>One report. Both sources. Seconds.</h3>
                                <p>
                                    Phone and portal answers reconciled into a single eligibility
                                    report — attached to the visit before check-in.
                                </p>
                            </div>
                            <div className="kpis">
                                <div className="kpi">
                                    <b className="num">41s</b>
                                    <span>portal check</span>
                                </div>
                                <div className="kpi">
                                    <b className="num">100%</b>
                                    <span>documented</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="proof-row">
                        <div className="proof-item">
                            <b>~25%</b>
                            <span>of front-end claim denials trace back to eligibility issues</span>
                            <span className="proof-src">Experian Health 2025/2026</span>
                        </div>
                        <div className="proof-item">
                            <b>75%</b>
                            <span>of manual eligibility checks removed once verification is automated</span>
                            <span className="proof-src">Nuvae deployment observations</span>
                        </div>
                        <div className="proof-item">
                            <b>25–40%</b>
                            <span>typical reduction in eligibility-related denials within 90 days</span>
                            <span className="proof-src">Nuvae pilot data 2025–2026</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
