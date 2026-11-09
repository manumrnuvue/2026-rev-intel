"use client";

const SECTIONS = [
    {
        h: "Overview",
        p: "Nuvae (\"we,\" \"us\") provides AI-based revenue-protection software to healthcare organizations. This policy explains what information we collect, how we use it, and how it's protected — including protected health information (PHI) processed on behalf of our hospital and health system customers.",
    },
    {
        h: "Information we collect",
        p: "Account and contact information you provide directly (name, work email, hospital affiliation); usage data from your interaction with our software; and, where applicable under a signed Business Associate Agreement (BAA), protected health information processed solely to deliver the contracted service.",
    },
    {
        h: "How we use information",
        p: "To operate and improve the Nuvae platform; to communicate with you about your account or service; and, for PHI processed under a BAA, exclusively for the purposes permitted by that agreement and the Health Insurance Portability and Accountability Act (HIPAA).",
    },
    {
        h: "PHI and HIPAA",
        p: "Where Nuvae processes protected health information on behalf of a covered entity, that processing is governed by a signed Business Associate Agreement (BAA), not this general policy. Contact us to request a BAA before submitting any PHI.",
    },
    {
        h: "Data security",
        p: "Data is encrypted in transit and at rest. Access is role-based and logged. We do not write PHI to application logs. Nuvae is HIPAA compliant and SOC 2 Type II certified — see our Trust Center for the full security and compliance posture.",
    },
    {
        h: "Data retention & deletion",
        p: "We retain data for as long as needed to provide the service or as required by law and applicable BAAs, and delete or return data on contract termination consistent with BAA terms.",
    },
    {
        h: "Third parties",
        p: "We do not sell personal information or PHI. Subprocessors used to deliver the service are bound by contractual confidentiality and, where applicable, BAA terms.",
    },
    {
        h: "Your rights",
        p: "You may request access to, correction of, or deletion of your personal information, subject to legal and contractual obligations (including HIPAA retention requirements for PHI). Contact contact@nuvae.ai.",
    },
    {
        h: "Changes to this policy",
        p: "We'll post material changes here with an updated effective date.",
    },
    {
        h: "Contact",
        p: "Questions about this policy: contact@nuvae.ai.",
    },
];

export default function Privacy() {
    return (
        <>
            <section className="scene light legal" id="privacy">
                <div className="wrap legal-wrap">
                    <p className="kicker">Privacy Policy</p>
                    <h1 className="h-big">Privacy Policy</h1>

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
