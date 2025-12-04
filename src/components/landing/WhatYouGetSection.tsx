import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  FileText, 
  ScanLine, 
  ClipboardList, 
  Activity, 
  Dumbbell, 
  Heart, 
  Droplets, 
  TrendingDown 
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: FileText,
    title: "GLP-1 Risk Score Assessment",
    description: "Categorized into BASE / TRANSFORM / EXIT based on your needs",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "Body Composition Scan",
    description: "Track lean mass, visceral fat, and metabolic age precisely",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Personalized Action Plan",
    description: "Step-by-step roadmap tailored to your specific phase",
  },
  {
    number: "04",
    icon: Activity,
    title: "Weekly Monitoring",
    description: "Track strength, gut health, and side effects consistently",
  },
  {
    number: "05",
    icon: Dumbbell,
    title: "Muscle Retention System",
    description: "EMS technology combined with strategic strength training",
  },
  {
    number: "06",
    icon: Heart,
    title: "Gut Stabilization Protocol",
    description: "Resolve constipation, bloating, and digestive issues",
  },
  {
    number: "07",
    icon: Droplets,
    title: "IV Nutrient Support",
    description: "Replenish micronutrients and optimize hydration",
  },
  {
    number: "08",
    icon: TrendingDown,
    title: "Tapering Protocol",
    description: "Reset appetite and metabolism for safe medication exit",
  },
];

export const WhatYouGetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              What You'll <span className="text-gradient">Get</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit designed to protect your health at every stage of your GLP-1 journey.
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Number badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                  <span className="text-xs font-bold text-muted-foreground">{feature.number}</span>
                </div>

                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
