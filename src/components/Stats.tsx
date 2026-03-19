import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

const stats = [
  { end: 150, suffix: "+", key: "stats.projects" },
  { end: 98, suffix: "%", key: "stats.satisfaction" },
  { end: 5, suffix: "+", key: "stats.years" },
  { end: 50, suffix: "+", key: "stats.clients" },
];

const StatItem = ({ end, suffix, label, started }: { end: number; suffix: string; label: string; started: boolean }) => {
  const count = useCountUp(end, 2000, started);
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative section-padding overflow-hidden" ref={ref}>
      {/* Parallax bg */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(262 83% 58% / 0.2), transparent 70%)"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        className="container mx-auto max-w-4xl relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatItem
              key={stat.key}
              end={stat.end}
              suffix={stat.suffix}
              label={t(stat.key)}
              started={isVisible}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
