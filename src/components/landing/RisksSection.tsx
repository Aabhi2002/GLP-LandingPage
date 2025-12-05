import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const risks = [
  "Rapid muscle loss",
  "Metabolism slowdown",
  "Constipation, bloating",
  "Energy drops",
  "Weight plateau",
  "Hair thinning",
  "Loose skin",
  "Rebound weight gain",
];

const protections = [
  "Muscle-first protocols",
  "EMS strength systems",
  "Gut & skin correction",
  "Nutrient repletion",
  "Appetite reset",
  "Safe tapering roadmap",
  "Body composition tracking",
  "Metabolic optimization",
];

export const RisksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hidden Risks of{" "}
              <span className="text-gradient">GLP-1 Medications</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Without proper support, your transformation may come at a hidden cost.
              Here's what we protect you from.
            </p>
          </motion.div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Risks column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl bg-coral-50 border border-coral-100"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="p-2 rounded-full bg-accent/20">
                  <X className="w-5 h-5 text-accent" />
                </div>
                Common Risks Without Support
              </h3>
              <ul className="space-y-4">
                {risks.map((risk, index) => (
                  <motion.li
                    key={risk}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <X className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{risk}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Protection column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl bg-teal-50 border border-teal-100"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/20">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span className="flex items-baseline gap-1 flex-wrap">
                  <span>How GLP-1</span>
                  <span className="inline-flex items-baseline">
                    <span className="font-black text-secondary" style={{ textShadow: "0 0 10px rgba(139,195,74,0.4)", filter: "brightness(1.1)" }}>360</span>
                    <sup className="text-[0.6em] align-super text-secondary font-bold ml-0.5" style={{ textShadow: "0 0 8px rgba(139,195,74,0.3)" }}>™</sup>
                  </span>
                  <span>Protects You</span>
                </span>
              </h3>
              <ul className="space-y-4">
                {protections.map((protection, index) => (
                  <motion.li
                    key={protection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{protection}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
