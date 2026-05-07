import type { PageServerLoad } from './$types';
import { parseDateFromSlug, extractTitle } from '$lib/notes';

// Statically import all markdown notes at build time
const noteFiles = import.meta.glob('/content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

interface NoteMeta {
  slug: string;
  date: string;
  displayDate: string;
  title: string;
}

export const load: PageServerLoad = async () => {
  const notes: NoteMeta[] = [];

  for (const [filePath, content] of Object.entries(noteFiles)) {
    const filename = filePath.split('/').pop()!;
    const slug = filename.replace(/\.md$/, '');
    const date = parseDateFromSlug(slug);
    if (!date) continue;

    const title = extractTitle(content as string);

    notes.push({
      slug,
      date: date.toISOString(),
      displayDate: date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title,
    });
  }

  // Sort newest first
  notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { notes };
};