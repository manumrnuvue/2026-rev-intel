import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidePage from "../../../src/views/GuidePage";
import { GUIDES, getGuide } from "../../../src/content/guides";

export const dynamicParams = false;

export function generateStaticParams() {
    return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const guide = getGuide((await params).slug);
    if (!guide) return {};
    const url = `https://nuvae.ai/guides/${guide.slug}`;
    return {
        title: guide.metaTitle,
        description: guide.description,
        alternates: { canonical: url },
        openGraph: { type: "article", title: guide.metaTitle, description: guide.description, url },
        twitter: { title: guide.metaTitle, description: guide.description },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const guide = getGuide((await params).slug);
    if (!guide) notFound();
    return <GuidePage guide={guide} />;
}
