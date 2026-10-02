import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';
import { ShieldCheck, Beaker, ClipboardList, Award, ScanSearch, LineChart } from 'lucide-react';

const certs = ['FSSAI', 'APEDA', 'IEC', 'HACCP', 'ISO 22000:2018', 'Spices Board', 'Halal (JAKIM)', 'Kosher'];

export default function QualitySystem() {
  return (
    <>
      <PageHeader
        eyebrow="Quality System"
        title={<>Written specs. <span className="italic text-saffron">Verified batches.</span></>}
        intro="Quality at Savita Global is not a slogan — it is a document. Every product is manufactured against a signed spec sheet, and every batch carries a Certificate of Analysis before it leaves the gate."
        image="/catalog/quality.jpg"
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: ClipboardList, t: 'Documented spec sheet', d: 'Each SKU has a signed spec: mesh, moisture, colour, microbial, heavy metals, pesticide residue.' },
            { icon: ScanSearch, t: 'Farm-gate acceptance', d: 'Raw material sampled at reception — rejected lots do not enter the factory.' },
            { icon: Beaker, t: 'In-house lab', d: 'Moisture analysers, colorimeters, sieve shakers and microbial incubator on premises.' },
            { icon: LineChart, t: 'Third-party validation', d: 'NABL-accredited labs certify each export batch — SGS / Intertek / Cotecna on buyer request.' },
            { icon: ShieldCheck, t: 'Traceable batch code', d: '13-character code lets us trace back to farmer, field, drying line and packer.' },
            { icon: Award, t: 'Non-conformance protocol', d: 'Any deviation triggers RCA, corrective action and buyer notification within 48 hrs.' },
          ].map(({icon:Icon,t,d}) => (
            <div key={t} className="bg-cream border border-forest/10 rounded-2xl p-6">
              <Icon className="text-saffron-dark" size={26} />
              <h3 className="font-display text-xl text-forest-deep font-semibold mt-4">{t}</h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest text-cream py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className="leaf-divider !text-saffron mb-4">Certifications</p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold">Compliance that clears every customs desk.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {certs.map(c => (
              <span key={c} className="px-5 py-2.5 border border-cream/25 rounded-full text-sm tracking-wide text-cream/90 hover:bg-cream/10">{c}</span>
            ))}
          </div>
          <p className="mt-6 text-cream/70 text-sm max-w-2xl">Certificate copies and lab test reports available on request under NDA. Buyer audits welcome with prior appointment.</p>
        </div>
      </section>

      <CTA />
    </>
  );
}
