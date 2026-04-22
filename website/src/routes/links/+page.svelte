<script lang="ts">
  import { t } from '$lib/language';
  import Links from '$lib/components/Links.svelte';
</script>

<svelte:head>
  <title>Links — Thomas Boom</title>
  <link rel="canonical" href="https://thomasboom.com/links" />
  <meta name="description" content="Links collection by Thomas Boom." />
  <meta property="og:title" content="Links — Thomas Boom" />
  <meta property="og:description" content="Links collection by Thomas Boom." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://thomasboom.com/links" />
</svelte:head>

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
