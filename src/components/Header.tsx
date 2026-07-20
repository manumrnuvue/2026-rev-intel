import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS: Array<{ to: string; label: string }> = [
    { to: "/product", label: "Product" },
    { to: "/solutions", label: "Solutions" },
    { to: "/roi", label: "ROI" },
    { to: "/pricing", label: "Pricing" },
    { to: "/resources", label: "Resources" },
];

const DARK_UNDER_NAV =
    ".scene.hero, .scene.leak, .scene.stale, .scene.gov, .scene.savings, " +
    ".scene.compare, .scene.cta-scene, .scene.denials, .scene.assistant, " +
    ".scene.claims-scene, .footer";

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const [onDark, setOnDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lastY = useRef(0);
    const { pathname } = useLocation();
    const showDarkGlass = onDark && !menuOpen;

    /* Close the mobile menu on navigation, and lock body scroll while it's open. */
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setHidden(y > 400 && y > lastY.current);
            lastY.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Sample what sits just under the bar and flip to dark glass over dark sections. */
    useEffect(() => {
        let raf = 0;
        const check = () => {
            raf = 0;
            const els = document.elementsFromPoint(window.innerWidth / 2, 64);
            const content = els.find((el) => !el.closest("header.nav"));
            setOnDark(Boolean(content?.closest?.(DARK_UNDER_NAV)));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(check);
        };
        check();
        /* re-check once lazy route content has mounted */
        const settle = window.setTimeout(check, 450);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(settle);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [pathname]);

    const dark = showDarkGlass || menuOpen;

    return (
        <>
            <header className={`nav ${hidden ? "hidden" : ""} ${dark ? "on-dark" : ""} ${menuOpen ? "menu-open" : ""}`}>
                <div className="wrap">
                    <Link className="logo" to="/" aria-label="Nuvae — home">
                        <Logo tone={dark ? "light" : "dark"} height={20} />
                    </Link>
                    {LINKS.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) => `lnk ${isActive ? "active" : ""}`}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <Link className="cta" to="/contact">
                        Book a walkthrough
                    </Link>
                    <button
                        className="nav-burger"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((o) => !o)}
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            <div
                className={`nav-mobile ${menuOpen ? "open" : ""}`}
                aria-hidden={!menuOpen}
                onClick={() => setMenuOpen(false)}
            >
                <nav className="nav-mobile-panel" onClick={(e) => e.stopPropagation()}>
                    {LINKS.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) => `nav-mobile-lnk ${isActive ? "active" : ""}`}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <Link className="btn-big nav-mobile-cta" to="/contact">
                        Book a walkthrough
                    </Link>
                </nav>
            </div>
        </>
    );
}
