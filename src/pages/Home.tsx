import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Ship,
  ShieldCheck,
  Leaf,
  Globe2,
  Boxes,
  Factory,
} from 'lucide-react';
import CTA from '../components/CTA';

const categories = [
  {
    to: '/dehydrated-vegetables',
    label: 'Dehydrated Vegetables',
    img: `${import.meta.env.BASE_URL}dehydrated-vegetables.jpg`,
    desc: 'Explore onion, garlic, tomato, spinach and other vegetable products in different forms.',
  },
  {
    to: '/dehydrated-fruits',
    label: 'Dehydrated Fruits',
    img: `${import.meta.env.BASE_URL}dehydrated-fruits.jpg`,
    desc: 'Discover fruit product sourcing options, including slices, powders and other formats.',
  },
  {
    to: '/value-added-snacks',
    label: 'Value-Added Snacks',
    img: `${import.meta.env.BASE_URL}value-added-snacks.jpg`,
    desc: 'Explore Indian savoury snacks and value-added food products, subject to availability.',
  },
  {
    to: '/bulk-food-ingredients',
    label: 'Bulk Food Ingredients',
    img: `${import.meta.env.BASE_URL}bulk-food-ingredients.jpg`,
    desc: 'Explore spices and other food ingredients with specifications confirmed by enquiry.',
  },
  {
    to: '/export-supply',
    label: 'Export Supply',
    img: `${import.meta.env.BASE_URL}export-supply.jpg`,
    desc: 'Sourcing, documentation and shipment coordination based on order requirements.',
  },
  {
    to: '/towels-napkins',
    label: 'Towels & Napkins',
    img: `${import.meta.env.BASE_URL}towels-napkins.jpg`,
    desc: 'Explore towel, tea towel and napkin sourcing options with specifications by enquiry.',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}hero-farm.jpg`}
            alt="Indian agriculture and product sourcing"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/90 to-forest-deep/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-24 pb-32 lg:pt-36 lg:pb-44">
          <p className="leaf-divider !text-saffron mb-6 rise">
            Savita Global Private Limited
          </p>

          <h1 className="font-display text-cream text-5xl sm:text-6xl lg:text-8xl font-semibold leading-[.98] max-w-5xl rise rise-2">
            Dehydrated Food &
            <br />
            <span className="italic text-saffron">
              Indian Export Products.
            </span>
          </h1>

          <p className="mt-8 text-lg lg:text-xl text-cream/85 max-w-2xl leading-relaxed rise rise-3">
            Savita Global Private Limited connects domestic and
            international buyers with Indian agricultural products,
            dehydrated vegetables, dehydrated fruits, bulk food
            ingredients, value-added snacks, towels and napkins.
            We focus on buyer requirements, suitable sourcing options
            and clear communication throughout the enquiry process.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 rise rise-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-saffron text-forest-deep px-7 py-3.5 rounded-full font-semibold hover:bg-cream transition-colors"
            >
              Start a B2B Enquiry
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-cream/30 text-cream px-7 py-3.5 rounded-full font-medium hover:bg-cream/10 transition-colors"
            >
              About Savita
            </Link>
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <p className="leaf-divider mb-5">Our Promise</p>

          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-forest-deep leading-[1.05]">
            Indian products —{' '}
            <span className="italic text-saffron-dark">
              global possibilities.
            </span>
          </h2>

          <p className="mt-5 text-ink/70 leading-relaxed">
            Savita Global Private Limited connects domestic and
            international buyers with Indian agricultural products,
            dehydrated food ingredients, value-added snacks, towels
            and napkins. We focus on understanding buyer specifications,
            coordinating suitable sourcing and packaging, and building
            dependable supply relationships.
          </p>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-6 text-forest-deep font-semibold border-b border-forest-deep pb-1 hover:text-saffron-dark hover:border-saffron-dark transition-colors"
          >
            Read our story
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: Leaf,
              title: 'Indian Product Sourcing',
              text: 'Explore agricultural products and sourcing options from Indian suppliers based on buyer requirements.',
            },
            {
              icon: Factory,
              title: 'Product & Packaging Options',
              text: 'Discuss suitable product forms, specifications and food-grade packaging through sourcing and processing partners.',
            },
            {
              icon: ShieldCheck,
              title: 'Quality-Focused Supply',
              text: 'Work toward agreed product specifications, appropriate quality checks and relevant documentation for each order.',
            },
            {
              icon: Ship,
              title: 'Export Coordination',
              text: 'Discuss shipment planning, export documentation and logistics options according to product, destination and applicable requirements.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-cream-dark/50 border border-forest/10 rounded-2xl p-6 hover:bg-cream-dark transition-colors"
            >
              <Icon className="text-saffron-dark" size={26} />

              <h3 className="font-display text-xl text-forest-deep font-semibold mt-4">
                {title}
              </h3>

              <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                {text}
              </p>
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

              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-forest-deep leading-tight max-w-2xl">
                Explore our product categories.
              </h2>
            </div>

            <p className="text-ink/70 max-w-md">
              Explore our range of Indian food products, ingredients,
              snacks, towels and napkins. Product availability,
              specifications, packaging and export documentation are
              confirmed for each enquiry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group relative overflow-hidden rounded-2xl bg-cream border border-forest/10 hover:border-forest/30 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={`${c.label} sourcing options from India`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-forest-deep">
                    {c.label}
                  </h3>

                  <p className="text-sm text-ink/65 mt-2 leading-relaxed">
                    {c.desc}
                  </p>

                  <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold uppercase tracking-widest text-saffron-dark">
                    View catalogue
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL SOURCING & SHIPPING */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <img
              src={`${import.meta.env.BASE_URL}world-map.jpg`}
              alt="India's connection to international markets"
              loading="lazy"
              className="rounded-3xl w-full aspect-[4/3] object-cover"
            />

            <div className="absolute -bottom-6 -right-6 bg-saffron text-forest-deep p-6 rounded-2xl shadow-xl max-w-[240px]">
              <Globe2 size={22} />

              <p className="font-display text-2xl font-bold mt-2 leading-tight">
                Indian products. Global opportunities.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="leaf-divider mb-5">Global Opportunities</p>

            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-forest-deep leading-tight">
              Connecting Indian products with global buyers.
            </h2>

            <p className="mt-5 text-ink/70 leading-relaxed">
              We help domestic and international buyers explore Indian
              product sourcing opportunities. Shipping routes, ports,
              freight options and export documentation are discussed
              according to the product, destination and agreed order
              requirements.
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                'Buyer-specific quotations',
                'Product and packaging discussions',
                'Export documentation coordination',
                'Shipment planning by enquiry',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-ink/80"
                >
                  <Boxes size={16} className="text-saffron-dark shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/export-process"
              className="inline-flex items-center gap-2 mt-8 bg-forest-deep text-cream px-6 py-3 rounded-full font-semibold hover:bg-forest transition-colors"
            >
              Explore our export process
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <CTA />
    </>
  );
}