import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { trackEvent } from '../analytics';

const productLinks = [
  { to: '/dehydrated-vegetables', label: 'Dehydrated Vegetables' },
  { to: '/dehydrated-fruits', label: 'Fruit Ingredients & Products' },
  { to: '/value-added-snacks', label: 'Value-Added Snacks' },
  { to: '/bulk-food-ingredients', label: 'Bulk Food Ingredients' },
  { to: '/towels-napkins', label: 'Towels & Napkins' },
];

const mobileLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  ...productLinks,
  { to: '/quality-system', label: 'Product checks & documents' },
  { to: '/export-process', label: 'Export process' },
  { to: '/buyer-guides', label: 'Buyer guides' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const trackEnquiry = (element: string) => {
    trackEvent('b2b_enquiry_click', { element });
    setOpen(false);
  };

  return (
    <>
      <div className="sg-topbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-10">
          <p className="hidden sm:block">Quality from India. Trusted Worldwide.</p>
          <div className="sg-topbar__contacts">
            <a href="mailto:savitaglobalindia@gmail.com"><Mail size={13} /> savitaglobalindia@gmail.com</a>
            <a href="tel:+919373569357"><Phone size={13} /> +91 93735 69357</a>
            <span className="hidden xl:inline-flex"><MapPin size={13} /> Solapur, Maharashtra, India</span>
          </div>
        </div>
      </div>

      <header className="site-navbar sticky top-0 z-50 bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex h-[72px] items-center justify-between gap-5 lg:h-[86px]">
          <Link to="/" className="sg-brand group" aria-label="Savita Global home">
            <span className="sg-brand__logo-wrap"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="brand-mark" /></span>
            <span className="sg-brand__type"><strong>Savita <em>Global</em></strong><small>PRIVATE LIMITED</small></span>
          </Link>

          <nav className="sg-desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => `sg-nav-link ${isActive ? 'is-active' : ''}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `sg-nav-link ${isActive ? 'is-active' : ''}`}>About</NavLink>
            <div className="sg-nav-dropdown">
              <button className="sg-nav-link sg-nav-dropdown__trigger" type="button" aria-haspopup="true">
                Products <ChevronDown size={14} />
              </button>
              <div className="sg-nav-dropdown__menu">
                <span className="sg-nav-dropdown__label">Explore categories</span>
                {productLinks.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `sg-nav-dropdown__item ${isActive ? 'is-active' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
                <NavLink to="/export-supply" className="sg-nav-dropdown__item">Export supply services</NavLink>
              </div>
            </div>
            <NavLink to="/quality-system" className={({ isActive }) => `sg-nav-link ${isActive ? 'is-active' : ''}`}>Product checks</NavLink>
            <NavLink to="/export-process" className={({ isActive }) => `sg-nav-link ${isActive ? 'is-active' : ''}`}>Export process</NavLink>
            <NavLink to="/buyer-guides" className={({ isActive }) => `sg-nav-link ${isActive ? 'is-active' : ''}`}>Buyer guides</NavLink>
          </nav>

          <Link
            to="/contact"
            onClick={() => trackEnquiry('navbar_desktop_b2b_enquiry')}
            className="sg-nav-cta hidden lg:inline-flex"
          >
            Start an enquiry <span aria-hidden="true">↗</span>
          </Link>

          <button className="sg-menu-toggle lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {open && (
          <div className="sg-mobile-menu lg:hidden">
            <div className="sg-mobile-menu__links">
              {mobileLinks.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `sg-mobile-link ${isActive ? 'is-active' : ''}`}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <Link to="/contact" onClick={() => trackEnquiry('navbar_mobile_b2b_enquiry')} className="sg-nav-cta sg-nav-cta--mobile">Start a B2B enquiry <span aria-hidden="true">↗</span></Link>
            <div className="sg-mobile-menu__contact">
              <a href="tel:+919373569357"><Phone size={14} /> +91 93735 69357</a>
              <a href="mailto:savitaglobalindia@gmail.com"><Mail size={14} /> savitaglobalindia@gmail.com</a>
            </div>
          </div>
        )}
        </div>
      </header>
    </>
  );
}
