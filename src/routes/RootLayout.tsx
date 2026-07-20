import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BootIntro from "../components/BootIntro";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, [pathname]);

    return null;
}

export default function RootLayout() {
    return (
        <>
            <BootIntro />
            <Header />
            <ScrollToTop />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ChatWidget />
        </>
    );
}
