import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { parseDateFromSlug } from '$lib/notes';

// Lazily import markdown files by slug
const noteModules = import.meta.glob('/content/notes/*.md', {
  query: '?raw',
  import: 'default',
});

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const date = parseDateFromSlug(slug);
  if (!date) {
    throw error(404, 'Note not found');
  }

  // Find the matching module
  const matchingPath = Object.keys(noteModules).find(
    (path) => path.endsWith(`${slug}.md`) || path.endsWith(`/${slug}.md`),
  );

  if (!matchingPath) {
    throw error(404, 'Note not found');
  }

  // Import the module dynamically
  const content = (await noteModules[matchingPath]()) as string;

  const html = marked.parse(content, { async: false });

  return {
    slug,
    date: date.toISOString(),
    displayDate: date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    content: html,
  };
};