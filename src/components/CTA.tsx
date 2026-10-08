import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 my-20">
      <div className="relative overflow-hidden bg-forest-deep text-cream rounded-3xl p-10 lg:p-16">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-terra/20 blur-3xl" />

        <div className="relative grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <p className="leaf-divider !text-saffron mb-4">
              B2B & Export Enquiries
            </p>

            <h2 className="font-display text-3xl lg:text-5xl font-semibold leading-tight">
              Looking for{' '}
              <span className="italic text-saffron">
                dehydrated products from India?
              </span>
            </h2>

            <p className="mt-4 text-cream/70 max-w-xl">
              Share your product requirement, specification, quantity and
              destination. Our team can discuss sourcing, packaging and
              supply options for your market.
            </p>
          </div>

          <div className="lg:col-span-2 lg:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-saffron text-forest-deep px-8 py-4 rounded-full font-semibold hover:bg-cream transition-colors"
            >
              Request a B2B Quote <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}