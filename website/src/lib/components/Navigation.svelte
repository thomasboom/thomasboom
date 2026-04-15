<script lang="ts">
  import { t } from '$lib/language';

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<nav class="nav" aria-label="Main navigation">
  <a href="/blog"><span class="nav-number">00</span> {$t.nav.blog}</a>
  <a
    href="#about"
    onclick={(e) => {
      e.preventDefault();
      scrollTo('about');
    }}
  >
    <span class="nav-number">01</span> {$t.nav.about}
  </a>
  <a
    href="#work"
    onclick={(e) => {
      e.preventDefault();
      scrollTo('work');
    }}
  >
    <span class="nav-number">02</span> {$t.nav.work}
  </a>
  <a
    href="#skills"
    onclick={(e) => {
      e.preventDefault();
      scrollTo('skills');
    }}
  >
    <span class="nav-number">03</span> {$t.nav.skills}
  </a>
  <a
    href="#contact"
    onclick={(e) => {
      e.preventDefault();
      scrollTo('contact');
    }}
  >
    <span class="nav-number">04</span> {$t.nav.contact}
  </a>
</nav>
