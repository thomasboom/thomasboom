<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/language';
  import Navigation from '$lib/components/Navigation.svelte';
  import Work from '$lib/components/Work.svelte';
  import HowIWork from '$lib/components/Skills.svelte';
  import About from '$lib/components/About.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import GitStats from '$lib/components/GitStats.svelte';

  const year = new Date().getFullYear();

  export let data;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      section.classList.add('visible');
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  });
</script>

<ProgressBar />
<main class="container">
  <aside class="sidebar-left">
    <header class="profile-header">
      <h1 class="name">
        <span>Thomas</span>
        <span class="accent">Boom</span>
      </h1>
      <p class="meta">{$t.hero.building}</p>
    </header>
    <Navigation />
  </aside>

  <section class="content-right">
    <About />
    <HowIWork />
    <GitStats stats={data.gitStats} />
    <Work />
    <Contact />

    <footer class="footer">
      <span>© {year} Thomas Boom</span>
    </footer>
  </section>
</main>
