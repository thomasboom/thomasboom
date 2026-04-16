<script lang="ts">
  import { t } from '$lib/language';

  const contacts = [
    { label: 'Email', href: 'mailto:thomas@thomasboom.com' },
    { label: 'GitHub', href: 'https://github.com/thomasboom' },
    { label: 'Codeberg', href: 'https://codeberg.org/thomasboom' },
    {
      label: 'Signal',
      href: 'https://signal.me/#eu/fEo_ZOMCPYGFE3QyEDyQy3c3Jz8hWsmpTLFxW2CHRQwVehMlgjhNKKKUX3LtsDcQ',
    },
    { label: 'Mastodon', href: 'https://mastodon.social/@thomasboom' },
    {
      label: 'Bluesky',
      href: 'https://bsky.app/profile/thomasboom.com',
    },
  ];
</script>

<section class="section" id="contact" aria-labelledby="contact-title">
  <header class="section-header">
    <h2 class="section-title" id="contact-title">{$t.sections.contact}</h2>
    <span class="section-line"></span>
  </header>
  <nav class="contact-list" aria-label="Contact links">
    {#each contacts as contact (contact.href)}
      <a
        href={contact.href}
        class="contact-item"
        target="_blank"
        rel="noopener noreferrer"
      >
        {contact.label}
      </a>
    {/each}
  </nav>
</section>
