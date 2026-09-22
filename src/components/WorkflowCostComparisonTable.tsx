import React, { useState, useEffect } from 'react';
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
  ArrowDownRight,
  HelpCircle,
  X,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText
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
    projectedEfficiencyGainsPct?: number;
    estimatedFteReduction?: number;
    estimatedFteStandard?: number;
  };
}

interface TooltipDataPoint {
  label: string;
  value: string;
  sub?: string;
}

interface RowTooltipInfo {
  title: string;
  badge: string;
  badgeColor: string;
  formula: string;
  dataPoints: TooltipDataPoint[];
  annualTotal: string;
  benchmarkSource: string;
  explanation: string;
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
  
  // Interactive Tooltip State
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);
  const [pinnedTooltipId, setPinnedTooltipId] = useState<string | null>(null);
  
  // Expandable inline calculation audit drawer
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // Close tooltips on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.calc-tooltip-container')) {
        setActiveTooltipId(null);
        setPinnedTooltipId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTooltipId(null);
        setPinnedTooltipId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const scenarioMultiplier = projectionModel === 'aggressive' ? 1.25 : 0.85;

  // Detailed Data Points for each row
  const workflowItems: Array<{
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    iconBg: string;
    description: string;
    manualMetric: string;
    manualCost: number;
    optimizedMetric: string;
    optimizedCost: number;
    savings: number;
    isInvestment?: boolean;
    badge: string;
    manualTooltip: RowTooltipInfo;
    optimizedTooltip: RowTooltipInfo;
    deltaTooltip: {
      title: string;
      formula: string;
      explanation: string;
    };
  }> = [
    {
      id: 'handoff',
      title: 'Shift Handoff & Verbal Transcription',
      icon: Clock,
      iconBg: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Paper sheets, fragmented verbal dictations, and duplicate EHR note transcription.',
      manualMetric: '45 mins / RN shift',
      manualCost: manualHandoffCost,
      optimizedMetric: `${Math.max(12, Math.round(45 - (28 * scenarioMultiplier)))} mins / RN shift`,
      optimizedCost: carePulseHandoffCost,
      savings: handoffSavings,
      badge: 'Live FHIR SBAR Handoff',
      manualTooltip: {
        title: 'Manual Shift Handoff Baseline',
        badge: 'Baseline Cost Driver',
        badgeColor: 'bg-slate-700 text-slate-200',
        formula: `${totalRnShiftsAnnual.toLocaleString()} RN Shifts × 0.75 hrs (45 min) × $${hourlyRate}/hr`,
        dataPoints: [
          { label: 'Bedside RN Staffing', value: `${rns} nurses`, sub: 'Current model headcount' },
          { label: 'Shifts per RN / Year', value: '144 shifts', sub: '36 hrs/wk in 12-hour shifts' },
          { label: 'Total RN Shifts / Year', value: `${totalRnShiftsAnnual.toLocaleString()} shifts`, sub: 'Total shift transitions' },
          { label: 'Handoff Duration', value: '45 mins (0.75 hrs)', sub: 'Per nurse per shift transition' },
          { label: 'Blended RN Compensation', value: `$${hourlyRate}.00 / hr`, sub: 'Salary + direct clinical benefits' },
        ],
        annualTotal: `$${manualHandoffCost.toLocaleString()} / year`,
        benchmarkSource: 'AHRQ & Joint Commission Inpatient Handoff Communication Studies',
        explanation: 'Reflects total annual nurse compensation spent preparing, printing, and verbally delivering redundant shift change reports.'
      },
      optimizedTooltip: {
        title: 'CarePulse Optimized Handoff',
        badge: 'Optimized Workflow',
        badgeColor: 'bg-teal-900 text-teal-200',
        formula: `Manual Baseline ($${manualHandoffCost.toLocaleString()}) - Reclaimed Capacity ($${handoffSavings.toLocaleString()})`,
        dataPoints: [
          { label: 'Optimized Handoff Time', value: `~${Math.max(12, Math.round(45 - (28 * scenarioMultiplier)))} mins / shift`, sub: '28 min automated reduction' },
          { label: 'Annual Hours Reclaimed', value: `${calculations.annualHoursSaved.toLocaleString()} hrs / yr`, sub: `${calculations.hoursPerRnAnnual} hrs reclaimed per nurse` },
          { label: 'Reclaimed Capacity Value', value: `$${handoffSavings.toLocaleString()} / yr`, sub: 'Direct bedside clinical capacity' },
          { label: 'Scenario Velocity', value: `${projectionModel === 'aggressive' ? 'Aggressive (1.25x)' : 'Conservative (0.85x)'}`, sub: 'Multiplied adoption model' },
        ],
        annualTotal: `$${carePulseHandoffCost.toLocaleString()} / year`,
        benchmarkSource: 'FHIR R4 Inpatient Interoperability & Automated SBAR Benchmarks',
        explanation: 'Bi-directional EHR integration synthesizes patient histories, pending labs, and vital trends automatically, cutting handoff latency by over 60%.'
      },
      deltaTooltip: {
        title: 'Shift Handoff Capacity Dividend',
        formula: `+$${handoffSavings.toLocaleString()} annual capacity reclaimed (${((handoffSavings / manualHandoffCost) * 100).toFixed(0)}% cost reduction)`,
        explanation: 'Returns 28 minutes of productive care time per nurse per shift back to bedside care without staffing increases.'
      }
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
      manualTooltip: {
        title: 'Manual Charting Overtime Baseline',
        badge: 'Baseline Cost Driver',
        badgeColor: 'bg-slate-700 text-slate-200',
        formula: `${totalRnShiftsAnnual.toLocaleString()} Shifts × 35% OT Rate × 0.583 hrs × $${(hourlyRate * 1.5).toFixed(2)}/hr (1.5x)`,
        dataPoints: [
          { label: 'Total Annual RN Shifts', value: `${totalRnShiftsAnnual.toLocaleString()} shifts`, sub: 'Across facility nursing units' },
          { label: 'Overtime Shift Incurrence', value: '35% of shifts', sub: `${Math.round(totalRnShiftsAnnual * 0.35).toLocaleString()} shifts with overtime` },
          { label: 'Average Overtime Duration', value: '35 mins (0.583 hrs)', sub: 'Post-shift delayed documentation' },
          { label: 'Overtime Compensation Rate', value: `$${(hourlyRate * 1.5).toFixed(2)} / hr`, sub: '1.5x blended wage multiplier' },
        ],
        annualTotal: `$${manualOvertimeCost.toLocaleString()} / year`,
        benchmarkSource: 'American Nurses Association (ANA) & HFMA Overtime Documentation Audits',
        explanation: 'Quantifies premium 1.5x overtime wages paid when nurses remain past 12-hour shifts to catch up on EHR documentation backlogs.'
      },
      optimizedTooltip: {
        title: 'CarePulse Charting Overtime Reduction',
        badge: 'Optimized Workflow',
        badgeColor: 'bg-emerald-900 text-emerald-200',
        formula: `Manual Overtime ($${manualOvertimeCost.toLocaleString()}) - Overtime Avoidance ($${overtimeSavings.toLocaleString()})`,
        dataPoints: [
          { label: 'Target Overtime Incurrence', value: '15% of shifts', sub: 'Down from 35% baseline' },
          { label: 'Target Overtime Duration', value: '~15 mins / occurrence', sub: 'Down from 35 mins baseline' },
          { label: 'Overtime Spend Avoided', value: `$${overtimeSavings.toLocaleString()} / yr`, sub: 'Eliminated premium labor cost' },
          { label: 'Residual Overtime Expense', value: `$${carePulseOvertimeCost.toLocaleString()} / yr`, sub: 'Controlled variance reserve' },
        ],
        annualTotal: `$${carePulseOvertimeCost.toLocaleString()} / year`,
        benchmarkSource: 'Inpatient Ambient Charting Clinical Study (2024)',
        explanation: 'Ambient clinical voice capture and continuous bedside flowsheet updates allow nurses to chart concurrently during patient rounds.'
      },
      deltaTooltip: {
        title: 'Overtime Expenditure Reduction',
        formula: `+$${overtimeSavings.toLocaleString()} annual premium labor saved (${((overtimeSavings / manualOvertimeCost) * 100).toFixed(0)}% reduction)`,
        explanation: 'Direct cash savings by eliminating end-of-shift documentation bottlenecks and administrative shift overruns.'
      }
    },
    {
      id: 'turnover',
      title: 'Burnout-Induced RN Voluntary Turnover',
      icon: Users,
      iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'RN recruitment, temporary travel nurse premiums, and 12-week clinical orientation.',
      manualMetric: '12% baseline RN turnover ($48k/hire)',
      manualCost: manualTurnoverCost,
      optimizedMetric: `${(12 * (1 - 0.19 * scenarioMultiplier)).toFixed(1)}% mitigated RN turnover`,
      optimizedCost: carePulseTurnoverCost,
      savings: turnoverSavings,
      badge: '19% Burnout Mitigation',
      manualTooltip: {
        title: 'Manual RN Voluntary Turnover Cost',
        badge: 'Baseline Cost Driver',
        badgeColor: 'bg-slate-700 text-slate-200',
        formula: `${rns} Bedside RNs × 12.0% Turnover Rate × $48,000 Replacement Cost`,
        dataPoints: [
          { label: 'Bedside RN Headcount', value: `${rns} nurses`, sub: 'Current modeled nurse staff' },
          { label: 'Baseline Annual Turnover', value: '12.0% / year', sub: 'National acute care hospital benchmark' },
          { label: 'Annual Nurse Departures', value: `${Number((rns * 0.12).toFixed(1))} departures`, sub: 'Voluntary nurse turnover events' },
          { label: 'Replacement Cost per Nurse', value: '$48,000 / nurse', sub: 'Recruiter fees, agency backfill, training' },
        ],
        annualTotal: `$${manualTurnoverCost.toLocaleString()} / year`,
        benchmarkSource: 'NSI National Healthcare Retention & RN Staffing Report (2024)',
        explanation: 'Accounts for recruitment advertising, temporary travel nurse replacement premiums, credentialing, and 12 weeks of preceptor onboarding.'
      },
      optimizedTooltip: {
        title: 'CarePulse RN Retention & Burnout Relief',
        badge: 'Optimized Workflow',
        badgeColor: 'bg-purple-900 text-purple-200',
        formula: `Manual Turnover ($${manualTurnoverCost.toLocaleString()}) - Retention Savings ($${turnoverSavings.toLocaleString()})`,
        dataPoints: [
          { label: 'Mitigated Turnover Rate', value: `${(12 * (1 - 0.19 * scenarioMultiplier)).toFixed(1)}% / yr`, sub: '19% relative attrition reduction' },
          { label: 'Retained Bedside Nurses', value: `~${Number((rns * 0.12 * 0.19 * scenarioMultiplier).toFixed(1))} RNs retained`, sub: 'Kept at facility bedside' },
          { label: 'Direct Retention Savings', value: `$${turnoverSavings.toLocaleString()} / yr`, sub: 'Avoided replacement expenses' },
          { label: 'Institutional Knowledge', value: 'High retention stability', sub: 'Reduced travel nurse dependency' },
        ],
        annualTotal: `$${carePulseTurnoverCost.toLocaleString()} / year`,
        benchmarkSource: 'Advisory Board Nurse Retention & EHR Administrative Friction Survey',
        explanation: 'Relieving daily documentation fatigue and shift overruns eliminates the #1 cited driver of voluntary bedside nurse resignations.'
      },
      deltaTooltip: {
        title: 'Nurse Retention & Recruitment Savings',
        formula: `+$${turnoverSavings.toLocaleString()} annual retention value (${((turnoverSavings / manualTurnoverCost) * 100).toFixed(0)}% turnover cost reduction)`,
        explanation: 'Protects hospital operating margins by stabilizing core bedside nurse teams and reducing reliance on temporary travel nurses.'
      }
    },
    {
      id: 'throughput',
      title: 'Discharge Delays & Avoidable Bed-Days',
      icon: BedDouble,
      iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Late discharge order placement causing surgical delays and ED boarding gridlock.',
      manualMetric: '0.08 avoidable days/admit ($420/day)',
      manualCost: manualBedCapacityCost,
      optimizedMetric: `${(0.08 - (0.045 * scenarioMultiplier)).toFixed(3)} avoidable days/admit`,
      optimizedCost: carePulseBedCapacityCost,
      savings: throughputSavings,
      badge: '1.4h Earlier Discharge',
      manualTooltip: {
        title: 'Manual Inpatient Discharge Delay Cost',
        badge: 'Baseline Cost Driver',
        badgeColor: 'bg-slate-700 text-slate-200',
        formula: `${admissions.toLocaleString()} Admissions × 0.08 Avoidable Days × $420 Direct Room Cost`,
        dataPoints: [
          { label: 'Annual Facility Admissions', value: `${admissions.toLocaleString()} admits`, sub: 'Inpatient hospital volume' },
          { label: 'Avoidable Excess Bed-Days', value: '0.08 days / admit', sub: '1 avoidable day per 12.5 admissions' },
          { label: 'Total Avoidable Days Lost', value: `${Math.round(admissions * 0.08).toLocaleString()} days / yr`, sub: 'Due to afternoon discharge delays' },
          { label: 'Direct Variable Cost / Day', value: '$420 / day', sub: 'Room, ancillary supplies, and staffing' },
        ],
        annualTotal: `$${manualBedCapacityCost.toLocaleString()} / year`,
        benchmarkSource: 'Institute for Healthcare Improvement (IHI) & AHA Throughput Models',
        explanation: 'Direct operational expenses incurred when patients remain in hospital beds past clinical readiness due to transport, DME, or pharmacy delays.'
      },
      optimizedTooltip: {
        title: 'CarePulse Bed Throughput Acceleration',
        badge: 'Optimized Workflow',
        badgeColor: 'bg-blue-900 text-blue-200',
        formula: `Manual Delay Cost ($${manualBedCapacityCost.toLocaleString()}) - Throughput Value ($${throughputSavings.toLocaleString()})`,
        dataPoints: [
          { label: 'Earlier Discharge Placement', value: '1.4 hours earlier', sub: 'Median placement moved to 1:05 PM' },
          { label: 'Avoidable Bed-Days Saved', value: `${calculations.avoidableBedDaysSaved.toLocaleString()} days / yr`, sub: 'Reclaimed inpatient capacity' },
          { label: 'Capacity Value Unlocked', value: `$${throughputSavings.toLocaleString()} / yr`, sub: 'Unblocks ED boarding & transfers' },
          { label: 'Afternoon Bed Readiness', value: '+32% availability', sub: 'Earlier surgical intake' },
        ],
        annualTotal: `$${carePulseBedCapacityCost.toLocaleString()} / year`,
        benchmarkSource: 'Multidisciplinary Inpatient Progression & Throughput Cohort (2024)',
        explanation: 'Synchronized patient progression board resolves discharge barriers 24-48 hours ahead of time, freeing beds for afternoon emergency intake.'
      },
      deltaTooltip: {
        title: 'Inpatient Bed Capacity & Throughput Value',
        formula: `+$${throughputSavings.toLocaleString()} annual capacity unlocked (${((throughputSavings / manualBedCapacityCost) * 100).toFixed(0)}% delay cost reduction)`,
        explanation: 'Enables higher surgical intake and cuts emergency department boarding hours without expanding physical facility footprint.'
      }
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
      manualTooltip: {
        title: 'Current Legacy Technology Tooling',
        badge: 'Baseline Subscriptions',
        badgeColor: 'bg-slate-700 text-slate-200',
        formula: `(${beds} Staffed Beds × $65/bed) + (${rns} Bedside RNs × $40/RN)`,
        dataPoints: [
          { label: 'Staffed Beds Hardware Fee', value: `$${(beds * 65).toLocaleString()} / yr`, sub: `${beds} beds × $65 (pagers & transmitters)` },
          { label: 'Nurse Software / Plugins', value: `$${(rns * 40).toLocaleString()} / yr`, sub: `${rns} RNs × $40 (desktop dictation add-ons)` },
          { label: 'Included Tooling Scope', value: 'Fragmented point tools', sub: 'Paging, desktop speech, paper shredding' },
          { label: 'Maintenance Overheads', value: 'High vendor fragmentation', sub: 'Multiple vendor contracts and APIs' },
        ],
        annualTotal: `$${legacyToolingCost.toLocaleString()} / year`,
        benchmarkSource: 'Healthcare Information Management Systems (HIMSS) Tooling Audits',
        explanation: 'Existing enterprise contracts spent across separate legacy communication pagers, paper shredding compliance, and point-solution dictation tools.'
      },
      optimizedTooltip: {
        title: 'CarePulse Enterprise SaaS Subscription',
        badge: 'Platform Investment',
        badgeColor: 'bg-indigo-900 text-indigo-200',
        formula: `Annual Enterprise Platform Subscription based on ${beds} Staffed Beds`,
        dataPoints: [
          { label: 'Facility Sizing Tier', value: `${beds} staffed beds`, sub: 'Inpatient capacity tier' },
          { label: 'Annual Platform Investment', value: `$${carePulseSoftwareCost.toLocaleString()} / yr`, sub: 'All-inclusive enterprise subscription' },
          { label: 'Included Capabilities', value: 'Full platform suite', sub: 'Unlimited users, bi-directional FHIR, ambient AI' },
          { label: 'Vendor Consolidation', value: 'Replaces 4+ legacy tools', sub: 'Unified clinical communication & workflows' },
        ],
        annualTotal: `$${carePulseSoftwareCost.toLocaleString()} / year`,
        benchmarkSource: 'CarePulse Enterprise SaaS Tier Agreement (HIPAA BAA & 24/7 SLA)',
        explanation: 'Turnkey cloud platform consolidating mobile SBAR handoffs, ambient clinical documentation, live milestone boards, and EHR connectors.'
      },
      deltaTooltip: {
        title: 'Software Investment & Consolidation',
        formula: `-$${formatCost(carePulseSoftwareCost - legacyToolingCost).replace('$-', '$')} annual investment net of legacy tool displacement`,
        explanation: `Consolidates legacy pager and dictation tools into an enterprise platform delivering a ${calculations.roiMultiple}x net ROI multiple.`
      }
    },
  ];

  // Helper function to toggle or pin tooltips
  const handleTooltipClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pinnedTooltipId === id) {
      setPinnedTooltipId(null);
      setActiveTooltipId(null);
    } else {
      setPinnedTooltipId(id);
      setActiveTooltipId(id);
    }
  };

  const handleTooltipMouseEnter = (id: string) => {
    if (!pinnedTooltipId) {
      setActiveTooltipId(id);
    }
  };

  const handleTooltipMouseLeave = (id: string) => {
    if (!pinnedTooltipId) {
      setActiveTooltipId(null);
    }
  };

  // Reusable Tooltip Popover Component
  const renderTooltipPopover = (
    tooltip: RowTooltipInfo,
    tooltipKey: string,
    placement: 'top' | 'bottom' = 'bottom',
    alignment: 'left' | 'right' | 'center' = 'left'
  ) => {
    const isVisible = activeTooltipId === tooltipKey || pinnedTooltipId === tooltipKey;
    if (!isVisible) return null;

    const placementClass = placement === 'top' 
      ? 'bottom-full mb-2.5' 
      : 'top-full mt-2.5';
    
    const alignClass = alignment === 'right'
      ? 'right-0 sm:right-auto sm:-left-32'
      : alignment === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';

    return (
      <div 
        role="tooltip"
        className={`calc-tooltip-container absolute ${placementClass} ${alignClass} w-76 sm:w-84 z-50 bg-slate-900 text-slate-100 p-4 rounded-xl shadow-2xl border border-slate-700/90 text-left transition-all animate-in fade-in zoom-in-95 duration-150`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase ${tooltip.badgeColor}`}>
                {tooltip.badge}
              </span>
              {pinnedTooltipId === tooltipKey && (
                <span className="text-[10px] text-teal-400 font-medium">Pinned</span>
              )}
            </div>
            <h5 className="font-bold text-slate-100 text-xs sm:text-sm font-sans leading-tight">
              {tooltip.title}
            </h5>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPinnedTooltipId(null);
              setActiveTooltipId(null);
            }}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close calculation tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Formula Bar */}
        <div className="bg-slate-800/90 rounded-lg p-2.5 border border-slate-700/70 mb-3">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calculator className="w-3 h-3 text-teal-400" />
            <span>Calculation Formula</span>
          </div>
          <div className="font-mono text-[11px] text-teal-300 font-bold leading-relaxed break-words">
            {tooltip.formula}
          </div>
        </div>

        {/* Contributing Data Points */}
        <div className="mb-3">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-400" />
            <span>Contributing Data Points ({beds} Beds | {rns} RNs)</span>
          </div>
          <div className="space-y-1.5 bg-slate-950/60 rounded-lg p-2 border border-slate-800/80">
            {tooltip.dataPoints.map((dp, idx) => (
              <div key={idx} className="flex items-baseline justify-between text-[11px] gap-2">
                <span className="text-slate-400 truncate">{dp.label}:</span>
                <span className="font-bold text-slate-200 font-mono text-right shrink-0">{dp.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Output & Rationale */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400 font-medium">Calculated Annual Amount:</span>
          <span className="font-extrabold text-emerald-400 font-mono text-sm">{tooltip.annualTotal}</span>
        </div>

        <p className="text-[11px] text-slate-400 leading-snug mb-2">
          {tooltip.explanation}
        </p>

        {/* Benchmark Citation */}
        <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800 flex items-center gap-1">
          <FileText className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">Source: {tooltip.benchmarkSource}</span>
        </div>
      </div>
    );
  };

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

          <h4 className="text-base sm:text-lg font-bold text-slate-900 font-sans flex items-center gap-2">
            <span>Current Manual Workflow Costs vs. CarePulse Optimized Workflow Costs</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct operational comparison across clinical shift handoffs, charting overtime, nurse retention, and inpatient bed throughput. Hover or click any <Info className="w-3 h-3 inline text-teal-700 mx-0.5" /> icon to audit contributing data points and formulas.
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
              <th className="py-3 px-3 font-bold w-[32%]">
                <div className="flex items-center gap-1.5">
                  <span>Operational Domain & Cost Driver</span>
                </div>
              </th>
              
              {/* Header: Current Manual Workflow */}
              <th className="py-3 px-3 font-bold w-[24%] bg-slate-50/70 border-x border-slate-200 text-slate-700 relative">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Current Manual Workflow</span>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => handleTooltipClick('header-manual', e)}
                      onMouseEnter={() => handleTooltipMouseEnter('header-manual')}
                      onMouseLeave={() => handleTooltipMouseLeave('header-manual')}
                      aria-label="Explain Current Manual Workflow column methodology"
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    {renderTooltipPopover(
                      {
                        title: 'Manual Operational Baseline Methodology',
                        badge: 'Baseline Accounting',
                        badgeColor: 'bg-slate-700 text-slate-200',
                        formula: 'Sum of (RN Handoff Time + Overtime Pay + Voluntary Turnover + Avoidable Bed Delays + Legacy Subscriptions)',
                        dataPoints: [
                          { label: 'Staffed Beds Base', value: `${beds} beds` },
                          { label: 'Bedside RN Staffing', value: `${rns} nurses` },
                          { label: 'Annual Admissions', value: `${admissions.toLocaleString()} admits` },
                          { label: 'Blended RN Hourly Rate', value: `$${hourlyRate}/hr` },
                        ],
                        annualTotal: `$${totalManualCost.toLocaleString()} / year`,
                        benchmarkSource: 'HFMA, AHRQ, and NSI Inpatient Accounting Standards',
                        explanation: 'Represents your hospital\'s existing annual operational spend across clinical documentation latency, post-shift overtime, nurse turnover, and throughput bottlenecks.'
                      },
                      'header-manual',
                      'bottom',
                      'left'
                    )}
                  </div>
                </div>
              </th>

              {/* Header: CarePulse Optimized */}
              <th className="py-3 px-3 font-bold w-[24%] bg-teal-50/60 border-r border-slate-200 text-teal-900 relative">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span>CarePulse Optimized</span>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => handleTooltipClick('header-optimized', e)}
                      onMouseEnter={() => handleTooltipMouseEnter('header-optimized')}
                      onMouseLeave={() => handleTooltipMouseLeave('header-optimized')}
                      aria-label="Explain CarePulse Optimized column methodology"
                      className="p-1 rounded-md text-teal-700 hover:text-teal-900 hover:bg-teal-100/60 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    {renderTooltipPopover(
                      {
                        title: 'CarePulse Optimization Methodology',
                        badge: 'CarePulse Projection',
                        badgeColor: 'bg-teal-900 text-teal-200',
                        formula: 'Manual Baseline Costs - Direct Quantified Efficiencies + Enterprise SaaS Licensing',
                        dataPoints: [
                          { label: 'Handoff Acceleration', value: '28 min reduction / shift' },
                          { label: 'Overtime Frequency', value: 'Reduced from 35% to 15%' },
                          { label: 'Turnover Reduction', value: '19% relative burnout mitigation' },
                          { label: 'Discharge Velocity', value: '1.4 hours earlier in day' },
                        ],
                        annualTotal: `$${totalCarePulseCost.toLocaleString()} / year`,
                        benchmarkSource: 'CarePulse Acute Care Validated Health System Cohort',
                        explanation: 'Captures the transformed operating cost after deploying automated FHIR SBAR synthesis, ambient clinical notes, and multidisciplinary patient progression boards.'
                      },
                      'header-optimized',
                      'bottom',
                      'right'
                    )}
                  </div>
                </div>
              </th>

              {/* Header: Annual Delta */}
              <th className="py-3 px-3 font-bold w-[20%] text-emerald-800 bg-emerald-50/40">
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Annual Delta</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {workflowItems.map((item, index) => {
              const Icon = item.icon;
              const isExpanded = expandedRowId === item.id;
              // Tooltip placement: top rows drop down, bottom rows pop up
              const tooltipPlacement: 'top' | 'bottom' = index >= 2 ? 'top' : 'bottom';

              return (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    {/* Domain & Description */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${item.iconBg}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-xs sm:text-[13px]">{item.title}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.description}</div>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="inline-block text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-md">
                              {item.badge}
                            </span>
                            <button
                              type="button"
                              onClick={() => setExpandedRowId(isExpanded ? null : item.id)}
                              className="text-[10px] font-semibold text-slate-500 hover:text-teal-700 flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide Data Points' : 'Inspect Data Points'}</span>
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Current Manual Workflow Cell with Tooltip */}
                    <td className="py-3.5 px-3 bg-slate-50/40 border-x border-slate-200 relative">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="font-bold text-slate-900 font-sans text-sm">
                          {formatCost(item.manualCost)}
                        </div>
                        {/* Tooltip trigger button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => handleTooltipClick(`manual-${item.id}`, e)}
                            onMouseEnter={() => handleTooltipMouseEnter(`manual-${item.id}`)}
                            onMouseLeave={() => handleTooltipMouseLeave(`manual-${item.id}`)}
                            aria-label={`View data points for ${item.title} manual cost`}
                            className={`p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-all cursor-pointer ${
                              pinnedTooltipId === `manual-${item.id}` ? 'bg-slate-200 text-slate-800 ring-2 ring-slate-400' : ''
                            }`}
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                          {renderTooltipPopover(
                            item.manualTooltip,
                            `manual-${item.id}`,
                            tooltipPlacement,
                            'left'
                          )}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-medium flex items-center gap-1">
                        <span>{item.manualMetric}</span>
                      </div>
                    </td>

                    {/* CarePulse Optimized Workflow Cell with Tooltip */}
                    <td className="py-3.5 px-3 bg-teal-50/30 border-r border-slate-200 relative">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="font-bold text-teal-900 font-sans text-sm">
                          {formatCost(item.optimizedCost)}
                        </div>
                        {/* Tooltip trigger button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => handleTooltipClick(`opt-${item.id}`, e)}
                            onMouseEnter={() => handleTooltipMouseEnter(`opt-${item.id}`)}
                            onMouseLeave={() => handleTooltipMouseLeave(`opt-${item.id}`)}
                            aria-label={`View data points for ${item.title} CarePulse optimized cost`}
                            className={`p-1 rounded-md text-teal-600 hover:text-teal-900 hover:bg-teal-100 transition-all cursor-pointer ${
                              pinnedTooltipId === `opt-${item.id}` ? 'bg-teal-200 text-teal-950 ring-2 ring-teal-500' : ''
                            }`}
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                          {renderTooltipPopover(
                            item.optimizedTooltip,
                            `opt-${item.id}`,
                            tooltipPlacement,
                            'right'
                          )}
                        </div>
                      </div>
                      <div className="text-[11px] text-teal-700 mt-0.5 font-medium flex items-center gap-1">
                        <span>{item.optimizedMetric}</span>
                      </div>
                    </td>

                    {/* Annual Impact / Delta */}
                    <td className="py-3.5 px-3 bg-emerald-50/20 relative">
                      {item.isInvestment ? (
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <span className="font-bold text-slate-700 font-sans text-sm">
                              -${formatCost(item.optimizedCost - item.manualCost).replace('$-', '$')}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              SaaS platform investment
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => handleTooltipClick(`delta-${item.id}`, e)}
                              onMouseEnter={() => handleTooltipMouseEnter(`delta-${item.id}`)}
                              onMouseLeave={() => handleTooltipMouseLeave(`delta-${item.id}`)}
                              aria-label={`Explain platform investment delta`}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                            {renderTooltipPopover(
                              {
                                title: item.deltaTooltip.title,
                                badge: 'Investment Delta',
                                badgeColor: 'bg-indigo-900 text-indigo-200',
                                formula: item.deltaTooltip.formula,
                                dataPoints: [
                                  { label: 'Displaced Legacy Tooling', value: `$${legacyToolingCost.toLocaleString()}/yr` },
                                  { label: 'CarePulse Enterprise SaaS', value: `$${carePulseSoftwareCost.toLocaleString()}/yr` },
                                  { label: 'Net Annual Investment', value: `$${(carePulseSoftwareCost - legacyToolingCost).toLocaleString()}/yr` },
                                  { label: 'Gross Annual Return', value: `$${calculations.totalAnnualValue.toLocaleString()}/yr` },
                                ],
                                annualTotal: `-$${(carePulseSoftwareCost - legacyToolingCost).toLocaleString()} / year`,
                                benchmarkSource: 'CarePulse Enterprise Investment Model',
                                explanation: item.deltaTooltip.explanation
                              },
                              `delta-${item.id}`,
                              tooltipPlacement,
                              'right'
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <div className="inline-flex items-center gap-1 font-bold text-emerald-700 font-sans text-sm">
                              <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                              <span>+{formatCost(item.savings)}</span>
                            </div>
                            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                              {item.manualCost > 0 ? `${((item.savings / item.manualCost) * 100).toFixed(0)}% cost reduction` : ''}
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => handleTooltipClick(`delta-${item.id}`, e)}
                              onMouseEnter={() => handleTooltipMouseEnter(`delta-${item.id}`)}
                              onMouseLeave={() => handleTooltipMouseLeave(`delta-${item.id}`)}
                              aria-label={`Explain annual savings delta for ${item.title}`}
                              className="p-1 rounded-md text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/60 transition-colors cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                            {renderTooltipPopover(
                              {
                                title: item.deltaTooltip.title,
                                badge: 'Annual Operational Dividend',
                                badgeColor: 'bg-emerald-900 text-emerald-200',
                                formula: item.deltaTooltip.formula,
                                dataPoints: [
                                  { label: 'Manual Baseline Cost', value: `$${item.manualCost.toLocaleString()}/yr` },
                                  { label: 'CarePulse Optimized Cost', value: `$${item.optimizedCost.toLocaleString()}/yr` },
                                  { label: 'Net Operational Dividend', value: `+$${item.savings.toLocaleString()}/yr` },
                                  { label: 'Percentage Efficiency', value: `${((item.savings / item.manualCost) * 100).toFixed(1)}% savings` },
                                ],
                                annualTotal: `+$${item.savings.toLocaleString()} / year`,
                                benchmarkSource: item.manualTooltip.benchmarkSource,
                                explanation: item.deltaTooltip.explanation
                              },
                              `delta-${item.id}`,
                              tooltipPlacement,
                              'right'
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* Inline Expanded Calculation Audit Drawer */}
                  {isExpanded && (
                    <tr className="bg-slate-50/90 border-b border-slate-200">
                      <td colSpan={4} className="p-4 sm:p-5">
                        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                            <div className="flex items-center gap-2">
                              <Calculator className="w-4 h-4 text-teal-700" />
                              <h5 className="font-bold text-slate-900 text-xs sm:text-sm font-sans">
                                Calculation Audit & Data Points: {item.title}
                              </h5>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {beds} Beds | {rns} Bedside RNs | ${hourlyRate}/hr Blended Rate
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            {/* Manual Side */}
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                  <span>Current Manual Calculation</span>
                                </span>
                                <span className="font-mono font-bold text-slate-900 text-sm">
                                  ${item.manualCost.toLocaleString()}
                                </span>
                              </div>
                              <div className="bg-white p-2 rounded border border-slate-200 mb-2 font-mono text-[11px] text-slate-700">
                                {item.manualTooltip.formula}
                              </div>
                              <div className="space-y-1 text-[11px]">
                                {item.manualTooltip.dataPoints.map((dp, idx) => (
                                  <div key={idx} className="flex justify-between text-slate-600">
                                    <span>{dp.label}:</span>
                                    <span className="font-semibold text-slate-900">{dp.value} ({dp.sub})</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 text-[10px] text-slate-500 border-t border-slate-200 pt-1.5">
                                Citation: {item.manualTooltip.benchmarkSource}
                              </div>
                            </div>

                            {/* CarePulse Optimized Side */}
                            <div className="bg-teal-50/60 rounded-lg p-3 border border-teal-200/80">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-teal-900 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                                  <span>CarePulse Optimized Calculation</span>
                                </span>
                                <span className="font-mono font-bold text-teal-950 text-sm">
                                  ${item.optimizedCost.toLocaleString()}
                                </span>
                              </div>
                              <div className="bg-white p-2 rounded border border-teal-200 mb-2 font-mono text-[11px] text-teal-800">
                                {item.optimizedTooltip.formula}
                              </div>
                              <div className="space-y-1 text-[11px]">
                                {item.optimizedTooltip.dataPoints.map((dp, idx) => (
                                  <div key={idx} className="flex justify-between text-teal-800">
                                    <span>{dp.label}:</span>
                                    <span className="font-semibold text-teal-950">{dp.value} ({dp.sub})</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 text-[10px] text-teal-700 border-t border-teal-200 pt-1.5">
                                Citation: {item.optimizedTooltip.benchmarkSource}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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

