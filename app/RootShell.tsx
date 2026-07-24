"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BootIntro from "../src/components/BootIntro";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import TawkToWidget from "../src/components/TawkToWidget";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Web fonts swap in after first paint, changing text/section heights. Any
// pinned or scroll-height-dependent ScrollTrigger measured before the swap can
// end up stale — refresh once fonts are actually ready.
if (typeof document !== "undefined") {
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());
    if (process.env.NODE_ENV !== "production") {
        (window as unknown as { ScrollTrigger: typeof ScrollTrigger; gsap: typeof gsap }).ScrollTrigger =
            ScrollTrigger;
        (window as unknown as { gsap: typeof gsap }).gsap = gsap;
    }
}

function ScrollToTop() {
    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo(0, 0);
        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, [pathname]);
    return null;
}

export default function RootShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BootIntro />
            <Header />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />
            <TawkToWidget />
        </>
    );
}
