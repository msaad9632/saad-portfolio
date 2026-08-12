import HeroFilamentClient from "@/components/HeroFilamentClient";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import { getSite } from "@/lib/content";

export default function Home() {
  const site = getSite();

  return (
    <>
      <a href="#work" className="skip-link">
        Skip to content
      </a>
      <HeroFilamentClient visual={site.heroVisual} />
      <Nav />
      <main className="relative">
        <Hero />
        <Work />
        <About />
        <Experience />
        <GitHubActivity />
        <Contact />
      </main>
    </>
  );
}
