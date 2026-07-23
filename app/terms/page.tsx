import type { Metadata } from "next";
import Terms from "../../src/views/Terms";

export const metadata: Metadata = {
    title: "Terms of Service — Nuvae",
    description: "The terms governing use of the Nuvae platform and website.",
    alternates: { canonical: "https://nuvae.ai/terms" },
};

export default function Page() {
    return <Terms />;
}
