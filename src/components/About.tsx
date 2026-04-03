import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import aboutVideo from "@/assets/about-video.mp4.asset.json";
import brickWall from "@/assets/brick-wall.jpg";

/* Letter-by-letter ignite reveal */
const IgniteText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const letters = text.split("");
  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="relative inline-block"
          initial={{ opacity: 0, filter: "brightness(3) blur(4px)" }}
          whileInView={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.4,
            ease: "easeOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,200,100,0.8) 0%, rgba(255,150,50,0.4) 40%, transparent 70%)",
              mixBlendMode: "screen",
            }}
            initial={{ opacity: 1, scale: 1.5 }}
            whileInView={{ opacity: 0, scale: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.03, duration: 0.6 }}
          />
        </motion.span>
      ))}
    </span>
  );
};

const checklistItems = [
  { titleKey: "about.mission.title", descKey: "about.mission.desc" },
  { titleKey: "about.vision.title", descKey: "about.vision.desc" },
  { titleKey: "about.values.title", descKey: "about.values.desc" },
];

const About = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const brickRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: brickScrollProgress } = useScroll({
    target: brickRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.0, 1.6, 2.2]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const brickScale = useTransform(brickScrollProgress, [0, 0.5, 1], [1.0, 1.2, 1.4]);
  const brickY = useTransform(brickScrollProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-background" ref={sectionRef}>
      {/* Top section with video + text */}
      <div className="section-padding">
        <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
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

          {/* Video + Text side by side */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text content - LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="max-w-md"
              style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
            >
              <IgniteText
                text={t("about.story")}
                delay={0.5}
                className="text-muted-foreground leading-loose text-xl md:text-3xl block"
              />
            </motion.div>

            {/* Scroll-zoom video - RIGHT, no rounded corners */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="overflow-hidden shadow-2xl aspect-[4/3] md:min-h-[450px]"
            >
              <motion.video
                src={aboutVideo.url}
                autoPlay
                muted
                loop
                playsInline
                style={{ scale: videoScale, y: videoY }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-width brick wall checklist */}
      <div ref={brickRef} className="relative overflow-hidden w-full aspect-[21/9] md:aspect-[3/1]">
        {/* Brick background with scroll zoom */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: brickScale, y: brickY }}
        >
          <img
            src={brickWall}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={900}
          />
        </motion.div>

        {/* Overlay for contrast in both modes */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />

        {/* Checklist on the wall */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24 py-8">
          <div className="flex flex-col gap-4 md:gap-6 max-w-6xl mx-auto w-full">
            {checklistItems.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.25, duration: 0.6, ease: "easeOut" }}
                className="flex items-start gap-3 md:gap-5"
              >
                {/* Animated checkbox mark */}
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.25 + 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
                  className="text-3xl md:text-5xl mt-0.5 flex-shrink-0 select-none"
                  style={{
                    fontFamily: "'Caveat', 'Segoe Script', cursive",
                    color: "#1a1a1a",
                    textShadow: "0 0 8px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  ✓
                </motion.span>

                {/* Title + description */}
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                  <motion.h3
                    className="text-2xl md:text-3xl lg:text-4xl whitespace-nowrap"
                    style={{
                      fontFamily: "'Caveat', 'Segoe Script', cursive",
                      fontWeight: 700,
                      color: "#111111",
                      textShadow: "0 0 12px rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.4)",
                      WebkitTextStroke: "0.5px rgba(0,0,0,0.3)",
                    }}
                    animate={{
                      textShadow: [
                        "0 0 12px rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.4)",
                        "0 0 20px rgba(255,255,255,0.9), 0 1px 6px rgba(0,0,0,0.5)",
                        "0 0 12px rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.4)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {t(item.titleKey)}
                  </motion.h3>
                  <span
                    className="hidden md:inline text-2xl lg:text-3xl"
                    style={{ fontFamily: "'Caveat', cursive", color: "rgba(0,0,0,0.5)" }}
                  >
                    —
                  </span>
                  <motion.p
                    className="text-lg md:text-xl lg:text-2xl leading-snug"
                    style={{
                      fontFamily: "'Caveat', 'Segoe Script', cursive",
                      fontWeight: 600,
                      color: "#222222",
                      textShadow: "0 0 10px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.3)",
                    }}
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.3)",
                        "0 0 16px rgba(255,255,255,0.8), 0 1px 4px rgba(0,0,0,0.4)",
                        "0 0 10px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.3)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    {t(item.descKey)}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
