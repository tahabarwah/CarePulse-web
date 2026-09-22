import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Key, 
  Database, 
  Server, 
  AlertCircle, 
  Check, 
  Download, 
  ArrowRight,
  FileText
} from 'lucide-react';
import { SECURITY_CONTROLS } from '../data/healthcareData';

interface SecurityComplianceProps {
  onOpenDemo: () => void;
}

export const SecurityCompliance: React.FC<SecurityComplianceProps> = ({ onOpenDemo }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showPacketModal, setShowPacketModal] = useState<boolean>(false);

  const categories = ['All', 'Technical Safeguards', 'Access & Identity Governance', 'Compliance Readiness', 'Data Segregation & Privacy'];

  const filteredControls = activeCategory === 'All'
    ? SECURITY_CONTROLS
    : SECURITY_CONTROLS.filter(c => c.category === activeCategory);

  return (
    <section id="security" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow & subtle matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-950 text-teal-400 border border-teal-800 mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Rigorous Healthcare Security Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Security & Governance Built for Regulated Healthcare Networks
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Enterprise health systems cannot compromise on data privacy. We provide verified technical safeguards, executable Business Associate Agreements (BAAs), and transparent auditability.
          </p>
        </div>

        {/* Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <Lock className="w-6 h-6 text-teal-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Cryptographic Safeguards</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              AES-256 at rest, TLS 1.3 in transit with Perfect Forward Secrecy. Optional Customer-Managed Encryption Keys (CMEK).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <Key className="w-6 h-6 text-teal-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Identity & RBAC</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enforced HIPAA Minimum Necessary rule, Imprivata proximity tap-in, and SAML 2.0 / SCIM with Okta and Microsoft Entra ID.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <FileCheck className="w-6 h-6 text-teal-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Audited Compliance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Annual SOC 2 Type II examination by an independent CPA firm. Controls mapped systematically to HITRUST CSF specifications.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <Database className="w-6 h-6 text-teal-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Zero PHI Model Training</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Customer data is logically or physically isolated in dedicated VPCs. PHI is never used to train generalized foundation models.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {filteredControls.map((control, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-slate-600 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                    {control.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600">
                    {control.supportedStatus}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{control.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{control.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-700/70 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Standard: <strong>{control.specification}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Regulatory & Scope Disclaimer Box */}
        <div className="p-5 rounded-xl bg-slate-800/90 border border-amber-500/40 text-amber-200/90 text-xs leading-relaxed mb-10 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block mb-1">Regulatory & Clinical Scope Notice:</strong>
            CarePulse is an enterprise healthcare administrative and clinical workflow orchestration tool designed to streamline communications, task handoffs, and multidisciplinary coordination. CarePulse is not a diagnostic medical device and does not furnish medical diagnoses, clinical treatment determinations, or direct patient care. HIPAA Business Associate Agreements (BAAs) are executed directly between CarePulse and covered entities prior to production data exchange.
          </div>
        </div>

        {/* Security Packet CTA Banner */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 border border-teal-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Need a Security & Compliance Review Packet for your CISO or InfoSec Team?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Includes our standard BAA template, SOC 2 Type II executive summary, penetration test attestation letter, and HITRUST CSF control mapping workbook.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowPacketModal(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg text-slate-900 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Preview Security Packet
            </button>
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg text-white bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
            >
              Talk to Compliance Lead
            </button>
          </div>
        </div>
      </div>

      {/* Security Packet Preview Modal */}
      {showPacketModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold">CarePulse Security Architecture Packet</h3>
              </div>
              <button
                onClick={() => setShowPacketModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Our Security & Compliance Packet is compiled for health system IT security committees, privacy officers, and procurement teams.
            </p>

            <div className="space-y-2 text-xs bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between text-slate-200">
                <span>1. Standard HIPAA BAA Mutual Execution Agreement</span>
                <span className="text-teal-400">PDF • 14 pgs</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>2. AICPA SOC 2 Type II Independent Attestation Summary</span>
                <span className="text-teal-400">PDF • Under NDA</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>3. HITRUST CSF v9.4 Control Mapping Matrix</span>
                <span className="text-teal-400">XLSX • 182 Controls</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>4. Annual Third-Party Penetration Test Executive Summary</span>
                <span className="text-teal-400">PDF • Current Year</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>5. Disaster Recovery (DR) & RTO/RPO Architecture Spec</span>
                <span className="text-teal-400">PDF • 99.98% SLA</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              Complete the Request a Demo form to execute an automated NDA and receive instantaneous access to our full security room.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPacketModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowPacketModal(false);
                  onOpenDemo();
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-1.5"
              >
                Request Access via Demo Form <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
