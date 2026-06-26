"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Code2, GraduationCap, Sparkles } from "lucide-react";
import { exploring } from "@/data/exploring";
import TiltCard from "./TiltCard";

export default function CurrentlyExploring() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-section bg-surfaceLight" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Currently</p>
          <h2 className="section-heading">What I&apos;m up to</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-content">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <TiltCard className="glass-card-hover p-6" tiltAmount={2}>
              <div className="w-9 h-9 rounded-card bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-4">
                <Code2 size={16} strokeWidth={1.5} />
              </div>
              <p className="text-caption font-medium text-muted uppercase tracking-widest mb-3">
                Building
              </p>
              <h4 className="text-body-md font-medium text-foreground mb-2">
                {exploring.building}
              </h4>
              <p className="text-body-sm text-muted leading-relaxed">
                {exploring.buildingDescription}
              </p>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <TiltCard className="glass-card-hover p-6" tiltAmount={2}>
              <div className="w-9 h-9 rounded-card bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 dark:text-sky-400 mb-4">
                <GraduationCap size={16} strokeWidth={1.5} />
              </div>
              <p className="text-caption font-medium text-muted uppercase tracking-widest mb-3">
                Learning
              </p>
              <ul className="space-y-3">
                {exploring.learning.map((item, i) => (
                  <li key={i} className="text-body-sm text-foregroundSecondary">
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <TiltCard className="glass-card-hover p-6" tiltAmount={2}>
              <div className="w-9 h-9 rounded-card bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4">
                <BookOpen size={16} strokeWidth={1.5} />
              </div>
              <p className="text-caption font-medium text-muted uppercase tracking-widest mb-3">
                Reading
              </p>
              <h4 className="text-body-md font-medium text-foreground mb-1">
                {exploring.reading.title}
              </h4>
              <p className="text-body-sm text-indigo-500 dark:text-indigo-400 mb-3">
                by {exploring.reading.author}
              </p>
              <p className="text-body-sm text-muted leading-relaxed">
                {exploring.reading.note}
              </p>
            </TiltCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3 max-w-content"
        >
          <span className="flex items-center gap-1.5 text-caption text-muted">
            <Sparkles size={12} className="text-indigo-500 dark:text-indigo-400" />
            Also exploring:
          </span>
          {exploring.interests.map((interest) => (
            <span
              key={interest}
              className="text-caption text-foregroundSecondary px-2.5 py-1 rounded-md bg-surface border border-border"
            >
              {interest}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}