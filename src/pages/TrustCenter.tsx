import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";

const SECURITY = [
    {
        h: "Secure infrastructure",
        p: "Hosted on leading cloud infrastructure with network segmentation, hardened services, backups, and disaster-recovery mechanisms built for healthcare data.",
    },
    {
        h: "Encryption & data protection",
        p: "Data is encrypted in transit (TLS 1.2+) and at rest (AES-256 or equivalent), with key management following cloud-provider and industry best practices.",
    },
    {
        h: "Access control & identity",
        p: "Role-based access control (RBAC) and least-privilege principles across every internal and customer-facing system, with multi-factor authentication for all personnel with production access.",
    },
    {
        h: "Monitoring & incident response",
        p: "Centralized logging of application and infrastructure events, continuous monitoring for anomalies, and a documented incident-response process — including HIPAA breach-notification obligations where applicable.",
    },
];

const COMPLIANCE = [
    {
        h: "HIPAA compliant",
        p: "Nuvae operates as a HIPAA-compliant Business Associate and signs a Business Associate Agreement (BAA) with every customer. PHI is used only as permitted by HIPAA, the BAA, and customer instructions — never for Nuvae's own marketing or third-party advertising.",
    },
    {
        h: "SOC 2 Type II certified",
        p: "Nuvae has completed SOC 2 Type II certification across the Security, Availability, and Confidentiality Trust Services Criteria. The report and supporting security artifacts are available to customers under NDA.",
    },
    {
        h: "Deployment options",
        p: "Nuvae runs cloud-hosted by default. For health systems with strict data-residency or network-isolation requirements, an on-premise deployment is available — contact us to scope it.",
    },
];

const AI_QA = [
    "Every AI-generated output — a rate match, a denial score, a drafted appeal — is reviewable and traceable back to the contract, policy, or remittance line that produced it.",
    "PHI is never used to train third-party foundation models. De-identified, aggregated data may be used to improve Nuvae's own models, only where permitted by contract and law.",
    "High-confidence outputs can automate; low-confidence or ambiguous cases route to human review rather than guessing.",
    "Customers remain responsible for final billing and clinical decisions — Nuvae's outputs support that judgment, they don't replace it.",
];

export default function TrustCenter() {
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
            <Helmet>
                <title>Trust Center — Nuvae</title>
                <meta
                    name="description"
                    content="Nuvae's security, privacy, and compliance posture — HIPAA compliant, SOC 2 Type II certified, with on-premise deployment available."
                />
                <link rel="canonical" href="https://nuvae.ai/trust-center" />
                <meta property="og:title" content="Trust Center — Nuvae" />
                <meta
                    property="og:description"
                    content="Nuvae's security, privacy, and compliance posture — HIPAA compliant, SOC 2 Type II certified, with on-premise deployment available."
                />
                <meta property="og:url" content="https://nuvae.ai/trust-center" />
            </Helmet>

            <section className="scene light legal" id="trust-center" ref={rootRef}>
                <div className="wrap legal-wrap">
                    <p className="kicker">Trust Center</p>
                    <h1 className="h-giant">
                        <Words lines={["Security, privacy,", "and compliance."]} />
                    </h1>
                    <p className="sub mt-30">
                        Nuvae handles protected health information every day. This page describes
                        how we secure it, who's accountable for it, and how to get the
                        documentation your security or compliance team needs.
                    </p>

                    <div className="trust-row" style={{ marginTop: 30 }}>
                        <span className="trust-chip">HIPAA compliant</span>
                        <span className="trust-chip">SOC 2 Type II certified</span>
                        <span className="trust-chip">BAA signed with every customer</span>
                        <span className="trust-chip">On-premise available</span>
                    </div>

                    <h2 className="h-mid res-section-h">Security</h2>
                    <div className="also-grid">
                        {SECURITY.map((s) => (
                            <div className="also" key={s.h}>
                                <b>{s.h}</b>
                                <p>{s.p}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="h-mid res-section-h">Compliance</h2>
                    <div className="also-grid">
                        {COMPLIANCE.map((c) => (
                            <div className="also" key={c.h}>
                                <b>{c.h}</b>
                                <p>{c.p}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="h-mid res-section-h">AI &amp; human oversight</h2>
                    <ul className="price-list price-list-loose">
                        {AI_QA.map((a) => (
                            <li key={a} style={{ alignItems: "flex-start" }}>
                                <span style={{ marginTop: 2 }}>•</span> {a}
                            </li>
                        ))}
                    </ul>

                    <div className="legal-section">
                        <h2 className="h-mid">Request documentation</h2>
                        <p className="sub legal-p">
                            SOC 2 Type II report, security questionnaire responses, and a signed
                            BAA are available on request. Contact manu@nuvae.ai — include your
                            organization name and what you need for procurement or security
                            review.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2 className="h-mid">Report a security concern</h2>
                        <p className="sub legal-p">
                            If you believe you've found a security vulnerability affecting Nuvae,
                            email manu@nuvae.ai with a description of the issue, steps to
                            reproduce it, and your contact details — please don't include PHI in
                            the report itself.
                        </p>
                    </div>

                    <div className="price-cta">
                        <Link className="btn-big" to="/contact">
                            Talk to our security team
                        </Link>
                        <Link className="btn-quiet" to="/privacy">
                            Read the Privacy Policy
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
