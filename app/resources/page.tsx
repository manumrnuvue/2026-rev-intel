import type { Metadata } from "next";
import Resources from "../../src/views/Resources";
import { GUIDES } from "../../src/content/guides";

export const metadata: Metadata = {
    title: "Revenue Cycle Guides, Glossary and Benchmarks | Nuvae",
    description:
        "Blog posts, a glossary, and cited industry benchmarks for revenue cycle teams.",
    alternates: { canonical: "https://nuvae.ai/resources" },
    openGraph: {
        title: "Revenue Cycle Guides, Glossary and Benchmarks | Nuvae",
        description:
            "Guides, a glossary, and cited industry benchmarks for revenue cycle teams.",
        url: "https://nuvae.ai/resources",
    },
};

export default function Page() {
    const guides = GUIDES.map(({ slug, kicker, title, description }) => ({ slug, kicker, title, description }));
    return <Resources guides={guides} />;
}
