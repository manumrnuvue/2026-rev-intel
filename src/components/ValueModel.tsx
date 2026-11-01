"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

type SizeKey = "small" | "mid" | "large";

const SIZES: Record<
    SizeKey,
    { label: string; eligibility: string; contracts: string; appeals: string; total: string }
> = {
    small: {
        label: "Small hospital",
        eligibility: "$135k – $280k",
        contracts: "$310k – $790k",
        appeals: "$310k – $720k",
        total: "$755k – $1.79M",
    },
    mid: {
        label: "Mid-size hospital",
        eligibility: "$460k – $590k",
        contracts: "$1.92M – $2.68M",
        appeals: "$2.79M – $3.65M",
        total: "$5.17M – $6.92M",
    },
    large: {
        label: "Large health system",
        eligibility: "$1.1M – $1.67M",
        contracts: "$5.4M – $10.2M",
        appeals: "$6.7M – $13.4M",
        total: "$13.2M – $25.3M",
    },
};

const SOURCES = [
    "CAQH Index 2025",
    "Experian Health 2025/2026",
    "AHA Cost of Caring 2025",
    "Advisory Board 2024",
    "HFMA Pulse Survey",
    "EY RCM Analysis 2026",
    "Health Affairs, Jan 2026",
    "JAMA Health Forum 2025",
];

export default function ValueModel() {
    const rootRef = useRef<HTMLElement>(null);
    const [size, setSize] = useState<SizeKey>("mid");
    const v = SIZES[size];

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);

            gsap.from(".vm-layout", {
                opacity: 0,
                y: 40,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".vm-layout", start: "top 82%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene lighter" id="roi" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">Chapter 09 — The business case</p>
                <h2 className="h-big">
                    <Words lines={["Three modules.", "One connected number."]} />
                </h2>
                <p className="sub mt-26">
                    Prevention, detection, and recovery — the full arc of revenue leakage.
                    Eligibility reduces denials entering the system. Contract analytics recovers
                    revenue on claims paid at the wrong rate. Appeals recover revenue on claims
                    that weren't paid at all. Each module is independent and additive.
                </p>

                <div className="size-toggle" role="group" aria-label="Hospital size">
                    {(Object.keys(SIZES) as SizeKey[]).map((k) => (
                        <button
                            key={k}
                            className={k === size ? "active" : ""}
                            onClick={() => setSize(k)}
                        >
                            {SIZES[k].label}
                        </button>
                    ))}
                </div>

                <div className="vm-layout">
                    <div className="panel">
                        <div className="panel-bar">
                            <span className="dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            Indicative annual value · {v.label}
                            <span className="status">Mid-path</span>
                        </div>
                        <div className="vm-rows">
                            <div className="vm-row">
                                <span className="lbl">01 · Eligibility verification</span>
                                <span className="val num">{v.eligibility}</span>
                            </div>
                            <div className="vm-row">
                                <span className="lbl">02 · Contract rate matrix &amp; analytics</span>
                                <span className="val num">{v.contracts}</span>
                            </div>
                            <div className="vm-row">
                                <span className="lbl">03 · Appeal generation &amp; tail-end recovery</span>
                                <span className="val num">{v.appeals}</span>
                            </div>
                            <div className="vm-row total">
                                <span className="lbl">Total annual value</span>
                                <span className="val num">{v.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="sub" style={{ marginTop: 28, fontSize: 15, maxWidth: "60ch" }}>
                    Ranges are grounded in observed deployment patterns, not aspirational
                    projections — a starting point for discovery, not a quote. The real number
                    comes from your claim volume, payer mix, and current denial rates.
                </p>

                <div className="vm-sources" aria-label="Benchmark sources">
                    {SOURCES.map((s) => (
                        <span className="chip" key={s}>
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
