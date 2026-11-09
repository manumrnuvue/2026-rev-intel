/** Answer-first guides for hospital revenue cycle buyers. Each one targets a cluster of
 *  questions buyers ask search and AI assistants, so the copy leads with a direct answer,
 *  names the real options (competitors included), and is specific about where Nuvae fits. */

export type GuideBlock = {
    h: string;
    p?: string[];
    list?: string[];
    steps?: string[];
    table?: { head: string[]; rows: string[][] };
};

export type Guide = {
    slug: string;
    title: string;
    metaTitle: string;
    description: string;
    kicker: string;
    answer: string;
    blocks: GuideBlock[];
    faq: { q: string; a: string }[];
    related: string[];
};

export const GUIDES_UPDATED = "2026-11-09";

export const GUIDES: Guide[] = [
    {
        slug: "payer-contract-rates-vs-medicare",
        kicker: "Payer contracting",
        title: "How to find which payer contracts pay less than Medicare benchmarks",
        metaTitle: "How to Benchmark Payer Contract Rates Against Medicare | Nuvae",
        description:
            "A step-by-step method for hospitals to compare commercial payer contract rates against Medicare, find the contracts that have slipped, and prioritize them before renegotiation.",
        answer:
            "Price each contracted rate at what Medicare would pay for the same service, in your locality, on the same date of service, and divide. That gives a percent of Medicare for every payer and service line. Weight it by your claim volume, compare it with what payers actually paid, and you have a ranked list of contracts to renegotiate.",
        blocks: [
            {
                h: "Why Medicare is the benchmark",
                p: [
                    "Medicare publishes its payment rules and rates, updates them on a fixed calendar, and adjusts them for local wages and costs. That makes it the one common yardstick that every commercial contract can be translated into, whatever structure the contract uses.",
                    "Commercial payers usually pay hospitals well above Medicare. RAND's 2024 hospital price study found employer-sponsored plans paid hospitals about 2.5 times what Medicare would have paid on average (2022 data), with wide variation between hospitals and payers. That spread is the point: two payers can sit far apart for the same services, and a contract signed years ago can drift well below where the market is now.",
                ],
            },
            {
                h: "The method, step by step",
                steps: [
                    "Collect every active contract and amendment for each payer and product line (commercial, Medicare Advantage, managed Medicaid). Amendments often hold the rates that actually apply.",
                    "Turn the contract language into a rate matrix: the rate, the method (per diem, case rate, DRG-based, fee schedule, percent of charges) and the codes it applies to (revenue codes, CPT/HCPCS, MS-DRGs).",
                    "Choose a benchmark set of services: your highest-volume and highest-revenue MS-DRGs, outpatient APCs and CPT codes, so the comparison reflects your real mix.",
                    "Price each service at Medicare for your locality and the same date-of-service year: IPPS for inpatient (DRG weight, wage-adjusted base rate), OPPS for outpatient, the physician fee schedule with your GPCI for professional services, plus lab and ASC schedules where relevant.",
                    "Divide the contracted amount by the Medicare amount. Do it per code, then roll up per payer and service line, weighted by your claim volume.",
                    "Add actual payments from your 835 remittances, using allowed amounts (payer paid plus patient responsibility). Contracted percent of Medicare shows what you negotiated; paid percent of Medicare shows what you collect. Once denials and contract terms such as lesser-of or stop-loss are ruled out, the remaining gap points to underpayment rather than a weak contract.",
                    "Rank payers by the revenue at stake and check each contract's renewal and termination-notice dates, so the weakest contracts are reopened first.",
                ],
            },
            {
                h: "Where the numbers usually go wrong",
                list: [
                    "Percent-of-charges contracts move with your chargemaster, so the percent of Medicare changes every time charges change. Recalculate after each chargemaster update.",
                    "Lesser-of clauses, stop-loss thresholds, carve-outs and outlier provisions change what is really paid. Model them, or the benchmark will flatter the contract.",
                    "Mixing rate periods. Use the Medicare rates in effect on the date of service: inpatient IPPS rates follow the federal fiscal year starting 1 October, while outpatient and physician fee schedules follow the calendar year.",
                    "Leaving out Medicare add-ons such as outliers or teaching and disproportionate-share adjustments without saying so. Pick one convention and apply it to every payer.",
                    "Benchmarking only contract terms. Without remittance data you can find a weak contract but not a payer that ignores a good one.",
                ],
            },
            {
                h: "Ways to do it: spreadsheets, consultants or software",
                table: {
                    head: ["Approach", "Good for", "Watch out for"],
                    rows: [
                        ["Spreadsheets built in-house", "A one-off look at a few payers and top codes", "Weeks of manual work, rebuilt every year, hard to audit back to the contract"],
                        ["Consultants and actuarial firms (for example Milliman)", "A defensible, normalized study before a major negotiation", "Typically a point-in-time study per engagement"],
                        ["Price-transparency data platforms (for example Turquoise Health, PayerPrice)", "Seeing how your rates compare with other hospitals in the market", "Published rates are not your contract terms or what you are actually paid"],
                        ["Contract management and modeling software (for example PMMC)", "Modeling contract terms and expected payment", "Setup depends on how many contracts you load and keep current"],
                        ["An AI layer on your existing revenue cycle (Nuvae)", "Extracting rates from contract PDFs, benchmarking to Medicare continuously and checking every remittance", "Needs your contracts and, for paid-versus-contracted, your 835 files"],
                    ],
                },
            },
            {
                h: "How Nuvae does this",
                p: [
                    "Nuvae reads your payer contracts and amendments, extracts every rate into a matrix, and links each figure back to the exact page of the source contract. Government rate agents track CMS updates on their published schedules and recalculate the Medicare side automatically, so the commercial rate as a percent of Medicare stays current without manual base-rate entry.",
                    "When remittance files are connected, Nuvae estimates the expected payment for each claim line from the contract terms and compares it with what the payer paid, showing the clause so staff can check it. Termination-notice alerts, rolling out now, flag contracts before their renegotiation window closes. The contract side needs no system integration to start, only the contract files.",
                ],
            },
        ],
        faq: [
            {
                q: "What is a good percent of Medicare for a commercial hospital contract?",
                a: "There is no single right number. It depends on your market, service mix and leverage. Use your own payer-by-payer spread and local market data as the reference: the outliers on the low side are where renegotiation pays off first.",
            },
            {
                q: "Can we benchmark against Medicare without claims data?",
                a: "Yes for contracted rates: you only need the contract terms and Medicare rates for your locality. To see what payers actually paid, and to weight the result by real volume, you need 835 remittance and claim data.",
            },
            {
                q: "How often should we redo the benchmark?",
                a: "At least once a year when Medicare publishes new rates, and whenever a contract, amendment or chargemaster update changes the terms. Software that recalculates on each update removes the annual rebuild.",
            },
            {
                q: "Is percent of Medicare the same as underpayment?",
                a: "No. Percent of Medicare measures how good the contract is. Underpayment is a payer paying less than the contract says. A hospital can have strong contracts and still be underpaid, so check both.",
            },
        ],
        related: ["ai-revenue-cycle-platforms-for-hospitals", "reduce-claim-denials-without-adding-staff", "evaluate-ai-revenue-cycle-vendor"],
    },
    {
        slug: "ai-revenue-cycle-platforms-for-hospitals",
        kicker: "Buyer's guide",
        title: "AI revenue cycle platforms for hospitals: a 2026 buyer's guide",
        metaTitle: "AI Revenue Cycle Platforms for Hospitals: 2026 Buyer's Guide | Nuvae",
        description:
            "How hospitals and health systems should shortlist AI revenue cycle platforms: the main categories of vendor, what each is good for, evaluation criteria, and where Nuvae fits.",
        answer:
            "Start from the leak you most need to close (eligibility and prior authorization denials, coding, underpayments or unworked appeals), then shortlist across categories: end-to-end RCM platforms, AI-native automation vendors, outsourced revenue cycle services, your EHR's own tools, and AI layers that run on top of the systems you already have. Judge each on proof in hospitals like yours, time to first value and how it works with your EHR.",
        blocks: [
            {
                h: "The main kinds of vendor",
                table: {
                    head: ["Category", "Examples", "Typical focus"],
                    rows: [
                        ["End-to-end RCM and claims platforms", "Waystar, FinThrive, Experian Health", "Broad claims, eligibility and denial tooling with clearinghouse connectivity"],
                        ["AI-native automation vendors", "AKASA, CombineHealth, RapidClaims, Infinx", "Automating specific high-volume tasks such as coding, prior authorization or claim follow-up"],
                        ["Revenue cycle services and outsourcing", "R1 RCM, Ensemble Health Partners", "Running revenue cycle operations with the vendor's staff and technology"],
                        ["EHR-native revenue cycle tools", "Epic, Oracle Health (Cerner), Meditech", "Registration, charging and claims inside the system you already run"],
                        ["AI layer on top of your existing RCM", "Nuvae", "Payer contract intelligence, underpayment detection and denial appeals alongside the systems you already use"],
                    ],
                },
            },
            {
                h: "What to evaluate",
                list: [
                    "Which leak it closes and how it measures it: eligibility and authorization denials, coding errors, underpayment against contract, or denials no one had time to appeal.",
                    "Proof in hospitals of your size, payer mix and EHR, with a baseline and a measurement period, not a headline percentage.",
                    "Time to first value. Some modules can start from documents alone; others need weeks of interface work before any result.",
                    "How it works with your EHR and clearinghouse: which data it reads (837 claims, 835 remittances, 270/271 eligibility, 278 authorizations), and whether it writes anything back.",
                    "Human control: which actions run automatically and which go to staff for approval, such as appeal letters or payer calls.",
                    "Security: HIPAA, a signed BAA, a current SOC 2 Type II report, and whether your data is used to train shared models.",
                    "Commercial model: per module, per claim volume or contingency, and what happens to the data if you leave.",
                ],
            },
            {
                h: "Questions to put to every vendor",
                steps: [
                    "Which three hospitals on our EHR are live with the module we are buying, and can we speak to them?",
                    "What did their numbers look like before and after, measured how and over what period?",
                    "What data do you need from us in week one, and what can run before any integration?",
                    "Which actions are automated end to end, and which wait for a person to approve?",
                    "What does a 90-day pilot look like, and what result would make it a failure?",
                ],
            },
            {
                h: "Where Nuvae fits",
                p: [
                    "Nuvae is an AI layer for hospitals and health systems that works alongside your EHR and clearinghouse, built on the standard claim and remittance files they already exchange. Its most mature modules are payer contract intelligence (rates extracted from contract PDFs, benchmarked against Medicare, every figure cited back to the contract page) and denials and appeals (appeal letters drafted from the claim facts and contract, always reviewed by staff before sending).",
                    "It also estimates expected payment from contract terms and flags underpayment on remittances. Eligibility verification is newer and launching with its first customers, prior authorization support is rolling out in phases, and AR follow-up is in development. Nuvae does not do clinical coding or CDI, so pair it with a coding vendor if that is your main gap.",
                    "Put the questions above to us too. We will tell you which modules are live for your EHR today, share results with the method behind them, and scope a pilot that can start with contract analysis from your contract files, before any interface work.",
                ],
            },
        ],
        faq: [
            {
                q: "Do we need to replace our EHR or RCM system to use AI?",
                a: "No. Most AI revenue cycle tools, Nuvae included, read the data your systems already produce (claims, remittances, eligibility responses, contracts) and work alongside them.",
            },
            {
                q: "Should we buy one platform or several point tools?",
                a: "Buy for the leak that costs you most first. A broad platform reduces vendor count; point tools can go deeper. Whatever you choose, make sure findings in one area (for example an underpayment) can flow into the next (an appeal or a renegotiation).",
            },
            {
                q: "How long before an AI revenue cycle platform shows results?",
                a: "It depends on the module. Contract analysis can start from contract files in days. Modules that read live claims and remittances need interface work first; a phased rollout of a few months is typical.",
            },
        ],
        related: ["epic-cerner-meditech-integration", "evaluate-ai-revenue-cycle-vendor", "ai-agents-vs-outsourcing-rpa-ehr-tools"],
    },
    {
        slug: "epic-cerner-meditech-integration",
        kicker: "Integrations",
        title: "How Nuvae works with Epic, Oracle Health (Cerner) and Meditech",
        metaTitle: "Revenue Cycle AI with Epic, Oracle Health (Cerner) and Meditech | Nuvae",
        description:
            "What data Nuvae reads from Epic, Oracle Health (Cerner) and Meditech hospitals, what can start with no integration, and how to verify any revenue cycle vendor's EHR integration claims.",
        answer:
            "Nuvae works alongside your EHR rather than replacing it. Contract analysis and Medicare benchmarking need only your contract files, so they work for any hospital. Claim-based modules read the standard 837 claim and 835 remittance files that Epic, Oracle Health (Cerner) and Meditech hospitals already exchange through their billing system or clearinghouse. Deeper EHR connections, such as clinical documents for appeals, are scoped per customer.",
        blocks: [
            {
                h: "What Nuvae reads, module by module",
                table: {
                    head: ["Module", "Data it uses", "Integration needed to start"],
                    rows: [
                        ["Payer contract intelligence", "Contract and amendment files (PDF)", "None: upload the contracts"],
                        ["Government rates and percent of Medicare", "Published CMS and state rate schedules", "None: maintained by Nuvae's rate agents"],
                        ["Expected reimbursement and underpayment", "837 claims and 835 remittances", "EDI file feed from your billing system or clearinghouse"],
                        ["Eligibility verification (newer)", "Scheduled visits; payer eligibility responses", "Visit schedule; payer APIs, with portal and phone fallback"],
                        ["Prior authorization (rolling out in phases)", "Payer notification and authorization tracking", "Scoped per customer"],
                        ["Denials and appeals", "835 denial codes, claim data, clinical documentation for clinical denials", "Remittance feed; EHR connection for clinical documents scoped per customer"],
                    ],
                },
            },
            {
                h: "Why standard transactions matter",
                p: [
                    "Hospitals on Epic, Oracle Health (Cerner) and Meditech all send X12 claims and receive remittances, typically through their billing system and a clearinghouse. Building the claim-based modules on those standard files keeps the work outside the EHR: no custom code inside it and no change to its configuration.",
                    "Nuvae does not write back to the EHR today. Its findings come back to your team in the Nuvae workspace, and appeal letters are routed to staff for approval rather than sent automatically. Ask us which EHR connections are live today for the module you need.",
                ],
            },
            {
                h: "How to verify any vendor's EHR integration claim",
                steps: [
                    "Ask for named hospitals live on your EHR and version, using the same module you are buying.",
                    "Ask exactly which data flows are used: which X12 transactions, HL7 or FHIR interfaces, and in which direction.",
                    "Ask who builds and maintains the interface, and how much of your IT team's time it takes.",
                    "Ask for a sample of real output (a priced claim, a flagged underpayment, a drafted appeal) produced from your EHR's data format.",
                    "Ask what happens when your EHR upgrades or your clearinghouse changes.",
                    "Separate what is live today from what is on the roadmap, in writing.",
                ],
            },
            {
                h: "Typical rollout",
                p: [
                    "A full rollout usually runs in phases over about three months: discovery, connecting the data feeds, then contracts, denials and front-end modules in turn. The contract module can start in parallel from the first week because it only needs the contract files.",
                ],
            },
        ],
        faq: [
            {
                q: "Does Nuvae work with Meditech hospitals?",
                a: "Contract analysis and Medicare benchmarking work for any hospital, Meditech included, because they need only the contract files. Claim-based modules use the standard 837 and 835 files Meditech hospitals already exchange through their billing system or clearinghouse; we confirm the feed during discovery.",
            },
            {
                q: "Does Nuvae write data back into Epic or Cerner?",
                a: "No. Nuvae does not write back to the EHR today. It reads data and returns its findings to your team in the Nuvae workspace.",
            },
            {
                q: "What can we start with before any IT work?",
                a: "Payer contract analysis and Medicare benchmarking. Upload the contracts and amendments and Nuvae builds the rate matrix, with every figure linked to the source page.",
            },
        ],
        related: ["ai-revenue-cycle-platforms-for-hospitals", "evaluate-ai-revenue-cycle-vendor", "payer-contract-rates-vs-medicare"],
    },
    {
        slug: "evaluate-ai-revenue-cycle-vendor",
        kicker: "Vendor evaluation",
        title: "How to evaluate an AI revenue cycle vendor: a checklist for hospitals",
        metaTitle: "Evaluating AI Revenue Cycle Vendors: Hospital Checklist | Nuvae",
        description:
            "A practical checklist for hospitals evaluating AI revenue cycle vendors: security and HIPAA credentials, proof of results, reference questions, AI risk controls and red flags.",
        answer:
            "Check five things: security (HIPAA, a signed BAA, a current SOC 2 Type II report, and how your data is used), proof (before-and-after results from hospitals like yours, with a baseline), control (which AI actions need human approval and how decisions are explained), integration (what data it needs and what runs without IT work), and commercial terms (pricing model and data exit).",
        blocks: [
            {
                h: "Security and HIPAA credentials",
                list: [
                    "A signed Business Associate Agreement before any PHI is shared.",
                    "A current SOC 2 Type II report, not only a Type I or a statement of intent. Ask for the report and its scope.",
                    "Encryption in transit and at rest, role-based access and access logging.",
                    "Whether your data is used to train models shared with other customers, and how PHI is kept out of logs.",
                    "Where data is hosted and whether on-premise or dedicated deployment is available if you need it.",
                ],
            },
            {
                h: "Proof that it works",
                steps: [
                    "Agree the baseline first: denial rate, first-pass acceptance, appeal overturn rate, days in AR, or underpayment recovered, measured the same way before and after.",
                    "Run a pilot on a defined scope, such as one module, one facility or a set of payers, for long enough to see payments land (often 60 to 90 days).",
                    "Where you can, keep a comparison group: claims or payers the tool does not touch during the pilot.",
                    "Count dollars collected, not just items flagged. A flagged underpayment is only revenue once it is paid.",
                ],
            },
            {
                h: "Questions for reference hospitals",
                list: [
                    "What was live in the first 90 days, and what took longer than promised?",
                    "How much of your IT and revenue cycle staff time did implementation take?",
                    "What results did you measure yourselves, and how?",
                    "How accurate is the output, and how often do your staff override it?",
                    "Would you buy it again, and what would you do differently?",
                ],
            },
            {
                h: "Controlling the risk of AI touching claims and accounts",
                p: [
                    "Ask which actions the system takes on its own and which wait for a person. Appeal letters, payer calls and anything that changes a patient account should have a clear approval step and an audit trail of who approved what.",
                    "Every number the AI produces should be traceable to its source: the contract clause, the remittance line or the payer rule. If a vendor cannot show why it flagged something, staff will not trust it and auditors will not accept it.",
                ],
            },
            {
                h: "Red flags",
                list: [
                    "Guaranteed percentage improvements with no baseline or measurement method.",
                    "No customer you can speak to about the module you are buying.",
                    "Months of integration before any result, with no module that can start sooner.",
                    "Black-box outputs that cannot be traced to a contract, claim or rule.",
                    "Vague answers on data ownership, model training or what happens when you leave.",
                ],
            },
            {
                h: "How Nuvae answers these",
                p: [
                    "Nuvae signs a BAA, and its Trust Center sets out its HIPAA and SOC 2 posture. Every rate and finding links back to its source contract page or claim line, appeal letters are always reviewed by staff before they are sent, and the contract module can start from contract files alone so a pilot shows results before any interface work. We will also tell you plainly which modules are live for your EHR today.",
                ],
            },
        ],
        faq: [
            {
                q: "What security credentials should a revenue cycle AI vendor have?",
                a: "At minimum: HIPAA compliance, a signed BAA, and a current SOC 2 Type II report covering the systems that hold your data. Also ask about encryption, access logging and whether your data trains shared models.",
            },
            {
                q: "How can a hospital verify that an AI platform really reduces denials?",
                a: "Set a baseline denial rate before the pilot, define how it is measured, keep a comparison group of untouched claims or payers where possible, and measure dollars collected over a period long enough for payments to land.",
            },
            {
                q: "What proof should we ask for before a pilot?",
                a: "Named reference hospitals on your EHR, before-and-after results with the method used, sample outputs from data like yours, and a written list of what is live today versus planned.",
            },
        ],
        related: ["ai-revenue-cycle-platforms-for-hospitals", "epic-cerner-meditech-integration", "reduce-claim-denials-without-adding-staff"],
    },
    {
        slug: "reduce-claim-denials-without-adding-staff",
        kicker: "Denials and underpayment",
        title: "How hospitals reduce claim denials and underpayments without adding staff",
        metaTitle: "Reduce Hospital Claim Denials Without Adding Billing Staff | Nuvae",
        description:
            "Where hospital claim rejections, denials and underpayments start, and how automation at the front end, in contract management and in appeals reduces them without adding billing staff.",
        answer:
            "Stop the preventable denials at the front end (eligibility, registration and prior authorization checked before the visit), catch underpayments by checking every remittance against the contract, and let automation draft appeals and work the low-dollar claims staff never reach. Staff then spend their time approving and escalating rather than searching portals.",
        blocks: [
            {
                h: "Rejections, denials and underpayments are different problems",
                list: [
                    "A rejection is a claim returned before processing, usually for missing or invalid data. Fix and resubmit.",
                    "A denial is a processed claim the payer refuses to pay, for reasons such as eligibility, authorization, medical necessity or coding.",
                    "An underpayment is a claim the payer pays, but at less than the contract says. It does not show up as a denial, which is why it often goes unnoticed.",
                ],
            },
            {
                h: "Front end: prevent the avoidable ones",
                p: [
                    "Eligibility and registration errors and missing prior authorizations are a common cause of avoidable denials. Checking coverage, benefits and authorization requirements automatically before each scheduled visit removes the manual portal checks that front-desk teams cannot keep up with.",
                ],
            },
            {
                h: "Middle: price every claim before you are paid",
                p: [
                    "When each claim is priced against the contract before the remittance arrives, you have an expected payment to check the remittance against. Any gap on the remittance becomes a flagged underpayment with the contract clause attached, instead of a variance no one has time to investigate.",
                ],
            },
            {
                h: "Back end: work the whole queue, not just the top",
                p: [
                    "Most teams appeal the high-dollar denials and let the long tail of small claims expire. Automation that scores denials for appealability and drafts appeal letters from the claim facts and contract lets the same team cover the full queue, with staff reviewing and approving each letter.",
                    "AI agents that plan and place payer follow-up calls on unresolved claims, returning a summary and transcript, are an emerging option. At Nuvae this module is in development.",
                ],
            },
            {
                h: "What to measure",
                table: {
                    head: ["Metric", "What it tells you"],
                    rows: [
                        ["First-pass acceptance rate", "Whether front-end and claim quality fixes are working"],
                        ["Denial rate by reason", "Which root causes to fix upstream"],
                        ["Appeal rate and overturn rate", "How much of the denied revenue you actually pursue and win"],
                        ["Underpayment recovered", "Revenue collected against contract variances, not just flagged"],
                        ["Days in A/R", "Whether cash arrives sooner overall"],
                    ],
                },
            },
            {
                h: "Where Nuvae fits",
                p: [
                    "Nuvae covers contract-based claim pricing and underpayment detection, and denial scoring with appeal drafting, on top of your existing systems. Eligibility verification is newer and launching with its first customers, prior authorization support is rolling out in phases, and AR follow-up is in development. It does not replace your claim scrubber or coding tools.",
                ],
            },
        ],
        faq: [
            {
                q: "How can a hospital reduce claim rejections without hiring more billing staff?",
                a: "Automate the checks that cause most avoidable rejections and denials (eligibility, registration data and prior authorization) before the visit, and use automation to draft appeals and follow up on claims so existing staff review and approve rather than do every step by hand.",
            },
            {
                q: "Who can help us speed up payer payments and shorten days in A/R?",
                a: "Vendors that combine front-end denial prevention with automated follow-up and appeals. Measure days in A/R, denial rate and appeal overturn rate before and after any pilot.",
            },
            {
                q: "Why do underpayments go unnoticed?",
                a: "Because the claim is paid, so it never enters a denial queue. Only line-by-line comparison of the remittance against the contract rate shows the shortfall.",
            },
        ],
        related: ["payer-contract-rates-vs-medicare", "ai-agents-vs-outsourcing-rpa-ehr-tools", "evaluate-ai-revenue-cycle-vendor"],
    },
    {
        slug: "ai-agents-vs-outsourcing-rpa-ehr-tools",
        kicker: "Comparisons",
        title: "AI revenue cycle agents vs outsourced billing, RPA and EHR-native tools",
        metaTitle: "AI Revenue Cycle Agents vs Outsourcing, RPA and EHR Tools | Nuvae",
        description:
            "How AI revenue cycle agents compare with outsourced billing companies, robotic process automation, EHR-native tools, point solutions and building in-house, with the trade-offs for hospitals.",
        answer:
            "Outsourcing hands the work to another company's staff; RPA scripts repeat clicks and break when payer portals change; EHR-native tools sit closest to the patient record, with varying depth on contracts and underpayment; point tools go deep on one task. AI agents read documents and data, adapt to payer variation and keep your team in control of approvals, which suits hospitals that want to scale without handing over the work.",
        blocks: [
            {
                h: "Side by side",
                table: {
                    head: ["Option", "Best when", "Trade-off"],
                    rows: [
                        ["Outsourced billing or RCM services", "You need to offload staffing quickly", "Day-to-day control moves to the vendor; fees are often tied to collections"],
                        ["Robotic process automation (RPA)", "A task is fixed, repetitive and on a stable screen", "Scripts break when portals or payer rules change; no judgement"],
                        ["EHR-native revenue cycle tools", "You want everything in one vendor's system", "Depth on contract benchmarking and underpayment varies; check it against your needs"],
                        ["Single-point tools (for example denials only)", "One problem dominates", "Findings do not flow between front end, contracts and appeals"],
                        ["Build in-house", "You have data engineers and a narrow, stable need", "Ongoing maintenance of payer rules, rates and integrations"],
                        ["AI agents on your existing RCM", "You want more coverage with the same team, keeping control", "Needs contracts and claim data shared, and staff time for approvals"],
                    ],
                },
            },
            {
                h: "Why agents rather than scripts",
                p: [
                    "RPA follows fixed steps on a screen. When a payer portal changes a field or a rule, the script fails until someone rewrites it. An AI agent works from the goal (verify this patient's coverage, find the contract rate for this claim) and can read unstructured documents such as contracts and denial letters, so it handles variation that scripts cannot.",
                ],
            },
            {
                h: "Platform or point solution?",
                p: [
                    "A denial tool alone tells you what was denied. A connected platform can also show that the denial came from a missing authorization upstream, or that a paid claim was quietly underpaid against the contract. If you start with a point tool, make sure its findings can reach the teams that fix root causes.",
                ],
            },
            {
                h: "Where Nuvae fits",
                p: [
                    "Nuvae runs AI agents for payer contracts, underpayment detection and denial appeals alongside the EHR and clearinghouse you already use, with eligibility verification newer, prior authorization rolling out and AR follow-up in development. Your staff stay in control: appeal letters are approved by a person before they go out.",
                ],
            },
        ],
        faq: [
            {
                q: "How do AI revenue cycle platforms compare with outsourced billing companies?",
                a: "Outsourcing moves the work and the staff to another company. An AI platform keeps the work in-house and increases what your existing team can cover, with your staff approving the outputs.",
            },
            {
                q: "What are the alternatives to RPA for hospital revenue cycle tasks?",
                a: "AI agents that work from goals and read documents, API-based integrations with payers, and outsourced services. AI agents cope better with portal and rule changes that break RPA scripts.",
            },
            {
                q: "Should we use our EHR's built-in revenue cycle tools or add an AI layer?",
                a: "Use the EHR for what it does well (registration, charging, claim creation) and add an AI layer where you need more depth, often payer contract analysis, underpayment detection and appeal volume.",
            },
        ],
        related: ["ai-revenue-cycle-platforms-for-hospitals", "reduce-claim-denials-without-adding-staff", "epic-cerner-meditech-integration"],
    },
];

export function getGuide(slug: string): Guide | undefined {
    return GUIDES.find((g) => g.slug === slug);
}
