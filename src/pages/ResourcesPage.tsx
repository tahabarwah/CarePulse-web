import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { ResourcesSection } from '../components/ResourcesSection';
import { FaqSection } from '../components/FaqSection';
import { BookOpen, HelpCircle } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'Resources & Whitepapers' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              Evidence-Based Inpatient Research & FAQs
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Clinical Research, Whitepapers & FAQs
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore peer-reviewed workflow studies, change management playbooks, and answers to common technical, clinical, and security questions from health system leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Resources & Downloadable Whitepapers */}
      <ResourcesSection
        onOpenDemo={() => navigate('/demo')}
        onOpenDiagnostic={() => navigate('/diagnostic')}
      />

      {/* Frequently Asked Questions */}
      <div className="border-t border-slate-200">
        <FaqSection />
      </div>
    </div>
  );
};
