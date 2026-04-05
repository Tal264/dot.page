import { motion } from "framer-motion";

interface SectionTagProps {
  children: React.ReactNode;
  isVisible?: boolean;
}

const SectionTag = ({ children, isVisible = true }: SectionTagProps) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={isVisible ? { opacity: 1 } : {}}
    className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase gradient-bg text-primary-foreground hover:opacity-90 transition-opacity animate-pulse-glow mb-4"
  >
    {children}
  </motion.span>
);

export default SectionTag;
