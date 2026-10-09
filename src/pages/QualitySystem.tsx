import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';
import {
  ShieldCheck,
  Beaker,
  ClipboardList,
  Award,
  ScanSearch,
  LineChart,
} from 'lucide-react';

export default function QualitySystem() {
  useEffect(() => {
    document.title =
      'Product Quality & Documentation | Savita Global';

    const description =
      'Learn about Savita Global Private Limited’s approach to product specifications, supplier documentation, quality checks and export requirements for food products and textiles sourced from India. Documents and certifications are subject to product and supplier verification.';

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    const previousDescription = meta?.content ?? '';

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    meta.content = description;

    return () => {
      document.title =
        'Savita Global Private Limited | Dehydrated Food & Export Supplier India';

      if (meta) {
        meta.content = previousDescription;
      }
    };
  }, []);

  const principles = [
    {
      icon: ClipboardList,
      title: 'Product Specifications',
      description:
        'Identify relevant product requirements, such as dimensions, grade, moisture, mesh size, fibre composition or packaging, depending on the product.',
    },
    {
      icon: ScanSearch,
      title: 'Supplier Verification',
      description:
        'Review available supplier information and confirm product details before making commitments to a buyer.',
    },
    {
      icon: Beaker,
      title: 'Testing & Analysis',
      description:
        'Discuss relevant laboratory testing and product analysis. Test reports depend on product availability, supplier records and agreed requirements.',
    },
    {
      icon: LineChart,
      title: 'Documentation Review',
      description:
        'Identify the product documents, declarations and test reports required for the transaction and destination market.',
    },
    {
      icon: ShieldCheck,
      title: 'Product Traceability',
      description:
        'Ask suppliers about available lot identification, origin records and traceability documents for the selected product.',
    },
    {
      icon: Award,
      title: 'Buyer Requirements',
      description:
        'Review applicable quality criteria, packaging requirements and certification needs with the buyer and supplier before order confirmation.',
    },
  ];

  const documents = [
    {
      title: 'Product Specification',
      description:
        'Agreed product description, grade, dimensions and relevant technical parameters.',
    },
    {
      title: 'Test Reports',
      description:
        'Available laboratory reports relevant to the product and buyer requirements.',
    },
    {
      title: 'Origin & Traceability',
      description:
        'Supplier origin information and applicable traceability records, where available.',
    },
    {
      title: 'Export Documentation',
      description:
        'Applicable export and shipping documents, subject to the product, destination and transaction.',
    },
    {
      title: 'Certifications',
      description:
        'Relevant, valid supplier or product certificates, where applicable and independently verified.',
    },
    {
      title: 'Packaging & Labelling',
      description:
        'Product labels, packaging details and destination-market requirements agreed for the order.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Quality & Documentation"
        title={
          <>
            Clear specifications.
            <span className="italic text-saffron">
              {' '}Informed decisions.
            </span>
          </>
        }
        intro="Savita Global Private Limited takes a specification-led approach to sourcing and supply. We work to understand buyer requirements, review available supplier documentation and clarify relevant quality, testing, packaging and destination-market requirements before an order is confirmed."
        image={`${import.meta.env.BASE_URL}quality.jpg`}
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <p className="leaf-divider mb-3">Our Approach</p>

        <h2 className="font-display text-3xl lg:text-4xl text-forest-deep font-semibold mb-4">
          Quality requirements depend on the product.
        </h2>

        <p className="text-sm text-ink/70 leading-relaxed max-w-3xl mb-10">
          Food ingredients and textile products have different
          specifications, testing needs and compliance requirements.
          We aim to clarify the relevant requirements with buyers
          and suppliers rather than make blanket quality or
          certification claims.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-cream border border-forest/10 rounded-2xl p-6"
            >
              <Icon className="text-saffron-dark" size={26} />

              <h3 className="font-display text-xl text-forest-deep font-semibold mt-4">
                {title}
              </h3>

              <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest text-cream py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className="leaf-divider !text-saffron mb-4">
            Documentation
          </p>

          <h2 className="font-display text-3xl lg:text-4xl font-semibold">
            The right documents for each enquiry.
          </h2>

          <p className="mt-4 text-cream/75 text-sm leading-relaxed max-w-3xl">
            Documentation varies by product, supplier, destination
            market and buyer requirements. We can discuss which
            documents are available and which may be required
            before a transaction proceeds.
          </p>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((document) => (
              <div
                key={document.title}
                className="border border-cream/15 rounded-2xl p-5"
              >
                <h3 className="font-display text-xl text-saffron font-semibold">
                  {document.title}
                </h3>

                <p className="mt-2 text-cream/75 text-sm leading-relaxed">
                  {document.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-cream/70 text-sm max-w-3xl leading-relaxed">
            Certifications, laboratory reports, inspections and
            other documents are not implied to be held by Savita
            Global. Availability and validity must be confirmed
            for the specific product and supplier. Applicable
            legal and destination-market requirements should be
            verified before shipment.
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}