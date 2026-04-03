import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import serviceDesign from "@/assets/service-design.jpg";
import serviceDev from "@/assets/service-dev.jpg";
import serviceSeo from "@/assets/service-seo.jpg";
import serviceBrand from "@/assets/service-brand.jpg";

const services = [
  { titleKey: "services.design.title", descKey: "services.design.desc", img: serviceDesign },
  { titleKey: "services.dev.title", descKey: "services.dev.desc", img: serviceDev },
  { titleKey: "services.seo.title", descKey: "services.seo.desc", img: serviceSeo },
  { titleKey: "services.brand.title", descKey: "services.brand.desc", img: serviceBrand },
];

const INTERVAL = 5000;

const Services = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const service = services[current];

  return (
    <section id="services" className="relative overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-6xl section-padding">
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

      {/* Full-width auto-changing slideshow */}
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Image with slow zoom */}
            <motion.img
              src={service.img}
              alt={t(service.titleKey)}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
            />

            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

            {/* Title + description */}
            <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-12 md:pb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-3"
              >
                {t(service.titleKey)}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md"
              >
                {t(service.descKey)}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {services.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
