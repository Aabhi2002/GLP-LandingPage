import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const processSteps = ["Start", "Transform", "Exit", "Sustain"];

export const HeroSection = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle video load success
    const handleLoadedData = () => {
      setVideoLoaded(true);
      // Attempt to play (some browsers require user interaction)
      video.play().catch(() => {
        // Autoplay blocked, that's okay - video will show as poster
      });
    };

    // Handle video load error
    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded && !videoError ? "opacity-100" : "opacity-0"
            }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/placeholder.svg"
        >
          <source src="/3209241-uhd-3840-2160-25fps_sDRWBBzL (1).mp4" type="video/mp4" />
        </video>

        {/* Fallback gradient background (shows when video not loaded) */}
        <div
          className={`absolute inset-0 gradient-hero transition-opacity duration-1000 ${videoLoaded && !videoError ? "opacity-0" : "opacity-100"
            }`}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-blue-900/70" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-900/60" />
      </div>

      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-md mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-white drop-shadow-lg">The Complete GLP-1 Transformation System</span>
          </motion.div>

          {/* Main headline with enhanced shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
            style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 74, 173, 0.3)" }}
          >
            GLP-1 360<sup className="text-2xl sm:text-3xl align-super">™</sup>
          </motion.h1>

          {/* Sub-headline with enhanced readability */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2 mb-10"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium drop-shadow-lg">
              Lose weight safely.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium drop-shadow-lg">
              Keep muscle. Fix side effects.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-green-400 font-semibold drop-shadow-lg">
              Prevent rebound.
            </p>
          </motion.div>

          {/* Process Steps with glass-morphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap"
          >
            {processSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg"
                >
                  <span className="text-sm sm:text-base font-semibold text-white drop-shadow-md">{step}</span>
                </motion.div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 mx-1 sm:mx-2 drop-shadow-md" />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => navigate('/risk-score-test')}
            >
              Take the GLP-1 Risk Score Test
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <QrCode className="w-5 h-5" />
              Scan QR Code
            </Button>
          </motion.div>

          {/* Trust indicators with glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-white/20"
          >
            <p className="text-sm text-white/80 mb-4 drop-shadow-md">Trusted by thousands on their GLP-1 journey</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow-lg">5,000+</p>
                <p className="text-xs text-white/70 drop-shadow-md">Transformations</p>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow-lg">98%</p>
                <p className="text-xs text-white/70 drop-shadow-md">Success Rate</p>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow-lg">Zero</p>
                <p className="text-xs text-white/70 drop-shadow-md">Rebound</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};
