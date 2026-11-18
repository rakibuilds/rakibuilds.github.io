# Rakibul AI Labs

[![CI](https://github.com/rakibuilds/rakibuilds.github.io/actions/workflows/ci.yaml/badge.svg)](https://github.com/rakibuilds/rakibuilds.github.io/actions/workflows/ci.yaml)
[![Live site](https://img.shields.io/badge/live-rakibuilds.github.io-22e8ff)](https://rakibuilds.github.io/)

The independent R&D sandbox of **Rakibul**, focused on self-hosted AI infrastructure, local Large Language Models (LLMs) and agentic AI workflows. This repository contains the source of the lab's website, which showcases active experiments and projects.

**Live site:** [rakibuilds.github.io](https://rakibuilds.github.io/)

## Highlights

- **Interactive 3D hero:** a distorted, floating sphere rendered in WebGL.
- **Dark, glassmorphic UI:** deep-space styling with ambient CSS glows.
- **Mobile-first:** responsive layout, with reduced 3D complexity on small screens for slower connections.
- **Fully static:** compiled to plain HTML, CSS and JavaScript and served from GitHub Pages, so no server is required.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, static export) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [Drei](https://github.com/pmndrs/drei) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Hosting and CI/CD | [GitHub Pages](https://pages.github.com/) and GitHub Actions |

## Getting Started

**Prerequisites:** Node.js 20.9 or later and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/rakibuilds/rakibuilds.github.io.git
cd rakibuilds.github.io
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment

The site uses static export (`output: 'export'` in `next.config.ts`). Every push to `main` runs the workflow in `.github/workflows/ci.yaml`, which:

1. Installs dependencies.
2. Runs the linter.
3. Builds the static site into `out/`.
4. Deploys `out/` to GitHub Pages.

## Connect

- **Portfolio:** [rakibul-labs.vercel.app](https://rakibul-labs.vercel.app/)
- **GitHub:** [@rakibuilds](https://github.com/rakibuilds)
- **X (Twitter):** [@rakibuilds](https://x.com/rakibuilds)
- **LinkedIn:** [Rakibul Islam](https://www.linkedin.com/in/rakibul4210i)

---

Built by [Rakibul](https://rakibuilds.github.io/).