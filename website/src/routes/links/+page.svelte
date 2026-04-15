<script lang="ts">
  import { t } from '$lib/language';
  import Links from '$lib/components/Links.svelte';
</script>

<div class="links-container">
  <div class="links-header">
    <h1 class="name">
      <span>Thomas</span>
      <span class="accent">Boom</span>
    </h1>
    <p class="meta">{$t.hero.building}</p>
  </div>
  <Links />
  <a href="/" class="back-link">← {$t.links.backHome}</a>
</div>
