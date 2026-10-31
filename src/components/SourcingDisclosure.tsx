import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, SearchCheck, FileCheck2 } from 'lucide-react';

const stages = [
  {
    icon: ClipboardList,
    title: 'You define the requirement',
    text: 'Share the product, intended use, target specification, quantity, packaging and delivery destination.',
  },
  {
    icon: SearchCheck,
    title: 'We assess a supply route',
    text: 'We discuss potential supplier options and check which product details, commercial terms and documents can actually be confirmed.',
  },
  {
    icon: FileCheck2,
    title: 'You review before commitment',
    text: 'The offer should state the agreed specification, source details that can be disclosed, packing, quantity, documents, price and delivery terms.',
  },
];

export default function SourcingDisclosure() {
  return (
    <section className="bg-[#f0eadc] py-16 lg:py-20" aria-labelledby="sourcing-model-title">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="leaf-divider mb-4">A transparent note for buyers</p>
            <h2 id="sourcing-model-title" className="font-display text-3xl font-semibold leading-tight text-forest-deep sm:text-4xl">
              Know exactly what you are enquiring about.
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              Savita Global is an India-based sourcing and supply business. Our website is an enquiry catalogue, not a live stock list. We do not claim that every product shown is manufactured in a Savita-owned factory or held in our inventory.
            </p>
            <p className="mt-4 leading-relaxed text-ink/75">
              Product availability, supplier or manufacturing source, country of origin, technical specification, minimum order, samples, testing documents and delivery terms are checked for the specific requirement. Details that cannot be confirmed should not be treated as part of an offer.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/about" className="sg-solid-button">How our business works <ArrowRight size={16} /></Link>
              <Link to="/contact" className="sg-outline-button">Discuss a requirement</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stages.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="rounded-2xl border border-forest/10 bg-white/75 p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-saffron"><Icon size={20} /></span>
                  <span className="font-display text-sm font-semibold tracking-widest text-saffron-dark">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-forest-deep">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
        <p className="mt-8 border-t border-forest/10 pt-5 text-xs leading-relaxed text-ink/60">
          Catalogue images are representative illustrations or category photography. They are not presented as photographs of Savita Global inventory, supplier premises or a company-owned processing facility.
        </p>
      </div>
    </section>
  );
}
