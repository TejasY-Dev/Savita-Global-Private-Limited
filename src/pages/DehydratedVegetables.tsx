import { useEffect } from 'react';
import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  {
    name: 'Red Onion Flakes',
    form: 'Kibbled 5–10 mm',
    moisture: '≤ 6%',
    packing: '10 / 25 kg carton',
  },
  {
    name: 'Onion Powder',
    form: 'Powder 80–100 mesh',
    moisture: '≤ 5%',
    packing: '25 kg PE-lined bag',
  },
  {
    name: 'Onion Granules',
    form: 'Granules 20–40 mesh',
    moisture: '≤ 6%',
    packing: '25 kg carton',
  },
  {
    name: 'Tomato Powder',
    form: 'Spray dried',
    moisture: '≤ 4%',
    packing: '20 kg carton',
  },
  {
    name: 'Tomato Flakes',
    form: 'Air dried',
    moisture: '≤ 6%',
    packing: '10 kg carton',
  },
  {
    name: 'Spinach Powder',
    form: 'Fine powder',
    moisture: '≤ 6%',
    packing: '20 kg carton',
  },
  {
    name: 'Green Chilli Flakes',
    form: 'Crushed 3–5 mm',
    moisture: '≤ 8%',
    packing: '10 kg carton',
  },
  {
    name: 'Ginger Powder',
    form: 'Powder 60 mesh',
    moisture: '≤ 8%',
    packing: '25 kg bag',
  },
  {
    name: 'Beetroot Powder',
    form: 'Fine powder',
    moisture: '≤ 6%',
    packing: '20 kg carton',
  },
];

export default function DehydratedVegetables() {
  useEffect(() => {
    document.title =
      'Dehydrated Vegetables Exporter India | Savita Global';

    const description =
      'Savita Global supplies and exports dehydrated vegetables from India including onion flakes, onion powder, onion granules, tomato powder, tomato flakes, spinach powder, green chilli flakes, ginger powder and beetroot powder.';

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    meta.content = description;

    return () => {
      document.title =
        'Savita Global Private Limited | Dehydrated Food & Export Supplier India';
    };
  }, []);

  return (
    <>
      <CategoryHero
  eyebrow="Dehydrated Vegetables Exporter from India"
  title={
    <>
      Dehydrated Vegetables
      <span className="italic text-saffron-dark"> from India.</span>
    </>
  }
  intro="Savita Global Private Limited supplies and exports dehydrated vegetables and vegetable ingredients for food manufacturers, seasoning companies, HoReCa distributors and international buyers. Products can be supplied in flakes, granules, powders and other buyer-specific specifications."
  image={`${import.meta.env.BASE_URL}dehydrated-vegetables.jpg`}
  highlights={[
    { label: 'Product Forms', value: 'Flakes' },
    { label: 'Custom Specs', value: 'Yes' },
    { label: 'Buyer MOQ', value: 'Enquiry' },
  ]}
/>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="leaf-divider mb-3">Catalogue</p>
<h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">
  Dehydrated Vegetable Products & Ingredients
</h2>          </div>
<p className="text-sm text-mute max-w-sm">
  Explore our range of dehydrated vegetables, flakes, granules and powders.
  Specifications, mesh size, moisture level and packaging can be customized
  according to buyer requirements.
</p>
        </div>
        <CatalogGrid items={items} />
      </section>

      <section className="bg-cream-dark/40 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="leaf-divider mb-3">How we process</p>
<h3 className="font-display text-2xl text-forest-deep font-semibold">
  Controlled processing for consistent dehydrated vegetables.
</h3>
            <ol className="mt-6 space-y-4 text-sm text-ink/75">
              {[
  'Raw material sourcing and quality selection',
  'Cleaning, sorting and preparation',
  'Slicing, dicing, kibbling or powder processing',
  'Controlled dehydration according to product requirements',
  'Sieving and grading to buyer specifications',
  'Quality checks and specification verification',
  'Food-grade packing and dispatch preparation',
].map((s, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="font-display text-saffron-dark font-semibold w-6">{String(i+1).padStart(2,'0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="leaf-divider mb-3">Typical buyers</p>
<h3 className="font-display text-2xl text-forest-deep font-semibold">
  Dehydrated Vegetable Buyers & Applications
</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
  'Instant noodle manufacturers',
  'Ready meal manufacturers',
  'Soup and sauce manufacturers',
  'Seasoning and spice companies',
  'Food ingredient distributors',
  'HoReCa food distributors',
  'Food processing companies',
  'International food importers',
].map((b) => (
                <li key={b} className="bg-cream border border-forest/10 rounded-lg px-3 py-2">{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
