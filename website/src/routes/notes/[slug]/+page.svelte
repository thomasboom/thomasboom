<script lang="ts">
  import { t } from '$lib/language';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.displayDate} — Notes — Thomas Boom</title>
  <meta name="description" content="Note from {data.displayDate}" />
</svelte:head>

<div class="notes-reader">
  <a href="/notes" class="notes-back">← {$t.notes.backToList}</a>

  <article class="notes-article">
    <time class="notes-article-date" datetime={data.date}>{data.displayDate}</time>
    <div class="notes-article-content">
      <!-- eslint-disable svelte/no-at-html-tags -->
      {@html data.content}
      <!-- eslint-enable svelte/no-at-html-tags -->
    </div>
  </article>

  <a href="/notes" class="notes-back notes-back-bottom">← {$t.notes.backToList}</a>
</div>
