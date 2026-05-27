import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTag from "@/components/SectionTag";
import heroVideo from "@/assets/hero-video.mp4.asset.json";


const testimonials = [
  {
    name: "Sarah Johnson",
    company: "LuxeShop CEO",
    quote: "WebStorey transformed our online presence completely. Our conversions increased by 340% within the first month of launch.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "David Chen",
    company: "TaskFlow Founder",
    quote: "The team at WebStorey doesn't just build websites — they craft experiences. The attention to detail is unmatched.",
    rating: 5,
    avatar: "DC",
  },
  {
    name: "Emily Torres",
    company: "GreenTech CMO",
    quote: "Working with WebStorey was seamless from start to finish. They understood our vision and executed it perfectly.",
    rating: 5,
    avatar: "ET",
  },
  {
    name: "Michael Park",
    company: "CryptoVault CTO",
    quote: "Fast, reliable, and incredibly creative. WebStorey delivered a website that exceeded all our expectations.",
    rating: 5,
    avatar: "MP",
  },
];

const Testimonials = () => {
  const { t, isRTL } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(ellipse at 30% 50%, hsl(199 89% 48% / 0.15), transparent 60%)"
      }} />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <SectionTag isVisible={isVisible}>{t("testimonials.tag")}</SectionTag>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            {t("testimonials.title")}
          </motion.h2>
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
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg md:text-xl italic text-foreground/90 mb-8 leading-relaxed">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-primary-foreground">
                  {testimonials[current].avatar}
                </div>
                <div className="text-start">
                  <div className="font-semibold">{testimonials[current].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[current].company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={prev} className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors" aria-label="Previous">
              {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
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
            <button onClick={next} className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors" aria-label="Next">
              {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
