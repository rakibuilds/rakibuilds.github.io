// src/app/page.tsx
import { getContent } from '@/lib/content-loader';
import Home from './home-client';

export default function Page() {
  const experiments = getContent('experiments');
  return <Home experiments={experiments} />;
}