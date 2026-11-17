// src/app/page.tsx
import { getContent } from '@/lib/content-loader';
import Home from './home-client';

export default function Page() {
  const experiments = getContent('experiments').slice(0, 3);
  const projects = getContent('projects').slice(0, 3);
  const labNotes = getContent('lab-notes').slice(0, 3);

  return (
    <Home
      experiments={experiments}
      projects={projects}
      labNotes={labNotes}
    />
  );
}