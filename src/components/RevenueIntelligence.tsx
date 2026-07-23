"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

const PLOT = { left: 110, right: 1010, top: 120, bottom: 450 };
const W = PLOT.right - PLOT.left;
const H = PLOT.bottom - PLOT.top;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
// normalised recovered-revenue per month (0–1), a rising curve with one dip
const VALUES = [0.12, 0.2, 0.29, 0.34, 0.3, 0.47, 0.58, 0.71, 0.84];

const X = (i: number) => PLOT.left + (i * W) / (MONTHS.length - 1);
const Y = (v: number) => PLOT.bottom - v * H;

const POINTS = VALUES.map((v, i) => ({ x: X(i), y: Y(v) }));

const linePath =
    "M " + POINTS.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");
const areaPath =
    `M ${POINTS[0].x} ${PLOT.bottom} L ` +
    POINTS.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ") +
    ` L ${POINTS[POINTS.length - 1].x} ${PLOT.bottom} Z`;

const GRID = [0, 0.25, 0.5, 0.75, 1];

const CALLOUTS = [
    { i: 8, color: "#46c98a", title: "+$1.24M", sub: "recovered this month", dy: -78 },
    { i: 6, color: "#f2b955", title: "$318K", sub: "underpayment flagged", dy: -70 },
    { i: 3, color: "#4e7af7", title: "94%", sub: "first-pass clean rate", dy: -66 },
];

export default function RevenueIntelligence() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);

            const reduce = prefersReducedMotion();

            gsap.set(".ri-bar", { transformOrigin: "center bottom", transformBox: "fill-box" });

            if (reduce) {
                gsap.set(".ri-bar", { scaleY: 1, opacity: 1 });
                gsap.set(".ri-line", { strokeDashoffset: 0 });
                gsap.set(".ri-area, .ri-marker, .ri-callout, .ri-grid", { opacity: 1 });
                return;
            }

            gsap.set(".ri-bar", { scaleY: 0, opacity: 0 });
            gsap.set(".ri-line", { strokeDasharray: 1, strokeDashoffset: 1 });
            gsap.set(".ri-area", { opacity: 0 });
            gsap.set(".ri-grid", { opacity: 0 });
            gsap.set(".ri-marker", { scale: 0, opacity: 0, transformOrigin: "center", transformBox: "fill-box" });
            gsap.set(".ri-callout", { opacity: 0, y: 12 });
            gsap.set(".ri-cursor", { opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: { trigger: ".ri-chart", start: "top 74%" },
            });

            tl.to(".ri-grid", { opacity: 1, duration: 0.5, stagger: 0.06 })
                .to(".ri-bar", { scaleY: 1, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" }, "-=0.2")
                .to(".ri-line", { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, "-=0.5")
                .to(".ri-area", { opacity: 1, duration: 0.8 }, "-=0.7")
                .to(".ri-marker", { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: "back.out(2)" }, "-=0.5")
                .to(".ri-callout", { opacity: 1, y: 0, duration: 0.5, stagger: 0.14, ease: "power3.out" }, "-=0.3")
                .to(".ri-cursor", { opacity: 1, duration: 0.4 }, "-=0.4");

            // sweeping analysis cursor
            gsap.fromTo(
                ".ri-cursor",
                { x: 0 },
                { x: W, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 },
            );
            // markers keep a gentle pulse
            gsap.to(".ri-marker-ring", { scale: 1.6, opacity: 0, transformOrigin: "center", transformBox: "fill-box", duration: 1.8, ease: "power1.out", stagger: 0.4, repeat: -1 });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene dark-section revenue-intel" id="revenue-intelligence" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">Revenue intelligence</p>
                <h2 className="h-big">
                    <Words lines={["Every dollar,", "explained."]} />
                </h2>
                <p className="sub mt-26">
                    Ask in plain English. Nuvae answers with a live dashboard — and every number
                    links straight back to the claim, contract, or remittance it came from.
                </p>

                <div className="ri-card">
                <div className="ri-chart" aria-label="Recovered revenue trending up, with sourced insights">
                    <svg viewBox="0 0 1080 520" role="img" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="ri-area-fill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#46c98a" stopOpacity="0.42" />
                                <stop offset="100%" stopColor="#46c98a" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="ri-bar-fill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6b8df9" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="#6b8df9" stopOpacity="0.08" />
                            </linearGradient>
                            <filter id="ri-glow" x="-120%" y="-120%" width="340%" height="340%">
                                <feGaussianBlur stdDeviation="4" />
                            </filter>
                        </defs>

                        {/* query prompt */}
                        <text className="ri-query" x={PLOT.left} y="58" style={{ fontSize: 22, fontWeight: 600 }}>
                            <tspan fill="#9b6fd4">⌕ </tspan>
                            <tspan fill="#f2f2f4">How much did we recover last quarter?</tspan>
                            <tspan className="ri-caret" fill="#ed6861"> ▌</tspan>
                        </text>

                        {/* grid + axis labels */}
                        {GRID.map((g) => {
                            const y = PLOT.bottom - g * H;
                            return (
                                <g className="ri-grid" key={g}>
                                    <line x1={PLOT.left} y1={y} x2={PLOT.right} y2={y} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
                                    <text x={PLOT.left - 16} y={y} textAnchor="end" dominantBaseline="central" fill="#8b8b93" style={{ fontSize: 13 }}>
                                        ${(g * 6).toFixed(1)}M
                                    </text>
                                </g>
                            );
                        })}

                        {/* bars */}
                        {POINTS.map((p, i) => (
                            <rect
                                key={`bar-${i}`}
                                className="ri-bar"
                                x={p.x - 22}
                                y={p.y}
                                width="44"
                                height={PLOT.bottom - p.y}
                                rx="5"
                                fill="url(#ri-bar-fill)"
                            />
                        ))}

                        {/* area + trend line */}
                        <path className="ri-area" d={areaPath} fill="url(#ri-area-fill)" />
                        <path className="ri-line" d={linePath} fill="none" stroke="#46c98a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} filter="url(#ri-glow)" />

                        {/* month labels */}
                        {MONTHS.map((m, i) => (
                            <text key={m} className="ri-grid" x={X(i)} y={PLOT.bottom + 28} textAnchor="middle" fill="#8b8b93" style={{ fontSize: 13 }}>
                                {m}
                            </text>
                        ))}

                        {/* data markers + callouts */}
                        {CALLOUTS.map((c) => {
                            const p = POINTS[c.i];
                            return (
                                <g key={c.i}>
                                    <circle className="ri-marker-ring" cx={p.x} cy={p.y} r="9" fill="none" stroke={c.color} strokeWidth="2" />
                                    <circle className="ri-marker" cx={p.x} cy={p.y} r="6" fill={c.color} stroke="#0e0e11" strokeWidth="2" />
                                    <g className="ri-callout">
                                        <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + c.dy + 30} stroke={c.color} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 3" />
                                        <text x={p.x} y={p.y + c.dy} textAnchor="middle" fill={c.color} style={{ fontSize: 26, fontWeight: 800 }}>
                                            {c.title}
                                        </text>
                                        <text x={p.x} y={p.y + c.dy + 22} textAnchor="middle" fill="#b8b8bf" style={{ fontSize: 14, fontWeight: 500 }}>
                                            {c.sub}
                                        </text>
                                    </g>
                                </g>
                            );
                        })}

                        {/* sweeping cursor */}
                        <line className="ri-cursor" x1={PLOT.left} y1={PLOT.top - 6} x2={PLOT.left} y2={PLOT.bottom} stroke="#ed6861" strokeOpacity="0.6" strokeWidth="2" />
                    </svg>
                </div>
                </div>
            </div>
        </section>
    );
}
