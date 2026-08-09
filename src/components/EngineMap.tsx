"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Words, prefersReducedMotion, revealCopy, revealWords } from "../lib/anim";

gsap.registerPlugin(MotionPathPlugin);

const CORAL = "#ed6861";
const BLUE = "#4e7af7";
const GREEN = "#46c98a";
const VIOLET = "#9b6fd4";

type Pt = { id: string; x: number; y: number; r: number; color: string };

const SRC_H: Pt = { id: "src-h", x: 110, y: 250, r: 32, color: CORAL };
const SRC_C: Pt = { id: "src-c", x: 110, y: 470, r: 32, color: VIOLET };
const HUB: Pt = { id: "hub", x: 340, y: 360, r: 56, color: VIOLET };
const TOTAL: Pt = { id: "total", x: 1030, y: 360, r: 66, color: GREEN };

type Module = { id: string; x: number; y: number; color: string; layer: string; name: string; value: number };
const MX = 650;
const MODULES: Module[] = [
    { id: "m1", x: MX, y: 90, color: CORAL, layer: "Prevent", name: "Eligibility & prior auth", value: 820 },
    { id: "m2", x: MX, y: 205, color: CORAL, layer: "Prevent", name: "Claims intelligence", value: 640 },
    { id: "m3", x: MX, y: 320, color: BLUE, layer: "Detect", name: "Contract intelligence", value: 1180 },
    { id: "m4", x: MX, y: 435, color: BLUE, layer: "Detect", name: "Underpayment radar", value: 940 },
    { id: "m5", x: MX, y: 550, color: GREEN, layer: "Recover", name: "Denials & appeals", value: 1010 },
    { id: "m6", x: MX, y: 665, color: GREEN, layer: "Recover", name: "AR voice agent", value: 580 },
];
const SUM = MODULES.reduce((s, m) => s + m.value, 0); // 5170 → $5.17M

const fmtMod = (v: number) => (v >= 1000 ? `+$${(v / 1000).toFixed(2)}M` : `+$${Math.round(v)}K`);
const fmtTotal = (v: number) => `$${(v / 1000).toFixed(2)}M`;

function branch(a: { x: number; y: number }, b: { x: number; y: number }) {
    const mx = (a.x + b.x) / 2;
    return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

type Edge = { id: string; d: string; color: string; pulse?: 0 | 2 };
const EDGES: Edge[] = [
    { id: "ei-h", d: branch(SRC_H, HUB), color: CORAL, pulse: 0 },
    { id: "ei-c", d: branch(SRC_C, HUB), color: VIOLET, pulse: 0 },
    ...MODULES.map((m) => ({ id: `eo-${m.id}`, d: branch(HUB, m), color: m.color })),
    ...MODULES.map((m) => ({ id: `em-${m.id}`, d: branch(m, TOTAL), color: GREEN, pulse: 2 as const })),
];

const LAYER_NOTES = [
    { name: "Prevent", color: CORAL, line: "Eligibility, prior auth, and claims scrubbing stop denials before a claim is ever sent." },
    { name: "Detect", color: BLUE, line: "Contract intelligence and the underpayment radar catch every dollar the payer shorted." },
    { name: "Recover", color: GREEN, line: "Denials, appeals, and the AR voice agent chase down what's already been lost." },
];

export default function EngineMap() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);

            const moneyEls = gsap.utils.toArray<SVGTextElement>(".eg-money");
            const totalEl = root.querySelector<SVGTextElement>(".eg-total-num");

            // Static engine graph: no popup/scale-in, no pulsing halos or float.
            // Edges drawn, nodes shown, dollar readouts at their final green value.
            gsap.set(".eg-edge", { strokeDashoffset: 0 });
            gsap.set(".eg-node, .eg-edge-halo, .eg-pulse", { opacity: 1 });
            gsap.set(".eg-node", { scale: 1 });
            moneyEls.forEach((el, i) => {
                el.textContent = fmtMod(MODULES[i].value);
                el.style.fill = GREEN;
            });
            if (totalEl) totalEl.textContent = fmtTotal(SUM);

            if (prefersReducedMotion()) return;

            // The one motion that stays live: money flowing along the edges —
            // data in from the sources, recovered dollars out into the total.
            gsap.utils.toArray<SVGCircleElement>(".eg-pulse").forEach((dot, i) => {
                const edgeId = dot.dataset.edge!;
                const stage = Number(dot.dataset.stage);
                gsap.to(dot, {
                    motionPath: { path: `#${edgeId}`, align: `#${edgeId}`, alignOrigin: [0.5, 0.5] },
                    duration: stage === 0 ? 1.4 : 1.7,
                    ease: "power1.inOut",
                    repeat: -1,
                    delay: (stage === 0 ? 0 : 1) * 0.8 + (i % 4) * 0.25,
                    repeatDelay: 1.2,
                });
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene light engine-flow" id="engine" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">The engine</p>
                <h2 className="h-big">
                    <Words lines={["Find every gap.", "Recover every dollar."]} />
                </h2>
                <p className="sub mt-26">
                    Claims and contracts flow into the Nuvae engine, fan out to agents that each
                    catch a different leak — then merge back into one number: revenue recovered.
                </p>

                <div className="eg-card">
                    <div className="engine-graph" aria-label="Data flows into the Nuvae engine, each agent recovers a dollar amount, and they merge into total revenue recovered">
                        <svg viewBox="0 0 1200 760" role="img" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <radialGradient id="eg-hub-fill" cx="50%" cy="40%" r="70%">
                                    <stop offset="0%" stopColor="#b98ce6" />
                                    <stop offset="55%" stopColor="#9b6fd4" />
                                    <stop offset="100%" stopColor="#7d51bd" />
                                </radialGradient>
                                <radialGradient id="eg-total-fill" cx="50%" cy="40%" r="70%">
                                    <stop offset="0%" stopColor="#68d9a3" />
                                    <stop offset="60%" stopColor="#46c98a" />
                                    <stop offset="100%" stopColor="#2fae73" />
                                </radialGradient>
                                <filter id="eg-glow" x="-120%" y="-120%" width="340%" height="340%">
                                    <feGaussianBlur stdDeviation="6" />
                                </filter>
                                <filter id="eg-pulse-glow" x="-300%" y="-300%" width="700%" height="700%">
                                    <feGaussianBlur stdDeviation="3" />
                                </filter>
                            </defs>

                            {/* edges behind nodes */}
                            <g>
                                {EDGES.map((e) => (
                                    <g key={e.id}>
                                        <path className="eg-edge-halo" d={e.d} fill="none" stroke={e.color} strokeOpacity="0.1" strokeWidth="9" strokeLinecap="round" filter="url(#eg-glow)" />
                                        <path id={e.id} data-edge={e.id} className="eg-edge" d={e.d} fill="none" stroke={e.color} strokeOpacity="0.42" strokeWidth={e.pulse !== undefined ? 2.6 : 2} strokeLinecap="round" pathLength={1} strokeDasharray="1" />
                                    </g>
                                ))}
                            </g>

                            {/* flowing pulses: sources → hub, modules → total */}
                            {EDGES.filter((e) => e.pulse !== undefined).map((e) => (
                                <circle key={`p-${e.id}`} className="eg-pulse" data-edge={e.id} data-stage={e.pulse} r="5" fill={e.pulse === 2 ? GREEN : e.color} filter="url(#eg-pulse-glow)" />
                            ))}

                            {/* input nodes */}
                            {[{ n: SRC_H, g: "H", l: "Your healthcare provider" }, { n: SRC_C, g: "C", l: "Payer contracts" }].map(({ n, g, l }) => (
                                <g className="eg-node" data-id={n.id} data-kind="source" key={n.id}>
                                    <circle cx={n.x} cy={n.y} r={n.r} fill="#fff" stroke={n.color} strokeWidth="2.6" />
                                    <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" fill={n.color} style={{ fontSize: 22, fontWeight: 800 }}>{g}</text>
                                    <text className="eg-label" x={n.x} y={n.y + n.r + 24} textAnchor="middle" style={{ fontSize: 17, fontWeight: 700 }}>{l}</text>
                                </g>
                            ))}

                            {/* engine hub = Prevent · Detect · Recover */}
                            <g className="eg-node" data-id="hub" data-kind="hub">
                                <circle className="eg-hub-halo" cx={HUB.x} cy={HUB.y} r={HUB.r + 16} fill={VIOLET} opacity="0.28" filter="url(#eg-glow)" />
                                <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="url(#eg-hub-fill)" />
                                <text x={HUB.x} y={HUB.y - 6} textAnchor="middle" dominantBaseline="central" fill="#fff" style={{ fontSize: 30, fontWeight: 800 }}>✦</text>
                                <text x={HUB.x} y={HUB.y + 20} textAnchor="middle" fill="#fff" style={{ fontSize: 12, fontWeight: 700, opacity: 0.9 }}>ENGINE</text>
                                <text className="eg-label" x={HUB.x} y={HUB.y + HUB.r + 26} textAnchor="middle" style={{ fontSize: 18, fontWeight: 700 }}>
                                    <tspan x={HUB.x}>Nuvae engine</tspan>
                                    <tspan x={HUB.x} dy="19" style={{ fontSize: 12.5, fontWeight: 600, opacity: 0.6 }}>Prevent · Detect · Recover</tspan>
                                </text>
                            </g>

                            {/* module (agent) nodes with recovered-dollar readouts */}
                            {MODULES.map((m) => (
                                <g className="eg-node" data-id={m.id} data-kind="module" key={m.id}>
                                    <circle className="eg-flash" data-id={m.id} cx={m.x} cy={m.y} r="18" fill="none" stroke={m.color} strokeWidth="2" opacity="0" />
                                    <text className="eg-label" x={m.x - 30} y={m.y} textAnchor="end" dominantBaseline="central" style={{ fontSize: 15.5, fontWeight: 600 }}>{m.name}</text>
                                    <circle cx={m.x} cy={m.y} r="20" fill="#fff" stroke={m.color} strokeWidth="2.2" />
                                    <circle cx={m.x} cy={m.y} r="10" fill={m.color} />
                                    <text className="eg-money" data-id={m.id} x={m.x + 32} y={m.y} dominantBaseline="central" style={{ fontSize: 18, fontWeight: 800 }} />
                                </g>
                            ))}

                            {/* merged total = revenue recovered */}
                            <g className="eg-node" data-id="total" data-kind="total">
                                <circle className="eg-total-halo" cx={TOTAL.x} cy={TOTAL.y} r={TOTAL.r + 16} fill={GREEN} opacity="0.3" filter="url(#eg-glow)" />
                                <circle cx={TOTAL.x} cy={TOTAL.y} r={TOTAL.r} fill="url(#eg-total-fill)" />
                                <text className="eg-total-num" x={TOTAL.x} y={TOTAL.y - 4} textAnchor="middle" dominantBaseline="central" fill="#fff" style={{ fontSize: 26, fontWeight: 800 }} />
                                <text x={TOTAL.x} y={TOTAL.y + 22} textAnchor="middle" fill="#fff" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", opacity: 0.9 }}>RECOVERED</text>
                                <text className="eg-label" x={TOTAL.x} y={TOTAL.y + TOTAL.r + 26} textAnchor="middle" style={{ fontSize: 15, fontWeight: 600 }}>back to your systems / yr</text>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="eg-notes">
                    {LAYER_NOTES.map((a) => (
                        <div className="eg-note" key={a.name}>
                            <span className="eg-note-dot" style={{ background: a.color }} />
                            <b>{a.name}</b>
                            <p>{a.line}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
