"use client";

import Methodology from "../components/Methodology";
import Layers from "../components/Layers";
import Contracts from "../components/Contracts";
import Assistant from "../components/Assistant";
import PreAuth from "../components/PreAuth";
import Denials from "../components/Denials";
import VoiceAgent from "../components/VoiceAgent";
import Claims from "../components/Claims";
import RateCalculator from "../components/RateCalculator";
import Analytics from "../components/Analytics";
import Extras from "../components/Extras";
import ValueModel from "../components/ValueModel";
import FinalCta from "../components/FinalCta";
import Faq from "../components/Faq";
import ScrollSpine from "../components/ScrollSpine";

const FAQ_ITEMS = [
    {
        q: "Does Nuvae replace our existing RCM systems?",
        a: "No. Nuvae sits on top of the RCM you already run — reading what your systems already produce and adding a layer of verification, detection, and recovery. Nothing gets ripped out.",
    },
    {
        q: "Which EHR/PMS platforms does Nuvae work with?",
        a: "Nuvae is purpose-built for US healthcare systems and works with Epic, Cerner, Meditech, and more — via secure API, FHIR, HL7, or file-based integrations.",
    },
    {
        q: "How long does implementation take?",
        a: "Deployments are measured in weeks, not years. Most healthcare providers start with a focused pilot on one module before expanding to the full system.",
    },
    {
        q: "Is Nuvae HIPAA compliant?",
        a: "Yes. Nuvae is HIPAA compliant and SOC 2 Type II certified, with a signed BAA for every customer. See our Trust Center for the full security and compliance posture.",
    },
    {
        q: "Is on-premise deployment available?",
        a: "Yes. Nuvae runs cloud-hosted by default, with an on-premise option available for health systems with strict data-residency or network-isolation requirements.",
    },
];

export default function Product() {
    return (
        <>
            <div className="spine-zone">
                <section className="scene light" id="product-intro">
                    <div className="wrap">
                        <p className="kicker">The product</p>
                        <h1 className="h-giant">
                            Every chapter
                            <br />
                            <span className="grad">of the engine.</span>
                        </h1>
                        <p className="sub mt-30">
                            From the contract to the recovered dollar — how Nuvae works, module
                            by module. Each chapter below is a real workflow, shown the way it
                            runs in the product.
                        </p>
                    </div>
                </section>
                <Methodology />
                <Layers />
                <Contracts />
                <Assistant />
                <PreAuth />
                <Denials />
                <VoiceAgent />
                <Claims />
                <RateCalculator />
                <Analytics />
                <Extras />
                <ValueModel />
                <section className="scene light" id="product-faq">
                    <div className="wrap">
                        <p className="kicker">Common questions</p>
                        <h2 className="h-mid">Questions healthcare providers ask before they switch.</h2>
                        <Faq items={FAQ_ITEMS} />
                    </div>
                </section>
                <FinalCta />
                <ScrollSpine />
            </div>
        </>
    );
}
