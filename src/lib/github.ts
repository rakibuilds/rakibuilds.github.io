// src/lib/github.ts

export type Project = {
  name: string;
  description: string;
  url: string;
  liveUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
  defaultBranch: string; // NEW — needed for README image paths
};

// Define GitHub API repository response structure
interface GitHubRepo {
  name: string;
  description?: string | null;
  html_url: string;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count: number;
  updated_at: string;
  default_branch?: string;
  fork?: boolean;
  archived?: boolean;
}

const USERNAME = 'rakibuilds';
const EXCLUDE = new Set(['rakibuilds.github.io']);

function headers(accept: string = 'application/vnd.github+json') {
  return {
    Accept: accept,
    'User-Agent': 'rakibuilds-portfolio',
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  };
}

function mapRepo(r: GitHubRepo): Project {
  return {
    name: r.name,
    description: r.description ?? '',
    url: r.html_url,
    liveUrl: `https://${USERNAME}.github.io/${r.name}/`,
    homepage: r.homepage || null,
    language: r.language || null,
    topics: r.topics ?? [],
    stars: r.stargazers_count,
    updatedAt: r.updated_at,
    defaultBranch: r.default_branch || 'main',
  };
}

// ---------- List: all your repos (used by /projects if you go all-repos route) ----------
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
    { headers: headers(), next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    console.error('GitHub API error:', res.status, await res.text());
    return [];
  }

  const repos = (await res.json()) as GitHubRepo[];
  return repos
    .filter((r) => !r.fork && !r.archived && !EXCLUDE.has(r.name))
    .map(mapRepo)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

// ---------- Single: one repo (used by /projects/[slug] detail page) ----------
export async function getRepo(repoName: string): Promise<Project | null> {
  const res = await fetch(
    `https://api.github.com/repos/${USERNAME}/${repoName}`,
    { headers: headers(), next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    console.error(`getRepo(${repoName}) failed:`, res.status);
    return null;
  }
  const repoData = (await res.json()) as GitHubRepo;
  return mapRepo(repoData);
}

// ---------- README: raw markdown for a repo ----------
export async function getReadme(repoName: string): Promise<{
  markdown: string;
  branch: string;
} | null> {
  // 1. Get default branch (so relative image paths resolve correctly)
  const repoRes = await fetch(
    `https://api.github.com/repos/${USERNAME}/${repoName}`,
    { headers: headers(), next: { revalidate: 3600 } }
  );
  if (!repoRes.ok) return null;
  const repoData = (await repoRes.json()) as GitHubRepo;
  const branch = repoData.default_branch || 'main';

  // 2. Fetch raw README
  const res = await fetch(
    `https://api.github.com/repos/${USERNAME}/${repoName}/readme`,
    {
      headers: headers('application/vnd.github.raw'),
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;

  return { markdown: await res.text(), branch };
}

// ---------- Rewrite relative image paths to raw.githubusercontent.com ----------
export function fixReadmeImages(
  markdown: string,
  repoName: string,
  branch: string
): string {
  const base = `https://raw.githubusercontent.com/${USERNAME}/${repoName}/${branch}/`;

  // ![alt](relative/path)
  markdown = markdown.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)\s]+)(\s+"[^"]*")?\)/g,
    (_m, alt, path, title = '') =>
      `![${alt}](${base}${path.replace(/^\.?\//, '')}${title})`
  );

  // <img src="relative/path">
  markdown = markdown.replace(
    /(<img[^>]+src=["'])(?!https?:\/\/)([^"']+)(["'])/g,
    (_m, pre, path, post) =>
      `${pre}${base}${path.replace(/^\.?\//, '')}${post}`
  );

  // github.com/.../blob/branch/path  →  raw.githubusercontent.com/.../branch/path
  markdown = markdown.replace(
    new RegExp(
      `https://github\\.com/${USERNAME}/${repoName}/blob/[^/]+/`,
      'g'
    ),
    base
  );

  return markdown;
}