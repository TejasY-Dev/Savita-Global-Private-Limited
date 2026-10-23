interface Item {
  name: string;
  image?: string;
  imageAlt?: string;
  form?: string;
  moisture?: string;
  packing?: string;
  note?: string;
}

interface CatalogGridProps {
  items: Item[];
  accent?: 'saffron' | 'terra' | 'forest';
}

export default function CatalogGrid({
  items,
  accent = 'saffron',
}: CatalogGridProps) {
  const accentClass =
    accent === 'terra'
      ? 'text-terra'
      : accent === 'forest'
        ? 'text-forest'
        : 'text-saffron-dark';

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.name}
          className="group overflow-hidden rounded-2xl border border-forest/10 bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg"
        >
          {item.image && (
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark/50">
              <img
                src={item.image}
                alt={item.imageAlt || `${item.name} product illustration`}
                loading="lazy"
                decoding="async"
                width="640"
                height="420"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
              />
              <span className="absolute bottom-3 left-3 rounded-full border border-white/70 bg-cream/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-forest-deep backdrop-blur">
                Illustrative image
              </span>
            </div>
          )}

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold leading-tight text-forest-deep">
                {item.name}
              </h3>
              <span className={`shrink-0 text-[10px] font-semibold tracking-widest ${accentClass}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <dl className="mt-3 space-y-2 text-[13px]">
              {item.form && (
                <div className="flex items-start justify-between gap-3">
                  <dt className="shrink-0 text-mute">Form</dt>
                  <dd className="text-right text-ink/85">{item.form}</dd>
                </div>
              )}
              {item.moisture && (
                <div className="flex items-start justify-between gap-3">
                  <dt className="shrink-0 text-mute">Moisture</dt>
                  <dd className="text-right text-ink/85">{item.moisture}</dd>
                </div>
              )}
              {item.packing && (
                <div className="flex items-start justify-between gap-3">
                  <dt className="shrink-0 text-mute">Packing</dt>
                  <dd className="text-right text-ink/85">{item.packing}</dd>
                </div>
              )}
            </dl>

            {item.note && (
              <p className="mt-3 border-t border-forest/10 pt-3 text-xs leading-relaxed text-mute">
                {item.note}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
