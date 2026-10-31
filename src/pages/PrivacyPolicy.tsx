import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const updated = '30 October 2026';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        eyebrow="Website Information"
        title={<>Privacy <span className="italic text-saffron">Policy.</span></>}
        intro="This page explains the types of information the Savita Global Private Limited website may process when you browse the site or submit a business enquiry. Please review it and contact us if you have a privacy question."
        image={`${import.meta.env.BASE_URL}hero-farm.jpg`}
      />

      <article className="mx-auto max-w-4xl px-5 py-12 lg:px-10">
        <p className="text-sm text-ink/60">Last updated: {updated}</p>
        <div className="mt-8 space-y-9 leading-relaxed text-ink/80">
          <section>
            <h2 className="font-display text-2xl font-semibold text-forest-deep">1. Who operates this website</h2>
            <p className="mt-3">This website is operated by Savita Global Private Limited, based in Solapur, Maharashtra, India. For privacy questions, contact <a className="font-semibold text-forest hover:underline" href="mailto:savitaglobalindia@gmail.com">savitaglobalindia@gmail.com</a>.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-forest-deep">2. Information you submit</h2>
            <p className="mt-3">If you use the B2B enquiry form, the information may include your company name, name, email address, phone number, destination country, product interest, preferred delivery term, quantity and message. Please do not submit passwords, financial account credentials or sensitive personal information through the enquiry form.</p>
            <p className="mt-3">We use enquiry details to review and respond to your request, discuss product sourcing and quotations, communicate about relevant business needs and maintain appropriate business records. Enquiry records are submitted to the website backend and stored in the company's Supabase database service. Information may be shared with a relevant supplier or service provider only where needed to evaluate or coordinate your enquiry, subject to the circumstances and applicable requirements.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-forest-deep">3. Website analytics</h2>
            <p className="mt-3">The website uses Google Analytics to understand broad website usage. The site also creates a random visitor identifier in browser local storage and sends events such as page views and enquiry interactions to the website's analytics endpoint. The events may include the page path, referrer and interaction label. Browser settings can clear or restrict local storage and cookies, though some site behaviour may then be affected.</p>
            <p className="mt-3">Analytics information is used to understand which pages are visited and how the enquiry journey performs; it should not be used to infer that an enquiry has been converted into a sale unless that outcome is separately recorded.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-forest-deep">4. Advertising and cookies</h2>
            <p className="mt-3">If advertising is enabled, Google AdSense and its advertising partners may use cookies or similar technologies to serve, measure or personalise ads, subject to their settings, applicable law and any consent requirements. Third-party providers process information under their own policies. Advertising may not be shown on every visit and the presence of an advertising script does not mean the site has been approved for ad serving.</p>
            <p className="mt-3">You can review Google's <a className="font-semibold text-forest hover:underline" href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">advertising and cookie information</a> and <a className="font-semibold text-forest hover:underline" href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">Google ad controls</a>. You can also manage cookies and local storage through your browser settings. Blocking some technologies may change site functionality.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-forest-deep">5. Sharing, security and retention</h2>
            <p className="mt-3">The website relies on hosting, analytics, form-processing and advertising services. These providers may process relevant technical or submitted information to operate their services. We aim to limit access to information to the extent reasonably required for website operation and business enquiries, but no online transmission or storage method can be guaranteed to be completely secure.</p>
            <p className="mt-3">We aim to retain enquiry and analytics records only for a legitimate business, operational, security or legal need and then delete or anonymise them where appropriate. Actual retention periods may depend on the nature of the enquiry and applicable obligations. Contact us to ask about information you have submitted or to request a correction, subject to applicable legal obligations.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-forest-deep">6. External websites and policy changes</h2>
            <p className="mt-3">Links to external websites are provided for reference. Their privacy practices are governed by their own terms. This policy may be updated as website functions, analytics, advertising or applicable requirements change. The date above identifies the latest stated revision.</p>
          </section>
          <section className="rounded-2xl border border-forest/10 bg-cream-dark/40 p-5">
            <h2 className="font-display text-xl font-semibold text-forest-deep">Questions about privacy?</h2>
            <p className="mt-2">Email <a className="font-semibold text-forest hover:underline" href="mailto:savitaglobalindia@gmail.com">savitaglobalindia@gmail.com</a> or use our <Link className="font-semibold text-forest hover:underline" to="/contact">contact page</Link>.</p>
            <p className="mt-3 text-xs text-ink/60">This page is a general website disclosure, not legal advice. Before relying on it for compliance, the company should confirm that it accurately reflects its data storage, service providers, retention practices, and any consent mechanism used for advertising.</p>
          </section>
        </div>
      </article>
    </>
  );
}
