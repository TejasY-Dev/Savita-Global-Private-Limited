import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';

const steps = [
  { n: '01', t: 'Enquiry & specification', d: 'You share SKU, quantity, spec and destination port. We revert with a formal quotation on FOB / CFR / CIF / DDP within 24 working hours.' },
  { n: '02', t: 'Sample dispatch', d: 'Physical samples couriered under DHL / FedEx along with COA. Buyer approval in writing before we proceed.' },
  { n: '03', t: 'Pro-forma invoice & PO', d: 'PI issued with commercial terms, incoterms, packing details and payment mode (LC / TT / D-P).' },
  { n: '04', t: 'Production planning', d: 'Raw material booked at farm gate, packaging materials pre-printed, production window locked with QA.' },
  { n: '05', t: 'Manufacturing & QC', d: 'Each batch passes in-house lab tests. Buyer-nominated third-party inspection welcomed at load port.' },
  { n: '06', t: 'Packing & palletisation', d: 'Neutral cartons or private-label — palletised, shrink-wrapped, corner-guarded for ocean freight.' },
  { n: '07', t: 'Fumigation & phyto', d: 'Fumigation done at CFS. Phyto-sanitary and origin certificates raised in parallel.' },
  { n: '08', t: 'Container stuffing', d: 'Factory-stuffed FCL under customs supervision. Photos and video shared with buyer.' },
  { n: '09', t: 'Documentation', d: 'B/L, invoice, packing list, COA, phyto, COO, insurance courier’d and emailed the day after sailing.' },
  { n: '10', t: 'Post-shipment support', d: 'Track & trace, arrival photos, claim handling and reorder planning — all through one account manager.' },
];

export default function ExportProcess() {
  return (
    <>
      <PageHeader
        eyebrow="Export Process"
        title={<>Ten steps.<br/><span className="italic text-saffron">Zero surprises.</span></>}
        intro="This is exactly what happens between your first enquiry and your container arriving at destination port — the same for every buyer, big or small."
        image={`${import.meta.env.BASE_URL}export-supply.jpg`}
      />

      <section className="max-w-4xl mx-auto px-5 lg:px-10 py-16">
        <ol className="relative border-l-2 border-forest/20 pl-8 space-y-10">
          {steps.map(s => (
            <li key={s.n} className="relative">
              <span className="absolute -left-[46px] top-0 w-12 h-12 rounded-full bg-forest text-saffron grid place-items-center font-display font-semibold">{s.n}</span>
              <h3 className="font-display text-2xl text-forest-deep font-semibold">{s.t}</h3>
              <p className="mt-2 text-ink/70 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream-dark/40 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid md:grid-cols-3 gap-8">
          {[
            {t:'Payment terms', d:'LC at sight, 50% advance + 50% against BL copy, or D/P through advising bank.'},
            {t:'Lead time', d:'15 days for stock SKUs. 25–35 days for made-to-order or private-label runs.'},
            {t:'Shipping ports', d:'JNPT (Nhava Sheva), Mundra, Chennai, Kolkata — whichever gives the best sailing.'},
          ].map(x=>(
            <div key={x.t}>
              <p className="leaf-divider mb-2">{x.t}</p>
              <p className="font-display text-xl text-forest-deep font-semibold">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
