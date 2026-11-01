"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

// [TODO: confirm] — real customer logos/quotes slot in here once available.
// Do not publish placeholder logos or invented customer names.
const SEGMENTS = [
    {
        label: "Small hospital",
        line: "Lean Business Office teams, high dependence on manual eligibility checks. Nuvae's fastest win is usually eligibility verification and appeal automation — cash-cycle relief within the first quarter.",
    },
    {
        label: "Mid-size hospital",
        line: "Contract volume and payer mix start to compound. Contract rate-matrix analytics typically becomes the largest single line of recovered value at this scale.",
    },
    {
        label: "Large health system",
        line: "Every module, deployed system-wide, with per-facility configuration and role-based access so each hospital in the system runs its own workflows independently.",
    },
];

export default function Customers() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);
        },
        { scope: rootRef },
    );

    return (
        <>
            <section className="scene light" id="customers" ref={rootRef}>
                <div className="wrap">
                    <p className="kicker">Who Nuvae serves</p>
                    <h1 className="h-giant">
                        <Words lines={["Built for hospitals that", "can't afford to guess."]} />
                    </h1>
                    <p className="sub mt-30">
                        From a single small hospital to a multi-facility health system — the
                        modules are the same. What changes is scale, not complexity.
                    </p>

                    <div className="also-grid">
                        {SEGMENTS.map((s) => (
                            <div className="also" key={s.label}>
                                <b>{s.label}</b>
                                <p>{s.line}</p>
                            </div>
                        ))}
                    </div>

                    <p className="sub" style={{ marginTop: 40, fontSize: 15, maxWidth: "60ch" }}>
                        Hospitals typically see eligibility-related denial rates fall as front-end
                        verification automates —{" "}
                        <Link className="lgo" href="/roi" style={{ display: "inline" }}>
                            see the business case by hospital size
                        </Link>
                        .
                    </p>

                    <div className="price-cta">
                        <Link className="btn-big" href="/contact">
                            Book a walkthrough
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
