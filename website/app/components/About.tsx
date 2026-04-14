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
        {t.about.intro} <strong>{t.about.userExperiences}</strong>
        {t.about.middle} <strong>{t.about.dailyLives}</strong>
        {t.about.outro} <strong>{t.about.openSource}</strong> {t.about.and}{' '}
        <strong>{t.about.freedom}</strong> {t.about.ending}
      </p>
    </section>
  );
}
