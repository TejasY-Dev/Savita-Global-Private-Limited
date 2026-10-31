import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';
import { Building2, ClipboardCheck, Handshake, MapPin, PackageCheck, SearchCheck } from 'lucide-react';

const operatingPrinciples = [
  {
    icon: ClipboardCheck,
    title: 'Start with a clear specification',
    text: 'Product form, grade, intended use, quantity, packaging and destination are discussed before a quotation is treated as comparable or complete.',
  },
  {
    icon: SearchCheck,
    title: 'Confirm the supply route',
    text: 'Potential suppliers, manufacturing source, availability and production lead time are checked for the specific enquiry. A catalogue listing is not a promise of ready stock.',
  },
  {
    icon: PackageCheck,
    title: 'Be specific about documents',
    text: 'Test reports, certificates, origin records and inspection arrangements are discussed only where they apply and can be obtained from the relevant supplier or authority.',
  },
  {
    icon: Handshake,
    title: 'Agree before committing',
    text: 'The buyer and seller should agree the final specification, quantity, price, payment terms, delivery basis and responsibilities in writing.',
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Company profile · Solapur, Maharashtra, India"
        title={<>An India-based sourcing company. <span className="italic text-saffron">Clear about how we work.</span></>}
        intro="Savita Global Private Limited connects business enquiries for selected Indian food products, ingredients and home textiles with potential supply options. Our role is to understand the requirement, discuss the supply route and make sure that key details are confirmed before an order is agreed."
        image={`${import.meta.env.BASE_URL}hero-farm.jpg`}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-20">
        <div>
          <p className="leaf-divider mb-4">Who we are</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-forest-deep lg:text-4xl">A focused business connecting buyers with Indian supply options.</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink/75">
            <p>Savita Global Private Limited is a registered private limited company based in Solapur, Maharashtra, India. The business is being developed around product sourcing and supply enquiries across two distinct areas: food products and home textiles.</p>
            <p>Our food-related categories include dehydrated vegetables, fruit products, value-added snacks and bulk food ingredients. Our textile category includes towels, napkins and selected kitchen-textile products. Each category has different technical, packaging and buyer requirements, so we do not use one generic specification for every product.</p>
            <p><strong>Our operating model is sourcing-led.</strong> We do not represent every item on this website as being manufactured by Savita Global or held in our own warehouse. The catalogue shows product categories for which we welcome enquiries. Whether a particular item can be supplied depends on supplier confirmation, specification, quantity, commercial terms and applicable requirements.</p>
          </div>
        </div>

        <aside className="rounded-3xl bg-forest p-7 text-cream lg:p-8">
          <p className="leaf-divider !text-saffron mb-5">Company information</p>
          <dl className="space-y-4 text-sm">
            {[
              ['Legal name', 'Savita Global Private Limited'],
              ['Corporate Identification Number', 'U10302PN2026PTC259532'],
              ['Business base', 'Solapur, Maharashtra, India'],
              ['Business focus', 'Sourcing and supply coordination'],
              ['Product divisions', 'Food products and home textiles'],
              ['Enquiry channel', 'Business-to-business enquiries'],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-cream/15 pb-3">
                <dt className="text-cream/60">{label}</dt>
                <dd className="mt-1 break-words font-medium text-cream">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-cream/65">The CIN is provided as company identification. Please refer to the relevant government registry for statutory records and current filing details.</p>
        </aside>
      </section>

      <section className="bg-cream-dark/45 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <p className="leaf-divider mb-4">How we work</p>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-forest-deep lg:text-4xl">A sourcing process buyers can question and verify.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {operatingPrinciples.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-forest/10 bg-cream p-6">
                <Icon size={25} className="text-saffron-dark" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-forest-deep">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="leaf-divider mb-4">What buyers can ask us to confirm</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-forest-deep">Information should be available before the order is placed.</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink/75">
              {[
                'Exact product description, grade, cut, mesh, fibre composition or construction, as relevant.',
                'Supplier or manufacturing source and country of origin, to the extent they can be disclosed and documented.',
                'Available quantity, minimum order, packing configuration and realistic lead time.',
                'Applicable test reports, certificates, declarations and inspection options, where available and relevant.',
                'Price basis, named delivery location, payment terms, quotation validity and who handles each shipment responsibility.',
              ].map((item) => <li key={item} className="flex gap-3"><span className="mt-1 text-saffron-dark">◆</span><span>{item}</span></li>)}
            </ul>
          </div>
          <div className="rounded-3xl border border-forest/10 bg-white/70 p-7 lg:p-9">
            <div className="flex items-center gap-3"><Building2 className="text-saffron-dark" size={25} /><p className="leaf-divider">What we do not imply</p></div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-forest-deep">No unsupported factory, stock or certification claims.</h3>
            <p className="mt-4 leading-relaxed text-ink/70">A product category on this site is not proof of current stock, a confirmed supplier, a company-owned production line, a completed export shipment or a particular certification. Documents and claims are specific to the supplier, product, lot, date and destination. They should be checked before being relied on.</p>
            <p className="mt-4 leading-relaxed text-ink/70">We welcome questions about the source, product specification and documents behind a proposed offer. Where a detail is unknown or cannot be verified, it should be stated as such rather than assumed.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a className="inline-flex items-center gap-2 font-semibold text-forest hover:underline" href="mailto:savitaglobalindia@gmail.com">savitaglobalindia@gmail.com <span aria-hidden="true">↗</span></a>
              <a className="inline-flex items-center gap-2 font-semibold text-forest hover:underline" href="tel:+919373569357">+91 9373569357 <span aria-hidden="true">↗</span></a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-ink/55"><MapPin size={14} /> Solapur, Maharashtra, India</p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
