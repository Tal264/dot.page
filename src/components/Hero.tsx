import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const phrases = [
  { text: "art", color: "#E05A3A" },
  { text: "design", color: "#1B4FD8" },
  { text: "smart", color: "#1D7A4A" },
  { text: "minimal", color: "#1B4FD8" },
  { text: "premium", color: "#E05A3A" },
  { text: "authoritative", color: "#1B4FD8" },
  { text: "bold", color: "#1D7A4A" },
  { text: "energetic", color: "#1B4FD8" },
  { text: "artisanal", color: "#E05A3A" },
  { text: "boutique", color: "#1D7A4A" },
  { text: "page.", color: "#E05A3A" },
];

const TYPE_SPEED = 90;
const ERASE_SPEED = 45;
const HOLD = 1400;

const Typewriter = () => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const current = phrases[i].text;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("holding"), HOLD);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("erasing"), 200);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), ERASE_SPEED);
      } else {
        setI((i + 1) % phrases.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, i]);

  return (
    <span
      style={{ color: phrases[i].color, fontWeight: 500 }}
      className="inline-block"
    >
      {text}
      <span className="inline-block w-[2px] h-[0.9em] align-middle ml-1 bg-current animate-pulse" />
    </span>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-32 bg-[#f5f5f3] dark:bg-[#1e1e1e]">
      <div className="container mx-auto relative z-10 text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display font-normal text-7xl sm:text-8xl md:text-9xl text-[#1a1a1a] dark:text-white leading-none tracking-tight"
        >
          dot<span style={{ color: "#E05A3A" }}>.</span>page
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 font-display text-2xl sm:text-3xl md:text-4xl min-h-[1.4em] text-[#1a1a1a] dark:text-white/90"
        >
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 font-mono text-sm md:text-base tracking-[0.25em] uppercase text-[#888888]"
        >
          web studio
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
