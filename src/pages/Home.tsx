import { Link } from 'react-router-dom';
import { ArrowRight, Ship, ShieldCheck, Leaf, Globe2, Boxes, Factory } from 'lucide-react';
import CTA from '../components/CTA';

const categories = [
  { to: '/dehydrated-vegetables', label: 'Dehydrated Vegetables', img: `${import.meta.env.BASE_URL}dehydrated-vegetables.jpg`, desc: 'Onion, garlic, tomato, spinach & more — flakes, powders, granules.' },
  { to: '/dehydrated-fruits', label: 'Dehydrated Fruits', img: `${import.meta.env.BASE_URL}dehydrated-fruits.jpg`, desc: 'Mango, banana, pineapple, coconut — slices, powders, dices.' },
  { to: '/value-added-snacks', label: 'Value-Added Snacks', img: `${import.meta.env.BASE_URL}value-added-snacks.jpg`, desc: 'Namkeen, roasted mixes, extruded snacks — co-pack ready.' },
  { to: '/bulk-food-ingredients', label: 'Bulk Food Ingredients', img: `${import.meta.env.BASE_URL}bulk-food-ingredients.jpg`, desc: 'Pulses, spices, grains, sugar & jaggery in bulk container loads.' },
  { to: '/export-supply', label: 'Export Supply', img: `${import.meta.env.BASE_URL}export-supply.jpg`, desc: 'End-to-end sourcing, palletisation & FCL / LCL logistics.' },
  { to: '/towels-napkins', label: 'Towels & Napkins', img: `${import.meta.env.BASE_URL}towels-napkins.jpg`, desc: 'Cotton kitchen towels, napkins, tea towels — private label ready.' },
];

const stats = [
  { k: '22+', v: 'Countries served' },
  { k: '150+', v: 'SKUs in catalogue' },
  { k: '18,000 MT', v: 'Annual capacity' },
  { k: '99.4%', v: 'On-time despatch' },
];

const partners = ['DUBAI', 'HAMBURG', 'ROTTERDAM', 'SINGAPORE', 'JEBEL ALI', 'NEW YORK', 'FELIXSTOWE', 'MOMBASA', 'DURBAN', 'JAKARTA', 'MANILA', 'SYDNEY'];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
src={`${import.meta.env.BASE_URL}hero-farm.jpg`}
alt="Savita Global Indian farms and agricultural sourcing"
className="w-full h-full object-cover"
/>
  
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/90 to-forest-deep/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-24 pb-32 lg:pt-36 lg:pb-44">
          <p className="leaf-divider !text-saffron mb-6 rise">Savita Global Private Limited</p>
          <h1 className="font-display text-cream text-5xl sm:text-6xl lg:text-8xl font-semibold leading-[.98] max-w-5xl rise rise-2">
  Dehydrated Food &<br />
  <span className="italic text-saffron">Indian Export Products.</span>
</h1>
          <p className="mt-8 text-lg lg:text-xl text-cream/85 max-w-2xl leading-relaxed rise rise-3">
Savita Global Private Limited is an India-based supplier and exporter of dehydrated vegetables, dehydrated fruits, bulk food ingredients, value-added snacks, towels and napkins for domestic and international buyers.          </p>

          <div className="mt-10 flex flex-wrap gap-4 rise rise-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-saffron text-forest-deep px-7 py-3.5 rounded-full font-semibold hover:bg-cream transition-colors">
              Start a B2B Enquiry <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 border border-cream/30 text-cream px-7 py-3.5 rounded-full font-medium hover:bg-cream/10">
              About Savita
            </Link>
          </div>

          {/* <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl rise rise-4">
            {stats.map(s => (
              <div key={s.k}>
                <dt className="font-display text-3xl lg:text-4xl text-saffron font-semibold">{s.k}</dt>
                <dd className="text-xs uppercase tracking-widest text-cream/70 mt-1">{s.v}</dd>
              </div>
            ))}
          </dl> */}
        </div>
      </section>

      {/* PORT TICKER */}
      {/* <div className="bg-forest text-cream/60 py-4 border-y border-cream/10 overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap gap-14 text-sm tracking-[.35em] uppercase">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="flex items-center gap-14">
              <span>{p}</span>
              <span className="text-saffron">✦</span>
            </span>
          ))}
        </div>
      </div> */}

      {/* PROMISE */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <p className="leaf-divider mb-5">Our Promise</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-forest-deep leading-[1.05]">
            The full agri-export stack — <span className="italic text-saffron-dark">under one roof.</span>
          </h2>
          <p className="mt-5 text-ink/70 leading-relaxed">
            Backed by a decade of post-harvest management, Savita Global brings together consultancy, processing, marketing and turnkey execution. We plant our teams close to the field — so what leaves our factory is what our buyers specify, batch after batch.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 mt-6 text-forest-deep font-semibold border-b border-forest-deep pb-1 hover:text-saffron-dark hover:border-saffron-dark">
            Read our story <ArrowRight size={16} />
          </Link>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {[
            { icon: Leaf, title: 'Farm-linked sourcing', text: 'Contract farming across Maharashtra, Karnataka & Gujarat for traceable raw material.' },
            { icon: Factory, title: 'In-house processing', text: 'Belt & tray dryers, IQF lines and grinding — all under FSSAI supervision.' },
            { icon: ShieldCheck, title: 'Assured quality', text: 'HACCP, ISO 22000 and buyer-specific spec sheets validated per batch.' },
            { icon: Ship, title: 'Turnkey logistics', text: 'FCL, LCL and reefer shipments handled with APEDA / IEC compliance.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-cream-dark/50 border border-forest/10 rounded-2xl p-6 hover:bg-cream-dark transition-colors">
              <Icon className="text-saffron-dark" size={26} />
              <h3 className="font-display text-xl text-forest-deep font-semibold mt-4">{title}</h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES CATALOGUE */}
      <section className="bg-cream-dark/40 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="leaf-divider mb-5">Product Catalogue</p>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-forest-deep leading-tight max-w-2xl">Six divisions, one shipping document.</h2>
            </div>
            <p className="text-ink/70 max-w-md">Mix categories inside one FCL and consolidate paperwork. Every SKU ships with COA, phyto and origin certificates.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(c => (
              <Link
                key={c.to}
                to={c.to}
                className="group relative overflow-hidden rounded-2xl bg-cream border border-forest/10 hover:border-forest/30 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
<img
  src={c.img}
  alt={`${c.label} supplier and exporter from India`}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
/>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-forest-deep">{c.label}</h3>
                  <p className="text-sm text-ink/65 mt-2 leading-relaxed">{c.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold uppercase tracking-widest text-saffron-dark">
                    View catalogue <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE SHIP */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
        <img
  src={`${import.meta.env.BASE_URL}world-map.jpg`}
  alt="Savita Global export reach from India to international markets"
  className="rounded-3xl w-full aspect-[4/3] object-cover"
/>            <div className="absolute -bottom-6 -right-6 bg-saffron text-forest-deep p-6 rounded-2xl shadow-xl max-w-[220px]">
              <Globe2 size={22} />
              <p className="font-display text-2xl font-bold mt-2 leading-tight">22 countries, one point of contact.</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="leaf-divider mb-5">Global Reach</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-forest-deep leading-tight">Trade windows across five continents.</h2>
            <p className="mt-5 text-ink/70 leading-relaxed">We work through JNPT (Mumbai), Mundra and Chennai ports — with regular sailings to Gulf, EU, ASEAN, East Africa and North America. Our documentation desk speaks the language of your customs.</p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {['FOB • CFR • CIF • DDP terms', 'Multi-modal reefer options', 'Consolidated LCL from Nhava Sheva', 'Neutral & private-label packing'].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-ink/80">
                  <Boxes size={16} className="text-saffron-dark" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
