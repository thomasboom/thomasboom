<script lang="ts">
  import { t } from '$lib/language';
</script>

<nav class="nav" aria-label="Main navigation">
  <a href="/blog"><span class="nav-number">00</span> {$t.nav.blog}</a>
  <button
    type="button"
    class="nav-link"
    onclick={() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">01</span> {$t.nav.about}
  </button>
  <button
    type="button"
    class="nav-link"
    onclick={() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">02</span> {$t.nav.work}
  </button>
  <button
    type="button"
    class="nav-link"
    onclick={() => {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">03</span> {$t.nav.skills}
  </button>
  <button
    type="button"
    class="nav-link"
    onclick={() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">04</span> {$t.nav.contact}
  </button>
</nav>
