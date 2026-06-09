import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface AnimatedHeadingProps {
  children: ReactNode;
  isVisible?: boolean;
  className?: string;
  delay?: number;
}

/**
 * Unified site heading. On reveal: words rise + un-blur with a soft stagger,
 * and a primary accent rule sweeps in beneath. After the reveal, the heading
 * is completely static.
 */
const AnimatedHeading = ({
  children,
  isVisible = true,
  className = "",
  delay = 0.1,
}: AnimatedHeadingProps) => {
  const controls = useAnimation();

  const text = typeof children === "string" ? children : "";
  const words = text ? text.split(" ") : null;

  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [isVisible, controls]);

  const container = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: 0.07 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className={`relative inline-block ${className.includes("text-") ? "" : ""}`}>
      <motion.h2
        variants={container}
        initial="hidden"
        animate={controls}
        className={`font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight text-foreground ${className}`}
      >
        {words ? (
          words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom mr-[0.25em]">
              <motion.span variants={child} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))
        ) : (
          <motion.span variants={child} className="inline-block">
            {children}
          </motion.span>
        )}
      </motion.h2>
    </div>
  );
};

export default AnimatedHeading;
