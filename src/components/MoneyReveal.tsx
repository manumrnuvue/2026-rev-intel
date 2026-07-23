"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../lib/anim";

/** Annual figures for a mid-size hospital. Loss is what leaks out; recovered is
 *  what Nuvae brings back. Kept in step with the ROI chapter. */
const LOSS = 6_912_000;
const RECOVERED = 5_174_000;

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/**
 * The beat right after the hero: the revenue a hospital quietly loses every
 * year (red), then the frame flips green — "Nuvae finds the gap" — and shows
 * what gets recovered. Figures are static; only a light fade brings them in.
 */
export default function MoneyReveal() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root || prefersReducedMotion()) return;

            gsap.from(root.querySelectorAll<HTMLElement>(".money-loss, .money-recover"), {
                autoAlpha: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: root, start: "top 70%", once: true },
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene dark-section money-reveal" id="money" ref={rootRef}>
            <div className="wrap money-wrap">
                <div className="money-loss">
                    <span className="money-label">Every year, a mid-size hospital quietly loses</span>
                    <div className="money-num loss num">{money(LOSS)}</div>
                    <p className="money-sub">
                        to underpayment, eligibility denials, and appeals no one had time to
                        work — revenue you earned but never collected.
                    </p>
                </div>

                <div className="money-recover">
                    <span className="money-arrow" aria-hidden="true">
                        ↓
                    </span>
                    <span className="money-label recovered">Nuvae finds the gap — and recovers</span>
                    <div className="money-num gain num">{money(RECOVERED)}</div>
                    <p className="money-sub">
                        brought back and returned to your bottom line. Money that was always
                        yours.
                    </p>
                </div>
            </div>
        </section>
    );
}
