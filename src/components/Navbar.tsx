import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  Building2, 
  FileText, 
  ExternalLink 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isMoreActive = ['/security', '/case-stories', '/resources'].includes(location.pathname);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center py-2 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
      isActive
        ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
        : 'text-slate-600 hover:text-teal-700 hover:border-b-2 hover:border-slate-300'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-teal-50 text-teal-800 font-semibold border-l-4 border-teal-600'
        : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
    }`;

  return (
    <>
      {/* Top Compliance Trust Bar */}
      <div 
        id="compliance-banner" 
        className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 relative z-40"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-teal-950 text-teal-400 border border-teal-800/80 shrink-0">
              HIPAA-Ready Architecture
            </span>
            <span className="text-slate-400 text-[11px] sm:text-xs">
              <span className="hidden md:inline">Executable BAAs • Annual SOC 2 Type II Audited • </span>
              Zero PHI Model Training
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px] sm:text-xs shrink-0">
            <span className="hidden lg:inline-flex items-center gap-1.5">
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
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90'
            : 'bg-white border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
            
            {/* Zone 1: Brand Logo */}
            <div className="flex items-center shrink-0">
              <Link
                to="/"
                className="flex items-center gap-2.5 group"
                aria-label="CarePulse Home"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-sans">
                      CarePulse
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      Health OS
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight hidden 2xl:block">
                    Clinical Operations & Workflow Platform
                  </p>
                </div>
              </Link>
            </div>

            {/* Zone 2: Desktop Navigation Links (Prevent Overflow via Structured Responsive Grouping) */}
            <nav 
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-4 flex-1 justify-center min-w-0"
            >
              {/* Primary Feature: Patient Overview Command Center */}
              <NavLink 
                to="/patient-overview" 
                className={navLinkClass}
                title="Clinical Command Center & Patient Overview"
              >
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Patient Overview</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                    Live
                  </span>
                </span>
              </NavLink>

              <NavLink to="/platform" className={navLinkClass}>
                Platform
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

              {/* "More" Dropdown Menu for Security, Case Stories, and Resources */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onMouseEnter={() => setMoreDropdownOpen(true)}
                  aria-expanded={moreDropdownOpen}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1 py-2 text-xs xl:text-sm font-medium transition-colors cursor-pointer shrink-0 ${
                    isMoreActive
                      ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                      : 'text-slate-600 hover:text-teal-700'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {moreDropdownOpen && (
                  <div
                    onMouseLeave={() => setMoreDropdownOpen(false)}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Platform Trust & Evidence
                    </div>

                    <Link
                      to="/security"
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-start gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors ${
                        location.pathname === '/security' ? 'bg-teal-50/70 text-teal-900' : 'text-slate-800'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">Security & Compliance</div>
                        <p className="text-[11px] text-slate-500 leading-snug">HIPAA BAA, SOC 2 Type II, zero PHI retention</p>
                      </div>
                    </Link>

                    <Link
                      to="/case-stories"
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-start gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors ${
                        location.pathname === '/case-stories' ? 'bg-teal-50/70 text-teal-900' : 'text-slate-800'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">Customer Success Stories</div>
                        <p className="text-[11px] text-slate-500 leading-snug">Quantified outcomes from 18+ hospital systems</p>
                      </div>
                    </Link>

                    <Link
                      to="/resources"
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-start gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors ${
                        location.pathname === '/resources' ? 'bg-teal-50/70 text-teal-900' : 'text-slate-800'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">Resources & Whitepapers</div>
                        <p className="text-[11px] text-slate-500 leading-snug">Clinical guides, integration docs & FAQs</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: Actions (Responsive to avoid overlapping under narrow viewports) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Secondary CTA: AI Diagnostic (Visible on xl+ or tablets where space allows) */}
              <Link
                id="btn-nav-diagnostic"
                to="/diagnostic"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-all shadow-xs whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                AI Diagnostic
              </Link>

              {/* Primary CTA: Request a Demo (Visible on sm+ screens) */}
              <Link
                id="btn-nav-demo"
                to="/demo"
                className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-all shadow-sm shadow-teal-700/30 whitespace-nowrap shrink-0"
              >
                <span>Request Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile / Tablet Hamburger Toggle */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden lg:hidden shrink-0"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              <NavLink to="/" end className={mobileNavLinkClass}>
                <span>Overview (Home)</span>
              </NavLink>

              {/* Featured Patient Overview Command Center */}
              <NavLink to="/patient-overview" className={mobileNavLinkClass}>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Patient Overview (Command Center)</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Live
                </span>
              </NavLink>

              <NavLink to="/platform" className={mobileNavLinkClass}>
                <span>Platform & Clinical Pathway</span>
              </NavLink>

              <NavLink to="/solutions" className={mobileNavLinkClass}>
                <span>Solutions by Hospital Role</span>
              </NavLink>

              <NavLink to="/roi-calculator" className={mobileNavLinkClass}>
                <span>Healthcare ROI & Economics</span>
              </NavLink>

              <NavLink to="/integrations" className={mobileNavLinkClass}>
                <span>EHR Integrations & FHIR R4</span>
              </NavLink>

              <NavLink to="/security" className={mobileNavLinkClass}>
                <span>Security & HIPAA Compliance</span>
              </NavLink>

              <NavLink to="/case-stories" className={mobileNavLinkClass}>
                <span>Customer Success Stories</span>
              </NavLink>

              <NavLink to="/resources" className={mobileNavLinkClass}>
                <span>Resources, Whitepapers & FAQs</span>
              </NavLink>
            </div>

            {/* Mobile Actions Drawer Bottom */}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <Link
                to="/diagnostic"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-teal-800 bg-teal-50 border border-teal-200 flex items-center justify-center gap-2 hover:bg-teal-100 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                AI Clinical Workflow Diagnostic
              </Link>
              <Link
                to="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Request a Health System Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
