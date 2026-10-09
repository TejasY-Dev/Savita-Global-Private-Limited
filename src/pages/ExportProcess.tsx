import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';

const steps = [
  {
    n: '01',
    t: 'Enquiry & specifications',
    d: 'Share the product, required quantity, specifications, packaging preferences and destination market. We review the enquiry and clarify the details needed for a quotation.',
  },
  {
    n: '02',
    t: 'Sample enquiry',
    d: 'Where samples are available, we can discuss sample requirements, courier arrangements, costs and expected timelines with the buyer.',
  },
  {
    n: '03',
    t: 'Quotation & order terms',
    d: 'The quotation can outline the agreed product specifications, quantity, pricing, packaging, applicable Incoterms, payment terms and quotation validity.',
  },
  {
    n: '04',
    t: 'Supplier & availability confirmation',
    d: 'Product availability, sourcing arrangements and production requirements are checked with the relevant supplier before order commitments are finalised.',
  },
  {
    n: '05',
    t: 'Quality requirements',
    d: 'Applicable quality parameters, inspection needs and testing documents are discussed in advance. Any testing or third-party inspection is subject to agreement and availability.',
  },
  {
    n: '06',
    t: 'Packing & labelling',
    d: 'Packaging, carton details, marking and private-label requirements can be discussed according to the product, destination-market rules and supplier capabilities.',
  },
  {
    n: '07',
    t: 'Export compliance',
    d: 'Required export, food-safety, phytosanitary or fumigation documents are identified according to the product and destination. Applicable documents depend on regulatory requirements.',
  },
  {
    n: '08',
    t: 'Dispatch planning',
    d: 'Shipment mode, freight arrangements, cargo handling and dispatch timelines are coordinated according to the order, supplier arrangements and buyer agreement.',
  },
  {
    n: '09',
    t: 'Shipping documentation',
    d: 'Applicable documents may include the commercial invoice, packing list, transport document and certificates required for the shipment. Document availability and timing are confirmed for each order.',
  },
  {
    n: '10',
    t: 'Shipment follow-up',
    d: 'After dispatch, available shipment updates and documentation can be shared with the buyer. Further support and repeat-order planning can be discussed as required.',
  },
];

const planningDetails = [
  {
    t: 'Payment terms',
    d: 'Payment arrangements are agreed between the buyer and seller before order confirmation.',
  },
  {
    t: 'Lead time',
    d: 'Delivery timelines depend on product availability, specifications, production needs, packaging and logistics.',
  },
  {
    t: 'Shipping arrangements',
    d: 'Port, freight mode and routing are selected according to cargo requirements, destination and the agreed shipping terms.',
  },
];

export default function ExportProcess() {
  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      'Export Process & Order Coordination | Savita Global';

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    const createdMeta = !meta;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    const previousDescription = meta.content;

    meta.content =
      'Explore Savita Global’s enquiry, sourcing, specification, packaging, documentation and shipment coordination process for buyers sourcing products from India.';

    return () => {
      document.title = previousTitle;

      if (meta) {
        if (createdMeta) {
          meta.remove();
        } else {
          meta.content = previousDescription;
        }
      }
    };
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Export Process"
        title={
          <>
            Clear steps.
            <br />
            <span className="italic text-saffron">
              Confirmed expectations.
            </span>
          </>
        }
        intro="From the first enquiry to shipment coordination, we work to clarify product requirements, commercial terms, documentation and logistics before an order proceeds. The exact process depends on the product and agreed order terms."
        image={`${import.meta.env.BASE_URL}export-supply.jpg`}
      />

      <section className="max-w-4xl mx-auto px-5 lg:px-10 py-16">
        <ol className="relative border-l-2 border-forest/20 pl-8 space-y-10">
          {steps.map((s) => (
            <li key={s.n} className="relative">
              <span className="absolute -left-[46px] top-0 w-12 h-12 rounded-full bg-forest text-saffron grid place-items-center font-display font-semibold">
                {s.n}
              </span>

              <h3 className="font-display text-2xl text-forest-deep font-semibold">
                {s.t}
              </h3>

              <p className="mt-2 text-ink/70 leading-relaxed">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream-dark/40 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid md:grid-cols-3 gap-8">
          {planningDetails.map((item) => (
            <div key={item.t}>
              <p className="leaf-divider mb-2">{item.t}</p>
              <p className="font-display text-xl text-forest-deep font-semibold">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}