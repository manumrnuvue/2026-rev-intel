"use client";

const SECTIONS = [
    {
        h: "Acceptance of terms",
        p: "By accessing or using the Nuvae website or platform, you agree to these terms. If you're using Nuvae on behalf of a hospital or health system, you're agreeing on that organization's behalf.",
    },
    {
        h: "The service",
        p: "Nuvae provides software that verifies patient eligibility, analyzes contracted payer rates against remittances, and generates and tracks claim appeals, operating alongside — not replacing — your existing revenue cycle systems.",
    },
    {
        h: "Customer responsibilities",
        p: "You're responsible for the accuracy of data you provide, for maintaining the confidentiality of account credentials, and for ensuring you have the right to share any data (including PHI) you submit to the platform.",
    },
    {
        h: "Business Associate Agreement",
        p: "Where the service involves processing protected health information, a signed Business Associate Agreement governs that processing and takes precedence over conflicting terms here.",
    },
    {
        h: "Fees and payment",
        p: "Fees are set out in your order form or service agreement, not on this page.",
    },
    {
        h: "Intellectual property",
        p: "Nuvae retains all rights to the platform, its software, and its underlying models. You retain all rights to your own data.",
    },
    {
        h: "Disclaimers",
        p: "Nuvae provides estimates (eligibility results, rate-match findings, recovery projections) based on available data. These are decision-support outputs, not guarantees of payer behavior or clinical/coding accuracy — final billing and clinical decisions remain your organization's responsibility.",
    },
    {
        h: "Limitation of liability",
        p: "Each party's liability is limited as set out in the applicable service agreement.",
    },
    {
        h: "Termination",
        p: "Either party may terminate as set out in the applicable service agreement. On termination, data is handled per the Privacy Policy and any active BAA.",
    },
    {
        h: "Governing law",
        p: "Governing law and jurisdiction are as set out in the applicable service agreement.",
    },
    {
        h: "Contact",
        p: "Questions about these terms: contact@nuvae.ai.",
    },
];

export default function Terms() {
    return (
        <>
            <section className="scene light legal" id="terms">
                <div className="wrap legal-wrap">
                    <p className="kicker">Terms of Service</p>
                    <h1 className="h-big">Terms of Service</h1>

                    {SECTIONS.map((s, i) => (
                        <div className="legal-section" key={s.h}>
                            <h2 className="h-mid">
                                {i + 1}. {s.h}
                            </h2>
                            <p className="sub legal-p">{s.p}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
