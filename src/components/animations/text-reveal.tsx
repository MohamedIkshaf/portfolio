"use client";

import { motion } from "framer-motion";

/**
 * TextReveal — Animates text character by character.
 * Great for hero headings and important titles.
 */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  charDelay = 0.03,
  once = true,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: charDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.25, 0.4, 0.25, 1],
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
          {/* Add space between words */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}
