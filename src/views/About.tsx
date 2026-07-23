"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

export default function About() {
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
        <>
            <section className="scene light" id="about" ref={rootRef}>
                <div className="wrap about-wrap">
                    <p className="kicker">About Nuvae</p>
                    <h1 className="h-giant">
                        <Words lines={["We built the layer", "we wished existed."]} />
                    </h1>

                    <div className="about-body">
                        <div className="about-block">
                            <h2 className="h-mid">Why we exist</h2>
                            <p className="sub about-p">
                                Hospitals don't lose revenue because they aren't trying. They lose
                                it because contracted rates live in PDFs, eligibility checks live
                                in payer portals, and appeals live in someone's backlog — three
                                separate failure points, none of them visible until the money is
                                already gone. Nuvae exists to make that leakage visible, and then
                                to close it.
                            </p>
                        </div>

                        <div className="about-block">
                            <h2 className="h-mid">How we think about the problem</h2>
                            <p className="sub about-p">
                                We didn't set out to replace revenue cycle systems that already
                                work. We set out to make them accountable — cross-referencing
                                every remittance against the contract that governs it, verifying
                                eligibility before a claim is generated instead of after it's
                                denied, and pursuing appeals at a scale no back-office team can
                                match by hand. Nothing replaced. Everything protected.
                            </p>
                        </div>

                        <div className="about-block">
                            <h2 className="h-mid">The screen-guard model</h2>
                            <p className="sub about-p">
                                Think of your EMR and billing systems as an expensive smartphone —
                                a massive capital investment your daily operations depend on
                                entirely. You don't protect that investment by replacing the
                                motherboard. You add a screen guard: a lightweight layer that
                                absorbs the friction. That's what Nuvae is for your revenue cycle —
                                a financial screen guard, not a rip-and-replace.
                            </p>
                        </div>

                        <div className="about-block">
                            <h2 className="h-mid">How we work</h2>
                            <p className="sub about-p">
                                Nuvae sits on top of the RCM you already run. It reads what your
                                systems already produce — EDI 835/837 remittances, UB-04 claims,
                                FHIR resources — and adds a layer of verification, detection, and
                                recovery without a systems migration. Deployments are measured in
                                weeks, not years.
                            </p>
                        </div>

                        <div className="about-block">
                            <h2 className="h-mid">Who we serve</h2>
                            <p className="sub about-p">
                                From a single small hospital to a multi-facility health system —
                                the modules are the same, the scale is different.{" "}
                                <Link className="lgo" href="/solutions" style={{ marginTop: 0, display: "inline" }}>
                                    See solutions by hospital size →
                                </Link>
                            </p>
                        </div>

                        <div className="about-block">
                            <h2 className="h-mid">Leadership</h2>
                            <p className="sub about-p">
                                Nuvae was founded by <b>Manu Madhusudanan</b>, who leads the
                                company as Founder &amp; CEO. Nuvae Inc was named a winner of the{" "}
                                <b>Great Companies Global Business Award 2025</b>, in the category
                                of Healthcare AI &amp; Automation Excellence.
                            </p>
                        </div>

                        <div className="about-block">
                            <h2 className="h-mid">Where we work</h2>
                            <p className="sub about-p">
                                Nuvae is headquartered in Los Angeles, with a U.S. office in
                                Irvine, California, and a product engineering team based in
                                Thiruvananthapuram, Kerala, India. Small team, one back office
                                problem, worked on from both coasts.
                            </p>
                        </div>

                        <div className="about-block">
                            <h2 className="h-mid">Trust &amp; compliance</h2>
                            <div className="trust-row">
                                <span className="trust-chip">HIPAA compliant</span>
                                <span className="trust-chip">SOC 2 Type II certified</span>
                                <span className="trust-chip">Encrypted in transit &amp; at rest</span>
                                <span className="trust-chip">BAA available on request</span>
                                <span className="trust-chip">Role-based access control</span>
                            </div>
                        </div>
                    </div>

                    <div className="price-cta">
                        <Link className="btn-big" href="/contact">
                            Talk to the team
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
