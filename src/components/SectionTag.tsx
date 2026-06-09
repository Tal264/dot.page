import { motion } from "framer-motion";

interface SectionTagProps {
  children: React.ReactNode;
  isVisible?: boolean;
}

const SectionTag = ({ children, isVisible = true }: SectionTagProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="flex items-center justify-center gap-3 w-full mb-4"
  >
    <span className="h-px w-8 bg-primary/40" />
    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
      {children}
    </span>
    <span className="h-px w-8 bg-primary/40" />
  </motion.div>
);

export default SectionTag;
