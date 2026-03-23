import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-32">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          src={heroVideo.url}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Floating decorative shapes — moving in parallel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Shape 1 — top left, drifts up-down */}
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[8%] w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(262 83% 58% / 0.5), transparent)" }}
        />
        {/* Shape 2 — bottom right, drifts opposite */}
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-16 right-[8%] w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(199 89% 48% / 0.5), transparent)" }}
        />
        {/* Shape 3 — center-right, gentle pulse */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/3 right-[25%] w-48 h-48 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(174 72% 56% / 0.4), transparent)" }}
        />
        {/* Shape 4 — bottom left, slow drift */}
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[30%] left-[15%] w-36 h-36 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(262 83% 68% / 0.4), transparent)" }}
        />

        {/* Soft grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -60 - i * 10, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}

      <div className="container mx-auto relative z-10 text-center max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">WebStorey — Premium Web Solutions</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] dark:text-white"
        >
          {t("hero.title1")}
          <br />
          <span className="gradient-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">{t("hero.title2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 dark:text-white/90 max-w-2xl mb-10 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contact"
            className="gradient-bg px-8 py-3.5 rounded-full font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 animate-pulse-glow"
          >
            {t("hero.cta1")}
            <Arrow className="w-4 h-4" />
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3.5 rounded-full border border-border font-semibold hover:border-primary/50 hover:bg-card/50 transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
