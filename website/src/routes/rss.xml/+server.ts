import { getNotesDir, parseDateFromSlug, extractTitle } from '$lib/notes';
import fs from 'fs';
import path from 'path';

interface Note {
  slug: string;
  date: string;
  title: string;
}

function getNotes(): Note[] {
  const notesDir = getNotesDir();
  let files: string[];
  try {
    files = fs.readdirSync(notesDir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }

  const notes: Note[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const date = parseDateFromSlug(slug);
    if (!date) continue;

    const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
    const title = extractTitle(content);

    notes.push({
      slug,
      date: date.toISOString(),
      title,
    });
  }

  notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return notes;
}

export const GET = () => {
  const notes = getNotes();
  const siteUrl = 'https://thomasboom.com';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Notes — Thomas Boom</title>
    <description>Personal notes and thoughts by Thomas Boom.</description>
    <link>${siteUrl}/notes</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${notes
      .map(
        (note) => `
    <item>
      <title>${note.title}</title>
      <link>${siteUrl}/notes/${note.slug}</link>
      <guid>${siteUrl}/notes/${note.slug}</guid>
      <pubDate>${new Date(note.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
