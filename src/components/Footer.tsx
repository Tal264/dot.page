import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import logoImg from "@/assets/dot-page-logo.svg";
import logoImgDark from "@/assets/dot-page-logo-dark.svg";
import { ArrowUp, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto max-w-6xl section-padding py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={theme === "dark" ? logoImgDark : logoImg} alt="dot.page web studio" className="h-20 w-auto" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.desc")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">{t("nav.about")}</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">{t("nav.services")}</a></li>
              <li><a href="#portfolio" className="hover:text-foreground transition-colors">{t("nav.portfolio")}</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">{t("nav.pricing")}</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">{t("nav.contact")}</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t("footer.connect")}</h4>
            <div className="flex gap-3">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t("footer.newsletter")}</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t("footer.emailPlaceholder")}
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              <button type="submit" className="gradient-bg px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                {t("footer.subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} dot.page. {t("footer.rights")}
          </p>

          <button onClick={scrollTop} className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors" aria-label="Back to top">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
