import type { PageLoad } from './$types';
import { posts } from '$lib/posts';

export const load: PageLoad = ({ params }) => {
  const post = posts.find((entry) => entry.slug === params.slug) ?? null;
  return {
    post,
    slug: params.slug,
  };
};
