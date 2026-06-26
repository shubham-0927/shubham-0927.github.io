"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCardGrid from "./ProjectCardGrid";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-section bg-surfaceLight" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">My Portfolio</p>
          <h2 className="section-heading mb-4">
            Recent projects
          </h2>
          <p className="section-description">
            Production-oriented systems built with deliberate architectural
            decisions — each one an exploration of distributed systems,
            AI infrastructure, or backend engineering.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-content">
          {projects.map((project, index) => (
            <ProjectCardGrid
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}