import React, { useState, useEffect } from 'react';
import { CommandCenterPatient } from '../../data/commandCenterData';
import { 
  X, 
  User, 
  Activity, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Heart, 
  Plus, 
  Send, 
  Check, 
  MessageSquare,
  FileCheck
} from 'lucide-react';

interface PatientDetailDrawerProps {
  patient: CommandCenterPatient | null;
  onClose: () => void;
  onAcknowledgeAlert: (patientId: string, alertId: string) => void;
  onToggleChecklistItem: (patientId: string, itemKey: string) => void;
  onToggleTransport: (patientId: string, procedureId: string) => void;
}

export const PatientDetailDrawer: React.FC<PatientDetailDrawerProps> = ({
  patient,
  onClose,
  onAcknowledgeAlert,
  onToggleChecklistItem,
  onToggleTransport,
}) => {
  const [activeTab, setActiveTab] = useState<'sbar' | 'procedure' | 'alerts' | 'discharge'>('sbar');
  const [newNote, setNewNote] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState<Array<{ id: string; author: string; role: string; text: string; time: string }>>([
    {
      id: 'note-1',
      author: 'J. Morales, RN',
      role: 'Primary Bedside RN',
      text: 'Morning lab results reviewed with attending. Urine output adequate. Oral fluid restriction maintained at 1.5L/24h.',
      time: '09:15',
    },
    {
      id: 'note-2',
      author: 'Dr. Rivera, MD',
      role: 'Attending Hospitalist',
      text: 'Cardiac consult placed for post-TEE review. If EF preserved >40%, initiate guideline-directed medical therapy.',
      time: '08:30',
    }
  ]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!patient) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const note = {
      id: 'note-' + Date.now(),
      author: 'Clinical Lead',
      role: 'Command Center Coordinator',
      text: newNote.trim(),
      time: 'Just now',
    };
    setClinicalNotes(prev => [note, ...prev]);
    setNewNote('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="slideover-title"
    >
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-teal-950 text-teal-400 border border-teal-800/80 px-2 py-0.5 rounded">
                {patient.room}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {patient.mrn}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-300">
                Admitted {patient.admissionDate} (LOS {patient.losDays}d)
              </span>
            </div>
            <h2 id="slideover-title" className="text-xl font-bold text-white flex items-center gap-2">
              {patient.name}, {patient.age}{patient.gender}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {patient.diagnosis}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vital Telemetry Banner */}
        <div className="bg-slate-800 text-slate-200 px-6 py-3 border-b border-slate-700 flex items-center justify-between text-xs font-mono tabular-nums">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Heart Rate</span>
              <span className="text-sm font-bold text-white">{patient.vitals.heartRate} bpm</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Blood Pressure</span>
              <span className="text-sm font-bold text-white">{patient.vitals.bloodPressure}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">SpO2 Oxygen</span>
              <span className={`text-sm font-bold ${patient.vitals.spo2 < 93 ? 'text-red-400' : 'text-emerald-400'}`}>
                {patient.vitals.spo2}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Resp Rate</span>
              <span className="text-sm font-bold text-white">{patient.vitals.respiratoryRate}/min</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Temp</span>
              <span className="text-sm font-bold text-white">{patient.vitals.temperature}°C</span>
            </div>
          </div>
          <div className="text-[11px] text-teal-400 font-sans">
            Telemetry Stream Active
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab('sbar')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'sbar'
                ? 'border-teal-700 text-teal-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            SBAR Clinical Handoff
          </button>

          <button
            onClick={() => setActiveTab('procedure')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'procedure'
                ? 'border-teal-700 text-teal-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Procedure & Pre-Op
            {patient.upcomingProcedure && (
              <span className="w-2 h-2 rounded-full bg-teal-600 ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'alerts'
                ? 'border-teal-700 text-teal-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Triage Alerts ({patient.triageAlerts.length})
          </button>

          <button
            onClick={() => setActiveTab('discharge')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'discharge'
                ? 'border-teal-700 text-teal-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Discharge Pathway
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: SBAR */}
          {activeTab === 'sbar' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
                  Situation
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {patient.recentHandoffSbar.situation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
                  Background
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {patient.recentHandoffSbar.background}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
                  Assessment
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {patient.recentHandoffSbar.assessment}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200">
                <div className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-1">
                  Recommendation & Next Steps
                </div>
                <p className="text-sm text-slate-900 font-medium leading-relaxed">
                  {patient.recentHandoffSbar.recommendation}
                </p>
              </div>

              {/* Care Team */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Assigned Multidisciplinary Team
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-[10px] text-slate-600 block">Attending Physician</span>
                    <strong className="text-slate-900">{patient.attendingPhysician}</strong>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-[10px] text-slate-600 block">Primary Bedside RN</span>
                    <strong className="text-slate-900">{patient.primaryNurse}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROCEDURE & PRE-OP CHECKLIST */}
          {activeTab === 'procedure' && (
            <div className="space-y-6">
              {patient.upcomingProcedure ? (
                <>
                  <div className="p-5 rounded-xl bg-teal-50 border border-teal-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-teal-950 text-base">
                        {patient.upcomingProcedure.name}
                      </span>
                      <span className="font-mono text-sm font-semibold text-teal-800 bg-white px-2.5 py-1 rounded border border-teal-200">
                        {patient.upcomingProcedure.scheduledTime}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 mb-3">
                      Department: <strong>{patient.upcomingProcedure.department}</strong> · Location: <strong>{patient.upcomingProcedure.location}</strong>
                    </div>
                    {patient.upcomingProcedure.notes && (
                      <p className="text-xs text-teal-900 bg-white/80 p-3 rounded-lg border border-teal-200/80 leading-relaxed">
                        Clinical Order Note: {patient.upcomingProcedure.notes}
                      </p>
                    )}
                  </div>

                  {/* Interactive Pre-Op Safety Checklist */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
                      <span>Pre-Procedure Clinical Checklist</span>
                      <span className="text-[11px] font-normal text-slate-500">Tap to toggle verified status</span>
                    </h4>

                    <div className="space-y-2 text-xs">
                      <button
                        onClick={() => onToggleChecklistItem(patient.id, 'npoConfirmed')}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          patient.upcomingProcedure.checklist.npoConfirmed
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-medium">1. NPO Status Verified ({patient.upcomingProcedure.npoStatus})</span>
                        {patient.upcomingProcedure.checklist.npoConfirmed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-[10px] text-amber-700 font-semibold">Verify</span>
                        )}
                      </button>

                      <button
                        onClick={() => onToggleChecklistItem(patient.id, 'consentOnChart')}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          patient.upcomingProcedure.checklist.consentOnChart
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-medium">2. Informed Consent Signed & Scanned in EHR</span>
                        {patient.upcomingProcedure.checklist.consentOnChart ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-[10px] text-amber-700 font-semibold">Action Required</span>
                        )}
                      </button>

                      <button
                        onClick={() => onToggleChecklistItem(patient.id, 'ivPatent')}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          patient.upcomingProcedure.checklist.ivPatent
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-medium">3. Functioning Peripheral IV Access ({patient.upcomingProcedure.ivAccess})</span>
                        {patient.upcomingProcedure.checklist.ivPatent ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-[10px] text-amber-700 font-semibold">Verify</span>
                        )}
                      </button>

                      <button
                        onClick={() => onToggleChecklistItem(patient.id, 'preOpLabsVerified')}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          patient.upcomingProcedure.checklist.preOpLabsVerified
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-medium">4. Coagulation & Pre-Op Labs Cleared (INR / Platelets)</span>
                        {patient.upcomingProcedure.checklist.preOpLabsVerified ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-[10px] text-amber-700 font-semibold">Pending</span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Transport Dispatch Action */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-slate-600" />
                        Patient Transport Status
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Current: <strong>{patient.upcomingProcedure.transportStatus}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleTransport(patient.id, patient.upcomingProcedure!.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-2xs"
                    >
                      {patient.upcomingProcedure.transportStatus === 'En Route' ? 'Set to Bedside' : 'Dispatch Transport'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No Procedures Scheduled Today</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Standard inpatient orders, medication administration, and routine nursing protocols active.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRIAGE ALERTS */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {patient.triageAlerts.length > 0 ? (
                patient.triageAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-xl border ${
                      alert.severity === 'critical'
                        ? 'bg-red-50/70 border-red-200 text-red-950'
                        : alert.severity === 'warning'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-sm">
                          {alert.severity === 'critical' ? (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                          )}
                          {alert.title}
                        </div>
                        <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                          {alert.detail}
                        </p>
                        <div className="text-[11px] text-slate-500 mt-2">
                          Source: {alert.source} · Recorded {alert.timestamp}
                        </div>
                      </div>

                      <div className="shrink-0">
                        {alert.acknowledged ? (
                          <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Acknowledged
                          </span>
                        ) : (
                          <button
                            onClick={() => onAcknowledgeAlert(patient.id, alert.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
                          >
                            Acknowledge Alert
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">All Triage Parameters Within Normal Limits</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Continuous telemetry monitoring and sepsis surveillance active.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DISCHARGE PATHWAY */}
          {activeTab === 'discharge' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Discharge Readiness Progress
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {patient.dischargeReadiness.readinessPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      patient.dischargeReadiness.readinessPercent >= 80 
                        ? 'bg-emerald-500' 
                        : 'bg-teal-600'
                    }`}
                    style={{ width: `${patient.dischargeReadiness.readinessPercent}%` }}
                  />
                </div>
                <div className="text-xs text-slate-600">
                  Target Departure: <strong>{patient.dischargeReadiness.targetTime || 'Pending Clinical Criteria'}</strong>
                </div>
              </div>

              {patient.dischargeReadiness.primaryBlocker && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    Primary Discharge Barrier
                  </div>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    {patient.dischargeReadiness.primaryBlocker}
                  </p>
                </div>
              )}

              {/* Milestones checklist */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span>Medication Reconciliation & Discharge Rx</span>
                  {patient.dischargeReadiness.medicationReconciliationComplete ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : (
                    <span className="text-amber-700 font-semibold">Pending Pharmacy Sign-off</span>
                  )}
                </div>

                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span>Post-Acute Transport / Ride Home</span>
                  {patient.dischargeReadiness.transportArranged ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Confirmed
                    </span>
                  ) : (
                    <span className="text-slate-600">Unconfirmed</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Clinical Notes & Collaboration Thread */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
              Interdisciplinary Care Notes & Tasks
            </h4>

            {/* Note Input */}
            <form onSubmit={handleAddNote} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add coordination note, DME update, or task..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  Post
                </button>
              </div>
            </form>

            <div className="space-y-2.5">
              {clinicalNotes.map(n => (
                <div key={n.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900">{n.author}</span>
                    <span className="text-[10px] text-slate-600">{n.time}</span>
                  </div>
                  <div className="text-[10px] text-teal-800 font-medium mb-1">{n.role}</div>
                  <p className="text-slate-700 leading-snug">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            SMART on FHIR Live Session · Audit ID #ENC-{patient.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
