import Hero from '@/components/sections/Hero';
import FeaturedSkills from '@/components/sections/FeaturedSkills';
import FeaturedProjects from '@/components/sections/FeaturedProjects';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedSkills />
      <FeaturedProjects />
    </main>
  );
}
