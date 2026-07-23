import type { Metadata } from "next";
import Careers from "../../src/views/Careers";

export const metadata: Metadata = {
    title: "Careers — Nuvae",
    description:
        "Help hospitals keep what they've earned. Open roles and how we work.",
    alternates: { canonical: "https://nuvae.ai/careers" },
    openGraph: {
        title: "Careers — Nuvae",
        description:
            "Help hospitals keep what they've earned. Open roles and how we work.",
        url: "https://nuvae.ai/careers",
    },
};

export default function Page() {
    return <Careers />;
}
