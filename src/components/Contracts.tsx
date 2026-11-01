"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, formatUsd, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";
import Logo from "./Logo";

const FILES: Array<{ chip: string; kind: "ok" | "warn" | "info"; name: string; meta: string }> = [
    { chip: "CLASSIFIED · PPO", kind: "ok", name: "BlueShield 2026.pdf", meta: "v4 · 182 pages" },
    { chip: "RENEWS IN 60 DAYS", kind: "warn", name: "Aetna HMO Master.pdf", meta: "v2 · 96 pages" },
    { chip: "2,341 RATES FOUND", kind: "info", name: "United Surgical.pdf", meta: "v7 · 214 pages" },
    { chip: "AMENDMENT LINKED", kind: "ok", name: "Cigna Imaging Amd.pdf", meta: "v1 · 12 pages" },
    { chip: "ESCALATOR DUE", kind: "warn", name: "Kaiser 2025.pdf", meta: "v3 · 143 pages" },
    { chip: "VERSION DIFF READY", kind: "info", name: "Humana Renewal.pdf", meta: "v2 · 88 pages" },
    { chip: "CLASSIFIED · HMO", kind: "ok", name: "Anthem South.pdf", meta: "v5 · 167 pages" },
    { chip: "TERMS EXTRACTED", kind: "ok", name: "Molina Medi-Cal.pdf", meta: "v1 · 74 pages" },
];

export default function Contracts() {
    const rootRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const savNumRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) {
                if (savNumRef.current) savNumRef.current.textContent = formatUsd(2_300_000);
                return;
            }

            revealWords(root);
            revealCopy(root);

            gsap.from("#contracts .proof-item", {
                opacity: 0,
                y: 30,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: "#contracts .proof-row", start: "top 90%" },
            });

            gsap.from(".drive-panel", {
                y: 90,
                opacity: 0,
                scale: 0.96,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".drive-panel", start: "top 82%" },
            });
            gsap.to(".drive-panel .ai-chip", {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.14,
                ease: "back.out(2.2)",
                scrollTrigger: { trigger: ".drive-panel", start: "top 60%" },
            });

            /* horizontal gallery on desktop */
            const mm = gsap.matchMedia();
            mm.add("(min-width: 901px)", () => {
                const track = trackRef.current;
                if (!track) return;
                const getX = () =>
                    -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.04);
                gsap.to(track, {
                    x: getX,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".tools",
                        pin: pinRef.current,
                        start: "top top",
                        end: () => "+=" + (-getX() + 200),
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
            });
            mm.add("(max-width: 900px)", () => {
                gsap.utils.toArray<HTMLElement>(".tool-card").forEach((c) => {
                    gsap.from(c, {
                        opacity: 0,
                        y: 60,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: { trigger: c, start: "top 88%" },
                    });
                });
            });

            gsap.from(".stale .panel", {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".stale .panel", start: "top 80%" },
            });
            gsap.to(".stale .flag", {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.22,
                ease: "back.out(2)",
                scrollTrigger: { trigger: ".stale", start: "top 55%" },
            });

            gsap.from(".gov .radar", {
                opacity: 0,
                scale: 0.85,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".gov", start: "top 78%" },
            });
            gsap.from(".gov .sat", {
                opacity: 0,
                scale: 0.5,
                duration: 0.7,
                stagger: 0.12,
                ease: "back.out(2)",
                scrollTrigger: { trigger: ".gov", start: "top 62%" },
            });

            // Server HTML carries the real figure so crawlers read it; reset to $0 so the scroll count-up starts from zero.
            if (savNumRef.current) savNumRef.current.textContent = formatUsd(0);
            const sav = { v: 0 };
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".savings",
                    start: "top top",
                    end: "+=110%",
                    scrub: 0.5,
                    pin: true,
                },
            })
                .to(sav, {
                    v: 2_300_000,
                    ease: "power1.in",
                    duration: 1,
                    onUpdate: () => {
                        if (savNumRef.current) savNumRef.current.textContent = formatUsd(sav.v);
                    },
                })
                .to(
                    ".sav-bars i",
                    { scaleY: 1, stagger: 0.04, duration: 0.4, ease: "power2.out" },
                    0.2,
                );
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef}>
            <section className="scene light chapter-intro" id="contracts">
                <div className="wrap">
                    <p className="kicker">Chapter 01 — Contracts</p>
                    <h2 className="h-giant">
                        <Words lines={["It all starts with", "the contract."]} />
                    </h2>
                    <p className="sub mt-30">
                        The rates you fought for are buried in PDFs. Nuvae digs them out — and puts
                        them to work.
                    </p>
                    <div className="proof-row">
                        <div className="proof-item">
                            <b>1–3%</b>
                            <span>of net patient revenue typically lost to contract underpayment</span>
                            <span className="proof-src">EY RCM Analysis 2026 · HFMA</span>
                        </div>
                        <div className="proof-item">
                            <b>5–15%</b>
                            <span>of remittances get manually audited against contracted rates today</span>
                            <span className="proof-src">HFMA Pulse Survey · Advisory Board 2024</span>
                        </div>
                        <div className="proof-item">
                            <b>35–55%</b>
                            <span>of identified underpayments recovered within 6–12 months of pursuit</span>
                            <span className="proof-src">Nuvae deployment observations</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="scene lighter" id="repo">
                <div className="wrap repo-stage">
                    <div className="repo-head">
                        <h2 className="h-big">
                            <Words lines={["Like Drive.", "But it reads everything."]} />
                        </h2>
                        <p className="sub mt-26">
                            Drop in every payor contract. Nuvae classifies it, tracks versions, and
                            never forgets a deadline.
                        </p>
                    </div>
                    <div className="panel drive-panel">
                        <div className="panel-bar">
                            <span className="dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            Contract Repository
                            <span className="status">AI watching</span>
                        </div>
                        <div className="drive">
                            {FILES.map((f) => (
                                <div className="file" key={f.name}>
                                    <span className={`ai-chip ${f.kind}`}>{f.chip}</span>
                                    <span className="fico" />
                                    <b>{f.name}</b>
                                    <span className="fmeta">{f.meta}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="tools">
                <div className="tools-pin" ref={pinRef}>
                    <div className="tools-head">
                        <p className="kicker">Everything a contract team wishes it had</p>
                        <h2 className="h-mid">One repository. Four superpowers.</h2>
                    </div>
                    <div className="tools-track" ref={trackRef}>
                        <div className="tool-card">
                            <span className="t-k">Rate sheets</span>
                            <h3>Create. Manage. Model.</h3>
                            <p>
                                Build rate sheets from any contract. Model a new one before you sign
                                it — and see what it does to revenue.
                            </p>
                            <div className="tool-visual">
                                <div className="trow">
                                    <b>Knee arthroplasty</b>
                                    <span className="v num">$21,480</span>
                                </div>
                                <div className="trow">
                                    <b>MRI brain w/wo</b>
                                    <span className="v num">$1,212</span>
                                </div>
                                <div className="trow">
                                    <b>Colonoscopy + biopsy</b>
                                    <span className="v num">$864</span>
                                </div>
                                <div className="trow">
                                    <b>Proposed 2027 model</b>
                                    <span className="v pos num">+4.2% revenue</span>
                                </div>
                            </div>
                        </div>
                        <div className="tool-card">
                            <span className="t-k">Analytics</span>
                            <h3>Your contracts, charted.</h3>
                            <p>
                                Which payor pays best. Which service line leaks. Which contract
                                quietly got worse. One glance.
                            </p>
                            <div className="tool-visual">
                                <div className="trow">
                                    <b>Best performer</b>
                                    <span className="pillx g">UNITED · 98.2% OF RATE</span>
                                </div>
                                <div className="trow">
                                    <b>Worst performer</b>
                                    <span className="pillx r">BLUESHIELD · 91.4%</span>
                                </div>
                                <div className="trow">
                                    <b>Leakiest line</b>
                                    <span className="pillx a">OUTPATIENT IMAGING</span>
                                </div>
                                <div className="trow">
                                    <b>Trend vs last quarter</b>
                                    <span className="v pos num">+$186K recovered</span>
                                </div>
                            </div>
                        </div>
                        <div className="tool-card">
                            <span className="t-k">Reminders</span>
                            <h3>Deadlines find you first.</h3>
                            <p>
                                Renewals, escalators, termination windows, filing limits. Nuvae
                                reads the dates and taps your shoulder in time.
                            </p>
                            <div className="tool-visual">
                                <div className="trow">
                                    <b>Aetna renewal window</b>
                                    <span className="pillx a">OPENS IN 60 DAYS</span>
                                </div>
                                <div className="trow">
                                    <b>Kaiser escalator +3%</b>
                                    <span className="pillx g">APPLY SEP 1</span>
                                </div>
                                <div className="trow">
                                    <b>Cigna termination notice</b>
                                    <span className="pillx r">90-DAY WINDOW</span>
                                </div>
                                <div className="trow">
                                    <b>Email + in-app</b>
                                    <span className="v">Automatic</span>
                                </div>
                            </div>
                        </div>
                        <div className="tool-card">
                            <span className="t-k">Stale rates</span>
                            <h3>Old rates cost real money.</h3>
                            <p>
                                Rates that haven't moved in years get flagged against today's
                                market and government benchmarks — with the dollar impact attached.
                            </p>
                            <div className="tool-visual">
                                <div className="trow">
                                    <b>Cardiology panel</b>
                                    <span className="pillx a">UNCHANGED 3 YRS</span>
                                </div>
                                <div className="trow">
                                    <b>vs Medicare today</b>
                                    <span className="v neg num">−11% behind</span>
                                </div>
                                <div className="trow">
                                    <b>Annual impact</b>
                                    <span className="v neg num">−$412,000</span>
                                </div>
                                <div className="trow">
                                    <b>Suggested action</b>
                                    <span className="pillx g">RENEGOTIATE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="scene stale">
                <div className="wrap">
                    <div>
                        <p className="kicker">Stale rate detection</p>
                        <h2 className="h-big">
                            <Words lines={["Rates go stale.", "Nuvae notices first."]} />
                        </h2>
                        <p className="sub mt-26">
                            Every rate is checked against time, market, and Medicare. The moment
                            one falls behind, you know what it's costing you.
                        </p>
                    </div>
                    <div className="panel">
                        <div className="panel-bar">
                            <span className="dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            Rate health · BlueShield PPO
                            <span className="status">Scanning</span>
                        </div>
                        <div className="stale-rows">
                            <div className="srow">
                                <span>
                                    <b>Orthopedic surgery</b>
                                    <br />
                                    <span className="c">Updated 2026</span>
                                </span>
                                <span className="r num">$21,480</span>
                                <span className="flag ok">CURRENT</span>
                            </div>
                            <div className="srow">
                                <span>
                                    <b>Cardiology panel</b>
                                    <br />
                                    <span className="c">Updated 2023</span>
                                </span>
                                <span className="r num">$1,940</span>
                                <span className="flag">STALE · −$412K/YR</span>
                            </div>
                            <div className="srow">
                                <span>
                                    <b>Outpatient imaging</b>
                                    <br />
                                    <span className="c">Updated 2022</span>
                                </span>
                                <span className="r num">$1,212</span>
                                <span className="flag">STALE · −$188K/YR</span>
                            </div>
                            <div className="srow">
                                <span>
                                    <b>Emergency medicine</b>
                                    <br />
                                    <span className="c">Updated 2026</span>
                                </span>
                                <span className="r num">$1,142</span>
                                <span className="flag ok">CURRENT</span>
                            </div>
                            <div className="srow">
                                <span>
                                    <b>Lab services</b>
                                    <br />
                                    <span className="c">Updated 2024</span>
                                </span>
                                <span className="r num">$48</span>
                                <span className="flag">DRIFTING · −$61K/YR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="scene gov">
                <div className="wrap">
                    <div className="radar" aria-hidden="true">
                        <span className="ring" />
                        <span className="ring" />
                        <span className="ring" />
                        <span className="core">
                            <Logo tone="light" animated={false} height={9} />
                        </span>
                        <span className="pulse" />
                        <span className="sat s1">
                            <i>●</i>Medicare IPPS/OPPS
                        </span>
                        <span className="sat s2">
                            <i>●</i>Medi-Cal
                        </span>
                        <span className="sat s3">
                            <i>●</i>Medicaid
                        </span>
                        <span className="sat s4">
                            <i>●</i>TRICARE
                        </span>
                        <span className="sat s5">
                            <i>●</i>Workers' Comp
                        </span>
                    </div>
                    <div>
                        <p className="kicker">Government rate crawler</p>
                        <h2 className="h-big">
                            <Words lines={["Medicare moved.", "You already knew."]} />
                        </h2>
                        <p className="sub mt-26">
                            Nuvae crawls government fee schedules automatically — Medicare,
                            Medicaid, Medi-Cal, TRICARE — and reprices your world the moment they
                            change. No downloads. No spreadsheets. No surprises.
                        </p>
                    </div>
                </div>
            </section>

            <section className="scene savings" id="savings">
                <div className="wrap">
                    <p className="kicker">The payoff</p>
                    <h2 className="h-big" style={{ marginBottom: 44 }}>
                        All of it adds up to one number.
                    </h2>
                    <div className="sav-num grad num" ref={savNumRef}>
                        {formatUsd(2_300_000)}
                    </div>
                    <p className="sub sav-sub">
                        annual value from contract analytics alone, at a $300M-NPR
                        hospital — mid-path, year one.
                        <br />
                        Underpayment recovery. Rate negotiation uplift. Analyst time back.
                    </p>
                    <div className="sav-bars" aria-hidden="true">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <i key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
