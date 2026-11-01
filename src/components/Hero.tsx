"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { formatUsd, prefersReducedMotion } from "../lib/anim";

export default function Hero() {
    const rootRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const leakRef = useRef<HTMLElement>(null);
    const leakNumRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion()) {
                if (leakNumRef.current) leakNumRef.current.textContent = formatUsd(4_500_000);
                return;
            }

            gsap.from(".hero-inner > *", {
                y: 40,
                opacity: 0,
                duration: 1.1,
                stagger: 0.12,
                ease: "power3.out",
                delay: 0.15,
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=80%",
                    scrub: 0.6,
                    pin: true,
                },
            })
                .to(".hero-inner", { scale: 0.86, opacity: 0, filter: "blur(8px)", ease: "none" })
                .to(".scroll-cue", { opacity: 0 }, 0);

            const leak = { v: 0 };
            gsap.timeline({
                scrollTrigger: {
                    trigger: leakRef.current,
                    start: "top top",
                    end: "+=120%",
                    scrub: 0.5,
                    pin: true,
                },
            })
                .to(leak, {
                    v: 4_500_000,
                    ease: "power1.in",
                    duration: 1,
                    onUpdate: () => {
                        if (leakNumRef.current) {
                            leakNumRef.current.textContent = formatUsd(leak.v);
                        }
                    },
                })
                .from(".leak-line", { opacity: 0, y: 30, duration: 0.25 }, 0.55);
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef}>
            <section className="scene hero" id="hero" ref={heroRef}>
                <div className="hero-glow" />
                <div className="hero-inner">
                    <p className="hero-eyebrow">Nuvae</p>
                    <h1 className="hero-h">
                        Revenue,
                        <br />
                        <span className="grad">recovered.</span>
                    </h1>
                    <p className="hero-sub">
                        An AI layer on top of the RCM you already run.{" "}
                        <b>Nothing replaced. Everything protected.</b>
                    </p>
                </div>
                <div className="scroll-cue" aria-hidden="true" />
            </section>

            <section className="scene leak" id="leak" ref={leakRef}>
                <div className="leak-inner wrap">
                    <p className="leak-label">What payers quietly keep</p>
                    <div className="leak-num num" ref={leakNumRef}>
                        $0
                    </div>
                    <p className="leak-line">
                        At a $300M-revenue hospital, underpayment against contracted rates
                        typically runs <b>1–3% of net patient revenue</b> — paid less than the
                        contract promises. It doesn't look like a problem. It looks like normal.
                    </p>
                </div>
            </section>
        </div>
    );
}
