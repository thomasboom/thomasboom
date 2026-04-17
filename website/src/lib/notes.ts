import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = path.resolve(__dirname, '../../content/notes');

export function getNotesDir(): string {
  return NOTES_DIR;
}

export function parseDateFromSlug(slug: string): Date | null {
  const match = slug.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    d.getDate() !== Number(day) ||
    d.getMonth() !== Number(month) - 1 ||
    d.getFullYear() !== Number(year)
  ) {
    return null;
  }
  return d;
}

export function extractTitle(content: string): string {
  const lines = content.split('\n');
  // First pass: look for a heading in the first few lines
  for (const line of lines.slice(0, 10)) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    const headingMatch = trimmed.match(/^#+\s+(.+)/);
    if (headingMatch) return headingMatch[1].trim();
  }
  // Fallback: use first non-empty line
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    return trimmed.slice(0, 80) || 'Untitled';
  }
  return 'Untitled';
}
