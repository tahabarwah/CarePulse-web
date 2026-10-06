import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface FloatingDemoButtonProps {
  heroElementId?: string;
  onOpenDemo?: () => void;
  className?: string;
}

export const FloatingDemoButton: React.FC<FloatingDemoButtonProps> = ({
  heroElementId = 'hero',
  onOpenDemo,
  className = '',
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // If dismissed in this session, do not show
    if (isDismissed) {
      setIsVisible(false);
      return;
    }

    const checkScrollPosition = () => {
      const heroElement = document.getElementById(heroElementId);
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // The user has scrolled past the hero when the bottom of the hero is near or above the top of the viewport
        // Adding a slight offset (e.g. 100px) creates a natural, intentional trigger point
        const hasScrolledPastHero = rect.bottom <= 120;
        setIsVisible(hasScrolledPastHero);
      } else {
        // Fallback if hero id is not found: trigger after scrolling 480px down
        setIsVisible(window.scrollY > 480);
      }
    };

    // Initial check
    checkScrollPosition();

    // Scroll listener with passive flag for high performance
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [heroElementId, isDismissed]);

  const handleClick = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      navigate('/demo');
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-20 right-4 sm:bottom-20 sm:right-6 z-40 transition-all duration-300 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        {/* Main Floating Button */}
        <button
          onClick={handleClick}
          id="floating-get-a-demo-btn"
          aria-label="Get a Demo - Schedule Executive Hospital Sandbox"
          className="flex items-center gap-2.5 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:shadow-teal-900/20 border border-teal-500/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-teal-600/30 active:scale-98"
        >
          {/* Subtle pulsating icon badge */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-teal-600/50 text-white border border-teal-400/30">
            <Calendar className="w-3.5 h-3.5 text-teal-100" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 border border-teal-950" />
            </span>
          </div>

          {/* Button Text */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white leading-none">
                Get a Demo
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-teal-600/60 text-teal-100 hidden sm:inline-block border border-teal-400/20">
                Live EHR
              </span>
            </div>
            <span className="text-[10px] text-teal-200/90 font-medium leading-tight hidden sm:block mt-0.5">
              Custom Inpatient Sandbox
            </span>
          </div>

          {/* Arrow Indicator */}
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-teal-100 group-hover:bg-white group-hover:text-teal-900 group-hover:translate-x-0.5 transition-all">
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>

        {/* Subtle Dismiss "x" Button on Hover */}
        {isHovered && (
          <button
            onClick={handleDismiss}
            aria-label="Dismiss Get a Demo button"
            title="Dismiss for this session"
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-600 flex items-center justify-center shadow-md text-[10px] transition-all cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
