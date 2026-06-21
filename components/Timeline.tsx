"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  Education: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  Exploration: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  Systems: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Security: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "AI Infra": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="py-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Timeline</p>
          <h2 className="section-heading">Journey so far</h2>
        </motion.div>

        <div className="max-w-content-narrow relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {timeline.map((event, index) => (
              <motion.div
                key={event.year + event.title}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                className="relative flex gap-6 sm:gap-8"
              >
                <div className="hidden sm:flex flex-shrink-0 w-[15px] justify-center pt-1.5">
                  <div className="w-[7px] h-[7px] rounded-full bg-indigo-500 dark:bg-indigo-400 border-2 border-background" />
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-caption font-mono text-indigo-500 dark:text-indigo-400">
                      {event.year}
                    </span>
                    <span
                      className={cn(
                        "text-caption font-medium px-2 py-0.5 rounded-md border",
                        tagColors[event.tag] ||
                          "bg-surfaceLighter text-muted border-border"
                      )}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <h4 className="text-body-md font-medium text-foreground mb-1.5">
                    {event.title}
                  </h4>
                  <p className="text-body-sm text-muted leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}