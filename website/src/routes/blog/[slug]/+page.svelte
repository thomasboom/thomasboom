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
        {#each data.post.content.split('\n') as paragraph}
          {#if paragraph.startsWith('## ')}
            <h2>{paragraph.replace('## ', '')}</h2>
          {:else if paragraph.startsWith('### ')}
            <h3>{paragraph.replace('### ', '')}</h3>
          {:else if paragraph.startsWith('- ')}
            <li>{paragraph.replace('- ', '')}</li>
          {:else if !paragraph.startsWith('```') && paragraph.trim() !== ''}
            {@const parts = parseParagraph(paragraph)}
            <p>
              {#each parts as part}
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
