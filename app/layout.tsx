import type { Metadata } from "next";
import "../src/styles/global.css";
import RootShell from "./RootShell";

export const metadata: Metadata = {
    metadataBase: new URL("https://nuvae.ai"),
    title: {
        default: "Nuvae — AI Revenue Protection for Healthcare RCM | Eligibility, Contracts, Appeals",
        template: "%s",
    },
    description:
        "Nuvae is the AI revenue-protection layer that runs on top of the RCM you already have. Prevent eligibility denials, detect contract underpayment on every remittance, and recover unworked appeals at scale — without replacing your systems.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://nuvae.ai/" },
    openGraph: {
        type: "website",
        siteName: "Nuvae",
        title: "Nuvae — AI Revenue Protection for Healthcare RCM",
        description:
            "Prevent eligibility denials, detect contract underpayment on every remittance, and recover unworked appeals at scale — an AI layer on top of the RCM you already run.",
        url: "https://nuvae.ai/",
        locale: "en_US",
    },
    twitter: {
        card: "summary",
        title: "Nuvae — AI Revenue Protection for Healthcare RCM",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals — without replacing your RCM.",
    },
};

const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nuvae",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
        "AI revenue-protection layer for healthcare revenue cycle management: eligibility verification, contract rate matrix analytics, and automated appeal generation.",
    url: "https://nuvae.ai/",
    publisher: {
        "@type": "Organization",
        name: "Nuvae",
        url: "https://nuvae.ai/",
    },
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
