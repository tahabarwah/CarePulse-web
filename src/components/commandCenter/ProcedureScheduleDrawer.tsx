import React from 'react';
import { CommandCenterPatient } from '../../data/commandCenterData';
import { X, Clock, Calendar, Truck, Check, AlertCircle, FileText } from 'lucide-react';

interface ProcedureScheduleDrawerProps {
  patients: CommandCenterPatient[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: CommandCenterPatient) => void;
  onToggleTransport: (patientId: string, procedureId: string) => void;
}

export const ProcedureScheduleDrawer: React.FC<ProcedureScheduleDrawerProps> = ({
  patients,
  isOpen,
  onClose,
  onSelectPatient,
  onToggleTransport,
}) => {
  if (!isOpen) return null;

  // Extract all upcoming procedures and sort chronologically
  const proceduresWithPatients = patients
    .filter(p => p.upcomingProcedure !== null)
    .map(p => ({
      patient: p,
      procedure: p.upcomingProcedure!,
    }))
    .sort((a, b) => a.procedure.scheduledTime.localeCompare(b.procedure.scheduledTime));

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-teal-950 text-teal-400 border border-teal-800/80 px-2 py-0.5 rounded">
                Unit Schedule
              </span>
              <span className="text-xs text-slate-400">
                Today's Inpatient Procedures ({proceduresWithPatients.length} Active)
              </span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              Master Procedure & Transport Dispatch
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-xs text-slate-600 mb-2">
            Chronological queue of scheduled operating room, diagnostic catheterization, ultrasound, and bedside procedural protocols.
          </div>

          {proceduresWithPatients.length > 0 ? (
            proceduresWithPatients.map(({ patient, procedure }) => (
              <div
                key={procedure.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {procedure.scheduledTime}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {procedure.name}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      procedure.status === 'in-transit' 
                        ? 'bg-amber-100 text-amber-800'
                        : procedure.status === 'in-progress'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}>
                      {procedure.status.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                    <button
                      onClick={() => onSelectPatient(patient)}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      {patient.room} · {patient.name} ({patient.mrn})
                    </button>
                    <span aria-hidden="true">·</span>
                    <span>{procedure.department}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{procedure.location}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-slate-500 pt-1">
                    <span className={procedure.npoStatus.includes('NPO') ? 'text-amber-800 font-semibold' : 'text-slate-600'}>
                      {procedure.npoStatus}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Consent: <strong className="text-emerald-800">{procedure.consentStatus}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Transport: <strong className="text-slate-800">{procedure.transportStatus}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {procedure.transportStatus !== 'Not Required' && (
                    <button
                      onClick={() => onToggleTransport(patient.id, procedure.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-slate-600" />
                      {procedure.transportStatus === 'En Route' ? 'Mark Bedside' : 'Update Transport'}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPatient(patient);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-2xs"
                  >
                    View Chart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No Inpatient Procedures Scheduled</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Synced with Hospital Procedural Master Board
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            Close Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
