import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>Page not found — Nuvae</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <section className="scene notfound">
                <div className="wrap">
                    <p className="kicker">404</p>
                    <h1 className="h-big">That page doesn't exist.</h1>
                    <p className="sub mt-30">
                        Check the address, or head back to the homepage.
                    </p>
                    <Link className="btn-big" to="/">
                        Back to home
                    </Link>
                </div>
            </section>
        </>
    );
}
