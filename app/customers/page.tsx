import type { Metadata } from "next";
import Customers from "../../src/views/Customers";

export const metadata: Metadata = {
    title: "Customers — Nuvae",
    description:
        "Who Nuvae serves, from a single small hospital to a multi-facility health system.",
    alternates: { canonical: "https://nuvae.ai/customers" },
    openGraph: {
        title: "Customers — Nuvae",
        description:
            "Who Nuvae serves, from a single small hospital to a multi-facility health system.",
        url: "https://nuvae.ai/customers",
    },
};

export default function Page() {
    return <Customers />;
}
