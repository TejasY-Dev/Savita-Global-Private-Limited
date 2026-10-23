import { useEffect } from 'react';
import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Potato Crisps & Slices',
    form: 'Example: Thin-cut potato slices',
    packing: 'Bulk or retail format by enquiry',
    note: 'Cut thickness, processing method and seasoning to be confirmed',
  },
  {
    name: 'Okra / Bhindi Crisps',
    form: 'Example: Sliced okra snack',
    packing: 'By enquiry',
    note: 'Product format, processing method and availability to be confirmed',
  },
  {
    name: 'Banana Chips',
    form: 'Example: Plain or seasoned banana slices',
    packing: 'Bulk or retail format by enquiry',
    note: 'Variety, thickness, processing and seasoning to be confirmed',
  },
  {
    name: 'Jackfruit Chips',
    form: 'Example: Thin-cut jackfruit pieces',
    packing: 'By enquiry',
    note: 'Raw material, processing method and product specifications to be confirmed',
  },
  {
    name: 'Sweet Potato Crisps',
    form: 'Example: Sliced sweet potato',
    packing: 'By enquiry',
    note: 'Cut, texture, processing method and seasoning to be confirmed',
  },
  {
    name: 'Beetroot Crisps',
    form: 'Example: Beetroot slices',
    packing: 'By enquiry',
    note: 'Colour, texture, processing and pack format to be confirmed',
  },
  {
    name: 'Mixed Vegetable Snacks',
    form: 'Example: Selected vegetable pieces',
    packing: 'By enquiry',
    note: 'Vegetable combination and processing specifications to be confirmed',
  },
  {
    name: 'Fruit Chips',
    form: 'Example: Selected fruit slices',
    packing: 'By enquiry',
    note: 'Fruit variety, cut, processing and packaging to be confirmed',
  },
  {
    name: 'Seasoned Snack Products',
    form: 'Example: Plain or flavoured snack formats',
    packing: 'By enquiry',
    note: 'Ingredients, flavour profile and product availability to be confirmed',
  },
];

export default function ValueAddedSnacks() {
  useEffect(() => {
    const previousTitle = document.title;

    const description =
      'Explore sourcing options for Indian value-added snacks, potato crisps, vegetable snacks, fruit chips and selected snack products with Savita Global Private Limited. Product formats, ingredients, specifications, packaging and availability are subject to supplier confirmation.';

    const existingMeta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;

    const previousDescription = existingMeta?.content;

    const meta = existingMeta ?? document.createElement('meta');

    if (!existingMeta) {
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    document.title =
      'Indian Snacks & Value-Added Food Products | Savita Global';

    meta.content = description;

    return () => {
      document.title = previousTitle;

      if (existingMeta) {
        meta.content = previousDescription ?? '';
      } else {
        meta.remove();
      }
    };
  }, []);

  return (
    <>
      <CategoryHero
        eyebrow="Value-Added Food Products from India"
        title={
          <>
            Discover Indian Snacks
            <span className="italic text-saffron-dark">
              {' '}and New Possibilities.
            </span>
          </>
        }
        intro="Savita Global Private Limited helps domestic and international buyers explore sourcing options for selected Indian snack products and value-added food items. Product ingredients, processing methods, flavours, specifications, packaging and availability are confirmed according to buyer requirements and supplier capabilities."
        image={`${import.meta.env.BASE_URL}value-added-snacks.jpg`}
        highlights={[
          { label: 'Product Range', value: 'Snack Products' },
          { label: 'Product Options', value: 'By Enquiry' },
          { label: 'Specifications', value: 'Buyer Requirements' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Product Catalogue</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-4">
          Snack Ideas & Value-Added Products
        </h2>

        <p className="text-sm text-mute max-w-2xl mb-8 leading-relaxed">
          Browse illustrative product categories for potential
          sourcing enquiries. Final ingredients, processing methods,
          flavours, dimensions, specifications, packaging and
          minimum order quantities depend on the selected product
          and supplier.
        </p>

        <CatalogGrid items={items} accent="terra" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> The items displayed
          are examples of potential product categories, not a
          confirmation of current stock or guaranteed supply.
          Product availability, ingredients, allergens, processing
          details, shelf life, nutritional information, applicable
          food-safety documentation and packaging must be verified
          with the supplier before order confirmation.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-16">
        <p className="leaf-divider mb-3">Buyer Requirements</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-8">
          Define the right product for your market.
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Product & Ingredients',
              description:
                'Discuss the preferred raw material, product format, ingredients, seasoning and other specifications for your target market.',
            },
            {
              title: 'Processing & Quality',
              description:
                'Confirm the processing method, product specifications, shelf-life information and relevant quality documents with the selected supplier.',
            },
            {
              title: 'Packaging & Labelling',
              description:
                'Explore bulk or retail packaging formats, pack sizes and labelling requirements according to the product and destination market.',
            },
          ].map((option) => (
            <div
              key={option.title}
              className="bg-cream-dark/50 border border-forest/10 rounded-2xl p-6"
            >
              <h3 className="font-display text-xl text-forest-deep font-semibold">
                {option.title}
              </h3>

              <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}