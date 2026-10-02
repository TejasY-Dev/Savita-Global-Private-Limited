import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
{ to: '/', label: 'Home' },
{ to: '/about', label: 'About' },
{ to: '/dehydrated-vegetables', label: 'Dehydrated Vegetables' },
{ to: '/dehydrated-fruits', label: 'Dehydrated Fruits' },
{ to: '/value-added-snacks', label: 'Snacks' },
{ to: '/bulk-food-ingredients', label: 'Bulk Ingredients' },
{ to: '/towels-napkins', label: 'Towels & Napkins' },
{ to: '/quality-system', label: 'Quality' },
{ to: '/export-process', label: 'Process' },
];

export default function Navbar() {
const [open, setOpen] = useState(false);

return (
<header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-forest/10">
<div className="max-w-7xl mx-auto px-5 lg:px-10">
<div className="flex items-center justify-between h-16 lg:h-20">
<Link to="/" className="flex items-center gap-3 group">
<img
src={`${import.meta.env.BASE_URL}logo.png`}
alt="Savita Global Logo"
className="h-10 w-auto lg:h-12 object-contain rounded-full mix-blend-multiply"
/>
<span className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-forest-deep">
Savita <span className="italic text-saffron-dark">Global</span>
</span>
</Link>

      <nav className="hidden xl:flex items-center gap-1">  
        {links.map((l) => (  
          <NavLink  
            key={l.to}  
            to={l.to}  
            end={l.to === '/'}  
            className={({ isActive }) =>  
              `px-3 py-2 text-[13px] font-medium tracking-wide transition-colors rounded-full ${  
                isActive ? 'text-forest-deep bg-forest/10' : 'text-ink/70 hover:text-forest-deep'  
              }`  
            }  
          >  
            {l.label}  
          </NavLink>  
        ))}  
      </nav>

      <Link  
        to="/contact"  
        className="hidden xl:inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-forest-dark transition-colors"  
      >  
        B2B Enquiry  
      </Link>

      <button className="xl:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">  
        {open ? <X size={24} /> : <Menu size={24} />}  
      </button>  
    </div>

    {open && (  
      <div className="xl:hidden pb-5 border-t border-forest/10 pt-4 grid grid-cols-1 gap-1">  
        {links.map((l) => (  
          <NavLink  
            key={l.to}  
            to={l.to}  
            end={l.to === '/'}  
            onClick={() => setOpen(false)}  
            className={({ isActive }) =>  
              `px-3 py-2.5 rounded-lg text-sm font-medium ${  
                isActive ? 'bg-forest text-cream' : 'text-ink hover:bg-forest/5'  
              }`  
            }  
          >  
            {l.label}  
          </NavLink>  
        ))}  
        <Link  
          to="/contact"  
          onClick={() => setOpen(false)}  
          className="mt-2 text-center bg-saffron text-forest-deep px-5 py-3 rounded-full font-semibold"  
        >  
          B2B Enquiry  
        </Link>  
      </div>  
    )}  
  </div>  
</header>  
);
}