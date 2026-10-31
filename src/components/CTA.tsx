import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="premium-cta max-w-7xl mx-auto px-5 lg:px-10 my-20 lg:my-28">
      <div className="premium-cta__panel relative overflow-hidden bg-forest-deep text-cream rounded-3xl p-8 sm:p-10 lg:p-16">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-terra/20 blur-3xl" />

        <div className="relative grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <p className="leaf-divider !text-saffron mb-4">
              Domestic & International Enquiries
            </p>

            <h2 className="font-display text-3xl lg:text-5xl font-semibold leading-tight">
              Looking for{' '}
              <span className="italic text-saffron">
                Indian food products or home textiles?
              </span>
            </h2>

            <p className="mt-4 text-cream/70 max-w-xl">
              Share the product, specification, quantity, packaging preference and
              destination. We can discuss suitable sourcing options for food
              products, towels and napkins, subject to supplier confirmation.
            </p>
          </div>

          <div className="lg:col-span-2 lg:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-saffron text-forest-deep px-8 py-4 rounded-full font-semibold hover:bg-cream transition-colors"
            >
              Discuss a B2B Requirement <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}