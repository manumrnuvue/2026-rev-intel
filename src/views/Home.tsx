"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Words, revealCopy, revealWords, prefersReducedMotion, scrollToId } from "../lib/anim";
import EngineMap from "../components/EngineMap";
import RevenueIntelligence from "../components/RevenueIntelligence";
import MoneyReveal from "../components/MoneyReveal";
import CompareTable from "../components/CompareTable";
import FinalCta from "../components/FinalCta";
import ScrollSpine from "../components/ScrollSpine";

const STATS = [
    { value: 70, suffix: "%", label: "less time spent on appeals" },
    { value: 28, suffix: "%", label: "higher first-pass claim submission success" },
    { value: 90, suffix: "%", label: "faster access to contract terms" },
    { value: 30, suffix: "+", label: "specialized agents deployed in pilots" },
];

const LAYERS = [
    {
        label: "Prevent",
        sub: "Front-end verification",
        line: "Verify eligibility and authorization before a claim is ever generated — not after it comes back denied.",
    },
    {
        label: "Detect",
        sub: "Mid-cycle analytics",
        line: "Cross-check every remittance against the contract that governs it, automatically, in real time.",
    },
    {
        label: "Recover",
        sub: "Back-end appeal scale",
        line: "Draft contract-cited appeals and pursue unworked balances at a scale no back office can match by hand.",
    },
];

const PIPELINE = [
    { step: "01", name: "Your systems", line: "Claims, remittances, and contracts flow in from the EHR and billing systems you already run — EDI 835/837, UB-04, FHIR." },
    { step: "02", name: "The Nuvae engine", line: "Agents verify eligibility, match every payment against contracted rates, score denials, and draft appeals — with human review on edge cases." },
    { step: "03", name: "Money back, in your systems", line: "Verified results, filed appeals, and recovered dollars land back in your existing workflow. No new system to learn." },
];

const MODULES = [
    { name: "Contract intelligence", line: "Every payer contract read, classified, and turned into a live rate engine.", to: "/product#contracts" },
    { name: "Eligibility verification", line: "Phone and portal agents verify coverage before the visit.", to: "/product#eligibility" },
    { name: "Denials & appeals", line: "Appealability scored, appeals drafted with contract citations.", to: "/product#denials" },
    { name: "AR voice agent", line: "Calls payers on unresolved claims and logs every outcome.", to: "/product#ar" },
    { name: "Claims intelligence", line: "Modifier errors and uncoded diagnoses caught before submission.", to: "/product#claims" },
    { name: "Analytics", line: "Type a question, get a dashboard — every answer shows its source.", to: "/product#analytics" },
];

const HERO_WIDGETS = [
    {
        tag: "PREVENT · ELIGIBILITY",
        tagColor: "#d94e47",
        kind: "check",
        rows: [
            ["Coverage", "Active · PPO"],
            ["Portal check", "41s"],
        ],
        chip: "VERIFIED BEFORE VISIT",
        chipTone: "ok",
    },
    {
        tag: "DETECT · UNDERPAYMENT",
        tagColor: "#3a5fe0",
        kind: "line",
        rows: [
            ["Contracted rate", "$21,480"],
            ["Variance", "−$2,370", "flag"],
        ],
        chip: "FLAGGED FOR RECOVERY",
        chipTone: "warn",
    },
    {
        tag: "RECOVER · APPEAL",
        tagColor: "#1a8f5f",
        kind: "bars",
        rows: [
            ["Appealability", "0.87"],
            ["Recovered", "+$14,208", "flag"],
        ],
        chip: "APPEAL FILED",
        chipTone: "ok",
    },
    {
        tag: "PREVENT · PRIOR AUTH",
        tagColor: "#7a57c8",
        kind: "steps",
        rows: [
            ["Rule match", "MRI prior auth"],
            ["Status", "Required", "flag"],
        ],
        chip: "TASK OPENED",
        chipTone: "info",
    },
    {
        tag: "DETECT · PAYER MIX",
        tagColor: "#2f6fe4",
        kind: "mix",
        rows: [
            ["Top leak", "Commercial PPO"],
            ["Risk value", "$86K", "flag"],
        ],
        chip: "DASHBOARD UPDATED",
        chipTone: "info",
    },
    {
        tag: "RECOVER · AR FOLLOW-UP",
        tagColor: "#c2453d",
        kind: "pulse",
        rows: [
            ["Payer queue", "8 claims"],
            ["Next action", "Call scheduled"],
        ],
        chip: "FOLLOW-UP READY",
        chipTone: "warn",
    },
] as const;

function WidgetSvg({ kind }: { kind: (typeof HERO_WIDGETS)[number]["kind"] }) {
    if (kind === "line") {
        return (
            <svg className="viz-svg" viewBox="0 0 100 26" preserveAspectRatio="none">
                <polyline
                    className="viz-draw"
                    points="0,20 14,16 28,18 42,10 56,13 70,6 84,9 100,3"
                    fill="none"
                    stroke="#6b8df9"
                    strokeWidth="2"
                    pathLength={100}
                    vectorEffect="non-scaling-stroke"
                />
                <polyline
                    points="0,22 14,21 28,22 42,20 56,21 70,19 84,20 100,18"
                    fill="none"
                    stroke="#ed6861"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.6"
                />
            </svg>
        );
    }
    if (kind === "check") {
        return (
            <svg className="viz-svg" viewBox="0 0 100 26">
                <circle
                    className="viz-draw"
                    cx="50"
                    cy="13"
                    r="10"
                    fill="none"
                    stroke="#2fae73"
                    strokeWidth="1.6"
                    pathLength={100}
                    vectorEffect="non-scaling-stroke"
                />
                <path
                    className="viz-draw viz-draw-late"
                    d="M 44 13 L 48.5 17.5 L 57 8.5"
                    fill="none"
                    stroke="#2fae73"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    pathLength={100}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        );
    }
    if (kind === "bars") {
        return (
            <svg className="viz-svg" viewBox="0 0 100 26" preserveAspectRatio="none">
                {[10, 24, 38, 52, 66, 80].map((x, i) => (
                    <rect
                        key={x}
                        className="viz-bar"
                        x={x}
                        y={22 - (i + 1) * 3}
                        width="9"
                        height={(i + 1) * 3 + 2}
                        rx="1.5"
                        fill="#46c98a"
                        opacity="0.85"
                        style={{ animationDelay: `${i * 0.14}s` }}
                    />
                ))}
            </svg>
        );
    }
    if (kind === "steps") {
        return (
            <svg className="viz-svg" viewBox="0 0 100 26">
                {[4, 13, 22].map((cy, i) => (
                    <g key={cy} className="viz-step" style={{ animationDelay: `${i * 0.4}s` }}>
                        <circle cx="6" cy={cy} r="3.4" fill="none" stroke="#9b6fd4" strokeWidth="1.6" />
                        <path d={`M4.2 ${cy} L5.6 ${cy + 1.4} L8 ${cy - 1.6}`} fill="none" stroke="#9b6fd4" strokeWidth="1.4" strokeLinecap="round" />
                        <rect x="14" y={cy - 1.4} width={i === 1 ? 70 : 56} height="2.8" rx="1.4" fill="#9b6fd4" opacity="0.28" />
                    </g>
                ))}
            </svg>
        );
    }
    if (kind === "pulse") {
        return (
            <svg className="viz-svg" viewBox="0 0 100 26" preserveAspectRatio="none">
                <polyline
                    className="viz-draw viz-pulse"
                    points="0,13 22,13 28,4 34,22 40,13 100,13"
                    fill="none"
                    stroke="#c2453d"
                    strokeWidth="2"
                    pathLength={100}
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
    return (
        <svg className="viz-svg viz-mix" viewBox="0 0 100 26">
            <circle cx="13" cy="13" r="10" fill="none" stroke="rgba(47,111,228,0.18)" strokeWidth="4" />
            <circle
                className="viz-draw"
                cx="13"
                cy="13"
                r="10"
                fill="none"
                stroke="#2f6fe4"
                strokeWidth="4"
                strokeDasharray="70 30"
                strokeLinecap="round"
                pathLength={100}
                vectorEffect="non-scaling-stroke"
                transform="rotate(-90 13 13)"
            />
            {[0, 1, 2, 3].map((i) => (
                <rect
                    key={i}
                    className="viz-bar"
                    x={34 + i * 16}
                    y={20 - (i + 1) * 3.6}
                    width="10"
                    height={(i + 1) * 3.6 + 2}
                    rx="1.5"
                    fill="#2f6fe4"
                    opacity="0.8"
                    style={{ animationDelay: `${i * 0.14}s` }}
                />
            ))}
        </svg>
    );
}

export default function Home() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);
            if (prefersReducedMotion()) return;

            /* hero-only entrance: elements revealCopy/revealWords don't already
               own (hero-note, CTA row, trust chips) — kept off .kicker/.sub/.words
               so it never double-tweens the same node. */
            gsap.from(".home-hero-inner > .hero-note, .home-hero-inner > .price-cta, .home-hero-inner > .trust-row", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.2,
            });

            /* drifting gradient blobs behind the glass */
            gsap.to(".blob-a", { x: 80, y: 50, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
            gsap.to(".blob-b", { x: -70, y: -40, duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1 });

            /* hero product carousel — each widget holds, then cross-fades into
               the next. The incoming tween starts at the exact same position as
               the outgoing one ("<") so total visible opacity never drops to
               zero between widgets, including on the loop's last → first step. */
            const slides = gsap.utils.toArray<HTMLElement>(".viz-slide");
            if (slides.length > 1) {
                const hold = 4.5;
                const transition = 0.8;
                gsap.set(slides, { autoAlpha: 0, y: 18, scale: 0.985, zIndex: 0 });
                gsap.set(slides[0], { autoAlpha: 1, y: 0, scale: 1, zIndex: 2 });

                const cycle = gsap.timeline({ repeat: -1, delay: 0.6 });
                slides.forEach((s, i) => {
                    const next = slides[(i + 1) % slides.length];
                    cycle
                        .to(
                            s,
                            { autoAlpha: 0, y: -18, scale: 0.985, zIndex: 0, duration: transition, ease: "power1.inOut" },
                            `+=${hold}`,
                        )
                        .fromTo(
                            next,
                            { autoAlpha: 0, y: 18, scale: 0.985, zIndex: 2 },
                            { autoAlpha: 1, y: 0, scale: 1, duration: transition, ease: "power1.inOut", immediateRender: false },
                            "<",
                        );
                });
            }

            /* stat numbers are static — rendered final in the markup, no count-up */

            gsap.from(".stat-tile", {
                opacity: 0,
                y: 24,
                stagger: 0.06,
                duration: 0.45,
                ease: "power3.out",
                scrollTrigger: { trigger: ".stats-row", start: "top 90%" },
            });

            gsap.from(".pipe-card", {
                opacity: 0,
                x: -28,
                stagger: 0.1,
                duration: 0.45,
                ease: "power3.out",
                scrollTrigger: { trigger: ".pipe-row", start: "top 88%" },
            });

            gsap.from(".home-layer", {
                opacity: 0,
                y: 26,
                stagger: 0.08,
                duration: 0.45,
                ease: "power3.out",
                scrollTrigger: { trigger: ".home-layers-grid", start: "top 90%" },
            });

            gsap.from(".module-card", {
                opacity: 0,
                y: 24,
                stagger: 0.05,
                duration: 0.4,
                ease: "power3.out",
                scrollTrigger: { trigger: ".modules-grid", start: "top 90%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef}>
            <div className="spine-zone">
            <section className="scene home-hero dark-section" id="home">
                <div className="blob blob-a" aria-hidden="true" />
                <div className="blob blob-b" aria-hidden="true" />
                <div className="wrap home-hero-grid">
                    <div className="home-hero-inner">
                        <p className="kicker">AI infrastructure for the revenue cycle</p>
                        <h1 className="h-giant">
                            Revenue,
                            <br />
                            <span className="grad">recovered.</span>
                        </h1>
                        
                        <p className="hero-note">
                            Healthcare Providers quietly lose 1–3% of net patient revenue to underpayment,
                            denials, and unworked appeals. Nuvae finds it — and brings it home.
                        </p>
                        <div className="price-cta">
                            <Link className="btn-big" href="/contact">
                                Book a walkthrough
                            </Link>
                            <button className="btn-glass" onClick={() => scrollToId("engine")}>
                                See how ↓
                            </button>
                        </div>
                        <div className="trust-row hero-trust">
                            <span className="trust-chip">Purpose-built for US healthcare</span>
                            <span className="trust-chip">Works with Epic / Cerner / Meditech</span>
                            <span className="trust-chip">HIPAA compliant</span>
                            <span className="trust-chip">SOC 2 Type II certified</span>
                        </div>
                    </div>

                    <div className="hero-viz" aria-hidden="true">
                        {HERO_WIDGETS.map((w) => (
                            <div className="viz-slide glass" key={w.tag}>
                                <span className="viz-tag" style={{ color: w.tagColor }}>
                                    {w.tag}
                                </span>
                                <WidgetSvg kind={w.kind} />
                                {w.rows.map(([label, value, tone]) => (
                                    <div className={`viz-row ${tone ?? ""}`} key={label}>
                                        <span>{label}</span>
                                        <b className={/[\d]/.test(value) ? "num" : ""}>{value}</b>
                                    </div>
                                ))}
                                <span className={`viz-chip ${w.chipTone}`}>{w.chip}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <MoneyReveal />

            <section className="scene lighter" id="home-stats">
                <div className="wrap">
                    <p className="kicker">Measurable impact across early deployments</p>
                    <h2 className="h-mid">Faster turnaround. Cleaner claims. Higher accuracy.</h2>
                    <div className="stats-row">
                        {STATS.map((s) => (
                            <div className="stat-tile glass" key={s.label}>
                                <span className="stat-num num">
                                    {s.value}
                                    {s.suffix}
                                </span>
                                <p>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <EngineMap />

            <RevenueIntelligence />

            <section className="scene dark-section" id="home-pipeline">
                <div className="wrap">
                    <p className="kicker">How it works</p>
                    <h2 className="h-big">
                        <Words lines={["From your systems,", "back to your systems."]} />
                    </h2>
                    <p className="sub mt-26">
                        Nuvae reads what your RCM already produces and returns verified,
                        recovered revenue into the same workflow. Live in weeks, not years.
                    </p>
                    <div className="pipe-row">
                        {PIPELINE.map((p) => (
                            <div className="pipe-card glass" key={p.step}>
                                <span className="pipe-step">{p.step}</span>
                                <b>{p.name}</b>
                                <p>{p.line}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="scene lighter" id="home-layers">
                <div className="wrap">
                    <p className="kicker">Three layers. One system.</p>
                    <h2 className="h-big">
                        <Words lines={["Revenue leaks at three points.", "Nuvae closes all three."]} />
                    </h2>
                    <div className="home-layers-grid">
                        {LAYERS.map((l) => (
                            <div className="home-layer glass" key={l.label}>
                                <h3>{l.label}</h3>
                                <span className="lsub">{l.sub}</span>
                                <p>{l.line}</p>
                            </div>
                        ))}
                    </div>
                    <Link className="lgo" href="/product">
                        See the full product tour →
                    </Link>
                </div>
            </section>

            <section className="scene light" id="home-modules">
                <div className="wrap">
                    <p className="kicker">The modules</p>
                    <h2 className="h-big">
                        <Words lines={["Everything a revenue team", "wishes it had."]} />
                    </h2>
                    <div className="modules-grid">
                        {MODULES.map((m) => (
                            <Link className="module-card glass" href={m.to} key={m.name}>
                                <b>{m.name}</b>
                                <p>{m.line}</p>
                                <span className="module-go">See it in the product →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="scene dark-section" id="home-roi">
                <div className="wrap home-roi-wrap">
                    <p className="kicker">The business case</p>
                    <h2 className="h-big">
                        <Words lines={["What's it worth?"]} />
                    </h2>
                    <div className="home-roi-num grad num">$5.17M – $6.92M</div>
                    <p className="sub" style={{ margin: "18px auto 0", textAlign: "center" }}>
                        annual value for a mid-size healthcare provider — eligibility, contract
                        analytics, and appeals combined, year one.
                    </p>
                    <div className="price-cta" style={{ justifyContent: "center" }}>
                        <Link className="btn-big" href="/roi">
                            See the numbers by healthcare provider size
                        </Link>
                    </div>
                </div>
            </section>

            <CompareTable />
            <FinalCta />
            <ScrollSpine />
            </div>
        </div>
    );
}
