import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  Key, 
  MessageSquare, 
  Cpu, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { INTEGRATIONS_LIST } from '../data/healthcareData';

interface IntegrationsSectionProps {
  onOpenDemo: () => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ onOpenDemo }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedFhirResource, setSelectedFhirResource] = useState<string>('Encounter');

  const categories = ['All', 'EHR / EMR Platforms', 'Interoperability Standards', 'Identity & SSO', 'Clinical Communications'];

  const filteredIntegrations = activeCategory === 'All'
    ? INTEGRATIONS_LIST
    : INTEGRATIONS_LIST.filter(item => item.category === activeCategory);

  const fhirResourceDetails: Record<string, { desc: string; samplePayload: string; direction: string }> = {
    'Encounter': {
      desc: 'Synchronizes patient admission, unit location transfer (ADT-A02), and hospital service line in real time.',
      direction: 'EHR → CarePulse (Inbound Webhook / Subscription)',
      samplePayload: `{
  "resourceType": "Encounter",
  "id": "enc-98214",
  "status": "in-progress",
  "class": { "code": "IMP", "display": "inpatient encounter" },
  "subject": { "reference": "Patient/PT-88241" },
  "location": [{ "location": { "display": "Telemetry Stepdown 4-West, Bed 408-A" } }]
}`
    },
    'CarePlan': {
      desc: 'Contains multidisciplinary rounding goals, active physical therapy clearance flags, and discharge milestone targets.',
      direction: 'Bidirectional Sync (EHR ↔ CarePulse)',
      samplePayload: `{
  "resourceType": "CarePlan",
  "id": "cp-4401",
  "status": "active",
  "intent": "plan",
  "activity": [
    { "detail": { "code": { "text": "Multidisciplinary daily SBAR rounding" }, "status": "completed" } },
    { "detail": { "code": { "text": "Post-acute DME oxygen authorization" }, "status": "in-progress" } }
  ]
}`
    },
    'Task': {
      desc: 'Tracks closed-loop clinical micro-tasks (stat repeat labs, consult acknowledgments, medication passes) with audited timestamps.',
      direction: 'CarePulse → EHR (Status writeback via SMART API)',
      samplePayload: `{
  "resourceType": "Task",
  "id": "task-7719",
  "status": "completed",
  "intent": "order",
  "code": { "text": "Stat repeat electrolyte draw" },
  "for": { "reference": "Patient/PT-76490" },
  "owner": { "reference": "Practitioner/RN-Morales" },
  "executionPeriod": { "start": "2026-09-21T09:38:00Z", "end": "2026-09-21T09:42:15Z" }
}`
    },
    'Communication': {
      desc: 'Records shift handoff signatures, SBAR notes, and urgent team notifications in the permanent legal audit trail.',
      direction: 'CarePulse → EHR (Clinical document & communication record)',
      samplePayload: `{
  "resourceType": "Communication",
  "id": "comm-332",
  "status": "completed",
  "category": [{ "coding": [{ "code": "clinical-handoff", "display": "SBAR Shift Transition" }] }],
  "sender": { "reference": "Practitioner/RN-Outgoing" },
  "recipient": [{ "reference": "Practitioner/RN-Incoming" }]
}`
    }
  };

  return (
    <section id="integrations" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
            Interoperability & Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Seamless Interoperability with Your Existing Health IT Stack
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            CarePulse connects directly to Epic, Cerner, MEDITECH, and interface engines using certified FHIR R4 and HL7 standards. No rip-and-replace, and zero double-charting.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {filteredIntegrations.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-teal-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded border border-teal-200">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Certified</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-800 block mb-0.5">Capability:</span>
                <span className="line-clamp-2">{item.keyCapability}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive FHIR R4 Resource Mapping Inspector */}
        <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Code2 className="w-5 h-5 text-teal-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Interactive FHIR R4 Standards Resource Explorer
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Inspect how CarePulse bidirectionally maps hospital data models to ensure compliance with ONC Cures Act criteria.
              </p>
            </div>

            {/* FHIR Resource Selector Buttons */}
            <div className="flex flex-wrap gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
              {['Encounter', 'CarePlan', 'Task', 'Communication'].map((res) => (
                <button
                  key={res}
                  onClick={() => setSelectedFhirResource(res)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedFhirResource === res
                      ? 'bg-teal-500 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold text-teal-400 tracking-wider block mb-1">
                  Resource Architecture
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  FHIR R4 {selectedFhirResource} Resource
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {fhirResourceDetails[selectedFhirResource].desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 text-xs">
                <span className="text-slate-400 block font-semibold">Data Flow Direction:</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  {fhirResourceDetails[selectedFhirResource].direction}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-white">EHR Interface Engine Support:</div>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200">Mirth Connect</span>
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200">Cloverleaf</span>
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200">Lyniate Corepoint</span>
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200">Epic Bridges</span>
                </div>
              </div>

              <button
                onClick={onOpenDemo}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Schedule EHR Architecture Review
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <span>fhir-{selectedFhirResource.toLowerCase()}-payload.json</span>
                <span className="text-teal-400">application/fhir+json</span>
              </div>
              <pre className="text-xs text-teal-300 font-mono leading-relaxed overflow-x-auto">
                {fhirResourceDetails[selectedFhirResource].samplePayload}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
