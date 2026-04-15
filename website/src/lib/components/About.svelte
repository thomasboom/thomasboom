<script lang="ts">
  import { t } from '$lib/language';
</script>

<section class="section" id="about">
  <div class="section-header">
    <h2 class="section-title">{$t.sections.about}</h2>
    <span class="section-line"></span>
  </div>
  <p class="about-text">
    {$t.about.intro} <strong>{$t.about.userExperiences}</strong>{$t.about.middle}
    <strong>{$t.about.dailyLives}</strong>{$t.about.outro}
    <strong>{$t.about.openSource}</strong> {$t.about.and}
    <strong>{$t.about.freedom}</strong> {$t.about.ending}
  </p>
</section>
