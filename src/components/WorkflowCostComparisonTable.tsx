import React, { useState } from 'react';
import { 
  Clock, 
  DollarSign, 
  Users, 
  BedDouble, 
  Server, 
  TrendingDown, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Info,
  Layers,
  ArrowDownRight
} from 'lucide-react';

export interface WorkflowCostComparisonTableProps {
  beds: number;
  rns: number;
  admissions: number;
  hourlyRate: number;
  projectionModel: 'conservative' | 'aggressive';
  calculations: {
    annualHoursSaved: number;
    hoursPerRnAnnual: number;
    capacityValue: number;
    overtimeSavings: number;
    estimatedTurnoverSavings: number;
    totalNursingBenefit: number;
    avoidableBedDaysSaved: number;
    bedCapacityValue: number;
    totalAnnualValue: number;
    estimatedAnnualCost: number;
    netAnnualReturn: number;
    roiMultiple: string;
    paybackMonths: string;
  };
}

export const WorkflowCostComparisonTable: React.FC<WorkflowCostComparisonTableProps> = ({
  beds,
  rns,
  admissions,
  hourlyRate,
  projectionModel,
  calculations,
}) => {
  const [viewUnit, setViewUnit] = useState<'total' | 'perBed' | 'perRn'>('total');

  const shiftsPerYearPerRn = 144;
  const totalRnShiftsAnnual = rns * shiftsPerYearPerRn;

  // 1. Shift Handoff & Transcription
  const manualHandoffCost = Math.round(totalRnShiftsAnnual * (45 / 60) * hourlyRate);
  const carePulseHandoffCost = Math.max(0, manualHandoffCost - calculations.capacityValue);
  const handoffSavings = calculations.capacityValue;

  // 2. Overtime & Delayed Charting
  const manualOvertimeCost = Math.round(totalRnShiftsAnnual * 0.35 * (35 / 60) * (hourlyRate * 1.5));
  const carePulseOvertimeCost = Math.max(0, manualOvertimeCost - calculations.overtimeSavings);
  const overtimeSavings = calculations.overtimeSavings;

  // 3. Nurse Turnover & Agency Backfill
  const manualTurnoverCost = Math.round(rns * 0.12 * 48000);
  const carePulseTurnoverCost = Math.max(0, manualTurnoverCost - calculations.estimatedTurnoverSavings);
  const turnoverSavings = calculations.estimatedTurnoverSavings;

  // 4. Inpatient Delay & Avoidable Bed-Days
  const manualBedCapacityCost = Math.round(admissions * 0.08 * 420);
  const carePulseBedCapacityCost = Math.max(0, manualBedCapacityCost - calculations.bedCapacityValue);
  const throughputSavings = calculations.bedCapacityValue;

  // 5. Software, Dictation & Paging Tech Stack
  const legacyToolingCost = Math.round(beds * 65 + rns * 40);
  const carePulseSoftwareCost = calculations.estimatedAnnualCost;
  const softwareDelta = legacyToolingCost - carePulseSoftwareCost;

  // Aggregate Totals
  const totalManualCost = manualHandoffCost + manualOvertimeCost + manualTurnoverCost + manualBedCapacityCost + legacyToolingCost;
  const totalCarePulseCost = carePulseHandoffCost + carePulseOvertimeCost + carePulseTurnoverCost + carePulseBedCapacityCost + carePulseSoftwareCost;
  const netAnnualAdvantage = totalManualCost - totalCarePulseCost;
  const costReductionPct = totalManualCost > 0 ? ((netAnnualAdvantage / totalManualCost) * 100).toFixed(1) : '0';

  // Helper formatter based on selected viewUnit
  const formatCost = (val: number) => {
    let normalized = val;
    if (viewUnit === 'perBed') {
      normalized = beds > 0 ? val / beds : val;
    } else if (viewUnit === 'perRn') {
      normalized = rns > 0 ? val / rns : val;
    }

    if (viewUnit === 'total') {
      if (Math.abs(normalized) >= 1000000) {
        return `$${(normalized / 1000000).toFixed(2)}M`;
      }
      return `$${Math.round(normalized).toLocaleString()}`;
    }
    return `$${Math.round(normalized).toLocaleString()}`;
  };

  const workflowItems = [
    {
      id: 'handoff',
      title: 'Shift Handoff & Verbal Transcription',
      icon: Clock,
      iconBg: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Paper sheets, fragmented verbal dictations, and duplicate EHR note transcription.',
      manualMetric: '45 mins / RN shift',
      manualCost: manualHandoffCost,
      optimizedMetric: `${Math.max(12, Math.round(45 - (28 * (projectionModel === 'aggressive' ? 1.25 : 0.85))))} mins / RN shift`,
      optimizedCost: carePulseHandoffCost,
      savings: handoffSavings,
      badge: 'Live FHIR SBAR Handoff',
    },
    {
      id: 'overtime',
      title: 'End-of-Shift Charting Overtime',
      icon: DollarSign,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Unscheduled shift overruns clocked to finish patient summaries and medication logs.',
      manualMetric: '35% shifts incur ~35 min OT',
      manualCost: manualOvertimeCost,
      optimizedMetric: '15% shifts incur ~15 min OT',
      optimizedCost: carePulseOvertimeCost,
      savings: overtimeSavings,
      badge: 'Real-time Ambient Sync',
    },
    {
      id: 'turnover',
      title: 'Burnout-Induced RN Voluntary Turnover',
      icon: Users,
      iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'RN recruitment, temporary travel nurse premiums, and 12-week clinical orientation.',
      manualMetric: '12% baseline RN turnover ($48k/hire)',
      manualCost: manualTurnoverCost,
      optimizedMetric: `${(12 * (1 - 0.19 * (projectionModel === 'aggressive' ? 1.25 : 0.85))).toFixed(1)}% mitigated RN turnover`,
      optimizedCost: carePulseTurnoverCost,
      savings: turnoverSavings,
      badge: '19% Burnout Mitigation',
    },
    {
      id: 'throughput',
      title: 'Discharge Delays & Avoidable Bed-Days',
      icon: BedDouble,
      iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Late discharge order placement causing surgical delays and ED boarding gridlock.',
      manualMetric: '0.08 avoidable days/admit ($420/day)',
      manualCost: manualBedCapacityCost,
      optimizedMetric: `${(0.08 - (0.045 * (projectionModel === 'aggressive' ? 1.25 : 0.85))).toFixed(3)} avoidable days/admit`,
      optimizedCost: carePulseBedCapacityCost,
      savings: throughputSavings,
      badge: '1.4h Earlier Discharge',
    },
    {
      id: 'technology',
      title: 'Legacy Paging & Dictation Subscriptions',
      icon: Server,
      iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
      description: 'Fragmented one-way pager systems, paper disposal compliance, and desktop plug-ins.',
      manualMetric: 'Legacy fragmented subscriptions',
      manualCost: legacyToolingCost,
      optimizedMetric: 'CarePulse Enterprise Cloud Platform',
      optimizedCost: carePulseSoftwareCost,
      savings: softwareDelta,
      isInvestment: true,
      badge: 'All-in-One Cloud SaaS',
    },
  ];

  return (
    <div 
      id="workflow-cost-comparison"
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mt-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              <Layers className="w-3.5 h-3.5 text-teal-700" />
              <span>Workflow Financial Matrix</span>
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              projectionModel === 'aggressive'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-teal-100 text-teal-900 border border-teal-300'
            }`}>
              {projectionModel === 'aggressive' ? (
                <>
                  <Zap className="w-3 h-3 text-amber-600" />
                  <span>Aggressive Projections</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3 h-3 text-teal-700" />
                  <span>Conservative Projections</span>
                </>
              )}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
            Current Manual Workflow Costs vs. CarePulse Optimized Workflow Costs
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct operational comparison across clinical shift handoffs, charting overtime, nurse retention, and inpatient bed throughput based on your facility's {beds} staffed beds and {rns} RNs.
          </p>
        </div>

        {/* View Unit Switcher (Total vs Per Bed vs Per RN) */}
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setViewUnit('total')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              viewUnit === 'total'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Total Hospital
          </button>
          <button
            type="button"
            onClick={() => setViewUnit('perBed')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              viewUnit === 'perBed'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Per Staffed Bed
          </button>
          <button
            type="button"
            onClick={() => setViewUnit('perRn')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              viewUnit === 'perRn'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Per Bedside RN
          </button>
        </div>
      </div>

      {/* Side-by-Side Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="py-3 px-3 font-bold w-[34%]">Operational Domain & Cost Driver</th>
              <th className="py-3 px-3 font-bold w-[23%] bg-slate-50/70 border-x border-slate-200 text-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span>Current Manual Workflow</span>
                </div>
              </th>
              <th className="py-3 px-3 font-bold w-[23%] bg-teal-50/60 border-r border-slate-200 text-teal-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  <span>CarePulse Optimized</span>
                </div>
              </th>
              <th className="py-3 px-3 font-bold w-[20%] text-emerald-800 bg-emerald-50/40">
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Annual Delta</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {workflowItems.map((item) => {
              const Icon = item.icon;
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Domain & Description */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${item.iconBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-[13px]">{item.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.description}</div>
                        <div className="mt-1">
                          <span className="inline-block text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Current Manual Workflow */}
                  <td className="py-3.5 px-3 bg-slate-50/40 border-x border-slate-200">
                    <div className="font-bold text-slate-900 font-sans text-sm">
                      {formatCost(item.manualCost)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {item.manualMetric}
                    </div>
                  </td>

                  {/* CarePulse Optimized Workflow */}
                  <td className="py-3.5 px-3 bg-teal-50/30 border-r border-slate-200">
                    <div className="font-bold text-teal-900 font-sans text-sm">
                      {formatCost(item.optimizedCost)}
                    </div>
                    <div className="text-[11px] text-teal-700 mt-0.5 font-medium">
                      {item.optimizedMetric}
                    </div>
                  </td>

                  {/* Annual Impact / Delta */}
                  <td className="py-3.5 px-3 bg-emerald-50/20">
                    {item.isInvestment ? (
                      <div>
                        <span className="font-bold text-slate-700 font-sans text-sm">
                          -${formatCost(item.optimizedCost - item.manualCost).replace('$-', '$')}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          SaaS platform investment
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="inline-flex items-center gap-1 font-bold text-emerald-700 font-sans text-sm">
                          <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                          <span>+{formatCost(item.savings)}</span>
                        </div>
                        <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                          {item.manualCost > 0 ? `${((item.savings / item.manualCost) * 100).toFixed(0)}% cost reduction` : ''}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Footer Total Comparison */}
          <tfoot>
            <tr className="border-t-2 border-slate-300 bg-slate-100/70 font-bold text-xs">
              <td className="py-4 px-3 text-slate-900">
                <div className="text-sm font-extrabold font-sans">
                  Total Annual Operational Cost
                </div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                  Combined nursing workflow, turnover mitigation, bed capacity, and technology licenses
                </div>
              </td>
              <td className="py-4 px-3 border-x border-slate-200 bg-slate-100 font-sans">
                <div className="text-base sm:text-lg font-extrabold text-slate-900">
                  {formatCost(totalManualCost)}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Manual Baseline
                </div>
              </td>
              <td className="py-4 px-3 border-r border-slate-200 bg-teal-100/60 font-sans">
                <div className="text-base sm:text-lg font-extrabold text-teal-950">
                  {formatCost(totalCarePulseCost)}
                </div>
                <div className="text-[10px] text-teal-800 uppercase tracking-wider font-semibold">
                  Optimized ({costReductionPct}% lower)
                </div>
              </td>
              <td className="py-4 px-3 bg-emerald-100/60 font-sans">
                <div className="text-base sm:text-lg font-extrabold text-emerald-800">
                  +{formatCost(netAnnualAdvantage)}
                </div>
                <div className="text-[10px] text-emerald-700 uppercase tracking-wider font-bold">
                  Net Annual Benefit
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Highlights & Financial Summary Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-teal-700" />
          </div>
          <div>
            <div className="font-bold text-slate-800">Gross Efficiency Dividend</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              ${(calculations.totalAnnualValue / 1000000).toFixed(2)}M in gross bedside capacity, overtime reduction, and bed throughput savings.
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="font-bold text-slate-800">Net Operating Return</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              ${(calculations.netAnnualReturn / 1000000).toFixed(2)}M net annual return after factoring platform subscription investment.
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-indigo-700" />
          </div>
          <div>
            <div className="font-bold text-slate-800">Rapid Payback Horizon</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Full break-even reached in <span className="font-bold text-teal-800">{calculations.paybackMonths} months</span> ({calculations.roiMultiple}x ROI multiple).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
