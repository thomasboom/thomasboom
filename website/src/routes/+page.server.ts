import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

interface HeatmapEntry {
  timestamp: number;
  contributions: number;
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: Array<{
            contributionDays?: Array<{
              contributionCount: number;
              date: string;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message?: string }>;
}

const username = 'thomasboom';
const githubUsername = 'thomasboom';
const cutoffDate = new Date('2026-01-12T00:00:00Z');
const cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000);
type ServerFetch = typeof globalThis.fetch;

function toUtcDayTimestamp(dateString: string): number {
  return Math.floor(new Date(`${dateString}T00:00:00Z`).getTime() / 1000);
}

async function fetchCodebergHeatmap(fetch: ServerFetch, pat: string) {
  const response = await fetch(`https://codeberg.org/api/v1/users/${username}/heatmap`, {
    headers: {
      Authorization: `token ${pat}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Codeberg API returned ${response.status}`);
  }

  const heatmap: HeatmapEntry[] = await response.json();

  return heatmap.filter((entry) => entry.timestamp >= cutoffTimestamp);
}

async function fetchGitHubHeatmap(fetch: ServerFetch, pat: string) {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;
  const githubStart = new Date('2008-01-01T00:00:00Z');
  const githubEnd = new Date('2026-01-11T23:59:59Z');
  const chunkedHeatmaps: HeatmapEntry[][] = [];

  for (
    let chunkStart = new Date(githubStart);
    chunkStart <= githubEnd;
    chunkStart = new Date(chunkStart.getTime() + 365 * 24 * 60 * 60 * 1000)
  ) {
    const chunkEnd = new Date(
      Math.min(
        githubEnd.getTime(),
        chunkStart.getTime() + 365 * 24 * 60 * 60 * 1000 - 1000
      )
    );

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pat}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username: githubUsername,
          from: chunkStart.toISOString(),
          to: chunkEnd.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const payload: GitHubGraphQLResponse = await response.json();

    if (payload.errors?.length) {
      throw new Error(payload.errors.map((error) => error.message ?? 'Unknown GitHub error').join(', '));
    }

    const contributionDays =
      payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.flatMap(
        (week) => week.contributionDays ?? []
      ) ?? [];

    chunkedHeatmaps.push(
      contributionDays.map<HeatmapEntry>((day) => ({
        timestamp: toUtcDayTimestamp(day.date),
        contributions: day.contributionCount,
      }))
    );
  }

  return mergeHeatmaps(...chunkedHeatmaps).filter((entry) => entry.timestamp < cutoffTimestamp);
}

function mergeHeatmaps(...heatmaps: HeatmapEntry[][]): HeatmapEntry[] {
  const merged = new Map<number, number>();

  for (const heatmap of heatmaps) {
    for (const entry of heatmap) {
      merged.set(entry.timestamp, (merged.get(entry.timestamp) ?? 0) + entry.contributions);
    }
  }

  return [...merged.entries()]
    .sort(([left], [right]) => left - right)
    .map(([timestamp, contributions]) => ({ timestamp, contributions }));
}

export const load: PageServerLoad = async ({ fetch }) => {
  const codebergPat = env.CODEBERG_PAT;
  const githubPat = env.GITHUB_PAT;

  if (!codebergPat || !githubPat) {
    const missingVars = [
      !githubPat ? 'GITHUB_PAT' : null,
      !codebergPat ? 'CODEBERG_PAT' : null,
    ].filter(Boolean);

    return {
      codebergStats: {
        error: `${missingVars.join(' and ')} not configured`,
        firstContributionDaysAgo: null,
        contributionsLast365Days: null,
        totalContributions: null,
      },
    };
  }

  try {
    const [githubHeatmap, codebergHeatmap] = await Promise.all([
      fetchGitHubHeatmap(fetch, githubPat),
      fetchCodebergHeatmap(fetch, codebergPat),
    ]);
    const heatmap = mergeHeatmaps(githubHeatmap, codebergHeatmap);

    if (heatmap.length === 0) {
      return {
        codebergStats: {
          error: null,
          firstContributionDaysAgo: null,
          contributionsLast365Days: 0,
          totalContributions: 0,
        },
      };
    }

    const now = Date.now() / 1000;
    const oneYearAgo = now - 365 * 24 * 60 * 60;

    const firstContributionDate =
      heatmap.find((entry) => entry.contributions > 0)?.timestamp ?? null;
    const firstContributionDaysAgo =
      firstContributionDate === null
        ? null
        : Math.floor((now - firstContributionDate) / (24 * 60 * 60));

    const contributionsLast365Days = heatmap
      .filter((entry) => entry.timestamp >= oneYearAgo)
      .reduce((sum, entry) => sum + entry.contributions, 0);

    const totalContributions = heatmap.reduce(
      (sum, entry) => sum + entry.contributions,
      0
    );

    return {
      codebergStats: {
        error: null,
        firstContributionDaysAgo,
        contributionsLast365Days,
        totalContributions,
      },
    };
  } catch (error) {
    return {
      codebergStats: {
        error: error instanceof Error ? error.message : 'Unknown error',
        firstContributionDaysAgo: null,
        contributionsLast365Days: null,
        totalContributions: null,
      },
    };
  }
};
