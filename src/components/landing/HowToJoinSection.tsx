import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, FileCheck, Calendar, Sparkles } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: QrCode,
    title: "Take the Risk Score Test",
    description: "Scan the QR code or click the button to assess your current needs",
  },
  {
    number: "2",
    icon: FileCheck,
    title: "Get Your Category",
    description: "We'll determine if you're BASE, TRANSFORM, or EXIT",
  },
  {
    number: "3",
    icon: Calendar,
    title: "Book Your Orientation",
    description: "Free 10-minute metabolic consultation call",
  },
  {
    number: "4",
    icon: Sparkles,
    title: "Begin Transformation",
    description: "Start your 360° metabolic protection journey",
  },
];

export const HowToJoinSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 gradient-section">
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
              How to Access{" "}
              <span className="text-gradient-coral inline-flex items-baseline gap-1">
                <span>GLP-1</span>
                <span className="inline-flex items-baseline">
                  <span className="font-black" style={{ textShadow: "0 0 10px rgba(139,195,74,0.4)", filter: "brightness(1.1)" }}>360</span>
                  <sup className="text-[0.6em] align-super font-bold ml-0.5" style={{ textShadow: "0 0 8px rgba(139,195,74,0.3)" }}>™</sup>
                </span>
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is simple. Follow these four steps to begin your protected transformation.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border z-0">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-primary"
                      style={{ right: "calc(50% - 4px)" }}
                    />
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* Number circle */}
                  <div className="mx-auto w-24 h-24 rounded-full bg-card border-2 border-primary flex items-center justify-center mb-4 shadow-md">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute top-0 right-1/4 w-8 h-8 rounded-full gradient-coral flex items-center justify-center text-sm font-bold text-accent-foreground shadow-coral">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="green"
              size="xl"
              className="group"
              onClick={() => navigate('/risk-score-test')}
            >
              Take the Risk Score Test
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="group">
              Book Consultation
              <Calendar className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
