"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/skills";
import SkillBar from "./SkillBar";
import { Cpu, Layers, Server, BarChart3, Eye, Sparkles } from "lucide-react";

const categoryIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Languages: Cpu,
  Concepts: Layers,
  Infrastructure: Server,
  "ML Tools": Sparkles,
  Observability: Eye,
  Frontend: BarChart3,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Group skills by category
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">My Skills</p>
          <h2 className="section-heading mb-4">
            Technologies & expertise
          </h2>
          <p className="section-description">
            A breakdown of the tools, languages, and concepts I work with
            across the AI infrastructure and distributed systems stack.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 max-w-content">
          {Object.entries(grouped).map(([category, categorySkills], catIndex) => {
            const Icon = categoryIcons[category] || Layers;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                    <Icon size={14} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-body-md font-semibold text-foreground">
                    {category}
                  </h3>
                </div>
                <div className="space-y-5">
                  {categorySkills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={catIndex * 6 + i}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}