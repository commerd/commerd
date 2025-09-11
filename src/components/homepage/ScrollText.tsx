"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TextBlock {
  id: string;
  header: string;
  subHeaders: string[];
  content: string;
}

interface ScrollTextProps {
  title: string;
  textBlocks: TextBlock[];
  className?: string;
}

export function ScrollText({ title, textBlocks, className = "" }: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Only start text transitions when component is fully in view
      // Map scroll progress from 0.1-0.9 to 0-1 for text blocks
      const adjustedProgress = Math.max(0, Math.min(1, (latest - 0.1) / 0.8));
      const blockIndex = Math.floor(adjustedProgress * textBlocks.length);
      setCurrentBlockIndex(Math.min(blockIndex, textBlocks.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress, textBlocks.length]);

  const currentBlock = textBlocks[currentBlockIndex] || textBlocks[0];

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: '200vh' }}
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          y: useTransform(scrollYProgress, [0.1, 0.9], [0, -100])
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        
        {/* Content container */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-8 text-center">
            {/* Main title */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1,
                y: 0
              }}
              transition={{ duration: 0.8 }}
            >
              {title}
            </motion.h2>

            {/* Text content that changes based on scroll */}
            <motion.div
              key={currentBlock.id}
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <h3 className="text-3xl md:text-4xl font-bold text-primary-400 mb-6">
                {currentBlock.header}
              </h3>

              {/* Sub headers */}
              <div className="space-y-4 mb-8">
                {currentBlock.subHeaders.map((subHeader, index) => (
                  <motion.h4
                    key={index}
                    className="text-xl md:text-2xl text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1
                    }}
                  >
                    {subHeader}
                  </motion.h4>
                ))}
              </div>

              {/* Content */}
              <motion.p
                className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.3
                }}
              >
                {currentBlock.content}
              </motion.p>
            </motion.div>

            {/* Progress indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {textBlocks.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentBlockIndex 
                        ? 'bg-primary-400 scale-125' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 z-30 text-white/60 text-sm">
          Scroll to continue
        </div>
      </motion.div>
    </div>
  );
}
