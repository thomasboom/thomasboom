<script lang="ts">
   const contacts = [
     { label: 'Email', href: '/email' },
    { label: 'Codeberg', href: '/codeberg' },
    { label: 'GitHub', href: '/github' },
    { label: 'Mastodon', href: '/mastodon' },
    {
      label: 'Bluesky',
      href: '/bluesky',
    },
    {
      label: 'Signal',
      href: '/signal',
    },
  ];
</script>

<nav class="links" aria-label="Contact links">
  {#each contacts as contact (contact.href)}
    <a
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      class="links-link"
    >
      {contact.label}
    </a>
  {/each}
</nav>