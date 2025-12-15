import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const checklist = [
  "Thinking of starting GLP-1 RA 360™ medication?",
  "Already on GLP-1 RA 360™ and want better results?",
  "Feeling weaker or 'softer' despite weight loss?",
  "Experiencing gut issues or side effects?",
  "Hit a frustrating plateau?",
  "Planning to stop your medication soon?",
  "Already stopped and regained weight?",
];

export const ForYouSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 gradient-section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Is This Program{" "}
              <span className="text-gradient-coral">For You?</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              <span className="inline-flex items-baseline gap-1 flex-wrap justify-center">
                <span>If any of these apply to you, GLP-1 RA</span>
                <span className="inline-flex items-baseline">
                  <span className="font-black text-secondary" style={{ textShadow: "0 0 10px rgba(139,195,74,0.4)", filter: "brightness(1.1)" }}>360</span>
                  <sup className="text-[0.6em] align-super text-secondary font-bold ml-0.5" style={{ textShadow: "0 0 8px rgba(139,195,74,0.3)" }}>™</sup>
                </span>
                <span>was designed for your journey.</span>
              </span>
            </p>
          </motion.div>

          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-3xl p-8 sm:p-12 shadow-lg border border-border"
          >
            <ul className="space-y-5">
              {checklist.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg text-foreground pt-0.5">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8 text-muted-foreground"
          >
            ✓ Check even one box? You're in the right place.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
