import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  { name: 'Okhra — Salted', form: 'Whole roasted', packing: '10 kg carton • retail 200 g', note: 'Non-fried, high protein' },
  // { name: 'Roasted Chana — Masala', form: 'Whole roasted', packing: '10 kg carton • retail 200 g', note: 'Signature Indian masala blend' },
  // { name: 'Cornflakes Mixture (Bhel)', form: 'Ready-to-eat mix', packing: '5 kg carton • retail 150 g' },
  // { name: 'Bhujia Sev — Fine', form: 'Extruded, fried', packing: '10 kg tin • retail 200 g' },
  // { name: 'Aloo Bhujia', form: 'Extruded, fried', packing: '10 kg tin • retail 150 g' },
  // { name: 'Chivda — Poha style', form: 'Traditional mix', packing: '5 kg carton • retail 200 g' },
  // { name: 'Baked Ragi Chips', form: 'Baked, oven-crisp', packing: '5 kg carton • retail 50 g', note: 'Millet-forward — gluten free' },
  // { name: 'Makhana — Roasted', form: 'Fox nut, spice roasted', packing: '5 kg carton • retail 60 g' },
  { name: 'Multigrain Namkeen Mix', form: 'Blended snack', packing: '10 kg tin • retail 200 g' },
];

export default function ValueAddedSnacks() {
  return (
    <>
      <CategoryHero
        eyebrow="Value-Added Snacks"
        title={<>Traditional Indian snacks, <span className="italic text-saffron-dark">export-ready.</span></>}
        intro="We co-manufacture and pack value-added Indian snacks for ethnic retail, HoReCa and airline catering — with export-compliant packaging and 9-month shelf life."
        image={`${import.meta.env.BASE_URL}value-added-snacks.jpg`}
        highlights={[
          { label: 'Formats', value: 'Retail • Bulk' },
          { label: 'Shelf life', value: '9 months' },
          { label: 'MOQ', value: '1,000 kg' },
        ]}
      />
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Catalogue</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-8">Featured SKUs</h2>
        <CatalogGrid items={items} accent="saffron" />
      </section>

      <section className="bg-forest text-cream py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid md:grid-cols-3 gap-8">
          {[
            {t:'Private label', d:'We print your brand, your barcode, your nutrition panel — in English + destination language.'},
            {t:'Retail pouches', d:'Zip-lock stand-ups, tin-tie bags, laminated pillow packs — metallised for shelf life.'},
            {t:'Bulk co-pack', d:'Institutional 5 / 10 kg tins for HoReCa, airline and vending distributors.'},
          ].map(x=>(
            <div key={x.t}>
              <h3 className="font-display text-2xl text-saffron">{x.t}</h3>
              <p className="mt-3 text-cream/75 text-sm leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
