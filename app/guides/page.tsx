import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "../../src/content/guides";

export const metadata: Metadata = {
    title: "Revenue Cycle Guides for Hospitals | Nuvae",
    description:
        "Practical guides for hospital revenue cycle leaders: benchmarking payer contracts against Medicare, choosing an AI revenue cycle platform, EHR integration, vendor evaluation and reducing denials.",
    alternates: { canonical: "https://nuvae.ai/guides" },
    openGraph: {
        title: "Revenue Cycle Guides for Hospitals | Nuvae",
        description:
            "Practical guides for hospital revenue cycle leaders on payer contracts, denials, AI platforms and vendor evaluation.",
        url: "https://nuvae.ai/guides",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Revenue cycle guides for hospitals",
    url: "https://nuvae.ai/guides",
    hasPart: GUIDES.map((g) => ({
        "@type": "Article",
        headline: g.title,
        url: `https://nuvae.ai/guides/${g.slug}`,
    })),
};

export default function Page() {
    return (
        <section className="scene light legal guide" id="guides">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="wrap">
                <p className="kicker">Guides</p>
                <h1 className="h-big">Revenue cycle guides for hospitals</h1>
                <p className="sub mt-30" style={{ maxWidth: "62ch" }}>
                    Straight answers to the questions hospital finance, revenue cycle and managed care
                    teams ask when they look at payer contracts, denials and AI platforms.
                </p>
                <div className="also-grid guide-related">
                    {GUIDES.map((g) => (
                        <Link className="also" href={`/guides/${g.slug}`} key={g.slug}>
                            <span className="guide-card-kicker">{g.kicker}</span>
                            <b>{g.title}</b>
                            <p>{g.description}</p>
                        </Link>
                    ))}
                </div>
                <div className="price-cta">
                    <Link className="btn-big" href="/contact">
                        Book a walkthrough
                    </Link>
                </div>
            </div>
        </section>
    );
}
