import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';
import { Sprout, Handshake, Compass, Award } from 'lucide-react';

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Savita Global"
        title={
          <>
            Rooted in Solapur.
            <br />
            <span className="italic text-saffron">
              Connecting with the world.
            </span>
          </>
        }
        intro="Savita Global Private Limited is an India-based company focused on sourcing and supplying agricultural products, dehydrated food ingredients, value-added snacks, towels and napkins for domestic and international buyers."
        image={`${import.meta.env.BASE_URL}hero-farm.jpg`}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <p className="leaf-divider mb-4">Our Story</p>

          <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold leading-tight">
            Connecting Indian products with global buyers.
          </h2>

          <div className="prose prose-lg text-ink/75 leading-relaxed mt-6 space-y-4">
            <p>
              Savita Global Private Limited was established with a vision
              to bring Indian products closer to domestic and international
              markets. Our focus combines agricultural sourcing, food
              ingredients, value-added products and textile essentials.
            </p>

            <p>
              Our product interests include dehydrated vegetables,
              dehydrated fruits, value-added snacks, bulk food ingredients,
              export supply services, and cotton towels and napkins.
              We work to understand buyer requirements and explore suitable
              sourcing, specifications and packaging options.
            </p>

            <p>
              As we grow, our priority is to build dependable supplier
              relationships, communicate transparently with buyers and
              coordinate supply arrangements according to product,
              quantity, quality requirements and destination market.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="bg-forest text-cream rounded-2xl p-8">
            <p className="leaf-divider !text-saffron mb-4">At a glance</p>

            <dl className="space-y-4 text-sm">
              {[
                ['Company', 'Private Limited Company'],
                ['Head office', 'Solapur, Maharashtra, India'],
                ['Business', 'Product sourcing & supply'],
                ['Product categories', 'Food products & textiles'],
                ['Markets', 'Domestic & international'],
                ['Enquiries', 'B2B & export enquiries'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-cream/10 pb-3"
                >
                  <dt className="text-cream/60">{k}</dt>
                  <dd className="font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      <section className="bg-cream-dark/40 py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className="leaf-divider mb-5">What we stand for</p>

          <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold leading-tight max-w-3xl">
            Four principles that guide every business relationship.
          </h2>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sprout,
                title: 'Responsible Sourcing',
                text: 'Explore suitable Indian suppliers and sourcing options based on product and buyer requirements.',
              },
              {
                icon: Compass,
                title: 'Buyer-Focused Specs',
                text: 'Understand product specifications, packaging preferences, quantities and destination requirements.',
              },
              {
                icon: Handshake,
                title: 'Reliable Partnerships',
                text: 'Build long-term relationships through clear communication, realistic commitments and follow-through.',
              },
              {
                icon: Award,
                title: 'Quality Awareness',
                text: 'Discuss relevant product specifications, quality checks and documentation with suppliers for each order.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-cream rounded-2xl p-6 border border-forest/10"
              >
                <Icon className="text-saffron-dark" size={26} />

                <h3 className="font-display text-xl text-forest-deep font-semibold mt-4">
                  {title}
                </h3>

                <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={`${import.meta.env.BASE_URL}quality.jpg`}
            alt="Product sourcing and quality-focused supply"
            className="rounded-3xl w-full aspect-[4/3] object-cover"
          />

          <div>
            <p className="leaf-divider mb-5">From India to Buyers</p>

            <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold leading-tight">
              The right products.
              <span className="italic text-saffron-dark">
                {' '}Clear requirements.
              </span>
            </h2>

            <p className="mt-5 text-ink/70 leading-relaxed">
              Every buyer has different requirements for product form,
              specifications, quantity, packaging and destination.
              Savita Global works to understand those needs and explore
              suitable sourcing and supply options.
            </p>

            <p className="mt-4 text-ink/70 leading-relaxed">
              Our aim is to develop dependable business relationships
              through transparent communication, careful coordination
              and a commitment to agreed requirements.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}