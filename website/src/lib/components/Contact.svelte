<script lang="ts">
  import { t } from '$lib/language';

  const contacts = [
    { label: 'Email', href: 'mailto:thomasnowprod@proton.me' },
    { label: 'GitHub', href: 'https://github.com/thomasboom' },
    { label: 'Codeberg', href: 'https://codeberg.org/thomasboom' },
    {
      label: 'Signal',
      href: 'https://signal.me/#eu/fEo_ZOMCPYGFE3QyEDyQy3c3Jz8hWsmpTLFxW2CHRQwVehMlgjhNKKKUX3LtsDcQ',
    },
    { label: 'Mastodon', href: 'https://mastodon.social/@thomasboom' },
    {
      label: 'Bluesky',
      href: 'https://bsky.app/profile/thomasboom123.bsky.social',
    },
  ];
</script>

<section class="section" id="contact">
  <div class="section-header">
    <h2 class="section-title">{$t.sections.contact}</h2>
    <span class="section-line"></span>
  </div>
  <div class="contact-list">
    {#each contacts as contact (contact.href)}
      <div class="contact-item">
        <a href={contact.href} target="_blank" rel="noopener noreferrer">
          {contact.label}
        </a>
      </div>
    {/each}
  </div>
</section>
