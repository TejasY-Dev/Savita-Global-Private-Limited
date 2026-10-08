import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-cream/85 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Savita Global Logo"
              className="h-10 w-auto object-contain rounded-full"
            />
            <span className="font-display text-2xl text-cream">Savita Global</span>
          </div>
          <p className="text-sm leading-relaxed text-cream/70">From Indian farms to global markets — a trusted export partner for dehydrated foods, bulk ingredients and textile allied goods.</p>
        </div>

        <div>
          <h4 className="font-display text-lg text-saffron mb-4">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dehydrated-vegetables" className="hover:text-saffron">Dehydrated Vegetables</Link></li>
            <li><Link to="/dehydrated-fruits" className="hover:text-saffron">Dehydrated Fruits</Link></li>
            <li><Link to="/value-added-snacks" className="hover:text-saffron">Value-Added Snacks</Link></li>
            {/* <li><Link to="/bulk-food-ingredients" className="hover:text-saffron">Bulk Food Ingredients</Link></li> */}
            <li><Link to="/towels-napkins" className="hover:text-saffron">Towels & Napkins</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-saffron mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-saffron">About Savita Global</Link></li>
            <li><Link to="/quality-system" className="hover:text-saffron">Quality System</Link></li>
            {/* <li><Link to="/export-process" className="hover:text-saffron">Export Process</Link></li> */}
            {/* <li><Link to="/export-supply" className="hover:text-saffron">Export Supply</Link></li> */}
            <li><Link to="/contact" className="hover:text-saffron">B2B Enquiry</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-saffron mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 text-saffron flex-shrink-0" /><span>Plot no.43 Balaji Vilas, Akkalkot Road, Gandhi Nagar, Solapur, <br/>Maharashtra 413005, India</span></li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 text-saffron" /><a href="tel:+912179228500" className="hover:text-saffron">+91 9373569357</a></li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 text-saffron" /><a href="mailto:exports@savitaglobal.in" className="hover:text-saffron">savitaglobalindia@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/50">
        <p>© {new Date().getFullYear()} Savita Global Private Limited. All rights reserved.</p>
        <p>U10302PN2026PTC259532 • FSSAI, APEDA & IEC certified</p>
      </div>
    </footer>
  );
}
