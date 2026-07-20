import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../lib/anim";

/** Annual figures, indicative for a mid-size hospital. Loss is what leaks out;
 *  recovered is what Nuvae brings back. Kept in step with the ROI chapter. */
const LOSS = 6_912_000;
const RECOVERED = 5_174_000;

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/**
 * The beat right after the hero: a red counter climbs to the revenue a hospital
 * quietly loses every year, then the frame flips green — "Nuvae finds the gap"
 * — and a second counter climbs to what gets recovered.
 */
export default function MoneyReveal() {
    const rootRef = useRef<HTMLElement>(null);
    const lossRef = useRef<HTMLDivElement>(null);
    const gainRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const loss = lossRef.current;
            const gain = gainRef.current;
            if (!loss || !gain) return;

            if (prefersReducedMotion()) {
                loss.textContent = money(LOSS);
                gain.textContent = money(RECOVERED);
                gsap.set(".money-recover", { autoAlpha: 1, y: 0 });
                return;
            }

            const lossObj = { v: 0 };
            const gainObj = { v: 0 };

            const tl = gsap.timeline({
                scrollTrigger: { trigger: rootRef.current, start: "top 62%", once: true },
            });

            tl.to(lossObj, {
                v: LOSS,
                duration: 2.4,
                ease: "power2.out",
                onUpdate: () => {
                    loss.textContent = money(lossObj.v);
                },
            })
                .from(
                    ".money-loss",
                    { scale: 0.94, opacity: 0, duration: 2.4, ease: "power2.out" },
                    "<",
                )
                .from(".money-recover", { autoAlpha: 0, y: 34, duration: 0.7, ease: "power3.out" }, "+=0.35")
                .to(
                    gainObj,
                    {
                        v: RECOVERED,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: () => {
                            gain.textContent = money(gainObj.v);
                        },
                    },
                    "<",
                );
        },
        { scope: rootRef },
    );

    return (
        <section className="scene dark-section money-reveal" id="money" ref={rootRef}>
            <div className="wrap money-wrap">
                <div className="money-loss">
                    <span className="money-label">Every year, a mid-size hospital quietly loses</span>
                    <div className="money-num loss num" ref={lossRef}>
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
                    <div className="money-num gain num" ref={gainRef}>
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
