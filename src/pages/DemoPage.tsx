import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { DemoRequestSection } from '../components/DemoRequestSection';
import { Calendar, ShieldCheck, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';

export const DemoPage: React.FC = () => {
  const location = useLocation();
  
  // Extract initial notes if passed from ROI Calculator or AI Diagnostic via location state or query params
  const stateNotes = (location.state as any)?.initialNotes;
  const searchParams = new URLSearchParams(location.search);
  const queryNotes = searchParams.get('notes');
  const initialNotes = stateNotes || (queryNotes ? decodeURIComponent(queryNotes) : '');

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'Request a Demo' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              Tailored Executive & Sandbox Demonstration
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Schedule Your Hospital Sandbox Walkthrough
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Experience CarePulse populated with simulated clinical data matching your facility scale and core EHR system (Epic, Cerner, or MEDITECH). Consult directly with our Senior Clinical Informatics Directors.
            </p>
          </div>
        </div>
      </div>

      {/* Main Demo Booking Form */}
      <DemoRequestSection initialNotes={initialNotes} />
    </div>
  );
};
