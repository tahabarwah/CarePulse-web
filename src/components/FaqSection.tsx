import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { FAQ_LIST } from '../data/healthcareData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Security & BAA', 'EHR Interoperability', 'Clinical Adoption', 'Pricing & Deployment'];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = FAQ_LIST.filter(faq => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Answers for Healthcare Leadership & Health IT
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything your clinical, security, and administrative teams need to evaluate CarePulse with confidence.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search security, EHR compatibility, BAA, or pricing..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-600"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      <p>{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-teal-800">
                        <span className="px-2 py-0.5 rounded bg-teal-50 border border-teal-200">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-sm">
              No matching questions found for "{searchQuery}". Try searching for BAA, Epic, or security.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
