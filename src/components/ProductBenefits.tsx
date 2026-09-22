import React, { useState } from 'react';
import { 
  ClipboardList, 
  Users, 
  BellOff, 
  DoorOpen, 
  CheckCircle2, 
  LayoutGrid, 
  ArrowRight, 
  Check, 
  XCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { PRODUCT_BENEFITS } from '../data/healthcareData';

interface ProductBenefitsProps {
  onOpenDemo: () => void;
  onOpenDiagnostic: () => void;
}

export const ProductBenefits: React.FC<ProductBenefitsProps> = ({ onOpenDemo, onOpenDiagnostic }) => {
  const [selectedBenefitId, setSelectedBenefitId] = useState<string>(PRODUCT_BENEFITS[0].id);

  const activeBenefit = PRODUCT_BENEFITS.find(b => b.id === selectedBenefitId) || PRODUCT_BENEFITS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardList': return <ClipboardList className="w-6 h-6 text-teal-700" />;
      case 'Users': return <Users className="w-6 h-6 text-teal-700" />;
      case 'BellOff': return <BellOff className="w-6 h-6 text-teal-700" />;
      case 'DoorOpen': return <DoorOpen className="w-6 h-6 text-teal-700" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-teal-700" />;
      case 'LayoutGrid': return <LayoutGrid className="w-6 h-6 text-teal-700" />;
      default: return <ClipboardList className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section id="benefits" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
            Core Clinical Operational Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Clinician Sanity and Hospital Throughput
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Healthcare teams lose hours to asynchronous phone tag, lost paperwork, and delayed consults. CarePulse removes friction at each critical clinical intersection.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_BENEFITS.map((benefit) => {
            const isSelected = benefit.id === selectedBenefitId;
            return (
              <div
                key={benefit.id}
                onClick={() => setSelectedBenefitId(benefit.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-50/50 border-teal-600 shadow-md ring-1 ring-teal-600'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                      {getIcon(benefit.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{benefit.description}</p>

                  <ul className="space-y-2 mb-6">
                    {benefit.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-teal-800">{benefit.metric}</span>
                    <span className="text-[11px] text-slate-500 block">{benefit.metricLabel}</span>
                  </div>
                  <button
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    View Workflow <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Comparison: Status Quo vs CarePulse */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              The Reality Check: Legacy Workarounds vs. CarePulse Orchestration
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Why high-reliability healthcare institutions choose structured operational workflows over unstructured chaos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Quo */}
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-rose-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4 text-rose-700 font-bold text-sm uppercase tracking-wider">
                <XCircle className="w-5 h-5 text-rose-600" />
                The Fragmented Status Quo
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                  <span><strong>Printed Paper Handoffs:</strong> Illegible scribbles, lost pages, and zero medicolegal shift transition auditability.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                  <span><strong>Hallway Voice Requests:</strong> Unacknowledged orders getting dropped between scrub ins, phone calls, and shift handoffs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                  <span><strong>Afternoon Discharge Avalanche:</strong> Bed readiness stalled until 4:30 PM due to missing transportation, DME auth, or Meds-to-Beds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                  <span><strong>Continuous Alarm Fatigue:</strong> Hundreds of repetitive non-actionable beeps per shift driving nurse burnout and missed vital changes.</span>
                </li>
              </ul>
            </div>

            {/* CarePulse Standard */}
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-teal-300 shadow-sm ring-1 ring-teal-500/20">
              <div className="flex items-center gap-2 mb-4 text-teal-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                The CarePulse Orchestrated Workflow
              </div>
              <ul className="space-y-3.5 text-sm text-slate-800">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                  <span><strong>Standardized SBAR Shift Packets:</strong> Auto-populated vitals, orders, and dual digital verification with zero paper waste.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                  <span><strong>Closed-Loop Timed Escalations:</strong> Micro-tasks assigned to verified clinicians with automatic fallback cascades.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                  <span><strong>Proactive 36-Hour Barrier Resolution:</strong> Prior authorizations, SNF placement, and bedside pharmacy delivery coordinated before morning rounds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                  <span><strong>Smart Context Alarm Filtering:</strong> Suppresses non-critical repetitive alarms while prioritizing true clinical deterioration flags.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-200">
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg text-white bg-teal-700 hover:bg-teal-800 transition-all"
            >
              Request Custom Workflow Walkthrough
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDiagnostic}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg text-teal-900 bg-white border border-teal-200 hover:bg-teal-50 transition-all"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              Evaluate Unit Sizing & ROI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
