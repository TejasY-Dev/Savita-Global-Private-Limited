import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Potato Crisps & Slices',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/potato-crisps.jpg`,
    imageAlt: 'Illustration of potato crisps',
    form: 'Example: Thin-cut potato slices',
    packing: 'Bulk or retail format by enquiry',
    note: 'Cut thickness, processing method and seasoning to be confirmed',
  },
  {
    name: 'Okra / Bhindi Crisps',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/okra-crisps.jpg`,
    imageAlt: 'Illustration of okra or bhindi crisps',
    form: 'Example: Sliced okra snack',
    packing: 'By enquiry',
    note: 'Product format, processing method and availability to be confirmed',
  },
  {
    name: 'Banana Chips',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/banana-chips.jpg`,
    imageAlt: 'Illustration of banana chips',
    form: 'Example: Plain or seasoned banana slices',
    packing: 'Bulk or retail format by enquiry',
    note: 'Variety, thickness, processing and seasoning to be confirmed',
  },
  {
    name: 'Jackfruit Chips',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/jackfruit-chips.jpg`,
    imageAlt: 'Illustration of jackfruit chips',
    form: 'Example: Thin-cut jackfruit pieces',
    packing: 'By enquiry',
    note: 'Raw material, processing method and product specifications to be confirmed',
  },
  {
    name: 'Sweet Potato Crisps',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/sweet-potato-crisps.jpg`,
    imageAlt: 'Illustration of sweet potato crisps',
    form: 'Example: Sliced sweet potato',
    packing: 'By enquiry',
    note: 'Cut, texture, processing method and seasoning to be confirmed',
  },
  {
    name: 'Beetroot Crisps',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/beetroot-crisps.jpg`,
    imageAlt: 'Illustration of beetroot crisps',
    form: 'Example: Beetroot slices',
    packing: 'By enquiry',
    note: 'Colour, texture, processing and pack format to be confirmed',
  },
  {
    name: 'Mixed Vegetable Snacks',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/mixed-vegetable-snacks.jpg`,
    imageAlt: 'Illustration of a mixed vegetable snack assortment',
    form: 'Example: Selected vegetable pieces',
    packing: 'By enquiry',
    note: 'Vegetable combination and processing specifications to be confirmed',
  },
  {
    name: 'Fruit Chips',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/fruit-chips.jpg`,
    imageAlt: 'Illustration of mixed fruit chips',
    form: 'Example: Selected fruit slices',
    packing: 'By enquiry',
    note: 'Fruit variety, cut, processing and packaging to be confirmed',
  },
  {
    name: 'Seasoned Snack Products',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/seasoned-snacks.jpg`,
    imageAlt: 'Illustration of seasoned snack pieces',
    form: 'Example: Plain or flavoured snack formats',
    packing: 'By enquiry',
    note: 'Ingredients, flavour profile and product availability to be confirmed',
  },
];

export default function ValueAddedSnacks() {
return (
    <>
      <CategoryHero
        eyebrow="Value-Added Food Products from India"
        imageAlt="Illustrative assortment of savoury snack products"
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

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-12">
        <p className="leaf-divider mb-3">For product developers</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">A snack brief needs more than a flavour name.</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Base material', 'Specify the raw material, variety or blend, cut shape, dimensions and any permitted raw-material substitutions.'],
            ['Processing', 'State whether the product is fried, baked, dried, roasted or another process. Confirm oil type or processing aids where relevant.'],
            ['Recipe & allergens', 'Share seasoning, salt, sweetener, additive, allergen and cross-contact requirements for the intended market.'],
            ['Shelf life & pack', 'Agree pack size, packaging barrier, storage conditions, date coding, lot coding and evidence supporting shelf life.'],
          ].map(([title, text]) => <article key={title} className="rounded-2xl border border-forest/10 bg-cream p-6"><h3 className="font-display text-xl font-semibold text-forest-deep">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/70">{text}</p></article>)}
        </div>
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
        <p className="mt-3 text-xs leading-relaxed text-ink/60">
          Product images are original catalogue illustrations for identification and are not photographs of confirmed supplier stock. Request current product photographs, samples and final specifications as part of your enquiry.
        </p>
      </section>

      <CTA />
    </>
  );
}