import type { PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';
import { getNotesDir, parseDateFromSlug, extractTitle } from '$lib/notes';

interface NoteMeta {
  slug: string;
  date: string;
  displayDate: string;
  title: string;
}

export const load: PageServerLoad = async () => {
  const notesDir = getNotesDir();

  let files: string[];
  try {
    files = fs.readdirSync(notesDir).filter((f) => f.endsWith('.md'));
  } catch {
    return { notes: [] };
  }

  const notes: NoteMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const date = parseDateFromSlug(slug);
    if (!date) continue;

    const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
    const title = extractTitle(content);

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
