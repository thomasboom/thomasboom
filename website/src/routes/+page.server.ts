import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

interface HeatmapEntry {
  timestamp: number;
  contributions: number;
}

export const load: PageServerLoad = async ({ fetch }) => {
  const pat = env.CODEBERG_PAT;
  const username = 'thomasboom';

  if (!pat) {
    return {
      codebergStats: {
        error: 'CODEBERG_PAT not configured',
        firstContributionDaysAgo: null,
        contributionsLast365Days: null,
        totalContributions: null,
      },
    };
  }

  try {
    const response = await fetch(`https://codeberg.org/api/v1/users/${username}/heatmap`, {
      headers: {
        Authorization: `token ${pat}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Codeberg API returned ${response.status}`);
    }

    const heatmap: HeatmapEntry[] = await response.json();

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

    const firstContributionDate = new Date('2024-04-17T00:00:00Z').getTime() / 1000;
    const firstContributionDaysAgo = Math.floor((now - firstContributionDate) / (24 * 60 * 60));

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
