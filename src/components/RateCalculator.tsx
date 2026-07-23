"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

const SERVICES = [
    { id: "knee", label: "Total knee arthroplasty · CPT 27447", medicare: 19850 },
    { id: "mri", label: "MRI brain w/wo contrast · CPT 70553", medicare: 968 },
    { id: "colon", label: "Colonoscopy w/ biopsy · CPT 45380", medicare: 612 },
    { id: "ed", label: "ED visit, high severity · CPT 99285", medicare: 890 },
    { id: "cath", label: "Cardiac cath, diagnostic · CPT 93458", medicare: 3980 },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

const PAYERS: Array<{ id: string; label: string; mult: Record<ServiceId, number> }> = [
    {
        id: "blue",
        label: "BlueShield PPO",
        mult: { knee: 1.082, mri: 1.252, colon: 1.412, ed: 1.283, cath: 1.221 },
    },
    {
        id: "aetna",
        label: "Aetna HMO",
        mult: { knee: 1.041, mri: 1.19, colon: 1.31, ed: 1.19, cath: 1.15 },
    },
    {
        id: "united",
        label: "United Surgical",
        mult: { knee: 1.16, mri: 1.31, colon: 1.38, ed: 1.34, cath: 1.28 },
    },
    {
        id: "cigna",
        label: "Cigna",
        mult: { knee: 0.98, mri: 1.08, colon: 1.19, ed: 1.02, cath: 1.05 },
    },
];

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function RateCalculator() {
    const rootRef = useRef<HTMLElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const [serviceId, setServiceId] = useState<ServiceId>("knee");
    const [payerId, setPayerId] = useState(PAYERS[0].id);

    const service = SERVICES.find((s) => s.id === serviceId)!;
    const payer = PAYERS.find((p) => p.id === payerId)!;
    const mult = payer.mult[serviceId];
    const contracted = service.medicare * mult;
    const variance = (mult - 1) * 100;
    const withinRange = mult >= 1.05;

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);

            gsap.from(".rc-panel", {
                opacity: 0,
                y: 60,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".rc-panel", start: "top 85%" },
            });
        },
        { scope: rootRef },
    );

    useGSAP(
        () => {
            if (!resultRef.current) return;
            gsap.fromTo(
                resultRef.current,
                { opacity: 0.4, y: 6 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            );
        },
        { scope: rootRef, dependencies: [serviceId, payerId] },
    );

    return (
        <section className="scene lighter" id="rates" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">Chapter 07 — Rate calculator</p>
                <h2 className="h-big">
                    <Words lines={["Price any service", "before you bill it."]} />
                </h2>
                <p className="sub mt-26">
                    Pick a payer contract and a service — Nuvae returns the contracted rate, the
                    Medicare benchmark, and the variance in real time. The same dual-engine model
                    that powers leakage detection and the claims-queue check.
                </p>

                <div className="panel rc-panel" style={{ marginTop: 48 }}>
                    <div className="panel-bar">
                        <span className="dots">
                            <i />
                            <i />
                            <i />
                        </span>
                        Rate calculator
                        <span className="status">Live</span>
                    </div>
                    <div className="rc-controls">
                        <label>
                            Service
                            <select
                                value={serviceId}
                                onChange={(e) => setServiceId(e.target.value as ServiceId)}
                            >
                                {SERVICES.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Payer contract
                            <select value={payerId} onChange={(e) => setPayerId(e.target.value)}>
                                {PAYERS.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="rc-result" ref={resultRef}>
                        <div className="rc-big">
                            <span>Contracted rate</span>
                            <b className="num">{fmt(contracted)}</b>
                        </div>
                        <div className="trow">
                            <b>Medicare benchmark</b>
                            <span className="v num">{fmt(service.medicare)}</span>
                        </div>
                        <div className="trow">
                            <b>Variance vs Medicare</b>
                            <span className={`v num ${variance >= 0 ? "pos" : "neg"}`}>
                                {variance >= 0 ? "+" : ""}
                                {variance.toFixed(1)}%
                            </span>
                        </div>
                        <div className="trow">
                            <b>Status</b>
                            <span className={`pillx ${withinRange ? "g" : "a"}`}>
                                {withinRange ? "WITHIN EXPECTED RANGE" : "BELOW TYPICAL RANGE"}
                            </span>
                        </div>
                    </div>
                    <p className="rc-note">
                        CALCULATED BY THE SAME ENGINE USED ACROSS CLAIMS AND LEAKAGE DETECTION
                    </p>
                </div>
            </div>
        </section>
    );
}
