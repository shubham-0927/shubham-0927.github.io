"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Selected Projects</p>
          <h2 className="section-heading mb-4">
            Systems I&apos;ve built
          </h2>
          <p className="section-description">
            Each project represents a deliberate exploration of systems
            engineering — from the architectural decisions to the failure modes
            they handle.
          </p>
        </motion.div>

        <div className="grid gap-5 max-w-content-narrow">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}