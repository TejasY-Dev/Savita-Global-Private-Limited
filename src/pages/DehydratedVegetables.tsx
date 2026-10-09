import { useEffect } from 'react';
import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Red Onion Flakes',
    form: 'Illustrative: Kibbled 5–10 mm',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 10 / 25 kg carton',
  },
  {
    name: 'Onion Powder',
    form: 'Illustrative: Powder 80–100 mesh',
    moisture: 'Indicative: ≤ 5%',
    packing: 'Example: 25 kg PE-lined bag',
  },
  {
    name: 'Onion Granules',
    form: 'Illustrative: Granules 20–40 mesh',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 25 kg carton',
  },
  {
    name: 'Tomato Powder',
    form: 'Illustrative: Spray-dried powder',
    moisture: 'Indicative: ≤ 4%',
    packing: 'Example: 20 kg carton',
  },
  {
    name: 'Tomato Flakes',
    form: 'Illustrative: Air-dried flakes',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 10 kg carton',
  },
  {
    name: 'Spinach Powder',
    form: 'Illustrative: Fine powder',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 20 kg carton',
  },
  {
    name: 'Green Chilli Flakes',
    form: 'Illustrative: Crushed 3–5 mm',
    moisture: 'Indicative: ≤ 8%',
    packing: 'Example: 10 kg carton',
  },
  {
    name: 'Ginger Powder',
    form: 'Illustrative: Powder, 60 mesh',
    moisture: 'Indicative: ≤ 8%',
    packing: 'Example: 25 kg bag',
  },
  {
    name: 'Beetroot Powder',
    form: 'Illustrative: Fine powder',
    moisture: 'Indicative: ≤ 6%',
    packing: 'Example: 20 kg carton',
  },
];

export default function DehydratedVegetables() {
  useEffect(() => {
    document.title =
      'Dehydrated Vegetables from India | Savita Global';

    const description =
      'Explore dehydrated vegetable sourcing options from India with Savita Global Private Limited. Enquire about onion flakes, onion powder, granules, tomato products and other vegetable ingredients. Specifications and availability are subject to supplier confirmation.';

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    const previousDescription = meta.content;
    meta.content = description;

    return () => {
      document.title =
        'Savita Global Private Limited | Dehydrated Food & Export Supplier India';

      if (meta) {
        meta.content = previousDescription;
      }
    };
  }, []);

  return (
    <>
      <CategoryHero
        eyebrow="Dehydrated Vegetable Sourcing from India"
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
      </section>

      <CTA />
    </>
  );
}