import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Palette, Code2, TrendingUp, Stamp } from "lucide-react";
import serviceDesign from "@/assets/service-design.jpg";
import serviceDev from "@/assets/service-dev.jpg";
import serviceSeo from "@/assets/service-seo.jpg";
import serviceBrand from "@/assets/service-brand.jpg";

const services = [
  { icon: Palette, titleKey: "services.design.title", descKey: "services.design.desc", color: "from-purple-500 to-pink-500", img: serviceDesign },
  { icon: Code2, titleKey: "services.dev.title", descKey: "services.dev.desc", color: "from-blue-500 to-cyan-500", img: serviceDev },
  { icon: TrendingUp, titleKey: "services.seo.title", descKey: "services.seo.desc", color: "from-green-400 to-emerald-500", img: serviceSeo },
  { icon: Stamp, titleKey: "services.brand.title", descKey: "services.brand.desc", color: "from-orange-400 to-red-500", img: serviceBrand },
];

// Duplicate for infinite loop
const duplicatedServices = [...services, ...services];

const Services = () => {
  const { t, isRTL } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Auto-scroll animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    let pos = 0;
    const speed = 0.5; // px per frame

    const step = () => {
      if (!isPaused) {
        pos += speed;
        // Reset when we've scrolled past the first set
        const halfWidth = track.scrollWidth / 2;
        if (pos >= halfWidth) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-primary-foreground mb-4"
          >
            {t("services.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Auto-scrolling carousel - full width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null); }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 px-4"
          style={{ willChange: "transform" }}
        >
          {duplicatedServices.map((service, i) => (
            <div
              key={`${service.titleKey}-${i}`}
              className="flex-shrink-0 w-72 md:w-80"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover-glow cursor-pointer h-full">
                {/* Background image with zoom */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700"
                    animate={{
                      scale: hoveredIndex === i ? 1.15 : 1.05,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Dark overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  {/* Title overlay on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display font-semibold text-lg text-white drop-shadow-lg">
                      {t(service.titleKey)}
                    </h3>
                  </div>
                </div>
                <div className="p-5 bg-card">
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
