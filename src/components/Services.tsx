import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTag from "@/components/SectionTag";
import serviceDesign from "@/assets/service-design-hq.jpg";
import serviceDev from "@/assets/service-dev-hq.jpg";
import serviceSeo from "@/assets/service-seo-hq.jpg";
import serviceBrand from "@/assets/service-brand-hq.jpg";

const services = [
  { titleKey: "services.design.title", descKey: "services.design.desc", img: serviceDesign },
  { titleKey: "services.dev.title", descKey: "services.dev.desc", img: serviceDev },
  { titleKey: "services.seo.title", descKey: "services.seo.desc", img: serviceSeo },
  { titleKey: "services.brand.title", descKey: "services.brand.desc", img: serviceBrand },
];

const INTERVAL = 6000;

const Services = () => {
  const { t, isRTL } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % services.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + services.length) % services.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [goNext]);

  const service = services[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section id="services" className="relative overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-6xl section-padding pb-12">
        <div className="text-center mb-8">
          <SectionTag isVisible={isVisible}>{t("services.tag")}</SectionTag>
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

      {/* Full-width slideshow with arrows */}
      <div className="relative w-full aspect-[16/7] md:aspect-[21/9] overflow-hidden select-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Image with slow zoom */}
            <motion.img
              src={service.img}
              alt={t(service.titleKey)}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              loading="lazy"
              width={1920}
              height={1080}
            />

            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

            {/* Title + description */}
            <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16 md:pb-20">
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

        {/* Left arrow */}
        <button
          onClick={isRTL ? goNext : goPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right arrow */}
        <button
          onClick={isRTL ? goPrev : goNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
