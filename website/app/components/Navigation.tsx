'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Navigation() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav">
      <Link href="/blog">
        <span className="nav-number">00</span> {t.nav.blog}
      </Link>
      <a
        href="#quotes"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('quotes');
        }}
      >
        <span className="nav-number">01</span> {t.nav.quotes}
      </a>
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('work');
        }}
      >
        <span className="nav-number">02</span> {t.nav.work}
      </a>
      <a
        href="#skills"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('skills');
        }}
      >
        <span className="nav-number">03</span> {t.nav.skills}
      </a>
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('about');
        }}
      >
        <span className="nav-number">04</span> {t.nav.about}
      </a>
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('contact');
        }}
      >
        <span className="nav-number">05</span> {t.nav.contact}
      </a>
    </nav>
  );
}
