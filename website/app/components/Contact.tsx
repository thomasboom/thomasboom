export default function Contact() {
  const contacts = [
    { label: 'Email', href: 'mailto:thomasnowprod@proton.me' },
    { label: 'GitHub', href: 'https://github.com/thomasboom' },
    { label: 'Bluesky', href: 'https://bsky.app/profile/thomasboom123.bsky.social' },
    { label: 'Mastodon', href: 'https://mastodon.social/@thomasboom' },
    { label: 'SimpleX', href: 'https://smp10.simplex.im/a#jBZThpSaprUifiAuVeRN0Ikvq-YRCRDcqWSDaIV6MoM' }
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
