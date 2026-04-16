<script lang="ts">
  import { setupConvex } from 'convex-svelte';
  import '../app.css';

  const { children } = $props();
  const convexUrl = import.meta.env.PUBLIC_CONVEX_URL as string | undefined;

  if (!convexUrl) {
    console.warn('Convex URL not configured. Set PUBLIC_CONVEX_URL environment variable.');
  } else {
    try {
      setupConvex(convexUrl);
    } catch (e) {
      console.error('Failed to initialize Convex:', e);
    }
  }
</script>

<svelte:head>
  <title>Thomas Boom</title>
  <meta name="description" content="Building software to improve lives." />
  <meta
    name="keywords"
    content="Thomas Boom, developer, software engineer, open source, mobile apps, web tools"
  />
  <meta property="og:title" content="Thomas Boom" />
  <meta property="og:description" content="Building software to improve lives." />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Thomas Boom" />
  <meta name="twitter:description" content="Building software to improve lives." />
</svelte:head>

{@render children()}
