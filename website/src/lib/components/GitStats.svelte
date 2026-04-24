<script lang="ts">
  interface GitStats {
    error: string | null;
    firstContributionDaysAgo: number | null;
    contributionsLast365Days: number | null;
    totalContributions: number | null;
  }

  interface Props {
    stats: GitStats;
  }

  let { stats }: Props = $props();
</script>

<section class="section" id="git-stats" aria-labelledby="stats-title">
  <header class="section-header">
    <h2 class="section-title" id="stats-title">03 - GIT STATS</h2>
    <span class="section-line"></span>
  </header>

  {#if stats.error}
    <p class="stats-error">{stats.error}</p>
  {:else}
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">{stats.firstContributionDaysAgo}</span>
        <span class="stat-label">days since first public contribution</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{stats.contributionsLast365Days}</span>
        <span class="stat-label">contributions in past 365 days</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{stats.totalContributions}</span>
        <span class="stat-label">total contributions</span>
      </div>
    </div>
  {/if}
</section>

<style>
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .stat-card {
    padding: 24px;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    border-color: var(--accent);
    background: var(--accent-dim);
  }

  .stat-value {
    font-size: 48px;
    color: var(--accent);
    line-height: 1;
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stats-error {
    font-size: 14px;
    color: var(--text-muted);
    padding: 24px;
    border: 1px solid var(--border);
  }

  @media (max-width: 900px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 500px) {
    .stat-value {
      font-size: 36px;
    }
  }
</style>
