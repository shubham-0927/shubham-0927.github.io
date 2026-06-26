import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import Companion from "@/components/Companion";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <CursorGlow />
      <Companion />
      <Navigation />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Timeline />
      <div className="divider" />
      <Contact />
      <Footer />
    </main>
  );
}