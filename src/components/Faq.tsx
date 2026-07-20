type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
    return (
        <dl className="faq-list">
            {items.map((item) => (
                <div className="faq-item" key={item.q}>
                    <dt>{item.q}</dt>
                    <dd>{item.a}</dd>
                </div>
            ))}
        </dl>
    );
}
