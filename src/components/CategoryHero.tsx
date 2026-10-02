import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image: string;
  highlights: { label: string; value: string }[];
}

export default function CategoryHero({ eyebrow, title, intro, image, highlights }: Props) {
  return (
    <section className="relative bg-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <p className="leaf-divider mb-5">{eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-forest-deep leading-[1.05]">{title}</h1>
          <p className="mt-6 text-lg text-ink/75 leading-relaxed max-w-xl">{intro}</p>

          <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            {highlights.map((h, i) => (
              <div key={i} className="border-l-2 border-saffron pl-3">
                <dt className="text-[10px] uppercase tracking-widest text-mute font-semibold">{h.label}</dt>
                <dd className="font-display text-lg text-forest-deep font-semibold mt-0.5">{h.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-forest text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-forest-dark">
              Request Catalogue <ArrowRight size={16} />
            </Link>
            <Link to="/quality-system" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-forest-deep border border-forest/20 hover:bg-forest/5">
              Quality Standards
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -inset-3 bg-saffron/20 rounded-3xl -rotate-2" />
            <div className="absolute -inset-3 bg-forest/10 rounded-3xl rotate-1" />
            <img src={image} alt={eyebrow} className="relative rounded-3xl w-full aspect-[4/3] object-cover shadow-xl" />
            <div className="absolute -bottom-5 -left-5 bg-cream border border-forest/10 rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-[10px] uppercase tracking-widest text-mute font-semibold">Origin</p>
              <p className="font-display text-forest-deep font-semibold">Made in India 🇮🇳</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
