import CategoryHero from '../components/CategoryHero';
import CTA from '../components/CTA';
import { Ship, FileText, Boxes, ClipboardCheck, Truck, Package } from 'lucide-react';

const pillars = [
  { icon: Boxes, t: 'Sourcing & Consolidation', d: 'Mixed-category FCLs, milk-run pickups from vetted vendors, single-vendor invoicing.' },
  { icon: Package, t: 'Contract Packing', d: 'Neutral, private-label or your artwork — including retail pouches and shrink-wrapped cases.' },
  { icon: ClipboardCheck, t: 'Pre-Shipment QC', d: 'Third-party inspection (SGS, Cotecna, Intertek) coordinated at load port.' },
  { icon: FileText, t: 'Documentation Desk', d: 'BL, COO, phyto, health, halal, kosher, insurance — emailed within 24 hrs of B/L date.' },
  { icon: Truck, t: 'Inland Logistics', d: 'Factory to CFS movement on time, temperature-controlled where required.' },
  { icon: Ship, t: 'Ocean & Air Freight', d: 'FCL, LCL, reefer and air freight from JNPT, Mundra, Chennai and MAA.' },
];

export default function ExportSupply() {
  return (
    <>
      <CategoryHero
        eyebrow="Export Supply"
        title={<>One partner, <span className="italic text-saffron-dark">every step to your port.</span></>}
        intro="Beyond our own factory, Savita Global operates as an export house — sourcing, consolidating and shipping goods on behalf of importers who prefer a single Indian point of contact."
        image="/catalog/export-supply.jpg"
        highlights={[
          { label: 'Model', value: 'Merchant Export' },
          { label: 'Terms', value: 'FOB • CIF • DDP' },
          { label: 'Lead', value: '15–25 days' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Services</p>
        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-10">The full export desk.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map(({icon:Icon,t,d}) => (
            <div key={t} className="bg-cream border border-forest/10 rounded-2xl p-6 hover:border-forest/30 transition-colors">
              <div className="w-11 h-11 rounded-full bg-forest text-saffron grid place-items-center"><Icon size={20} /></div>
              <h3 className="font-display text-xl text-forest-deep font-semibold mt-4">{t}</h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest text-cream py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="leaf-divider !text-saffron mb-3">Merchant Export Advantage</p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold leading-tight">One invoice. One B/L. Zero surprises at your side.</h2>
            <p className="mt-5 text-cream/75 leading-relaxed">Instead of chasing five Indian vendors, work through Savita Global. We settle your entire India-side scope on one payment against a single set of shipping documents.</p>
          </div>
          <ul className="space-y-3">
            {['LC • T/T • D/P • D/A payment terms','Escrow-backed for first-time buyers','Third-party inspection reports before shipment','Insurance under CIF quotes','Post-shipment claim & warranty support'].map(x=>(
              <li key={x} className="flex gap-3 items-start bg-forest-dark/40 border border-cream/10 rounded-lg p-4">
                <span className="text-saffron">✦</span>{x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
