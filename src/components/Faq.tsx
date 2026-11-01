"use client";

type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
    // FAQPage schema so search and AI engines can lift these answers directly.
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    return (
        <dl className="faq-list">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {items.map((item) => (
                <div className="faq-item" key={item.q}>
                    <dt>{item.q}</dt>
                    <dd>{item.a}</dd>
                </div>
            ))}
        </dl>
    );
}
