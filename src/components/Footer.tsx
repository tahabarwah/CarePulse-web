import React from 'react';
import { Activity, ShieldCheck, Lock, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenDemo: () => void;
  onOpenDiagnostic: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, onOpenDiagnostic }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">CarePulse Health OS</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The unified clinical operations and care team orchestration platform. Synchronizing shift handoffs, multidisciplinary rounds, and proactive discharge barrier resolution across inpatient and ambulatory health systems.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-teal-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                HIPAA-Ready Architecture
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                SOC 2 Type II Audited
              </span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('benefits')} className="hover:text-white transition-colors cursor-pointer">
                  Product Benefits
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('workflow')} className="hover:text-white transition-colors cursor-pointer">
                  Clinical Pathway
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('integrations')} className="hover:text-white transition-colors cursor-pointer">
                  FHIR R4 & EHR Interop
                </button>
              </li>
              <li>
                <button onClick={onOpenDiagnostic} className="hover:text-teal-400 transition-colors cursor-pointer">
                  AI Workflow Diagnostic
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Role Solutions */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('roles')} className="hover:text-white transition-colors cursor-pointer">
                  Physicians & CMIOs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('roles')} className="hover:text-white transition-colors cursor-pointer">
                  Nursing Leadership & CNOs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('roles')} className="hover:text-white transition-colors cursor-pointer">
                  Hospital Operations & COOs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('roles')} className="hover:text-white transition-colors cursor-pointer">
                  Health IT & CISOs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('roles')} className="hover:text-white transition-colors cursor-pointer">
                  Care Coordinators
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Governance */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Governance</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('security')} className="hover:text-white transition-colors cursor-pointer">
                  Security Architecture
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('security')} className="hover:text-white transition-colors cursor-pointer">
                  Business Associate Agreement (BAA)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faqs')} className="hover:text-white transition-colors cursor-pointer">
                  Compliance FAQs
                </button>
              </li>
              <li>
                <button onClick={onOpenDemo} className="hover:text-white transition-colors cursor-pointer">
                  Request Security Packet
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Scope Disclaimers */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] leading-relaxed text-slate-400 mb-8 space-y-1.5">
          <p>
            <strong>Regulatory & Clinical Disclaimer:</strong> CarePulse is an operational workflow and administrative care coordination software platform. CarePulse is not a diagnostic medical device, does not provide autonomous clinical diagnoses or medical advice, and is not a substitute for the professional clinical judgment of licensed physicians, nurses, or allied health professionals.
          </p>
          <p>
            <strong>Healthcare Compliance Statement:</strong> CarePulse provides HIPAA-ready technical safeguards (AES-256 encryption at rest, TLS 1.3 in transit, role-based access control, and immutable audit logs) and executes comprehensive Business Associate Agreements (BAAs) with covered entities and business associates prior to processing any Protected Health Information (PHI). We do not claim universal third-party certification of individual hospital customer compliance; covered entities remain responsible for their internal policies and procedures.
          </p>
          <p>
            <strong>Trademark Notices:</strong> Epic, Hyperspace, Rover, and MyChart are registered trademarks of Epic Systems Corporation. Cerner, Millennium, and PowerChart are trademarks of Oracle Corporation. MEDITECH is a trademark of Medical Information Technology, Inc. Athenahealth is a trademark of Athenahealth, Inc. References to third-party software are strictly for descriptive interoperability identification purposes.
          </p>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CarePulse Health Systems, Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              All Systems Operational (99.98% SLA)
            </span>
            <span>•</span>
            <a href="#security" onClick={(e) => { e.preventDefault(); scrollTo('security'); }} className="hover:text-slate-300">
              Security Notice
            </a>
            <span>•</span>
            <a href="#demo" onClick={(e) => { e.preventDefault(); scrollTo('demo'); }} className="hover:text-slate-300">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
