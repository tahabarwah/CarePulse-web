import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { IntegrationsSection } from '../components/IntegrationsSection';
import { Layers, Database, ArrowRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'EHR Integrations & Standards' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              SMART on FHIR R4 Ecosystem
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              EHR Ecosystem & Standards Interoperability
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              CarePulse connects directly into your existing enterprise electronic health record system via open FHIR R4 APIs and HL7 standards. No double-charting, no data siloing, and zero workflow interruption.
            </p>
          </div>
        </div>
      </div>

      {/* Main Integrations Section with Live JSON Payload Explorer */}
      <IntegrationsSection onOpenDemo={() => navigate('/demo')} />

      {/* Additional Architecture & API Sandbox Details */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              Enterprise Deployment
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Supported Deployment Models & Connectivity
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              CarePulse supports multi-tenant private cloud, dedicated VPC peering, and on-premises gateway agents for strict intranet health system environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">SMART on FHIR Native Apps</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Appears inside Epic Hyperspace activity tabs, Epic Rover mobile barcoding workflows, and Cerner PowerChart organizer views via single sign-on.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">HL7 v2 ADT & SIU Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingests real-time ADT messages (A01 Admission, A02 Transfer, A03 Discharge, A08 Update) via MLLP or encrypted VPN tunnels for legacy interface engines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Bidirectional Task Sync</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Care team assignments and discharge milestones sync back to EHR Worklists, ensuring complete auditability and medico-legal documentation compliance.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Need EHR Integration Specifications for Your IT Security Committee?
              </h3>
              <p className="text-xs text-slate-600 max-w-xl">
                Download our FHIR Resource Data Dictionary, network architecture diagrams, and interface engine compatibility guides.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/security"
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              >
                Security & BAA
              </Link>
              <button
                onClick={() => navigate('/demo')}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-colors shadow-sm"
              >
                Request IT Packet
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
