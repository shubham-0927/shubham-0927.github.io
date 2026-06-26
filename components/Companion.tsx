"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { X } from "lucide-react";

const messages = [
  "A distributed system is just a way to make simple things complicated.",
  "I once tried Kafka for a to-do list. It processed 10k events before I finished typing.",
  "A SQL query walks into a bar, sees two tables and asks... can I JOIN you?",
  "There are only 2 hard problems: cache invalidation, naming things, and off-by-one errors.",
  "I told my system to be consistent. It said 'eventually.'",
  "My circuit breaker tripped so many times it should be an Olympic sport.",
  "RabbitMQ called. It has a message for you. Actually, 14,000 messages.",
  "Why gRPC? Because REST was taking too many RESTs.",
  "FAISS is so fast it found your data before you lost it.",
  "Two-Phase Commit: where both phases have trust issues.",
  "I'm not lazy, I'm just in an idle state waiting for an interrupt.",
  "My Promises keep getting rejected. Just like my pull requests.",
  "A microservice walked into a bar. The bar needed 6 other bars to serve one drink.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "I survived a cascading failure. The system did not.",
];

const idleMessages = [
  "scrolling through logs...",
  "thinking about consistency...",
  "measuring latency...",
  "balancing a load...",
  "partitioning a table...",
  "tracing a request...",
  "watching you scroll...",
  "counting nodes...",
];

const mischiefTexts = [
  "peeking at your code...",
  "pretending to work...",
  "hiding your logs...",
  "redirecting traffic...",
  "eating your cookies...",
  "dropping packets...",
];

type CompanionState =
  | "idle"
  | "talking"
  | "sleeping"
  | "dragging"
  | "excited"
  | "walking"
  | "mischievous";

function RobotSVG({
  state,
  eyeOffset,
  isDark,
}: {
  state: CompanionState;
  eyeOffset: { x: number; y: number };
  isDark: boolean;
}) {
  const body = isDark ? "#a5b4fc" : "#4f46e5";
  const bodyDark = isDark ? "#6366f1" : "#3730a3";
  const bodyStroke = isDark ? "#c7d2fe" : "#312e81";
  const face = isDark ? "#1e1b4b" : "#f5f3ff";
  const eyeWhite = isDark ? "#e0e7ff" : "#ffffff";
  const pupil = isDark ? "#312e81" : "#1e1b4b";
  const mouth = isDark ? "#818cf8" : "#4338ca";
  const cheek = isDark ? "rgba(244,114,182,0.4)" : "rgba(244,114,182,0.3)";
  const highlight = "rgba(255,255,255,0.2)";

  const isSleeping = state === "sleeping";
  const isTalking = state === "talking";
  const isExcited = state === "excited";
  const isWalking = state === "walking";
  const isMischievous = state === "mischievous";

  return (
    <svg
      viewBox="0 0 64 84"
      width="64"
      height="84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground shadow */}
      <ellipse cx="32" cy="81" rx="20" ry="3" fill="black" opacity="0.2" />

      {/* Feet */}
      <rect x="13" y="66" width="15" height="10" rx="5" fill={body} stroke={bodyStroke} strokeWidth="1.5" />
      <rect x="36" y="66" width="15" height="10" rx="5" fill={body} stroke={bodyStroke} strokeWidth="1.5" />
      {/* Foot highlights */}
      <rect x="15" y="67" width="11" height="4" rx="2" fill={highlight} />
      <rect x="38" y="67" width="11" height="4" rx="2" fill={highlight} />

      {/* Antenna stick */}
      <line x1="32" y1="16" x2="32" y2="6" stroke={bodyStroke} strokeWidth="2.5" strokeLinecap="round" />
      {/* Antenna ball */}
      <circle cx="32" cy="4.5" r="4" fill={body} stroke={bodyStroke} strokeWidth="1.5" />
      <circle cx="31" cy="3.5" r="1.5" fill={highlight} />
      {/* Antenna glow ring */}
      <circle cx="32" cy="4.5" r="7" fill="none" stroke={body} strokeWidth="0.8" opacity="0.3" />

      {/* Main body — filled solid with stroke so it's never ghostly */}
      <rect x="5" y="14" width="54" height="54" rx="15" fill={body} stroke={bodyStroke} strokeWidth="1.5" />
      {/* Body bottom darker half for depth */}
      <rect x="5" y="40" width="54" height="28" rx="0" fill={bodyDark} opacity="0.25" />
      {/* Re-clip bottom corners */}
      <rect x="5" y="14" width="54" height="54" rx="15" fill="none" stroke={bodyStroke} strokeWidth="1.5" />
      {/* Top highlight */}
      <rect x="7" y="16" width="50" height="22" rx="13" fill={highlight} opacity="0.4" />

      {/* Face background — much lighter in dark mode */}
      <rect x="10" y="19" width="44" height="44" rx="11" fill={face} stroke={bodyStroke} strokeWidth="1" opacity="0.95" />

      {/* Eyes */}
      {isSleeping ? (
        <>
          <path d="M17 34 Q23 31 29 34" stroke={pupil} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M35 34 Q41 31 47 34" stroke={pupil} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          {/* Left eye */}
          <circle cx="23" cy="34" r="7" fill={eyeWhite} stroke={pupil} strokeWidth="1" />
          <circle cx={23 + eyeOffset.x} cy={34 + eyeOffset.y} r="3.5" fill={pupil} />
          <circle cx={24 + eyeOffset.x * 0.3} cy={33 + eyeOffset.y * 0.3} r="1.5" fill="white" />
          <circle cx={21.5 + eyeOffset.x * 0.5} cy={35.5 + eyeOffset.y * 0.5} r="0.8" fill="white" opacity="0.7" />

          {/* Right eye */}
          <circle cx="41" cy="34" r="7" fill={eyeWhite} stroke={pupil} strokeWidth="1" />
          <circle cx={41 + eyeOffset.x} cy={34 + eyeOffset.y} r="3.5" fill={pupil} />
          <circle cx={42 + eyeOffset.x * 0.3} cy={33 + eyeOffset.y * 0.3} r="1.5" fill="white" />
          <circle cx={39.5 + eyeOffset.x * 0.5} cy={35.5 + eyeOffset.y * 0.5} r="0.8" fill="white" opacity="0.7" />
        </>
      )}

      {/* Mouth */}
            {isTalking ? (
        <>
          <ellipse cx="32" cy="48" rx="5.5" ry="4" fill={mouth} />
          <ellipse cx="32" cy="47" rx="3" ry="1.5" fill="white" opacity="0.3" />
        </>
      ) : isExcited || isMischievous ? (
        <path d="M26 47 Q32 54 38 47" stroke={mouth} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : isSleeping ? (
        <line x1="29" y1="48" x2="35" y2="48" stroke={mouth} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      ) : isWalking ? (
        <line x1="28" y1="48" x2="36" y2="48" stroke={mouth} strokeWidth="2" strokeLinecap="round" />
      ) : (
        <rect x="28" y="47" width="8" height="3" rx="1.5" fill={mouth} opacity="0.7" />
      )}

      {/* Cheeks — more visible */}
      <circle cx="13" cy="43" r="4.5" fill={cheek} />
      <circle cx="51" cy="43" r="4.5" fill={cheek} />

      {/* Mischievous sparkle eye */}
      {isMischievous && (
        <>
          <path d="M50 8 L52 12 L56 12 L53 15 L54 19 L50 16 L46 19 L47 15 L44 12 L48 12 Z" fill="#fbbf24" opacity="0.9" />
          <path d="M8 20 L9 22 L11 22 L10 24 L10 26 L8 24 L6 26 L6 24 L5 22 L7 22 Z" fill="#fbbf24" opacity="0.6" />
        </>
      )}

      {/* Walking motion lines */}
      {isWalking && (
        <>
          <line x1="0" y1="35" x2="4" y2="35" stroke={body} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="-1" y1="42" x2="3" y2="42" stroke={body} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <line x1="60" y1="38" x2="64" y2="38" stroke={body} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </>
      )}

      {/* Sleep Z */}
      {isSleeping && (
        <g>
          <text x="52" y="10" fontSize="10" fontWeight="800" fill={body} opacity="0.7" fontFamily="sans-serif">Z</text>
          <text x="58" y="4" fontSize="7" fontWeight="800" fill={body} opacity="0.4" fontFamily="sans-serif">z</text>
        </g>
      )}
    </svg>
  );
}

export default function Companion() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<CompanionState>("idle");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [usedMessages, setUsedMessages] = useState<Set<number>>(new Set());
  const [idleText, setIdleText] = useState("");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [facingLeft, setFacingLeft] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const isDragging = useRef(false);
  const lastInteraction = useRef(Date.now());
  const sleepTimer = useRef<NodeJS.Timeout | null>(null);
  const wanderTimer = useRef<NodeJS.Timeout | null>(null);
  const animFrame = useRef<number>(0);

  // Init position — center-right, clearly visible
  useEffect(() => {
    const x = Math.min(window.innerWidth * 0.75, window.innerWidth - 100);
    const y = window.innerHeight * 0.45;
    setPosition({ x: Math.max(60, x), y: Math.max(100, y) });
    setIsInitialized(true);
  }, []);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + 35;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOff = 2.5;
      const f = Math.min(dist / 200, 1);
      setEyeOffset({
        x: (dx / (dist || 1)) * maxOff * f,
        y: (dy / (dist || 1)) * maxOff * f,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Idle text
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      if (state === "idle") {
        setIdleText(idleMessages[idx % idleMessages.length]);
        idx++;
      }
    }, 4000);
    return () => clearInterval(iv);
  }, [state]);

  // Sleep
  useEffect(() => {
    if (sleepTimer.current) clearTimeout(sleepTimer.current);
    sleepTimer.current = setTimeout(() => {
      if (Date.now() - lastInteraction.current > 20000 && (state === "idle" || state === "walking")) {
        setState("sleeping");
        if (wanderTimer.current) clearTimeout(wanderTimer.current);
      }
    }, 20000);
    return () => { if (sleepTimer.current) clearTimeout(sleepTimer.current); };
  }, [state]);

  // ======= WANDERING SYSTEM =======
  const wanderTo = useCallback(
    (targetX: number, targetY: number, onArrive?: () => void) => {
      const startX = position.x;
      const startY = position.y;
      const dx = targetX - startX;
      const dy = targetY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 10) {
        onArrive?.();
        return;
      }

      if (dx < 0) setFacingLeft(true);
      else if (dx > 0) setFacingLeft(false);

      const duration = Math.max(1500, dist * 8);
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease in-out
        const ease = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const nx = startX + dx * ease;
        const ny = startY + dy * ease + Math.sin(progress * Math.PI * 4) * 3; // bobble

        setPosition({
          x: Math.max(10, Math.min(window.innerWidth - 80, nx)),
          y: Math.max(75, Math.min(window.innerHeight - 110, ny)),
        });

        if (progress < 1) {
          animFrame.current = requestAnimationFrame(step);
        } else {
          onArrive?.();
        }
      };

      animFrame.current = requestAnimationFrame(step);
    },
    [position]
  );

  const pickRandomTarget = useCallback(() => {
    const margin = 80;
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 120;
    return {
      x: Math.max(margin, Math.min(maxX, Math.random() * maxX)),
      y: Math.max(margin, Math.min(maxY, Math.random() * maxY)),
    };
  }, []);

  const startWanderCycle = useCallback(() => {
    if (wanderTimer.current) clearTimeout(wanderTimer.current);

    const doWander = () => {
      if (!isVisible) return;
      lastInteraction.current = Date.now();

      // Decide: walk, mischief, or idle
      const roll = Math.random();

      if (roll < 0.55) {
        // Walk to random spot
        setState("walking");
        const target = pickRandomTarget();
        wanderTo(target.x, target.y, () => {
          setState("idle");
          scheduleNext(2000 + Math.random() * 3000);
        });
      } else if (roll < 0.8) {
        // Mischief!
        setState("mischievous");
        const msg = mischiefTexts[Math.floor(Math.random() * mischiefTexts.length)];
        setIdleText(msg);
        // Quick dart to a nearby spot
        const target = pickRandomTarget();
        const shortTarget = {
          x: position.x + (target.x - position.x) * 0.3,
          y: position.y + (target.y - position.y) * 0.3,
        };
        wanderTo(shortTarget.x, shortTarget.y, () => {
          setState("idle");
          scheduleNext(3000 + Math.random() * 2000);
        });
      } else {
        // Stay idle
        setState("idle");
        scheduleNext(3000 + Math.random() * 4000);
      }
    };

    const scheduleNext = (delay: number) => {
      wanderTimer.current = setTimeout(doWander, delay);
    };

    // Start first wander after a short delay
    scheduleNext(3000 + Math.random() * 2000);
  }, [isVisible, pickRandomTarget, wanderTo, position.x, position.y]);

  useEffect(() => {
    if (isInitialized && isVisible) {
      startWanderCycle();
    }
    return () => {
      if (wanderTimer.current) clearTimeout(wanderTimer.current);
      cancelAnimationFrame(animFrame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isVisible]);

  // Restart wandering after user interaction ends
  const restartWandering = useCallback(() => {
    if (wanderTimer.current) clearTimeout(wanderTimer.current);
    cancelAnimationFrame(animFrame.current);
    startWanderCycle();
  }, [startWanderCycle]);

  // ======= INTERACTIONS =======
  const getRandomMessage = useCallback(() => {
    if (usedMessages.size >= messages.length) setUsedMessages(new Set());
    let idx: number;
    do {
      idx = Math.floor(Math.random() * messages.length);
    } while (usedMessages.has(idx));
    setUsedMessages((prev) => new Set(prev).add(idx));
    return messages[idx];
  }, [usedMessages]);

  const triggerTalk = useCallback(() => {
    lastInteraction.current = Date.now();
    if (wanderTimer.current) clearTimeout(wanderTimer.current);
    cancelAnimationFrame(animFrame.current);

    if (state === "sleeping") {
      setState("excited");
      setTimeout(() => {
        setState("idle");
        restartWandering();
      }, 1500);
      return;
    }

    const msg = getRandomMessage();
    setMessage(msg);
    setShowBubble(true);
    setState("talking");

    setTimeout(() => {
      setShowBubble(false);
      setState("idle");
      restartWandering();
    }, 4200);
  }, [state, getRandomMessage, restartWandering]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (wanderTimer.current) clearTimeout(wanderTimer.current);
    cancelAnimationFrame(animFrame.current);
    isDragging.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y };

    const handleMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStart.current.x;
      const dy = ev.clientY - dragStart.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        isDragging.current = true;
        setState("dragging");
      }
      if (isDragging.current) {
        if (dx < -2) setFacingLeft(true);
        else if (dx > 2) setFacingLeft(false);
        setPosition({
          x: Math.max(5, Math.min(window.innerWidth - 75, dragStart.current.posX + dx)),
          y: Math.max(70, Math.min(window.innerHeight - 100, dragStart.current.posY + dy)),
        });
      }
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      if (!isDragging.current) {
        triggerTalk();
      } else {
        isDragging.current = false;
        setState("idle");
        lastInteraction.current = Date.now();
        restartWandering();
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (wanderTimer.current) clearTimeout(wanderTimer.current);
    cancelAnimationFrame(animFrame.current);
    const t = e.touches[0];
    isDragging.current = false;
    dragStart.current = { x: t.clientX, y: t.clientY, posX: position.x, posY: position.y };

    const handleMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        isDragging.current = true;
        setState("dragging");
      }
      if (isDragging.current) {
        if (dx < -2) setFacingLeft(true);
        else if (dx > 2) setFacingLeft(false);
        setPosition({
          x: Math.max(5, Math.min(window.innerWidth - 75, dragStart.current.posX + dx)),
          y: Math.max(70, Math.min(window.innerHeight - 100, dragStart.current.posY + dy)),
        });
      }
    };

    const handleEnd = () => {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
      if (!isDragging.current) {
        triggerTalk();
      } else {
        isDragging.current = false;
        setState("idle");
        lastInteraction.current = Date.now();
        restartWandering();
      }
    };

    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
  };

  const handleClose = () => {
    setIsVisible(false);
    if (wanderTimer.current) clearTimeout(wanderTimer.current);
    cancelAnimationFrame(animFrame.current);
    setTimeout(() => {
      const nx = Math.min(window.innerWidth * 0.7, window.innerWidth - 100);
      const ny = window.innerHeight * 0.5;
      setPosition({ x: Math.max(60, nx), y: Math.max(100, ny) });
      setIsVisible(true);
      setState("idle");
    }, 30000);
  };

  if (!isInitialized) return null;

  // High-contrast text colors
  const bubbleBg = isDark ? "rgba(30,27,75,0.95)" : "rgba(255,255,255,0.97)";
  const bubbleBorder = isDark ? "rgba(129,140,248,0.3)" : "rgba(79,70,229,0.2)";
  const bubbleText = isDark ? "#e0e7ff" : "#1e1b4b";
  const idleTextColor = isDark ? "rgba(165,180,252,0.7)" : "rgba(79,70,229,0.6)";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          ref={containerRef}
          className="fixed z-40 select-none"
          style={{
            left: position.x,
            top: position.y,
            cursor: state === "dragging" ? "grabbing" : "grab",
          }}
          onMouseDown={onMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full border flex items-center justify-center transition-all opacity-0 hover:opacity-100"
            style={{
              zIndex: 50,
              background: isDark ? "#1e1b4b" : "#ffffff",
              borderColor: isDark ? "rgba(129,140,248,0.3)" : "rgba(0,0,0,0.1)",
              color: isDark ? "#a5b4fc" : "#4f46e5",
            }}
            onMouseEnter={(e) => e.stopPropagation()}
          >
            <X size={9} strokeWidth={2.5} />
          </button>

          {/* Speech bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 pointer-events-none"
                style={{ zIndex: 60 }}
              >
                <div
                  className="rounded-xl px-4 py-3 shadow-2xl relative"
                  style={{
                    background: bubbleBg,
                    border: `1px solid ${bubbleBorder}`,
                    color: bubbleText,
                    backdropFilter: "blur(16px)",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "1.6",
                    letterSpacing: "0.01em",
                  }}
                >
                  {message}
                  <div
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                    style={{
                      background: bubbleBg,
                      borderRight: `1px solid ${bubbleBorder}`,
                      borderBottom: `1px solid ${bubbleBorder}`,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Character */}
          <motion.div
            animate={
              state === "idle"
                ? { y: [0, -4, 0] }
                : state === "excited"
                ? { y: [0, -12, -4, -12, 0], rotate: [0, -8, 8, -4, 0] }
                : state === "talking"
                ? { scale: [1, 1.05, 1] }
                : state === "sleeping"
                ? { y: 2, rotate: [0, -2, 0, 2, 0] }
                : state === "mischievous"
                ? { rotate: [0, -3, 3, -2, 0] }
                : {}
            }
            transition={
              state === "idle"
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : state === "excited"
                ? { duration: 0.35, repeat: 3 }
                : state === "talking"
                ? { duration: 0.3, repeat: Infinity }
                : state === "sleeping"
                ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                : state === "mischievous"
                ? { duration: 0.5, repeat: 3 }
                : { duration: 0.2 }
            }
            style={{
              transformOrigin: "center bottom",
              scaleX: facingLeft ? -1 : 1,
            }}
          >
            <RobotSVG state={state} eyeOffset={eyeOffset} isDark={isDark} />
          </motion.div>

          {/* Status text — always visible */}
          <AnimatePresence mode="wait">
            {(state === "idle" || state === "walking" || state === "mischievous") && idleText && (
              <motion.p
                key={idleText}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.25 }}
                className="text-center mt-1.5 whitespace-nowrap font-medium"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: idleTextColor,
                  letterSpacing: "0.01em",
                  textShadow: isDark
                    ? "0 1px 4px rgba(0,0,0,0.8)"
                    : "0 1px 4px rgba(255,255,255,0.9)",
                }}
              >
                {idleText}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}