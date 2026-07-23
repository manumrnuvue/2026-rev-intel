"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords, scrollToId } from "../lib/anim";

const ROWS: Array<{ them: string; nuvae: ReactNode }> = [
    {
        them: "Replaces your systems. Live in years.",
        nuvae: (
            <>
                Sits on top. Live in <em>weeks</em>.
            </>
        ),
    },
    {
        them: "Measures hours saved.",
        nuvae: (
            <>
                Measures <em>dollars recovered</em>.
            </>
        ),
    },
    {
        them: "Your contracts stay in a drawer.",
        nuvae: (
            <>
                Your contracts become <em>the engine</em>.
            </>
        ),
    },
    {
        them: "Reminds a human to call the payer.",
        nuvae: <em>Calls the payer itself.</em>,
    },
    {
        them: "Black-box reports.",
        nuvae: (
            <>
                Every answer <em>shows its source</em>.
            </>
        ),
    },
];

export default function Closing() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) return;

            revealWords(root);
            revealCopy(root);

            gsap.utils.toArray<HTMLElement>(".cmp-row").forEach((r) => {
                gsap.from(r.children, {
                    opacity: 0,
                    y: 30,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: { trigger: r, start: "top 90%" },
                });
            });

            gsap.from(".btn-big", {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "back.out(1.6)",
                scrollTrigger: { trigger: ".cta-scene", start: "top 60%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef}>
            <section className="scene compare" id="compare">
                <div className="wrap">
                    <p className="kicker">The difference</p>
                    <h2 className="h-big">
                        <Words lines={["Everyone automates.", "Nuvae recovers."]} />
                    </h2>
                    <div className="cmp-rows">
                        <div className="cmp-legend">
                            <span>RCM software</span>
                            <span>Nuvae</span>
                        </div>
                        {ROWS.map((r, i) => (
                            <div className="cmp-row" key={i}>
                                <span className="side-l">{r.them}</span>
                                <span className="side-r">{r.nuvae}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="scene cta-scene" id="cta">
                <div className="cta-glow" />
                <div className="wrap">
                    <h2 className="h-giant">
                        <Words lines={["See your leak."]} />
                    </h2>
                    <p className="sub">
                        Send one month of remits and your top three contracts.
                        <br />
                        We'll return the number. It's yours either way.
                    </p>
                    <a className="btn-big" href="mailto:contact@nuvae.ai?subject=Nuvae%20walkthrough">
                        Book a walkthrough
                    </a>
                    <button className="btn-quiet" onClick={() => scrollToId("layers")}>
                        Back to the top ↑
                    </button>
                </div>
            </section>
        </div>
    );
}
