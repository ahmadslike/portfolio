import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Build from "@/components/sections/Build";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal><Skills /></Reveal>
      <Reveal><Projects /></Reveal>
      <Reveal><Build /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  );
}
