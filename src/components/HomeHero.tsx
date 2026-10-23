import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Globe2 } from 'lucide-react';

const slides = [
  {
    eyebrow: 'Sourcing from India · Built for global trade',
    title: <>Dehydrated food &amp; <span className="italic text-saffron">Indian export products.</span></>,
    description: 'Explore dehydrated vegetables, fruit products, bulk ingredients and value-added foods sourced to your requirements.',
    image: `${import.meta.env.BASE_URL}dehydrated-vegetables.jpg`,
    alt: 'Illustrative dehydrated vegetable product range',
    link: '/dehydrated-vegetables',
    linkLabel: 'Explore food products',
    index: '01',
  },
  {
    eyebrow: 'Product requirements · Clear communication',
    title: <>Ingredients selected for <span className="italic text-saffron">your specification.</span></>,
    description: 'Discuss product form, quality parameters, packing, quantity and destination with a sourcing process built around your enquiry.',
    image: `${import.meta.env.BASE_URL}bulk-food-ingredients.jpg`,
    alt: 'Illustrative Indian bulk food ingredients',
    link: '/bulk-food-ingredients',
    linkLabel: 'Explore ingredients',
    index: '02',
  },
  {
    eyebrow: 'Food products & home textiles',
    title: <>From Indian suppliers to <span className="italic text-saffron">global possibilities.</span></>,
    description: 'One point of contact for food-product sourcing enquiries and towels and napkins, with availability confirmed for each requirement.',
    image: `${import.meta.env.BASE_URL}towels-napkins.jpg`,
    alt: 'Illustrative towel and napkin textile products',
    link: '/towels-napkins',
    linkLabel: 'Explore towels & napkins',
    index: '03',
  },
];

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active];
  const go = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section
      className="home-showcase relative isolate overflow-hidden bg-forest-deep text-cream"
      aria-roledescription="carousel"
      aria-label="Savita Global product and sourcing highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="home-showcase__backdrops absolute inset-0" aria-hidden="true">
        {slides.map((item, index) => (
          <img key={item.image} src={item.image} alt="" className={`home-showcase__backdrop ${index === active ? 'is-active' : ''}`} />
        ))}
      </div>
      <div className="home-showcase__shade absolute inset-0" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-24">
        <div className="home-showcase__copy lg:col-span-7" key={slide.index}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-forest-deep/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.17em] text-cream/90 backdrop-blur-sm sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-saffron" />{slide.eyebrow}
          </div>
          <p className="leaf-divider !text-saffron mb-5">Savita Global Private Limited</p>
          <h1 className="font-display max-w-4xl text-4xl font-semibold leading-[1.02] text-cream sm:text-5xl lg:text-7xl">{slide.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 sm:mt-8 sm:text-lg lg:text-xl">{slide.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <Link to="/contact" className="home-showcase__primary inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3.5 font-semibold text-forest-deep sm:px-7">
              Start a B2B enquiry <ArrowRight size={18} />
            </Link>
            <Link to={slide.link} className="home-showcase__secondary inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 font-medium text-cream sm:px-7">
              {slide.linkLabel}
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs text-cream/60 sm:mt-12">
            <Globe2 size={16} className="text-saffron" />
            <span>Buyer-led sourcing · Product details confirmed by enquiry</span>
          </div>
        </div>

        <div className="home-showcase__visual relative hidden lg:col-span-5 lg:block" aria-hidden="true">
          <div className="home-showcase__frame">
            <img key={slide.image} src={slide.image} alt={slide.alt} className="home-showcase__product-image" />
            <div className="home-showcase__frame-caption">
              <span className="text-[10px] uppercase tracking-[.2em] text-cream/60">Savita Global · Product sourcing</span>
              <span className="font-display text-3xl text-cream">{slide.index}<span className="text-saffron"> / 03</span></span>
            </div>
          </div>
          <div className="home-showcase__floating-note"><span className="home-showcase__note-dot" /> Requirements first. Details confirmed.</div>
        </div>
      </div>

      <div className="home-showcase__controls relative mx-auto flex max-w-7xl items-center justify-between px-5 pb-8 lg:px-10 lg:pb-10">
        <div className="flex items-center gap-2" aria-label="Choose slide">
          {slides.map((item, index) => (
            <button key={item.index} type="button" onClick={() => setActive(index)} aria-label={`Show slide ${index + 1}: ${item.eyebrow}`} aria-pressed={active === index} className={`home-showcase__dot ${active === index ? 'is-active' : ''}`} />
          ))}
          <span className="ml-3 text-[10px] font-semibold tracking-[.18em] text-cream/55">{slide.index} — 03</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="home-showcase__arrow"><ChevronLeft size={19} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="home-showcase__arrow"><ChevronRight size={19} /></button>
        </div>
      </div>
    </section>
  );
}
