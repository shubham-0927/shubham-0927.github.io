"use client";

import { motion } from "framer-motion";
import type { Decision } from "@/data/decisions";
import {
  Rabbit,
  Zap,
  Search,
  Shield,
  Lock,
  BarChart3,
} from "lucide-react";
import TiltCard from "./TiltCard";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  rabbit: Rabbit,
  grpc: Zap,
  vector: Search,
  shield: Shield,
  lock: Lock,
  rank: BarChart3,
};

interface DecisionCardProps {
  decision: Decision;
  index: number;
}

export default function DecisionCard({ decision, index }: DecisionCardProps) {
  const Icon = iconMap[decision.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <TiltCard className="glass-card-hover p-6 group" tiltAmount={2}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-9 h-9 rounded-card bg-surfaceLighter border border-border flex items-center justify-center text-indigo-500 dark:text-indigo-400 group-hover:border-indigo-500/20 transition-colors duration-200">
            <Icon size={16} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="text-body-md font-medium text-foreground">
                {decision.question}
              </h4>
            </div>
            <p className="text-caption text-indigo-500 dark:text-indigo-400 mb-3">
              {decision.context}
            </p>
            <p className="text-body-sm text-foregroundSecondary leading-relaxed">
              {decision.answer}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}