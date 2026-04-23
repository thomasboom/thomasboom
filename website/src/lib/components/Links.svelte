<script lang="ts">
   const contacts = [
     { label: 'Email', href: 'mailto:contact@thomasboom.com' },
    { label: 'Codeberg', href: 'https://codeberg.org/thomasboom' },
    { label: 'GitHub', href: 'https://github.com/thomasboom' },
    { label: 'Mastodon', href: 'https://mastodon.social/@thomasboom' },
    {
      label: 'Bluesky',
      href: 'https://bsky.app/profile/thomasboom.com',
    },
    {
      label: 'Signal',
      href: 'https://signal.me/#eu/fEo_ZOMCPYGFE3QyEDyQy3c3Jz8hWsmpTLFxW2CHRQwVehMlgjhNKKKUX3LtsDcQ',
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