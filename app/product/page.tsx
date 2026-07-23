import type { Metadata } from "next";
import Product from "../../src/views/Product";

export const metadata: Metadata = {
    title: "Product — Nuvae",
    description:
        "Nuvae is the AI revenue-protection layer that runs on top of the RCM you already have. Prevent eligibility denials, detect contract underpayment on every remittance, and recover unworked appeals at scale — without replacing your systems.",
    alternates: { canonical: "https://nuvae.ai/product" },
    openGraph: {
        title: "Product — Nuvae",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals at scale — an AI layer on top of the RCM you already run.",
        url: "https://nuvae.ai/product",
    },
};

export default function Page() {
    return <Product />;
}
