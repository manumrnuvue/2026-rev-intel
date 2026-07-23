"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { LETTER_PATHS, LOGO_DOTS } from "./Logo";

const SEEN_KEY = "nuvae-intro-seen";

/**
 * Mac-"hello"-style boot moment: on first load the wordmark traces itself in
 * as strokes, fills, dots land, then the curtain lifts to reveal the page.
 * Shown once per browser session; skipped entirely under reduced motion.
 */
export default function BootIntro() {
    // Start "done" so the server render and first client render agree (no
    // curtain in the SSR HTML); decide for real once mounted in the browser,
    // where sessionStorage / matchMedia exist.
    const [done, setDone] = useState(true);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const seen =
            sessionStorage.getItem(SEEN_KEY) === "1" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!seen) setDone(false);
    }, []);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (done || !root) return;

            const letters = root.querySelectorAll<SVGPathElement>(".boot-letter");
            letters.forEach((p) => {
                const len = p.getTotalLength();
                p.style.strokeDasharray = `${len}`;
                p.style.strokeDashoffset = `${len}`;
            });

            gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem(SEEN_KEY, "1");
                    setDone(true);
                },
            })
                .to(".boot-letter", {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    stagger: 0.12,
                    ease: "power2.inOut",
                })
                .to(".boot-letter", { fillOpacity: 1, duration: 0.55, ease: "power2.out" }, "-=0.5")
                .fromTo(
                    ".boot-dot",
                    { scale: 0, opacity: 0, transformOrigin: "center" },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.45,
                        stagger: 0.12,
                        ease: "back.out(2.5)",
                    },
                    "-=0.3",
                )
                .to({}, { duration: 0.5 }) // hold the finished mark for a beat
                .to(root, { yPercent: -100, duration: 0.85, ease: "power4.inOut" });
        },
        { scope: rootRef, dependencies: [done] },
    );

    if (done) return null;

    return (
        <div className="boot" ref={rootRef} aria-hidden="true">
            <svg className="boot-mark" viewBox="0 0 185 36" fill="none">
                {LETTER_PATHS.map((d, i) => (
                    <path
                        className="boot-letter"
                        key={i}
                        d={d}
                        fill="#fff"
                        fillOpacity="0"
                        stroke="#fff"
                        strokeWidth="0.9"
                        strokeOpacity="0.9"
                    />
                ))}
                {LOGO_DOTS.map((d) => (
                    <circle
                        key={d.fill}
                        className="boot-dot"
                        cx={d.cx}
                        cy={d.cy}
                        r={d.r}
                        fill={d.fill}
                        opacity="0"
                    />
                ))}
            </svg>
        </div>
    );
}
