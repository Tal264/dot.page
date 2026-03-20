import React, { createContext, useContext, useState, useEffect } from "react";

interface A11yContextType {
  largeText: boolean;
  toggleLargeText: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  dyslexiaFont: boolean;
  toggleDyslexiaFont: () => void;
  linkHighlight: boolean;
  toggleLinkHighlight: () => void;
  lineSpacing: boolean;
  toggleLineSpacing: () => void;
  largeCursor: boolean;
  toggleLargeCursor: () => void;
  highSaturation: boolean;
  toggleHighSaturation: () => void;
  resetAll: () => void;
}

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [linkHighlight, setLinkHighlight] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(false);
  const [largeCursor, setLargeCursor] = useState(false);
  const [highSaturation, setHighSaturation] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("large-text", largeText);
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("reduce-motion", reduceMotion);
    root.classList.toggle("dyslexia-font", dyslexiaFont);
    root.classList.toggle("link-highlight", linkHighlight);
    root.classList.toggle("line-spacing", lineSpacing);
    root.classList.toggle("large-cursor", largeCursor);
    root.classList.toggle("high-saturation", highSaturation);
  }, [largeText, highContrast, reduceMotion, dyslexiaFont, linkHighlight, lineSpacing, largeCursor, highSaturation]);

  const resetAll = () => {
    setLargeText(false);
    setHighContrast(false);
    setReduceMotion(false);
    setDyslexiaFont(false);
    setLinkHighlight(false);
    setLineSpacing(false);
    setLargeCursor(false);
    setHighSaturation(false);
  };

  return (
    <A11yContext.Provider
      value={{
        largeText, toggleLargeText: () => setLargeText((v) => !v),
        highContrast, toggleHighContrast: () => setHighContrast((v) => !v),
        reduceMotion, toggleReduceMotion: () => setReduceMotion((v) => !v),
        dyslexiaFont, toggleDyslexiaFont: () => setDyslexiaFont((v) => !v),
        linkHighlight, toggleLinkHighlight: () => setLinkHighlight((v) => !v),
        lineSpacing, toggleLineSpacing: () => setLineSpacing((v) => !v),
        largeCursor, toggleLargeCursor: () => setLargeCursor((v) => !v),
        highSaturation, toggleHighSaturation: () => setHighSaturation((v) => !v),
        resetAll,
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
