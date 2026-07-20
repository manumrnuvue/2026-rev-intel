import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Words, prefersReducedMotion } from "../lib/anim";

export default function Contact() {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root || prefersReducedMotion()) return;
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
        <>
            <Helmet>
                <title>Contact — Nuvae</title>
                <meta
                    name="description"
                    content="Send one month of remits and your top three contracts. We'll return the number."
                />
                <link rel="canonical" href="https://nuvae.ai/contact" />
                <meta property="og:title" content="Contact — Nuvae" />
                <meta
                    property="og:description"
                    content="Send one month of remits and your top three contracts. We'll return the number."
                />
                <meta property="og:url" content="https://nuvae.ai/contact" />
            </Helmet>
            <section className="scene cta-scene" id="contact" ref={rootRef}>
                <div className="cta-glow" />
                <div className="wrap">
                    <p className="kicker">Get in touch</p>
                    <h1 className="h-giant">
                        <Words lines={["See your leak."]} />
                    </h1>
                    <p className="sub">
                        Send one month of remits and your top three contracts.
                        <br />
                        We'll return the number. It's yours either way.
                    </p>
                    <a className="btn-big" href="mailto:manu@nuvae.ai?subject=Nuvae%20walkthrough">
                        Book a walkthrough
                    </a>

                    <div className="contact-details">
                        <p>Email — manu@nuvae.ai</p>
                        <p>Response time — within one business day</p>
                        <p>For press or partnerships — same address, subject line "Press" or "Partnership"</p>
                    </div>

                    <p className="sub contact-note">
                        No sales deck on the first call. Send the numbers — we'll show you what
                        they mean.
                    </p>
                </div>
            </section>
        </>
    );
}
