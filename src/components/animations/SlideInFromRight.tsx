'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import clsx from 'clsx';

export default function SlideInFromRight({ children, className, delay = 0, distance = 50 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

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
      initial={{ x: distance, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
