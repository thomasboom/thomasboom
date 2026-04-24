<script lang="ts">
  import { t } from '$lib/language';
</script>

<nav class="nav" aria-label="Main navigation">
  <a href="/notes" class="nav-link">
    <span class="nav-number">00</span> {$t.nav.notes}
  </a>
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
      document.getElementById('how-i-work')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">02</span> {$t.nav.howIWork}
  </button>
  <button
    type="button"
    class="nav-link"
    onclick={() => {
      document.getElementById('git-stats')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">03</span> Git Stats
  </button>
  <button
    type="button"
    class="nav-link"
    onclick={() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">04</span> {$t.nav.work}
  </button>
  <button
    type="button"
    class="nav-link"
    onclick={() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span class="nav-number">05</span> {$t.nav.contact}
  </button>
</nav>
