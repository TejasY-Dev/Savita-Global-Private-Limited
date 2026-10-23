interface Props {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image?: string;
}

export default function PageHeader({ eyebrow, title, intro, image }: Props) {
  return (
    <section className="page-hero relative isolate overflow-hidden bg-forest-deep text-cream">
      {image && (
        <div
          className="page-hero__image absolute inset-0"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      <div className="page-hero__shade absolute inset-0" aria-hidden="true" />
      <div className="page-hero__ornament page-hero__ornament--one" aria-hidden="true" />
      <div className="page-hero__ornament page-hero__ornament--two" aria-hidden="true" />
      <div className="page-hero__grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-10 lg:py-32">
        <p className="leaf-divider page-hero__eyebrow !text-saffron mb-5">{eyebrow}</p>
        <h1 className="page-hero__title font-display max-w-4xl text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-7xl">{title}</h1>
        {intro && <p className="page-hero__intro mt-6 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">{intro}</p>}
        <div className="page-hero__rule mt-9" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
