import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';
import { Sprout, Handshake, Compass, Award } from 'lucide-react';

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Savita Global"
        title={<>Rooted in Solapur.<br/><span className="italic text-saffron">Reaching every port.</span></>}
        intro="Savita Global Private Limited is an Indian export house working across post-harvest management and food processing. We consult, process, market and execute turnkey supply projects for buyers around the world."
        image="/catalog/hero-farm.jpg"
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <p className="leaf-divider mb-4">Our Story</p>
          <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold leading-tight">A family of agronomists, food technologists and export managers.</h2>
          <div className="prose prose-lg text-ink/75 leading-relaxed mt-6 space-y-4">
            <p>Savita Global was incorporated to bring together three specialisations that rarely sit under one roof — <strong className="text-forest-deep">post-harvest agronomy</strong>, <strong className="text-forest-deep">food processing engineering</strong>, and <strong className="text-forest-deep">international trade compliance</strong>.</p>
            <p>Our team began by consulting on turnkey food-processing projects across Maharashtra and Karnataka. Over time, buyers who trusted our advice asked us to supply the product itself. Today we operate a modern dehydration plant in Solapur and consolidate exports across six product divisions — dehydrated vegetables, dehydrated fruits, value-added snacks, bulk food ingredients, export supply services, and cotton towels & napkins.</p>
            <p>We keep the company small, senior and hands-on. Every enquiry is answered by someone who has personally walked a farm or supervised a shipment.</p>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="bg-forest text-cream rounded-2xl p-8">
            <p className="leaf-divider !text-saffron mb-4">At a glance</p>
            <dl className="space-y-4 text-sm">
              {[
                ['Incorporated', 'Under the Companies Act'],
                ['Head office', 'P no.43 Balaji Vilas, Akkalkot Road, Gandhi Nagar, Solapur, MH'],
                ['Business', 'Food processing & export'],
                ['Divisions', '6 product verticals'],
                ['Certifications', 'FSSAI • APEDA • IEC • HACCP'],
                ['Export markets', 'GCC, EU, ASEAN, USA, Africa'],
              ].map(([k,v]) => (
                <div key={k} className="flex justify-between border-b border-cream/10 pb-3">
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
          <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold leading-tight max-w-3xl">Four principles that decide every batch we ship.</h2>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sprout, title: 'Traceable at source', text: 'Every lot is linked to a farmer group or mandi contract — we can show the paper trail.' },
              { icon: Compass, title: 'Buyer-first specs', text: 'We work to your spec sheet, not ours — including private-label packing.' },
              { icon: Handshake, title: 'Long-term contracts', text: 'Most of our buyers have been with us for 5+ years. We price to keep them.' },
              { icon: Award, title: 'Compliance obsession', text: 'FSSAI, APEDA, HACCP, ISO 22000 — paperwork perfect at every port.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-cream rounded-2xl p-6 border border-forest/10">
                <Icon className="text-saffron-dark" size={26} />
                <h3 className="font-display text-xl text-forest-deep font-semibold mt-4">{title}</h3>
                <p className="text-sm text-ink/70 mt-2 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src="/catalog/quality.jpg" alt="" className="rounded-3xl w-full aspect-[4/3] object-cover" />
          <div>
            <p className="leaf-divider mb-5">Production → Export</p>
            <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold leading-tight">A rare combination — we can build the plant <span className="italic text-saffron-dark">and</span> supply from it.</h2>
            <p className="mt-5 text-ink/70 leading-relaxed">Some of our buyers came to us for machinery selection. Others simply want reliable containers of dehydrated onion or turmeric each month. Savita Global handles both mandates with the same discipline.</p>
            <p className="mt-4 text-ink/70 leading-relaxed">Because we've built the plants, we understand exactly what goes into your finished product.</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
