<script lang="ts">
  import { onMount } from 'svelte';

  let progress = 0;

  onMount(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progress = scrollPercent;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="progress-bar" style={`width: ${progress}%`}></div>
