import HeroFilamentClient from "@/components/HeroFilamentClient";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
        <Skills />
        <About />
        <Experience />
        <Education />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
