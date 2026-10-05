import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Activity, ShieldCheck, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `py-1 text-sm font-medium transition-colors whitespace-nowrap ${
      isActive
        ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
        : 'text-slate-600 hover:text-teal-700'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-teal-50 text-teal-800 font-semibold border-l-4 border-teal-600'
        : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
    }`;

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
            <Link 
              to="/security"
              className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
            >
              Security Overview
            </Link>
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
            {/* Zone 1: Logo & Brand Mark */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2.5 group"
                aria-label="CarePulse Home"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform shrink-0">
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
              </Link>
            </div>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium">
              <NavLink to="/platform" className={navLinkClass}>
                Platform
              </NavLink>
              <NavLink to="/patient-overview" className={navLinkClass}>
                Patient Overview
              </NavLink>
              <NavLink to="/solutions" className={navLinkClass}>
                Solutions
              </NavLink>
              <NavLink to="/roi-calculator" className={navLinkClass}>
                ROI Calculator
              </NavLink>
              <NavLink to="/integrations" className={navLinkClass}>
                Integrations
              </NavLink>
              <NavLink to="/security" className={navLinkClass}>
                Security
              </NavLink>
              <NavLink to="/case-stories" className={navLinkClass}>
                Case Stories
              </NavLink>
              <NavLink to="/resources" className={navLinkClass}>
                Resources
              </NavLink>
            </nav>

            {/* Zone 3: Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                id="btn-nav-diagnostic"
                to="/diagnostic"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-all shadow-xs whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                AI Diagnostic
              </Link>
              <Link
                id="btn-nav-demo"
                to="/demo"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-all shadow-sm shadow-teal-700/30 whitespace-nowrap"
              >
                Request a Demo
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              <NavLink to="/" end className={mobileNavLinkClass}>
                Overview (Home)
              </NavLink>
              <NavLink to="/patient-overview" className={mobileNavLinkClass}>
                Patient Overview (Command Center)
              </NavLink>
              <NavLink to="/platform" className={mobileNavLinkClass}>
                Platform & Clinical Pathway
              </NavLink>
              <NavLink to="/solutions" className={mobileNavLinkClass}>
                Solutions by Role
              </NavLink>
              <NavLink to="/roi-calculator" className={mobileNavLinkClass}>
                Healthcare ROI & Cost Model
              </NavLink>
              <NavLink to="/integrations" className={mobileNavLinkClass}>
                EHR Integrations & Standards
              </NavLink>
              <NavLink to="/security" className={mobileNavLinkClass}>
                Security & HIPAA Compliance
              </NavLink>
              <NavLink to="/case-stories" className={mobileNavLinkClass}>
                Customer Success Stories
              </NavLink>
              <NavLink to="/resources" className={mobileNavLinkClass}>
                Resources, Whitepapers & FAQs
              </NavLink>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <Link
                to="/diagnostic"
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-teal-800 bg-teal-50 border border-teal-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                AI Clinical Workflow Diagnostic
              </Link>
              <Link
                to="/demo"
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 flex items-center justify-center gap-2"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
