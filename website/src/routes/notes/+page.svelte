<script lang="ts">
  import { t } from '$lib/language';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Notes — Thomas Boom</title>
  <link rel="canonical" href="https://thomasboom.com/notes" />
  <meta name="description" content="Personal notes and thoughts by Thomas Boom." />
  <meta property="og:title" content="Notes — Thomas Boom" />
  <meta property="og:description" content="Personal notes and thoughts by Thomas Boom." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://thomasboom.com/notes" />
</svelte:head>

<div class="notes-container">
  <div class="notes-header">
    <h1 class="name">
      <span>{$t.notes.title}</span>
    </h1>
    <p class="meta">{$t.notes.subtitle}</p>
  </div>

  {#if data.notes.length === 0}
    <p class="notes-empty">{$t.notes.empty}</p>
  {:else}
    <div class="notes-list">
      {#each data.notes as note (note.slug)}
        <a href="/notes/{note.slug}" class="note-card">
          <div class="note-card-content">
            <h2 class="note-card-title">{note.title}</h2>
            <time class="note-card-date" datetime={note.date}>{note.displayDate}</time>
          </div>
          <span class="note-card-arrow">→</span>
        </a>
      {/each}
    </div>
  {/if}

  <a href="/" class="back-link">← {$t.notes.backHome}</a>
</div>
