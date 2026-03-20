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

const Services = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="section-padding relative" ref={ref}>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover-glow cursor-pointer"
            >
              {/* Background image */}
              <div className="relative h-40 overflow-hidden">
                <motion.img
                  src={service.img}
                  alt=""
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className={`absolute top-4 ${document.documentElement.dir === 'rtl' ? 'right-4' : 'left-4'} w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-2">{t(service.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
