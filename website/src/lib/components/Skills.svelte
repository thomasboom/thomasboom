<script lang="ts">
  import { t } from '$lib/language';

  const values = [
    {
      name: 'FOSS',
      desc: 'Building and supporting free and open source software that anyone can use, study, and improve.',
    },
    {
      name: 'User Privacy',
      desc: 'Minimizing data collection, avoiding tracking, and keeping personal information personal.',
    },
    {
      name: 'Self-Ownership',
      desc: 'You should control your own data, devices, and digital life without restrictions from others.',
    },
    {
      name: 'Beyond Big Tech',
      desc: 'Reducing dependence on major tech monopolies by choosing independent and decentralized alternatives.',
    },
  ];
</script>

<section class="section" id="how-i-work" aria-labelledby="how-i-work-title">
  <header class="section-header">
    <h2 class="section-title" id="how-i-work-title">02 - {$t.sections.howIWork}</h2>
    <span class="section-line"></span>
  </header>
  <ul class="skills-grid">
    {#each values as value (value.name)}
      <li class="skill">
        <span class="skill-name">{value.name}</span>
        <span class="skill-desc">{value.desc}</span>
      </li>
    {/each}
  </ul>
</section>
