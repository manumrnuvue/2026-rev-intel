import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../lib/anim";

/**
 * A curvy line that draws itself down the page as you scroll, weaving from
 * Chapter 01 through every subsequent chapter, with a glowing tip riding the
 * end of the stroke. Sits over the sections (pointer-events: none), rendered
 * as the LAST child of .spine-zone so its effect runs after every pinned
 * sibling has added its pin-spacer height.
 */
export default function ScrollSpine() {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const headRef = useRef<SVGGElement>(null);
    const haloRef = useRef<SVGCircleElement>(null);

    useGSAP(
        () => {
            const svg = svgRef.current;
            const path = pathRef.current;
            const head = headRef.current;
            const halo = haloRef.current;
            if (!svg || !path || !head || !halo || prefersReducedMotion()) return;

            const zone = svg.parentElement as HTMLElement;
            const vh = () => window.innerHeight;
            // Where in the viewport the comet head rides (0 = top, 1 = bottom).
            const HEAD_VP = 0.58;
            let len = 0;
            let maxScroll = 1;
            let ys: number[] = []; // sampled path y at each 1/SAMPLES of its length
            const SAMPLES = 260;

            const build = () => {
                const W = zone.clientWidth;
                const H = zone.scrollHeight;
                svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
                svg.setAttribute("width", `${W}`);
                svg.setAttribute("height", `${H}`);

                // Serpentine: alternate wide S-curves between the margins.
                // Start below the first viewport so the line never crosses the hero headline.
                const step = Math.max(700, Math.min(1100, H / 14));
                const xs = [W * 0.1, W * 0.9];
                // Anchor the start just below the page's first section (usually the
                // hero) so the line never pops into view inside it.
                const first = zone.firstElementChild as HTMLElement | null;
                const firstH =
                    first && !first.classList.contains("spine") ? first.offsetHeight : 0;
                const startY = Math.min(H * 0.3, firstH + 60);
                let d = `M ${W * 0.5} ${startY}`;
                let y = startY;
                let i = 0;
                while (y < H) {
                    const ny = Math.min(y + step, H);
                    const xa = xs[i % 2];
                    d += ` C ${xa} ${y + step * 0.33}, ${xa} ${y + step * 0.66}, ${W * 0.5} ${ny}`;
                    y = ny;
                    i += 1;
                }
                path.setAttribute("d", d);
                len = path.getTotalLength();
                path.style.strokeDasharray = `${len}`;

                // Sample the path's y at even length steps so we can invert it:
                // given a target document-y, find how far along the stroke that is.
                ys = [];
                for (let k = 0; k <= SAMPLES; k += 1) {
                    ys.push(path.getPointAtLength((len * k) / SAMPLES).y);
                }
                maxScroll = Math.max(
                    1,
                    (document.scrollingElement?.scrollHeight ?? H) - vh(),
                );
            };

            // Length-fraction whose point sits at document-y `targetY` (ys is
            // monotonically increasing down the serpentine).
            const fracForY = (targetY: number) => {
                if (targetY <= ys[0]) return 0;
                if (targetY >= ys[SAMPLES]) return 1;
                let k = 1;
                while (k < SAMPLES && ys[k] < targetY) k += 1;
                const y0 = ys[k - 1];
                const y1 = ys[k];
                const f = y1 > y0 ? (targetY - y0) / (y1 - y0) : 0;
                return (k - 1 + f) / SAMPLES;
            };

            // Draw the trail up to `frac` and park the comet head at that leading
            // edge. `frac` is chosen so the head lands at HEAD_VP down the viewport.
            const draw = (frac: number) => {
                path.style.strokeDashoffset = `${len * (1 - frac)}`;
                const pt = path.getPointAtLength(len * frac);
                head.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
                head.style.opacity = frac > 0.002 && frac < 0.999 ? "1" : "0";
            };

            // Map a (scrub-smoothed) scroll progress → the document-y the head
            // should sit at → the length fraction to draw.
            const render = (scrollProgress: number) => {
                const smoothScroll = maxScroll * scrollProgress;
                draw(fracForY(smoothScroll + vh() * HEAD_VP));
            };

            build();
            render(0);

            // Comet head: soft halo pulses in/out around the bright core, so the
            // leading point reads as a living tip rather than a static dot.
            gsap.to(halo, {
                attr: { r: 26 },
                opacity: 0.1,
                duration: 1.3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Drive the draw-in through an actual tween (not a raw scroll-progress
            // readout) so `scrub` can smooth/lag the growth into a fluid animation
            // instead of the line jumping straight to wherever the scrollbar is.
            const state = { progress: 0 };
            gsap.to(state, {
                progress: 1,
                ease: "none",
                onUpdate: () => render(state.progress),
                scrollTrigger: {
                    trigger: zone,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    refreshPriority: -10, // measure after every pinned sibling
                    onRefresh: (self) => {
                        build();
                        render(self.progress);
                    },
                },
            });
        },
        { scope: svgRef },
    );

    return (
        <svg className="spine" ref={svgRef} aria-hidden="true" preserveAspectRatio="none">
            <defs>
                <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--coral)" />
                    <stop offset="52%" stopColor="var(--violet)" />
                    <stop offset="100%" stopColor="var(--blue)" />
                </linearGradient>
                <filter id="spineGlow" x="-300%" y="-300%" width="700%" height="700%">
                    <feGaussianBlur stdDeviation="7" />
                </filter>
            </defs>
            <path
                ref={pathRef}
                fill="none"
                stroke="url(#spineGrad)"
                strokeWidth="3.6"
                strokeLinecap="round"
            />
            {/* Comet head — blurred halo + glow ring + bright core, moved to the
                stroke's leading edge each scroll tick. */}
            <g ref={headRef} style={{ opacity: 0 }}>
                <circle
                    ref={haloRef}
                    r="14"
                    fill="var(--coral)"
                    opacity="0.28"
                    filter="url(#spineGlow)"
                />
                <circle r="7" fill="var(--coral-hi)" opacity="0.5" filter="url(#spineGlow)" />
                <circle r="3.6" fill="#fff" />
                <circle r="5.2" fill="none" stroke="var(--coral-hi)" strokeWidth="1.6" />
            </g>
        </svg>
    );
}
