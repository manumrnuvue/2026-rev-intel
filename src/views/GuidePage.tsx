import Link from "next/link";
import Faq from "../components/Faq";
import { GUIDES, GUIDES_UPDATED, type Guide } from "../content/guides";

const SITE = "https://nuvae.ai";

const updatedLabel = new Date(GUIDES_UPDATED + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

/** Server-rendered guide: direct answer first, then sections, FAQ and related guides.
 *  Kept free of client animation so every word is in the HTML crawlers receive. */
export default function GuidePage({ guide }: { guide: Guide }) {
    const url = `${SITE}/guides/${guide.slug}`;
    const related = guide.related
        .map((slug) => GUIDES.find((g) => g.slug === slug))
        .filter((g): g is Guide => Boolean(g));

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline: guide.title,
                description: guide.description,
                url,
                mainEntityOfPage: url,
                datePublished: GUIDES_UPDATED,
                dateModified: GUIDES_UPDATED,
                author: { "@type": "Organization", name: "Nuvae", url: SITE },
                publisher: { "@id": `${SITE}/#org` },
                about: guide.kicker,
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
                    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
                    { "@type": "ListItem", position: 3, name: guide.title, item: url },
                ],
            },
        ],
    };

    return (
        <section className="scene light legal guide" id="guide">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="wrap legal-wrap">
                <nav className="guide-crumbs" aria-label="Breadcrumb">
                    <Link href="/">Home</Link> / <Link href="/guides">Guides</Link>
                </nav>
                <p className="kicker">{guide.kicker}</p>
                <h1 className="h-big">{guide.title}</h1>
                <p className="guide-meta">Updated {updatedLabel} · Nuvae team</p>

                <div className="guide-answer">
                    <span className="guide-answer-label">Short answer</span>
                    <p>{guide.answer}</p>
                </div>

                {guide.blocks.map((b) => (
                    <div className="legal-section" key={b.h}>
                        <h2 className="h-mid">{b.h}</h2>
                        {b.p?.map((text) => (
                            <p className="sub legal-p" key={text.slice(0, 40)}>
                                {text}
                            </p>
                        ))}
                        {b.list && (
                            <ul className="guide-list">
                                {b.list.map((item) => (
                                    <li key={item.slice(0, 40)}>{item}</li>
                                ))}
                            </ul>
                        )}
                        {b.steps && (
                            <ol className="guide-list guide-steps">
                                {b.steps.map((item) => (
                                    <li key={item.slice(0, 40)}>{item}</li>
                                ))}
                            </ol>
                        )}
                        {b.table && (
                            <div className="guide-table-wrap">
                                <table className="guide-table">
                                    <thead>
                                        <tr>
                                            {b.table.head.map((cell) => (
                                                <th key={cell}>{cell}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {b.table.rows.map((row) => (
                                            <tr key={row[0]}>
                                                {row.map((cell, i) => (
                                                    <td key={i}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}

                <div className="legal-section">
                    <h2 className="h-mid">Frequently asked questions</h2>
                    <div className="guide-faq">
                        <Faq items={guide.faq} />
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="legal-section">
                        <h2 className="h-mid">Related guides</h2>
                        <div className="also-grid guide-related">
                            {related.map((g) => (
                                <Link className="also" href={`/guides/${g.slug}`} key={g.slug}>
                                    <b>{g.title}</b>
                                    <p>{g.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="price-cta">
                    <Link className="btn-big" href="/contact">
                        Book a walkthrough
                    </Link>
                </div>
            </div>
        </section>
    );
}
