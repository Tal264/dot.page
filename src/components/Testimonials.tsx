import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTag from "@/components/SectionTag";
import AnimatedHeading from "@/components/AnimatedHeading";
import heroFrame from "@/assets/hero-frame.jpg";

type Testimonial = {
  name: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
};

const Testimonials = () => {
  const { t, isRTL } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);

  const testimonials: Testimonial[] = useMemo(() => {
    try {
      return JSON.parse(t("testimonials.items"));
    } catch {
      return [];
    }
  }, [t]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroFrame}
          className="w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <SectionTag isVisible={isVisible}>
            {t("testimonials.tag")}
          </SectionTag>
          <AnimatedHeading isVisible={isVisible}>
            {t("testimonials.title")}
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            {t("testimonials.subtitle")}
          </motion.p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({
                  length: testimonials[current]?.rating || 0,
                }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-lg md:text-xl italic text-foreground/90 mb-8 leading-relaxed">
                "{testimonials[current]?.quote}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-primary-foreground">
                  {testimonials[current]?.avatar}
                </div>

                <div className={isRTL ? "text-right" : "text-left"}>
                  <div className="font-semibold">
                    {testimonials[current]?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[current]?.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors"
              aria-label="Previous"
            >
              {isRTL ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "gradient-bg w-6" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors"
              aria-label="Next"
            >
              {isRTL ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;