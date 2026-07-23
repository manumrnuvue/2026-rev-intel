import type { Metadata } from "next";
import Roi from "../../src/views/Roi";

export const metadata: Metadata = {
    title: "ROI — Nuvae",
    description:
        "The estimated annual value of Nuvae, by hospital size, grounded in cited industry benchmarks.",
    alternates: { canonical: "https://nuvae.ai/roi" },
    openGraph: {
        title: "ROI — Nuvae",
        description:
            "The estimated annual value of Nuvae, by hospital size, grounded in cited industry benchmarks.",
        url: "https://nuvae.ai/roi",
    },
};

export default function Page() {
    return <Roi />;
}
