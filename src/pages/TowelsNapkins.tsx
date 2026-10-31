import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Terry Kitchen Towel',
    image: `${import.meta.env.BASE_URL}products/textiles/terry-kitchen-towel.jpg`,
    imageAlt: 'Illustration of a terry kitchen towel',
    form: 'Terry construction; fibre content, pile and size by specification',
    packing: 'Pack count, folding and label by enquiry',
    note: 'Confirm absorbency, finished dimensions, GSM, colourfastness and seam finish.',
  },
  {
    name: 'Waffle Kitchen Towel',
    image: `${import.meta.env.BASE_URL}products/textiles/waffle-kitchen-towel.jpg`,
    imageAlt: 'Illustration of a waffle-weave kitchen towel',
    form: 'Waffle weave; fibre content and dimensions by specification',
    packing: 'Pack count, folding and label by enquiry',
    note: 'Specify cell pattern, weight, shrinkage, absorbency and finished size.',
  },
  {
    name: 'Printed Tea Towel',
    image: `${import.meta.env.BASE_URL}products/textiles/printed-tea-towel.jpg`,
    imageAlt: 'Illustration of a printed tea towel',
    form: 'Printed fabric; fibre, artwork and dimensions by enquiry',
    packing: 'Bulk or retail pack by enquiry',
    note: 'Agree artwork, print placement, colour reference, wash performance and hem finish.',
  },
  {
    name: 'Herringbone Glass Cloth',
    image: `${import.meta.env.BASE_URL}products/textiles/herringbone-glass-cloth.jpg`,
    imageAlt: 'Illustration of a herringbone glass cloth',
    form: 'Herringbone construction; fibre and weight to be specified',
    packing: 'By enquiry',
    note: 'Discuss linting, polishing performance, dimensions, edge finish and laundering.',
  },
  {
    name: 'Chef Apron with Pocket',
    image: `${import.meta.env.BASE_URL}products/textiles/chef-apron.jpg`,
    imageAlt: 'Illustration of a chef apron with a pocket',
    form: 'Apron pattern; fabric, fit and dimensions by specification',
    packing: 'By enquiry',
    note: 'Specify fabric, pocket layout, strap adjustment, stitching and colour.',
  },
  {
    name: 'Hemmed Dinner Napkin',
    image: `${import.meta.env.BASE_URL}products/textiles/hemmed-dinner-napkin.jpg`,
    imageAlt: 'Illustration of a hemmed dinner napkin',
    form: 'Woven napkin; fibre, dimensions and hem by specification',
    packing: 'Set size and retail or bulk packing by enquiry',
    note: 'Confirm finished size, shrinkage, colourfastness, hem width and pressing requirements.',
  },
  {
    name: 'Cocktail Napkin',
    image: `${import.meta.env.BASE_URL}products/textiles/cocktail-napkin.jpg`,
    imageAlt: 'Illustration of a cocktail napkin',
    form: 'Napkin format; fibre, dimensions and finish by enquiry',
    packing: 'Set size and retail or bulk packing by enquiry',
    note: 'Specify shape, fold, edge finish, colour, print and pack configuration.',
  },
  {
    name: 'Woven Placemat',
    image: `${import.meta.env.BASE_URL}products/textiles/woven-placemat.jpg`,
    imageAlt: 'Illustration of a woven placemat',
    form: 'Woven construction; material, shape and dimensions by enquiry',
    packing: 'Set size and pack format by enquiry',
    note: 'Confirm surface, backing, edge finish, colour and care instructions.',
  },
  {
    name: 'Oven Mitt & Pot Holder Set',
    image: `${import.meta.env.BASE_URL}products/textiles/oven-mitt-pot-holder.jpg`,
    imageAlt: 'Illustration of an oven mitt and pot holder set',
    form: 'Textile outer with padding; construction by enquiry',
    packing: 'By enquiry',
    note: 'Heat-protection performance must be tested to a defined standard; appearance alone is not evidence.',
  },
];

export default function TowelsNapkins() {
return (
    <>
      <CategoryHero
        eyebrow="Towels & Napkins Sourcing from India"
        imageAlt="Illustrative folded kitchen towels and napkins"
        title={
          <>
            Indian Home Textiles
            <span className="italic text-saffron-dark">
              {' '}for Everyday Use.
            </span>
          </>
        }
        intro="Savita Global Private Limited helps domestic and international buyers explore sourcing options for kitchen towels, tea towels, napkins, aprons and selected textile accessories from India. Product specifications, fabric composition, sizes, colours, finishing, packaging and availability are confirmed according to buyer requirements and supplier capabilities."
        image={`${import.meta.env.BASE_URL}towels-napkins.jpg`}
        highlights={[
          { label: 'Product Range', value: 'Towels & Napkins' },
          { label: 'Custom Options', value: 'By Enquiry' },
          { label: 'Minimum Order', value: 'Confirm with Us' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Product Catalogue</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-4">
          Towels, Napkins & Kitchen Textiles
        </h2>

        <p className="text-sm text-mute max-w-2xl mb-8 leading-relaxed">
          The styles below help describe the type of textile a buyer may be looking for. Fibre content, weight, dimensions, workmanship and performance must be stated in the buyer’s own specification and confirmed for the offered product.
        </p>

        <CatalogGrid items={items} accent="terra" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> This is an enquiry catalogue, not a ready-stock list. Images are illustrations. No GSM, fabric composition, size, colour, certification, minimum order or production time is promised here. Ask for a product-specific specification and physical sample before approving an order.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-12">
        <p className="leaf-divider mb-3">Build a textile specification</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">Five details that make towel offers comparable.</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ['Fibre content', 'State the exact fibre and permitted blend. Do not substitute a visual or touch description for a composition requirement.'],
            ['Weave & construction', 'Name terry, waffle, herringbone or other construction and define pile, yarn or backing details where relevant.'],
            ['Weight & size', 'Specify GSM, finished width and length, tolerance and whether dimensions are measured before or after laundering.'],
            ['Performance', 'Define absorbency, linting, colourfastness, shrinkage, seam strength and care requirements that matter to use.'],
            ['Finish & pack', 'Set the edge finish, hanging loop, embroidery or print, fold, pieces per pack, label and carton marking.'],
          ].map(([title, text]) => <article key={title} className="rounded-2xl border border-forest/10 bg-cream p-5"><h3 className="font-display text-lg font-semibold text-forest-deep">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p></article>)}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-ink/70"><strong>GSM explained:</strong> grams per square metre. A buyer can estimate it by weighing a known fabric area and dividing the mass in grams by that area in square metres. Agree the measurement method and tolerance with the supplier; do not compare products using GSM alone, because fibre, weave, pile and finishing also affect performance.</p>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-16">
        <p className="leaf-divider mb-3">Customisation Options</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-8">
          Product details tailored to buyer requirements.
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Fabric & Weaves',
              description:
                'Discuss terry, waffle, herringbone, jacquard and other available fabric constructions, along with colour and pattern options.',
            },
            {
              title: 'Finishing & Details',
              description:
                'Explore hemming, corner finishing, hanging loops and embroidery options, subject to supplier capabilities.',
            },
            {
              title: 'Packaging & Labelling',
              description:
                'Discuss polybags, inserts, gift boxes, hangtags and retail labelling according to product, quantity and destination requirements.',
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