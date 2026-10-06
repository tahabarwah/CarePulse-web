import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Sparkles, 
  Stethoscope, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Building2, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Cpu,
  Minus,
  Plus
} from 'lucide-react';
import { FAQ_LIST } from '../data/healthcareData';

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  title = 'Clinical Implementation & Workflow FAQ',
  subtitle = 'Common architectural, onboarding, and compliance questions answered for hospitalists, nursing directors, CMIOs, and health system IT.',
  badgeText = 'Clinical Implementation FAQ',
  className = '',
}) => {
  // Use a Set to allow multi-expand or single-expand
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Clinical Workflow & Adoption',
    'EHR Interoperability',
    'Patient Safety & Telemetry',
    'Reliability & Architecture',
    'Security & Governance',
    'Pricing & Deployment'
  ];

  const toggleFaq = (index: number) => {
    setOpenIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const all = new Set<number>(filteredFaqs.map((_, idx) => idx));
    setOpenIndices(all);
  };

  const handleCollapseAll = () => {
    setOpenIndices(new Set());
  };

  const filteredFaqs = FAQ_LIST.filter(faq => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Clinical Workflow & Adoption':
        return <Stethoscope className="w-3.5 h-3.5 text-teal-600" />;
      case 'EHR Interoperability':
        return <Layers className="w-3.5 h-3.5 text-blue-600" />;
      case 'Patient Safety & Telemetry':
        return <Activity className="w-3.5 h-3.5 text-rose-600" />;
      case 'Reliability & Architecture':
        return <Cpu className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Security & Governance':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Pricing & Deployment':
        return <Building2 className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  return (
    <section 
      id="faqs" 
      className={`py-16 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden ${className}`}
      aria-label="Clinical Implementation Frequently Asked Questions"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>{badgeText}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            {title}
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinical topics (e.g., dual-charting, training, Epic, downtime, BAA)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? FAQ_LIST.length 
                : FAQ_LIST.filter(f => f.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-teal-800 text-teal-100' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats & Expand/Collapse Toggle */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1 border-t border-slate-100">
            <span>
              Showing <strong className="text-slate-800">{filteredFaqs.length}</strong> of {FAQ_LIST.length} implementation questions
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExpandAll}
                className="text-teal-700 hover:text-teal-900 font-medium cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={handleCollapseAll}
                className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3" role="region" aria-label="FAQ Questions">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.has(idx);
              const categoryIcon = getCategoryIcon(faq.category);
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-white border-teal-500/60 shadow-md ring-1 ring-teal-500/10' 
                      : 'bg-slate-50/70 border-slate-200/90 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Accordion Question Trigger Button */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4.5 text-left flex items-start justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 shrink-0 mt-0.5 border border-teal-200/60">
                        {categoryIcon}
                      </div>
                      <div>
                        <span className="text-sm sm:text-base font-bold text-slate-900 block leading-snug">
                          {faq.question}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-200/60 mt-2">
                          {faq.category}
                        </span>
                      </div>
                    </div>

                    {/* Expand/Collapse Chevron Indicator */}
                    <div className={`p-1.5 rounded-lg border transition-transform duration-200 shrink-0 ${
                      isOpen ? 'bg-teal-700 text-white border-teal-700 rotate-180' : 'bg-white border-slate-200 text-slate-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-white animate-in fade-in duration-150">
                      <p className="pt-2">{faq.answer}</p>
                      
                      {/* Clinical Verification Note */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1.5 text-teal-800 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          Validated across Epic, Cerner & MEDITECH deployments
                        </span>
                        <Link
                          to="/demo"
                          className="font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                        >
                          <span>Ask an Informatics Lead</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 text-xs sm:text-sm space-y-2">
              <p className="font-semibold text-slate-800">
                No matching implementation questions found for "{searchQuery}".
              </p>
              <p className="text-slate-500 text-xs">
                Try searching for keywords like "dual-charting", "Epic", "training", "BAA", or "downtime".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Clinical Informatics Consultation Card */}
        <div className="mt-12 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400">
              <Sparkles className="w-4 h-4" />
              <span>Direct Clinical Informatics Architecture Review</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Have specific questions about your hospital's inpatient workflows?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Our clinical informatics team includes former hospitalists and chief nursing executives who review your floor unit layouts, nurse-to-patient ratios, and EHR integration requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/diagnostic"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center transition-colors"
            >
              Run AI Diagnostic
            </Link>
            <Link
              to="/demo"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 font-bold text-center transition-colors shadow-sm"
            >
              Schedule Clinical Briefing
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
