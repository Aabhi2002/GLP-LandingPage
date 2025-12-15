import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Zap, TrendingDown, Dumbbell } from "lucide-react";

const symptoms = [
  { icon: Dumbbell, text: "Muscle loss" },
  { icon: Zap, text: "Energy dips" },
  { icon: AlertTriangle, text: "Side effects" },
  { icon: TrendingDown, text: "Plateaus & rebound" },
];

export const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Are You Starting or Already on a{" "}
              <span className="text-gradient">GLP-1 RA Medication?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're considering Ozempic, Wegovy, Mounjaro, or you're already experiencing the transformation,
              there's more to the journey than just weight loss.
            </p>
          </motion.div>

          {/* Blockquote */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative my-16"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 gradient-coral rounded-full" />
            <div className="pl-8 py-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                "Weight loss with GLP-1 RA is easy.
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground leading-tight mt-2">
                Keeping your health, strength, and metabolism is not."
              </p>
            </div>
          </motion.blockquote>

          {/* Symptoms grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold text-muted-foreground mb-6 text-center">
              What many experience without proper support:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {symptoms.map((symptom, index) => (
                <motion.div
                  key={symptom.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center p-6 rounded-2xl bg-coral-50 border border-coral-100 text-center"
                >
                  <symptom.icon className="w-8 h-8 text-accent mb-3" />
                  <span className="text-sm font-medium text-foreground">{symptom.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Closing line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <p className="text-lg font-semibold text-secondary-foreground flex items-baseline justify-center gap-1 flex-wrap">
                <span>GLP-1 RA</span>
                <span className="inline-flex items-baseline">
                  <span className="font-black text-secondary" style={{ textShadow: "0 0 10px rgba(139,195,74,0.4)", filter: "brightness(1.1)" }}>360</span>
                  <sup className="text-[0.6em] align-super text-secondary font-bold ml-0.5" style={{ textShadow: "0 0 8px rgba(139,195,74,0.3)" }}>™</sup>
                </span>
                <span>exists to stop this cycle.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
