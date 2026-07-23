import type { Metadata } from "next";
import Contact from "../../src/views/Contact";

export const metadata: Metadata = {
    title: "Contact — Nuvae",
    description:
        "See Nuvae.ai in action. Request a personalized demo for your hospital.",
    alternates: { canonical: "https://nuvae.ai/contact" },
    openGraph: {
        title: "Contact — Nuvae",
        description:
            "See Nuvae.ai in action. Request a personalized demo for your hospital.",
        url: "https://nuvae.ai/contact",
    },
};

export default function Page() {
    return <Contact />;
}
