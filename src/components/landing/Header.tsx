import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Programs", href: "#programs" },
  { label: "FAQ", href: "#faq" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-xl shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className={cn(
              "text-xl sm:text-2xl font-extrabold font-display transition-colors flex items-baseline",
              isScrolled ? "text-foreground" : "text-primary-foreground"
            )}>
              GLP-1 RA{" "}
              <span className="inline-flex items-baseline ml-1">
                <span
                  className={cn(
                    "font-black",
                    isScrolled ? "text-secondary" : "text-green-400"
                  )}
                  style={!isScrolled ? {
                    textShadow: "0 0 12px rgba(139,195,74,0.5), 0 0 6px rgba(139,195,74,0.3)",
                    filter: "brightness(1.1)"
                  } : {}}
                >
                  360
                </span>
                <sup
                  className={cn(
                    "text-xs align-super ml-0.5 font-bold",
                    isScrolled ? "text-secondary" : "text-green-400"
                  )}
                  style={!isScrolled ? {
                    textShadow: "0 0 10px rgba(139,195,74,0.4)",
                    filter: "brightness(1.1)"
                  } : {}}
                >
                  ™
                </sup>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant={isScrolled ? "green" : "hero"}
              size="sm"
              onClick={() => {
                const section = document.getElementById('get-started');
                section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled
                ? "text-foreground hover:bg-muted"
                : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-border/50"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium py-2 transition-colors",
                    isScrolled ? "text-foreground" : "text-primary-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="green"
                className="mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const section = document.getElementById('get-started');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                Get Started
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
