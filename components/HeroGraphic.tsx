"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function HeroGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const isDark = theme === "dark";
    let time = 0;
    let animId: number;

    const nodes: { angle: number; radius: number; speed: number; size: number; ring: number }[] = [];

    for (let ring = 0; ring < 3; ring++) {
      const count = 6 + ring * 4;
      const r = 60 + ring * 50;
      for (let i = 0; i < count; i++) {
        nodes.push({
          angle: (Math.PI * 2 * i) / count,
          radius: r,
          speed: (0.003 + Math.random() * 0.004) * (ring % 2 === 0 ? 1 : -1),
          size: 2 + Math.random() * 2,
          ring,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      time += 1;

      const ringColors = isDark
        ? ["rgba(99,102,241,0.12)", "rgba(56,189,248,0.08)", "rgba(129,140,248,0.05)"]
        : ["rgba(79,70,229,0.08)", "rgba(2,132,199,0.06)", "rgba(99,102,241,0.04)"];

      const nodeColors = isDark
        ? ["rgba(129,140,248,", "rgba(56,189,248,", "rgba(167,139,250,"]
        : ["rgba(79,70,229,", "rgba(2,132,199,", "rgba(99,102,241,"];

      // Ring paths
      for (let ring = 0; ring < 3; ring++) {
        const r = 60 + ring * 50;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = ringColors[ring];
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update and draw connections
      const positions: { x: number; y: number; ring: number }[] = [];

      for (const node of nodes) {
        node.angle += node.speed;
        const x = cx + Math.cos(node.angle) * node.radius;
        const y = cy + Math.sin(node.angle) * node.radius;
        positions.push({ x, y, ring: node.ring });
      }

      // Draw lines between adjacent rings
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          if (Math.abs(positions[i].ring - positions[j].ring) === 1) {
            const dx = positions[i].x - positions[j].x;
            const dy = positions[i].y - positions[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              const alpha = (1 - dist / 80) * 0.08;
              ctx.beginPath();
              ctx.moveTo(positions[i].x, positions[i].y);
              ctx.lineTo(positions[j].x, positions[j].y);
              ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < positions.length; i++) {
        const node = nodes[i];
        const { x, y } = positions[i];
        const pulse = Math.sin(time * 0.03 + node.angle * 2) * 0.3 + 0.7;
        const baseColor = nodeColors[node.ring];

        ctx.beginPath();
        ctx.arc(x, y, node.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `${baseColor}${0.6 * pulse})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, node.size * pulse + 4, 0, Math.PI * 2);
        ctx.fillStyle = `${baseColor}${0.08 * pulse})`;
        ctx.fill();
      }

      // Center element
      const centerPulse = Math.sin(time * 0.02) * 0.2 + 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, 12 * centerPulse, 0, Math.PI * 2);
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 12 * centerPulse);
      centerGrad.addColorStop(0, isDark ? "rgba(129,140,248,0.5)" : "rgba(79,70,229,0.4)");
      centerGrad.addColorStop(1, isDark ? "rgba(129,140,248,0)" : "rgba(79,70,229,0)");
      ctx.fillStyle = centerGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(129,140,248,0.9)" : "rgba(79,70,229,0.8)";
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[400px] max-h-[400px]"
      style={{ pointerEvents: "none" }}
    />
  );
}