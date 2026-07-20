import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

const ROWS: Array<{
    metric: string;
    industry: string;
    industrySrc: string;
    nuvae: string;
    nuvaeSrc: string;
}> = [
    {
        metric: "Initial claim denial rate",
        industry: "11.6% average",
        industrySrc: "Kodiak Solutions / HFMA, 2025",
        nuvae: "25–40% fewer denials within 90 days",
        nuvaeSrc: "Nuvae pilot data, 2025–2026",
    },
    {
        metric: "Net revenue lost to denials",
        industry: "4.8% of net patient revenue",
        industrySrc: "HFMA Pulse Survey",
        nuvae: "35–55% of identified underpayment recovered in 6–12 months",
        nuvaeSrc: "Nuvae deployment data",
    },
    {
        metric: "Cost to rework one denied claim",
        industry: "$25–$118 per claim",
        industrySrc: "Becker's Hospital Review / HFMA",
        nuvae: "Appeal drafted in 20–30 minutes, down from 3–4 hours",
        nuvaeSrc: "Nuvae pilot deployments, 2024–2025",
    },
    {
        metric: "Eligibility check time",
        industry: "3–5 minutes per check, manual",
        industrySrc: "Manual payer-portal / phone workflow",
        nuvae: "~41 seconds, fully automated",
        nuvaeSrc: "Nuvae deployment data",
    },
];

export default function CompareTable() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) return;

            revealWords(root);
            revealCopy(root);

            gsap.utils.toArray<HTMLElement>(".cmp2-row").forEach((r) => {
                gsap.from(r, {
                    opacity: 0,
                    y: 26,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: { trigger: r, start: "top 92%" },
                });
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene compare" id="compare" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">The difference, in numbers</p>
                <h2 className="h-big">
                    <Words lines={["Industry average.", "Nuvae."]} />
                </h2>
                <p className="sub mt-26">
                    Cited industry benchmarks next to what Nuvae hospitals actually see —
                    every figure sourced, nothing rounded up.
                </p>

                <div className="cmp2-table">
                    <div className="cmp2-head">
                        <span>Metric</span>
                        <span>Industry average</span>
                        <span>With Nuvae</span>
                    </div>
                    {ROWS.map((r) => (
                        <div className="cmp2-row" key={r.metric}>
                            <span className="cmp2-metric">{r.metric}</span>
                            <span className="cmp2-cell">
                                <b>{r.industry}</b>
                                <em>{r.industrySrc}</em>
                            </span>
                            <span className="cmp2-cell cmp2-win">
                                <b>{r.nuvae}</b>
                                <em>{r.nuvaeSrc}</em>
                            </span>
                        </div>
                    ))}
                </div>

                <p className="cmp2-foot">
                    Industry figures are third-party published benchmarks, cited above. Nuvae
                    figures are indicative, drawn from pilot and early deployment data — actual
                    results vary by hospital.
                </p>
            </div>
        </section>
    );
}
