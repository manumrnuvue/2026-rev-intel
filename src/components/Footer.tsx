"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="wrap">
                <span className="foot-brand">
                    <Logo tone="light" height={17} animated={false} />
                    <span>— revenue protection · © 2026</span>
                </span>
                <div className="cols">
                    <div className="foot-col">
                        <Link href="/product">Product</Link>
                        <Link href="/solutions">Solutions</Link>
                        <Link href="/roi">ROI</Link>
                        <Link href="/pricing">Pricing</Link>
                    </div>
                    <div className="foot-col">
                        <Link href="/customers">Customers</Link>
                        <Link href="/resources">Resources</Link>
                        <Link href="/about">About us</Link>
                        <Link href="/careers">Careers</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                    <div className="foot-col">
                        <Link href="/trust-center">Trust Center</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <div className="wrap foot-legal">
                HIPAA compliant · SOC 2 Type II certified · BAA available on request
            </div>
        </footer>
    );
}
