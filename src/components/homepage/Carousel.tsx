"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  className?: string;
}

export function Carousel({ items, className = "" }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
      setIsInView(latest > 0 && latest < 1);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden ${className}`}
      style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-700/90 z-10" />
      
      {/* Content container */}
      <div className="relative z-20 h-full flex items-center">
        <motion.div
          className="flex gap-8 px-8"
          style={{ x }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isInView ? 1 : 0.3,
                y: isInView ? 0 : 50,
                scale: isInView ? 1 : 0.9
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1
              }}
            >
              <div className="text-white">
                {item.icon && (
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl mb-6">
                    {item.icon}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 z-30 text-white/60 text-sm">
        Scroll to continue
      </div>
    </div>
  );
}
