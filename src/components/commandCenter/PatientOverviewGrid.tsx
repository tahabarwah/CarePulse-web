import React, { useState, useMemo } from 'react';
import { 
  INITIAL_COMMAND_CENTER_PATIENTS, 
  HOSPITAL_UNITS, 
  CommandCenterPatient,
  HospitalUnitOption 
} from '../../data/commandCenterData';
import { PatientCommandCard } from './PatientCommandCard';
import { PatientDetailDrawer } from './PatientDetailDrawer';
import { ProcedureScheduleDrawer } from './ProcedureScheduleDrawer';
import { 
  Activity, 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle2, 
  RefreshCw, 
  SlidersHorizontal, 
  LayoutGrid, 
  Table as TableIcon, 
  Plus, 
  ShieldCheck, 
  Building2, 
  ArrowUpDown,
  Sparkles
} from 'lucide-react';

export const PatientOverviewGrid: React.FC = () => {
  const [patients, setPatients] = useState<CommandCenterPatient[]>(INITIAL_COMMAND_CENTER_PATIENTS);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(HOSPITAL_UNITS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [acuityFilter, setAcuityFilter] = useState<'all' | 'critical' | 'high' | 'moderate' | 'stable' | 'discharge-ready'>('all');
  const [alertsOnly, setAlertsOnly] = useState(false);
  const [proceduresOnly, setProceduresOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isSimulatingStream, setIsSimulatingStream] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Drawers state
  const [selectedPatient, setSelectedPatient] = useState<CommandCenterPatient | null>(null);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);

  const selectedUnit = HOSPITAL_UNITS.find(u => u.id === selectedUnitId) || HOSPITAL_UNITS[0];

  // Show auto-dismiss toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Handler: Acknowledge an alert
  const handleAcknowledgeAlert = (patientId: string, alertId: string) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id !== patientId) return p;
        return {
          ...p,
          triageAlerts: p.triageAlerts.map(a => (a.id === alertId ? { ...a, acknowledged: true } : a)),
        };
      })
    );

    // Also update selected patient if drawer is open
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient(prev => {
        if (!prev) return null;
        return {
          ...prev,
          triageAlerts: prev.triageAlerts.map(a => (a.id === alertId ? { ...a, acknowledged: true } : a)),
        };
      });
    }

    triggerToast('Triage alert acknowledged and logged into FHIR audit stream.');
  };

  // Handler: Toggle Pre-Op checklist item
  const handleToggleChecklistItem = (patientId: string, itemKey: string) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id !== patientId || !p.upcomingProcedure) return p;
        const currentVal = (p.upcomingProcedure.checklist as any)[itemKey];
        return {
          ...p,
          upcomingProcedure: {
            ...p.upcomingProcedure,
            checklist: {
              ...p.upcomingProcedure.checklist,
              [itemKey]: !currentVal,
            },
          },
        };
      })
    );

    if (selectedPatient && selectedPatient.id === patientId && selectedPatient.upcomingProcedure) {
      setSelectedPatient(prev => {
        if (!prev || !prev.upcomingProcedure) return null;
        const currentVal = (prev.upcomingProcedure.checklist as any)[itemKey];
        return {
          ...prev,
          upcomingProcedure: {
            ...prev.upcomingProcedure,
            checklist: {
              ...prev.upcomingProcedure.checklist,
              [itemKey]: !currentVal,
            },
          },
        };
      });
    }

    triggerToast('Pre-procedure safety verification status updated.');
  };

  // Handler: Toggle Transport status
  const handleToggleTransport = (patientId: string, procedureId: string) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id !== patientId || !p.upcomingProcedure) return p;
        const nextStatus = 
          p.upcomingProcedure.transportStatus === 'Requested'
            ? 'En Route'
            : p.upcomingProcedure.transportStatus === 'En Route'
            ? 'Bedside'
            : 'Requested';
        return {
          ...p,
          upcomingProcedure: {
            ...p.upcomingProcedure,
            transportStatus: nextStatus,
          },
        };
      })
    );

    if (selectedPatient && selectedPatient.id === patientId && selectedPatient.upcomingProcedure) {
      setSelectedPatient(prev => {
        if (!prev || !prev.upcomingProcedure) return null;
        const nextStatus = 
          prev.upcomingProcedure.transportStatus === 'Requested'
            ? 'En Route'
            : prev.upcomingProcedure.transportStatus === 'En Route'
            ? 'Bedside'
            : 'Requested';
        return {
          ...prev,
          upcomingProcedure: {
            ...prev.upcomingProcedure,
            transportStatus: nextStatus,
          },
        };
      });
    }

    triggerToast('Patient transport dispatch updated in hospital logistics queue.');
  };

  // Simulate Telemetry / Vitals fluctuation
  const handleSimulateTelemetryUpdate = () => {
    setIsSimulatingStream(true);
    setTimeout(() => {
      setPatients(prev =>
        prev.map(p => {
          // Add small fluctuation to vitals
          const hrDelta = Math.floor(Math.random() * 5) - 2;
          const spo2Delta = Math.floor(Math.random() * 3) - 1;
          return {
            ...p,
            vitals: {
              ...p.vitals,
              heartRate: Math.max(50, Math.min(140, p.vitals.heartRate + hrDelta)),
              spo2: Math.max(86, Math.min(100, p.vitals.spo2 + spo2Delta)),
              lastUpdated: 'Just now',
            },
          };
        })
      );
      setIsSimulatingStream(false);
      triggerToast('Telemetry feed synchronized: sub-second vital trends updated.');
    }, 600);
  };

  // Filtered patients
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesRoom = p.room.toLowerCase().includes(query);
        const matchesMrn = p.mrn.toLowerCase().includes(query);
        const matchesDiag = p.diagnosis.toLowerCase().includes(query);
        const matchesNurse = p.primaryNurse.toLowerCase().includes(query);
        if (!matchesName && !matchesRoom && !matchesMrn && !matchesDiag && !matchesNurse) {
          return false;
        }
      }

      // Acuity
      if (acuityFilter !== 'all') {
        if (acuityFilter === 'stable') {
          if (p.acuity !== 'stable' && p.acuity !== 'discharge-ready') return false;
        } else if (p.acuity !== acuityFilter) {
          return false;
        }
      }

      // Alerts Only
      if (alertsOnly && p.triageAlerts.length === 0) {
        return false;
      }

      // Procedures Only
      if (proceduresOnly && p.upcomingProcedure === null) {
        return false;
      }

      return true;
    });
  }, [patients, searchQuery, acuityFilter, alertsOnly, proceduresOnly]);

  // Aggregate Metrics
  const totalBeds = selectedUnit.totalBeds;
  const occupiedBeds = patients.length;
  const totalAlerts = patients.reduce((acc, p) => acc + p.triageAlerts.filter(a => !a.acknowledged).length, 0);
  const totalProcedures = patients.filter(p => p.upcomingProcedure !== null).length;
  const totalDischarges = patients.filter(p => p.acuity === 'discharge-ready' || p.dischargeReadiness.readinessPercent >= 75).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Unit Selector & Live Feed Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
              Inpatient Live Clinical Grid
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              FHIR R4 Stream: Synchronized
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            Clinical Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time ward census, automated vital telemetry triage alerts, and procedural transport orchestration.
          </p>
        </div>

        {/* Unit Selector & Streaming Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs">
            <Building2 className="w-3.5 h-3.5 text-slate-500 ml-2" />
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden py-1 px-1 cursor-pointer"
            >
              {HOSPITAL_UNITS.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.occupiedBeds}/{unit.totalBeds} Beds)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsScheduleDrawerOpen(true)}
            className="px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800 hover:text-teal-800 hover:border-teal-300 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            Master Procedures ({totalProcedures})
          </button>

          <button
            onClick={handleSimulateTelemetryUpdate}
            disabled={isSimulatingStream}
            className="px-3 py-2 rounded-lg text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-900 hover:bg-teal-100 transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
            title="Simulate incoming telemetry data stream"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-700 ${isSimulatingStream ? 'animate-spin' : ''}`} />
            Refresh Stream
          </button>
        </div>
      </div>

      {/* 2. Command Center KPI Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* KPI 1: Occupancy */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Unit Census & Beds
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {occupiedBeds}/{totalBeds}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {Math.round((occupiedBeds / totalBeds) * 100)}% Census Occupancy
          </div>
        </div>

        {/* KPI 2: Active Triage Alerts */}
        <div className={`p-4 rounded-xl border shadow-xs ${totalAlerts > 0 ? 'bg-amber-50/60 border-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider flex items-center justify-between">
            <span>Triage Alerts</span>
            {totalAlerts > 0 && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {totalAlerts}
          </div>
          <div className="text-xs text-slate-600 mt-0.5">
            {totalAlerts > 0 ? 'Unacknowledged flags' : 'All clear / nominal'}
          </div>
        </div>

        {/* KPI 3: Procedures Today */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Procedures Scheduled
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {totalProcedures}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Cath, TEE, Ultrasound & Bedside
          </div>
        </div>

        {/* KPI 4: Discharges Velocity */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Discharges Today
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
            {totalDischarges}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Target departure &lt; 14:00
          </div>
        </div>

        {/* KPI 5: RN Shift Staffing */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 md:col-span-1">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Staffing Ratio
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            1:4
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {selectedUnit.rnShiftCount} Bedside RNs on Duty
          </div>
        </div>
      </div>

      {/* 3. Search & Interactive Filter Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Patient Name, Bed #, MRN, Diagnosis, or RN..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Toggles & View Mode */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setAlertsOnly(!alertsOnly)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                alertsOnly 
                  ? 'bg-amber-500 text-white border-amber-600' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Alerts Only ({patients.filter(p => p.triageAlerts.length > 0).length})
            </button>

            <button
              onClick={() => setProceduresOnly(!proceduresOnly)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                proceduresOnly 
                  ? 'bg-teal-700 text-white border-teal-800' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Procedures Only ({totalProcedures})
            </button>

            {/* View Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid Tile View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Dense Table View"
                aria-label="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Acuity Filter Tabs (Functional Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 pt-3">
          <span className="text-slate-600 font-semibold mr-1 shrink-0">Filter Acuity:</span>
          
          <button
            onClick={() => setAcuityFilter('all')}
            className={`px-3 py-1 rounded-md font-medium transition-colors shrink-0 ${
              acuityFilter === 'all' 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Patients ({patients.length})
          </button>

          <button
            onClick={() => setAcuityFilter('critical')}
            className={`px-3 py-1 rounded-md font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              acuityFilter === 'critical' 
                ? 'bg-red-700 text-white' 
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Critical Care ({patients.filter(p => p.acuity === 'critical').length})
          </button>

          <button
            onClick={() => setAcuityFilter('high')}
            className={`px-3 py-1 rounded-md font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              acuityFilter === 'high' 
                ? 'bg-amber-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            High Acuity ({patients.filter(p => p.acuity === 'high').length})
          </button>

          <button
            onClick={() => setAcuityFilter('moderate')}
            className={`px-3 py-1 rounded-md font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              acuityFilter === 'moderate' 
                ? 'bg-sky-700 text-white' 
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            Moderate ({patients.filter(p => p.acuity === 'moderate').length})
          </button>

          <button
            onClick={() => setAcuityFilter('stable')}
            className={`px-3 py-1 rounded-md font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              acuityFilter === 'stable' 
                ? 'bg-emerald-700 text-white' 
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Stable / Discharge Ready ({patients.filter(p => p.acuity === 'stable' || p.acuity === 'discharge-ready').length})
          </button>
        </div>
      </div>

      {/* 4. Main View Content: Grid vs Table */}
      {filteredPatients.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 min-[1680px]:grid-cols-4 gap-5 lg:gap-6 items-stretch">
            {filteredPatients.map(patient => (
              <PatientCommandCard
                key={patient.id}
                patient={patient}
                onOpenDetails={setSelectedPatient}
                onAcknowledgeAlert={handleAcknowledgeAlert}
                onToggleTransport={handleToggleTransport}
              />
            ))}
          </div>
        ) : (
          /* Dense Table View */
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="py-3 px-4">Bed & Demographics</th>
                  <th className="py-3 px-4">Diagnosis</th>
                  <th className="py-3 px-4">Acuity</th>
                  <th className="py-3 px-4 font-mono">Vitals (HR/BP/SpO2/Temp)</th>
                  <th className="py-3 px-4">Triage Alerts</th>
                  <th className="py-3 px-4">Upcoming Procedure</th>
                  <th className="py-3 px-4">Discharge Readiness</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map(patient => {
                  const unackCount = patient.triageAlerts.filter(a => !a.acknowledged).length;
                  return (
                    <tr key={patient.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{patient.room}</div>
                        <div className="text-[11px] text-slate-600">
                          {patient.name} · {patient.age}{patient.gender} · <span className="font-mono text-[10px] text-slate-600">{patient.mrn}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-medium text-slate-900 truncate" title={patient.diagnosis}>
                          {patient.diagnosis}
                        </div>
                        <div className="text-[11px] text-slate-600">
                          RN: {patient.primaryNurse}
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 font-semibold capitalize ${
                          patient.acuity === 'critical' ? 'text-red-700' :
                          patient.acuity === 'high' ? 'text-amber-800' :
                          patient.acuity === 'moderate' ? 'text-sky-800' :
                          'text-emerald-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            patient.acuity === 'critical' ? 'bg-red-600' :
                            patient.acuity === 'high' ? 'bg-amber-500' :
                            patient.acuity === 'moderate' ? 'bg-sky-500' :
                            'bg-emerald-500'
                          }`} />
                          {patient.acuity.replace('-', ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap font-mono tabular-nums text-slate-800">
                        {patient.vitals.heartRate} bpm · {patient.vitals.bloodPressure} · {patient.vitals.spo2}% · {patient.vitals.temperature}°C
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        {patient.triageAlerts.length > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle className={`w-3.5 h-3.5 ${unackCount > 0 ? 'text-red-600' : 'text-slate-400'}`} />
                            <span className={unackCount > 0 ? 'text-red-700 font-bold' : 'text-slate-700'}>
                              {patient.triageAlerts[0].title}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-600">Nominal</span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        {patient.upcomingProcedure ? (
                          <div>
                            <span className="font-semibold text-slate-900">{patient.upcomingProcedure.scheduledTime}</span>: {patient.upcomingProcedure.name}
                            <div className="text-[10px] text-slate-600">{patient.upcomingProcedure.transportStatus}</div>
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono tabular-nums font-semibold">{patient.dischargeReadiness.readinessPercent}%</span>
                          <div className="w-16 bg-slate-200 rounded-full h-1.5">
                            <div 
                              className="h-full rounded-full bg-teal-600"
                              style={{ width: `${patient.dischargeReadiness.readinessPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 transition-colors"
                        >
                          View Chart
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No Patients Match Active Filters</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 mb-4">
            Try adjusting your search criteria, clearing the acuity filter, or switching unit views.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setAcuityFilter('all');
              setAlertsOnly(false);
              setProceduresOnly(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 5. Patient Detail Slide-Over Inspector */}
      <PatientDetailDrawer
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onAcknowledgeAlert={handleAcknowledgeAlert}
        onToggleChecklistItem={handleToggleChecklistItem}
        onToggleTransport={handleToggleTransport}
      />

      {/* 6. Procedure Schedule Master Drawer */}
      <ProcedureScheduleDrawer
        patients={patients}
        isOpen={isScheduleDrawerOpen}
        onClose={() => setIsScheduleDrawerOpen(false)}
        onSelectPatient={(p) => setSelectedPatient(p)}
        onToggleTransport={handleToggleTransport}
      />
    </div>
  );
};
