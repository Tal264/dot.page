import React, { createContext, useContext, useState, useEffect } from "react";

interface A11yContextType {
  largeText: boolean;
  toggleLargeText: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
}

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("large-text", largeText);
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("reduce-motion", reduceMotion);
  }, [largeText, highContrast, reduceMotion]);

  return (
    <A11yContext.Provider
      value={{
        largeText,
        toggleLargeText: () => setLargeText((v) => !v),
        highContrast,
        toggleHighContrast: () => setHighContrast((v) => !v),
        reduceMotion,
        toggleReduceMotion: () => setReduceMotion((v) => !v),
      }}
    >
      {children}
    </A11yContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
};
