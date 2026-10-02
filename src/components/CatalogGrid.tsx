interface Item {
  name: string;
  form?: string;
  moisture?: string;
  packing?: string;
  note?: string;
}

export default function CatalogGrid({ items, accent = 'saffron' }: { items: Item[]; accent?: 'saffron' | 'terra' | 'forest' }) {
  const accentClass = accent === 'terra' ? 'text-terra' : accent === 'forest' ? 'text-forest' : 'text-saffron-dark';
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <div key={i} className="bg-cream border border-forest/10 rounded-2xl p-5 hover:border-forest/30 hover:-translate-y-0.5 transition-all">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-forest-deep leading-tight">{it.name}</h3>
            <span className={`text-[10px] font-semibold tracking-widest uppercase ${accentClass}`}>#{String(i+1).padStart(2,'0')}</span>
          </div>
          <dl className="mt-3 space-y-1.5 text-[13px]">
            {it.form && <div className="flex justify-between gap-3"><dt className="text-mute">Form</dt><dd className="text-ink/85 text-right">{it.form}</dd></div>}
            {it.moisture && <div className="flex justify-between gap-3"><dt className="text-mute">Moisture</dt><dd className="text-ink/85 text-right">{it.moisture}</dd></div>}
            {it.packing && <div className="flex justify-between gap-3"><dt className="text-mute">Packing</dt><dd className="text-ink/85 text-right">{it.packing}</dd></div>}
          </dl>
          {it.note && <p className="mt-3 pt-3 border-t border-forest/10 text-xs text-mute leading-relaxed">{it.note}</p>}
        </div>
      ))}
    </div>
  );
}
