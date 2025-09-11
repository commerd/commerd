"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollContainer({ children, className = "" }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: '200vh' }} // Give it extra height for scroll
    >
      <motion.div
        className="sticky top-0 h-screen w-full"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100])
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
