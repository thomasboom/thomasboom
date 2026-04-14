export default function Contact() {
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

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <h2 className="section-title">04 — CONTACT</h2>
        <span className="section-line"></span>
      </div>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div className="contact-item" key={contact.href}>
            <a href={contact.href} target="_blank" rel="noopener noreferrer">
              {contact.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
