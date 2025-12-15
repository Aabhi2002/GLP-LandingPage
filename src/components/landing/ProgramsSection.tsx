import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Rocket,
  RefreshCw,
  LogOut,
  Check,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const programs = [
  {
    id: "base",
    icon: Rocket,
    title: "GLP-1 RA 360™: BASE",
    subtitle: "Start Strong",
    perfectFor: "New users, mild side effects, early-stage support",
    color: "bg-teal-100 text-teal-700 border-teal-200",
    accentColor: "bg-teal-500",
    features: [
      "Comprehensive gut preparation",
      "Electrolyte optimization",
      "Protein-first meal planning",
      "EMS introduction sessions",
      "Side effect prevention protocols",
      "Baseline strength & metabolism testing",
    ],
  },
  {
    id: "transform",
    icon: RefreshCw,
    title: "GLP-1 RA 360™: TRANSFORM",
    subtitle: "Maximize Results",
    perfectFor: "Muscle loss, plateaus, gut issues, body toning goals",
    color: "bg-coral-100 text-coral-600 border-coral-200",
    accentColor: "bg-accent",
    features: [
      "Advanced EMS + strength training",
      "Body sculpting protocols",
      "Micronutrient optimization",
      "Gut correction therapy",
      "Energy & stamina enhancement",
      "Skin tightening support",
      "Appetite regulation techniques",
    ],
  },
  {
    id: "exit",
    icon: LogOut,
    title: "GLP-1 RA 360™: EXIT",
    subtitle: "Sustain Forever",
    perfectFor: "Ready to stop GLP-1 RA or already regained weight",
    color: "bg-sage-200 text-teal-800 border-sage-100",
    accentColor: "bg-teal-700",
    features: [
      "Strategic reverse diet protocol",
      "Appetite retraining system",
      "Metabolic healing & repair",
      "Strength maintenance program",
      "Safe tapering roadmap",
      "Long-term stability tools",
    ],
  },
];

export const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openProgram, setOpenProgram] = useState<string | null>("base");

  return (
    <section ref={ref} className="py-24 gradient-section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your <span className="text-gradient-coral">Pathway</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three specialized programs designed for exactly where you are in your GLP-1 RA journey.
            </p>
          </motion.div>

          {/* Accordion programs */}
          <div className="space-y-4">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="rounded-2xl bg-card border border-border shadow-md overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setOpenProgram(openProgram === program.id ? null : program.id)}
                  className="w-full p-6 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className={cn("p-3 rounded-xl", program.color)}>
                    <program.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-bold text-foreground flex items-baseline flex-wrap gap-1">
                      <span>GLP-1 RA</span>
                      <span className="inline-flex items-baseline">
                        <span
                          className="font-black text-secondary"
                          style={{
                            textShadow: "0 0 15px rgba(139,195,74,0.6), 0 0 8px rgba(139,195,74,0.4)",
                            filter: "brightness(1.2)"
                          }}
                        >
                          360
                        </span>
                        <sup
                          className="text-[0.6em] align-super text-secondary ml-0.5 font-black"
                          style={{
                            textShadow: "0 0 10px rgba(139,195,74,0.5)",
                            filter: "brightness(1.2)"
                          }}
                        >
                          ™
                        </sup>
                      </span>
                      <span>: {program.title.split(': ')[1]}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{program.subtitle}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300",
                      openProgram === program.id && "rotate-180"
                    )}
                  />
                </button>

                {/* Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openProgram === program.id ? "auto" : 0,
                    opacity: openProgram === program.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    {/* Perfect for badge */}
                    <div className="mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Perfect For:
                      </span>
                      <p className="text-foreground font-medium mt-1">{program.perfectFor}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                        Includes:
                      </span>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {program.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button variant="teal" className="w-full sm:w-auto group">
                      Learn More About {program.title.split(":")[1].split("™")[0].trim()}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
