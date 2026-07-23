"use client";

import { Fragment } from "react";
import { gsap } from "gsap";

/** Splits lines of text into per-word spans for the rise-in reveal. */
export function Words({ lines, className = "" }: { lines: string[]; className?: string }) {
    return (
        <span className={`words ${className}`}>
            {lines.map((line, li) => (
                <Fragment key={li}>
                    {li > 0 && <br />}
                    {line.split(" ").map((w, wi) => (
                        <Fragment key={wi}>
                            {wi > 0 && " "}
                            <span className="w">
                                <span>{w}</span>
                            </span>
                        </Fragment>
                    ))}
                </Fragment>
            ))}
        </span>
    );
}

export const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Word rise-in tied to scroll entry, scoped to the given element. */
export function revealWords(scope: HTMLElement) {
    scope.querySelectorAll(".words").forEach((el) => {
        gsap.to(el.querySelectorAll(".w > span"), {
            y: 0,
            duration: 0.55,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
        });
    });
}

/** Fade-and-rise for kickers and subheads inside the scope. */
export function revealCopy(scope: HTMLElement) {
    scope.querySelectorAll<HTMLElement>(".sub, .kicker").forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
        });
    });
}

export function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function formatUsd(n: number): string {
    return "$" + Math.round(n).toLocaleString("en-US");
}
