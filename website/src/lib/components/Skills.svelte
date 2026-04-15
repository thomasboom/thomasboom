<script lang="ts">
  import { t } from '$lib/language';

  const skills: { name: string; desc: string }[] = [
    { name: 'Flutter', desc: 'Mobile apps for iOS and Android with a single codebase.' },
    { name: 'Kotlin', desc: 'Native Android development with Jetpack Compose.' },
    { name: 'Rust', desc: 'Systems programming for high-performance applications.' },
    { name: 'TypeScript', desc: 'Type-safe web development with React, Svelte, and Node.js.' },
    { name: 'JavaScript', desc: 'Web development with modern ES6+ patterns.' },
    { name: 'Svelte', desc: 'Build user interfaces with reactive, compiler-first approach.' },
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
        <span class="skill-desc">{skill.desc}</span>
      </li>
    {/each}
  </ul>
</section>
