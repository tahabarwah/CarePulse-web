import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Building2, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Info,
  Stethoscope,
  BedDouble,
  BarChart3,
  Download,
  FileText,
  X,
  FileSpreadsheet,
  Sliders,
  Zap
} from 'lucide-react';
import { downloadRoiReportPdf, RoiReportData } from '../utils/roiPdfGenerator';
import { RoiProjectionD3Chart } from './RoiProjectionD3Chart';
import { WorkflowCostComparisonTable } from './WorkflowCostComparisonTable';

interface HealthcareRoiCalculatorProps {
  onApplyToDemo: (roiNotes: string) => void;
}

interface HospitalPreset {
  name: string;
  badge: string;
  beds: number;
  rns: number;
  admissions: number;
  hourlyRate: number;
  ehr: string;
}

const PRESETS: HospitalPreset[] = [
  {
    name: 'Community Hospital',
    badge: '150 Beds',
    beds: 150,
    rns: 180,
    admissions: 5500,
    hourlyRate: 52,
    ehr: 'MEDITECH Expanse',
  },
  {
    name: 'Regional Medical Center',
    badge: '350 Beds (Most Common)',
    beds: 350,
    rns: 450,
    admissions: 13000,
    hourlyRate: 56,
    ehr: 'Epic Systems',
  },
  {
    name: 'Multi-Facility Health System',
    badge: '850 Beds',
    beds: 850,
    rns: 1100,
    admissions: 32000,
    hourlyRate: 60,
    ehr: 'Oracle Health / Cerner',
  },
];

export const HealthcareRoiCalculator: React.FC<HealthcareRoiCalculatorProps> = ({ onApplyToDemo }) => {
  // Input parameters
  const [beds, setBeds] = useState<number>(350);
  const [rns, setRns] = useState<number>(450);
  const [admissions, setAdmissions] = useState<number>(13000);
  const [hourlyRate, setHourlyRate] = useState<number>(56);
  const [ehrSystem, setEhrSystem] = useState<string>('Epic Systems');
  // Modeling Projection Model: 'conservative' (risk-adjusted 0.85x) vs. 'aggressive' (accelerated 1.25x)
  const [projectionModel, setProjectionModel] = useState<'conservative' | 'aggressive'>('conservative');
  const scenarioMultiplier = projectionModel === 'aggressive' ? 1.25 : 0.85;
  const [copied, setCopied] = useState<boolean>(false);

  // PDF Export Modal and Customization State
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [customHospitalName, setCustomHospitalName] = useState<string>('Regional Medical Center');
  const [customExecutiveName, setCustomExecutiveName] = useState<string>('');
  const [customExecutiveTitle, setCustomExecutiveTitle] = useState<string>('Chief Financial Officer / VP of Nursing Operations');
  const [customUnitScope, setCustomUnitScope] = useState<string>('Inpatient Acute Med-Surg, Telemetry & ICU Units');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadedFileName, setDownloadedFileName] = useState<string | null>(null);

  // Apply a preset
  const handleSelectPreset = (preset: HospitalPreset) => {
    setBeds(preset.beds);
    setRns(preset.rns);
    setAdmissions(preset.admissions);
    setHourlyRate(preset.hourlyRate);
    setEhrSystem(preset.ehr);
    setCustomHospitalName(preset.name);
  };

  // Calculations based on verified peer benchmarks:
  // - 28 mins handoff duration saved per nurse per 12-hr shift (approx 3 shifts/week * 48 active weeks = 144 shifts/yr)
  // - Overtime mitigation: 0.32 hours/shift saved in post-shift documentation overtime (multiplied by 1.5x OT rate factor)
  // - Throughput velocity: 1.4-hr earlier median discharge, yielding 0.45 avoidable days saved per 10 admissions
  const calculations = useMemo(() => {
    const shiftsPerYearPerRn = 144; // standard 3 shifts/week over 48 weeks
    const totalRnShiftsAnnual = rns * shiftsPerYearPerRn;

    // 1. Clinical Time Reclaimed
    // 28 minutes saved per shift = 28 / 60 = 0.467 hours
    const rawHoursSaved = totalRnShiftsAnnual * (28 / 60);
    const annualHoursSaved = Math.round(rawHoursSaved * scenarioMultiplier);
    const hoursPerRnAnnual = Math.round((annualHoursSaved / (rns || 1)));

    // Clinical capacity value based on blended RN compensation
    const rawCapacityValue = annualHoursSaved * hourlyRate;
    const capacityValue = Math.round(rawCapacityValue);

    // 2. Overtime & Charting Reduction Savings
    // Bedside nurses often clock ~30-45 mins of daily overtime completing end-of-shift notes and delayed handoffs
    // CarePulse eliminates ~20 mins of this overtime. Overtime cost factor = 1.5x hourly rate.
    // Assuming 35% of shifts incurred charting overtime.
    const overtimeHoursAvoided = totalRnShiftsAnnual * 0.35 * (20 / 60) * scenarioMultiplier;
    const overtimeSavings = Math.round(overtimeHoursAvoided * (hourlyRate * 1.5));

    // Nurse turnover cost mitigation: Replacing an RN costs ~$45,000–$55,000.
    // 19% reduction in first-year RN departures across a baseline 12% turnover rate
    const estimatedTurnoverSavings = Math.round(
      (rns * 0.12 * 0.19 * 48000) * scenarioMultiplier
    );

    // Total Nursing Efficiency & Retention Benefit
    const totalNursingBenefit = overtimeSavings + estimatedTurnoverSavings;

    // 3. Inpatient Discharge & Bed Capacity Acceleration
    // 1.4 hours earlier median daily discharge order placement
    // Frees bed capacity in early afternoon, avoiding ED boarding and unlocking surgical/transfer admission volume.
    // Conservative baseline: 0.45 avoidable bed-days saved per 10 admissions
    const avoidableBedDaysSaved = Math.round((admissions * 0.045) * scenarioMultiplier);
    // Estimated average fixed-cost contribution margin per reclaimed bed-day = $420
    const bedCapacityValue = Math.round(avoidableBedDaysSaved * 420);

    // 4. Combined Net Annual Operational Value
    const totalAnnualValue = capacityValue + overtimeSavings + estimatedTurnoverSavings + bedCapacityValue;

    // Approximate CarePulse Enterprise Investment range based on bed count (estimated SaaS tier)
    const estimatedAnnualCost = Math.round(beds * 380 + rns * 120);
    const netAnnualReturn = Math.max(0, totalAnnualValue - estimatedAnnualCost);
    const roiMultiple = estimatedAnnualCost > 0 ? (totalAnnualValue / estimatedAnnualCost).toFixed(1) : '5.2';
    const paybackMonths = estimatedAnnualCost > 0 ? ((estimatedAnnualCost / (totalAnnualValue / 12))).toFixed(1) : '2.8';

    return {
      annualHoursSaved,
      hoursPerRnAnnual,
      capacityValue,
      overtimeSavings,
      estimatedTurnoverSavings,
      totalNursingBenefit,
      avoidableBedDaysSaved,
      bedCapacityValue,
      totalAnnualValue,
      estimatedAnnualCost,
      netAnnualReturn,
      roiMultiple,
      paybackMonths,
    };
  }, [beds, rns, admissions, hourlyRate, scenarioMultiplier]);

  // Formatted string summary for clipboard or passing to demo notes
  const summaryText = useMemo(() => {
    return `[CarePulse ROI Projection]
- Facility Profile: ${beds} Staffed Beds | ${rns} Bedside RNs | ${admissions.toLocaleString()} Annual Admissions
- Primary EHR: ${ehrSystem} (Blended RN Rate: $${hourlyRate}/hr)
- Modeled Scenario: ${projectionModel === 'aggressive' ? 'Aggressive Model (+25% adoption velocity)' : 'Conservative Model (-15% risk-adjusted)'}
- Projected Annual Financial Value: $${calculations.totalAnnualValue.toLocaleString()}
- Reclaimed Clinical Hours: ${calculations.annualHoursSaved.toLocaleString()} hrs/year (${calculations.hoursPerRnAnnual} hrs/nurse)
- Overtime & Retention Savings: $${calculations.totalNursingBenefit.toLocaleString()}/year
- Avoidable Bed-Days Saved: ${calculations.avoidableBedDaysSaved.toLocaleString()} days ($${calculations.bedCapacityValue.toLocaleString()} capacity value)
- Workflow Comparison: Reclaims $${calculations.netAnnualReturn.toLocaleString()}/yr net operating capacity across shift handoffs, charting overtime, retention, and bed throughput
- Estimated Payback Period: ${calculations.paybackMonths} months (${calculations.roiMultiple}x ROI multiple)`;
  }, [beds, rns, admissions, ehrSystem, hourlyRate, projectionModel, calculations]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToDemo = () => {
    onApplyToDemo(summaryText);
  };

  const handleTriggerPdfDownload = (isCustomModal: boolean = false) => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      const scenarioName = projectionModel === 'aggressive' ? 'Aggressive' : 'Conservative';

      const fileName = downloadRoiReportPdf({
        hospitalName: customHospitalName || 'Regional Medical Center',
        executiveName: customExecutiveName || 'Hospital Executive Leader',
        executiveTitle: customExecutiveTitle || 'Chief Financial Officer / VP Nursing',
        unitScope: customUnitScope || 'Inpatient Acute Med-Surg, Telemetry & ICU Units',
        beds,
        rns,
        admissions,
        hourlyRate,
        ehrSystem,
        scenarioName,
        calculations,
      });

      setIsGeneratingPdf(false);
      setDownloadedFileName(fileName);
      if (isCustomModal) {
        setShowPdfModal(false);
      }
    }, 500);
  };

  return (
    <section 
      id="roi-calculator" 
      className="py-20 sm:py-24 bg-white border-b border-slate-200"
      aria-label="Healthcare ROI & Efficiency Calculator"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Hospital Financial & Operational Modeling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-sans">
            Healthcare ROI & Efficiency Calculator
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Model your health system's projected cost savings, reclaimed bedside clinical hours, 
            and discharge throughput gains based on verified hospital customer benchmarks.
          </p>
        </div>

        {/* Quick Hospital Scale Presets */}
        <div className="mb-10">
          <div className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Select a Hospital Profile Preset:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PRESETS.map((p) => {
              const isActive = beds === p.beds && rns === p.rns;
              return (
                <button
                  key={p.name}
                  onClick={() => handleSelectPreset(p)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-700/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Building2 className={`w-3.5 h-3.5 ${isActive ? 'text-teal-200' : 'text-slate-500'}`} />
                  <span>{p.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isActive ? 'bg-teal-800 text-teal-100' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (5 cols) */}
          <div 
            id="roi-input-controls"
            className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs"
          >
            <div className="flex items-center justify-between pb-5 border-b border-slate-200 mb-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                <Users className="w-4 h-4 text-teal-700" />
                <span>Facility Parameters</span>
              </h3>
              <span className="text-xs text-slate-500">Customize to your system</span>
            </div>

            <div className="space-y-6">
              {/* Staffed Inpatient Beds */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-slate-500" />
                    <span>Staffed Inpatient Beds</span>
                  </span>
                  <span className="text-sm font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {beds} Beds
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={beds}
                  onChange={(e) => {
                    const newBeds = Number(e.target.value);
                    setBeds(newBeds);
                    // Dynamically estimate proportional RNs and admissions if user adjusts beds
                    setRns(Math.round(newBeds * 1.28));
                    setAdmissions(Math.round(newBeds * 37));
                  }}
                  className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>50 beds</span>
                  <span>750 beds</span>
                  <span>1,500+ beds</span>
                </div>
              </div>

              {/* Full-Time Bedside Nurses (RNs) */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-slate-500" />
                    <span>Bedside Staff Nurses (RNs)</span>
                  </span>
                  <span className="text-sm font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {rns} RNs
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="2000"
                  step="20"
                  value={rns}
                  onChange={(e) => setRns(Number(e.target.value))}
                  className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>40 RNs</span>
                  <span>1,000 RNs</span>
                  <span>2,000 RNs</span>
                </div>
              </div>

              {/* Annual Inpatient Admissions */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span>Annual Inpatient Admissions</span>
                  <span className="text-sm font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {admissions.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={admissions}
                  onChange={(e) => setAdmissions(Number(e.target.value))}
                  className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>2,000</span>
                  <span>25,000</span>
                  <span>50,000+</span>
                </div>
              </div>

              {/* Average RN Blended Hourly Rate */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                    <span>Blended RN Hourly Cost (w/ Benefits)</span>
                  </span>
                  <span className="text-sm font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    ${hourlyRate}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="38"
                  max="85"
                  step="2"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$38/hr</span>
                  <span>$60/hr</span>
                  <span>$85/hr</span>
                </div>
              </div>

              {/* Primary EHR Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Primary EHR System
                </label>
                <select
                  value={ehrSystem}
                  onChange={(e) => setEhrSystem(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Epic Systems">Epic Systems (SMART on FHIR)</option>
                  <option value="Oracle Health / Cerner">Oracle Health / Cerner Millennium</option>
                  <option value="MEDITECH Expanse">MEDITECH Expanse</option>
                  <option value="Athenahealth">Athenahealth Acute</option>
                  <option value="Other / Hybrid EHR">Other / Multi-EHR Hybrid</option>
                </select>
              </div>

              {/* Projection Model Toggle Switch (Conservative vs. Aggressive) */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-teal-700" />
                    <span>Projection Model:</span>
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    projectionModel === 'aggressive'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-teal-100 text-teal-900 border border-teal-300'
                  }`}>
                    {projectionModel === 'aggressive' ? 'Aggressive (+25%)' : 'Conservative (-15%)'}
                  </span>
                </div>

                {/* Toggle Switch Component with interactive click & switch track */}
                <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex items-center justify-between gap-1">
                  <button
                    id="btn-model-conservative"
                    type="button"
                    onClick={() => setProjectionModel('conservative')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      projectionModel === 'conservative'
                        ? 'bg-white text-teal-950 shadow-sm border border-slate-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span>Conservative</span>
                  </button>

                  {/* Toggle Switch Visual Track Button */}
                  <button
                    id="toggle-projection-model-switch"
                    type="button"
                    role="switch"
                    aria-checked={projectionModel === 'aggressive'}
                    aria-label="Toggle between Conservative and Aggressive projection models"
                    onClick={() => setProjectionModel(prev => prev === 'conservative' ? 'aggressive' : 'conservative')}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 ${
                      projectionModel === 'aggressive' ? 'bg-amber-600' : 'bg-teal-700'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        projectionModel === 'aggressive' ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  <button
                    id="btn-model-aggressive"
                    type="button"
                    onClick={() => setProjectionModel('aggressive')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      projectionModel === 'aggressive'
                        ? 'bg-white text-amber-950 shadow-sm border border-slate-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Aggressive</span>
                  </button>
                </div>

                <div className="mt-2 text-[11px] leading-relaxed text-slate-500 bg-white p-2 rounded-lg border border-slate-100 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    {projectionModel === 'conservative'
                      ? 'Conservative: Risk-adjusted baseline (85%), 24 min handoff duration, generous clinical transition margin.'
                      : 'Aggressive: Accelerated enterprise rollout (125%), 32 min handoff duration, rapid discharge velocity.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results & Financial Breakdown (7 cols) */}
          <div 
            id="roi-results-panel"
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Primary Headline Metric Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-7 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Estimated Annual Net Operational Value
                </span>
                <span className="text-[11px] bg-teal-900/80 text-teal-200 border border-teal-700/60 px-2 py-0.5 rounded-full font-medium">
                  {calculations.paybackMonths} Mo. Est. Payback
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mb-3 relative z-10">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                  ${calculations.totalAnnualValue.toLocaleString()}
                </span>
                <span className="text-slate-300 text-sm font-medium">
                  / year in quantified hospital value
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 relative z-10 max-w-xl">
                Combines reclaimed bedside nurse shift handoff hours, reduced after-shift charting overtime, 
                and unlocked inpatient bed turnover velocity across your {beds}-bed facility.
              </p>

              {/* Payback & Multiple Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-800 text-center relative z-10">
                <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-xs text-slate-400 font-medium">ROI Multiple</div>
                  <div className="text-lg sm:text-xl font-bold text-teal-300 mt-0.5 font-sans">
                    {calculations.roiMultiple}x
                  </div>
                  <div className="text-[10px] text-slate-400">Return on cost</div>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-xs text-slate-400 font-medium">Reclaimed Time</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5 font-sans">
                    {calculations.annualHoursSaved.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">Annual RN hours</div>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-xs text-slate-400 font-medium">LOS Avoided</div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5 font-sans">
                    {calculations.avoidableBedDaysSaved.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">Bed-days saved</div>
                </div>
              </div>
            </div>

            {/* Three Detailed Value Drivers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Driver 1: Nursing Shift Transition Capacity */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Bedside Handoffs
                  </div>
                  <div className="text-xl font-extrabold text-teal-800 font-sans mt-1">
                    {calculations.hoursPerRnAnnual} Hours
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Reclaimed per nurse per year. Eliminates manual transcribing with live FHIR R4 SBAR handoffs.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-teal-700">
                  Equivalent to ~${Math.round(calculations.capacityValue / 1000)}k clinical capacity
                </div>
              </div>

              {/* Driver 2: Overtime & Retention */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Overtime & Retention
                  </div>
                  <div className="text-xl font-extrabold text-emerald-700 font-sans mt-1">
                    ${Math.round(calculations.totalNursingBenefit / 1000)}k / yr
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Reduces end-of-shift charting lag and voluntary turnover related to documentation burnout.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                  52% drop in alert noise
                </div>
              </div>

              {/* Driver 3: Discharge Velocity & Bed Turnover */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center mb-3">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Discharge Velocity
                  </div>
                  <div className="text-xl font-extrabold text-blue-700 font-sans mt-1">
                    ${Math.round(calculations.bedCapacityValue / 1000)}k / yr
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    1.4-hour earlier daily discharge order placement. Frees afternoon capacity to cut ED boarding.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
                  ~0.45 avoidable days/10 admits
                </div>
              </div>
            </div>

            {/* Visual D3 Bar Chart: 3-Year Cost Savings vs. Operational Time Projection */}
            <RoiProjectionD3Chart
              totalAnnualValue={calculations.totalAnnualValue}
              annualHoursSaved={calculations.annualHoursSaved}
              capacityValue={calculations.capacityValue}
              totalNursingBenefit={calculations.totalNursingBenefit}
              bedCapacityValue={calculations.bedCapacityValue}
              estimatedAnnualCost={calculations.estimatedAnnualCost}
              hourlyRate={hourlyRate}
              rns={rns}
              beds={beds}
              projectionModel={projectionModel}
              onToggleProjectionModel={setProjectionModel}
            />

            {/* Side-by-Side Table: Current Manual Workflow Costs vs. CarePulse Optimized Workflow Costs */}
            <WorkflowCostComparisonTable
              beds={beds}
              rns={rns}
              admissions={admissions}
              hourlyRate={hourlyRate}
              projectionModel={projectionModel}
              calculations={calculations}
            />

            {/* Action Bar: Apply to Demo & Copy Summary & Download PDF */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <div className="font-semibold text-slate-800">Ready to review this modeling with our clinical informatics team?</div>
                <div>Download a board-ready executive PDF report or tailor the baseline assumptions in a live demonstration.</div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  id="btn-open-roi-pdf-modal"
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors cursor-pointer shadow-2xs"
                  title="Generate and download customized executive ROI summary report PDF"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Download ROI Report (PDF)</span>
                </button>

                <button
                  id="btn-copy-roi-summary"
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  title="Copy formatted summary to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>

                <button
                  id="btn-apply-roi-to-demo"
                  type="button"
                  onClick={handleApplyToDemo}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-xs cursor-pointer"
                >
                  <span>Attach ROI to Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Instant Download Feedback Banner */}
            {downloadedFileName && (
              <div 
                id="roi-download-success-banner"
                className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3.5 text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong>Personalized ROI Report Downloaded:</strong> <code className="bg-emerald-100/70 px-1 py-0.5 rounded font-mono text-[11px]">{downloadedFileName}</code>
                    <div className="text-[11px] text-emerald-800 mt-0.5">Ready to print or attach to hospital finance committee review packages.</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTriggerPdfDownload(false)}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                  >
                    Download Again
                  </button>
                  <button
                    onClick={() => setDownloadedFileName(null)}
                    className="text-emerald-600 hover:text-emerald-800 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Methodology & Regulatory Transparency Footnote */}
            <div className="text-[11px] text-slate-500 leading-relaxed bg-white border border-slate-100 rounded-lg p-3 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>Modeling Methodology & Disclaimers:</strong> Projections are calculated using customer-reported 
                benchmarks (median 28-min shift handoff time savings, 1.4-hour earlier discharge velocity, 1.5x overtime multiplier). 
                Financial outputs reflect operational cost mitigation and capacity reclamation estimates, not guaranteed clinical 
                reimbursement increases. CarePulse is a workflow orchestration platform and does not provide diagnostic 
                clinical judgment or replace licensed medical decision-making.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive ROI Report Customization & Download Modal */}
      {showPdfModal && (
        <div 
          id="roi-pdf-customization-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="roi-pdf-modal-title"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-teal-900 text-white p-5 sm:p-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-800 border border-teal-600/60 flex items-center justify-center text-teal-200 shrink-0">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 id="roi-pdf-modal-title" className="text-lg font-bold text-white font-sans">
                    Executive ROI Summary Report (PDF)
                  </h3>
                  <p className="text-xs text-teal-200 mt-0.5">
                    Personalized for health system C-suite, finance committees, and nursing executives.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPdfModal(false)}
                className="text-teal-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Snapshot Metrics Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2 flex items-center justify-between">
                  <span>Report Projections Preview ({projectionModel === 'aggressive' ? 'Aggressive Model' : 'Conservative Model'})</span>
                  <span className="text-teal-700 font-semibold">{beds} Beds • {rns} RNs</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-400">Net Annual Value</div>
                    <div className="text-sm font-bold text-teal-800 font-sans mt-0.5">
                      ${calculations.netAnnualReturn.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-400">ROI Multiple</div>
                    <div className="text-sm font-bold text-emerald-700 font-sans mt-0.5">
                      {calculations.roiMultiple}x Return
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-400">Payback Horizon</div>
                    <div className="text-sm font-bold text-slate-800 font-sans mt-0.5">
                      {calculations.paybackMonths} Months
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalization Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Health System / Hospital Name
                  </label>
                  <input
                    type="text"
                    value={customHospitalName}
                    onChange={(e) => setCustomHospitalName(e.target.value)}
                    placeholder="e.g. Memorial Regional Medical Center"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Displayed prominently on the executive report cover and headers.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prepared For (Executive Name)
                    </label>
                    <input
                      type="text"
                      value={customExecutiveName}
                      onChange={(e) => setCustomExecutiveName(e.target.value)}
                      placeholder="e.g. Dr. Sarah Reynolds, MD"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Title / Committee
                    </label>
                    <input
                      type="text"
                      value={customExecutiveTitle}
                      onChange={(e) => setCustomExecutiveTitle(e.target.value)}
                      placeholder="e.g. CFO / VP of Nursing"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Clinical Unit Scope
                  </label>
                  <input
                    type="text"
                    value={customUnitScope}
                    onChange={(e) => setCustomUnitScope(e.target.value)}
                    placeholder="e.g. Inpatient Med-Surg, Telemetry & ICU"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>
              </div>

              {/* Document Assurance Notice */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 space-y-1">
                <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  What's included in this Executive Report:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                  <li>Detailed financial breakdown across bedside handoffs, overtime, and discharge throughput</li>
                  <li>Blended RN compensation assumptions ($${hourlyRate}/hr) and {ehrSystem} FHIR R4 integration notes</li>
                  <li>Executive Committee signature & sign-off fields for governance review</li>
                  <li>HIPAA BAA & SOC 2 Type II compliance validation statements</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="text-xs font-semibold px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTriggerPdfDownload(true)}
                  disabled={isGeneratingPdf}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingPdf ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Generate & Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
