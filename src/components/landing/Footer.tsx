import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-12 bg-teal-900 border-t border-teal-800">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-xl font-bold text-primary-foreground font-display">
            GLP-1 360<sup className="text-xs align-super">™</sup>
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
            © {new Date().getFullYear()} GLP-1 360™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
