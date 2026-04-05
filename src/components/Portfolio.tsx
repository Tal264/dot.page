import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink } from "lucide-react";
import SectionTag from "@/components/SectionTag";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

type Category = "all" | "ecommerce" | "landing" | "webapps";

const projects = [
  { id: 1, cat: "ecommerce" as const, title: "LuxeShop", desc: "Premium fashion e-commerce", img: portfolio1 },
  { id: 2, cat: "landing" as const, title: "GreenTech", desc: "SaaS landing page", img: portfolio2 },
  { id: 3, cat: "webapps" as const, title: "TaskFlow", desc: "Project management app", img: portfolio3 },
  { id: 4, cat: "ecommerce" as const, title: "FoodieBox", desc: "Meal kit subscription", img: portfolio4 },
  { id: 5, cat: "landing" as const, title: "CryptoVault", desc: "Fintech landing page", img: portfolio5 },
  { id: 6, cat: "webapps" as const, title: "HealthPulse", desc: "Fitness tracking dashboard", img: portfolio6 },
];

const Portfolio = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState<Category>("all");

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: t("portfolio.all") },
    { key: "ecommerce", label: t("portfolio.ecommerce") },
    { key: "landing", label: t("portfolio.landing") },
    { key: "webapps", label: t("portfolio.webapps") },
  ];

  const filtered = filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section id="portfolio" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <SectionTag isVisible={isVisible}>{t("portfolio.tag")}</SectionTag>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            {t("portfolio.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            {t("portfolio.subtitle")}
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.key
                  ? "gradient-bg text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-xl overflow-hidden border border-border bg-card hover-glow cursor-pointer"
              >
                <div className="h-48 relative overflow-hidden">
                  <motion.img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full gradient-bg text-sm font-semibold text-primary-foreground">
                        {t("portfolio.viewProject")} <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </motion.div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
