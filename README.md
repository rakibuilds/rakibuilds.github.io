# Rakibul AI Labs

This is the official repository for [Rakibul AI Labs](https://rakibuilds.github.io/), the independent R&D sandbox of Rakibul Islam. 

The lab focuses on building self-hosted AI infrastructure, running local Large Language Models (LLMs), and developing agentic AI workflows. This website serves as a showcase for active experiments and projects.

## Live Website
You can view the live site here: **[https://rakibuilds.github.io/](https://rakibuilds.github.io/)**

## Tech Stack

This project is built with a modern, performance-focused stack designed for 3D rendering and fast static deployment.

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Static Export)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Rendering:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting:** [GitHub Pages](https://pages.github.com/)
- **CI/CD:** GitHub Actions

## Features

- **Interactive 3D Hero:** A distorted, floating sphere rendered in WebGL.
- **Premium Dark UI:** A deep space aesthetic with ambient CSS glows and glassmorphism.
- **Mobile-First Design:** Fully responsive layout optimized for slow connections (3G/4G) by reducing 3D complexity on smaller screens.
- **Static Export:** Compiled to pure HTML/CSS/JS for lightning-fast load times and zero server costs.
- **Automated Deployments:** Every push to `main` automatically builds and deploys the site via GitHub Actions.

## Local Development

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rakibuilds/rakibuilds.github.io.git
   cd rakibuilds.github.io
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This site is configured for static export (`output: 'export'` in `next.config.ts`). 

When you push changes to the `main` branch, the GitHub Actions workflow (`.github/workflows/ci.yaml`) automatically:
1. Installs dependencies.
2. Runs the linter.
3. Builds the static site into the `out/` folder.
4. Deploys the `out/` folder to GitHub Pages.

## Connect

- **Main Portfolio:** [rakibul-labs.netlify.app](https://rakibul-labs.netlify.app/)
- **GitHub:** [@rakibuilds](https://github.com/rakibuilds)
- **X (Twitter):** [@rakibuilds](https://x.com/rakibuilds)
- **LinkedIn:** [Rakibul Islam](https://www.linkedin.com/in/rakibul4210i)

---
*Built by [Rakibul Islam](https://rakibuilds.github.io/).*