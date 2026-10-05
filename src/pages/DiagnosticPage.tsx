import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { DiagnosticTool } from '../components/DiagnosticTool';
import { Sparkles, BrainCircuit, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

export const DiagnosticPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenDemoWithData = (notes: string) => {
    navigate('/demo', { state: { initialNotes: notes } });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'AI Workflow Diagnostic' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Powered by High-Reasoning Clinical Informatics Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              AI Clinical Workflow & Operational Diagnostic
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Input your facility type, clinician scale, core EHR system, and primary operational bottlenecks. Our clinical informatics model will generate a structured pathway re-engineering roadmap, quantified throughput projections, and FHIR R4 integration blueprint.
            </p>
          </div>
        </div>
      </div>

      {/* Main Diagnostic Interactive Tool */}
      <DiagnosticTool onOpenDemoWithData={handleOpenDemoWithData} />
    </div>
  );
};
