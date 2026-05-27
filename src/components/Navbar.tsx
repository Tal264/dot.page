import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useTheme } from "@/contexts/ThemeContext";
import logoImg from "@/assets/logo.png";
import { Menu, X, Globe, Accessibility, Sun, Moon, RotateCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const { t, lang, setLang, isRTL } = useLanguage();
  const {
    largeText, toggleLargeText,
    highContrast, toggleHighContrast,
    reduceMotion, toggleReduceMotion,
    dyslexiaFont, toggleDyslexiaFont,
    linkHighlight, toggleLinkHighlight,
    lineSpacing, toggleLineSpacing,
    largeCursor, toggleLargeCursor,
    highSaturation, toggleHighSaturation,
    invertColors, toggleInvertColors,
    monochrome, toggleMonochrome,
    textAlign, setTextAlign,
    wordSpacing, toggleWordSpacing,
    focusHighlight, toggleFocusHighlight,
    hideImages, toggleHideImages,
    resetAll,
  } = useAccessibility();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t("nav.about") },
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

  const a11yToggles = [
    { label: t("a11y.fontSize"), checked: largeText, toggle: toggleLargeText },
    { label: t("a11y.highContrast"), checked: highContrast, toggle: toggleHighContrast },
    { label: t("a11y.reduceMotion"), checked: reduceMotion, toggle: toggleReduceMotion },
    { label: t("a11y.dyslexiaFont"), checked: dyslexiaFont, toggle: toggleDyslexiaFont },
    { label: t("a11y.linkHighlight"), checked: linkHighlight, toggle: toggleLinkHighlight },
    { label: t("a11y.lineSpacing"), checked: lineSpacing, toggle: toggleLineSpacing },
    { label: t("a11y.cursorLarge"), checked: largeCursor, toggle: toggleLargeCursor },
    { label: t("a11y.saturation"), checked: highSaturation, toggle: toggleHighSaturation },
    { label: t("a11y.invertColors"), checked: invertColors, toggle: toggleInvertColors },
    { label: t("a11y.monochrome"), checked: monochrome, toggle: toggleMonochrome },
    { label: t("a11y.wordSpacing"), checked: wordSpacing, toggle: toggleWordSpacing },
    { label: t("a11y.focusHighlight"), checked: focusHighlight, toggle: toggleFocusHighlight },
    { label: t("a11y.hideImages"), checked: hideImages, toggle: toggleHideImages },
  ];

  const alignOptions: Array<{ value: "default" | "left" | "center" | "right"; label: string }> = [
    { value: "default", label: t("a11y.textAlignDefault") },
    { value: "left", label: t("a11y.textAlignLeft") },
    { value: "center", label: t("a11y.textAlignCenter") },
    { value: "right", label: t("a11y.textAlignRight") },
  ];

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
        <a href="#" className="flex items-center gap-1.5 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="font-display font-normal text-xl text-foreground">dot</span>
          <img src={logoImg} alt="dot.page" className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="font-display font-medium text-xl" style={{ color: "#E05A3A" }}>page</span>
        </a>


        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-base text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

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
                  className={`absolute top-12 ${isRTL ? "left-0" : "right-0"} w-80 p-4 rounded-lg bg-card border border-border shadow-xl max-h-[75vh] overflow-y-auto`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-sm">{t("a11y.title")}</h3>
                    <button
                      onClick={resetAll}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      {t("a11y.reset")}
                    </button>
                  </div>

                  {/* Toggle switches */}
                  <div className="space-y-3 mb-4">
                    {a11yToggles.map((opt) => (
                      <div key={opt.label} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{opt.label}</span>
                        <Switch checked={opt.checked} onCheckedChange={opt.toggle} />
                      </div>
                    ))}
                  </div>

                  {/* Text alignment */}
                  <div className="border-t border-border pt-3">
                    <span className="text-sm text-muted-foreground block mb-2">{t("a11y.textAlign")}</span>
                    <div className="flex gap-1.5">
                      {alignOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setTextAlign(opt.value)}
                          className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                            textAlign === opt.value
                              ? "gradient-bg text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
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
