import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedHeadingProps {
  children: ReactNode;
  isVisible?: boolean;
  className?: string;
  delay?: number;
}

/**
 * Clean, minimal section heading with a subtle continuous motion.
 */
const AnimatedHeading = ({
  children,
  isVisible = true,
  className = "",
  delay = 0.1,
}: AnimatedHeadingProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground ${className}`}
    >
      <motion.span
        className="inline-block"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
    </motion.h2>
  );
};

export default AnimatedHeading;
