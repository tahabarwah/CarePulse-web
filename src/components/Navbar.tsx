import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, ArrowRight, Menu, X, Sparkles, Building2, Stethoscope } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenDiagnostic }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Compliance Trust Bar */}
      <div id="compliance-banner" className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-teal-950 text-teal-400 border border-teal-800/80">
              HIPAA-Ready Architecture
            </span>
            <span className="hidden sm:inline text-slate-400">
              Executable Business Associate Agreements (BAAs) • Annual SOC 2 Type II Audited • Zero Model Training on PHI
            </span>
            <span className="sm:hidden text-slate-400">
              Enterprise BAA & SOC 2 Type II Aligned
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Epic & Cerner FHIR R4 Ready
            </span>
            <a 
              href="#security" 
              onClick={(e) => { e.preventDefault(); scrollToSection('security'); }}
              className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
            >
              Security Overview
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
            : 'bg-white border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2.5 group"
                aria-label="CarePulse Home"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">CarePulse</span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      Health OS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight hidden sm:block">Clinical Operations & Workflow Platform</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-600">
              <button
                onClick={() => scrollToSection('benefits')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection('workflow')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1"
              >
                Clinical Pathway
              </button>
              <button
                onClick={() => scrollToSection('roles')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1"
              >
                Role Solutions
              </button>
              <button
                onClick={() => scrollToSection('patient-portal')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1 text-teal-800 font-semibold"
              >
                Patient Portal
              </button>
              <button
                onClick={() => scrollToSection('success-stories')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1"
              >
                Success Stories
              </button>
              <button
                onClick={() => scrollToSection('security')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1 flex items-center gap-1"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Security & BAA
              </button>
              <button
                onClick={() => scrollToSection('integrations')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1"
              >
                EHR Integrations
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1"
              >
                FAQs
              </button>
              <button
                onClick={() => scrollToSection('roi-calculator')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1 text-teal-800 font-semibold"
              >
                ROI Calculator
              </button>
              <button
                onClick={() => scrollToSection('resources')}
                className="hover:text-teal-700 transition-colors cursor-pointer py-1"
              >
                Resources
              </button>
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                id="btn-nav-diagnostic"
                onClick={onOpenDiagnostic}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                AI Workflow Diagnostic
              </button>
              <button
                id="btn-nav-demo"
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-all shadow-sm shadow-teal-700/30"
              >
                Request a Demo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2 text-base font-medium text-slate-700">
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700"
              >
                Product Benefits
              </button>
              <button
                onClick={() => scrollToSection('workflow')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700"
              >
                Clinical Pathway
              </button>
              <button
                onClick={() => scrollToSection('roles')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700"
              >
                Role-Based Use Cases
              </button>
              <button
                onClick={() => scrollToSection('patient-portal')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-teal-800 font-semibold"
              >
                Patient Portal Preview
              </button>
              <button
                onClick={() => scrollToSection('success-stories')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700"
              >
                Customer Success Stories
              </button>
              <button
                onClick={() => scrollToSection('security')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Security & Compliance
              </button>
              <button
                onClick={() => scrollToSection('integrations')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700"
              >
                EHR Integrations
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700"
              >
                FAQs
              </button>
              <button
                onClick={() => scrollToSection('roi-calculator')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-teal-800 font-semibold"
              >
                ROI & Efficiency Calculator
              </button>
              <button
                onClick={() => scrollToSection('resources')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700"
              >
                Whitepapers & Resources
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDiagnostic(); }}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-teal-800 bg-teal-50 border border-teal-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                AI Clinical Workflow Diagnostic
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 flex items-center justify-center gap-2"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
