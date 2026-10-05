import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PatientOverviewGrid } from '../components/commandCenter/PatientOverviewGrid';
import { Activity, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PatientOverviewPage: React.FC = () => {
  return (
    <div className="bg-slate-50/60 min-h-screen pb-16">
      {/* Page Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <Breadcrumb items={[{ label: 'Clinical Command Center' }, { label: 'Patient Overview' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              Live Clinical Command Center Simulation
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Ward Patient Overview & Triage Command Center
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              A high-density operational grid visualizing inpatient census, real-time vital telemetry alerts, upcoming procedural queues, and proactive discharge barrier resolution across acute hospital units.
            </p>
          </div>
        </div>
      </div>

      {/* Main Command Center Module */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <PatientOverviewGrid />
      </div>

      {/* Technical Architecture Context Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold">
              <Cpu className="w-4 h-4" />
              <span>SMART on FHIR Continuous Telemetry Bus</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Deploy the Command Center Inside Your Hospital's EHR
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              CarePulse's Patient Overview module embeds directly into Epic Hyperspace, Cerner PowerChart, or central nursing station monitors via OAuth 2.0 single sign-on. Ingests HL7 ADT, FHIR Observation, and Task streams in sub-second intervals.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/integrations"
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              FHIR R4 Specs
            </Link>
            <Link
              to="/demo"
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold transition-colors shadow-sm"
            >
              Request EHR Sandbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
