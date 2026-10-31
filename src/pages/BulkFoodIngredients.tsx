import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Turmeric Fingers / Powder',
    image: `${import.meta.env.BASE_URL}products/ingredients/turmeric-powder.jpg`,
    imageAlt: 'Illustration of turmeric powder',
    form: 'Whole fingers or powder; grade and particle size by enquiry',
    note: 'Where required, specify curcumin, colour, moisture, foreign matter, residue tests and test method.',
  },
  {
    name: 'Red Chilli (Teja / S17)',
    image: `${import.meta.env.BASE_URL}products/ingredients/red-chilli.jpg`,
    imageAlt: 'Illustration of red chilli product',
    form: 'Whole, stemless, crushed or powder; variety to be confirmed',
    note: 'Define colour, pungency, stem/seed tolerance, particle size, cleanliness and applicable safety tests.',
  },
  {
    name: 'Cumin Seeds',
    image: `${import.meta.env.BASE_URL}products/ingredients/cumin-seeds.jpg`,
    imageAlt: 'Illustration of cumin seeds',
    form: 'Whole seed; grade and origin by enquiry',
    note: 'Discuss purity, foreign matter, seed appearance, aroma, moisture and any requested volatile-oil test.',
  },
  {
    name: 'Green Cardamom',
    image: `${import.meta.env.BASE_URL}products/ingredients/green-cardamom.jpg`,
    imageAlt: 'Illustration of green cardamom',
    form: 'Whole pods; size or grade definition to be agreed',
    note: 'Specify pod size, colour, boldness, splits, aroma, moisture and acceptable defect levels.',
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
          A spice specification should be product-specific. The attributes below are prompts for a buyer brief, not fixed grade limits, test results or a statement of current availability.
        </p>

        <CatalogGrid items={items} accent="forest" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> This is an enquiry catalogue, not a stock list or a guaranteed grade offer. Origin, crop/lot reference, grade, test results, applicable certificates, packing, minimum order and availability must be confirmed in a written product-specific offer.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-12">
        <p className="leaf-divider mb-3">How to compare spice offers</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">Ask for a grade definition, not just a product name.</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {[
            { title: 'Identity and grade', text: 'Confirm the exact spice, variety or commercial grade, whole or ground form, size definition and acceptable defect or foreign-matter levels.' },
            { title: 'Performance markers', text: 'Select markers relevant to the product: for example, curcumin for turmeric, colour or pungency measures for chilli, or volatile-oil characteristics for spices where the buyer requires them. Agree the test method.' },
            { title: 'Food-safety checks', text: 'Define any required microbiological, pesticide-residue, mycotoxin, contaminant or other tests based on the product specification and destination market.' },
            { title: 'Lot and test traceability', text: 'Ask whether a certificate of analysis relates to the actual proposed lot, when it was tested, which laboratory issued it and which methods were used.' },
          ].map((item) => <article key={item.title} className="rounded-2xl border border-forest/10 bg-cream p-6"><h3 className="font-display text-xl font-semibold text-forest-deep">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/70">{item.text}</p></article>)}
        </div>
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
              'Product specification and supplier identity for the offered lot',
              'Country of origin and traceability records, where available',
              'Food-safety tests relevant to the product and destination',
              'Residue or contaminant testing, if required by the buyer or market',
              'Certificates only where applicable, valid and issued by an authorised body',
              'Inspection scope, sampling method and cost, agreed before purchase',
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