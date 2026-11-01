import type { Metadata } from "next";
import "../src/styles/global.css";
import RootShell from "./RootShell";

export const metadata: Metadata = {
    metadataBase: new URL("https://nuvae.ai"),
    title: {
        default: "Nuvae | AI Revenue Cycle Platform for Hospitals and Health Systems",
        template: "%s",
    },
    description:
        "Nuvae is an AI revenue cycle platform for US hospitals and health systems. It runs on top of Epic, Cerner or Meditech to prevent eligibility and prior authorization denials, flag payer underpayments and contract rates below Medicare, and work denial appeals at scale.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://nuvae.ai/" },
    openGraph: {
        type: "website",
        siteName: "Nuvae",
        title: "Nuvae | AI Revenue Cycle Platform for Hospitals and Health Systems",
        description:
            "Prevent eligibility denials, detect contract underpayment on every remittance, and recover unworked appeals at scale — an AI layer on top of the RCM you already run.",
        url: "https://nuvae.ai/",
        locale: "en_US",
    },
    twitter: {
        card: "summary",
        title: "Nuvae | AI Revenue Cycle Platform for Hospitals and Health Systems",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals — without replacing your RCM.",
    },
};

// Organization, WebSite and SoftwareApplication as one graph so AI and search engines
// resolve "Nuvae" to a single entity with a clear category and audience.
const JSON_LD = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://nuvae.ai/#org",
            name: "Nuvae",
            alternateName: "Nuvae.ai",
            url: "https://nuvae.ai/",
            logo: "https://nuvae.ai/icon.svg",
            email: "contact@nuvae.ai",
            description:
                "Nuvae builds AI agents for the hospital revenue cycle: eligibility, prior authorization, payer contract analytics, underpayment detection, denial appeals and A/R follow-up.",
            knowsAbout: [
                "Hospital revenue cycle management",
                "Eligibility verification",
                "Prior authorization automation",
                "Payer contract management",
                "Payer rate benchmarking against Medicare",
                "Underpayment detection",
                "Denial management and appeals",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://nuvae.ai/#website",
            url: "https://nuvae.ai/",
            name: "Nuvae",
            publisher: { "@id": "https://nuvae.ai/#org" },
        },
        {
            "@type": "SoftwareApplication",
            name: "Nuvae",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Healthcare revenue cycle management",
            operatingSystem: "Web",
            url: "https://nuvae.ai/",
            description:
                "AI revenue cycle platform for US hospitals and health systems that runs on top of Epic, Cerner or Meditech: eligibility and prior authorization checks, payer contract and rate analytics, underpayment detection, and denial appeals.",
            audience: { "@type": "BusinessAudience", audienceType: "Hospitals and health systems" },
            featureList: [
                "Eligibility verification before the visit",
                "Prior authorization rule checks",
                "Payer contract repository and rate matrix",
                "Payer rates benchmarked against Medicare",
                "Underpayment detection on every remittance",
                "Denial scoring and contract-cited appeals",
                "A/R follow-up with payers",
            ],
            publisher: { "@id": "https://nuvae.ai/#org" },
        },
    ],
};

// Light-first design; dark mode was removed. Clear any stale persisted theme
// before paint so a previous visit can't flip the page dark.
const THEME_SCRIPT = `(function(){try{document.documentElement.dataset.theme="light";localStorage.removeItem("nuvae-theme");}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="light">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@300..800&family=Geist+Mono:wght@400..600&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
                />
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
            </head>
            <body>
                <RootShell>{children}</RootShell>
            </body>
        </html>
    );
}
