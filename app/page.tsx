import type { Metadata } from "next";
import Home from "../src/views/Home";

export const metadata: Metadata = {
    title: "Nuvae — AI Revenue Protection for Healthcare RCM",
    description:
        "Nuvae is the AI revenue-protection layer that runs on top of the RCM you already have. Prevent eligibility denials, detect contract underpayment on every remittance, and recover unworked appeals at scale — without replacing your systems.",
    alternates: { canonical: "https://nuvae.ai/" },
    openGraph: {
        title: "Nuvae — AI Revenue Protection for Healthcare RCM",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals at scale — an AI layer on top of the RCM you already run.",
        url: "https://nuvae.ai/",
    },
    twitter: {
        title: "Nuvae — AI Revenue Protection for Healthcare RCM",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals — without replacing your RCM.",
    },
};

export default function Page() {
    return <Home />;
}
