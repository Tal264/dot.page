import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import logoImg from "@/assets/logo.png";
import { Menu, X, Globe, Accessibility, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const { t, lang, setLang, isRTL } = useLanguage();
  const { largeText, toggleLargeText, highContrast, toggleHighContrast, reduceMotion, toggleReduceMotion } = useAccessibility();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: t("nav.services") },
    { href: "#portfolio", label: t("nav.portfolio") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logoImg} alt="WebStorey" className="w-9 h-9 group-hover:scale-110 transition-transform" />
          <span className="font-display font-bold text-xl gradient-text">WebStorey</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "he" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-primary/50 transition-colors text-sm text-muted-foreground hover:text-foreground"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium">{lang === "en" ? "HE" : "EN"}</span>
          </button>

          {/* Accessibility */}
          <div className="relative">
            <button
              onClick={() => setA11yOpen(!a11yOpen)}
              className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label={t("a11y.title")}
            >
              <Accessibility className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {a11yOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`absolute top-12 ${isRTL ? "left-0" : "right-0"} w-64 p-4 rounded-lg bg-card border border-border shadow-xl`}
                >
                  <h3 className="font-display font-semibold text-sm mb-3">{t("a11y.title")}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("a11y.fontSize")}</span>
                      <Switch checked={largeText} onCheckedChange={toggleLargeText} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("a11y.highContrast")}</span>
                      <Switch checked={highContrast} onCheckedChange={toggleHighContrast} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("a11y.reduceMotion")}</span>
                      <Switch checked={reduceMotion} onCheckedChange={toggleReduceMotion} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:inline-flex gradient-bg px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t("nav.bookCall")}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-start py-2 text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full gradient-bg px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground"
              >
                {t("nav.bookCall")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
