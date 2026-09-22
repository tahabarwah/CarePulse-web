import React, { useState } from 'react';
import { 
  LogIn, 
  Users, 
  CheckSquare, 
  LogOut, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Activity, 
  FileCode, 
  UserCheck, 
  ShieldCheck 
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/healthcareData';

interface ClinicalWorkflowProps {
  onOpenDemo: () => void;
}

export const ClinicalWorkflow: React.FC<ClinicalWorkflowProps> = ({ onOpenDemo }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const currentStep = WORKFLOW_STEPS[activeStepIndex];

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return <LogIn className="w-5 h-5" />;
      case 1: return <Users className="w-5 h-5" />;
      case 2: return <CheckSquare className="w-5 h-5" />;
      case 3: return <LogOut className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section id="workflow" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200 mb-3">
            End-to-End Inpatient Pathway
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Admission to Safe Discharge: An Integrated Clinical Journey
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            See how CarePulse tracks each patient through every critical care milestone without adding documentation burden or double-charting in the EHR.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-white border-teal-600 shadow-md ring-2 ring-teal-600/30'
                    : 'bg-white/80 hover:bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    0{step.stepNumber}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {step.phase}
                  </span>
                </div>
                <div className={`text-sm font-bold truncate ${isActive ? 'text-teal-900' : 'text-slate-800'}`}>
                  {step.title.split(':')[0]}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Step Details & Protocol Checklist */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                    Phase 0{currentStep.stepNumber} • {currentStep.phase}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-500">Automated Clinical Protocol</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">{currentStep.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {currentStep.detailedDescription}
                </p>

                {/* Protocol Action Items */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Automated Protocol Action Items:
                  </span>
                  {currentStep.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FHIR Standards Alignment Badge */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <FileCode className="w-4 h-4 text-teal-700" />
                  <span className="font-semibold">FHIR R4 Resources:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentStep.fhirResources.map((res, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] text-slate-700 border border-slate-200">
                        {res}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenDemo}
                  className="font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  See in Live Demo <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Live Simulated Hospital Screen for this Step */}
            <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
              <div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-mono text-slate-300 font-semibold">{currentStep.mockData.unit}</span>
                  </div>
                  <span className="text-[11px] text-teal-400 font-mono bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                    Live Shift State
                  </span>
                </div>

                {/* Patient Case Card */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sm text-white">
                      {currentStep.mockData.patientId}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {currentStep.mockData.acuity}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 mb-3">
                    <div><strong>Assigned Team:</strong> {currentStep.mockData.assignedTeam.join(' • ')}</div>
                    <div><strong>Elapsed:</strong> {currentStep.mockData.timeRemaining}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs space-y-2">
                    <div>
                      <span className="text-teal-400 font-semibold block text-[11px] uppercase tracking-wider">
                        Current Milestone:
                      </span>
                      <p className="text-slate-200 mt-0.5">{currentStep.mockData.currentMilestone}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-amber-400 font-semibold block text-[11px] uppercase tracking-wider">
                        Pending Closed-Loop Action:
                      </span>
                      <p className="text-slate-200 mt-0.5">{currentStep.mockData.pendingAction}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Safeguard Footer */}
              <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Audit Event ID: #EVT-49102-HL7
                </span>
                <span className="text-emerald-400 font-mono">200 OK • 12ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
