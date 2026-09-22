import React, { useState } from 'react';
import { CUSTOMER_SUCCESS_STORIES } from '../data/healthcareData';
import { SuccessStory } from '../types';
import { 
  Building2, 
  Quote, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  ArrowRight,
  Stethoscope,
  Network
} from 'lucide-react';

interface CustomerSuccessStoriesProps {
  onOpenDemo: () => void;
  onOpenDiagnostic: () => void;
}

export const CustomerSuccessStories: React.FC<CustomerSuccessStoriesProps> = ({ 
  onOpenDemo, 
  onOpenDiagnostic 
}) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(CUSTOMER_SUCCESS_STORIES[0].id);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  const activeStory = CUSTOMER_SUCCESS_STORIES.find(s => s.id === selectedStoryId) || CUSTOMER_SUCCESS_STORIES[0];

  const toggleExpand = (id: string) => {
    setExpandedDetailsId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="success-stories" 
      className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200"
      aria-label="Customer Success Stories & Testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100/80 text-teal-800 border border-teal-200 mb-3">
            <Building2 className="w-3.5 h-3.5 text-teal-700" />
            <span>Health System Impact & Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-sans">
            Trusted by Hospital Administrators & Clinical Leaders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            See how chief medical officers, nursing executives, and health system operations directors 
            accelerate discharge velocity, streamline shift transitions, and eliminate clinical friction.
          </p>
        </div>

        {/* Aggregate Proven Benchmark Summary Bar */}
        <div 
          id="proven-benchmarks-bar"
          className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 gap-6 md:gap-0">
            <div className="flex items-center gap-4 md:px-6 first:pl-0">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900 font-sans">1.4 Hours</div>
                <div className="text-xs font-semibold text-teal-800 uppercase tracking-wide">Discharge Velocity</div>
                <p className="text-xs text-slate-500 mt-0.5">Earlier median order placement freeing afternoon inpatient capacity</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:px-6 pt-6 md:pt-0">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900 font-sans">28 Minutes</div>
                <div className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Shift Handoff Savings</div>
                <p className="text-xs text-slate-500 mt-0.5">Reclaimed per nurse per 12-hour transition with structured SBAR</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:px-6 pt-6 md:pt-0">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900 font-sans">0.8 Day</div>
                <div className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">Avoidable LOS Reduction</div>
                <p className="text-xs text-slate-500 mt-0.5">Accelerated barrier clearing and real-time cross-facility bed placement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls to Select Administrator Role */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CUSTOMER_SUCCESS_STORIES.map((story) => {
            const isSelected = story.id === selectedStoryId;
            return (
              <button
                key={story.id}
                id={`btn-tab-${story.id}`}
                onClick={() => setSelectedStoryId(story.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className={`w-6 h-6 rounded-md ${story.author.avatarBg} text-white flex items-center justify-center text-[10px] font-bold`}>
                  {story.author.avatarInitials}
                </span>
                <span className="truncate">{story.author.name.split(',')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                  isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  {story.author.title.split('&')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Testimonial Detail Card */}
        <div 
          id={`story-featured-${activeStory.id}`}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Organization & Author Profile */}
            <div className="lg:col-span-4 bg-slate-900 text-white p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-800 text-xs font-medium mb-6">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Verified Healthcare Leader
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${activeStory.author.avatarBg} text-white flex items-center justify-center text-lg font-bold shadow-inner shrink-0`}>
                    {activeStory.author.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight font-sans">
                      {activeStory.author.name}
                    </h3>
                    <p className="text-xs text-teal-300 font-medium mt-1 leading-snug">
                      {activeStory.author.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeStory.author.department}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Health System</span>
                    <span className="font-semibold text-slate-200 text-sm">{activeStory.author.organization}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Facility Scale</span>
                    <span className="text-slate-300">{activeStory.author.facilityScale}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">EHR Integration</span>
                    <span className="inline-flex items-center gap-1 text-slate-200 font-medium mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {activeStory.ehrSystem}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Customer BAA Executed • Audited SOC 2 Type II Environment</span>
              </div>
            </div>

            {/* Right: The Testimonial & Concrete Outcomes */}
            <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Headline Quote */}
                <div className="relative mb-6">
                  <Quote className="w-10 h-10 text-teal-100 absolute -top-3 -left-3 -z-0" />
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug relative z-10 font-sans">
                    "{activeStory.headline}"
                  </h4>
                </div>

                {/* Full Quotation */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8">
                  "{activeStory.quote}"
                </p>

                {/* Quantified Outcome Metric Tiles */}
                <div className="mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Quantified Hospital Benchmarks
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeStory.keyOutcomes.map((outcome, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all hover:bg-slate-100/60"
                      >
                        <div className="text-2xl font-extrabold text-teal-700 font-sans">
                          {outcome.metric}
                        </div>
                        <div className="text-xs font-bold text-slate-800 mt-1 leading-tight">
                          {outcome.label}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {outcome.context}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Collapsible Architecture & Implementation Details */}
                <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                  <button
                    id={`btn-toggle-details-${activeStory.id}`}
                    onClick={() => toggleExpand(activeStory.id)}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 text-left text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-teal-600" />
                      <span>Implementation, Interoperability & Security Safeguards</span>
                    </span>
                    {expandedDetailsId === activeStory.id ? (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {expandedDetailsId === activeStory.id && (
                    <div className="p-5 bg-white border-t border-slate-200 text-xs space-y-4">
                      <div>
                        <span className="font-bold text-slate-900 block mb-1">Clinical Challenge:</span>
                        <p className="text-slate-600 leading-relaxed">{activeStory.challenge}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block mb-1">Solution Implemented:</span>
                        <p className="text-slate-600 leading-relaxed">{activeStory.solutionImplemented}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                        <div>
                          <span className="font-bold text-slate-900 block mb-0.5">Deployment Timeline:</span>
                          <span className="text-slate-600">{activeStory.deploymentTimeframe}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block mb-0.5">Verified Governance:</span>
                          <span className="text-slate-600">{activeStory.verifiedGovernance}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Call to Action Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Detailed peer reference calls available upon executive request under mutual NDA.
                </div>
                <div className="flex items-center gap-3">
                  <button
                    id="btn-story-diagnostic"
                    onClick={onOpenDiagnostic}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 py-2 px-3 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Analyze Your Unit Bottlenecks
                  </button>
                  <button
                    id="btn-story-demo"
                    onClick={onOpenDemo}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 py-2.5 px-4 rounded-lg transition-all shadow-xs cursor-pointer"
                  >
                    <span>Request Executive Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Card Comparative Grid showing all 3 Testimonials */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 font-sans">
              Peer Executive Testimonials Across Acute & Multi-Hospital Networks
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any leader card below to view their complete deployment outcomes and clinical workflow configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_SUCCESS_STORIES.map((story) => {
              const isCurrent = story.id === selectedStoryId;
              return (
                <div
                  key={story.id}
                  id={`card-testimonial-${story.id}`}
                  onClick={() => setSelectedStoryId(story.id)}
                  className={`bg-white rounded-xl border p-6 flex flex-col justify-between transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'border-teal-600 ring-2 ring-teal-600/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                      Currently Viewing
                    </div>
                  )}

                  <div>
                    {/* Author Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-lg ${story.author.avatarBg} text-white flex items-center justify-center text-sm font-bold shrink-0`}>
                        {story.author.avatarInitials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 leading-tight">
                          {story.author.name}
                        </div>
                        <div className="text-[11px] text-teal-700 font-medium">
                          {story.author.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {story.author.organization}
                        </div>
                      </div>
                    </div>

                    {/* Facility Scale & EHR Tag */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {story.author.facilityScale}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                        {story.ehrSystem.split('(')[0].trim()}
                      </span>
                    </div>

                    {/* Excerpt Quote */}
                    <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-4 mb-4">
                      "{story.quote}"
                    </p>
                  </div>

                  <div>
                    {/* Primary Highlight Metric */}
                    <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                      <div>
                        <div className="text-lg font-bold text-teal-700 font-sans">
                          {story.keyOutcomes[0].metric}
                        </div>
                        <div className="text-[10px] font-medium text-slate-600">
                          {story.keyOutcomes[0].label}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                        View Story <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regulatory & Compliance Footnote */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          <p>
            * Metrics reflect verified customer self-reported operational benchmarks following 
            enterprise CarePulse rollout. CarePulse provides workflow orchestration and does not 
            provide diagnostic clinical treatment or replace licensed clinical judgment.
          </p>
        </div>
      </div>
    </section>
  );
};
