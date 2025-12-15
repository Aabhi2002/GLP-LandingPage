import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Shield, Dumbbell, TrendingUp, QrCode, FileCheck, Sparkles } from "lucide-react";

const benefits = [
  { icon: Dumbbell, text: "Lose weight with strength" },
  { icon: Shield, text: "Protect your metabolism" },
  { icon: TrendingUp, text: "Stop rebound forever" },
];

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

export const FinalCTASection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 gradient-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-8">
              Ready to transform your GLP-1 RA 360™ journey{" "}
              <span className="text-accent">the right way?</span>
            </h2>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-16"
          >
            {benefits.map((benefit, index) => (
              <div
                key={benefit.text}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20"
              >
                <benefit.icon className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-foreground/20 z-0">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-accent"
                      style={{ right: "calc(50% - 4px)" }}
                    />
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* Icon circle */}
                  <div className="mx-auto w-24 h-24 rounded-full bg-transparent border-2 border-accent flex items-center justify-center mb-4">
                    <step.icon className="w-10 h-10 text-accent" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute top-0 right-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-accent to-green-400 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-primary-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-primary-foreground/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => navigate('/risk-score-test')}
            >
              Take the Risk Score Test
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              Book Your Consultation
              <Calendar className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 text-sm text-primary-foreground/60"
          >
            ✓ Free risk assessment • ✓ No commitment required • ✓ Results guaranteed
          </motion.p>
        </div>
      </div>
    </section>
  );
};
