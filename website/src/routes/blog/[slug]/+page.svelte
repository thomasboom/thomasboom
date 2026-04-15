<script lang="ts">
  import Comments from '$lib/components/Comments.svelte';
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();

  const parseParagraph = (paragraph: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: Array<string | { text: string; url: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(paragraph)) !== null) {
      parts.push(paragraph.slice(lastIndex, match.index));
      parts.push({ text: match[1], url: match[2] });
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < paragraph.length) {
      parts.push(paragraph.slice(lastIndex));
    }

    return parts;
  };

  const parsedContent = $derived(
    data.post?.content.split('\n').map((paragraph: string) => ({
      type: paragraph.startsWith('## ') ? 'h2' : paragraph.startsWith('### ') ? 'h3' : paragraph.startsWith('- ') ? 'li' : paragraph.startsWith('```') || paragraph.trim() === '' ? 'skip' : 'p',
      content: paragraph.replace(/^## |^### |^- /, ''),
      parsed: paragraph.startsWith('## ') || paragraph.startsWith('### ') || paragraph.startsWith('- ') || paragraph.startsWith('```') || paragraph.trim() === '' ? null : parseParagraph(paragraph),
    })) ?? []
  );
</script>

<svelte:head>
  <title>{data.post ? data.post.title : 'Post not found'}</title>
  {#if data.post}
    <meta name="fediverse:Creator" content="@thomasboom@mastodon.social" />
  {/if}
</svelte:head>

{#if !data.post}
  <div class="blog-container">
    <h1>Post not found</h1>
    <a href="/blog" class="back-link">← Back to blog</a>
  </div>
{:else}
  <div class="blog-container">
    <div class="blog-post">
      <div class="post-meta">
        <span class="post-date">{data.post.date}</span>
        <a href="/blog" class="back-to-blog">← All posts</a>
      </div>
      <h1 class="post-title">{data.post.title}</h1>
      <div class="post-content">
        {#each parsedContent as paragraph}
          {#if paragraph.type === 'h2'}
            <h2>{paragraph.content}</h2>
          {:else if paragraph.type === 'h3'}
            <h3>{paragraph.content}</h3>
          {:else if paragraph.type === 'li'}
            <li>{paragraph.content}</li>
          {:else if paragraph.type === 'p' && paragraph.parsed}
            <p>
              {#each paragraph.parsed as part}
                {#if typeof part === 'string'}
                  {part}
                {:else}
                  <a href={part.url} class="inline-link">{part.text}</a>
                {/if}
              {/each}
            </p>
          {/if}
        {/each}
      </div>
    </div>
    <Comments postSlug={data.slug} />
    <a href="/" class="back-link">← Back to home</a>
  </div>
{/if}
