import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import aboutVideo from "@/assets/about-video.mp4.asset.json";
import SectionTag from "@/components/SectionTag";
import AnimatedHeading from "@/components/AnimatedHeading";

/* Word-by-word ignite reveal — no letter splitting to avoid RTL reversal */
const IgniteText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={className} style={{ lineHeight: 1.6 }}>
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          className="relative inline-block"
          style={{ marginInlineEnd: "0.3em" }}
          initial={{ opacity: 0, filter: "brightness(3) blur(4px)" }}
          whileInView={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{
            delay: delay + wi * 0.06,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {word}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,200,100,0.8) 0%, rgba(255,150,50,0.4) 40%, transparent 70%)",
              mixBlendMode: "screen",
            }}
            initial={{ opacity: 1, scale: 1.5 }}
            whileInView={{ opacity: 0, scale: 0.5 }}
            viewport={{ once: false }}
            transition={{ delay: delay + wi * 0.06, duration: 0.6 }}
          />
        </motion.span>
      ))}
    </span>
  );
};

const pillars = [
  { titleKey: "about.mission.title", descKey: "about.mission.desc", icon: "◆" },
  { titleKey: "about.vision.title", descKey: "about.vision.desc", icon: "◉" },
  { titleKey: "about.values.title", descKey: "about.values.desc", icon: "✦" },
];

const About = () => {
  const { t, lang } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.0, 1.6, 2.2]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-background" ref={sectionRef}>
      <div className="pt-20 md:pt-32 pb-16 md:pb-24" ref={ref}>
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Video — flush to left edge */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-7 overflow-hidden shadow-2xl aspect-[4/3] md:aspect-[5/4] w-full"
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

          {/* Heading + text on the right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="md:col-span-5 px-6 md:px-10 lg:pe-16"
          >
            <div className="mb-6 flex flex-col items-start text-start">
              <SectionTag isVisible={isVisible}>{t("about.tag")}</SectionTag>
              <AnimatedHeading isVisible={isVisible}>{t("about.title")}</AnimatedHeading>
            </div>
            <IgniteText
              key={lang}
              text={t("about.story")}
              delay={0.5}
              className="text-muted-foreground text-xl md:text-2xl block leading-relaxed"
            />
          </motion.div>
        </div>
      </div>

      {/* === New dynamic pillars section (replaces brick wall) === */}
      <div ref={pillarsRef} className="relative overflow-hidden py-20 md:py-28">
        {/* Animated background orbs */}
        <motion.div
          aria-hidden
          className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)" }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/2 w-[22rem] h-[22rem] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
          animate={{ x: [0, 40, -40, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {pillars.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.18, duration: 0.8, ease: "easeOut" }}
                className="relative text-center md:text-start"
              >
                {/* Floating oversized number behind */}
                <motion.span
                  aria-hidden
                  className="absolute -top-10 start-0 font-display text-[7rem] md:text-[9rem] font-extrabold leading-none select-none pointer-events-none"
                  style={{ color: item.color, opacity: 0.1 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  0{i + 1}
                </motion.span>

                {/* Icon */}
                <motion.div
                  className="relative inline-block text-4xl md:text-5xl mb-5"
                  style={{ color: item.color }}
                  animate={{ rotate: [0, 8, -8, 0], y: [0, -4, 0] }}
                  transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <h3 className="relative font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">
                  {t(item.titleKey)}
                </h3>

                {/* Accent bar */}
                <motion.span
                  className="relative block h-[3px] rounded-full mb-4 mx-auto md:mx-0"
                  style={{ background: item.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.18 + 0.4, duration: 0.6 }}
                />

                {/* Description */}
                <p className="relative text-muted-foreground text-base md:text-lg leading-relaxed">
                  {t(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
