import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { getNotesDir, parseDateFromSlug } from '$lib/notes';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const date = parseDateFromSlug(slug);
  if (!date) {
    throw error(404, 'Note not found');
  }

  const filePath = path.join(getNotesDir(), `${slug}.md`);

  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    throw error(404, 'Note not found');
  }

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
