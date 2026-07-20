import { Link } from "react-router-dom";
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
                        <Link to="/product">Product</Link>
                        <Link to="/solutions">Solutions</Link>
                        <Link to="/roi">ROI</Link>
                        <Link to="/pricing">Pricing</Link>
                    </div>
                    <div className="foot-col">
                        <Link to="/customers">Customers</Link>
                        <Link to="/resources">Resources</Link>
                        <Link to="/about">About us</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="foot-col">
                        <Link to="/trust-center">Trust Center</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <div className="wrap foot-legal">
                HIPAA compliant · SOC 2 Type II certified · BAA available on request
            </div>
        </footer>
    );
}
