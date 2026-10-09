import { useEffect } from 'react';
import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Terry Kitchen Towel',
    form: 'Example: Cotton • 400 GSM',
    packing: 'Example: 12 pcs per polybag',
    note: 'Example size: 40 × 60 cm • solid or stripe',
  },
  {
    name: 'Waffle Kitchen Towel',
    form: 'Example: Cotton • 320 GSM',
    packing: 'Example: 10 pcs per polybag',
    note: 'Example size: 45 × 65 cm',
  },
  {
    name: 'Printed Tea Towel',
    form: 'Example: Cotton • 260 GSM',
    packing: 'Example: 25 pcs per polybag',
    note: 'Example size: 50 × 70 cm',
  },
  {
    name: 'Herringbone Glass Cloth',
    form: 'Example: Cotton or blended fabric',
    packing: 'By enquiry',
    note: 'Example size: 45 × 65 cm',
  },
  {
    name: 'Chef Apron with Pocket',
    form: 'Example: Twill fabric • 240 GSM',
    packing: 'By enquiry',
    note: 'Style and strap options to be confirmed',
  },
  {
    name: 'Hemmed Dinner Napkin',
    form: 'Example: Cotton • 200 GSM',
    packing: 'Example: Box of 12',
    note: 'Example size: 40 × 40 cm',
  },
  {
    name: 'Cocktail Napkin',
    form: 'Example: Cotton • 180 GSM',
    packing: 'Example: Box of 24',
    note: 'Example size: 20 × 20 cm',
  },
  {
    name: 'Woven Placemat',
    form: 'Example: Cotton jacquard',
    packing: 'Example: Set of 4',
    note: 'Example size: 33 × 48 cm',
  },
  {
    name: 'Oven Mitt & Pot Holder Set',
    form: 'Example: Cotton outer fabric with padding',
    packing: 'By enquiry',
    note: 'Heat-resistance performance must be verified',
  },
];

export default function TowelsNapkins() {
  useEffect(() => {
    document.title =
      'Cotton Towels & Napkins Sourcing from India | Savita Global';

    const description =
      'Explore sourcing options for kitchen towels, tea towels, cotton napkins, aprons and textile accessories from India with Savita Global Private Limited. Sizes, GSM, fabric composition, packaging and order quantities are subject to supplier confirmation.';

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
        eyebrow="Towels & Napkins Sourcing from India"
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
          Explore example product styles and specifications.
          Final fabric composition, GSM, dimensions, colours,
          stitching, finishing, packaging and minimum order
          quantities depend on the selected supplier and product.
        </p>

        <CatalogGrid items={items} accent="terra" />

        <p className="mt-6 text-sm text-ink/65 leading-relaxed border border-forest/10 rounded-xl p-4">
          <strong>Product information:</strong> The styles, sizes,
          GSM values and packaging shown are illustrative only.
          They do not confirm current stock or guaranteed supply.
          Final specifications, fibre composition, sample approval,
          production lead time and applicable certifications must
          be verified with the supplier before order confirmation.
        </p>
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
      </section>

      <CTA />
    </>
  );
}
