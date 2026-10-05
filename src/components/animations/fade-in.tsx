"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/**
 * FadeIn — Wrapper component for scroll-triggered fade animations.
 *
 * Props:
 * - direction: "up" | "down" | "left" | "right" (default: "up")
 * - delay: animation delay in seconds (default: 0)
 * - duration: animation duration in seconds (default: 0.5)
 * - once: only animate once (default: true)
 * - className: additional CSS classes
 */
interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const directionVariants: Record<string, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className,
}: FadeInProps) {
  const initial = directionVariants[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...initial },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
