import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SiteMotion from './components/SiteMotion';
import { trackEvent } from './analytics';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import DehydratedVegetables from './pages/DehydratedVegetables';
import DehydratedFruits from './pages/DehydratedFruits';
import ValueAddedSnacks from './pages/ValueAddedSnacks';
import BulkFoodIngredients from './pages/BulkFoodIngredients';
import ExportSupply from './pages/ExportSupply';
import TowelsNapkins from './pages/TowelsNapkins';
import QualitySystem from './pages/QualitySystem';
import ExportProcess from './pages/ExportProcess';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AccountsDashboard from './pages/AccountsDashboard';
import BuyerGuides from './pages/BuyerGuides';
import PrivacyPolicy from './pages/PrivacyPolicy';

const SITE_URL = 'https://savita-global-private-limited-ten.vercel.app';
type SeoDetails = { title: string; description: string; image?: string; noindex?: boolean };

const PAGE_SEO: Record<string, SeoDetails> = {
  '/': {
    title: 'Savita Global Private Limited | Quality from India. Trusted Worldwide.',
    description: 'Explore Indian dehydrated vegetables, fruit products, snacks, bulk food ingredients, towels and napkins with Savita Global Private Limited. Share your product specification, quantity and destination for a B2B sourcing enquiry.',
    image: '/hero-farm.jpg',
  },
  '/about': {
    title: 'About Savita Global Private Limited | India-Based Sourcing',
    description: 'Company profile, legal identity and transparent sourcing model of Savita Global Private Limited, based in Solapur, Maharashtra. Learn what our product catalogue represents and what buyers should confirm before ordering.',
    image: '/hero-farm.jpg',
  },
  '/dehydrated-vegetables': {
    title: 'Dehydrated Vegetables from India | Savita Global',
    description: 'Explore sourcing options for onion flakes, onion powder, granules, tomato products, spinach powder and other dehydrated vegetable ingredients from India. Confirm specifications, packaging and availability by enquiry.',
    image: '/dehydrated-vegetables.jpg',
  },
  '/dehydrated-fruits': {
    title: 'Fruit Ingredients & Fruit-Based Products from India | Savita Global',
    description: 'Buyer information for mango powder, banana chips, banana powder, guava slices and amla candy. Review ingredient, process, allergen, shelf-life and packaging questions before requesting a supplier quotation.',
    image: '/dehydrated-fruits.jpg',
  },
  '/value-added-snacks': {
    title: 'Indian Snacks & Value-Added Food Products | Savita Global',
    description: 'Explore potential sourcing options for potato crisps, okra snacks, banana chips, jackfruit chips, vegetable snacks and fruit chips from India. Ingredients, format, packaging and availability require supplier confirmation.',
    image: '/value-added-snacks.jpg',
  },
  '/bulk-food-ingredients': {
    title: 'Bulk Food Ingredients & Spices from India | Savita Global',
    description: 'Explore bulk ingredient sourcing options for turmeric, red chilli, cumin seeds, green cardamom and other Indian ingredients. Confirm grade, origin, specifications, packaging and documentation for each enquiry.',
    image: '/bulk-food-ingredients.jpg',
  },
  '/export-supply': {
    title: 'Export Supply & Sourcing Coordination from India | Savita Global',
    description: 'Learn the possible steps in an India-side sourcing enquiry. Export execution, registrations, supplier documentation, freight scope and destination requirements are checked for each proposed transaction.',
    image: '/export-supply.jpg',
  },
  '/towels-napkins': {
    title: 'Cotton Towels & Napkins Sourcing from India | Savita Global',
    description: 'Explore kitchen towels, tea towels, napkins, aprons and home textile sourcing options from India. Discuss fabric composition, GSM, dimensions, finishing, packaging and quantities by enquiry.',
    image: '/towels-napkins.jpg',
  },
  '/quality-system': {
    title: 'Product Checks & Supplier Documents | Savita Global',
    description: 'Learn how product specifications, supplier records, lot details, testing and destination-market documents should be reviewed. No in-house laboratory or company-held certificate is implied.',
    image: '/quality.jpg',
  },
  '/export-process': {
    title: 'Export Process for B2B Buyers | Savita Global',
    description: 'Review the practical steps in a sourcing and export enquiry, from product requirements and quotation through packaging, applicable documentation and shipment planning.',
    image: '/export-supply.jpg',
  },
  '/contact': {
    title: 'Contact Savita Global | Domestic & International Business Enquiries',
    description: 'Contact Savita Global Private Limited in Solapur, Maharashtra for sourcing enquiries about dehydrated vegetables, fruit products, spices, snacks, towels and napkins. Share a product brief, quantity and delivery destination.',
    image: '/hero-farm.jpg',
  },
  '/buyer-guides': {
    title: 'B2B Buying Guides for Indian Food & Textile Products | Savita Global',
    description: 'Detailed buyer guidance for dehydrated vegetable ingredients, fruit products, bulk spices, snacks and towels. Learn how to write specifications, compare samples, define textile GSM and prepare an RFQ.',
    image: '/dehydrated-vegetables.jpg',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Savita Global Private Limited',
    description: 'Read how Savita Global Private Limited handles enquiry form details, website analytics, identifiers, cookies and advertising technologies on its website.',
    image: '/logo.png',
  },
  '/admin-login': { title: 'Admin Login | Savita Global', description: 'Restricted administration sign-in.', noindex: true },
  '/dashboard': { title: 'Admin Dashboard | Savita Global', description: 'Restricted administration dashboard.', noindex: true },
  '/accounts': { title: 'Accounts | Savita Global', description: 'Restricted business accounts workspace.', noindex: true },
};

function setMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.content = content;
}

function setPageMetadata(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const page = PAGE_SEO[normalizedPath] ?? PAGE_SEO['/'];
  const canonicalUrl = `${SITE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;
  const imageUrl = `${SITE_URL}${page.image ?? '/hero-farm.jpg'}`;

  document.title = page.title;
  setMeta('meta[name="description"]', () => {
    const meta = document.createElement('meta'); meta.name = 'description'; return meta;
  }, page.description);
  setMeta('meta[name="robots"]', () => {
    const meta = document.createElement('meta'); meta.name = 'robots'; return meta;
  }, page.noindex ? 'noindex, nofollow' : 'index, follow');
  setMeta('meta[property="og:title"]', () => {
    const meta = document.createElement('meta'); meta.setAttribute('property', 'og:title'); return meta;
  }, page.title);
  setMeta('meta[property="og:description"]', () => {
    const meta = document.createElement('meta'); meta.setAttribute('property', 'og:description'); return meta;
  }, page.description);
  setMeta('meta[property="og:url"]', () => {
    const meta = document.createElement('meta'); meta.setAttribute('property', 'og:url'); return meta;
  }, canonicalUrl);
  setMeta('meta[property="og:image"]', () => {
    const meta = document.createElement('meta'); meta.setAttribute('property', 'og:image'); return meta;
  }, imageUrl);
  setMeta('meta[name="twitter:card"]', () => {
    const meta = document.createElement('meta'); meta.name = 'twitter:card'; return meta;
  }, 'summary_large_image');
  setMeta('meta[name="twitter:title"]', () => {
    const meta = document.createElement('meta'); meta.name = 'twitter:title'; return meta;
  }, page.title);
  setMeta('meta[name="twitter:description"]', () => {
    const meta = document.createElement('meta'); meta.name = 'twitter:description'; return meta;
  }, page.description);

  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    setPageMetadata(location.pathname);
    trackEvent('page_view', { page: location.pathname });
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      <ScrollToTop />
      <PageViewTracker />
      <SiteMotion />
      <Navbar />
      <main className="page-stage flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dehydrated-vegetables" element={<DehydratedVegetables />} />
          <Route path="/dehydrated-fruits" element={<DehydratedFruits />} />
          <Route path="/value-added-snacks" element={<ValueAddedSnacks />} />
          <Route path="/bulk-food-ingredients" element={<BulkFoodIngredients />} />
          <Route path="/export-supply" element={<ExportSupply />} />
          <Route path="/towels-napkins" element={<TowelsNapkins />} />
          <Route path="/quality-system" element={<QualitySystem />} />
          <Route path="/export-process" element={<ExportProcess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buyer-guides" element={<BuyerGuides />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/accounts" element={<AccountsDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
