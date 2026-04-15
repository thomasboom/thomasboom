<script lang="ts">
  import { t } from '$lib/language';

  const skills = [
    { name: 'Flutter', desc: () => $t.skills.mobile },
    { name: 'Kotlin', desc: () => $t.skills.android },
    { name: 'Rust', desc: () => $t.skills.language },
    { name: 'TypeScript', desc: () => $t.skills.web },
    { name: 'JavaScript', desc: () => $t.skills.web },
    { name: 'Svelte', desc: () => $t.skills.web },
  ];
</script>

<section class="section" id="skills" aria-labelledby="skills-title">
  <header class="section-header">
    <h2 class="section-title" id="skills-title">{$t.sections.skills}</h2>
    <span class="section-line"></span>
  </header>
  <ul class="skills-grid">
    {#each skills as skill (skill.name)}
      <li class="skill">
        <span class="skill-name">{skill.name}</span>
        <span class="skill-desc">{skill.desc()}</span>
      </li>
    {/each}
  </ul>
</section>
