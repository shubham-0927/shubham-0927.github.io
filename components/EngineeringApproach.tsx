"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { decisions } from "@/data/decisions";
import DecisionCard from "./DecisionCard";

export default function EngineeringApproach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-section bg-surfaceLight" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Engineering Approach</p>
          <h2 className="section-heading mb-4">
            Decisions, not defaults
          </h2>
          <p className="section-description">
            Every technology choice is backed by a reason. Here are some of the
            trade-off analyses that shaped my systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-content">
          {decisions.map((decision, index) => (
            <DecisionCard
              key={decision.question}
              decision={decision}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}