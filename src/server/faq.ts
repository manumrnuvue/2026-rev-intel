// Deterministic fast-path answers for common questions the chat widget gets
// asked. Checked before the LLM call: a match returns instantly, for free,
// and with a consistent, reviewed answer. Anything that doesn't match falls
// through to the LLM (src/server/chat-core.ts) — this file is the
// "predetermined" half of the hybrid deterministic+LLM assistant.

export type FaqEntry = {
    id: string;
    keywords: string[];
    answer: string;
    suggestedPage?: { path: string; label: string };
};

export const FAQ_ENTRIES: FaqEntry[] = [
    {
        id: "what-is-nuvae",
        keywords: ["what is nuvae", "what does nuvae do", "what do you do", "tell me about nuvae"],
        answer:
            "Nuvae is an AI layer that sits on top of the revenue cycle management systems a hospital already runs — Epic, Cerner, Meditech, and others — without replacing anything. It prevents eligibility denials before a claim is generated, detects contract underpayment on every remittance, and recovers unworked appeals at scale.",
    },
    {
        id: "contact-demo",
        keywords: [
            "contact", "get in touch", "book a demo", "book a walkthrough", "schedule a demo",
            "schedule a call", "talk to sales", "request a demo", "speak to someone", "talk to someone",
        ],
        answer:
            "Happy to help right here — ask me anything about the product, pricing, or security first. When you're ready for a live walkthrough, the quickest path is the short form on our Contact page: name, work email, and hospital is all it takes, and our team replies within one business day.",
        suggestedPage: { path: "/contact", label: "Request a demo" },
    },
    {
        id: "pricing",
        keywords: ["pricing", "how much", "cost", "price", "what does it cost"],
        answer:
            "Nuvae is priced per module and scaled to claim volume rather than a flat seat fee, across three tiers — Starter, Growth, and Enterprise — all customized via a sales conversation. Starter typically covers eligibility verification and appeal automation; Growth adds contract rate-matrix analytics; Enterprise covers every module system-wide with on-premise deployment available.",
        suggestedPage: { path: "/pricing", label: "See pricing" },
    },
    {
        id: "security-compliance",
        keywords: ["hipaa", "soc 2", "soc2", "compliance", "security", "baa", "data residency", "encrypted"],
        answer:
            "Nuvae is HIPAA compliant and SOC 2 Type II certified, with a signed BAA for every customer. Data is encrypted in transit and at rest, access is role-based, and every action has a full audit trail. On-premise deployment is available for health systems with strict data-residency requirements.",
        suggestedPage: { path: "/trust-center", label: "Full security posture" },
    },
    {
        id: "ehr-integration",
        keywords: ["epic", "cerner", "meditech", "ehr", "integration", "integrate", "which systems", "emr"],
        answer:
            "Nuvae works with Epic, Cerner, Meditech, and other major US healthcare systems via secure API, FHIR, HL7, or file-based (EDI 835/837, UB-04) integrations. Nothing in your existing RCM gets replaced — Nuvae reads what your systems already produce and adds a layer on top.",
    },
    {
        id: "implementation-time",
        keywords: ["how long", "implementation", "deploy", "onboarding", "go live", "timeline", "weeks or"],
        answer:
            "Deployments are measured in weeks, not years. Most hospitals start with a focused pilot on one module — usually eligibility or appeals — before expanding to the rest of the system.",
    },
    {
        id: "on-premise",
        keywords: ["on-premise", "on premise", "on prem", "self-hosted", "self hosted"],
        answer:
            "Yes — on-premise deployment is available on the Enterprise tier, for health systems with data-residency or network-isolation requirements that rule out a cloud-hosted setup.",
    },
    {
        id: "modules",
        keywords: ["modules", "what does it include", "features", "what's included", "capabilities"],
        answer:
            "Six modules: contract intelligence, eligibility verification, denials & appeals, an AR voice follow-up agent, claims intelligence (modifier/coding checks), and natural-language analytics. You can turn on only what you need and add modules as they prove out.",
        suggestedPage: { path: "/product", label: "See the full product tour" },
    },
    {
        id: "roi",
        keywords: ["roi", "value", "worth", "how much can we recover", "business case"],
        answer:
            "Typical annual value ranges from $755K–$1.79M for a small hospital up to $13.2M–$25.3M for a large health system, depending on claim volume and payer mix — grounded in observed deployment patterns, not projections.",
        suggestedPage: { path: "/roi", label: "See the numbers by hospital size" },
    },
    {
        id: "company",
        keywords: ["who founded", "founder", "ceo", "company", "based in", "headquartered", "manu"],
        answer:
            "Nuvae was founded by Manu Madhusudanan, who leads the company as Founder & CEO. The team is based in Los Angeles and Irvine, California, and Thiruvananthapuram, Kerala, India.",
    },
];

const norm = (s: string) => s.toLowerCase().trim();

export function matchFaq(userText: string): FaqEntry | null {
    const text = norm(userText);
    if (!text) return null;

    let best: { entry: FaqEntry; score: number } | null = null;
    for (const entry of FAQ_ENTRIES) {
        for (const kw of entry.keywords) {
            if (text.includes(kw)) {
                const score = kw.length;
                if (!best || score > best.score) best = { entry, score };
            }
        }
    }
    return best ? best.entry : null;
}
