<script lang="ts">
  import { t } from '$lib/language';
</script>

<section class="section" id="about" aria-labelledby="about-title">
  <header class="section-header">
    <h2 class="section-title" id="about-title">01 - {$t.sections.about}</h2>
    <span class="section-line"></span>
  </header>
  <p class="about-text">
    {$t.about.intro} <strong>{$t.about.userExperiences}</strong>{$t.about.middle}
    <strong>{$t.about.dailyLives}</strong>{$t.about.outro}
    <strong>{$t.about.openSource}</strong> {$t.about.and}
    <strong>{$t.about.freedom}</strong> {$t.about.ending}
  </p>
</section>
