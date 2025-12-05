import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-12 bg-teal-900 border-t border-teal-800">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-xl font-bold text-primary-foreground font-display flex items-baseline">
            GLP-1{" "}
            <span className="inline-flex items-baseline ml-1">
              <span
                className="font-black text-green-400"
                style={{
                  textShadow: "0 0 12px rgba(139,195,74,0.5), 0 0 6px rgba(139,195,74,0.3)",
                  filter: "brightness(1.1)"
                }}
              >
                360
              </span>
              <sup
                className="text-xs align-super text-green-400 ml-0.5 font-bold"
                style={{
                  textShadow: "0 0 10px rgba(139,195,74,0.4)",
                  filter: "brightness(1.1)"
                }}
              >
                ™
              </sup>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-teal-100/70 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-teal-100/70 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-teal-100/70 hover:text-primary-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-teal-100/50">
            <span className="inline-flex items-baseline gap-1 flex-wrap">
              <span>© {new Date().getFullYear()} GLP-1</span>
              <span className="inline-flex items-baseline">
                <span className="font-black text-green-400" style={{ textShadow: "0 0 10px rgba(139,195,74,0.4)", filter: "brightness(1.1)" }}>360</span>
                <sup className="text-[0.6em] align-super text-green-400 font-bold ml-0.5" style={{ textShadow: "0 0 8px rgba(139,195,74,0.3)" }}>™</sup>
              </span>
              <span>. All rights reserved.</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
