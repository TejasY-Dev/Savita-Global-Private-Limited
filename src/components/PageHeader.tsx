interface Props {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image?: string;
}

export default function PageHeader({ eyebrow, title, intro, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      {image && (
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/80 to-forest-deep/40" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28">
        <p className="leaf-divider !text-saffron mb-5 rise">{eyebrow}</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] max-w-4xl rise rise-2">
          {title}
        </h1>
        {intro && <p className="mt-6 text-lg text-cream/80 max-w-2xl leading-relaxed rise rise-3">{intro}</p>}
      </div>
    </section>
  );
}
