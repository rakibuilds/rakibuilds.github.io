// Post-build fix for `output: 'export'` on GitHub Pages.
//
// Next writes metadata image routes as extensionless files, e.g.
//   out/experiments/local-llm-agent/opengraph-image
// GitHub Pages serves those with Content-Type: application/octet-stream,
// which some unfurlers (notably LinkedIn) refuse to render.
//
// This renames them to *.png and rewrites the og:image / twitter:image
// URLs in every exported HTML file to match, dropping Next's ?hash query.
import { readdir, rename, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'out';
let renamed = 0;
let rewritten = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
    } else if (entry.name === 'opengraph-image' || entry.name === 'twitter-image') {
      await rename(path, `${path}.png`);
      renamed++;
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      const patched = html.replace(
        /\/(opengraph-image|twitter-image)\?[0-9a-f]+/g,
        '/$1.png'
      );
      if (patched !== html) {
        await writeFile(path, patched, 'utf8');
        rewritten++;
      }
    }
  }
}

await walk(OUT);
console.log(`fix-og-ext: renamed ${renamed} image route(s), rewrote ${rewritten} HTML file(s)`);
