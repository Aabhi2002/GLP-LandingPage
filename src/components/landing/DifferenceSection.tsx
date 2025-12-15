import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, RefreshCw, Shield } from "lucide-react";
import { GetStartedModal } from "@/components/GetStartedModal";

const phases = [
  {
    icon: Rocket,
    title: "Start Strong",
    subtitle: "BASE",
    description: "Prepare your body for optimal results from day one",
    color: "bg-blue-100 text-primary",
  },
  {
    icon: RefreshCw,
    title: "Transform Metabolically",
    subtitle: "TRANSFORM",
    description: "Maximize fat loss while preserving lean muscle mass",
    color: "bg-blue-100 text-primary",
  },
  {
    icon: Shield,
    title: "Exit Safely",
    subtitle: "EXIT",
    description: "Transition off GLP-1 RA 360™ without rebound weight gain",
    color: "bg-blue-100 text-primary",
  },
];

export const DifferenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section ref={ref} id="get-started" className="py-24 gradient-section">
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
              <span className="inline-flex items-baseline gap-1 flex-wrap">
                <span>The GLP-1 RA</span>
                <span className="inline-flex items-baseline">
                  <span className="font-black text-secondary" style={{ textShadow: "0 0 10px rgba(139,195,74,0.4)", filter: "brightness(1.1)" }}>360</span>
                  <sup className="text-[0.6em] align-super text-secondary font-bold ml-0.5" style={{ textShadow: "0 0 8px rgba(139,195,74,0.3)" }}>™</sup>
                </span>
              </span>{" "}
              <span className="text-gradient-coral">Difference</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This is not a diet, workout plan, or supplement box. It's a{" "}
              <span className="font-semibold text-foreground">complete metabolic protection ecosystem</span>,
              supporting you across all 3 phases.
            </p>
          </motion.div>

          {/* Phases */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl ${phase.color} mb-6 mx-auto`}>
                    <phase.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 mb-4">
                    <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
                      {phase.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{phase.description}</p>

                  {/* Connector line (hidden on last item) */}
                  {index < phases.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <Button
              variant="green"
              size="xl"
              className="group shadow-lg hover:shadow-xl"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
