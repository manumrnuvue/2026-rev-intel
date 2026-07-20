import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import App from "./App";
import "./styles/global.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Web fonts swap in after first paint, changing text height and therefore
// page/section heights. Any pinned or scroll-height-dependent ScrollTrigger
// (the chapter pins, the ScrollSpine path length) measured before the swap
// can end up stale — refresh once fonts are actually ready.
document.fonts?.ready?.then(() => ScrollTrigger.refresh());

if (import.meta.env.DEV) {
    // expose for debugging scroll scenes and timelines in the browser console
    (window as unknown as { ScrollTrigger: typeof ScrollTrigger; gsap: typeof gsap }).ScrollTrigger =
        ScrollTrigger;
    (window as unknown as { gsap: typeof gsap }).gsap = gsap;
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>,
);
