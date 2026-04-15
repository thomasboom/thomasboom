<script lang="ts">
  import { onMount } from 'svelte';

  let progress = $state(0);

  onMount(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress = Math.min(100, Math.max(0, scrollPercent));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="progress-bar" style={`width: ${progress}%`}></div>
