"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function CursorGlow() {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: -300, y: -300 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 rounded-full"
      style={{
        left: position.x,
        top: position.y,
        width: 500,
        height: 500,
        transform: "translate(-50%, -50%)",
        background:
          theme === "dark"
            ? "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 65%)",
        transition: "opacity 0.4s ease",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}