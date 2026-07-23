import type { Metadata } from "next";
import NotFound from "../src/views/NotFound";

export const metadata: Metadata = {
    title: "Page not found — Nuvae",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <NotFound />;
}
