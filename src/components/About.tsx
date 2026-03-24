import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Target, Eye, Heart } from "lucide-react";
import { useRef } from "react";
import aboutVideo from "@/assets/about-video.mp4.asset.json";
import brickWall from "@/assets/brick-wall.jpg";

const values = [
  { icon: Target, titleKey: "about.mission.title", descKey: "about.mission.desc", color: "from-orange-600 to-red-800" },
  { icon: Eye, titleKey: "about.vision.title", descKey: "about.vision.desc", color: "from-red-700 to-amber-600" },
  { icon: Heart, titleKey: "about.values.title", descKey: "about.values.desc", color: "from-amber-700 to-orange-700" },
];

/* Animated light swish across text */
const SwishText = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.span
    className={`relative inline-block overflow-hidden ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    {children}
    {/* Light swish overlay */}
    <motion.span
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 55%, transparent 60%)",
      }}
      initial={{ x: "-120%" }}
      whileInView={{ x: "120%" }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.3, duration: 0.9, ease: "easeInOut" }}
    />
  </motion.span>
);

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
  const brickScale = useTransform(brickScrollProgress, [0, 0.5, 1], [1.05, 1.25, 1.45]);
  const brickY = useTransform(brickScrollProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-background" ref={sectionRef}>
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
            <SwishText delay={0.2}>{t("about.title")}</SwishText>
          </motion.h2>
        </div>

        {/* Video + Text side by side */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text content - LEFT with swish effect */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <SwishText delay={0.5} className="block mb-8">
              <p className="text-muted-foreground leading-relaxed text-xl md:text-2xl font-medium">
                {t("about.subtitle")}
              </p>
            </SwishText>
            <SwishText delay={0.7} className="block">
              <p className="text-muted-foreground leading-relaxed text-lg md:text-xl">
                {t("about.story")}
              </p>
            </SwishText>
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

        {/* Full-width brick image with cards overlay */}
        <div ref={brickRef} className="relative rounded-2xl overflow-hidden -mx-4 md:-mx-8">
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
              height={640}
            />
          </motion.div>

          {/* Dark overlay for text contrast in both modes */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Cards on top of brick */}
          <div className="relative z-10 grid md:grid-cols-3 gap-6 p-8 md:p-12">
            {values.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl backdrop-blur-md bg-black/20 border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                {/* Light swish on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                    }}
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut", delay: i * 1.2 }}
                  />
                </motion.div>

                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-display font-semibold text-xl mb-3 text-white drop-shadow-md">{t(item.titleKey)}</h3>
                <p className="text-sm text-white/85 leading-relaxed drop-shadow-sm">{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
