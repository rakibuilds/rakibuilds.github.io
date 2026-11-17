import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

export type ContentType = 'experiments' | 'lab-notes' | 'projects';

export type BaseContent = {
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  liveUrl?: string;
  docUrl?: string;
  repoUrl?: string;
  repoName?: string;
};

export function getContent(type: ContentType): BaseContent[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f));

  // Group by slug. If both .md and .mdx exist, .mdx wins. Log a warning.
  const bySlug = new Map<string, string>();
  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/, '');
    const isMdx = file.endsWith('.mdx');
    const existing = bySlug.get(slug);

    if (!existing) {
      bySlug.set(slug, file);
    } else if (isMdx && !existing.endsWith('.mdx')) {
      bySlug.set(slug, file);
      console.warn(
        `[content-loader] Duplicate slug "${slug}" in ${type}: using ${file}, ignoring ${existing}`
      );
    } else {
      console.warn(
        `[content-loader] Duplicate slug "${slug}" in ${type}: using ${existing}, ignoring ${file}`
      );
    }
  }

  return Array.from(bySlug.entries())
    .map(([slug, file]) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data } = matter(raw);
      return { slug, ...data } as BaseContent;
    })
    .sort((a, b) => ((a.date || '') < (b.date || '') ? 1 : -1));
}

export function getContentSlugs(type: ContentType): string[] {
  return getContent(type).map((c) => c.slug);
}

export function getRawContent(type: ContentType, slug: string): string | null {
  const dir = path.join(CONTENT_DIR, type);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  if (fs.existsSync(mdxPath)) return fs.readFileSync(mdxPath, 'utf-8');
  if (fs.existsSync(mdPath)) return fs.readFileSync(mdPath, 'utf-8');
  return null;
}

export function getContentBySlug(
  type: ContentType,
  slug: string
): BaseContent | null {
  const dir = path.join(CONTENT_DIR, type);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  return { slug, ...data } as BaseContent;
}