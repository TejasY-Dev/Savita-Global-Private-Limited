import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from 'lucide-react';

const products = ['Dehydrated Vegetables','Dehydrated Fruits','Value-Added Snacks','Bulk Food Ingredients','Export Supply Services','Towels & Napkins','Other / Mixed'];
const incoterms = ['FOB','CFR','CIF','DDP','EXW','Not sure yet'];

export default function Contact() {
  const [form, setForm] = useState({
    company: '', name: '', email: '', phone: '',
    country: '', product: products[0], incoterm: incoterms[0],
    quantity: '', message: '',
  });
  const [status, setStatus] = useState<'idle'|'sending'|'done'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending'); setErrorMsg('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(()=>({error:'Failed'}));
        throw new Error(j.error || 'Failed to submit');
      }
      setStatus('done');
      setForm({ company:'',name:'',email:'',phone:'',country:'',product:products[0],incoterm:incoterms[0],quantity:'',message:''});
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="B2B Enquiry / Contact"
        title={<>Let's talk about your <span className="italic text-saffron">next container.</span></>}
        intro="Share your requirement below and our export desk will revert with a formal quotation within one working day."
        image={`${import.meta.env.BASE_URL}export-supply.jpg`}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="leaf-divider mb-3">Head Office</p>
            <p className="font-display text-2xl text-forest-deep font-semibold leading-snug">Savita Global Private Limited</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="text-saffron-dark mt-0.5" /><span>P no.43 Balaji Vilas, Akkalkot Road, Gandhi Nagar, Solapur, MH</span></li>
              <li className="flex gap-3"><Phone size={18} className="text-saffron-dark mt-0.5" /><a href="tel:+912179228500" className="hover:text-saffron-dark">+91 9373569357</a></li>
              <li className="flex gap-3"><Mail size={18} className="text-saffron-dark mt-0.5" /><a href="mailto:exports@savitaglobal.in" className="hover:text-saffron-dark">savitaglobalindia@gmail.com</a></li>
            </ul>
          </div>

          <div className="bg-cream-dark/50 border border-forest/10 rounded-2xl p-6">
            <p className="leaf-divider mb-3">Response SLA</p>
            <p className="text-sm text-ink/75 leading-relaxed">Enquiries received before 15:00 IST are quoted the same working day. All other enquiries are answered by 12:00 IST next working day.</p>
          </div>

          <div className="bg-forest text-cream rounded-2xl p-6">
            <p className="leaf-divider !text-saffron mb-3">Ports served</p>
            <p className="text-sm text-cream/80 leading-relaxed">JNPT Nhava Sheva • Mundra • Chennai • Kolkata • Cochin — with regular sailings to GCC, EU, ASEAN, USA and East Africa.</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={submit} className="bg-cream border border-forest/15 rounded-3xl p-6 lg:p-10 shadow-sm space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Company" required><input required value={form.company} onChange={set('company')} className={inp}/></Field>
              <Field label="Your name" required><input required value={form.name} onChange={set('name')} className={inp}/></Field>
              <Field label="Email" required><input required type="email" value={form.email} onChange={set('email')} className={inp}/></Field>
              <Field label="Phone / WhatsApp"><input value={form.phone} onChange={set('phone')} className={inp}/></Field>
              <Field label="Destination country" required><input required value={form.country} onChange={set('country')} className={inp} placeholder="e.g. United Arab Emirates"/></Field>
              <Field label="Approx. quantity"><input value={form.quantity} onChange={set('quantity')} className={inp} placeholder="e.g. 1 x 20' FCL"/></Field>
              <Field label="Product division"><select value={form.product} onChange={set('product')} className={inp}>{products.map(p=><option key={p}>{p}</option>)}</select></Field>
              <Field label="Preferred incoterm"><select value={form.incoterm} onChange={set('incoterm')} className={inp}>{incoterms.map(p=><option key={p}>{p}</option>)}</select></Field>
            </div>
            <Field label="Message" required>
              <textarea required rows={5} value={form.message} onChange={set('message')} className={inp} placeholder="SKU list, spec details, target price, expected shipment window…"/>
            </Field>

            {status === 'error' && <p className="text-sm text-terra bg-terra/10 border border-terra/30 rounded-lg px-4 py-3">{errorMsg}</p>}

            {status === 'done' ? (
              <div className="flex items-center gap-3 bg-forest/10 border border-forest/20 text-forest-deep rounded-xl px-5 py-4">
                <CheckCircle2 size={22} className="text-forest" />
                <div>
                  <p className="font-semibold">Enquiry received.</p>
                  <p className="text-sm text-ink/70">Our export desk will revert within one working day.</p>
                </div>
              </div>
            ) : (
              <button type="submit" disabled={status==='sending'} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-cream px-8 py-3.5 rounded-full font-semibold hover:bg-forest-dark disabled:opacity-60">
                {status==='sending' && <Loader2 size={16} className="animate-spin" />}
                {status==='sending' ? 'Sending…' : 'Send B2B Enquiry'}
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

const inp = 'w-full bg-cream-dark/40 border border-forest/15 rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-forest focus:bg-cream transition-colors';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-mute">{label}{required && <span className="text-terra ml-1">*</span>}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
