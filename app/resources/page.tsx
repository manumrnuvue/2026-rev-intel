import type { Metadata } from "next";
import Resources from "../../src/views/Resources";

export const metadata: Metadata = {
    title: "Resources — Nuvae",
    description:
        "Blog posts, a glossary, and cited industry benchmarks for revenue cycle teams.",
    alternates: { canonical: "https://nuvae.ai/resources" },
    openGraph: {
        title: "Resources — Nuvae",
        description:
            "Guides, a glossary, and cited industry benchmarks for revenue cycle teams.",
        url: "https://nuvae.ai/resources",
    },
};

export default function Page() {
    return <Resources />;
}
