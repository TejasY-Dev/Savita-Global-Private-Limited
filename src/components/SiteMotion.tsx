import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Adds lightweight, accessible reveal motion across all public page sections. */
export default function SiteMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/admin-login' || pathname === '/dashboard' || pathname === '/accounts') return;
    const main = document.querySelector('main');
    if (!main) return;

    const firstTopLevelSection = main.querySelector(':scope > section');
    const targets = Array.from(
      main.querySelectorAll<HTMLElement>('section, article, .catalog-card'),
    ).filter((element) => {
      if (element === firstTopLevelSection) return false;
      if (element.closest('[data-motion="off"]')) return false;
      return true;
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('site-motion-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('site-motion-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

    targets.forEach((element, index) => {
      element.classList.add('site-motion-target');
      element.style.setProperty('--motion-delay', `${Math.min(index % 4, 3) * 65}ms`);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      targets.forEach((element) => {
        element.classList.remove('site-motion-target', 'site-motion-visible');
        element.style.removeProperty('--motion-delay');
      });
    };
  }, [pathname]);

  return null;
}
