import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  // { name: 'White Onion Flakes', form: 'Kibbled 5–10 mm', moisture: '≤ 6%', packing: '10 / 25 kg carton' },
  { name: 'Red Onion Flakes', form: 'Kibbled 5–10 mm', moisture: '≤ 6%', packing: '10 / 25 kg carton' },
  { name: 'Onion Powder', form: 'Powder 80–100 mesh', moisture: '≤ 5%', packing: '25 kg PE-lined bag' },
  { name: 'Onion Granules', form: 'Granules 20–40 mesh', moisture: '≤ 6%', packing: '25 kg carton' },
  // { name: 'Garlic Flakes', form: 'Sliced 2–4 mm', moisture: '≤ 6%', packing: '10 kg carton' },
  // { name: 'Garlic Powder', form: 'Powder 80 mesh', moisture: '≤ 5%', packing: '25 kg PE-lined bag' },
  { name: 'Tomato Powder', form: 'Spray dried', moisture: '≤ 4%', packing: '20 kg carton' },
  { name: 'Tomato Flakes', form: 'Air dried', moisture: '≤ 6%', packing: '10 kg carton' },
  { name: 'Spinach Powder', form: 'Fine powder', moisture: '≤ 6%', packing: '20 kg carton' },
  // { name: 'Curry Leaf Powder', form: 'Fine powder', moisture: '≤ 6%', packing: '20 kg carton' },
  { name: 'Green Chilli Flakes', form: 'Crushed 3–5 mm', moisture: '≤ 8%', packing: '10 kg carton' },
  { name: 'Ginger Powder', form: 'Powder 60 mesh', moisture: '≤ 8%', packing: '25 kg bag' },
  { name: 'Beetroot Powder', form: 'Fine powder', moisture: '≤ 6%', packing: '20 kg carton' },
  // { name: 'Carrot Flakes', form: 'Dice 6 × 6 mm', moisture: '≤ 6%', packing: '10 kg carton' },
  // { name: 'Cabbage Flakes', form: 'Sliced 6 mm', moisture: '≤ 6%', packing: '10 kg carton' },
];

export default function DehydratedVegetables() {
  return (
    <>
      <CategoryHero
        eyebrow="Dehydrated Vegetables"
        title={<>The workhorse of every <span className="italic text-saffron-dark">savoury kitchen.</span></>}
        intro="Our flagship division. Grown under contract with farmer groups across Maharashtra & Karnataka, then dehydrated on our own belt & tray dryers to preserve pungency, colour and rehydration ratio."
        image="/catalog/dehydrated-vegetables.jpg"
        highlights={[
          { label: 'SKUs', value: '0' },
          { label: 'Capacity', value: '0 MT' },
          { label: 'MOQ', value: '0 FCL' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="leaf-divider mb-3">Catalogue</p>
            <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold">Featured SKUs</h2>
          </div>
          <p className="text-sm text-mute max-w-sm">All specs are indicative — we make to your buyer spec-sheet. Custom mesh, moisture and packing sizes on request.</p>
        </div>
        <CatalogGrid items={items} />
      </section>

      <section className="bg-cream-dark/40 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="leaf-divider mb-3">How we process</p>
            <h3 className="font-display text-2xl text-forest-deep font-semibold">Air-dried, colour-preserved, spec-perfect.</h3>
            <ol className="mt-6 space-y-4 text-sm text-ink/75">
              {['Reception & sorting at farm gate','Wash — destone — peeling','Slicing / dicing / kibbling','Belt drying at controlled temperatures','Sieving to buyer mesh','Metal detection & microbial test','Nitrogen-flushed final packing'].map((s,i)=>(
                <li key={i} className="flex gap-4 items-start"><span className="font-display text-saffron-dark font-semibold w-6">{String(i+1).padStart(2,'0')}</span><span>{s}</span></li>
              ))}
            </ol>
          </div>
          <div>
            <p className="leaf-divider mb-3">Typical buyers</p>
            <h3 className="font-display text-2xl text-forest-deep font-semibold">Where our vegetables land up.</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {['Instant noodle plants','Ready meal manufacturers','Soup & sauce brands','Seasoning blenders','Retail spice houses','HoReCa distributors','Pet food formulators','Nutraceutical brands'].map(b=>(
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
