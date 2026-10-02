import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  { name: 'Turmeric Fingers / Powder', form: 'Curcumin 3–5%', moisture: '≤ 10%', packing: '25 / 50 kg jute' },
  { name: 'Red Chilli (Teja / S17)', form: 'Whole • stemless • powder', moisture: '≤ 11%', packing: '25 kg carton' },
  // { name: 'Coriander Seeds / Powder', form: 'Machine cleaned', moisture: '≤ 9%', packing: '25 kg PP bag' },
  { name: 'Cumin Seeds', form: 'Singapore quality', moisture: '≤ 8%', packing: '25 kg PP bag' },
  { name: 'Green Cardamom', form: '7–8 mm bold', moisture: '≤ 12%', packing: '5 kg carton' },
  // { name: 'Black Pepper', form: 'MG1 • 550 g/l', moisture: '≤ 12%', packing: '25 kg PP bag' },
  // { name: 'Tur / Chana / Moong Dal', form: 'Split, polished', moisture: '≤ 14%', packing: '25 / 50 kg PP bag' },
  // { name: 'Sona Masuri / Basmati Rice', form: 'Sella / raw', moisture: '≤ 14%', packing: '25 kg woven bag' },
  // { name: 'Jaggery (Organic)', form: 'Cubes • powder • liquid', packing: '10 / 30 kg' },
  // { name: 'Groundnut Kernels', form: 'Bold 40/50 • Java 60/70', moisture: '≤ 8%', packing: '25 / 50 kg jute' },
  // { name: 'Sesame Seeds (Hulled)', form: 'Natural / hulled', packing: '25 kg PP bag' },
  // { name: 'Refined Sugar', form: 'ICUMSA 45', packing: '50 kg PP bag' },
];

export default function BulkFoodIngredients() {
  return (
    <>
      <CategoryHero
        eyebrow="Bulk Food Ingredients"
        title={<>Container loads of <span className="italic text-saffron-dark">Indian pantry staples.</span></>}
        intro="For food manufacturers, ethnic retail chains and government tenders — we supply spices, pulses, grains and sweeteners in FCL and LCL loads with full documentation."
        image={`${import.meta.env.BASE_URL}bulk-food-ingredients.jpg`}
        highlights={[
          { label: 'SKUs', value: '0+' },
          { label: 'Load', value: 'FCL / LCL' },
          { label: 'Ports', value: 'JNPT • Mundra' },
        ]}
      />
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Catalogue</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-8">Featured SKUs</h2>
        <CatalogGrid items={items} accent="forest" />
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        <div className="bg-cream-dark/50 border border-forest/10 rounded-3xl p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="leaf-divider mb-3">Container Economics</p>
            <h3 className="font-display text-3xl text-forest-deep font-semibold">One 20' FCL ≈ 18–22 MT. One 40' ≈ 25–27 MT.</h3>
            <p className="mt-4 text-ink/70">We consolidate mixed-SKU FCLs to help smaller buyers hit efficient landed costs. Talk to us about MOQ splits.</p>
          </div>
          <ul className="space-y-3 text-sm">
            {['Fumigation & phyto-sanitary certificate','Certificate of origin (APEDA / Spices Board)','Non-GMO & non-irradiation declaration','Halal / Kosher on request','Load-port third-party inspection welcome'].map(x=>(
              <li key={x} className="flex gap-3 items-start"><span className="text-saffron-dark mt-0.5">◆</span>{x}</li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}
