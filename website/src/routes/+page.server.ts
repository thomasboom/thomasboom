import type { PageServerLoad } from './$types';

interface HeatmapEntry {
  timestamp: number;
  contributions: number;
}

const username = 'thomasboom';
const firstPublicContributionDate = new Date('2024-04-17T00:00:00Z').getTime() / 1000;
type ServerFetch = typeof globalThis.fetch;

async function fetchCodebergHeatmap(fetch: ServerFetch) {
  const response = await fetch(`https://codeberg.org/api/v1/users/${username}/heatmap`);

  if (!response.ok) {
    throw new Error(`Codeberg API returned ${response.status}`);
  }

  const heatmap: HeatmapEntry[] = await response.json();

  return heatmap;
}

interface CodebergActivity {
  op_type: string;
  repo?: {
    full_name?: string;
    html_url?: string;
  } | null;
}

async function fetchLastContributedRepo(fetch: ServerFetch) {
  const response = await fetch(
    `https://codeberg.org/api/v1/users/${username}/activities/feeds?limit=20&only-performed-by=true`
  );

  if (!response.ok) {
    return null;
  }

  const activities: CodebergActivity[] = await response.json();

  if (!Array.isArray(activities) || activities.length === 0) {
    return null;
  }

  const contributionActivityTypes = new Set([
    'commit_repo',
    'create_issue',
    'create_pull_request',
    'comment_issue',
    'comment_pull',
    'merge_pull_request',
    'close_issue',
    'reopen_issue',
    'close_pull_request',
    'reopen_pull_request',
    'approve_pull_request',
    'reject_pull_request',
    'pull_review_dismissed',
    'pull_request_ready_for_review',
    'auto_merge_pull_request',
    'publish_release',
    'push_tag',
  ]);

  const latestContribution = activities.find(
    (activity) =>
      contributionActivityTypes.has(activity.op_type) &&
      activity.repo?.full_name &&
      activity.repo?.html_url
  );

  if (!latestContribution?.repo?.full_name || !latestContribution.repo.html_url) {
    return null;
  }

  return {
    name: latestContribution.repo.full_name,
    url: latestContribution.repo.html_url,
  };
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const [heatmap, lastContributedRepo] = await Promise.all([
      fetchCodebergHeatmap(fetch),
      fetchLastContributedRepo(fetch),
    ]);

    if (heatmap.length === 0) {
      return {
        gitStats: {
          error: null,
          firstContributionDaysAgo: null,
          contributionsLast365Days: 0,
          totalContributions: 0,
          lastContributedRepo,
        },
      };
    }

    const now = Date.now() / 1000;
    const oneYearAgo = now - 365 * 24 * 60 * 60;

    const firstContributionDaysAgo = Math.floor(
      (now - firstPublicContributionDate) / (24 * 60 * 60)
    );

    const contributionsLast365Days = heatmap
      .filter((entry) => entry.timestamp >= oneYearAgo)
      .reduce((sum, entry) => sum + entry.contributions, 0);

    const totalContributions = heatmap.reduce(
      (sum, entry) => sum + entry.contributions,
      0
    );

    return {
      gitStats: {
        error: null,
        firstContributionDaysAgo,
        contributionsLast365Days,
        totalContributions,
        lastContributedRepo,
      },
    };
  } catch (error) {
    return {
      gitStats: {
        error: error instanceof Error ? error.message : 'Unknown error',
        firstContributionDaysAgo: null,
        contributionsLast365Days: null,
        totalContributions: null,
        lastContributedRepo: null,
      },
    };
  }
};
