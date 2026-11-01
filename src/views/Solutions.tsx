"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

const SEGMENTS = [
    {
        label: "Small hospital",
        sub: "Lean Business Office, high manual load",
        line: "Start with eligibility verification and appeal automation. These two modules alone typically pay for themselves inside the first quarter, because they remove the most manual, most repetitive work from the smallest team.",
        ctaLabel: "Talk to sales →",
    },
    {
        label: "Mid-size hospital",
        sub: "Growing claim volume and payer mix",
        line: "Contract rate-matrix analytics becomes the biggest lever at this scale. With more payers and more contract versions in play, underpayment hides easily — Nuvae catches it on every remittance, automatically.",
        ctaLabel: "Talk to sales →",
    },
    {
        label: "Large health system",
        sub: "Multiple facilities, one back office",
        line: "Every module, deployed system-wide, with per-facility configuration and role-based access — so each hospital in the system runs its own eligibility, contracts, and appeals workflows independently, under one umbrella. On-premise deployment is available for systems with strict data-residency requirements.",
        ctaLabel: "Talk to our enterprise team →",
    },
];

const WORKFLOWS = [
    { name: "Eligibility & authorization", line: "Verifies coverage and authorization requirements before a claim is generated, instead of finding out after a denial." },
    { name: "Contract & rate analytics", line: "Reads every payer contract and checks every remittance against it — catching underpayment, stale rates, and missed escalators." },
    { name: "Denials & appeals", line: "Scores appealability, drafts the appeal with contract citations attached, and tracks it through to recovery." },
    { name: "AR follow-up", line: "Calls payers on unresolved claims and logs the outcome, so nothing sits in a queue waiting for a human to have time." },
    { name: "Claims intelligence", line: "Flags modifier errors and uncoded diagnoses before submission, and reconciles paid amounts against contracted rates." },
    { name: "Rates & analytics", line: "A live rate calculator and natural-language reporting, so any question about payer performance gets answered in seconds." },
];

export default function Solutions() {
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
            <section className="scene" id="solutions" ref={rootRef}>
                <div className="wrap">
                    <p className="kicker">Solutions by customer type</p>
                    <h1 className="h-giant">
                        <Words lines={["Tailored to your", "hospital's scale."]} />
                    </h1>
                    <p className="sub mt-30">
                        The modules are the same everywhere. What changes is which one matters
                        most first — and that depends on the size and shape of your revenue
                        cycle team.
                    </p>
                </div>
            </section>

            <section className="scene light" id="solutions-segments">
                <div className="wrap">
                    <div className="also-grid">
                        {SEGMENTS.map((s) => (
                            <div className="also" key={s.label}>
                                <b>{s.label}</b>
                                <p style={{ fontWeight: 600, marginBottom: 8 }}>{s.sub}</p>
                                <p>{s.line}</p>
                                <Link className="lgo" href="/contact" style={{ marginTop: 14 }}>
                                    {s.ctaLabel}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Link className="lgo" href="/roi">
                        See the value by hospital size →
                    </Link>
                </div>
            </section>

            <section className="scene lighter" id="solutions-workflows">
                <div className="wrap">
                    <p className="kicker">Solutions by workflow</p>
                    <h2 className="h-big">
                        <Words lines={["Every part of the cycle,", "one connected system."]} />
                    </h2>
                    <div className="also-grid">
                        {WORKFLOWS.map((w) => (
                            <div className="also" key={w.name}>
                                <b>{w.name}</b>
                                <p>{w.line}</p>
                            </div>
                        ))}
                    </div>
                    <Link className="lgo" href="/product">
                        See these modules in the product →
                    </Link>
                </div>
            </section>

            <section className="scene" id="solutions-cta">
                <div className="wrap price-cta">
                    <Link className="btn-big" href="/contact">
                        Book a walkthrough
                    </Link>
                    <Link className="btn-quiet" href="/pricing">
                        See pricing
                    </Link>
                </div>
            </section>
        </>
    );
}
