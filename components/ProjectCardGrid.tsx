"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Server, Brain, Search, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import TiltCard from "./TiltCard";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  gateway: Server,
  brain: Brain,
  search: Search,
  lock: Lock,
};

interface ProjectCardGridProps {
  project: Project;
  index: number;
}

export default function ProjectCardGrid({ project, index }: ProjectCardGridProps) {
  const Icon = iconMap[project.icon] || Server;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard className="glass-card-hover overflow-hidden group cursor-pointer" tiltAmount={2}>
        {/* Thumbnail area */}
        <div
          className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id={`grid-${project.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
            </svg>
          </div>

          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl ${project.iconBg} border border-white/5 flex items-center justify-center text-foreground/60 group-hover:scale-110 transition-transform duration-500`}>
            <Icon size={28} strokeWidth={1.2} />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-body-md font-semibold text-foreground mb-1.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-body-sm text-muted mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-caption text-muted px-2 py-0.5 rounded bg-surfaceLighter border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}