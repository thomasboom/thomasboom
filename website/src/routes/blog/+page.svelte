<script lang="ts">
  import { posts } from '$lib/posts';

  const getExcerpt = (content: string) =>
    `${content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').substring(0, 200)}...`;
</script>

<div class="blog-container">
  <div class="blog-header">
    <h1 class="name">
      <span>Blog</span>
    </h1>
    <p class="meta">Thoughts & Writing on development, technology, and more.</p>
  </div>

  <div class="posts-list">
    {#if posts.length === 0}
      <div class="empty-state">
        <p>No posts yet</p>
      </div>
    {:else}
      {#each posts as post (post.slug)}
        <a href={`/blog/${post.slug}`} class="post-link">
          <div class="post-card">
            <div class="post-date">{post.date}</div>
            <h2 class="post-title">{post.title}</h2>
            <p class="post-excerpt">{getExcerpt(post.content)}</p>
          </div>
        </a>
      {/each}
    {/if}
  </div>

  <a href="/" class="back-link">← Back to home</a>
</div>
