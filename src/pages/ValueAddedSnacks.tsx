import { useEffect } from 'react';
import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Okra (Bhindi) — Salted',
    form: 'Example: Roasted snack',
    packing: 'Retail and bulk options by enquiry',
    note: 'Ingredients and processing method to be confirmed',
  },
  {
    name: 'Multigrain Namkeen Mix',
    form: 'Example: Blended savoury snack',
    packing: 'Retail and bulk options by enquiry',
    note: 'Recipe and available pack sizes to be confirmed',
  },
];

export default function ValueAddedSnacks() {
  useEffect(() => {
    document.title =
      'Indian Snacks & Value-Added Food Products | Savita Global';

    const description =
      'Explore sourcing options for Indian value-added snacks with Savita Global Private Limited. Enquire about okra snacks, multigrain namkeen and potential retail or bulk packaging options. Product availability and specifications are subject to supplier confirmation.';

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
        eyebrow="Indian Snacks & Value-Added Products"
        title={
          <>
            Indian Snacks
            <span className="italic text-saffron-dark">
              {' '}for Diverse Markets.
            </span>
          </>
        }
        intro="Savita Global Private Limited helps domestic and international buyers explore sourcing options for Indian savoury snacks and value-added food products. Our current catalogue highlights okra-based snacks and multigrain namkeen mixes. Product availability, ingredients, recipes, packaging and order quantities are confirmed with suitable suppliers according to buyer requirements."
        image={`${import.meta.env.BASE_URL}value-added-snacks.jpg`}
        highlights={[
          { label: 'Product Range', value: 'Savoury Snacks' },
          { label: 'Pack Formats', value: 'By Enquiry' },
          { label: 'Minimum Order', value: 'Confirm with Us' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Product Catalogue</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-4">
          Indian Snacks & Value-Added Products
        </h2>

        <p className="text-sm text-mute max-w-2xl mb-8 leading-relaxed">
          Explore our featured snack categories. Ingredients,
          flavour profiles, processing methods, pack sizes and
          availability depend on the selected product and supplier.
        </p>

        <CatalogGrid items={items} accent="saffron" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> Descriptions are
          indicative and do not confirm current stock or guaranteed
          supply. Ingredient declarations, allergen information,
          nutrition data, shelf life, packaging, labelling and
          applicable export requirements must be verified for the
          selected product before a quotation or order is confirmed.
        </p>
      </section>

      <section className="bg-forest text-cream py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className="leaf-divider !text-saffron mb-3">
            Packaging & Supply Options
          </p>

          <h2 className="font-display text-3xl lg:text-4xl font-semibold">
            Packaging suited to buyer requirements.
          </h2>

          <p className="mt-4 max-w-2xl text-cream/75 text-sm leading-relaxed">
            Retail and bulk packaging options can be discussed
            according to the product, supplier capabilities, order
            quantity and destination market. Final options are
            confirmed before an order is accepted.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Retail Packaging',
                description:
                  'Discuss suitable pouch sizes, product presentation and label requirements for retail products.',
              },
              {
                title: 'Private-Label Enquiries',
                description:
                  'Explore branding, artwork, barcode and destination-market labelling requirements with the supplier.',
              },
              {
                title: 'Bulk Supply',
                description:
                  'Discuss bulk pack sizes and delivery arrangements for food service, distributors and business buyers.',
              },
            ].map((option) => (
              <div
                key={option.title}
                className="border border-cream/15 rounded-2xl p-6"
              >
                <h3 className="font-display text-2xl text-saffron">
                  {option.title}
                </h3>

                <p className="mt-3 text-cream/75 text-sm leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}