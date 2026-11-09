import type { Metadata } from "next";
import TrustCenter from "../../src/views/TrustCenter";

export const metadata: Metadata = {
    title: "Trust Center: HIPAA, SOC 2 Type II and BAA | Nuvae",
    description:
        "Nuvae's security, privacy, and compliance posture — HIPAA compliant, SOC 2 Type II certified, with on-premise deployment available.",
    alternates: { canonical: "https://nuvae.ai/trust-center" },
    openGraph: {
        title: "Trust Center: HIPAA, SOC 2 Type II and BAA | Nuvae",
        description:
            "Nuvae's security, privacy, and compliance posture — HIPAA compliant, SOC 2 Type II certified, with on-premise deployment available.",
        url: "https://nuvae.ai/trust-center",
    },
};

export default function Page() {
    return <TrustCenter />;
}
