import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ClipboardList, PackageCheck, Globe2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';

const enquirySections = [
  {
    number: '01',
    title: 'Dehydrated vegetables & food ingredients',
    summary: 'Give enough detail to identify the product form and compare supplier offers fairly.',
    items: [
      'Product and source ingredient (for example, red onion flakes or garlic granules).',
      'Desired cut size, particle size or mesh, colour and any target technical values you already have.',
      'Intended use, such as seasoning, soup, sauce, ready meal or further food processing.',
      'Quantity per order, preferred packaging, destination country and delivery term if known.',
      'Required documents or tests. State which are mandatory and which are preferred.',
    ],
  },
  {
    number: '02',
    title: 'Fruit products & value-added snacks',
    summary: 'Product names can cover different processing methods, recipes and intended uses—make those differences explicit.',
    items: [
      'Fruit or vegetable variety and product format: slices, powder, chips, pieces or a blend.',
      'For snacks, share whether you need plain, salted, seasoned or another recipe.',
      'Ingredient, allergen, nutrition, shelf-life and packaging requirements for the target market.',
      'Whether the purchase is for industrial use, food service, private label or retail packaging.',
      'Target quantity, destination and any sample/evaluation requirements to discuss with the supplier.',
    ],
  },
  {
    number: '03',
    title: 'Towels, napkins & kitchen textiles',
    summary: 'Fabric and construction details help prevent offers for unlike products being compared as if they were equivalent.',
    items: [
      'Fabric composition (for example, cotton or a specified blend) and weave/construction.',
      'GSM, finished dimensions, colour, pattern, stitching and finishing requirements.',
      'Use case: kitchen towel, tea towel, glass cloth, dinner napkin, apron or placemat.',
      'Pack configuration, labels, barcodes, hangtags or retail packaging if required.',
      'Target quantity, size/colour split, destination and any testing or certification requirements.',
    ],
  },
];

export default function BuyerGuides() {
  return (
    <>
      <PageHeader
        eyebrow="Practical B2B Resources"
        title={<>Better enquiries. <span className="italic text-saffron">Clearer quotations.</span></>}
        intro="Use these checklists to prepare a product enquiry for Indian food ingredients, value-added snacks, towels and napkins. They are general buyer guides—not product specifications or a confirmation of stock. Final details must be agreed with the relevant supplier."
        image={`${import.meta.env.BASE_URL}export-supply.jpg`}
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-3 lg:px-10">
        {[
          { icon: ClipboardList, title: 'Describe the product', text: 'Use the product name, form, grade or construction. Attach a specification sheet or reference photo if you have one.' },
          { icon: PackageCheck, title: 'Define the commercial need', text: 'Specify quantity, packing, destination, preferred delivery term and whether the requirement is one-time or recurring.' },
          { icon: Globe2, title: 'Confirm market requirements', text: 'List mandatory documents, labels, tests and destination rules. Confirm responsibility and availability before placing an order.' },
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-2xl border border-forest/10 bg-cream p-6">
            <Icon size={27} className="text-saffron-dark" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold text-forest-deep">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-5 pb-16 lg:px-10">
        {enquirySections.map((section) => (
          <article key={section.number} className="overflow-hidden rounded-3xl border border-forest/10 bg-white/50">
            <div className="grid gap-5 border-b border-forest/10 bg-cream-dark/40 p-6 sm:grid-cols-[auto_1fr] sm:items-start lg:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-lg font-semibold text-saffron">{section.number}</div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-forest-deep">{section.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink/70">{section.summary}</p>
              </div>
            </div>
            <ul className="grid gap-3 p-6 sm:grid-cols-2 lg:p-8">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-cream p-4 text-sm leading-relaxed text-ink/75">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 lg:px-10">
        <div className="rounded-3xl border border-forest/10 bg-cream-dark/45 p-6 lg:p-9">
          <p className="leaf-divider mb-3">Request for quotation template</p>
          <h2 className="font-display text-2xl font-semibold text-forest-deep">What to include in your first message</h2>
          <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl border border-forest/10 bg-white/70 p-5 font-sans text-sm leading-relaxed text-ink/80">{`Company:
Product / product form:
Target specification or reference sheet:
Intended application:
Quantity and order frequency:
Preferred packing / labelling:
Destination country and delivery term:
Required documents / tests:
Target date and any other notes:`}</pre>
          <p className="mt-4 text-xs leading-relaxed text-ink/60">You can leave unknown technical fields blank and ask what information is needed. Do not treat example specifications on this website as a confirmed offer.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-cream hover:bg-forest-dark">Send a B2B enquiry <ArrowRight size={17} /></Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
