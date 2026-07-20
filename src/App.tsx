import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home from "./pages/Home";

const Product = lazy(() => import("./pages/Product"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Roi = lazy(() => import("./pages/Roi"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Customers = lazy(() => import("./pages/Customers"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const TrustCenter = lazy(() => import("./pages/TrustCenter"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Lazy({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={null}>{children}</Suspense>;
}

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route
                    path="product"
                    element={
                        <Lazy>
                            <Product />
                        </Lazy>
                    }
                />
                <Route
                    path="solutions"
                    element={
                        <Lazy>
                            <Solutions />
                        </Lazy>
                    }
                />
                <Route
                    path="roi"
                    element={
                        <Lazy>
                            <Roi />
                        </Lazy>
                    }
                />
                <Route
                    path="pricing"
                    element={
                        <Lazy>
                            <Pricing />
                        </Lazy>
                    }
                />
                
                <Route
                    path="resources"
                    element={
                        <Lazy>
                            <Resources />
                        </Lazy>
                    }
                />
                <Route
                    path="about"
                    element={
                        <Lazy>
                            <About />
                        </Lazy>
                    }
                />
                <Route
                    path="careers"
                    element={
                        <Lazy>
                            <Careers />
                        </Lazy>
                    }
                />
                <Route
                    path="contact"
                    element={
                        <Lazy>
                            <Contact />
                        </Lazy>
                    }
                />
                <Route
                    path="privacy"
                    element={
                        <Lazy>
                            <Privacy />
                        </Lazy>
                    }
                />
                <Route
                    path="terms"
                    element={
                        <Lazy>
                            <Terms />
                        </Lazy>
                    }
                />
                <Route
                    path="trust-center"
                    element={
                        <Lazy>
                            <TrustCenter />
                        </Lazy>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Lazy>
                            <NotFound />
                        </Lazy>
                    }
                />
            </Route>
        </Routes>
    );
}
