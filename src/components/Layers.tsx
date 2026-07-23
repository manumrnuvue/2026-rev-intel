"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords, scrollToId } from "../lib/anim";

const LAYERS: Array<{
    n: string;
    name: string;
    sub: string;
    imperative: string;
    impact: string;
    goto: string;
}> = [
    {
        n: "Layer 1",
        name: "Prevent",
        sub: "Front-end verification",
        imperative:
            "Intercepts eligibility errors and authorization gaps before a claim is ever generated.",
        impact:
            "Eligibility-related errors drive roughly 1 in 4 initial denials. Nuvae replaces fragmented, manual payer-portal checks with automated verification — cutting routine manual transaction time by 75%.",
        goto: "eligibility",
    },
    {
        n: "Layer 2",
        name: "Detect",
        sub: "Mid-cycle analytics & matrix compliance",
        imperative:
            "Cross-references 100% of incoming remittance data against multi-tiered contracted rate matrices, in real time.",
        impact:
            "Payers routinely underpay via quiet system adjustments and proprietary edits. Nuvae's engine catches the micro-leakage human audit teams miss, and maps compliance trends instantly.",
        goto: "contracts",
    },
    {
        n: "Layer 3",
        name: "Recover",
        sub: "Back-end appeal scale & small-balance capture",
        imperative:
            "Deploys generative legal and clinical logic to appeal complex denials and capture unworked balances at scale.",
        impact:
            "RCM teams write off 60–70% of valid denials to labor shortage alone, abandoning low-balance accounts entirely. Nuvae compresses appeal drafting from hours to minutes — making both high-value exceptions and small-balance claims worth pursuing.",
        goto: "denials",
    },
];

export default function Layers() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);

            gsap.from(".layer-card", {
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: ".layers-grid", start: "top 85%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene light" id="layers" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">How Nuvae works</p>
                <h2 className="h-giant">
                    <Words lines={["Three layers.", "One system."]} />
                </h2>
                <p className="sub mt-30">
                    Revenue leaks at three points in the cycle. Nuvae closes all three — as one
                    connected system, not three separate tools.
                </p>

                <div className="layers-grid">
                    {LAYERS.map((l) => (
                        <div className="layer-card" key={l.name}>
                            <span className="lk">{l.n} — {l.name.toUpperCase()}</span>
                            <h3>{l.name}</h3>
                            <span className="lsub">{l.sub}</span>
                            <p>
                                <b>{l.imperative}</b>
                            </p>
                            <p>{l.impact}</p>
                            <button className="lgo" onClick={() => scrollToId(l.goto)}>
                                See it in the product →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
