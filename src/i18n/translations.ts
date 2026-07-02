export type Language = "en" | "he";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.services": "Services",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.bookCall": "Book a Call",

    // Hero
    "hero.title1": "We Build Your",
    "hero.title2": "Web Story",
    "hero.subtitle":
      "Stunning websites that captivate audiences, drive conversions, and tell your brand's unique story through exceptional design and cutting-edge technology.",
    "hero.cta1": "Start Your Project",
    "hero.cta2": "View Our Work",

    // About
    "about.tag": "About Us",
    "about.title": "Crafting Digital Excellence",
    "about.subtitle":
      "We're a passionate team of designers, developers, and strategists who believe every brand deserves a powerful digital presence.",
    "about.story":
      "dot.page was founded with a vision to bridge the gap between stunning design and powerful technology, and has grown into a full-service digital agency that delivers results. We combine creativity with data-driven strategies to build websites that not only look amazing but also convert visitors into loyal customers.",
    "about.mission.title": "Our Mission",
    "about.mission.desc":
      "To empower businesses with beautiful, high-performing websites that tell their unique story and drive measurable growth.",
    "about.vision.title": "Our Vision",
    "about.vision.desc":
      "To be the leading creative digital agency that transforms how brands connect with their audiences online.",
    "about.values.title": "Our Values",
    "about.values.desc":
      "Innovation, transparency, and excellence guide every project we undertake. Your success is our success.",

    // Services
    "services.tag": "What We Do",
    "services.title": "Services That Deliver Results",
    "services.subtitle":
      "From concept to launch, we craft digital experiences that stand out.",
    "services.design.title": "Web Design",
    "services.design.desc":
      "User-centered, visually striking designs that reflect your brand identity.",
    "services.dev.title": "Development",
    "services.dev.desc":
      "Clean, performant code built with modern technologies for fast and scalable websites.",
    "services.seo.title": "SEO & Growth",
    "services.seo.desc":
      "Data-driven strategies to improve visibility, organic traffic, and search rankings.",
    "services.brand.title": "Branding",
    "services.brand.desc":
      "Cohesive brand identities that communicate your values and leave a lasting impression.",

    // Stats
    "stats.projects": "Projects Completed",
    "stats.satisfaction": "Client Satisfaction",
    "stats.years": "Years Experience",
    "stats.clients": "Happy Clients",

    // Portfolio
    "portfolio.tag": "Our Work",
    "portfolio.title": "Featured Projects",
    "portfolio.subtitle":
      "A showcase of our finest work across various industries.",
    "portfolio.all": "All",
    "portfolio.ecommerce": "E-Commerce",
    "portfolio.landing": "Landing Pages",
    "portfolio.webapps": "Web Apps",
    "portfolio.viewProject": "View Project",

     // ✅ FIXED PORTFOLIO PROJECT TEXTS
    "portfolio.projects.1.title": "LuxeShop",
    "portfolio.projects.1.desc": "Premium fashion e-commerce",

    "portfolio.projects.2.title": "Clinical Dietitian & Fitness Coach",
    "portfolio.projects.2.desc": "Healthy lifestyle landing page",

    "portfolio.projects.3.title": "Lawyer for Surrogacy Cases",
    "portfolio.projects.3.desc": "Legal services landing page",

    "portfolio.projects.4.title": "FoodieBox",
    "portfolio.projects.4.desc": "Meal kit subscription",

    "portfolio.projects.5.title":
      "Association for Early Childhood Rights",
    "portfolio.projects.5.desc":
      "Social services for women and children",

    "portfolio.projects.6.title": "Mortgage Consulting",
    "portfolio.projects.6.desc": "Financial advisory services",

    // Testimonials
    "testimonials.tag": "Testimonials",
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle":
      "Don't just take our word for it — hear from the businesses we've helped grow.",

    // FIXED: structured data (IMPORTANT)
    "testimonials.items": `[{"name":"Yael Moyal","company":"Clinical Dietitian & Fitness Instructor","quote":"They completely transformed my digital presence. Within just one month, I saw a 300% increase in new clients coming through the website.","rating":5,"avatar":"YM"},{"name":"Yoav Berkovitz","company":"Founder, YB Mortgage Consulting","quote":"This is not just website development — it's a full experience. dot.page truly understood us deeply and turned it into a precise product that actually works.","rating":5,"avatar":"YB"},{"name":"Michal Abraham","company":"CMO, GreenTech","quote":"Working with dot.page was smooth and professional from the very first moment. They translated our vision into a clean, fast, and accurate website.","rating":5,"avatar":"MA"},{"name":"Uri Peretz","company":"CTO, CryptoVault","quote":"Fast, creative, and precise. dot.page delivered a website that exceeded our expectations by several levels.","rating":5,"avatar":"UP"}]`,

    // Pricing
    "pricing.tag": "Pricing",
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle":
      "Choose the plan that fits your needs. No hidden fees.",
    "pricing.starter": "Starter",
    "pricing.professional": "Professional",
    "pricing.enterprise": "Enterprise",
    "pricing.popular": "Most Popular",
    "pricing.mo": "/project",
    "pricing.cta": "Get Started",
    "pricing.ctaPopular": "Start Now",
    "pricing.ctaEnterprise": "Contact Us",

    "pricing.starter.f1": "Landing page website",
    "pricing.starter.f2": "Mobile-optimized design",
    "pricing.starter.f3": "Accessibility menu",
    "pricing.starter.f4": "Contact form integration",
    "pricing.starter.f5": "One revision round",

    "pricing.pro.f1": "Up to 5-page responsive website",
    "pricing.pro.f2": "Mobile-optimized design",
    "pricing.pro.f3": "Basic SEO optimization",
    "pricing.pro.f4": "Contact form integration",
    "pricing.pro.f5": "Accessibility menu",
    "pricing.pro.f6": "3 revision rounds",

    "pricing.ent.f1": "Unlimited pages",
    "pricing.ent.f2": "Full branding package",
    "pricing.ent.f3": "Accessibility menu",
    "pricing.ent.f4": "Mobile-optimized design",
    "pricing.ent.f5": "Priority 24/7 support",
    "pricing.ent.f6": "Performance optimization",
    "pricing.ent.f7": "Advanced SEO optimization",
    "pricing.ent.f8": "10 revision rounds",

    // Contact
    "contact.tag": "Get In Touch",
    "contact.title": "Let's Build Something Amazing",
    "contact.subtitle":
      "Ready to start your project? Reach out and let's discuss your vision.",
    "contact.name": "Your Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Tell us about your project",
    "contact.send": "Send Message",
    "contact.info.title": "Contact Info",
    "contact.info.email": "dot.page.studio@gmail.com",
    "contact.info.phone": "050-2345005",
    "contact.info.address": "1 Haskehal St, Tel Aviv",
    "contact.bookCall": "Book a Free Consultation",

    // Footer
    "footer.desc":
      "Crafting digital stories through beautiful, functional websites that drive results.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.connect": "Connect",
    "footer.newsletter": "Newsletter",
    "footer.emailPlaceholder": "Your email",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All rights reserved.",

    // Accessibility
    "a11y.title": "Accessibility",
    "a11y.fontSize": "Large Text",
    "a11y.highContrast": "High Contrast",
    "a11y.reduceMotion": "Reduce Motion",
    "a11y.dyslexiaFont": "Dyslexia Font",
    "a11y.linkHighlight": "Highlight Links",
    "a11y.lineSpacing": "Line Spacing",
    "a11y.cursorLarge": "Large Cursor",
    "a11y.saturation": "Saturation",
    "a11y.invertColors": "Invert Colors",
    "a11y.monochrome": "Monochrome",
    "a11y.textAlign": "Text Alignment",
    "a11y.textAlignDefault": "Default",
    "a11y.textAlignLeft": "Left",
    "a11y.textAlignCenter": "Center",
    "a11y.textAlignRight": "Right",
    "a11y.wordSpacing": "Word Spacing",
    "a11y.focusHighlight": "Focus Highlight",
    "a11y.hideImages": "Hide Images",
    "a11y.reset": "Reset All",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
  },

  he: {
    // Nav
    "nav.services": "שירותים",
    "nav.about": "אודות",
    "nav.portfolio": "תיק עבודות",
    "nav.pricing": "מחירים",
    "nav.contact": "צור קשר",
    "nav.bookCall": "קבע שיחה",

    // Hero
    "hero.title1": "אנחנו בונים את",
    "hero.title2": "הסיפור הדיגיטלי שלך",
    "hero.subtitle":
      "אתרים מרהיבים שמושכים קהלים, מניעים המרות ומספרים את הסיפור הייחודי של המותג שלך באמצעות עיצוב יוצא דופן וטכנולוגיה חדשנית.",
    "hero.cta1": "התחל את הפרויקט שלך",
    "hero.cta2": "צפה בעבודות שלנו",

    // About
    "about.tag": "אודותינו",
    "about.title": "יוצרים מצוינות דיגיטלית",
    "about.subtitle":
      "אנחנו צוות נלהב של מעצבים, מפתחים ואסטרטגים שמאמינים שכל מותג ראוי לנוכחות דיגיטלית עוצמתית.",
    "about.story":
      "dot.page נוסדה מתוך חזון לגשר בין עיצוב מרהיב לטכנולוגיה חזקה, והפכה לסוכנות דיגיטלית מלאה שמביאה תוצאות. אנחנו משלבים יצירתיות עם אסטרטגיות מבוססות נתונים כדי לבנות אתרים שלא רק נראים מדהים אלא גם ממירים מבקרים ללקוחות נאמנים.",
    "about.mission.title": "המשימה שלנו",
    "about.mission.desc":
      "להעצים עסקים עם אתרים יפים ובעלי ביצועים גבוהים שמספרים את הסיפור הייחודי שלהם ומניעים צמיחה מדידה.",
    "about.vision.title": "החזון שלנו",
    "about.vision.desc":
      "להיות הסוכנות הדיגיטלית היצירתית המובילה שמשנה את האופן שבו מותגים מתחברים לקהלים שלהם באינטרנט.",
    "about.values.title": "הערכים שלנו",
    "about.values.desc":
      "חדשנות, שקיפות ומצוינות מנחים כל פרויקט שאנחנו לוקחים. ההצלחה שלכם היא ההצלחה שלנו.",

    // Services
    "services.tag": "מה אנחנו עושים",
    "services.title": "שירותים שמביאים תוצאות",
    "services.subtitle":
      "מרעיון ועד השקה, אנחנו יוצרים חוויות דיגיטליות שבולטות.",
    "services.design.title": "עיצוב אתרים",
    "services.design.desc":
      "עיצובים ממוקדי משתמש שמבטאים את זהות המותג שלך.",
    "services.dev.title": "פיתוח",
    "services.dev.desc":
      "קוד נקי וביצועי שנבנה בטכנולוגיות מודרניות לאתרים מהירים וניתנים להרחבה.",
    "services.seo.title": "קידום ושיווק",
    "services.seo.desc":
      "אסטרטגיות מבוססות נתונים לשיפור נראות ודירוגים.",
    "services.brand.title": "מיתוג",
    "services.brand.desc":
      "זהויות מותג קוהרנטיות שמתקשרות ערכים ומשאירות רושם מתמשך.",

    // Stats
    "stats.projects": "פרויקטים שהושלמו",
    "stats.satisfaction": "שביעות רצון לקוחות",
    "stats.years": "שנות ניסיון",
    "stats.clients": "לקוחות מרוצים",

    // Portfolio
    "portfolio.tag": "העבודות שלנו",
    "portfolio.title": "פרויקטים נבחרים",
    "portfolio.subtitle":
      "תצוגה של העבודות הטובות ביותר שלנו במגוון תעשיות.",
    "portfolio.all": "הכל",
    "portfolio.ecommerce": "חנויות אונליין",
    "portfolio.landing": "דפי נחיתה",
    "portfolio.webapps": "אפליקציות ווב",
    "portfolio.viewProject": "צפה בפרויקט",

     // ✅ FIXED PORTFOLIO PROJECT TEXTS (HEBREW)
    "portfolio.projects.1.title": "לוקס שופ",
    "portfolio.projects.1.desc": "חנות אופנה יוקרתית אונליין",

    "portfolio.projects.2.title": "דיאטנית קלינית ומאמנת כושר",
    "portfolio.projects.2.desc": "דף נחיתה לאורח חיים בריא",

    "portfolio.projects.3.title": "עורכת דין לענייני פונדקאות",
    "portfolio.projects.3.desc": "שירותים משפטיים",

    "portfolio.projects.4.title": "פודי בוקס",
    "portfolio.projects.4.desc": "מנוי ערכות אוכל",

    "portfolio.projects.5.title":
      "עמותת זכויות הילד בגיל הרך",
    "portfolio.projects.5.desc":
      "שירותים חברתיים לנשים וילדים",

    "portfolio.projects.6.title": "ייעוץ משכנתאות",
    "portfolio.projects.6.desc": "שירותי ייעוץ פיננסי",


    // Testimonials
    "testimonials.tag": "המלצות",
    "testimonials.title": "מה הלקוחות שלנו אומרים",
    "testimonials.subtitle":
      "אל תסתמכו רק עלינו — שמעו מהעסקים שעזרנו להם לצמוח.",

    // FIXED (same structure as EN, just translated content)
    "testimonials.items": `[{"name":"יעל מויאל","company":"דיאטנית קלינית ומדריכת כושר","quote":"שינו לי את כל הנוכחות הדיגיטלית. בתוך חודש בלבד ראיתי עלייה של יותר מ־300% לקוחות חדשים מהאתר.","rating":5,"avatar":"YM"},{"name":"יואב ברקוביץ","company":"מייסד, YB ייעוץ משכנתאות","quote":"זו לא רק בניית אתר — זו חוויה שלמה. dot.page הצליחו להבין אותנו לעומק ולבנות מוצר מדויק שעובד באמת.","rating":5,"avatar":"YB"},{"name":"מיכל אברהם","company":"CMO, GreenTech","quote":"העבודה עם dot.page הייתה חלקה ומקצועית מהרגע הראשון. הם תרגמו את החזון שלנו לאתר נקי, מהיר ומדויק.","rating":5,"avatar":"MA"},{"name":"אורי פרץ","company":"CTO, CryptoVault","quote":"מהיר, יצירתי ומדויק. dot.page סיפקו אתר שעבר את כל הציפיות שלנו בכמה רמות.","rating":5,"avatar":"UP"}]`,

    // Pricing
    "pricing.tag": "מחירים",
    "pricing.title": "מחירים פשוטים ושקופים",
    "pricing.subtitle":
      "בחרו את התוכנית שמתאימה לצרכים שלכם. ללא עלויות נסתרות.",
    "pricing.starter": "בסיסי",
    "pricing.professional": "מקצועי",
    "pricing.enterprise": "עסקי",
    "pricing.popular": "הכי פופולרי",
    "pricing.mo": "/לפרויקט",
    "pricing.cta": "התחל עכשיו",
    "pricing.ctaPopular": "בחר תוכנית",
    "pricing.ctaEnterprise": "צור קשר",

    "pricing.starter.f1": "עמוד נחיתה",
    "pricing.starter.f2": "עיצוב מותאם למובייל",
    "pricing.starter.f3": "תפריט נגישות",
    "pricing.starter.f4": "טופס יצירת קשר",
    "pricing.starter.f5": "סבב תיקונים אחד",

    "pricing.pro.f1": "אתר רספונסיבי עד 5 עמודים",
    "pricing.pro.f2": "עיצוב מותאם למובייל",
    "pricing.pro.f3": "אופטימיזציית SEO בסיסית",
    "pricing.pro.f4": "טופס יצירת קשר",
    "pricing.pro.f5": "תפריט נגישות",
    "pricing.pro.f6": "3 סבבי תיקונים",

    "pricing.ent.f1": "עמודים ללא הגבלה",
    "pricing.ent.f2": "חבילת מיתוג מלאה",
    "pricing.ent.f3": "תפריט נגישות",
    "pricing.ent.f4": "עיצוב מותאם למובייל",
    "pricing.ent.f5": "תמיכה בעדיפות 24/7",
    "pricing.ent.f6": "אופטימיזציית ביצועים",
    "pricing.ent.f7": "אופטימיזציית SEO מתקדמת",
    "pricing.ent.f8": "10 סבבי תיקונים",

    // Contact
    "contact.tag": "צור קשר",
    "contact.title": "בואו נבנה משהו מדהים",
    "contact.subtitle":
      "מוכנים להתחיל את הפרויקט שלכם? פנו אלינו ונדון בחזון שלכם.",
    "contact.name": "השם שלך",
    "contact.email": "כתובת אימייל",
    "contact.phone": "מספר טלפון",
    "contact.message": "ספרו לנו על הפרויקט שלכם",
    "contact.send": "שלח הודעה",
    "contact.info.title": "פרטי התקשרות",
    "contact.info.email": "dot.page.studio@gmail.com",
    "contact.info.phone": "050-2345005",
    "contact.info.address": "שדרות ההשכלה 1, תל אביב",
    "contact.bookCall": "קבע ייעוץ חינם",

    // Footer
    "footer.desc":
      "יוצרים סיפורים דיגיטליים דרך אתרים יפים ופונקציונליים שמביאים תוצאות.",
    "footer.quickLinks": "קישורים מהירים",
    "footer.services": "שירותים",
    "footer.connect": "התחברו",
    "footer.newsletter": "ניוזלטר",
    "footer.emailPlaceholder": "האימייל שלך",
    "footer.subscribe": "הירשמו",
    "footer.rights": "כל הזכויות שמורות.",

    // Accessibility
    "a11y.title": "נגישות",
    "a11y.fontSize": "טקסט גדול",
    "a11y.highContrast": "ניגודיות גבוהה",
    "a11y.reduceMotion": "הפחתת תנועה",
    "a11y.dyslexiaFont": "גופן דיסלקציה",
    "a11y.linkHighlight": "הדגשת קישורים",
    "a11y.lineSpacing": "ריווח שורות",
    "a11y.cursorLarge": "סמן גדול",
    "a11y.saturation": "רוויה",
    "a11y.invertColors": "היפוך צבעים",
    "a11y.monochrome": "מונוכרום",
    "a11y.textAlign": "יישור טקסט",
    "a11y.textAlignDefault": "ברירת מחדל",
    "a11y.textAlignLeft": "שמאל",
    "a11y.textAlignCenter": "מרכז",
    "a11y.textAlignRight": "ימין",
    "a11y.wordSpacing": "ריווח מילים",
    "a11y.focusHighlight": "הדגשת מיקוד",
    "a11y.hideImages": "הסתרת תמונות",
    "a11y.reset": "איפוס הכל",

    // Theme
    "theme.light": "בהיר",
    "theme.dark": "כהה",
  },
};