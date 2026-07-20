import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { Words, revealCopy, revealWords } from "../lib/anim";
import ScrollSpine from "../components/ScrollSpine";

const BLOG = [
    {
        title: "Beyond the AI Chat Hype: Why Healthcare Finance Needs Financial Intelligence, Not Just LLMs",
        date: "Jun 2026",
        author: "Manu Madhusudanan, Founder & CEO",
        excerpt:
            "Reading a contract isn't the same as operationalizing it at scale. Why general-purpose chat models can't run a revenue cycle on their own.",
        href: "https://www.linkedin.com/pulse/beyond-ai-chat-hype-why-healthcare-future-requires-manu-madhusudanan-rxuvc",
    },
    {
        title: "Gen AI Anti-Patterns: Why Most \"AI Products\" Break in Production",
        date: "Mar 2026",
        author: "Manu Madhusudanan, Founder & CEO",
        excerpt:
            "Five anti-patterns we design against — from mega-prompts standing in for architecture to treating accuracy as binary instead of a confidence score.",
        href: "https://www.linkedin.com/pulse/gen-ai-anti-patterns-why-most-products-breaks-manu-madhusudanan-ldzvc",
    },
    {
        title: "The Rise of the Foundry Engineer: Building Products With, Not Just For, Customers",
        date: "Sep 2025",
        author: "Manu Madhusudanan, Founder & CEO",
        excerpt:
            "What we learned building our Appeal Management module alongside real customers, and why we staff pods around a new kind of engineering role.",
        href: "https://www.linkedin.com/pulse/rise-foundry-engineer-building-products-just-manu-madhusudanan-rtx3c",
    },
    {
        title: "The Future of Healthcare Operations: How AI Agents Transform Revenue Cycle Management",
        date: "Sep 2025",
        author: "Nuvae.ai",
        excerpt:
            "Why rigid RPA breaks when payer rules change, and what a network of role-aware agents looks like across front desk, mid-cycle, and back office.",
        href: "https://www.linkedin.com/pulse/future-healthcare-operations-how-ai-agents-transform-revenue-9nqxc",
    },
    {
        title: "10 Months Building With the Best AI Tools: Will AI Replace Software Teams?",
        date: "Oct 2025",
        author: "Nuvae.ai",
        excerpt:
            "Ten months of shipping real agents for real hospitals — what AI tooling actually changed for our product, engineering, and QA workflows.",
        href: "https://www.linkedin.com/pulse/10-months-building-best-ai-tools-replace-software-teams-nuvae-ai-cdnrc",
    },
];

const AGENTS = [
    { group: "Front Desk", names: "Registration, Scanning, Eligibility" },
    { group: "Mid-Cycle", names: "CDI Notes, Charge Capture, PreAuth" },
    { group: "Claims", names: "Claim Scrubber, Submission" },
    { group: "Back Office", names: "Collection, Denials, Appeals, A/R Recon" },
    { group: "Analytics & Support", names: "Analytics, Voice Call" },
];

const GLOSSARY = [
    { term: "RCM (Revenue Cycle Management)", def: "The full financial process from patient scheduling and eligibility through claim submission, payment, and appeal." },
    { term: "Eligibility verification", def: "Confirming a patient's insurance coverage and authorization requirements before a claim is generated." },
    { term: "Underpayment", def: "A claim paid at less than the rate the payer contract specifies — often invisible without line-by-line rate matching." },
    { term: "Denial vs. underpayment", def: "A denial is a claim payers refuse to pay at all. An underpayment is a claim they pay, but at the wrong rate." },
    { term: "BAA (Business Associate Agreement)", def: "A HIPAA-required contract between a covered entity and any vendor that handles protected health information on its behalf." },
    { term: "AR (Accounts Receivable) recovery", def: "Pursuing payment on claims that are unpaid, underpaid, or stuck in appeal — the 'tail end' of the revenue cycle." },
];

const SOURCES = [
    { name: "CAQH Index 2025", note: "Industry-wide administrative burden and automation benchmarks." },
    { name: "Experian Health 2025/2026", note: "Payer denial trends and revenue cycle survey data." },
    { name: "AHA Cost of Caring 2025", note: "Hospital cost and margin pressure benchmarks." },
    { name: "Advisory Board 2024", note: "Revenue cycle operations research." },
    { name: "HFMA Pulse Survey", note: "Healthcare finance leader sentiment and denial data." },
    { name: "EY RCM Analysis 2026", note: "Contract underpayment and leakage analysis." },
    { name: "Health Affairs, Jan 2026", note: "Peer-reviewed health policy research." },
    { name: "JAMA Health Forum 2025", note: "Peer-reviewed clinical and health-systems research." },
];

export default function Resources() {
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
                <title>Resources — Nuvae</title>
                <meta
                    name="description"
                    content="Blog posts, a glossary, and cited industry benchmarks for revenue cycle teams."
                />
                <link rel="canonical" href="https://nuvae.ai/resources" />
                <meta property="og:title" content="Resources — Nuvae" />
                <meta
                    property="og:description"
                    content="Guides, a glossary, and cited industry benchmarks for revenue cycle teams."
                />
                <meta property="og:url" content="https://nuvae.ai/resources" />
            </Helmet>
            <div className="spine-zone">
            <section className="scene light" id="resources" ref={rootRef}>
                <div className="wrap">
                    <p className="kicker">Resources</p>
                    <h1 className="h-giant">
                        <Words lines={["The revenue cycle,", "explained plainly."]} />
                    </h1>
                    <p className="sub mt-30">
                        Notes from the team, benchmarks, and a shared vocabulary for the AI layer
                        on top of your RCM.
                    </p>

                    <h2 className="h-mid res-section-h">From the blog</h2>
                    <div className="blog-grid">
                        {BLOG.map((b) => (
                            <a className="blog-card" href={b.href} target="_blank" rel="noreferrer" key={b.title}>
                                <span className="blog-meta">
                                    {b.date} · {b.author}
                                </span>
                                <b>{b.title}</b>
                                <p>{b.excerpt}</p>
                                <span className="blog-link">Read on LinkedIn →</span>
                            </a>
                        ))}
                    </div>

                    <h2 className="h-mid res-section-h">Meet the agents</h2>
                    <p className="sub" style={{ fontSize: 15, maxWidth: "60ch" }}>
                        Nuvae's agent network is organized by where it sits in the revenue cycle —
                        each one role-aware, working alongside the others.
                    </p>
                    <div className="also-grid">
                        {AGENTS.map((a) => (
                            <div className="also" key={a.group}>
                                <b>{a.group}</b>
                                <p>{a.names}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="h-mid res-section-h">Glossary</h2>
                    <div className="also-grid">
                        {GLOSSARY.map((g) => (
                            <div className="also" key={g.term}>
                                <b>{g.term}</b>
                                <p>{g.def}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="h-mid res-section-h">Benchmarks &amp; further reading</h2>
                    <div className="res-sources">
                        {SOURCES.map((s) => (
                            <div className="res-source" key={s.name}>
                                <span className="chip">{s.name}</span>
                                <p>{s.note}</p>
                            </div>
                        ))}
                    </div>

                    <div className="price-cta">
                        <Link className="btn-big" to="/roi">
                            See the numbers for your hospital size
                        </Link>
                    </div>
                </div>
            </section>
            <ScrollSpine />
            </div>
        </>
    );
}
