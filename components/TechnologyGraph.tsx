"use client";


import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { techNodes, techEdges, groupColors } from "@/data/techGraph";
import type { TechNode } from "@/data/techGraph";
import { cn } from "@/lib/utils";


interface PositionedNode extends TechNode {
  x: number;
  y: number;
}

export default function TechnologyGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [positionedNodes, setPositionedNodes] = useState<PositionedNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const layoutNodes = useCallback(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    setDimensions({ width: w, height: h });

    const projects = techNodes.filter((n) => n.type === "project");
    const techs = techNodes.filter((n) => n.type === "technology");

    // Place projects in a 2x2 grid on the left side
    const projectPositions: Record<string, { x: number; y: number }> = {};
    const cols = 2;
    const cellW = w * 0.35;
    const cellH = h / 2;
    projects.forEach((p, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      projectPositions[p.id] = {
        x: cellW * 0.5 + col * cellW,
        y: cellH * 0.5 + row * cellH,
      };
    });

    // Place technologies on the right, grouped by connected project
    const techPositions: Record<string, { x: number; y: number }> = {};
    const rightStartX = w * 0.65;
    const rightWidth = w * 0.3;

    // Group techs by their primary connected project
    const techByProject: Record<string, string[]> = {};
    techs.forEach((t) => {
      const connectedEdge = techEdges.find((e) => e.target === t.id || e.source === t.id);
      if (connectedEdge) {
        const projectId = connectedEdge.source === t.id ? connectedEdge.target : connectedEdge.source;
        if (!techByProject[projectId]) techByProject[projectId] = [];
        techByProject[projectId].push(t.id);
      }
    });

    let yOffset = 40;
    const ySpacing = Math.min(38, (h - 80) / techs.length);
    Object.entries(techByProject).forEach(([projectId, techIds]) => {
      const projPos = projectPositions[projectId];
      if (!projPos) return;
      techIds.forEach((techId) => {
        // Spread across right side with some jitter
        const jitter = (Math.random() - 0.5) * 20;
        techPositions[techId] = {
          x: rightStartX + (Math.random() - 0.5) * rightWidth * 0.6,
          y: yOffset + jitter,
        };
        yOffset += ySpacing;
      });
    });

    const all: PositionedNode[] = [];
    projects.forEach((p) => {
      const pos = projectPositions[p.id];
      if (pos) all.push({ ...p, x: pos.x, y: pos.y });
    });
    techs.forEach((t) => {
      const pos = techPositions[t.id];
      if (pos) all.push({ ...t, x: pos.x, y: pos.y });
    });

    setPositionedNodes(all);
  }, []);

  useEffect(() => {
    layoutNodes();
    window.addEventListener("resize", layoutNodes);
    return () => window.removeEventListener("resize", layoutNodes);
  }, [layoutNodes]);

  const connectedNodeIds = useCallback(
    (nodeId: string): Set<string> => {
      const ids = new Set<string>();
      ids.add(nodeId);
      techEdges.forEach((e) => {
        if (e.source === nodeId) ids.add(e.target);
        if (e.target === nodeId) ids.add(e.source);
      });
      return ids;
    },
    []
  );

  const activeIds = hoveredNode ? connectedNodeIds(hoveredNode) : null;
  const nodeMap = new Map(positionedNodes.map((n) => [n.id, n]));

  return (
    <section id="tech-graph" className="py-section bg-surface/50" ref={containerRef}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label">Technology Graph</p>
          <h2 className="section-heading mb-4">Systems & their components</h2>
          <p className="section-description">
            How projects connect to the technologies that power them. Hover over
            any node to see its connections.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card p-4 md:p-6 overflow-hidden"
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${dimensions.width || 800} ${dimensions.height || 500}`}
            className="w-full h-auto"
            style={{ minHeight: "400px" }}
          >
            {/* Edges */}
            {techEdges.map((edge, i) => {
              const source = nodeMap.get(edge.source);
              const target = nodeMap.get(edge.target);
              if (!source || !target) return null;

              const isActive =
                activeIds?.has(edge.source) && activeIds?.has(edge.target);
              const isDimmed = activeIds && !isActive;

              return (
                <line
                  key={`edge-${i}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={
                    isActive
                      ? "rgba(99,102,241,0.4)"
                      : isDimmed
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.06)"
                  }
                  strokeWidth={isActive ? 1.5 : 0.8}
                  style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                />
              );
            })}

            {/* Nodes */}
            {positionedNodes.map((node) => {
              const isProject = node.type === "project";
              const isActive = activeIds?.has(node.id);
              const isDimmed = activeIds && !isActive;
              const isHovered = hoveredNode === node.id;
              const groupColor = node.group
                ? groupColors[node.group] || "#818cf8"
                : "#818cf8";
              const nodeColor = isProject ? "#818cf8" : groupColor;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Hover glow for projects */}
                  {isProject && isHovered && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={28}
                      fill="rgba(99,102,241,0.08)"
                    />
                  )}
                  {/* Node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isProject ? 8 : 4}
                    fill={isDimmed ? "rgba(255,255,255,0.08)" : nodeColor}
                    opacity={isDimmed ? 0.3 : 1}
                    style={{ transition: "all 0.2s" }}
                  />
                  {/* Label */}
                  <text
                    x={node.x + (isProject ? 16 : 10)}
                    y={node.y + 4}
                    fill={
                      isDimmed
                        ? "rgba(255,255,255,0.15)"
                        : isProject
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.5)"
                    }
                    fontSize={isProject ? 12 : 10}
                    fontWeight={isProject ? 600 : 400}
                    style={{ transition: "fill 0.2s" }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-5 px-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-400" />
            <span className="text-caption text-muted">Projects</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-caption text-muted">Technologies</span>
          </div>
          {Object.entries(groupColors)
            .slice(0, 4)
            .map(([group, color]) => (
              <div key={group} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-caption text-muted capitalize">
                  {group}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}