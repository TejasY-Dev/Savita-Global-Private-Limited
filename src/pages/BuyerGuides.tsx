import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, PackageCheck, Globe2, Scale, FlaskConical, SearchCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';

const quickChecks = [
  {
    icon: ClipboardList,
    title: 'Describe the product precisely',
    text: 'Use a product name plus its form, grade, cut, mesh, recipe or textile construction. Attach your own specification if you have one.',
  },
  {
    icon: PackageCheck,
    title: 'Define the commercial lot',
    text: 'State quantity, packaging, labelling, destination, delivery term and whether the requirement is a trial order or recurring purchase.',
  },
  {
    icon: Globe2,
    title: 'Check destination requirements',
    text: 'Identify documents, tests, labels, import conditions and delivery responsibilities before committing to a purchase.',
  },
];

function GuideSection({ id, title, intro, points, buyerTip }: {
  id: string;
  title: string;
  intro: string;
  points: { heading: string; body: string }[];
  buyerTip: string;
}) {
  return (
    <article id={id} className="scroll-mt-28 overflow-hidden rounded-3xl border border-forest/10 bg-white/75">
      <div className="border-b border-forest/10 bg-cream-dark/45 p-6 lg:p-8">
        <p className="leaf-divider mb-3">Practical buyer guide</p>
        <h2 className="font-display text-2xl font-semibold text-forest-deep lg:text-3xl">{title}</h2>
        <p className="mt-3 max-w-4xl leading-relaxed text-ink/70">{intro}</p>
      </div>
      <div className="grid gap-5 p-6 md:grid-cols-2 lg:p-8">
        {points.map((point) => (
          <section key={point.heading} className="rounded-2xl border border-forest/10 bg-cream/70 p-5">
            <h3 className="font-display text-lg font-semibold text-forest-deep">{point.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{point.body}</p>
          </section>
        ))}
      </div>
      <div className="border-t border-forest/10 bg-forest/5 px-6 py-5 text-sm leading-relaxed text-ink/75 lg:px-8">
        <strong className="text-forest-deep">Buyer tip: </strong>{buyerTip}
      </div>
    </article>
  );
}

export default function BuyerGuides() {
  return (
    <>
      <PageHeader
        eyebrow="Savita Global · Practical B2B Resources"
        title={<>Buy with clarity. <span className="italic text-saffron">Specify before you compare.</span></>}
        intro="A useful quotation starts with a useful brief. These guides explain which details buyers should define for dehydrated vegetables, fruit products, spices, snacks and home textiles—and which details should be confirmed in writing before an order."
        image={`${import.meta.env.BASE_URL}export-supply.jpg`}
      />

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 lg:grid-cols-3 lg:px-10">
        {quickChecks.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-2xl border border-forest/10 bg-cream p-6">
            <Icon size={26} className="text-saffron-dark" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold text-forest-deep">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-5 pb-16 lg:px-10">
        <GuideSection
          id="dehydrated-vegetables"
          title="How to write a dehydrated onion or vegetable specification"
          intro="“Onion powder” or “onion flakes” is only the beginning of a specification. Different production methods, raw material lots, cut sizes and handling conditions can create products that look similar in a catalogue but behave differently in a food plant. Define the use first, then write the acceptance criteria."
          points={[
            { heading: '1. Choose the physical form', body: 'For flakes or kibbled pieces, specify the target cut-size range and how oversize or fines will be handled. For granules and powder, specify particle-size distribution or mesh method, not just the word “fine”. State whether the product is intended to be visible in a finished recipe or dispersed through a blend.' },
            { heading: '2. Define functional quality', body: 'Consider colour, aroma, flavour, rehydration behaviour, flow and bulk density where those properties matter to your process. Agree moisture and, where relevant, water activity as separate parameters: moisture is total water content, while water activity relates to water available for microbial or chemical activity.' },
            { heading: '3. List safety and purity checks', body: 'State the microbiological criteria, foreign-matter limits, contaminant or residue tests and any treatment-related declarations required by your product standard or destination. Sulphur dioxide or other additive declarations should be addressed when relevant to the process and buyer requirement.' },
            { heading: '4. Match packaging to storage', body: 'Specify net weight per pack, inner liner, outer carton or bag, sealing method, palletisation and label details. Ask for the proposed shelf life, storage conditions and supporting basis; do not assume the shelf life from another supplier or product.' },
          ]}
          buyerTip="For an onion enquiry, identify whether you need flakes, granules or powder, the particle-size target, application, quantity, packaging and destination. Ask the supplier to return a completed specification sheet with test methods and tolerances—not only a product name."
        />

        <GuideSection
          id="fruit-products"
          title="What to confirm for dried fruit, fruit powders and fruit snacks"
          intro="Fruit products can differ by raw material variety, ripeness, preparation, drying or frying method, added ingredients and final moisture characteristics. “Dried”, “powder” and “chips” do not describe the same process or the same ingredient declaration."
          points={[
            { heading: 'Raw material and preparation', body: 'Name the fruit and, where important, variety, origin, maturity or permitted raw-material range. For slices or pieces, state thickness, dimensions, peel or seed expectations, colour and acceptable variation.' },
            { heading: 'Process and ingredient declaration', body: 'Ask whether the item is dried, freeze-dried, fried, candied, sweetened or otherwise processed. Request the complete ingredient list, including oil, sugar, salt, acidity regulators, preservatives, carriers and processing aids where applicable.' },
            { heading: 'Allergens and cross-contact', body: 'List allergens relevant to your market and ask the supplier for its documented allergen and cross-contact information. Do not rely on a generic “allergen-free” statement without product-specific evidence.' },
            { heading: 'Shelf life and pack protection', body: 'Agree the shelf-life period, storage temperature and humidity conditions, pack size and packaging barrier requirements. Ask what evidence supports the stated shelf life and how the batch or lot is identified.' },
          ]}
          buyerTip="For a fruit snack, request a sample and a matching ingredient/specification sheet. Compare the actual taste, texture, colour, breakage and pack condition against the written criteria; record which sample and lot were approved."
        />

        <GuideSection
          id="spices"
          title="How bulk spice buyers can compare supplier offers"
          intro="A price comparison is meaningful only when the offers describe the same spice form, grade, purity and tests. Whole spices and ground spices may need different checks, and a parameter that matters for one spice may not be useful for another."
          points={[
            { heading: 'Whole spice or powder', body: 'Specify whole, split, crushed, stemless or ground form. For powders, agree particle size and whether the product is pure spice or contains any permitted carrier or additive. For whole spices, state size or grade definitions and visible defect tolerances.' },
            { heading: 'Identity and performance', body: 'Use the parameters relevant to the spice and end use. Examples include colour value for chilli or turmeric, pungency where required, curcumin for turmeric, and volatile-oil characteristics for certain spices. State the required method and test basis instead of assuming every supplier uses the same method.' },
            { heading: 'Cleanliness and food safety', body: 'Discuss foreign matter, damaged or immature material, infestation, moisture, microbiological criteria, pesticide residues, mycotoxins or other contaminants where applicable. The relevant limits and test panel must come from the buyer specification and destination rules.' },
            { heading: 'Sample and lot consistency', body: 'Ask for a representative sample, lot identification and available test report. Confirm whether the sample is from the proposed supply lot or only a reference sample, and agree what happens if the delivered lot does not meet the approved specification.' },
          ]}
          buyerTip="When two spice quotations differ, compare the grade definition, test method, result date, lot reference, packing and included documents—not just the per-kilogram price."
        />

        <GuideSection
          id="textiles"
          title="A practical specification for towels and napkins"
          intro="Textile products that look alike can differ in fibre composition, yarn, weave, finished weight, size, absorbency, colourfastness and stitching. A clear textile specification helps prevent a low-price sample from being compared with a heavier or better-finished product."
          points={[
            { heading: 'Fibre and construction', body: 'Specify 100% cotton or the exact permitted blend, yarn or fabric construction, weave (for example terry, waffle or herringbone), pile characteristics and any required certification. Do not use “cotton feel” as a fibre-content specification.' },
            { heading: 'GSM and finished dimensions', body: 'GSM means grams per square metre. It can be calculated from a fabric sample by dividing its mass in grams by its area in square metres. For example, a 10 cm × 10 cm sample has an area of 0.01 m²; if it weighs 0.8 g, its calculated areal density is 80 GSM. State the agreed tolerance and whether the test is before or after finishing.' },
            { heading: 'Performance and workmanship', body: 'State the intended use and required absorbency, colourfastness, shrinkage, dimensional tolerance, seam strength, hemming, edge finish, hanging loop or embroidery. For glass cloths, define the lint or polishing performance you expect and how it will be evaluated.' },
            { heading: 'Colour, packing and inspection', body: 'Identify colour references, print artwork, size and colour breakdown, label and barcode instructions, fold method, pack count and carton markings. Approve a pre-production or reference sample and define inspection criteria before bulk production.' },
          ]}
          buyerTip="For towels, include fibre composition, weave, GSM, finished size, colour, finishing, pack configuration and a physical reference sample. Confirm whether tolerances apply to the finished and laundered product."
        />
      </section>

      <section className="bg-cream-dark/45 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-3xl">
            <p className="leaf-divider mb-3">Before placing an order</p>
            <h2 className="font-display text-3xl font-semibold text-forest-deep lg:text-4xl">A sample is not the whole contract.</h2>
            <p className="mt-4 leading-relaxed text-ink/70">A sample helps assess product fit, but the commercial order should be controlled by a written specification and agreed inspection method. Record the sample date, supplier or source reference, product lot (if known), agreed changes and approval status. Confirm how the final lot will be sampled and what happens if it falls outside the accepted tolerance.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: SearchCheck, title: 'Identify the sample', text: 'Record who supplied it, the date received, the product description and any lot or batch reference.' },
              { icon: FlaskConical, title: 'Evaluate against agreed criteria', text: 'Check sensory and physical properties. Use an appropriate laboratory or inspection provider for tests that cannot be judged visually.' },
              { icon: ClipboardList, title: 'Freeze the approved version', text: 'Keep the signed specification, approved label/artwork, sample reference and order terms together.' },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-forest/10 bg-cream p-6">
                <Icon className="text-saffron-dark" size={24} />
                <h3 className="mt-4 font-display text-xl font-semibold text-forest-deep">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="leaf-divider mb-3">Commercial terms</p>
            <h2 className="font-display text-3xl font-semibold text-forest-deep">Name the place and the rule.</h2>
            <p className="mt-4 leading-relaxed text-ink/70">When using an Incoterm, write the three-letter rule, the named port or place, and the version (for example, “FOB [named port], Incoterms® 2020” only where that rule is appropriate for the transport mode). Incoterms allocate certain delivery obligations, costs and risk between seller and buyer. They do not replace the sales contract or independently settle product quality, payment timing, title transfer or every possible dispute.</p>
            <p className="mt-4 leading-relaxed text-ink/70">Confirm who is responsible for export clearance, import clearance, freight, insurance, loading or unloading, duties and local delivery. The correct term depends on the shipment and the parties' actual capabilities; have the final wording reviewed before contract acceptance.</p>
            <a href="https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-forest hover:underline">Read ICC Incoterms® 2020 guidance <ArrowRight size={16} /></a>
          </div>
          <div className="rounded-3xl bg-forest p-7 text-cream lg:p-8">
            <p className="leaf-divider !text-saffron mb-3">A useful RFQ brief</p>
            <h3 className="font-display text-2xl font-semibold">Copy this into your enquiry</h3>
            <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-cream/15 bg-forest-dark/50 p-5 font-sans text-sm leading-relaxed text-cream/90">{`Company / buyer:
Product and exact form:
Intended application:
Target specification / reference sheet:
Quantity and order frequency:
Packaging and labelling:
Destination city / country:
Preferred delivery term + named place:
Required documents / tests:
Sample or inspection requirement:
Target delivery window:`}</pre>
            <p className="mt-4 text-xs leading-relaxed text-cream/65">Unknown fields can be marked “to be discussed”. Do not leave mandatory technical or regulatory requirements until after the quotation is accepted.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 font-semibold text-forest-deep hover:bg-saffron-light">Send a business enquiry <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-10">
        <div className="rounded-3xl border border-forest/10 bg-white/70 p-6 lg:p-8">
          <div className="flex items-center gap-3"><Scale className="text-saffron-dark" size={24} /><h2 className="font-display text-2xl font-semibold text-forest-deep">Official information sources</h2></div>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink/70">Regulations and documentary requirements depend on the product, exporter, destination and transaction. Use the official authority or a qualified trade professional to confirm current obligations. The links below are starting points, not a statement that Savita Global holds a registration or that a particular certificate is required for every shipment.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'DGFT', detail: 'India’s foreign trade policy, IEC and trade services', href: 'https://dgft.gov.in/' },
              { name: 'APEDA', detail: 'Agricultural and processed food export information', href: 'https://apeda.gov.in/APEDA-FAQ' },
              { name: 'Export Inspection Council', detail: 'Export inspection and certification information', href: 'https://eicindia.gov.in/' },
              { name: 'International Chamber of Commerce', detail: 'Incoterms® rules and official trade-term guidance', href: 'https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/' },
            ].map((source) => (
              <a key={source.name} href={source.href} target="_blank" rel="noreferrer" className="rounded-xl border border-forest/10 bg-cream p-4 transition-colors hover:border-forest/30">
                <span className="font-semibold text-forest-deep">{source.name} ↗</span>
                <span className="mt-2 block text-xs leading-relaxed text-ink/65">{source.detail}</span>
              </a>
            ))}
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-ink/55">Prepared by Savita Global Private Limited as general B2B buying guidance. It is not a product specification, laboratory method, legal opinion or destination-specific compliance confirmation. Buyers should approve requirements in writing with the relevant supplier and qualified advisers.</p>
      </section>

      <CTA />
    </>
  );
}
