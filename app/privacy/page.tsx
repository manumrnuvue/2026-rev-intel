import type { Metadata } from "next";
import Privacy from "../../src/views/Privacy";

export const metadata: Metadata = {
    title: "Privacy Policy — Nuvae",
    description:
        "How Nuvae collects, uses, and protects information, including PHI under HIPAA.",
    alternates: { canonical: "https://nuvae.ai/privacy" },
};

export default function Page() {
    return <Privacy />;
}
