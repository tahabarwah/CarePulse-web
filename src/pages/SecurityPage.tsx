import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { SecurityCompliance } from '../components/SecurityCompliance';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Key, 
  Database, 
  Server, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  FileText
} from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'Security & Governance' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              HIPAA-Ready Architecture & SOC 2 Audited
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Enterprise Security, Governance & Trust
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Healthcare data demands zero compromises. CarePulse provides defense-in-depth technical safeguards, signs standard Business Associate Agreements (BAAs), and enforces a strict zero-model-training policy on patient health information.
            </p>
          </div>
        </div>
      </div>

      {/* Security Compliance Interactive Component */}
      <SecurityCompliance onOpenDemo={() => navigate('/demo')} />

      {/* Core Governance Pillars */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              Healthcare Compliance Standards
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Safeguards Aligned with HITECH, HIPAA, and HITRUST
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              We treat Protected Health Information (PHI) with rigorous isolation controls. Every request is verified against active clinician credentials and unit assignments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                Zero AI Training on PHI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patient records and clinical notes are never used for public or private LLM model training. All AI diagnostic queries operate in stateless zero-retention mode.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                Executable BAA
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard Business Associate Agreements executed prior to onboarding. Custom health system addenda supported for academic medical centers.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                Granular RBAC & MFA
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Role-Based Access Control mapped to hospital Active Directory via SAML 2.0 / Okta / Azure AD. Enforces Minimum Necessary access principles.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                Immutable Audit Trails
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tamper-evident logs record every patient view, handoff sign-off, and order modification for compliance audits and legal discovery.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-slate-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Request Our Complete CISO & Security Packet
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Includes SOC 2 Type II summary, HIPAA Technical Safeguard Matrix, Penetration Test executive summary, and sample Business Associate Agreement (BAA).
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('/demo')}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold transition-colors shadow-sm"
              >
                Request Security Packet
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
