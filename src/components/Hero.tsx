import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Activity, 
  AlertTriangle, 
  Check, 
  Users, 
  FileText, 
  Bed, 
  ChevronRight, 
  Lock,
  Stethoscope
} from 'lucide-react';
import { HERO_METRICS, TRUSTED_INSTITUTIONS } from '../data/healthcareData';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenDiagnostic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenDiagnostic }) => {
  const [activeBoardTab, setActiveBoardTab] = useState<'rounds' | 'handoff' | 'discharge'>('rounds');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pt-1');
  const [acknowledgedTasks, setAcknowledgedTasks] = useState<Record<string, boolean>>({ 'task-1': true });

  const toggleTask = (taskId: string) => {
    setAcknowledgedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const samplePatients = [
    {
      id: 'pt-1',
      room: 'Bed 408-A',
      name: 'James K., 64M',
      diagnosis: 'CHF Exacerbation (Acuity: Moderate)',
      attending: 'Dr. Rivera (Hospitalist)',
      primaryRN: 'J. Morales, RN',
      sbar: {
        s: 'Dyspnea improving on IV furosemide; O2 sat 95% on room air.',
        b: 'Admitted 48h ago via ED; baseline EF 35%. Home meds held.',
        a: 'Urine output adequate (>1.5L/24h), trending BMP pending.',
        r: 'Repeat morning BMP, verify echo report, evaluate transition to oral torsemide.'
      },
      milestone: 'Multidisciplinary Round Completed',
      dischargeBlocker: 'Home O2 delivery confirmation & DME auth',
      targetDischarge: 'Tomorrow, 11:00 AM',
      tasks: [
        { id: 'task-1', text: 'Verify post-diuretic electrolyte panel (BMP)', assignedTo: 'Floor RN', urgent: true },
        { id: 'task-2', text: 'Social Work DME vendor order sign-off', assignedTo: 'Case Mgmt', urgent: false },
      ]
    },
    {
      id: 'pt-2',
      room: 'Bed 410-B',
      name: 'Maria L., 42F',
      diagnosis: 'Post-Op Lap Cholecystectomy (Acuity: Stable)',
      attending: 'Dr. Sterling (General Surg)',
      primaryRN: 'S. Cooper, BSN',
      sbar: {
        s: 'Pain controlled on oral analgesics (VAS 2/10). Tolerating clear liquids.',
        b: 'POD 1 uncomplicated laparoscopic cholecystectomy.',
        a: 'Incisional sites clean/dry/intact; ambulating independently.',
        r: 'Advance diet to regular, discharge packet sign-off, Meds-to-Beds delivery.'
      },
      milestone: 'Discharge Readiness Checklist: 4/5 Complete',
      dischargeBlocker: 'Final pharmacy discharge reconciliation',
      targetDischarge: 'Today, 13:30 PM (Priority Turn)',
      tasks: [
        { id: 'task-3', text: 'Discharge prescriptions bedside delivery (Meds-to-Beds)', assignedTo: 'Pharmacy Tech', urgent: true },
        { id: 'task-4', text: 'Confirm adult ride home and discharge instructions', assignedTo: 'Primary RN', urgent: false },
      ]
    },
    {
      id: 'pt-3',
      room: 'Bed 414',
      name: 'David W., 71M',
      diagnosis: 'CAP & COPD Exacerbation (Acuity: High)',
      attending: 'Dr. Patel (Pulmonology)',
      primaryRN: 'M. Reynolds, RN',
      sbar: {
        s: 'Wheezing decreased with Duoneb q4h; productive cough improving.',
        b: 'Severe COPD on home 2L nasal cannula; admitted for CAP.',
        a: 'Afebrile 24 hours; WBC count down to 10.4 from 16.2.',
        r: 'Physical therapy mobility clearance required prior to stepdown.'
      },
      milestone: 'Pending PT Mobility Evaluation',
      dischargeBlocker: 'Inpatient PT mobility clearance pending shift review',
      targetDischarge: 'In 2 days, 10:00 AM',
      tasks: [
        { id: 'task-5', text: 'Stat consult call to Physical Therapy lead', assignedTo: 'Charge RN', urgent: true },
      ]
    }
  ];

  const currentPatient = samplePatients.find(p => p.id === selectedPatientId) || samplePatients[0];

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-teal-700" />
            B2B Clinical Operations Platform
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            Designed for Regulated Healthcare Environments
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Unified Care Coordination &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
              Clinical Workflow
            </span>{' '}
            Orchestration
          </h1>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Eliminate fragmented verbal handoffs, synchronize daily multidisciplinary rounds, and proactively unblock discharge barriers. Built for high-velocity acute care teams and health systems—integrating directly with Epic, Cerner, and MEDITECH.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-btn-request-demo"
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-all shadow-md shadow-teal-700/25 cursor-pointer"
            >
              Request a Health System Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-btn-run-diagnostic"
              onClick={onOpenDiagnostic}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-teal-900 bg-white border border-teal-200 hover:bg-teal-50 active:bg-teal-100 transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              AI Clinical Workflow Diagnostic
            </button>
          </div>

          {/* Compliance Safeguards Micro-Proof */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              Executable BAA for Covered Entities
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              SOC 2 Type II Audited & HITRUST Aligned
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              Zero PHI Training on Foundation Models
            </span>
          </div>
        </div>

        {/* Live Interactive Care Board Simulator */}
        <div className="mt-8 lg:mt-12 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          {/* Simulated App Header Bar */}
          <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-wide">Telemetry Stepdown 4-West</span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Unit Census: 28/30 Beds
                </span>
                <span className="hidden sm:inline-flex text-[11px] text-teal-400 items-center gap-1">
                  <Lock className="w-3 h-3" />
                  TLS 1.3 FHIR R4 Real-Time Feed
                </span>
              </div>
            </div>

            {/* Interactive Board View Switcher */}
            <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setActiveBoardTab('rounds')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeBoardTab === 'rounds' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Multidisciplinary Rounds
              </button>
              <button
                onClick={() => setActiveBoardTab('handoff')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeBoardTab === 'handoff' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                SBAR Shift Handoff
              </button>
              <button
                onClick={() => setActiveBoardTab('discharge')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeBoardTab === 'discharge' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Discharge Pathway
              </button>
            </div>
          </div>

          {/* Simulator Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Column: Patient List */}
            <div className="lg:col-span-4 p-4 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span>Active Assigned Patients</span>
                <span className="text-teal-700 font-medium">Click to inspect</span>
              </div>

              {samplePatients.map((patient) => {
                const isSelected = patient.id === selectedPatientId;
                return (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatientId(patient.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-teal-600 shadow-md ring-1 ring-teal-600'
                        : 'bg-white hover:bg-slate-100/70 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-slate-500" />
                        {patient.room}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          patient.diagnosis.includes('High')
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : patient.diagnosis.includes('Moderate')
                            ? 'bg-teal-100 text-teal-800 border border-teal-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {patient.diagnosis.includes('High') ? 'High Acuity' : patient.diagnosis.includes('Moderate') ? 'Moderate' : 'Stable'}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">{patient.name}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{patient.diagnosis.split(' (')[0]}</div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate max-w-[150px]">{patient.attending}</span>
                      <span className="text-teal-700 font-medium flex items-center gap-0.5">
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Patient Operations Workspace */}
            <div className="lg:col-span-8 p-5 sm:p-6 bg-white flex flex-col justify-between space-y-6">
              {/* Patient Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{currentPatient.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {currentPatient.room}
                    </span>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      FHIR Synchronized
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                    <span><strong>Diagnosis:</strong> {currentPatient.diagnosis}</span>
                    <span>•</span>
                    <span><strong>Attending:</strong> {currentPatient.attending}</span>
                    <span>•</span>
                    <span><strong>Primary RN:</strong> {currentPatient.primaryRN}</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-500">Target Discharge</div>
                  <div className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                    {currentPatient.targetDischarge}
                  </div>
                </div>
              </div>

              {/* View Tab Switch Content */}
              {activeBoardTab === 'rounds' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-teal-700" />
                        Today's Multidisciplinary Rounding Plan
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {currentPatient.milestone}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <span className="font-semibold text-slate-800 block mb-1">Clinical Goal for Shift:</span>
                        <p className="text-slate-600 leading-relaxed">
                          Verify response to diuresis, check orthostatic vitals, and coordinate physical therapy safety stair assessment.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <span className="font-semibold text-slate-800 block mb-1 text-amber-800 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Identified Discharge Blocker:
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {currentPatient.dischargeBlocker}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Closed-Loop Task List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Closed-Loop Tasks ({currentPatient.tasks.length})
                      </span>
                      <span className="text-[11px] text-slate-500">Click checkmark to acknowledge & timestamp</span>
                    </div>

                    <div className="space-y-2">
                      {currentPatient.tasks.map((task) => {
                        const isDone = !!acknowledgedTasks[task.id];
                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`p-3 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                              isDone
                                ? 'bg-emerald-50/60 border-emerald-300 text-slate-700'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-2xs'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center text-xs transition-colors ${
                                  isDone
                                    ? 'bg-emerald-600 text-white'
                                    : 'border border-slate-300 hover:border-teal-600'
                                }`}
                              >
                                {isDone && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <div className={`text-xs font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                  {task.text}
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                  <span>Assigned: <strong>{task.assignedTo}</strong></span>
                                  {task.urgent && (
                                    <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
                                      STAT
                                    </span>
                                  )}
                                  {isDone && (
                                    <span className="text-[10px] text-emerald-700 font-semibold">
                                      • Audited at 09:42 UTC
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <span className="text-xs font-medium text-slate-400">
                              {isDone ? 'Acknowledged' : 'Pending'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeBoardTab === 'handoff' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-teal-700" />
                      Structured SBAR Shift Handoff Packet
                    </span>
                    <span className="text-[11px] text-slate-500">Auto-populated from EHR & Vitals Stream</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="font-bold text-teal-800 mb-1">S — Situation</div>
                      <p className="text-slate-700 leading-relaxed">{currentPatient.sbar.s}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="font-bold text-teal-800 mb-1">B — Background</div>
                      <p className="text-slate-700 leading-relaxed">{currentPatient.sbar.b}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="font-bold text-teal-800 mb-1">A — Assessment</div>
                      <p className="text-slate-700 leading-relaxed">{currentPatient.sbar.a}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="font-bold text-teal-800 mb-1">R — Recommendation</div>
                      <p className="text-slate-700 leading-relaxed">{currentPatient.sbar.r}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-teal-50/70 border border-teal-200 flex items-center justify-between text-xs">
                    <span className="text-teal-900 font-medium">
                      Signed off by incoming RN: <strong>{currentPatient.primaryRN}</strong> (Dual digital verification recorded)
                    </span>
                    <span className="text-[11px] font-semibold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
                      Zero Paper Handoff
                    </span>
                  </div>
                </div>
              )}

              {activeBoardTab === 'discharge' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-700" />
                      Multi-Stakeholder Discharge Checklist
                    </span>
                    <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Target: {currentPatient.targetDischarge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-emerald-50/50 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Attending Physician Discharge Order Signed in EHR
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700">Completed 08:30</span>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 bg-emerald-50/50 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Inpatient Physical Therapy Mobility Safety Clearance
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700">Cleared Yesterday</span>
                    </div>

                    <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium text-slate-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Post-Acute DME / Oxygen Delivery Coordination
                      </span>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        Action Required by Case Mgmt
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium text-slate-800">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Meds-to-Beds Outpatient Prescriptions Delivery
                      </span>
                      <span className="text-[11px] text-slate-500">Scheduled for 10:45</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Bar */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Epic Hyperspace Connected • OAuth 2.0 Bearer Active</span>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Schedule Live Health System Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Metrics Proof Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HERO_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-200 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-800 tracking-tight">{metric.value}</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{metric.label}</div>
              <div className="mt-1 text-xs text-slate-500">{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* Institutional Trust Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5">
            Architected for High-Reliability Healthcare Networks & Academic Medical Centers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70">
            {TRUSTED_INSTITUTIONS.map((inst, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-sm font-bold text-slate-700 tracking-tight">{inst.name}</span>
                <span className="text-[11px] text-slate-400">{inst.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
