"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <section className="scene notfound">
                <div className="wrap">
                    <p className="kicker">404</p>
                    <h1 className="h-big">That page doesn't exist.</h1>
                    <p className="sub mt-30">
                        Check the address, or head back to the homepage.
                    </p>
                    <Link className="btn-big" href="/">
                        Back to home
                    </Link>
                </div>
            </section>
        </>
    );
}
