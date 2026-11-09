import type { Metadata } from "next";
import Product from "../../src/views/Product";

export const metadata: Metadata = {
    title: "Product: AI Agents for the Hospital Revenue Cycle | Nuvae",
    description:
        "How Nuvae works for hospitals and health systems, module by module: eligibility and prior authorization checks, payer contract and rate analytics, underpayment detection, denial appeals and A/R follow-up, on top of Epic, Cerner or Meditech.",
    alternates: { canonical: "https://nuvae.ai/product" },
    openGraph: {
        title: "Product: AI Agents for the Hospital Revenue Cycle | Nuvae",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals at scale — an AI layer on top of the RCM you already run.",
        url: "https://nuvae.ai/product",
    },
};

export default function Page() {
    return <Product />;
}
