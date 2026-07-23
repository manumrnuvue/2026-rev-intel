import type { Metadata } from "next";
import Solutions from "../../src/views/Solutions";

export const metadata: Metadata = {
    title: "Solutions — Nuvae",
    description:
        "Tailored solutions by hospital size — from a single small hospital to a multi-facility health system.",
    alternates: { canonical: "https://nuvae.ai/solutions" },
    openGraph: {
        title: "Solutions — Nuvae",
        description:
            "Tailored solutions by hospital size — from a single small hospital to a multi-facility health system.",
        url: "https://nuvae.ai/solutions",
    },
};

export default function Page() {
    return <Solutions />;
}
