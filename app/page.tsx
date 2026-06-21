import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import EngineeringApproach from "@/components/EngineeringApproach";
import Timeline from "@/components/Timeline";
import CurrentlyExploring from "@/components/CurrentlyExploring";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <CursorGlow />
      <Navigation />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Projects />
      <EngineeringApproach />
      <div className="divider" />
      <Timeline />
      <div className="divider" />
      <CurrentlyExploring />
      <Contact />
      <Footer />
    </main>
  );
}