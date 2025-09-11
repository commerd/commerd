"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { withLang } from "@/lib/i18n/links";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className = "", size = "md", animated = true }, ref) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = typeof lang === "string" ? lang : "en";
    const prefersReduced = useReducedMotion();
    const textSize = { sm: "text-sm", md: "text-base", lg: "text-lg" }[size];
    const iconSize = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" }[size];

    const shouldAnimate = animated && !prefersReduced;
    const homeUrl = withLang(currentLang, "/");

    return (
      <Link href={homeUrl} className={`inline-block ${className}`}>
        <motion.div
          ref={ref}
          className="flex flex-col items-center gap-1 select-none group"
          aria-label="Commerd logo - Go to homepage"
          initial="init"
          animate="enter"
          whileHover="hover"
          whileFocus="hover"
          variants={{
            init: {},
            enter: {},
            hover: {},
          }}
        >
          {/* Clean interlocked circles */}
          <motion.div
            className={`${iconSize} relative`}
            variants={{
              init: { scale: 1 },
              enter: { 
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" }
              },
              hover: { 
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeOut" }
              },
            }}
          >
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="overflow-visible"
            >
              {/* Left circle */}
              <motion.circle
                cx="35"
                cy="50"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-gray-900 group-hover:text-primary-600 transition-colors duration-300"
                variants={{
                  init: { 
                    pathLength: 0,
                    opacity: 0.8,
                    x: -5
                  },
                  enter: { 
                    pathLength: 1,
                    opacity: 1,
                    x: 0,
                    transition: { 
                      duration: 0.8, 
                      ease: "easeOut",
                      delay: shouldAnimate ? 0.1 : 0
                    }
                  },
                  hover: { 
                    x: -8,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  },
                }}
              />
              
              {/* Right circle */}
              <motion.circle
                cx="65"
                cy="50"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-gray-900 group-hover:text-primary-600 transition-colors duration-300"
                variants={{
                  init: { 
                    pathLength: 0,
                    opacity: 0.8,
                    x: 5
                  },
                  enter: { 
                    pathLength: 1,
                    opacity: 1,
                    x: 0,
                    transition: { 
                      duration: 0.8, 
                      ease: "easeOut",
                      delay: shouldAnimate ? 0.3 : 0
                    }
                  },
                  hover: { 
                    x: 8,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  },
                }}
              />
              
              {/* Connection line that appears on hover */}
              <motion.line
                x1="50"
                y1="25"
                x2="50"
                y2="75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-primary-500"
                variants={{
                  init: { opacity: 0, scaleY: 0 },
                  enter: { 
                    opacity: 0,
                    scaleY: 0,
                    transition: { duration: 0.3 }
                  },
                  hover: { 
                    opacity: 1,
                    scaleY: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  },
                }}
                style={{ transformOrigin: "center" }}
              />
            </motion.svg>
          </motion.div>

          {/* Clean text */}
          <motion.span
            className={`font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 ${textSize}`}
            variants={{
              init: { opacity: 0, y: 5 },
              enter: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                  delay: shouldAnimate ? 0.5 : 0,
                },
              },
              hover: { 
                y: -2,
                transition: { duration: 0.3, ease: "easeOut" }
              },
            }}
          >
            Commerd
          </motion.span>
        </motion.div>
      </Link>
    );
  }
);

Logo.displayName = "Logo";
export default Logo;

