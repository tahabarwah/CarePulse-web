import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { CustomerSuccessStories } from '../components/CustomerSuccessStories';
import { Building2, CheckCircle2, TrendingUp, Clock, ArrowRight, Quote } from 'lucide-react';

export const CaseStoriesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'Customer Success Stories' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              Real Clinical Deployments & Documented ROI
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Validated Outcomes Across Acute Care & Health Systems
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Read how leading academic medical centers, community hospital networks, and regional acute care facilities deployed CarePulse to eliminate shift handoff friction and accelerate inpatient throughput.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Success Stories Interactive Component */}
      <CustomerSuccessStories
        onOpenDemo={() => navigate('/demo')}
        onOpenDiagnostic={() => navigate('/diagnostic')}
      />

      {/* Reference Customer Consultation CTA */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
              Would You Like to Speak with a Peer Hospital Leader?
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We connect prospective health systems with Chief Nursing Officers and Chief Medical Information Officers who have led CarePulse implementations in similar bed-size facilities.
            </p>
            <button
              onClick={() => navigate('/demo')}
              className="px-6 py-3 rounded-lg text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              Request Peer Reference Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
