import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { RoleUseCases } from '../components/RoleUseCases';
import { 
  Users, 
  Stethoscope, 
  HeartHandshake, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Calendar,
  Sparkles
} from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Header with Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'Solutions by Role' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Users className="w-3.5 h-3.5 text-teal-600" />
              Role-Tailored Healthcare Workflows
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Purpose-Built for Every Clinical & Operational Stakeholder
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Hospital communication breakdowns happen because each clinical role lives in a disconnected silo. CarePulse aligns physicians, nursing leadership, operations, and health IT into a synchronized care ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Role Use Cases Interactive Component */}
      <RoleUseCases onOpenDemo={() => navigate('/demo')} />

      {/* Change Management & Implementation Support */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              Implementation Strategy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Zero-Disruption Clinical Rollout Framework
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              We know hospital IT teams cannot tolerate prolonged downtime or steep learning curves. CarePulse deployments follow our proven 8-week phased onboarding program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">Phase 1 · Weeks 1-2</div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">FHIR Gateway & SSO Configuration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect sandbox test environments with Epic SMART on FHIR or Cerner Ignite. Execute BAA and verify RBAC group mappings against hospital directory.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">Phase 2 · Weeks 3-5</div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Pilot Unit Launch & Nurse Super-Users</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Roll out to a designated pilot floor (e.g. Telemetry 4-West). 15-minute micro-training for shift nurses, unit clerks, and rounding hospitalists.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">Phase 3 · Weeks 6-8</div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Hospital-Wide Adoption & KPI Audit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expand to acute, surgical, and step-down units. Measure shift handoff duration, discharge velocity improvements, and report baseline ROI to leadership.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-teal-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Schedule a Tailored Demonstration for Your Department
              </h3>
              <p className="text-teal-100 text-xs sm:text-sm max-w-xl">
                Whether you represent nursing leadership, clinical informatics, or hospital operations, our clinical team will walk you through role-specific workflows.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('/demo')}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white text-teal-900 hover:bg-teal-50 transition-colors shadow-sm"
              >
                Book Role Briefing
              </button>
              <Link
                to="/roi-calculator"
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-teal-800 hover:bg-teal-700 border border-teal-700 transition-colors"
              >
                Model Department ROI
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
