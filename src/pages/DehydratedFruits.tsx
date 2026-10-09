import { useEffect } from 'react';
import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Mango Powder / Amchur',
    form: 'Example: Fine powder',
    moisture: 'Indicative: ≤ 8%',
    packing: 'Example: 20 kg carton',
  },
  {
    name: 'Banana Chips (Unsalted)',
    form: 'Example: Round chips',
    moisture: 'Indicative: ≤ 3%',
    packing: 'Example: 10 kg carton',
  },
  {
    name: 'Banana Powder',
    form: 'Example: Powder',
    moisture: 'Indicative: ≤ 5%',
    packing: 'Example: 20 kg carton',
  },
  {
    name: 'Guava Slices',
    form: 'Example: Sliced',
    moisture: 'Indicative: ≤ 15%',
    packing: 'Example: 5 kg carton',
  },
  {
    name: 'Amla Candy',
    form: 'Example: Sweetened cubes',
    moisture: 'Indicative: ≤ 18%',
    packing: 'Example: 10 kg carton',
  },
];

export default function DehydratedFruits() {
  useEffect(() => {
    document.title =
      'Dehydrated Fruits & Fruit Products from India | Savita Global';

    const description =
      'Explore fruit product sourcing options from India with Savita Global Private Limited. Enquire about mango powder, banana chips, banana powder, guava slices and amla candy. Product specifications and availability are subject to supplier confirmation.';

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    const previousDescription = meta?.content ?? '';

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

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
        eyebrow="Fruit Products Sourcing from India"
        title={
          <>
            Fruit Products
            <span className="italic text-saffron-dark">
              {' '}from India.
            </span>
          </>
        }
        intro="Savita Global Private Limited helps domestic and international buyers explore sourcing options for fruit-based products from India. Our catalogue includes mango powder, banana chips, banana powder, guava slices and amla candy. Product availability, ingredients, origin, specifications and packaging are confirmed according to buyer requirements and supplier capabilities."
        image={`${import.meta.env.BASE_URL}dehydrated-fruits.jpg`}
        highlights={[
          { label: 'Product Range', value: 'Fruit Products' },
          { label: 'Specifications', value: 'By Enquiry' },
          { label: 'Minimum Order', value: 'Confirm with Us' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Product Catalogue</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-4">
          Fruit Products & Ingredients
        </h2>

        <p className="text-sm text-mute max-w-2xl mb-8 leading-relaxed">
          Explore example product forms and specifications.
          Final product details, ingredients, moisture limits,
          packaging and minimum order quantities depend on the
          selected product and confirmed supplier specifications.
        </p>

        <CatalogGrid items={items} accent="terra" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> The specifications
          and packaging shown are illustrative only. They are not
          confirmation of current stock or guaranteed supply.
          Please enquire to confirm product availability, ingredients,
          country of origin, specifications, applicable documents
          and order quantities before placing an order.
        </p>
      </section>

      <section className="bg-cream-dark/40 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="leaf-divider mb-3">
              Our Sourcing Process
            </p>

            <h3 className="font-display text-2xl text-forest-deep font-semibold">
              Product requirements matched to suitable supply options.
            </h3>

            <ol className="mt-6 space-y-4 text-sm text-ink/75">
              {[
                'Understand the required fruit product, quantity and destination',
                'Explore suitable suppliers and product availability',
                'Confirm ingredients, product form and technical specifications',
                'Discuss samples and evaluation requirements, where available',
                'Confirm packaging and labelling requirements',
                'Review relevant product documents and test reports, where available',
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
          </div>

          <div>
            <p className="leaf-divider mb-3">
              Typical Applications
            </p>

            <h3 className="font-display text-2xl text-forest-deep font-semibold">
              Fruit Products for Different Industries
            </h3>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                'Bakery and confectionery',
                'Snack manufacturers',
                'Food ingredient distributors',
                'Breakfast and cereal products',
                'Food processing businesses',
                'Retail and private-label brands',
                'Hospitality and food service',
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