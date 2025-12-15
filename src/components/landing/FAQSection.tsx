import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Do you change my GLP-1 RA 360™ medication or dosage?",
    answer: "No. GLP-1 RA 360™ does not prescribe or adjust your medication. We work alongside your prescribing physician to support your health during treatment. Our focus is on protecting your metabolism, muscle, and overall wellbeing—not managing the medication itself."
  },
  {
    question: "Can I join if I'm not on GLP-1 RA 360™ yet?",
    answer: "Absolutely! Our BASE program is specifically designed for those who are considering or just starting GLP-1 RA 360™ medication. Starting with us means you'll begin your journey optimized for success and avoid common early pitfalls."
  },
  {
    question: "Will this help if I've already lost muscle?",
    answer: "Yes. Our TRANSFORM program includes advanced EMS technology and strength protocols specifically designed to rebuild lost muscle mass. Many of our clients have successfully restored their lean mass while continuing their weight loss journey."
  },
  {
    question: "How do I stop GLP-1 RA 360™ without gaining weight back?",
    answer: "This is exactly what our EXIT program addresses. We use a combination of reverse dieting, appetite retraining, metabolic healing, and strategic tapering to help you transition off GLP-1 RA 360™ safely without the dreaded rebound weight gain."
  },
  {
    question: "Is GLP-1 RA 360™ safe?",
    answer: "Yes. All our protocols are evidence-based and supervised by healthcare professionals. We use proven technologies like EMS and IV nutrient therapy that have been used safely for decades. We work with your existing healthcare team to ensure continuity of care."
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between gap-4 bg-card hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                      openFAQ === index && "rotate-180"
                    )}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 bg-card">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
