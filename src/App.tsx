import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { MessageCircle } from "lucide-react";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";

const queryClient = new QueryClient();

/* WhatsApp Floating Widget */
const WhatsAppWidget = () => {
  const message = encodeURIComponent(
    "היי! הגעתי דרך האתר שלכם ואשמח לקבל מידע נוסף על השירותים שלכם"
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href={`https://wa.me/972502345005?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all"
      >
        {/* Tooltip */}
        <div className="absolute right-16 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
          דברו איתנו בוואטסאפ
        </div>

        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                {/* Fallback route kept at the very bottom */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              {/* WhatsApp widget OUTSIDE routes so it appears on all pages */}
              <WhatsAppWidget />
            </BrowserRouter>
          </TooltipProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;