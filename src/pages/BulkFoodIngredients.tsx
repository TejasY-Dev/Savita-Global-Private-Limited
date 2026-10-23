import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Turmeric Fingers / Powder',
    image: `${import.meta.env.BASE_URL}products/ingredients/turmeric-powder.jpg`,
    imageAlt: 'Turmeric fingers and turmeric powder',
    form: 'Example: Whole turmeric fingers or powder',
    moisture: 'Indicative: ≤ 10%',
    packing: 'Example: 25 / 50 kg bags',
  },
  {
    name: 'Red Chilli (Teja / S17)',
    image: `${import.meta.env.BASE_URL}products/ingredients/red-chilli.jpg`,
    imageAlt: 'Illustration of red chilli product',
    form: 'Example: Whole, stemless or powder',
    moisture: 'Indicative: ≤ 11%',
    packing: 'Example: 25 kg bag or carton',
  },
  {
    name: 'Cumin Seeds',
    image: `${import.meta.env.BASE_URL}products/ingredients/cumin-seeds.jpg`,
    imageAlt: 'Illustration of cumin seeds',
    form: 'Grade and origin by enquiry',
    moisture: 'Indicative: ≤ 8%',
    packing: 'Example: 25 kg bag',
  },
  {
    name: 'Green Cardamom',
    image: `${import.meta.env.BASE_URL}products/ingredients/green-cardamom.jpg`,
    imageAlt: 'Illustration of green cardamom',
    form: 'Example: 7–8 mm grade',
    moisture: 'Indicative: ≤ 12%',
    packing: 'Example: 5 kg carton',
  },
];

export default function BulkFoodIngredients() {
return (
    <>
      <CategoryHero
        eyebrow="Bulk Food Ingredient Sourcing from India"
        imageAlt="Illustrative assortment of Indian spices and food ingredients"
        title={
          <>
            Indian Food Ingredients
            <span className="italic text-saffron-dark">
              {' '}for Business Buyers.
            </span>
          </>
        }
        intro="Savita Global Private Limited helps domestic and international buyers explore sourcing options for Indian spices and bulk food ingredients. Our featured catalogue includes turmeric, red chilli, cumin seeds and green cardamom. Product grades, origin, specifications, packaging, order quantities and delivery arrangements are confirmed according to buyer requirements and supplier capabilities."
        image={`${import.meta.env.BASE_URL}bulk-food-ingredients.jpg`}
        highlights={[
          { label: 'Product Range', value: 'Spices & Ingredients' },
          { label: 'Supply Format', value: 'By Enquiry' },
          { label: 'Order Quantity', value: 'Confirm with Us' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Product Catalogue</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-4">
          Bulk Food Ingredients & Indian Spices
        </h2>

        <p className="text-sm text-mute max-w-2xl mb-8 leading-relaxed">
          Explore example product forms and grades. Final
          specifications, moisture limits, packaging, minimum
          order quantities and availability depend on the selected
          product and confirmed supplier information.
        </p>

        <CatalogGrid items={items} accent="forest" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> The grades,
          specifications and packing details shown are illustrative
          only. They do not confirm current stock or guaranteed
          supply. Please enquire to verify product origin,
          specifications, documentation, availability and order
          quantities before confirming a purchase.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        <div className="bg-cream-dark/50 border border-forest/10 rounded-3xl p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="leaf-divider mb-3">
              Order & Shipment Planning
            </p>

            <h3 className="font-display text-3xl text-forest-deep font-semibold">
              Supply arrangements based on your requirements.
            </h3>

            <p className="mt-4 text-ink/70 leading-relaxed">
              Share the product, grade, quantity, destination and
              preferred packaging. We can discuss suitable sourcing
              options and shipment arrangements with suppliers and
              logistics partners, subject to availability and
              agreement.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-ink/75">
            {[
              'Product specifications and supplier documentation, where available',
              'Applicable phytosanitary or fumigation requirements, where relevant',
              'Country-of-origin documentation, subject to eligibility and issuing authority',
              'Food safety, non-GMO or non-irradiation documents, where applicable and verified',
              'Halal or Kosher requirements, subject to product and valid certification',
              'Third-party inspection options, subject to agreement and availability',
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="text-saffron-dark mt-0.5">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/60">
          Product images are original catalogue illustrations for identification and are not photographs of confirmed supplier stock. Request current product photographs, samples and final specifications as part of your enquiry.
        </p>
      </section>

      <CTA />
    </>
  );
}