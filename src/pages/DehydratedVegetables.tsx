import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Red Onion Flakes',
    image: `${import.meta.env.BASE_URL}products/vegetables/red-onion-flakes.jpg`,
    imageAlt: 'Illustration of red onion flakes',
    form: 'Illustrative: Kibbled 5–10 mm',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 10 / 25 kg carton',
  },
  {
    name: 'Onion Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/onion-powder.jpg`,
    imageAlt: 'Illustration of onion powder',
    form: 'Illustrative: Powder 80–100 mesh',
    moisture: 'Indicative: ≤ 5%',
    packing: 'Example: 25 kg PE-lined bag',
  },
  {
    name: 'Dehydrated Cabbage',
    image: `${import.meta.env.BASE_URL}products/vegetables/cabbage.jpg`,
    imageAlt: 'Illustration of dehydrated cabbage',
    form: 'Illustrative: Shredded 2–5 mm',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 25 kg carton',
  },
  {
    name: 'Tomato Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/tomato-powder.jpg`,
    imageAlt: 'Illustration of tomato powder',
    form: 'Illustrative: Spray-dried powder',
    moisture: 'Indicative: ≤ 4%',
    packing: 'Example: 20 kg carton',
  },
  {
    name: 'Tomato Flakes',
    image: `${import.meta.env.BASE_URL}products/vegetables/tomato-flakes.jpg`,
    imageAlt: 'Illustration of dehydrated tomato flakes',
    form: 'Illustrative: Air-dried flakes',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 10 kg carton',
  },
  {
    name: 'Dehydrated Spinach',
    image: `${import.meta.env.BASE_URL}products/vegetables/Dehydrated Spinach.jpg`,
    imageAlt: 'Illustration of dehydrated spinach',
    form: 'Illustrative: Fine powder',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 20 kg carton',
  },
  {
    name: 'Green Chilli Flakes',
    image: `${import.meta.env.BASE_URL}products/vegetables/green-chilli-flakes.jpg`,
    imageAlt: 'Illustration of green chilli flakes',
    form: 'Illustrative: Crushed 3–5 mm',
    moisture: 'Indicative: ≤ 8%',
    packing: 'Example: 10 kg carton',
  },
  {
    name: 'Ginger Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/ginger-powder.jpg`,
    imageAlt: 'Illustration of ginger powder',
    form: 'Illustrative: Powder, 60 mesh',
    moisture: 'Indicative: ≤ 8%',
    packing: 'Example: 25 kg bag',
  },
  {
    name: 'Beetroot Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/beetroot-powder.jpg`,
    imageAlt: 'Illustration of beetroot powder',
    form: 'Illustrative: Fine powder',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 20 kg carton',
  },
];

export default function DehydratedVegetables() {
return (
    <>
      <CategoryHero
        eyebrow="Dehydrated Vegetable Sourcing from India"
        imageAlt="Illustrative assortment of dehydrated vegetable ingredients"
        title={
          <>
            Dehydrated Vegetables
            <span className="italic text-saffron-dark">
              {' '}from India.
            </span>
          </>
        }
        intro="Savita Global Private Limited helps domestic and international buyers explore sourcing options for dehydrated vegetables and vegetable ingredients from India. Our product range includes onion flakes, powders and granules, tomato products and other vegetable ingredients. Product availability, specifications, origin and packaging are confirmed against buyer requirements and supplier capabilities."
        image={`${import.meta.env.BASE_URL}dehydrated-vegetables.jpg`}
        highlights={[
          { label: 'Product Forms', value: 'Flakes & Powders' },
          { label: 'Specifications', value: 'By Enquiry' },
          { label: 'Minimum Order', value: 'Confirm with Us' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="leaf-divider mb-3">Product Catalogue</p>

            <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">
              Dehydrated Vegetable Products & Ingredients
            </h2>
          </div>

          <p className="text-sm text-mute max-w-sm">
            Explore product types and example specifications.
            Final product forms, moisture limits, mesh sizes,
            packaging and order quantities depend on the selected
            supplier and confirmed product specification.
          </p>
        </div>

        <CatalogGrid items={items} />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Important:</strong> Product specifications and
          packaging shown in this catalogue are illustrative only,
          not confirmed stock or guaranteed supply specifications.
          Availability, country of origin, test reports, minimum
          order quantities and final specifications must be verified
          with the supplier before quotation or order confirmation.
        </p>
      </section>

      <section className="bg-cream-dark/40 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="leaf-divider mb-3">
              Our Sourcing & Supply Process
            </p>

            <h3 className="font-display text-2xl text-forest-deep font-semibold">
              Clear requirements. Suitable sourcing. Transparent coordination.
            </h3>

            <ol className="mt-6 space-y-4 text-sm text-ink/75">
              {[
                'Understand the buyer’s product, quantity and destination requirements',
                'Explore suitable suppliers and product availability',
                'Confirm product form and technical specifications with the supplier',
                'Discuss samples and evaluation requirements, where available',
                'Confirm packaging, labelling and documentation requirements',
                'Review applicable quality documents and test reports, where available',
                'Coordinate order and dispatch arrangements subject to agreement',
              ].map((step, index) => (
                <li key={step} className="flex gap-4 items-start">
                  <span className="font-display text-saffron-dark font-semibold w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-5 text-xs text-ink/60 leading-relaxed">
              Processing, testing, certification and logistics are
              arranged according to the supplier, product, order
              agreement and applicable requirements.
            </p>
          </div>

          <div>
            <p className="leaf-divider mb-3">
              Typical Applications
            </p>

            <h3 className="font-display text-2xl text-forest-deep font-semibold">
              Who Uses Dehydrated Vegetable Ingredients?
            </h3>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                'Instant noodle manufacturers',
                'Ready meal manufacturers',
                'Soup and sauce manufacturers',
                'Seasoning and spice companies',
                'Food ingredient distributors',
                'HoReCa suppliers',
                'Food processing businesses',
                'International food importers',
              ].map((buyer) => (
                <li
                  key={buyer}
                  className="bg-cream border border-forest/10 rounded-lg px-3 py-2"
                >
                  {buyer}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/60">
          Product images are original catalogue illustrations for identification and are not photographs of confirmed supplier stock. Request current product photographs, samples and final specifications as part of your enquiry.
        </p>
      </section>

      <CTA />
    </>
  );
}