"use client";

import { useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Words, revealCopy, revealWords } from "../lib/anim";
import Faq from "../components/Faq";

const TIERS = [
    {
        name: "Starter",
        forWhom: "For small healthcare providers",
        line: "Eligibility verification and appeal automation — the fastest path to cash-cycle relief. Typically the first module healthcare providers turn on.",
        includes: ["Eligibility verification", "Appeal generation & AR recovery", "Standard reporting"],
        ctaLabel: "Talk to sales →",
    },
    {
        name: "Growth",
        forWhom: "For mid-size healthcare providers",
        line: "Adds contract rate-matrix analytics — where recovered value compounds fastest at this claim volume.",
        includes: ["Everything in Starter", "Contract rate-matrix analytics", "Stale-rate detection", "Government rate crawler"],
        featured: true,
        ctaLabel: "Talk to sales →",
    },
    {
        name: "Enterprise",
        forWhom: "For large health systems",
        line: "Every module, system-wide, with per-facility configuration, role-based access, and a dedicated implementation team.",
        includes: ["Everything in Growth", "Multi-tenant configuration", "Custom analytics", "On-premise deployment option", "Priority support"],
        ctaLabel: "Talk to our enterprise team →",
    },
];

const HOW_IT_WORKS = [
    "Priced per module, so you only pay for what you turn on.",
    "Scales with claim volume, not headcount — small healthcare providers and large health systems pay for different things.",
    "No multi-year lock-in required to start — most deployments are live in weeks.",
    "A BAA is included with every engagement handling PHI.",
];

const FAQ_ITEMS = [
    {
        q: "Why isn't pricing published?",
        a: "Pricing scales with claim volume and which modules you turn on, so a flat number would be misleading. A short walkthrough of your numbers gets you an accurate quote fast.",
    },
    {
        q: "Do we have to commit to every module?",
        a: "No. Start with Starter and add modules as they prove out — most healthcare providers begin with eligibility and appeals, then add contract analytics once claim volume justifies it.",
    },
    {
        q: "Is there a setup or implementation fee?",
        a: "Implementation is scoped as part of your engagement during the sales conversation, not hidden in a separate line item.",
    },
    {
        q: "Can a health system run different modules at different facilities?",
        a: "Yes — Enterprise includes per-facility configuration, so each healthcare provider in a system can run its own module mix under one contract.",
    },
    {
        q: "Is on-premise deployment available?",
        a: "Yes, on the Enterprise tier — for health systems with data-residency or network-isolation requirements that rule out a cloud-hosted deployment.",
    },
];

export default function Pricing() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);
            gsap.from(".price-card", {
                opacity: 0,
                y: 40,
                stagger: 0.12,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: ".price-grid", start: "top 85%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <>
            <section className="scene light pricing-hero" id="pricing" ref={rootRef}>
                <div className="wrap">
                    <p className="kicker">Pricing</p>
                    <h1 className="h-giant">
                        <Words lines={["Pricing built around", "what you recover."]} />
                    </h1>
                    <p className="sub mt-30">
                        Nuvae is priced per module and scaled to claim volume — not a flat SaaS
                        seat fee. Every engagement starts with a walkthrough of your numbers,
                        because that's what determines what pricing should look like.
                    </p>

                    <div className="price-grid">
                        {TIERS.map((t) => (
                            <div className={`panel price-card ${t.featured ? "featured" : ""}`} key={t.name}>
                                <div className="panel-bar">
                                    <span className="dots">
                                        <i />
                                        <i />
                                        <i />
                                    </span>
                                    {t.forWhom}
                                </div>
                                <div className="price-body">
                                    <h3>{t.name}</h3>
                                    <span className="price-tag">Custom</span>
                                    <p>{t.line}</p>
                                    <ul className="price-list">
                                        {t.includes.map((i) => (
                                            <li key={i}>
                                                <Check size={16} strokeWidth={2} /> {i}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link className="lgo" href="/contact">
                                        {t.ctaLabel}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="price-how">
                        <h2 className="h-mid">How pricing works</h2>
                        <ul className="price-list price-list-loose">
                            {HOW_IT_WORKS.map((h) => (
                                <li key={h}>
                                    <Check size={16} strokeWidth={2} /> {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h2 className="h-mid res-section-h">Pricing questions</h2>
                    <Faq items={FAQ_ITEMS} />

                    <div className="price-cta">
                        <Link className="btn-quiet" href="/roi">
                            See what it's worth for your healthcare provider size first
                        </Link>
                        <Link className="btn-big" href="/contact">
                            Talk to sales
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
