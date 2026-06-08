import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Send, Mail, Phone, MapPin, Calendar } from "lucide-react";
import SectionTag from "@/components/SectionTag";
import AnimatedHeading from "@/components/AnimatedHeading";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <SectionTag isVisible={isVisible}>{t("contact.tag")}</SectionTag>
          <AnimatedHeading isVisible={isVisible}>{t("contact.title")}</AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-6"
          >
            <div className="relative">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder={t("contact.name")}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder={t("contact.email")}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="relative">
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                placeholder={t("contact.message")}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>
            <button
              type="submit"
              className="gradient-bg px-8 py-3.5 rounded-full font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              {t("contact.send")}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 space-y-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4">{t("contact.info.title")}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t("contact.info.email")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t("contact.info.phone")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t("contact.info.address")}</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-border hover:border-primary/50 font-semibold text-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                {t("contact.bookCall")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
