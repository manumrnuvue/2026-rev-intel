import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";
import ScrollSpine from "../components/ScrollSpine";

const SIZES = [
    {
        label: "Small hospital",
        total: "$755k – $1.79M",
        note: "Eligibility and appeals recovery lead the way — the fastest cash-cycle wins for a lean team.",
    },
    {
        label: "Mid-size hospital",
        total: "$5.17M – $6.92M",
        note: "Contract analytics becomes the single largest line, as payer mix and claim volume compound.",
    },
    {
        label: "Large health system",
        total: "$13.2M – $25.3M",
        note: "Every module, system-wide — the full value of closing all three layers at scale.",
    },
];

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

export default function Roi() {
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
            <Helmet>
                <title>ROI — Nuvae</title>
                <meta
                    name="description"
                    content="The indicative annual value of Nuvae, by hospital size, grounded in cited industry benchmarks."
                />
                <link rel="canonical" href="https://nuvae.ai/roi" />
                <meta property="og:title" content="ROI — Nuvae" />
                <meta
                    property="og:description"
                    content="The indicative annual value of Nuvae, by hospital size, grounded in cited industry benchmarks."
                />
                <meta property="og:url" content="https://nuvae.ai/roi" />
            </Helmet>

            <div className="spine-zone">
            <section className="scene" id="roi" ref={rootRef}>
                <div className="wrap">
                    <p className="kicker">The business case</p>
                    <h1 className="h-giant">
                        <Words lines={["What it's worth,", "by hospital size."]} />
                    </h1>
                    <p className="sub mt-30">
                        Eligibility reduces denials entering the system. Contract analytics
                        recovers revenue on claims paid at the wrong rate. Appeals recover revenue
                        on claims that weren't paid at all. Each module is independent and
                        additive.
                    </p>
                </div>
            </section>

            <section className="scene light" id="roi-segments">
                <div className="wrap">
                    <div className="also-grid">
                        {SIZES.map((s) => (
                            <div className="also" key={s.label}>
                                <b>{s.label}</b>
                                <p className="num" style={{ fontSize: 26, fontWeight: 800, margin: "8px 0" }}>
                                    {s.total}
                                </p>
                                <p>indicative annual value, year one</p>
                                <p style={{ marginTop: 10 }}>{s.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="sub" style={{ marginTop: 30, fontSize: 15, maxWidth: "60ch" }}>
                        Ranges are grounded in observed deployment patterns, not aspirational
                        projections — a starting point for discovery, not a quote. The real
                        number comes from your claim volume, payer mix, and current denial rates.
                    </p>
                </div>
            </section>

            <section className="scene lighter" id="roi-sources">
                <div className="wrap">
                    <p className="kicker">Benchmark sources</p>
                    <h2 className="h-mid">Grounded in cited industry data.</h2>
                    <div className="trust-row">
                        {SOURCES.map((s) => (
                            <span className="chip" key={s}>
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="scene" id="roi-cta">
                <div className="wrap price-cta">
                    <Link className="btn-big" to="/contact">
                        Get your number
                    </Link>
                    <Link className="btn-quiet" to="/pricing">
                        See pricing
                    </Link>
                </div>
            </section>
            <ScrollSpine />
            </div>
        </>
    );
}
