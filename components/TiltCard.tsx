"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  enableSpotlight?: boolean;
}

export default function TiltCard({
  children,
  className,
  tiltAmount = 2.5,
  enableSpotlight = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  );
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
    );
    setSpotlight({ x, y });
    if (!isHovering) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setIsHovering(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
      style={{
        transform,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {enableSpotlight && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 rounded-[inherit]",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: `radial-gradient(500px circle at ${spotlight.x}px ${spotlight.y}px, var(--spotlight-color), transparent 60%)`,
          }}
        />
      )}
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
    </div>
  );
}