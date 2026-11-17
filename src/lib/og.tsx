import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

export type Section = 'experiments' | 'lab-notes' | 'projects';

const SITE_NAME = 'Rakibul AI Labs';
const SITE_HOST = 'rakibuilds.github.io';

const LABELS: Record<Section, string> = {
  experiments: 'Experiment',
  'lab-notes': 'Lab note',
  projects: 'Project',
};

const contentDir = (section: Section) =>
  path.join(process.cwd(), 'src', 'content', section);

/** All slugs for a section, taken from the MDX file names. */
export function listSlugs(section: Section): string[] {
  const dir = contentDir(section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

/** Reads title and description from the frontmatter of one content file. */
export function readFrontmatter(section: Section, slug: string) {
  let raw = '';
  for (const ext of ['.mdx', '.md']) {
    const file = path.join(contentDir(section), slug + ext);
    if (fs.existsSync(file)) {
      raw = fs.readFileSync(file, 'utf8');
      break;
    }
  }

  // Normalise Windows line endings, then grab the block between the --- lines.
  const block = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';

  const get = (key: string) => {
    const line = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    if (!line) return '';
    let value = line[1].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    return value.replace(/\\"/g, '"');
  };

  const title =
    get('title') ||
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description = get('description') || get('excerpt');

  return { title, description };
}

const clamp = (text: string, max: number) => {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
};

/** Builds the 1200x630 preview image from the page heading and a short description. */
export function renderOgImage(section: Section, slug: string) {
  const { title, description } = readFrontmatter(section, slug);

  const heading = clamp(title, 90);
  const summary = clamp(description, 130);
  const headingSize = heading.length <= 40 ? 76 : heading.length <= 70 ? 64 : 52;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#03040a',
          backgroundImage:
            'radial-gradient(circle at 88% 8%, rgba(34,211,238,0.20), rgba(3,4,10,0) 55%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: '#22d3ee' }}>
          {LABELS[section]}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: headingSize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            {heading}
          </div>
          {summary ? (
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                maxWidth: 960,
                fontSize: 30,
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              {summary}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
          }}
        >
          <div style={{ display: 'flex', fontWeight: 700 }}>
            <span>Rakibul</span>
            <span style={{ color: '#22d3ee' }}>.AI</span>
          </div>
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.5)' }}>{SITE_HOST}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

/** Title, description, Open Graph and Twitter tags for a detail page. */
export function getPageMetadata(section: Section, slug: string): Metadata {
  const { title, description } = readFrontmatter(section, slug);
  const url = `/${section}/${slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}