import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Red Onion Flakes',
    image: `${import.meta.env.BASE_URL}products/vegetables/red-onion-flakes.jpg`,
    imageAlt: 'Illustration of red onion flakes',
    form: 'Kibbled or flaked; cut-size range agreed by specification',
    note: 'Confirm colour, aroma, moisture, water activity, foreign matter and microbiological criteria for the intended application.',
  },
  {
    name: 'Onion Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/onion-powder.jpg`,
    imageAlt: 'Illustration of onion powder',
    form: 'Powder; particle-size distribution or mesh to be agreed',
    note: 'Discuss flow, caking, colour, aroma, carrier or additive declaration, and packing barrier.',
  },
  {
    name: 'Onion Granules',
    image: `${import.meta.env.BASE_URL}products/vegetables/onion-granules.jpg`,
    imageAlt: 'Illustration of onion granules',
    form: 'Granulated; grade and fines percentage to be specified',
    note: 'Confirm granule size, fines, colour, aroma, moisture and the buyer’s test requirements.',
  },
  {
    name: 'Tomato Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/tomato-powder.jpg`,
    imageAlt: 'Illustration of tomato powder',
    form: 'Powder; processing method and carrier status to be confirmed',
    note: 'Specify colour, flavour, particle size, solubility or dispersibility and full ingredient declaration.',
  },
  {
    name: 'Tomato Flakes',
    image: `${import.meta.env.BASE_URL}products/vegetables/tomato-flakes.jpg`,
    imageAlt: 'Illustration of dehydrated tomato flakes',
    form: 'Flakes or pieces; cut size to be agreed',
    note: 'Discuss piece size, colour, flavour, seeds/skin tolerance, moisture and rehydration behaviour.',
  },
  {
    name: 'Spinach Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/spinach-powder.jpg`,
    imageAlt: 'Illustration of spinach powder',
    form: 'Leaf powder; particle size and colour target by enquiry',
    note: 'Confirm ingredient identity, colour, aroma, particle size, microbial criteria and intended use.',
  },
  {
    name: 'Green Chilli Flakes',
    image: `${import.meta.env.BASE_URL}products/vegetables/green-chilli-flakes.jpg`,
    imageAlt: 'Illustration of green chilli flakes',
    form: 'Crushed or flaked; cut range and heat profile by enquiry',
    note: 'Specify variety or heat target, colour, seeds, foreign matter, particle size and packing.',
  },
  {
    name: 'Ginger Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/ginger-powder.jpg`,
    imageAlt: 'Illustration of ginger powder',
    form: 'Powder; mesh and flavour profile to be specified',
    note: 'Discuss aroma, pungency, fibre, colour, moisture, microbiological criteria and storage.',
  },
  {
    name: 'Beetroot Powder',
    image: `${import.meta.env.BASE_URL}products/vegetables/beetroot-powder.jpg`,
    imageAlt: 'Illustration of beetroot powder',
    form: 'Powder; particle size and colour target by enquiry',
    note: 'Confirm colour, flavour, ingredient declaration, moisture, water activity and intended use.',
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
            The cards below describe the product formats and technical questions a buyer may need to define. They are not finished technical specifications or a statement of stock.
          </p>
        </div>

        <CatalogGrid items={items} />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Before quotation:</strong> This is an enquiry catalogue, not a live inventory list. No numerical moisture limit, mesh size, packing format, country of origin, test result or minimum order is guaranteed here. Ask for a product-specific specification and current lot or sample details before comparing offers.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-16">
        <p className="leaf-divider mb-3">Choose the right onion format</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">Flakes, granules and powder serve different jobs.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/70">The format should be selected around the recipe, dosing method and finished-food appearance. The descriptions below are general buying guidance; the actual particle range, performance and acceptance limits belong in the approved product specification.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { title: 'Flakes / kibbled', text: 'Visible pieces for soups, sauces, seasoning blends and prepared foods. Define cut-size range, proportion of fines, colour, aroma and rehydration behaviour.' },
            { title: 'Granules', text: 'Smaller particles that can distribute more evenly than larger flakes while retaining some texture. Specify particle-size distribution, fines, flow and intended dosing method.' },
            { title: 'Powder', text: 'A fine ingredient for dry mixes, seasonings and formulations. Define mesh or particle-size method, caking behaviour, flow, colour, flavour and any carrier or additive declaration.' },
          ].map((item) => <article key={item.title} className="rounded-2xl border border-forest/10 bg-cream p-6"><h3 className="font-display text-xl font-semibold text-forest-deep">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/70">{item.text}</p></article>)}
        </div>
        <div className="mt-6 rounded-2xl border border-saffron/40 bg-saffron/10 p-5 text-sm leading-relaxed text-ink/75"><strong className="text-forest-deep">Do not compare by moisture alone.</strong> A buyer may also need a water-activity value, microbiological criteria, foreign-matter limit, colour or sensory criteria, bulk density and a defined test method. Ask suppliers to state the result, method, date and lot reference for any test they provide.</div>
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
              This is a proposed enquiry workflow, not a claim that Savita Global owns a processing line or laboratory. Any processing, testing, certification or logistics scope must be confirmed with the relevant supplier or service provider for the order.
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