'use client';

import Link from 'next/link';
import Links from '../components/Links';
import { LanguageProvider, useLanguage } from '../components/LanguageProvider';

function LinksPageContent() {
  const { t } = useLanguage();

  return (
    <div className="links-container">
      <div className="links-header">
        <h1 className="name">
          <span>Thomas</span>
          <span className="accent">Boom</span>
        </h1>
        <p className="meta">
          {t.hero.role}
          <span>{t.links.basedIn}</span>
        </p>
      </div>
      <Links />
      <Link href="/" className="back-link">
        ← {t.links.backHome}
      </Link>
    </div>
  );
}

export default function LinksPage() {
  return (
    <LanguageProvider>
      <LinksPageContent />
    </LanguageProvider>
  );
}
