import CategoryHero from '../components/CategoryHero';
import CTA from '../components/CTA';
import {
  Ship,
  FileText,
  Boxes,
  ClipboardCheck,
  Truck,
  Package,
} from 'lucide-react';

const pillars = [
  {
    icon: Boxes,
    t: 'Sourcing & Consolidation',
    d: 'Coordinate sourcing from Indian suppliers and consolidate compatible products, subject to availability, product specifications and shipment feasibility.',
  },
  {
    icon: Package,
    t: 'Contract Packing',
    d: 'Explore bulk, neutral or private-label packaging options based on product specifications, minimum order quantities and approved artwork.',
  },
  {
    icon: ClipboardCheck,
    t: 'Pre-Shipment Quality Checks',
    d: 'Coordinate quality inspections and testing through suitable third-party providers when requested and agreed for the order.',
  },
  {
    icon: FileText,
    t: 'Export Documentation',
    d: 'Coordinate commercial invoices, packing lists, shipping documents and applicable certificates according to product, shipment and destination requirements.',
  },
  {
    icon: Truck,
    t: 'Inland Logistics',
    d: 'Coordinate transport from supplier facilities to the selected port or cargo terminal, subject to cargo handling and temperature requirements.',
  },
  {
    icon: Ship,
    t: 'Ocean & Air Freight',
    d: 'Explore sea and air freight options based on cargo specifications, destination, schedules and carrier availability.',
  },
];

const serviceCommitments = [
  'Payment terms agreed and documented before order confirmation',
  'Inspection coordination through a mutually agreed provider',
  'Cargo insurance options discussed according to the shipment and agreed Incoterms',
  'Export documentation coordinated according to applicable requirements',
  'Post-shipment communication and claim coordination under agreed order terms',
];

export default function ExportSupply() {
  return (
    <>
      <CategoryHero
        eyebrow="Export Supply & Coordination"
        title={
          <>
            One partner,{' '}
            <span className="italic text-saffron-dark">
              coordinated from India to your port.
            </span>
          </>
        }
        intro="Savita Global helps international buyers coordinate sourcing, packaging and shipment planning for selected Indian products. Every enquiry is reviewed according to product availability, buyer requirements, destination regulations and agreed order terms."
        image="/catalog/export-supply.jpg"
        highlights={[
          { label: 'Service', value: 'Sourcing & Coordination' },
          { label: 'Trade Terms', value: 'As Agreed' },
          { label: 'Timeline', value: 'Confirmed Per Order' },
        ]}
      />

      {/* Export services */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <p className="leaf-divider mb-3">Our Services</p>

        <h2 className="mb-4 font-display text-3xl font-semibold text-forest-deep lg:text-4xl">
          A coordinated export service.
        </h2>

        <p className="mb-10 max-w-3xl leading-relaxed text-ink/70">
          From supplier coordination to shipment planning, we work to simplify
          the India-side process for buyers seeking suitable products and
          reliable communication.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, t, d }) => (
            <article
              key={t}
              className="rounded-2xl border border-forest/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-saffron">
                <Icon size={20} />
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-forest-deep">
                {t}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {d}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Buyer confidence section */}
      <section className="bg-forest py-16 text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="leaf-divider mb-3 !text-saffron">
              Working With Savita Global
            </p>

            <h2 className="font-display text-3xl font-semibold leading-tight lg:text-4xl">
              One point of contact. Clear shipment planning.
            </h2>

            <p className="mt-5 leading-relaxed text-cream/75">
              We aim to make international sourcing easier by coordinating
              supplier communication, product requirements, logistics and
              applicable shipment documentation. Scope, pricing, payment
              terms and timelines are confirmed before an order is accepted.
            </p>
          </div>

          <ul className="space-y-3">
            {serviceCommitments.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-cream/10 bg-forest-dark/40 p-4 transition-colors hover:border-saffron/40"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-saffron"
                >
                  ✦
                </span>

                <span className="leading-relaxed text-cream/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Freight information */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-forest/10 text-forest">
              <Ship size={21} />
            </div>

            <h3 className="font-display text-xl font-semibold text-forest-deep">
              Sea Freight Coordination
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Sea freight options may be explored through ports such as
              Jawaharlal Nehru Port (JNPA), Mundra and Chennai, depending on
              cargo origin, destination, carrier schedules and availability.
              Full-container and less-than-container options are subject to
              shipment requirements.
            </p>
          </article>

          <article className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-saffron/15 text-saffron-dark">
              <Truck size={21} />
            </div>

            <h3 className="font-display text-xl font-semibold text-forest-deep">
              Air Freight & Inland Transport
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Air freight and inland transport options can be reviewed
              separately according to cargo dimensions, weight, handling
              requirements, destination and available service providers.
            </p>
          </article>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-ink/60">
          All services are subject to supplier confirmation, applicable
          licences and registrations, destination-country regulations,
          service-provider availability and written agreement. Certificates
          and inspections are arranged only where applicable and available
          from the relevant authorised providers or authorities.
        </p>
      </section>

      <CTA />
    </>
  );
}