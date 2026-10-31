import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Globe2,
  Leaf,
  PackageCheck,
  Ship,
  Shirt,
  Sprout,
} from 'lucide-react';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import HomeHero from '../components/HomeHero';
import SourcingDisclosure from '../components/SourcingDisclosure';

const categories = [
  {
    to: '/dehydrated-vegetables',
    label: 'Dehydrated Vegetables',
    kicker: 'Food ingredients',
    img: `${import.meta.env.BASE_URL}dehydrated-vegetables.jpg`,
    desc: 'Onion, garlic, tomato and other vegetable formats explored to match your specification.',
    number: '01',
  },
  {
    to: '/dehydrated-fruits',
    label: 'Fruit Ingredients & Products',
    kicker: 'Fruit ingredients',
    img: `${import.meta.env.BASE_URL}dehydrated-fruits.jpg`,
    desc: 'Fruit-based ingredients and product formats, sourced according to requirement and availability.',
    number: '02',
  },
  {
    to: '/value-added-snacks',
    label: 'Value-Added Snacks',
    kicker: 'Ready-to-enjoy',
    img: `${import.meta.env.BASE_URL}value-added-snacks.jpg`,
    desc: 'Explore Indian snack and fruit or vegetable snack options with supplier details confirmed by enquiry.',
    number: '03',
  },
  {
    to: '/bulk-food-ingredients',
    label: 'Bulk Food Ingredients',
    kicker: 'Bulk supply',
    img: `${import.meta.env.BASE_URL}bulk-food-ingredients.jpg`,
    desc: 'Discuss product grade, particle size, packing, quantity and destination for bulk requirements.',
    number: '04',
  },
  {
    to: '/export-supply',
    label: 'Export Supply Services',
    kicker: 'Trade coordination',
    img: `${import.meta.env.BASE_URL}export-supply.jpg`,
    desc: 'A coordinated enquiry process for quotations, supplier communication and shipment planning.',
    number: '05',
  },
  {
    to: '/towels-napkins',
    label: 'Towels & Napkins',
    kicker: 'Home textiles',
    img: `${import.meta.env.BASE_URL}towels-napkins.jpg`,
    desc: 'Source towel and napkin options by fabric, GSM, dimensions, colour, finish and order quantity.',
    number: '06',
  },
];

const principles = [
  {
    icon: ClipboardCheck,
    title: 'Specification-led enquiries',
    text: 'We start with the product form, quality parameters, quantity, packing and destination you need.',
  },
  {
    icon: Boxes,
    title: 'Sourcing with clarity',
    text: 'Supplier availability, commercial terms and technical details are checked before they are represented as confirmed.',
  },
  {
    icon: FileCheck2,
    title: 'Documentation awareness',
    text: 'Product and export documents are discussed against the product, destination market and order requirements.',
  },
  {
    icon: Globe2,
    title: 'Domestic & export focus',
    text: 'Enquiries can be planned for Indian buyers and international markets, based on the product and agreed terms.',
  },
];

const applications = [
  {
    icon: Factory,
    title: 'Food brands & processors',
    text: 'Dehydrated ingredients and bulk food products for recipes, blends and processing needs.',
  },
  {
    icon: Sprout,
    title: 'Snacks & seasoning',
    text: 'Ingredient and snack sourcing options for product development and commercial buying.',
  },
  {
    icon: Ship,
    title: 'Importers & distributors',
    text: 'Structured product enquiries with quantity, packaging and destination details in one place.',
  },
  {
    icon: Shirt,
    title: 'Home textile buyers',
    text: 'Towels and napkins evaluated around fabric, GSM, dimensions, colour and finishing requirements.',
  },
];

const enquirySteps = [
  ['01', 'Share your requirement', 'Tell us the product, expected quantity, application and delivery destination.'],
  ['02', 'Align the specification', 'Discuss format, grade, material, packaging and any sample or document requirements.'],
  ['03', 'Review supply options', 'Supplier availability, quotation details and practical order conditions are confirmed.'],
  ['04', 'Plan the order', 'Agree next steps for packing, documentation, payment terms and shipment or delivery.'],
];

const buyerGuides = [
  {
    title: 'How to prepare a dehydrated onion enquiry',
    type: 'Food ingredients',
    text: 'A practical checklist for flakes, granules or powder: cut or mesh, moisture, packing and quantity.',
    to: '/buyer-guides',
  },
  {
    title: 'What to specify when sourcing towels',
    type: 'Home textiles',
    text: 'Record fabric composition, GSM, size, colour, edge finishing, packing and order quantity.',
    to: '/buyer-guides',
  },
  {
    title: 'A buyer’s guide to export enquiries',
    type: 'Trade essentials',
    text: 'The product, destination, quantity and required documents that help make quotations more useful.',
    to: '/export-process',
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <section className="sg-quickstrip" aria-label="Savita Global sourcing principles">
        <div className="sg-quickstrip__track" aria-hidden="true">
          {[0, 1].map((loop) => (
            <div className="sg-quickstrip__group" key={loop}>
              <span><Leaf size={15} /> Quality from India. Trusted Worldwide.</span>
              <i />
              <span><PackageCheck size={15} /> Product details confirmed by enquiry</span>
              <i />
              <span><Globe2 size={15} /> Domestic & export supply enquiries</span>
              <i />
              <span><Shirt size={15} /> Food products and home textiles</span>
              <i />
            </div>
          ))}
        </div>
      </section>

      {/* Product categories */}
      <section className="sg-section sg-categories" id="categories">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <ScrollReveal className="sg-section-heading">
            <div>
              <p className="leaf-divider mb-4">Explore Savita Global</p>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] text-forest-deep sm:text-5xl lg:text-6xl">
                Products for your <span className="italic text-saffron-dark">next opportunity.</span>
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-ink/65">
              Browse the product categories we are prepared to discuss with business buyers. Listings are enquiry-led; specifications, source, availability, pricing, packing and documentation are confirmed for each requirement before an order is agreed.
            </p>
          </ScrollReveal>

          <div className="sg-category-grid">
            {categories.map((category, index) => (
              <ScrollReveal key={category.to} delay={index * 55} className="h-full">
                <Link to={category.to} className={`sg-category-card sg-category-card--${index + 1} group`}>
                  <div className="sg-category-card__image">
                    <img src={category.img} alt={`Representative image for ${category.label.toLowerCase()}` } loading={index < 3 ? 'eager' : 'lazy'} />
                    <span className="sg-category-card__number">{category.number}</span>
                    <span className="sg-category-card__arrow" aria-hidden="true"><ArrowDownRight size={21} /></span>
                    <span className="sg-category-card__image-shade" />
                  </div>
                  <div className="sg-category-card__content">
                    <p className="sg-overline">{category.kicker}</p>
                    <h3 className="font-display text-2xl font-semibold text-forest-deep">{category.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{category.desc}</p>
                    <span className="sg-text-link mt-5">Explore category <ArrowRight size={15} /></span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/contact" className="sg-outline-button">Have a specific product in mind? <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <SourcingDisclosure />

      {/* Quality promise / about */}
      <section className="sg-quality-section">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
          <ScrollReveal className="sg-quality-visual lg:col-span-6">
            <img src={`${import.meta.env.BASE_URL}quality.jpg`} alt="Representative image illustrating a product quality review; not a photograph of a Savita Global laboratory" loading="lazy" />
            <div className="sg-quality-stamp">
              <span className="sg-quality-stamp__icon"><BadgeCheck size={23} /></span>
              <span><strong>Details matter.</strong><small>Agreed specifications. Clear communication.</small></span>
            </div>
            <span className="sg-quality-visual__label">Representative image · not a Savita-owned lab</span>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-6" delay={100}>
            <p className="leaf-divider mb-5">Quality is a process</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.04] text-forest-deep sm:text-5xl lg:text-6xl">
              Good supply starts with <span className="italic text-saffron-dark">the right questions.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">
              At Savita Global, we believe reliable trade begins with clear requirements and transparent communication. We work to align the buyer’s specification with supplier information before product, price, packaging or delivery details are treated as final.
            </p>
            <div className="sg-quality-points mt-7">
              {[
                'Product form, grade and key specifications',
                'Packing, labelling and order quantity',
                'Supplier information and available documents',
                'Destination-specific export requirements',
              ].map((point) => (
                <div key={point}><CheckCircle2 size={18} /><span>{point}</span></div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/quality-system" className="sg-solid-button">Our quality approach <ArrowRight size={17} /></Link>
              <Link to="/about" className="sg-outline-button">About Savita Global</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Savita */}
      <section className="sg-section sg-approach">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <ScrollReveal className="mx-auto mb-14 max-w-3xl text-center">
            <p className="leaf-divider mb-4">Why work with us</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.08] text-forest-deep sm:text-5xl lg:text-6xl">
              A more considered way to <span className="italic text-saffron-dark">source from India.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-ink/65">
              We bring the details of your enquiry into focus so that buyers and suppliers can discuss the same requirement with fewer gaps.
            </p>
          </ScrollReveal>

          <div className="sg-principle-grid">
            {principles.map(({ icon: Icon, title, text }, index) => (
              <ScrollReveal key={title} delay={index * 60} className="sg-principle-card">
                <span className="sg-principle-card__icon"><Icon size={23} strokeWidth={1.7} /></span>
                <span className="sg-principle-card__index">0{index + 1}</span>
                <h3 className="font-display text-2xl font-semibold text-forest-deep">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application and buyer sectors */}
      <section className="sg-applications">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-24">
          <ScrollReveal className="lg:col-span-4">
            <p className="leaf-divider mb-5">Where sourcing fits</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.07] text-cream sm:text-5xl">
              Different needs. <span className="italic text-saffron">One clear enquiry.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-cream/70">
              Whether you buy ingredients for production or textiles for resale, a well-defined requirement is the start of a smoother conversation.
            </p>
            <Link to="/contact" className="sg-applications__link mt-8">Tell us what you need <ArrowRight size={17} /></Link>
          </ScrollReveal>
          <div className="sg-application-grid lg:col-span-8">
            {applications.map(({ icon: Icon, title, text }, index) => (
              <ScrollReveal key={title} delay={index * 70} className="sg-application-card">
                <span className="sg-application-card__icon"><Icon size={22} strokeWidth={1.7} /></span>
                <h3 className="font-display text-xl font-semibold text-cream">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="sg-section sg-process">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <ScrollReveal className="sg-section-heading">
            <div>
              <p className="leaf-divider mb-4">The enquiry journey</p>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] text-forest-deep sm:text-5xl lg:text-6xl">
                From brief to <span className="italic text-saffron-dark">next steps.</span>
              </h2>
            </div>
            <p className="max-w-lg leading-relaxed text-ink/65">
              Every product and destination has its own requirements. This is the typical sequence we use to structure a B2B sourcing conversation.
            </p>
          </ScrollReveal>
          <div className="sg-process-grid">
            {enquirySteps.map(([number, title, text], index) => (
              <ScrollReveal key={number} delay={index * 70} className="sg-process-step">
                <span className="sg-process-step__number">{number}</span>
                <span className="sg-process-step__line" />
                <h3 className="font-display text-2xl font-semibold text-forest-deep">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{text}</p>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/export-process" className="sg-text-link sg-text-link--large">Read the sourcing & export process <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      {/* Buyer guides - editorial cards instead of fabricated news */}
      <section className="sg-insights">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="sg-section-heading">
            <div>
              <p className="leaf-divider mb-4">Buyer resources</p>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] text-forest-deep sm:text-5xl lg:text-6xl">
                Better enquiries begin <span className="italic text-saffron-dark">with clarity.</span>
              </h2>
            </div>
            <Link to="/buyer-guides" className="sg-text-link">All buyer guides <ArrowRight size={16} /></Link>
          </ScrollReveal>
          <div className="sg-insight-grid">
            {buyerGuides.map((guide, index) => (
              <ScrollReveal key={guide.title} delay={index * 65}>
                <Link to={guide.to} className="sg-insight-card group">
                  <div className="sg-insight-card__top">
                    <span>{guide.type}</span>
                    <ArrowDownRight size={21} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-forest-deep">{guide.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">{guide.text}</p>
                  <span className="sg-text-link mt-6">Read guidance <ArrowRight size={15} /></span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* No made-up metrics, awards, certifications, or customer logos. */}
      <div className="sg-final-cta-wrap">
        <div className="mx-auto max-w-7xl px-5 lg:px-10"><CTA /></div>
      </div>
    </>
  );
}
