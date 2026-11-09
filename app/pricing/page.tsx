import type { Metadata } from "next";
import Pricing from "../../src/views/Pricing";

export const metadata: Metadata = {
    title: "Pricing: Per Module, Scaled to Claim Volume | Nuvae",
    description:
        "Priced per module, scaled to claim volume. Talk to sales for a walkthrough of your numbers.",
    alternates: { canonical: "https://nuvae.ai/pricing" },
    openGraph: {
        title: "Pricing: Per Module, Scaled to Claim Volume | Nuvae",
        description:
            "Priced per module, scaled to claim volume. Talk to sales for a walkthrough of your numbers.",
        url: "https://nuvae.ai/pricing",
    },
};

export default function Page() {
    return <Pricing />;
}
