"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import TiltCard from "./TiltCard";

const colorMap = {
  indigo: {
    accent: "text-indigo-500 dark:text-indigo-400",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
    dot: "bg-indigo-500 dark:bg-indigo-400",
    tag: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
  sky: {
    accent: "text-sky-500 dark:text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/5",
    dot: "bg-sky-500 dark:bg-sky-400",
    tag: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  emerald: {
    accent: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    tag: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  amber: {
    accent: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    dot: "bg-amber-500 dark:bg-amber-400",
    tag: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = colorMap[project.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard
        className={cn(
          "glass-card overflow-hidden transition-shadow duration-300",
          isExpanded && "shadow-glow-indigo"
        )}
        tiltAmount={1.5}
        enableSpotlight={!isExpanded}
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left p-6 md:p-8 flex flex-col gap-4 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={cn("w-2 h-2 rounded-full", colors.dot)} />
                <span
                  className={cn(
                    "text-caption font-medium px-2.5 py-1 rounded-md border",
                    colors.tag
                  )}
                >
                  {project.category}
                </span>
              </div>
              <h3 className="text-section-lg font-semibold text-foreground mb-1.5">
                {project.title}
              </h3>
              <p className="text-body-sm text-muted">{project.subtitle}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 text-muted flex-shrink-0"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-caption text-muted px-2 py-0.5 rounded bg-surfaceLighter border border-border"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-caption text-muted px-2 py-0.5">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 space-y-6 border-t border-border pt-6">
                <div>
                  <p className="text-caption font-medium text-muted uppercase tracking-widest mb-2.5">
                    Problem
                  </p>
                  <p className="text-body-sm text-foregroundSecondary leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <p className="text-caption font-medium text-muted uppercase tracking-widest mb-2.5">
                    Solution
                  </p>
                  <p className="text-body-sm text-foregroundSecondary leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div>
                  <p className="text-caption font-medium text-muted uppercase tracking-widest mb-3">
                    Architecture
                  </p>
                  <ul className="space-y-2">
                    {project.architecture.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-body-sm text-foregroundSecondary"
                      >
                        <span className="w-1 h-1 rounded-full bg-borderLight mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-caption font-medium text-muted uppercase tracking-widest mb-3">
                    Key Decisions
                  </p>
                  <div className="space-y-2.5">
                    {project.decisions.map((decision, i) => (
                      <div
                        key={i}
                        className={cn("p-3.5 rounded-card border", colors.border, colors.bg)}
                      >
                        <p className="text-body-sm text-foregroundSecondary leading-relaxed">
                          {decision}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-caption font-medium text-muted uppercase tracking-widest mb-3">
                    Outcomes
                  </p>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-body-sm text-foregroundSecondary"
                      >
                        <span
                          className={cn("w-1 h-1 rounded-full mt-2 flex-shrink-0", colors.dot)}
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-caption font-medium text-muted uppercase tracking-widest mb-3">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-caption text-foregroundSecondary px-2.5 py-1 rounded-md bg-surfaceLighter border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TiltCard>
    </motion.div>
  );
}