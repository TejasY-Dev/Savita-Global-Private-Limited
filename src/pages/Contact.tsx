import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { trackEvent } from '../analytics';

const products = [
  'Dehydrated Vegetables',
  'Dehydrated Fruits',
  'Value-Added Snacks',
  'Bulk Food Ingredients',
  'Export Supply Services',
  'Towels & Napkins',
  'Other / Mixed',
];

const incoterms = [
  'FOB',
  'CFR',
  'CIF',
  'DDP',
  'EXW',
  'Not sure yet',
];

type FormState = {
  company: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  incoterm: string;
  quantity: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  company: '',
  name: '',
  email: '',
  phone: '',
  country: '',
  product: products[0],
  incoterm: incoterms[0],
  quantity: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);

  const [errors, setErrors] = useState<Errors>({});

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'done' | 'error'
  >('idle');

  const [errorMsg, setErrorMsg] = useState('');

  const [enquiryStarted, setEnquiryStarted] = useState(false);

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value;

      setForm((previous) => ({
        ...previous,
        [key]: value,
      }));

      // Clear field error when user starts correcting it
      setErrors((previous) => ({
        ...previous,
        [key]: '',
      }));

      if (status === 'error') {
        setStatus('idle');
        setErrorMsg('');
      }
    };

  const startEnquiry = () => {
    if (!enquiryStarted) {
      setEnquiryStarted(true);

      trackEvent('enquiry_started', {
        element: 'b2b_enquiry_form',
      });
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    // Company
    if (!form.company.trim()) {
      newErrors.company = 'Company name is required.';
    } else if (form.company.trim().length < 2) {
      newErrors.company = 'Please enter a valid company name.';
    }

    // Name
    if (!form.name.trim()) {
      newErrors.name = 'Your name is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.';
    } else if (!/^[A-Za-zÀ-ÿ\s.'-]+$/.test(form.name.trim())) {
      newErrors.name = 'Please enter a valid name.';
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone - optional
    if (form.phone.trim()) {
      const phoneDigits = form.phone.replace(/\D/g, '');

      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        newErrors.phone =
          'Please enter a valid phone or WhatsApp number.';
      }
    }

    // Country
    if (!form.country.trim()) {
      newErrors.country = 'Destination country is required.';
    } else if (form.country.trim().length < 2) {
      newErrors.country = 'Please enter a valid country.';
    }

    // Quantity - optional
    if (form.quantity.trim() && form.quantity.trim().length < 2) {
      newErrors.quantity = 'Please enter a valid quantity.';
    }

    // Product
    if (!products.includes(form.product)) {
      newErrors.product = 'Please select a valid product division.';
    }

    // Incoterm
    if (!incoterms.includes(form.incoterm)) {
      newErrors.incoterm = 'Please select a valid incoterm.';
    }

    // Message
    if (!form.message.trim()) {
      newErrors.message = 'Please tell us about your requirement.';
    } else if (form.message.trim().length < 20) {
      newErrors.message =
        'Please provide at least 20 characters about your requirement.';
    }

    return newErrors;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      setErrorMsg('');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          company: form.company.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country.trim(),
          quantity: form.quantity.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const j = await res
          .json()
          .catch(() => ({ error: 'Failed to submit enquiry' }));

        throw new Error(
          j.error || 'Failed to submit enquiry'
        );
      }

      setStatus('done');

      await trackEvent('enquiry_submitted', {
        element: 'b2b_enquiry_form',
        product: form.product,
      });

      setForm(initialForm);
      setErrors({});
      setEnquiryStarted(false);
    } catch (err) {
      setStatus('error');

      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="B2B Enquiry / Contact"
        title={
          <>
            Let's talk about your{' '}
            <span className="italic text-saffron">
              next container.
            </span>
          </>
        }
        intro="Share your requirement below and our export desk will revert with a formal quotation within one working day."
        image={`${import.meta.env.BASE_URL}export-supply.jpg`}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="leaf-divider mb-3">
              Head Office
            </p>

            <p className="font-display text-2xl text-forest-deep font-semibold leading-snug">
              Savita Global Private Limited
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin
                  size={18}
                  className="text-saffron-dark mt-0.5 shrink-0"
                />

                <span>
                  P no.43 Balaji Vilas, Akkalkot Road, Gandhi Nagar, Solapur, MH
                </span>
              </li>

              <li className="flex gap-3">
                <Phone
                  size={18}
                  className="text-saffron-dark mt-0.5 shrink-0"
                />

                <a
                  href="tel:+919373569357"
                  onClick={() =>
                    trackEvent('phone_click', {
                      element: 'contact_phone',
                    })
                  }
                  className="hover:text-saffron-dark transition-colors"
                >
                  +91 9373569357
                </a>
              </li>

              <li className="flex gap-3">
                <Mail
                  size={18}
                  className="text-saffron-dark mt-0.5 shrink-0"
                />

                <a
                  href="mailto:savitaglobalindia@gmail.com"
                  onClick={() =>
                    trackEvent('email_click', {
                      element: 'contact_email',
                    })
                  }
                  className="hover:text-saffron-dark transition-colors break-all"
                >
                  savitaglobalindia@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-cream-dark/50 border border-forest/10 rounded-2xl p-6">
            <p className="leaf-divider mb-3">
              Response SLA
            </p>

            <p className="text-sm text-ink/75 leading-relaxed">
              Enquiries received before 15:00 IST are quoted the same working day. All other enquiries are answered by 12:00 IST next working day.
            </p>
          </div>

          <div className="bg-forest text-cream rounded-2xl p-6">
            <p className="leaf-divider !text-saffron mb-3">
              Ports served
            </p>

            <p className="text-sm text-cream/80 leading-relaxed">
              JNPT Nhava Sheva • Mundra • Chennai • Kolkata • Cochin — with regular sailings to GCC, EU, ASEAN, USA and East Africa.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <form
            onSubmit={submit}
            onFocus={startEnquiry}
            noValidate
            className="bg-cream border border-forest/15 rounded-3xl p-6 lg:p-10 shadow-sm space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">

              <Field
                label="Company"
                required
                error={errors.company}
              >
                <input
                  required
                  autoComplete="organization"
                  value={form.company}
                  onChange={set('company')}
                  className={inputClass(!!errors.company)}
                  placeholder="Company name"
                />
              </Field>

              <Field
                label="Your name"
                required
                error={errors.name}
              >
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={set('name')}
                  className={inputClass(!!errors.name)}
                  placeholder="Your full name"
                />
              </Field>

              <Field
                label="Email"
                required
                error={errors.email}
              >
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set('email')}
                  className={inputClass(!!errors.email)}
                  placeholder="business@email.com"
                />
              </Field>

              <Field
                label="Phone / WhatsApp"
                error={errors.phone}
              >
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  className={inputClass(!!errors.phone)}
                  placeholder="+91..."
                />
              </Field>

              <Field
                label="Destination country"
                required
                error={errors.country}
              >
                <input
                  required
                  autoComplete="country-name"
                  value={form.country}
                  onChange={set('country')}
                  className={inputClass(!!errors.country)}
                  placeholder="e.g. United Arab Emirates"
                />
              </Field>

              <Field
                label="Approx. quantity"
                error={errors.quantity}
              >
                <input
                  value={form.quantity}
                  onChange={set('quantity')}
                  className={inputClass(!!errors.quantity)}
                  placeholder="e.g. 1 x 20' FCL"
                />
              </Field>

              <Field
                label="Product division"
                error={errors.product}
              >
                <select
                  value={form.product}
                  onChange={set('product')}
                  className={inputClass(!!errors.product)}
                >
                  {products.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Preferred incoterm"
                error={errors.incoterm}
              >
                <select
                  value={form.incoterm}
                  onChange={set('incoterm')}
                  className={inputClass(!!errors.incoterm)}
                >
                  {incoterms.map((incoterm) => (
                    <option key={incoterm} value={incoterm}>
                      {incoterm}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field
              label="Message"
              required
              error={errors.message}
            >
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set('message')}
                className={inputClass(!!errors.message)}
                placeholder="SKU list, specification details, target price, expected shipment window…"
              />
            </Field>

            {status === 'error' && (
              <p className="text-sm text-terra bg-terra/10 border border-terra/30 rounded-lg px-4 py-3">
                {errorMsg}
              </p>
            )}

            {status === 'done' ? (
              <div className="flex items-start gap-3 bg-forest/10 border border-forest/20 text-forest-deep rounded-xl px-5 py-4">
                <CheckCircle2
                  size={22}
                  className="text-forest mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-semibold">
                    Enquiry received.
                  </p>

                  <p className="text-sm text-ink/70">
                    Our export desk will revert within one working day.
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-cream px-8 py-3.5 rounded-full font-semibold hover:bg-forest-dark disabled:opacity-60 transition-colors"
              >
                {status === 'sending' && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {status === 'sending'
                  ? 'Sending…'
                  : 'Send B2B Enquiry'}
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

const baseInput =
  'w-full bg-cream-dark/40 border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:bg-cream transition-colors';

function inputClass(hasError: boolean) {
  return `${baseInput} ${
    hasError
      ? 'border-terra focus:border-terra'
      : 'border-forest/15 focus:border-forest'
  }`;
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-mute">
        {label}

        {required && (
          <span className="text-terra ml-1">
            *
          </span>
        )}
      </span>

      <div className="mt-1.5">
        {children}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-terra">
          {error}
        </p>
      )}
    </label>
  );
}