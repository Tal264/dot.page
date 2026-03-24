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
          {/* Light flash per letter */}
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

const wallTexts = [
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content - LEFT with ignite letter reveal */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="mb-8">
                <IgniteText
                  text={t("about.subtitle")}
                  delay={0.5}
                  className="text-muted-foreground leading-relaxed text-2xl md:text-3xl font-semibold block"
                />
              </div>
              <div>
                <IgniteText
                  text={t("about.story")}
                  delay={1.2}
                  className="text-muted-foreground leading-relaxed text-lg md:text-2xl block"
                />
              </div>
            </motion.div>

            {/* Scroll-zoom video - RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] md:min-h-[450px]"
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

      {/* Full-width brick wall with handwritten text */}
      <div ref={brickRef} className="relative overflow-hidden w-full" style={{ minHeight: "70vh" }}>
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

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Handwritten text on the wall */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full py-20 md:py-28 px-6 md:px-12" style={{ minHeight: "70vh" }}>
          {wallTexts.map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.25, duration: 0.8 }}
              className="text-center mb-12 md:mb-16 last:mb-0 max-w-5xl"
            >
              <h3
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg"
                style={{
                  fontFamily: "'Caveat', 'Segoe Script', 'Comic Sans MS', cursive",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {t(item.titleKey)}
              </h3>
              <p
                className="text-lg md:text-2xl lg:text-3xl text-white/90 leading-relaxed drop-shadow-md"
                style={{
                  fontFamily: "'Caveat', 'Segoe Script', 'Comic Sans MS', cursive",
                  textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
