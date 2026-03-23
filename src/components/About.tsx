import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Target, Eye, Heart } from "lucide-react";
import { useRef } from "react";
import aboutImg from "@/assets/about-bg.jpg";

const values = [
  { icon: Target, titleKey: "about.mission.title", descKey: "about.mission.desc", color: "from-primary to-secondary" },
  { icon: Eye, titleKey: "about.vision.title", descKey: "about.vision.desc", color: "from-secondary to-accent" },
  { icon: Heart, titleKey: "about.values.title", descKey: "about.values.desc", color: "from-accent to-primary" },
];

const About = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.35, 1.5]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-background" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-primary-foreground mb-4"
          >
            {t("about.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            {t("about.title")}
          </motion.h2>
        </div>

        {/* Image + Text side by side */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          {/* Scroll-zoom image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
          >
            <motion.img
              src={aboutImg}
              alt="Our office space"
              style={{ scale: imageScale, y: imageY }}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="text-muted-foreground leading-relaxed text-lg mb-6"
            >
              {t("about.subtitle")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
              className="text-muted-foreground leading-relaxed text-base"
            >
              {t("about.story")}
            </motion.p>
          </motion.div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl bg-card/80 border border-border hover:border-primary/40 transition-all duration-300 hover-glow backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <h3 className="font-display font-semibold text-xl mb-3">{t(item.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
