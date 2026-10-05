import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Calculator, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Building2,
  FileText,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { TRUSTED_INSTITUTIONS } from '../data/healthcareData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenDemo = () => {
    navigate('/demo');
  };

  const handleOpenDiagnostic = () => {
    navigate('/diagnostic');
  };

  return (
    <div>
      {/* 1. Interactive Hero with Live Hospital Board Simulator */}
      <Hero
        onOpenDemo={handleOpenDemo}
        onOpenDiagnostic={handleOpenDiagnostic}
      />

      {/* 2. Platform Highlights & Multi-Page Navigation Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              Enterprise Healthcare Platform
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Modern Care Orchestration Built for Real Clinical Environments
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore how CarePulse connects multidisciplinary care teams, integrates with legacy EHRs, and accelerates patient discharge across acute care hospitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 0: Patient Overview Command Center */}
            <div className="bg-white p-6 rounded-xl border-2 border-teal-600/60 shadow-xs hover:border-teal-600 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Live Simulation
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Patient Overview (Command Center)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Experience the live clinical grid visualizing ward census, real-time vital telemetry alerts, upcoming procedural queues, and discharge blockers.
                </p>
              </div>
              <Link
                to="/patient-overview"
                className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800 group-hover:translate-x-0.5 transition-all pt-2 border-t border-slate-100"
              >
                Launch Command Center
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Card 1: Platform & Clinical Pathway */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Clinical Pathway & Patient Portal
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Synchronize admission handoffs, daily multidisciplinary rounds, and proactive discharge barrier tracking with real-time patient bedside timelines.
                </p>
              </div>
              <Link
                to="/platform"
                className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800 group-hover:translate-x-0.5 transition-all pt-2 border-t border-slate-100"
              >
                Explore Clinical Pathway
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Card 2: Solutions by Stakeholder */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Solutions by Stakeholder Role
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Tailored operational solutions for CMIOs, Nursing Leadership (CNOs), Hospital COOs, CISOs, and Bedside Care Coordinators.
                </p>
              </div>
              <Link
                to="/solutions"
                className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800 group-hover:translate-x-0.5 transition-all pt-2 border-t border-slate-100"
              >
                View Role Solutions
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Card 3: Healthcare ROI Calculator */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Healthcare ROI & Cost Model
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Calculate annual nurse overtime savings, reduced avoidable bed-days, and projected 5-year financial impact with interactive D3 charts.
                </p>
              </div>
              <Link
                to="/roi-calculator"
                className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800 group-hover:translate-x-0.5 transition-all pt-2 border-t border-slate-100"
              >
                Launch ROI Calculator
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Card 4: EHR Integrations & FHIR R4 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  EHR & Standards Interoperability
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Deep SMART on FHIR R4 connectors for Epic Systems, Oracle Cerner, MEDITECH, and Athenahealth with bidirectional task synchronization.
                </p>
              </div>
              <Link
                to="/integrations"
                className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800 group-hover:translate-x-0.5 transition-all pt-2 border-t border-slate-100"
              >
                View Interop Matrix
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Card 5: Security & Compliance */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Enterprise Security & BAA
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Executable Business Associate Agreements, SOC 2 Type II audit readiness, AES-256 encryption, and zero model training on patient PHI.
                </p>
              </div>
              <Link
                to="/security"
                className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800 group-hover:translate-x-0.5 transition-all pt-2 border-t border-slate-100"
              >
                Read Security Controls
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Card 6: AI Clinical Diagnostic */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  AI Workflow Diagnostic
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Input your facility scale, EHR environment, and acute operational bottlenecks to generate a custom re-engineering roadmap.
                </p>
              </div>
              <Link
                to="/diagnostic"
                className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800 group-hover:translate-x-0.5 transition-all pt-2 border-t border-slate-100"
              >
                Run Workflow Diagnostic
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proof Bar / Validated Clinical Outcomes */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                28 min
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Saved per nurse shift handoff
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Reduced cognitive friction & overtime
              </div>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                1.4 hrs
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Earlier discharge orders
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Freed afternoon telemetry beds
              </div>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                99.98%
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Enterprise SLA uptime
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                High-availability clinical failover
              </div>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                4.2x
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Average 3-year facility ROI
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Reclaimed clinical capacity
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/case-stories"
              className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              Read full hospital customer case studies
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Executive Call to Action Banner */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              Ready to Modernize Your Hospital's Clinical Operations?
            </h2>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              Schedule an executive sandbox demonstration tailored to your EHR environment (Epic, Cerner, or MEDITECH) and review our HIPAA compliance packet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleOpenDemo}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Request an Executive Demo
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/roi-calculator"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-teal-400" />
                Calculate Hospital Savings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
