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

<section class="section" id="skills">
  <div class="section-header">
    <h2 class="section-title">{$t.sections.skills}</h2>
    <span class="section-line"></span>
  </div>
  <div class="skills-grid">
    {#each skills as skill (skill.name)}
      <div class="skill">
        <div class="skill-name">{skill.name}</div>
        <div class="skill-desc">{skill.desc()}</div>
      </div>
    {/each}
  </div>
</section>
