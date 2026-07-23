"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Words, prefersReducedMotion } from "../lib/anim";

export default function FinalCta() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            if (prefersReducedMotion()) return;

            gsap.from(".btn-big", {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "back.out(1.6)",
                scrollTrigger: { trigger: root, start: "top 60%" },
            });
        },
        { scope: rootRef },
    );

    return (
        <section className="scene cta-scene" id="cta" ref={rootRef}>
            <div className="cta-glow" />
            <div className="wrap">
                <h2 className="h-giant">
                    <Words lines={["See your leak."]} />
                </h2>
                <p className="sub">
                    Send one month of remits and your top three contracts.
                    <br />
                    We'll return the number. It's yours either way.
                </p>
                <Link className="btn-big" href="/contact">
                    Book a walkthrough
                </Link>
            </div>
        </section>
    );
}
