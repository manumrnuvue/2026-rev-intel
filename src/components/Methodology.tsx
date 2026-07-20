import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

const PAIRS = [
    { not: "Reactive", but: "Proactive — verified before the claim is submitted, not chased after a denial." },
    { not: "Single-point", but: "Layered — three connected layers working as one system, not one bot doing everything." },
    { not: "Siloed", but: "Integrated — reads what your RCM already produces, no systems migration." },
    { not: "Black-box", but: "Human-reviewable — every recovered dollar traces back to the contract or policy that proves it." },
];

export default function Methodology() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            revealWords(root);
            revealCopy(root);
        },
        { scope: rootRef },
    );

    return (
        <section className="scene light" id="methodology" ref={rootRef}>
            <div className="wrap">
                <p className="kicker">A new category, not another tool</p>
                <h2 className="h-big">
                    <Words lines={["The Recovery Loop."]} />
                </h2>
                <p className="sub mt-26">
                    Prevent, detect, recover — feeding back into each other as one continuous
                    loop, not three disconnected steps.
                </p>
                <div className="also-grid pairs-grid">
                    {PAIRS.map((p) => (
                        <div className="also" key={p.not}>
                            <b>
                                Not {p.not.toLowerCase()}.
                            </b>
                            <p>{p.but}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
