import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedHeadingProps {
  children: ReactNode;
  isVisible?: boolean;
  className?: string;
  delay?: number;
}

/**
 * Section heading with entrance + subtle continuous motion (gentle float + shimmer).
 * Keeps the site feeling alive without being distracting.
 */
const AnimatedHeading = ({
  children,
  isVisible = true,
  className = "",
  delay = 0.1,
}: AnimatedHeadingProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`relative inline-block font-display text-3xl md:text-5xl font-bold mb-4 ${className}`}
    >
      <motion.span
        className="relative inline-block"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
        {/* Shimmer sweep */}
        <motion.span
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(110deg, transparent 30%, hsl(var(--primary) / 0.55) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-100% 0%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
        >
          {children}
        </motion.span>
      </motion.span>
      {/* Underline accent that breathes */}
      <motion.span
        aria-hidden
        className="block h-[3px] rounded-full mt-3 mx-auto"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
        }}
        initial={{ width: 0 }}
        animate={isVisible ? { width: ["0%", "60%", "40%"] } : {}}
        transition={{ delay: delay + 0.2, duration: 1.4, ease: "easeOut" }}
      />
    </motion.h2>
  );
};

export default AnimatedHeading;
