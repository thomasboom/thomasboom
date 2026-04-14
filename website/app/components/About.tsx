'use client';

import { useLanguage } from './LanguageProvider';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="section" id="about">
      <div className="section-header">
        <h2 className="section-title">{t.sections.about}</h2>
        <span className="section-line"></span>
      </div>
      <p className="about-text">
        {t.about.textStart} {t.about.textMiddle}{' '}
        <strong>{t.about.focus}</strong>, {t.about.textEnd}{' '}
        <strong>{t.about.help}</strong>.
      </p>
    </section>
  );
}
