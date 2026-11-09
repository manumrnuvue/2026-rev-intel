import type { Metadata } from "next";
import About from "../../src/views/About";

export const metadata: Metadata = {
    title: "About Nuvae: AI for the Hospital Revenue Cycle",
    description:
        "Why Nuvae exists, and how we think about revenue leakage in healthcare.",
    alternates: { canonical: "https://nuvae.ai/about" },
    openGraph: {
        title: "About Nuvae: AI for the Hospital Revenue Cycle",
        description:
            "Why Nuvae exists, and how we think about revenue leakage in healthcare.",
        url: "https://nuvae.ai/about",
    },
};

export default function Page() {
    return <About />;
}
