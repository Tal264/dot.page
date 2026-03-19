import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check } from "lucide-react";

const plans = [
  {
    nameKey: "pricing.starter",
    price: "$1,499",
    features: ["pricing.starter.f1", "pricing.starter.f2", "pricing.starter.f3", "pricing.starter.f4", "pricing.starter.f5"],
    ctaKey: "pricing.cta",
    popular: false,
  },
  {
    nameKey: "pricing.professional",
    price: "$3,999",
    features: ["pricing.pro.f1", "pricing.pro.f2", "pricing.pro.f3", "pricing.pro.f4", "pricing.pro.f5", "pricing.pro.f6"],
    ctaKey: "pricing.ctaPopular",
    popular: true,
  },
  {
    nameKey: "pricing.enterprise",
    price: "$9,999",
    features: ["pricing.ent.f1", "pricing.ent.f2", "pricing.ent.f3", "pricing.ent.f4", "pricing.ent.f5", "pricing.ent.f6"],
    ctaKey: "pricing.ctaEnterprise",
    popular: false,
  },
];

const Pricing = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-primary-foreground mb-4"
          >
            {t("pricing.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            {t("pricing.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            {t("pricing.subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover-glow ${
                plan.popular
                  ? "gradient-border bg-card scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold gradient-bg text-primary-foreground">
                  {t("pricing.popular")}
                </span>
              )}
              <h3 className="font-display text-xl font-semibold mb-2">{t(plan.nameKey)}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl font-bold gradient-text">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{t("pricing.mo")}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{t(f)}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                  plan.popular
                    ? "gradient-bg text-primary-foreground hover:opacity-90"
                    : "border border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {t(plan.ctaKey)}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
