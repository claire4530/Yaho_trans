"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import clsx from "clsx";

interface LetterFadeInProps {
  text: string;
  delayPerChar?: number;
  className?: string;
}

//滾動進場
export default function LetterFadeIn({
  text,
  delayPerChar = 0.05,
  className = "",
}: LetterFadeInProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * delayPerChar },
      }));
    }
  }, [controls, inView, delayPerChar]);

  return (
    <div ref={ref} className={clsx("flex", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
