import CategoryHero from '../components/CategoryHero';
import CatalogGrid from '../components/CatalogGrid';
import CTA from '../components/CTA';

const items = [
  // { name: 'Mango Slices (Alphonso)', form: 'Cheek slices', moisture: '≤ 15%', packing: '5 kg carton' },
  { name: 'Mango Powder / Amchur', form: 'Fine powder', moisture: '≤ 8%', packing: '20 kg carton' },
  { name: 'Banana Chips (unsalted)', form: 'Round chips', moisture: '≤ 3%', packing: '10 kg carton' },
  { name: 'Banana Powder', form: 'Spray dried', moisture: '≤ 5%', packing: '20 kg carton' },
  // { name: 'Pineapple Dice', form: '10 mm dice', moisture: '≤ 15%', packing: '5 kg carton' },
  // { name: 'Papaya Cubes', form: '10 mm dice', moisture: '≤ 18%', packing: '5 kg carton' },
  // { name: 'Coconut Chips', form: 'Toasted, unsweetened', moisture: '≤ 3%', packing: '10 kg carton' },
  // { name: 'Coconut Milk Powder', form: 'Spray dried, 60% fat', moisture: '≤ 3%', packing: '25 kg bag' },
  { name: 'Guava Slices', form: 'Sliced', moisture: '≤ 15%', packing: '5 kg carton' },
  // { name: 'Fig Halves', form: 'Sun-dried', moisture: '≤ 20%', packing: '10 kg carton' },
  { name: 'Amla Candy', form: 'Sweetened cubes', moisture: '≤ 18%', packing: '10 kg carton' },
  // { name: 'Lemon Slices', form: 'Sliced 3 mm', moisture: '≤ 8%', packing: '10 kg carton' },
];

export default function DehydratedFruits() {
  return (
    <>
      <CategoryHero
        eyebrow="Dehydrated Fruits"
        title={<>Tropical sweetness, <span className="italic text-saffron-dark">shelf-stable.</span></>}
        intro="India's mango, coconut and banana belts are among the finest in the world. We convert them into powders, dices and slices ready for breakfast cereal makers, bakery pre-mixes and premium retail."
        image={`${import.meta.env.BASE_URL}dehydrated-fruits.jpg`}
        highlights={[
          { label: 'SKUs', value: '0+' },
          { label: 'Origin', value: '0' },
          { label: 'MOQ', value: '0 kg' },
        ]}
      />
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Catalogue</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-8">Featured SKUs</h2>
        <CatalogGrid items={items} accent="terra" />
      </section>
      <CTA />
    </>
  );
}
