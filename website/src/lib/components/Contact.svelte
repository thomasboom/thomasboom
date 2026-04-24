<script lang="ts">
  import { t } from '$lib/language';

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

<section class="section" id="contact" aria-labelledby="contact-title">
  <header class="section-header">
    <h2 class="section-title" id="contact-title">05 - {$t.sections.contact}</h2>
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
