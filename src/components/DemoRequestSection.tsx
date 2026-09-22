import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Mail, 
  User, 
  Check, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { DemoFormData } from '../types';

interface DemoRequestSectionProps {
  initialNotes?: string;
}

export const DemoRequestSection: React.FC<DemoRequestSectionProps> = ({ initialNotes }) => {
  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    workEmail: '',
    jobTitle: '',
    organizationName: '',
    orgType: 'Regional Hospital (150-400 Beds)',
    ehrSystem: 'Epic Systems',
    clinicianCount: '250-500 Clinicians',
    primaryChallenge: 'Standardizing shift handoffs and resolving discharge barriers',
    preferredDate: '',
    preferredTime: '14:00 EST',
    notes: initialNotes || '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    // Simple email domain check
    if (formData.workEmail.includes('@gmail.com') || formData.workEmail.includes('@yahoo.com') || formData.workEmail.includes('@hotmail.com')) {
      // Show polite notice recommending organization email
    }

    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit demo request.');
      }

      setSubmissionSuccess(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error booking demo session.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & What to Expect */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
              <Calendar className="w-3.5 h-3.5 text-teal-700" />
              Tailored Clinical Walkthrough
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Request a Guided Demo for Your Clinical & IT Leadership
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Experience CarePulse mapped to your specific inpatient service lines, hospital capacity thresholds, and EHR configuration.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 text-teal-700 font-bold text-xs">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Custom EHR Interoperability Review</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    We evaluate your specific Epic, Cerner, or MEDITECH interface setup and verify standard FHIR R4 connectivity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 text-teal-700 font-bold text-xs">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Live Clinical Floor Simulation</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Watch a simulated multi-unit shift handoff with SBAR packets, closed-loop tasking, and early discharge barrier resolution.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 text-teal-700 font-bold text-xs">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Security & BAA Execution Path</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Direct access to our mutual BAA template, SOC 2 Type II report, and dedicated VPC architecture options.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust box */}
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-teal-700 shrink-0" />
              <span>
                <strong>Confidentiality Guaranteed:</strong> We execute mutual NDAs upon request before evaluating institutional clinical workflows or integration topologies.
              </span>
            </div>
          </div>

          {/* Right Column: Form or Success Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            {submissionSuccess ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Demo Scheduled Successfully
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Thank You, {submissionSuccess.details.fullName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                    We have reserved your session for <strong>{submissionSuccess.details.preferredDate}</strong> at <strong>{submissionSuccess.details.preferredTime}</strong>.
                  </p>
                </div>

                {/* Assigned Specialist Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Assigned Clinical Lead:</span>
                    <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {submissionSuccess.details.id}
                    </span>
                  </div>
                  <div className="text-slate-700 font-semibold">{submissionSuccess.assignedSpecialist.name}</div>
                  <div className="text-slate-500">{submissionSuccess.assignedSpecialist.title}</div>
                  <div className="text-teal-700">{submissionSuccess.assignedSpecialist.email}</div>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-teal-900 text-left max-w-md mx-auto space-y-1">
                  <span className="font-bold block">Next Steps:</span>
                  <div>• A calendar invite with secure screen-share coordinates has been dispatched to <strong>{submissionSuccess.details.workEmail}</strong>.</div>
                  <div>• You will receive our BAA and SOC 2 Type II compliance packet 24 hours prior to the demonstration.</div>
                </div>

                <button
                  onClick={() => setSubmissionSuccess(null)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4 cursor-pointer pt-2"
                >
                  Submit another inquiry or update details
                </button>
              </div>
            ) : (
              <div>
                <div className="border-b border-slate-200 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Schedule an Enterprise Demo</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect with a clinical solutions architect to see CarePulse in action.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Dr. Jordan Lee"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Institutional Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="j.lee@healthsystem.org"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Clinical or Administrative Role
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder="e.g. CMIO, CNO, Director of Nursing"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Organization / Health System Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        placeholder="e.g. Cascade Health Network"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Organization Type
                      </label>
                      <select
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                      >
                        <option>Regional Hospital (150-400 Beds)</option>
                        <option>Academic Medical Center (500+ Beds)</option>
                        <option>Integrated Delivery Network (IDN)</option>
                        <option>Ambulatory Surgical Center Network</option>
                        <option>Specialty / Pediatric Hospital</option>
                        <option>Post-Acute / Rehabilitation Network</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Primary EHR System
                      </label>
                      <select
                        value={formData.ehrSystem}
                        onChange={(e) => setFormData({ ...formData, ehrSystem: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                      >
                        <option>Epic Systems (Hyperspace / Rover)</option>
                        <option>Oracle Cerner Millennium</option>
                        <option>MEDITECH Expanse</option>
                        <option>Athenahealth</option>
                        <option>NextGen Healthcare</option>
                        <option>Other / Interface Engine</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Estimated Clinician Scale
                      </label>
                      <select
                        value={formData.clinicianCount}
                        onChange={(e) => setFormData({ ...formData, clinicianCount: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                      >
                        <option>Under 100 Clinicians</option>
                        <option>100 - 250 Clinicians</option>
                        <option>250 - 500 Clinicians</option>
                        <option>500 - 1,000 Clinicians</option>
                        <option>1,000+ Clinicians (Enterprise Network)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Primary Clinical Priority
                      </label>
                      <select
                        value={formData.primaryChallenge}
                        onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                      >
                        <option>Shift handoff communication gaps & lost notes</option>
                        <option>Afternoon discharge gridlock & bed turnover</option>
                        <option>Multidisciplinary rounding coordination</option>
                        <option>Nurse alarm fatigue & critical task routing</option>
                        <option>Inter-facility transfer center orchestration</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Preferred Demo Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                      >
                        <option>10:00 AM EST (Morning)</option>
                        <option>11:30 AM EST (Morning)</option>
                        <option>14:00 PM EST (Afternoon)</option>
                        <option>15:30 PM EST (Afternoon)</option>
                        <option>17:00 PM EST (Late Afternoon)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Specific Inquiries or Focus Service Lines (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Focus on Med-Surg stepdowns, telemetry units, or ED boarding decompression."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-700/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Registering Demo Session...
                        </>
                      ) : (
                        <>
                          Confirm & Schedule Enterprise Demo
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    By submitting, you consent to receive demo confirmation details. We strictly uphold our privacy standards and never sell institutional contact information.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
