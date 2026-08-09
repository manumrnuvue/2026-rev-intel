"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

const ROLES = [
    {
        title: "Founding Engineer",
        line: "Full-stack or backend-leaning, comfortable owning a workflow end to end, from ingesting an 835 file to shipping the UI that explains what it found.",
    },
    {
        title: "Healthcare AI/ML Engineer",
        line: "Builds and evaluates the models behind eligibility, contract-rate matching, and appeal generation. RCM or clinical-documentation background a strong plus.",
    },
    {
        title: "RCM Domain Lead",
        line: "Former Business Office or revenue cycle operations leader who translates real healthcare provider workflows into product requirements.",
    },
    {
        title: "Customer Success / Implementation",
        line: "Owns the first 90 days of a healthcare provider's deployment — the difference between 'installed' and 'recovering revenue.'",
    },
];

export default function Careers() {
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
            <section className="scene light" id="careers" ref={rootRef}>
                <div className="wrap">
                    <p className="kicker">Careers</p>
                    <h1 className="h-giant">
                        <Words lines={["Own outcomes,", "not tickets."]} />
                    </h1>
                    <p className="sub mt-30">
                        No open roles right now. We're a small team working on a concrete,
                        technically hard problem — and we'd rather meet engineers who want to own
                        that kind of problem before we're hiring, not after. If that's you, we'd
                        like to hear from you, even if nothing below is an exact match.
                    </p>

                    <p className="sub" style={{ marginTop: 30, fontSize: 16, maxWidth: "60ch" }}>
                        <b>How we work.</b> Small team, high ownership, healthcare domain depth
                        valued over years-of-experience. We ship in weeks, not quarters, and every
                        feature has to trace back to a dollar recovered or a denial prevented.
                    </p>

                    <h2 className="h-mid res-section-h">Where we're hiring</h2>
                    <p className="chip" style={{ marginBottom: 20, display: "inline-block" }}>
                        Illustrative roles — not live requisitions
                    </p>
                    <div className="also-grid">
                        {ROLES.map((r) => (
                            <div className="also" key={r.title}>
                                <b>{r.title}</b>
                                <p>{r.line}</p>
                            </div>
                        ))}
                    </div>

                    <p className="sub" style={{ marginTop: 30, fontSize: 15 }}>
                        Still no requisitions open — if one of these describes you, email us
                        anyway.
                    </p>
                    <div className="price-cta">
                        <a className="btn-big" href="mailto:contact@nuvae.ai?subject=Nuvae%20careers">
                            Email our recruiting team
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
