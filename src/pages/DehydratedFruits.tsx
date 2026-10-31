import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Mango Powder / Amchur',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/mango-powder.jpg`,
    imageAlt: 'Illustration of mango powder',
    form: 'Powder; raw material, sourness and particle size by enquiry',
    note: 'Confirm mango variety or source, ingredient declaration, colour, taste, moisture and application.',
  },
  {
    name: 'Banana Chips',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/banana-chips.jpg`,
    imageAlt: 'Illustration of banana chips',
    form: 'Plain or seasoned slices; cut and process to be confirmed',
    note: 'Specify banana variety, frying or drying method, oil, seasoning, allergens and pack format.',
  },
  {
    name: 'Banana Powder',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/banana-powder.jpg`,
    imageAlt: 'Illustration of banana powder',
    form: 'Powder; ripeness, colour and particle size to be agreed',
    note: 'Confirm raw material, process, additives or carriers, flavour, dispersibility and storage.',
  },
  {
    name: 'Guava Slices',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/guava-slices.jpg`,
    imageAlt: 'Illustration of guava slices',
    form: 'Dried slices; thickness and preparation by enquiry',
    note: 'Define seed and peel expectations, added ingredients, texture, colour, moisture and shelf life.',
  },
  {
    name: 'Amla Candy',
    image: `${import.meta.env.BASE_URL}products/fruits-snacks/amla-candy.jpg`,
    imageAlt: 'Illustration of amla candy',
    form: 'Sweetened or other agreed preparation; recipe by enquiry',
    note: 'Confirm the complete recipe, sugar level, permitted additives, allergens, texture and pack type.',
  },
];

export default function DehydratedFruits() {
return (
    <>
      <CategoryHero
        eyebrow="Fruit Ingredients & Fruit-Based Products from India"
        imageAlt="Illustrative selection of dried fruit products"
        title={
          <>
            Fruit Ingredients & Products
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
          These product examples cover both ingredient formats and fruit-based snack products. They do not all use the same processing method or product standard; each requirement needs its own ingredient and technical specification.
        </p>

        <CatalogGrid items={items} accent="terra" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> This is an enquiry catalogue, not a stock list. The illustrations do not confirm actual supplier stock. Ingredient lists, processing methods, origin, shelf life, allergens, testing, packaging and order quantities must be confirmed for the specific product and destination before an offer is accepted.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-16">
        <p className="leaf-divider mb-3">A useful distinction for buyers</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">Fruit ingredient, dried fruit or snack?</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {[
            { title: 'Fruit powders', text: 'Confirm the fruit input, drying or powdering process, particle size, colour, flavour, carriers or anti-caking ingredients and how the powder performs in the buyer’s formulation.' },
            { title: 'Dried fruit pieces', text: 'Specify fruit variety where relevant, slice or dice dimensions, peel and seed expectations, texture, added sugar or preservatives, moisture and water activity.' },
            { title: 'Fruit-based snacks', text: 'State whether the product is fried, dried, candied or seasoned. Ask for a full ingredient list, allergen statement, nutrition information, oil or sugar details and shelf-life support.' },
          ].map((item) => <article key={item.title} className="rounded-2xl border border-forest/10 bg-cream p-6"><h3 className="font-display text-xl font-semibold text-forest-deep">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/70">{item.text}</p></article>)}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-ink/70">These categories can have different ingredients, processes, food-safety considerations and label declarations. A dried fruit specification should not automatically be reused for a fried chip or sweetened candy. Agree the actual recipe, processing method and intended market before pricing.</p>
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
        <p className="mt-3 text-xs leading-relaxed text-ink/60">
          Product images are original catalogue illustrations for identification and are not photographs of confirmed supplier stock. Request current product photographs, samples and final specifications as part of your enquiry.
        </p>
      </section>

      <CTA />
    </>
  );
}