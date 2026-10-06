import React from 'react';
import { 
  CommandCenterPatient, 
  TriageAlert, 
  UpcomingProcedure 
} from '../../data/commandCenterData';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Clock, 
  Check, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Activity, 
  User, 
  ArrowRight, 
  Truck, 
  ShieldAlert, 
  Bed, 
  ExternalLink 
} from 'lucide-react';

interface PatientCommandCardProps {
  patient: CommandCenterPatient;
  onOpenDetails: (patient: CommandCenterPatient) => void;
  onAcknowledgeAlert: (patientId: string, alertId: string) => void;
  onToggleTransport: (patientId: string, procedureId: string) => void;
}

export const PatientCommandCard: React.FC<PatientCommandCardProps> = ({
  patient,
  onOpenDetails,
  onAcknowledgeAlert,
  onToggleTransport,
}) => {
  const unacknowledgedAlerts = patient.triageAlerts.filter(a => !a.acknowledged);
  const criticalAlert = patient.triageAlerts.find(a => a.severity === 'critical');

  // Acuity styling with clear visual hierarchy
  const getAcuityStyle = (acuity: CommandCenterPatient['acuity']) => {
    switch (acuity) {
      case 'critical':
        return { label: 'Critical Care Alert', textClass: 'text-red-700 font-bold', dotClass: 'bg-red-600 animate-pulse' };
      case 'high':
        return { label: 'High Acuity', textClass: 'text-amber-800 font-semibold', dotClass: 'bg-amber-500' };
      case 'moderate':
        return { label: 'Moderate Acuity', textClass: 'text-sky-800 font-semibold', dotClass: 'bg-sky-500' };
      case 'stable':
        return { label: 'Stable Floor Care', textClass: 'text-slate-700 font-medium', dotClass: 'bg-slate-400' };
      case 'discharge-ready':
        return { label: 'Discharge Ready', textClass: 'text-emerald-800 font-bold', dotClass: 'bg-emerald-500' };
      default:
        return { label: 'General', textClass: 'text-slate-700', dotClass: 'bg-slate-400' };
    }
  };

  const acuityInfo = getAcuityStyle(patient.acuity);

  return (
    <div 
      className={`rounded-xl border bg-white transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
        criticalAlert && !criticalAlert.acknowledged
          ? 'border-red-300 ring-2 ring-red-100'
          : unacknowledgedAlerts.length > 0
          ? 'border-amber-300'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* 1. Header Zone: Bed, Patient Name, Demographics, Acuity */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-2.5 mb-2">
          {/* Left: Bed Badge & Demographics */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Bed Number Badge - strictly whitespace-nowrap and shrink-0 to prevent multiline breakage */}
            <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200/90 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
              {patient.room}
            </span>

            <div className="flex items-baseline gap-1.5 min-w-0 truncate">
              <span className="font-bold text-slate-900 text-sm truncate">
                {patient.name}
              </span>
              <span className="text-xs text-slate-500 shrink-0 font-medium">
                {patient.age}{patient.gender}
              </span>
              <span className="text-slate-300 shrink-0" aria-hidden="true">·</span>
              <span className="font-mono text-[11px] text-slate-400 shrink-0">
                {patient.mrn}
              </span>
            </div>
          </div>

          {/* Right: Acuity Indicator - whitespace-nowrap to avoid clipping or wrapping */}
          <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap pl-1">
            <span className={`w-2 h-2 rounded-full ${acuityInfo.dotClass} shrink-0`} aria-hidden="true" />
            <span className={`text-xs ${acuityInfo.textClass}`}>
              {acuityInfo.label}
            </span>
          </div>
        </div>

        {/* Diagnosis & Care Team */}
        <div className="text-xs text-slate-900 font-semibold line-clamp-1 mb-1.5" title={patient.diagnosis}>
          {patient.diagnosis}
        </div>

        {/* Unboxed Metadata: RN, Attending, LOS, Isolation */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
          <span className="text-slate-600">
            RN: <span className="text-slate-800 font-medium">{patient.primaryNurse}</span>
          </span>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="text-slate-600 truncate max-w-[150px]">
            Attending: <span className="text-slate-800 font-medium">{patient.attendingPhysician.split(',')[0]}</span>
          </span>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="text-slate-600 font-mono tabular-nums">
            LOS {patient.losDays}d
          </span>
          {patient.isolationPrecaution !== 'None' && (
            <>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {patient.isolationPrecaution} Isolation
              </span>
            </>
          )}
          {patient.codeStatus !== 'Full Code' && (
            <>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {patient.codeStatus}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. Live Vitals Strip (Structured Grid with Tabular Figures) */}
      <div className="bg-slate-50/90 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs">
        <div className="grid grid-cols-4 gap-3 sm:gap-4 text-slate-600 font-mono tabular-nums">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-sans block">HR</span>
            <span className={`font-semibold ${patient.vitals.heartRate > 100 || patient.vitals.heartRate < 55 ? 'text-red-600 font-bold' : 'text-slate-800'}`}>
              {patient.vitals.heartRate}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-sans block">BP</span>
            <span className={`font-semibold ${parseInt(patient.vitals.bloodPressure) > 140 ? 'text-amber-700' : 'text-slate-800'}`}>
              {patient.vitals.bloodPressure}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-sans block">SpO2</span>
            <span className={`font-semibold ${patient.vitals.spo2 < 93 ? 'text-red-600 font-bold' : 'text-slate-800'}`}>
              {patient.vitals.spo2}%
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-sans block">Temp</span>
            <span className={`font-semibold ${patient.vitals.temperature >= 38.0 ? 'text-red-600' : 'text-slate-800'}`}>
              {patient.vitals.temperature}°C
            </span>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-400 shrink-0 whitespace-nowrap pl-2">
          <span>Synced {patient.vitals.lastUpdated}</span>
        </div>
      </div>

      {/* 3. Triage Alerts Section */}
      <div className="p-4 space-y-3 flex-grow">
        {patient.triageAlerts.length > 0 ? (
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Active Triage Alerts ({patient.triageAlerts.length})
              </span>
              {unacknowledgedAlerts.length > 0 && (
                <span className="text-[11px] text-red-600 font-bold whitespace-nowrap shrink-0">
                  {unacknowledgedAlerts.length} Unacknowledged
                </span>
              )}
            </div>

            {patient.triageAlerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-2.5 rounded-lg text-xs border transition-colors ${
                  alert.severity === 'critical'
                    ? alert.acknowledged ? 'bg-red-50/40 border-red-200 text-red-900' : 'bg-red-50 border-red-300 text-red-950 ring-1 ring-red-200'
                    : alert.severity === 'warning'
                    ? alert.acknowledged ? 'bg-amber-50/40 border-amber-200 text-amber-900' : 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    {alert.severity === 'critical' ? (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-xs leading-snug">{alert.title}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">{alert.detail}</div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Source: {alert.source} · {alert.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 ml-1">
                    {alert.acknowledged ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-medium">
                        <Check className="w-3 h-3 text-emerald-600 mr-0.5" />
                        Ack
                      </span>
                    ) : (
                      <button
                        onClick={() => onAcknowledgeAlert(patient.id, alert.id)}
                        className="px-2.5 py-1 text-[10px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2.5 rounded-lg border border-dashed border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              No Active Triage Alerts
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Nominal Protocol</span>
          </div>
        )}

        {/* 4. Upcoming Procedure Section */}
        {patient.upcomingProcedure ? (
          <div className="p-3 rounded-lg bg-teal-50/60 border border-teal-200/80 text-xs">
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <span className="font-semibold text-teal-900 flex items-center gap-1.5 truncate">
                <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                Procedure: {patient.upcomingProcedure.scheduledTime}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0 whitespace-nowrap ${
                patient.upcomingProcedure.status === 'in-transit' 
                  ? 'bg-amber-100 text-amber-800' 
                  : patient.upcomingProcedure.status === 'in-progress'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-teal-100 text-teal-800'
              }`}>
                {patient.upcomingProcedure.status === 'in-transit' ? 'En Route' : patient.upcomingProcedure.status.replace('-', ' ')}
              </span>
            </div>

            <div className="font-semibold text-slate-900 text-xs mb-1">
              {patient.upcomingProcedure.name}
            </div>

            <div className="text-[11px] text-slate-600 mb-2">
              {patient.upcomingProcedure.location}
            </div>

            {/* Unboxed Prep Checklist */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-600 pt-1.5 border-t border-teal-200/50">
              <span className={patient.upcomingProcedure.npoStatus.includes('NPO') ? 'text-amber-800 font-semibold' : 'text-slate-600'}>
                {patient.upcomingProcedure.npoStatus}
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-emerald-800 font-medium">Consent: {patient.upcomingProcedure.consentStatus}</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span>IV: {patient.upcomingProcedure.ivAccess.split(' ')[0]}</span>
            </div>

            {/* Transport Action */}
            {patient.upcomingProcedure.transportStatus !== 'Not Required' && (
              <div className="mt-2.5 pt-2 border-t border-teal-200/60 flex items-center justify-between text-xs gap-2">
                <span className="text-[11px] text-slate-600 flex items-center gap-1 truncate">
                  <Truck className="w-3 h-3 text-slate-500 shrink-0" />
                  Transport: <strong className="text-slate-800 ml-0.5">{patient.upcomingProcedure.transportStatus}</strong>
                </span>
                <button
                  onClick={() => onToggleTransport(patient.id, patient.upcomingProcedure!.id)}
                  className="text-[11px] font-medium text-teal-700 hover:text-teal-900 underline underline-offset-2 shrink-0 cursor-pointer"
                >
                  {patient.upcomingProcedure.transportStatus === 'En Route' ? 'Mark Bedside' : 'Update Transport'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              No Procedures Scheduled Today
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Floor Orders Active</span>
          </div>
        )}

        {/* 5. Discharge Readiness Status */}
        <div className="pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-600">Discharge Readiness</span>
            <span className="font-semibold text-slate-800 font-mono tabular-nums">
              {patient.dischargeReadiness.readinessPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${
                patient.dischargeReadiness.readinessPercent >= 80 
                  ? 'bg-emerald-500' 
                  : patient.dischargeReadiness.readinessPercent >= 50
                  ? 'bg-teal-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${patient.dischargeReadiness.readinessPercent}%` }}
            />
          </div>
          {patient.dischargeReadiness.primaryBlocker && (
            <div className="mt-1 text-[11px] text-slate-500 truncate" title={patient.dischargeReadiness.primaryBlocker}>
              Blocker: <span className="text-slate-700 font-medium">{patient.dischargeReadiness.primaryBlocker}</span>
            </div>
          )}
        </div>
      </div>

      {/* 6. Card Footer Action Bar */}
      <div className="p-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenDetails(patient)}
          className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-teal-800 bg-white border border-slate-200 hover:border-teal-300 hover:text-teal-900 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-teal-600" />
          Inspect Chart & SBAR
          <ArrowRight className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
