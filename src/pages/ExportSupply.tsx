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

const orderCheckpoints = [
  'Identify the seller of record, buyer and responsible exporter',
  'Agree product specifications, sample approval and acceptance criteria',
  'Record price, currency, payment schedule and applicable taxes or charges',
  'Confirm the named place, delivery responsibilities and chosen Incoterm',
  'List required inspection, insurance, documents and shipment updates',
];

export default function ExportSupply() {
  return (
    <>
      <CategoryHero
        eyebrow="Export Supply & Coordination"
        title={
          <>
            India-side sourcing support.
            <span className="italic text-saffron-dark">
              {' '}Scope confirmed for each order.
            </span>
          </>
        }
        intro="Savita Global reviews international sourcing enquiries for selected Indian products. A proposed order can proceed only after the supplier, product details, applicable registrations, destination rules, documentation, commercial terms and service-provider scope have been checked for that transaction."
        image={`${import.meta.env.BASE_URL}export-supply.jpg`}
        highlights={[
          { label: 'Service', value: 'Sourcing & Coordination' },
          { label: 'Trade Terms', value: 'As Agreed' },
          { label: 'Timeline', value: 'Confirmed Per Order' },
        ]}
      />

      {/* Export services */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <p className="leaf-divider mb-3">Potential coordination scope</p>

        <h2 className="mb-4 font-display text-3xl font-semibold text-forest-deep lg:text-4xl">
          Practical steps, agreed product by product.
        </h2>

        <p className="mb-10 max-w-3xl leading-relaxed text-ink/70">
          The items below describe areas that may need coordination in a suitable transaction. They are not a promise that every service, route, certificate or delivery term is available for every product or order.
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
              A clear scope before a shipment is promised.
            </h2>

            <p className="mt-5 leading-relaxed text-cream/75">
              We can assess supplier communication, product requirements, logistics and shipment-document needs for a proposed transaction. The seller of record, exporter, party responsible for each document, payment arrangements and logistics scope must be identified and agreed in writing before an order is accepted.
            </p>
          </div>

          <ul className="space-y-3">
            {orderCheckpoints.map((item) => (
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

      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-10">
        <div className="rounded-2xl border border-saffron/40 bg-saffron/10 p-5 text-sm leading-relaxed text-ink/75">
          <strong className="text-forest-deep">Important for international buyers:</strong> This page describes enquiry-stage coordination. It is not confirmation that a specific product is export-ready, that Savita Global holds every required registration, or that a particular certificate or freight service is available. Export execution is considered only after applicable legal registrations, product eligibility, supplier documents, destination requirements and the written commercial arrangement are verified.
        </div>
      </section>
      <CTA />
    </>
  );
}