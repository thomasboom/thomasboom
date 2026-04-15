<script lang="ts">
  import { posts } from '$lib/posts';

  const getExcerpt = (content: string) =>
    `${content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').substring(0, 200)}...`;
</script>

<main class="blog-container">
  <header class="blog-header">
    <h1 class="name">
      <span>Blog</span>
    </h1>
    <p class="meta">Thoughts & Writing on development, technology, and more.</p>
  </header>

  <article class="posts-list">
    {#if posts.length === 0}
      <div class="empty-state">
        <p>No posts yet</p>
      </div>
    {:else}
      {#each posts as post (post.slug)}
        <a href={`/blog/${post.slug}`} class="post-link">
          <article class="post-card">
            <time class="post-date" datetime={post.date}>{post.date}</time>
            <h2 class="post-title">{post.title}</h2>
            <p class="post-excerpt">{getExcerpt(post.content)}</p>
          </article>
        </a>
      {/each}
    {/if}
  </article>

  <nav class="nav-blog">
    <a href="/" class="back-link">← Back to home</a>
  </nav>
</main>
