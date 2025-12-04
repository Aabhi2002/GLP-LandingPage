import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Shield, Dumbbell, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Dumbbell, text: "Lose weight with strength" },
  { icon: Shield, text: "Protect your metabolism" },
  { icon: TrendingUp, text: "Stop rebound forever" },
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
              Ready to transform your GLP-1 journey{" "}
              <span className="text-accent">the right way?</span>
            </h2>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
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

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
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
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-sm text-primary-foreground/60"
          >
            ✓ Free risk assessment • ✓ No commitment required • ✓ Results guaranteed
          </motion.p>
        </div>
      </div>
    </section>
  );
};
