import React, { useState } from 'react';
import { 
  Stethoscope, 
  HeartHandshake, 
  Building2, 
  ShieldCheck, 
  Users, 
  Check, 
  X, 
  Quote, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { ROLE_USE_CASES } from '../data/healthcareData';

interface RoleUseCasesProps {
  onOpenDemo: () => void;
}

export const RoleUseCases: React.FC<RoleUseCasesProps> = ({ onOpenDemo }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(ROLE_USE_CASES[0].id);

  const currentRole = ROLE_USE_CASES.find(r => r.id === selectedRoleId) || ROLE_USE_CASES[0];

  const getRoleIcon = (id: string) => {
    switch (id) {
      case 'cmio-physicians': return <Stethoscope className="w-5 h-5" />;
      case 'cno-nursing': return <HeartHandshake className="w-5 h-5" />;
      case 'coo-operations': return <Building2 className="w-5 h-5" />;
      case 'ciso-health-it': return <ShieldCheck className="w-5 h-5" />;
      case 'case-managers': return <Users className="w-5 h-5" />;
      default: return <Stethoscope className="w-5 h-5" />;
    }
  };

  return (
    <section id="roles" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
            Tailored for Every Healthcare Stakeholder
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Role-Based Solutions Across the Hospital Enterprise
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether at the bedside, in the C-suite, or in health informatics, CarePulse addresses the specific pressures of each role.
          </p>
        </div>

        {/* Role Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {ROLE_USE_CASES.map((role) => {
            const isSelected = role.id === selectedRoleId;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 ring-1 ring-teal-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {getRoleIcon(role.id)}
                <span>{role.personaCategory}</span>
              </button>
            );
          })}
        </div>

        {/* Active Role Content Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-4xl mx-auto">
            {/* Header info */}
            <div className="border-b border-slate-200 pb-6 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                {currentRole.roleTitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentRole.headline}
              </h3>
            </div>

            {/* Pains vs Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Pains */}
              <div className="p-5 rounded-xl bg-white border border-rose-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-4">
                  <X className="w-4 h-4 text-rose-600" />
                  Primary Operational Friction Points
                </div>
                <ul className="space-y-3">
                  {currentRole.corePains.map((pain, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="p-5 rounded-xl bg-white border border-teal-300 shadow-2xs">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider mb-4">
                  <Check className="w-4 h-4 text-teal-600" />
                  CarePulse Orchestrated Capabilities
                </div>
                <ul className="space-y-3">
                  {currentRole.solutionCapabilities.map((sol, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantified Outcome Strip */}
            <div className="bg-teal-900 text-white rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-800 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-teal-300 tracking-wider">Quantified Institutional Impact</div>
                  <div className="text-sm sm:text-base font-medium text-slate-100 mt-0.5">
                    {currentRole.quantifiedOutcome}
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenDemo}
                className="shrink-0 text-xs font-semibold px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Schedule Role Demo <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Executive Quote */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex items-start gap-4">
              <Quote className="w-8 h-8 text-teal-700/30 shrink-0 mt-1" />
              <div>
                <p className="text-sm sm:text-base italic text-slate-700 leading-relaxed mb-3">
                  "{currentRole.quote.text}"
                </p>
                <div className="text-xs text-slate-900 font-bold">{currentRole.quote.author}</div>
                <div className="text-xs text-slate-500">{currentRole.quote.org}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
