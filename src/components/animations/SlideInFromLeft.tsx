'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

interface SlideInFromLeftProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number; // 滑入距離
}

export default function SlideInFromLeft({
  children,
  className,
  delay = 0,
  distance = 50,
}: SlideInFromLeftProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.6, delay },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      className={clsx(className)}
      initial={{ x: -distance, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
