import type { Metadata } from "next";
import Home from "../src/views/Home";

export const metadata: Metadata = {
    title: "Nuvae | AI Revenue Cycle Platform for Hospitals and Health Systems",
    description:
        "Nuvae is an AI revenue cycle platform for US hospitals and health systems. It runs on top of Epic, Cerner or Meditech to prevent eligibility and prior authorization denials, flag payer underpayments and contract rates below Medicare, and work denial appeals at scale.",
    alternates: { canonical: "https://nuvae.ai/" },
    openGraph: {
        title: "Nuvae | AI Revenue Cycle Platform for Hospitals and Health Systems",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals at scale — an AI layer on top of the RCM you already run.",
        url: "https://nuvae.ai/",
    },
    twitter: {
        title: "Nuvae | AI Revenue Cycle Platform for Hospitals and Health Systems",
        description:
            "Prevent eligibility denials, detect contract underpayment, and recover unworked appeals — without replacing your RCM.",
    },
};

export default function Page() {
    return <Home />;
}
