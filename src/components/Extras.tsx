"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

const EXTRAS: Array<{ title: string; body: string }> = [
    {
        title: "CDI review",
        body: "Clinical documentation checked against guidelines before coding gaps become denials.",
    },
    {
        title: "Medical library",
        body: "Ask across your contracts, Medicare and Medicaid policy, and state regulations — with cited answers.",
    },
    {
        title: "Payer notifications",
        body: "Policy and requirement changes from payers, summarized and routed before they bite.",
    },
    {
        title: "Multi-tenant, from day one",
        body: "Feature flags and per-tenant configuration let every hospital in a system turn modules on independently.",
    },
    {
        title: "Security built in",
        body: "Role-based access on every screen, PHI never written to logs, and a full audit trail on every record touched.",
    },
    {
        title: "Fits your stack",
        body: "EDI 835/837, UB-04, FHIR. Nuvae reads the feeds your systems already produce.",
    },
];

export default function Extras() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) return;

            revealWords(root);
            revealCopy(root);

            gsap.from(".also", {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: ".also-grid", start: "top 88%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene light" id="extras" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">And the rest</p>
                <h2 className="h-mid">
                    <Words lines={["Quietly doing their job."]} />
                </h2>
                <div className="also-grid">
                    {EXTRAS.map((e) => (
                        <div className="also" key={e.title}>
                            <b>{e.title}</b>
                            <p>{e.body}</p>
                        </div>
                    ))}
                </div>
                <div className="trust-row">
                    <span className="trust-chip">HIPAA compliant</span>
                    <span className="trust-chip">SOC 2 Type II certified</span>
                    <span className="trust-chip">Encrypted in transit &amp; at rest</span>
                    <span className="trust-chip">BAA available on request</span>
                    <span className="trust-chip">Role-based access control</span>
                </div>
            </div>
        </section>
    );
}
