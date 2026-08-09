"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../lib/anim";

/** Annual figures for a mid-size healthcare provider. Loss is what leaks out; recovered is
 *  what Nuvae brings back. Kept in step with the ROI chapter. */
const LOSS = 6_912_000;
const RECOVERED = 5_174_000;

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/**
 * The beat right after the hero: the revenue a healthcare provider quietly loses every
 * year (red), then the frame flips green — "Nuvae finds the gap" — and shows
 * what gets recovered. Figures are static; only a light fade brings them in.
 */
export default function MoneyReveal() {
    const rootRef = useRef<HTMLElement>(null);
    const lossNumRef = useRef<HTMLDivElement>(null);
    const recoverNumRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) {
                if (lossNumRef.current) lossNumRef.current.textContent = money(LOSS);
                if (recoverNumRef.current) recoverNumRef.current.textContent = money(RECOVERED);
                return;
            }

            const loss = { v: 0 };
            const recovered = { v: 0 };

            /* Scrubbed to actual scroll position (not a fixed-duration timed
               tween) so the count always matches how far the section has
               scrolled into view — a fast scroll can't outrun it and land on
               the section already finished/static. */
            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: root,
                        start: "top bottom",
                        end: "top top",
                        scrub: 0.4,
                    },
                })
                .from(root.querySelectorAll<HTMLElement>(".money-loss, .money-recover"), {
                    autoAlpha: 0,
                    y: 24,
                    stagger: 0.3,
                    ease: "none",
                })
                .to(
                    loss,
                    {
                        v: LOSS,
                        ease: "none",
                        onUpdate: () => {
                            if (lossNumRef.current) lossNumRef.current.textContent = money(loss.v);
                        },
                    },
                    "<",
                )
                .to(
                    recovered,
                    {
                        v: RECOVERED,
                        ease: "none",
                        onUpdate: () => {
                            if (recoverNumRef.current) recoverNumRef.current.textContent = money(recovered.v);
                        },
                    },
                    "<0.3",
                );
        },
        { scope: rootRef },
    );

    return (
        <section className="scene dark-section money-reveal" id="money" ref={rootRef}>
            <div className="wrap money-wrap">
                <div className="money-loss">
                    <span className="money-label">Every year, a mid-size healthcare provider quietly loses</span>
                    <div className="money-num loss num" ref={lossNumRef}>
                        $0
                    </div>
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
                    <div className="money-num gain num" ref={recoverNumRef}>
                        $0
                    </div>
                    <p className="money-sub">
                        brought back and returned to your bottom line. Money that was always
                        yours.
                    </p>
                </div>
            </div>
        </section>
    );
}
