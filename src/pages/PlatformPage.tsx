import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { ClinicalWorkflow } from '../components/ClinicalWorkflow';
import { PatientPortalPreview } from '../components/PatientPortalPreview';
import { ProductBenefits } from '../components/ProductBenefits';
import { 
  Activity, 
  ArrowRight, 
  Layers, 
  Smartphone, 
  CheckCircle2, 
  FileCode, 
  Zap, 
  ShieldCheck,
  Stethoscope,
  Clock
} from 'lucide-react';

export const PlatformPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Page Header with Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'Platform & Clinical Pathway' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              CarePulse Health OS Architecture
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The Unified Clinical Operations & Care Pathway Platform
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Designed in collaboration with bedside nurses, hospitalists, and hospital executives. Orchestrating shift handoffs, multidisciplinary rounds, real-time closed-loop tasking, and proactive discharge barrier resolution across inpatient wards.
            </p>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium">
            <a
              href="#workflow"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 transition-colors"
            >
              1. Inpatient Clinical Pathway
            </a>
            <a
              href="#patient-portal"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 transition-colors"
            >
              2. Bedside Patient Portal
            </a>
            <a
              href="#benefits"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 transition-colors"
            >
              3. Operational Capabilities
            </a>
            <a
              href="#architecture"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 transition-colors"
            >
              4. System Architecture
            </a>
          </div>
        </div>
      </div>

      {/* Section 1: Inpatient Clinical Workflow */}
      <ClinicalWorkflow onOpenDemo={() => navigate('/demo')} />

      {/* Section 2: Bedside Patient Portal & Care Timeline */}
      <PatientPortalPreview onOpenDemo={() => navigate('/demo')} />

      {/* Section 3: Core Operational Capabilities */}
      <ProductBenefits
        onOpenDemo={() => navigate('/demo')}
        onOpenDiagnostic={() => navigate('/diagnostic')}
      />

      {/* Section 4: System Architecture & Technical Specifications */}
      <section id="architecture" className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
              Technical Infrastructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              SMART on FHIR Microservices & Zero-Interruption Architecture
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              CarePulse operates as a synchronized operational layer on top of your EHR of record. Frontline teams access CarePulse via native Hyperspace/Rover tabs, mobile web, or in-room displays without double-charting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-teal-950 text-teal-400 border border-teal-800/80 flex items-center justify-center mb-4">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                SMART on FHIR R4 Ingestion
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Bi-directional subscriptions to Encounter, Task, CarePlan, and Communication resources. Changes in EHR automatically update the ward census.
              </p>
              <div className="text-[11px] text-teal-400 font-mono">
                OAuth 2.0 / SAML 2.0 Single Sign-On
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-teal-950 text-teal-400 border border-teal-800/80 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Sub-Second Event Streaming
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                High-concurrency WebSocket channels distribute vital sign alerts, pending stat lab flags, and task completions to bedside tablets instantly.
              </p>
              <div className="text-[11px] text-teal-400 font-mono">
                &lt;150ms Telemetry Distribution
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-teal-950 text-teal-400 border border-teal-800/80 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Cryptographic Tenant Isolation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Dedicated database encryption keys per health system with AES-256 at rest, TLS 1.3 in transit, and immutable access logging.
              </p>
              <div className="text-[11px] text-teal-400 font-mono">
                SOC 2 Type II & HIPAA Aligned
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-teal-950/60 border border-teal-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-semibold text-white">
                Interested in testing CarePulse in your clinical sandbox?
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                We provide pre-configured Epic on FHIR and Cerner test tenants for clinical informatics teams.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/integrations"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 border border-slate-700"
              >
                EHR Specs
              </Link>
              <button
                onClick={() => navigate('/demo')}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold"
              >
                Request Sandbox Access
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
