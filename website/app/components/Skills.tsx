'use client';

import { useLanguage } from './LanguageProvider';

export default function Skills() {
  const { t } = useLanguage();

  const skills = [
    { name: 'Flutter', desc: t.skills.mobile },
    { name: 'Kotlin', desc: t.skills.android },
    { name: 'Rust', desc: t.skills.language },
    { name: 'TypeScript', desc: t.skills.web },
    { name: 'JavaScript', desc: t.skills.web },
    { name: 'Svelte', desc: t.skills.web },
  ];

  return (
    <section className="section" id="skills">
      <div className="section-header">
        <h2 className="section-title">{t.sections.skills}</h2>
        <span className="section-line"></span>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill" key={skill.name}>
            <div className="skill-name">{skill.name}</div>
            <div className="skill-desc">{skill.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
