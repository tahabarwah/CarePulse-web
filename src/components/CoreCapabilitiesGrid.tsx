import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarClock, 
  Database, 
  BarChart3, 
  ClipboardCheck, 
  CheckCircle2, 
  BellOff, 
  ArrowRight, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Cpu,
  FileText,
  Check,
  X
} from 'lucide-react';

export interface CapabilityFeature {
  id: string;
  category: 'coordination' | 'integration' | 'analytics' | 'workflow';
  title: string;
  tagline: string;
  shortDescription: string;
  iconName: 'calendar' | 'database' | 'analytics' | 'sbar' | 'discharge' | 'alert';
  highlightMetric: {
    value: string;
    label: string;
  };
  featuresList: string[];
  ehrStandards: string;
  demoRoute: string;
  deepDiveModal: {
    clinicalPain: string;
    workflowSolution: string;
    auditedOutcome: string;
  };
}

export const CORE_CAPABILITIES: CapabilityFeature[] = [
  {
    id: 'automated-scheduling',
    category: 'coordination',
    title: 'Automated Scheduling & Procedural Dispatch',
    tagline: 'Logistics & Team Sequencing',
    shortDescription: 'Algorithmically synchronize multidisciplinary rounding schedules, patient transport requests, and pre-procedure safety checklists based on unit geography and clinical priority.',
    iconName: 'calendar',
    highlightMetric: {
      value: '32 mins',
      label: 'Faster pre-op prep & bedside transport',
    },
    featuresList: [
      'Automated rounding order sequencing optimized by physical room adjacency',
      'One-tap hospital logistics dispatch with real-time transport status tracking',
      'Pre-procedure safety verification flags (NPO status, consent, IV access)',
      'Automated milestone alerts to procedure suites when patients depart bedside'
    ],
    ehrStandards: 'FHIR Appointment & Task Resources • HL7 SIU Scheduling Feeds',
    demoRoute: '/patient-overview',
    deepDiveModal: {
      clinicalPain: 'Procedural suites and imaging suites experience delayed start times because floor nurses, transport aides, and surgical techs rely on phone calls to coordinate patient readiness.',
      workflowSolution: 'CarePulse monitors impending scheduled procedures, prompts floor staff on pre-procedure safety verification milestones, and dispatches patient transport in lockstep with suite prep.',
      auditedOutcome: 'Delivered an average 32-minute reduction in first-case turnover lag across 5 hospital surgical and catheterization suites.'
    }
  },
  {
    id: 'patient-data-integration',
    category: 'integration',
    title: 'Patient Data & Real-Time EHR Integration',
    tagline: 'Bidirectional Interoperability',
    shortDescription: 'Ingest continuous HL7 ADT feeds, FHIR R4 telemetry observations, active medication orders, and pending labs from Epic, Cerner, and MEDITECH with zero dual-charting.',
    iconName: 'database',
    highlightMetric: {
      value: '0 mins',
      label: 'Duplicate documentation required',
    },
    featuresList: [
      'Sub-second bidirectional synchronization with native EHR legal medical records',
      'SMART on FHIR OAuth 2.0 single sign-on launching directly inside provider workspaces',
      'Interface engine connectors for Cloverleaf, Mirth Connect, Corepoint, and Rhapsody',
      'Zero model training on patient Protected Health Information (PHI) with AES-256 encryption'
    ],
    ehrStandards: 'SMART on FHIR R4 • US Core STU3 • HL7 v2.x (ADT/ORM/ORU)',
    demoRoute: '/integrations',
    deepDiveModal: {
      clinicalPain: 'Clinicians reject third-party software that forces them to log into separate web portals or manually re-type patient vitals, active diagnoses, and medication lists.',
      workflowSolution: 'CarePulse embeds directly inside Epic Hyperspace, Cerner PowerChart, or central nursing monitors via SMART on FHIR. Data streams automatically in sub-second intervals.',
      auditedOutcome: 'Eliminated 100% of double-charting requirements while achieving 99.98% high-availability multi-region clinical uptime.'
    }
  },
  {
    id: 'clinical-analytics',
    category: 'analytics',
    title: 'Clinical Analytics & Predictive Throughput',
    tagline: 'Operational Intelligence & AI',
    shortDescription: 'Surface real-time length of stay (LOS) outlier trajectories, unacknowledged telemetry alarm spikes, and unit-by-unit bed turnaround bottlenecks across inpatient acute wards.',
    iconName: 'analytics',
    highlightMetric: {
      value: '0.8 day',
      label: 'Reduction in avoidable length of stay',
    },
    featuresList: [
      'Predictive length of stay risk models flagging complex discharge outliers 48h in advance',
      'Nurse overtime and shift transition duration analytics by department and floor',
      'Environmental services (EVS) terminal clean milestone latency tracking',
      'Joint Commission and CMS compliance reporting dashboards with immutable audit logs'
    ],
    ehrStandards: 'FHIR Encounter & MeasureReport • SQL/Snowflake Analytics Pipeline',
    demoRoute: '/roi-calculator',
    deepDiveModal: {
      clinicalPain: 'Hospital COOs and nursing directors discover patient throughput bottlenecks retroactively via monthly retrospective billing reports, too late to unlock bed capacity.',
      workflowSolution: 'CarePulse provides live command center operational intelligence, highlighting active bed census, pending discharge barriers, and nursing overtime trends in real time.',
      auditedOutcome: 'Delivered an audited 0.8-day reduction in avoidable length of stay and generated $3.2M in annual operational capacity.'
    }
  },
  {
    id: 'sbar-shift-handoffs',
    category: 'workflow',
    title: 'Standardized SBAR Shift Transitions',
    tagline: 'Nurse Continuity & Digital Sign-off',
    shortDescription: 'Structured Situation-Background-Assessment-Recommendation transition packets collating live vitals, pending orders, and digital signature verification for seamless nurse shift changes.',
    iconName: 'sbar',
    highlightMetric: {
      value: '28 mins',
      label: 'Saved per nurse per 12-hour shift',
    },
    featuresList: [
      'Automated extraction of trending vitals, active drips, and pending lab results',
      'Digital signature audit trail with Joint Commission shift transition verification',
      'Context-aware patient acuity tags highlighting high-risk trajectory changes',
      'Cross-unit transfer handoff templates for ICU-to-stepdown floor progression'
    ],
    ehrStandards: 'FHIR Composition & CarePlan Resources • Imprivata Badge Tap-In',
    demoRoute: '/platform',
    deepDiveModal: {
      clinicalPain: 'Floor nurses spend over 40 minutes at shift change manually transcribing informal paper notes, leading to transcription errors, forgotten consult requests, and overtime.',
      workflowSolution: 'CarePulse structures shift transitions using standardized SBAR templates that pull directly from live EHR telemetry with instant digital acknowledgments.',
      auditedOutcome: 'Cut shift transition duration from 42 minutes to 14 minutes and boosted first-year nurse retention by 19%.'
    }
  },
  {
    id: 'discharge-unblocking',
    category: 'workflow',
    title: 'Proactive Discharge Barrier Resolution',
    tagline: 'Throughput & Bed Velocity',
    shortDescription: 'Identify DME authorizations, pharmacy Meds-to-Beds reconciliations, and physical therapy mobility clearances 24 to 48 hours in advance to eliminate afternoon bed gridlock.',
    iconName: 'discharge',
    highlightMetric: {
      value: '1.4 hrs',
      label: 'Earlier daily discharge order placement',
    },
    featuresList: [
      'Automated multidisciplinary barrier checklists shared by physicians, RNs, and social work',
      'Post-acute SNF placement tracking with real-time payer prior-authorization flags',
      'Inpatient pharmacy Meds-to-Beds courier dispatch alerts for bedside delivery',
      'Priority morning discharge turn indicators unlocking telemetry beds before 1:00 PM'
    ],
    ehrStandards: 'FHIR ServiceRequest & CarePlan • HL7 MDM Document Broadcasts',
    demoRoute: '/patient-overview',
    deepDiveModal: {
      clinicalPain: 'Discharge planning happens reactively on the morning of discharge, creating emergency department boarding jams that exceed 4.5 hours as patients wait for prescriptions and rides.',
      workflowSolution: 'CarePulse tracks discharge progression milestones across inpatient days, highlighting pending PT clearances and pharmacy orders 24 to 48 hours prior to target departure.',
      auditedOutcome: 'Shifted median hospital discharge orders from 2:45 PM to 1:05 PM, unlocking critical afternoon emergency department capacity.'
    }
  },
  {
    id: 'intelligent-alarm-triage',
    category: 'workflow',
    title: 'Intelligent Telemetry Triage & Noise Filtering',
    tagline: 'Alarm Fatigue Reduction',
    shortDescription: 'Contextually bundle non-critical telemetry notifications while executing algorithmic escalation cascades when acute physiological deterioration occurs.',
    iconName: 'alert',
    highlightMetric: {
      value: '52%',
      label: 'Drop in non-actionable pager & alarm noise',
    },
    featuresList: [
      'Algorithmic deduplication suppressing repetitive transient pulse-oximeter dips',
      'Intelligent 4-minute escalation cascade routing unacknowledged alerts to charge nurses',
      'Quiet-hours telemetry profiles tailored for recovery wards without compromising patient safety',
      'Integration with Vocera smartbadges and clinical VoIP mobile devices'
    ],
    ehrStandards: 'FHIR Observation & DeviceMetric • Bi-directional Webhook APIs',
    demoRoute: '/platform',
    deepDiveModal: {
      clinicalPain: 'Bedside nurses suffer from severe cognitive alarm fatigue, fielding hundreds of non-actionable false alarms per shift while managing complex patient loads.',
      workflowSolution: 'CarePulse filters baseline telemetry noise through clinical context clustering, ensuring only true physiological deterioration triggers high-priority notifications.',
      auditedOutcome: 'Reduced non-urgent alert noise by 52% and accelerated escalation response time for critical telemetry deterioration by 41%.'
    }
  }
];

export const CoreCapabilitiesGrid: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'coordination' | 'integration' | 'analytics' | 'workflow'>('all');
  const [activeModalCap, setActiveModalCap] = useState<CapabilityFeature | null>(null);
  const navigate = useNavigate();

  const filteredCapabilities = selectedFilter === 'all'
    ? CORE_CAPABILITIES
    : CORE_CAPABILITIES.filter(c => c.category === selectedFilter);

  const filterTabs = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'coordination', label: 'Scheduling & Logistics' },
    { id: 'integration', label: 'EHR Data Integration' },
    { id: 'analytics', label: 'Clinical Analytics' },
    { id: 'workflow', label: 'Floor Workflows & Safety' }
  ];

  const renderIcon = (name: CapabilityFeature['iconName']) => {
    switch (name) {
      case 'calendar':
        return (
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-colors shadow-2xs">
            <CalendarClock className="w-5 h-5" />
          </div>
        );
      case 'database':
        return (
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center shrink-0 group-hover:bg-blue-700 group-hover:text-white transition-colors shadow-2xs">
            <Database className="w-5 h-5" />
          </div>
        );
      case 'analytics':
        return (
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 flex items-center justify-center shrink-0 group-hover:bg-indigo-700 group-hover:text-white transition-colors shadow-2xs">
            <BarChart3 className="w-5 h-5" />
          </div>
        );
      case 'sbar':
        return (
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors shadow-2xs">
            <ClipboardCheck className="w-5 h-5" />
          </div>
        );
      case 'discharge':
        return (
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0 group-hover:bg-amber-700 group-hover:text-white transition-colors shadow-2xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      case 'alert':
        return (
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/80 flex items-center justify-center shrink-0 group-hover:bg-rose-700 group-hover:text-white transition-colors shadow-2xs">
            <BellOff className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <section 
      id="core-capabilities"
      className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200 relative overflow-hidden"
      aria-label="Core Clinical Workflow Capabilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100/70 text-teal-800 border border-teal-200/80 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Engineered for Acute Care Health Systems</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
            Core Capabilities Driving{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600">
              Clinical Workflow Orchestration
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            From automated procedural sequencing and bidirectional EHR data streams to predictive throughput analytics—explore the essential operational building blocks of CarePulse Health OS.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto gap-2 pt-6 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapabilities.map((cap) => (
            <div
              key={cap.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-300 transition-all p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header: Icon, Tagline & Action */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  {renderIcon(cap.iconName)}

                  <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    {cap.tagline}
                  </span>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2 leading-snug">
                  {cap.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {cap.shortDescription}
                </p>

                {/* Quantified Benefit Callout */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">
                      Quantified Floor Impact
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-tight block mt-0.5">
                      {cap.highlightMetric.label}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl font-black text-teal-700 font-mono tabular-nums">
                      {cap.highlightMetric.value}
                    </span>
                  </div>
                </div>

                {/* Key Sub-Features List */}
                <ul className="space-y-2 mb-4 text-xs text-slate-600">
                  {cap.featuresList.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: EHR Standards & Deep Dive Trigger */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => setActiveModalCap(cap)}
                  className="font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span>Inspect Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to={cap.demoRoute}
                  className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
                >
                  Live Sandbox →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sandbox Launch Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-teal-700 text-xs font-semibold">
              <Activity className="w-4 h-4 text-teal-600" />
              <span>Full Health System Demonstration Sandbox</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Test all six capabilities in a simulated inpatient environment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Launch our Ward Command Center simulator to experience live telemetry fluctuation, automated procedural transport queuing, and multidisciplinary discharge barrier unblocking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/patient-overview"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 font-bold text-center transition-colors shadow-xs"
            >
              Launch Patient Overview Grid
            </Link>
            <Link
              to="/demo"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-center transition-colors"
            >
              Request Custom Demo
            </Link>
          </div>
        </div>

      </div>

      {/* Feature Deep Dive Modal */}
      {activeModalCap && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cap-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalCap(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close Capability Inspector"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              {renderIcon(activeModalCap.iconName)}
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                  {activeModalCap.tagline}
                </span>
                <h3 id="cap-modal-title" className="text-xl font-bold text-slate-900 mt-1">
                  {activeModalCap.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {activeModalCap.ehrStandards}
                </p>
              </div>
            </div>

            {/* Quantified Benefit Strip */}
            <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
                  Measured Health System Improvement
                </span>
                <span className="text-xs text-slate-700 mt-0.5 block">
                  {activeModalCap.highlightMetric.label}
                </span>
              </div>
              <div className="text-2xl font-black text-teal-700 font-mono shrink-0 tabular-nums">
                {activeModalCap.highlightMetric.value}
              </div>
            </div>

            {/* Clinical Deep Dive 3-Step Architecture */}
            <div className="space-y-4 text-xs text-slate-700 mb-6">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  1. Operational Baseline & Clinical Friction
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {activeModalCap.deepDiveModal.clinicalPain}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  2. Automated Workflow Re-Engineering
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {activeModalCap.deepDiveModal.workflowSolution}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  3. Quantified Multi-Ward Outcome
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {activeModalCap.deepDiveModal.auditedOutcome}
                </p>
              </div>

              {/* Full Capabilities List */}
              <div className="pt-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Technical Specifications & Sub-Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalCap.featuresList.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalCap(null)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close Summary
              </button>
              <button
                onClick={() => {
                  setActiveModalCap(null);
                  navigate(activeModalCap.demoRoute);
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Launch Interactive Feature in Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
