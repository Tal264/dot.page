import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface AnimatedHeadingProps {
  children: ReactNode;
  isVisible?: boolean;
  className?: string;
  delay?: number;
}

/**
 * Clean heading. Reveals with a per-word stagger + subtle slide-up
 * when it scrolls into view, then stays completely still.
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
    if (isVisible) controls.start("visible");
  }, [isVisible, controls]);

  const container = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: 0.08 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      animate={controls}
      className={`font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground ${className}`}
    >
      {words ? (
        words.map((word, i) => (
          <motion.span key={i} variants={child} className="inline-block mr-[0.25em]">
            {word}
          </motion.span>
        ))
      ) : (
        <motion.span variants={child} className="inline-block">
          {children}
        </motion.span>
      )}
    </motion.h2>
  );
};

export default AnimatedHeading;
