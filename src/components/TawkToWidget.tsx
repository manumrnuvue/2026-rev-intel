"use client";

import Script from "next/script";

const TAWKTO_PROPERTY_ID = "6938fda08465ad197f9bc106";
const TAWKTO_WIDGET_ID = "1jc39tfla";
export default function TawkToWidget() {
    return (
        <>
            {/* Must run before the embed script below so it picks up customStyle on load. */}
            <Script id="tawkto-config" strategy="afterInteractive">
                {`
                    window.Tawk_API = window.Tawk_API || {};
                    Tawk_API.customStyle = {
                        visibility: {
                            desktop: { position: "br", xOffset: 24, yOffset: 24 },
                            mobile: { position: "br", xOffset: 12, yOffset: 12 }
                        }
                    };
                `}
            </Script>
            <Script
                id="tawkto-embed"
                strategy="afterInteractive"
                src={`https://embed.tawk.to/${TAWKTO_PROPERTY_ID}/${TAWKTO_WIDGET_ID}`}
                crossOrigin="anonymous"
            />
        </>
    );
}
