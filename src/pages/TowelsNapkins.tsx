import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  { name: 'Terry Kitchen Towel', form: '100% cotton • 400 GSM', packing: '12 pcs polybag', note: '40 × 60 cm • solid / stripe' },
  { name: 'Waffle Kitchen Towel', form: '100% cotton • 320 GSM', packing: '10 pcs polybag', note: '45 × 65 cm' },
  { name: 'Tea Towel — Printed', form: '100% cotton • 260 GSM', packing: '25 pcs polybag', note: '50 × 70 cm • rotary print' },
  { name: 'Herringbone Glass Cloth', form: 'Cotton / linen blend', packing: '25 pcs polybag', note: '45 × 65 cm' },
  { name: 'Chef Apron with Pocket', form: 'Twill 240 GSM', packing: '10 pcs polybag', note: 'Adjustable neck strap' },
  { name: 'Dinner Napkin — Hemmed', form: 'Cotton 200 GSM', packing: 'Box of 12', note: '40 × 40 cm' },
  { name: 'Cocktail Napkin', form: 'Cotton 180 GSM', packing: 'Box of 24', note: '20 × 20 cm' },
  { name: 'Placemat — Woven', form: 'Cotton jacquard', packing: 'Set of 4 gift box', note: '33 × 48 cm' },
  { name: 'Oven Mitt & Pot Holder Set', form: 'Cotton with padding', packing: 'Set polybag', note: 'Heat resistant' },
];

export default function TowelsNapkins() {
  return (
    <>
      <CategoryHero
        eyebrow="Towels & Napkins Exports"
        title={<>Woven in India, <span className="italic text-saffron-dark">plated in your kitchen.</span></>}
        intro="Our textile division supplies cotton kitchen towels, tea towels, napkins and aprons to retail chains, hospitality distributors and gifting brands — in neutral or private-label packaging."
        image={`${import.meta.env.BASE_URL}towels-napkins.jpg`}
        highlights={[
          { label: 'Fibre', value: '100% Cotton' },
          { label: 'MOQ', value: '0 pcs' },
          { label: 'Compliance', value: 'OEKO-TEX' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Catalogue</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-8">Featured SKUs</h2>
        <CatalogGrid items={items} accent="terra" />
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { t: 'Weaves', d: 'Terry, waffle, herringbone, jacquard, plain — in solids, yarn-dyes, stripes and rotary prints.' },
            { t: 'Finishing', d: 'Hemmed, mitred corners, hanging loops, embroidered logos and satin bands.' },
            { t: 'Packing', d: 'Poly-bagged with printed insert, gift boxes, hangtags, retail-ready barcodes.' },
          ].map(x=>(
            <div key={x.t} className="bg-cream-dark/50 border border-forest/10 rounded-2xl p-6">
              <h3 className="font-display text-xl text-forest-deep font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
