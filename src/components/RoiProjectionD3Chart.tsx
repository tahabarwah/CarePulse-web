import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Calendar, 
  Info, 
  Layers, 
  Sparkles,
  BarChart2,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';

export type SavingsCadence = 'monthly' | 'quarterly' | 'annual';

export interface RoiProjectionD3ChartProps {
  totalAnnualValue: number;
  annualHoursSaved: number;
  capacityValue: number;
  totalNursingBenefit: number;
  bedCapacityValue: number;
  estimatedAnnualCost: number;
  hourlyRate: number;
  rns: number;
  beds: number;
  projectionModel?: 'conservative' | 'aggressive';
  onToggleProjectionModel?: (model: 'conservative' | 'aggressive') => void;
  savingsCadence?: SavingsCadence;
  onToggleSavingsCadence?: (cadence: SavingsCadence) => void;
}

interface YearProjection {
  yearLabel: string;
  yearNum: number;
  adoptionPct: number;
  costSavings: number;
  hoursSaved: number;
  platformCost: number;
  netBenefit: number;
  handoffSavings: number;
  overtimeSavings: number;
  throughputSavings: number;
  // Cumulative totals
  cumCostSavings: number;
  cumHoursSaved: number;
  cumNetBenefit: number;
}

export const RoiProjectionD3Chart: React.FC<RoiProjectionD3ChartProps> = ({
  totalAnnualValue,
  annualHoursSaved,
  capacityValue,
  totalNursingBenefit,
  bedCapacityValue,
  estimatedAnnualCost,
  hourlyRate,
  rns,
  beds,
  projectionModel = 'conservative',
  onToggleProjectionModel,
  savingsCadence,
  onToggleSavingsCadence,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewMode, setViewMode] = useState<'annual' | 'cumulative'>('annual');
  const [chartType, setChartType] = useState<'dual' | 'stacked'>('dual');
  const [internalCadence, setInternalCadence] = useState<SavingsCadence>('annual');
  const activeCadence: SavingsCadence = savingsCadence ?? internalCadence;

  const handleCadenceChange = (cadence: SavingsCadence) => {
    if (onToggleSavingsCadence) {
      onToggleSavingsCadence(cadence);
    } else {
      setInternalCadence(cadence);
    }
  };

  const cadenceDivisor = activeCadence === 'monthly' ? 12 : activeCadence === 'quarterly' ? 4 : 1;
  const cadenceSuffix = activeCadence === 'monthly' ? '/ mo' : activeCadence === 'quarterly' ? '/ qtr' : '/ yr';
  const cadenceFull = activeCadence === 'monthly' ? 'Monthly' : activeCadence === 'quarterly' ? 'Quarterly' : 'Annual';
  const cadenceHoursSuffix = activeCadence === 'monthly' ? 'hrs / mo' : activeCadence === 'quarterly' ? 'hrs / qtr' : 'hrs / yr';

  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    data: YearProjection;
    metricType?: 'savings' | 'hours' | 'all';
  } | null>(null);

  // Compute 3-Year Projection data dynamically based on the chosen projection model:
  // - Conservative: Risk-adjusted rollout (74% Y1, 92% Y2, 104% Y3) with generous safety buffers
  // - Aggressive: Accelerated enterprise adoption (90% Y1, 110% Y2, 128% Y3) with high-velocity discharge placement
  // Scaled by selected savings cadence (monthly, quarterly, or annual)
  const projectionData: YearProjection[] = React.useMemo(() => {
    const isAggressive = projectionModel === 'aggressive';
    const y1Adoption = isAggressive ? 0.90 : 0.74;
    const y2Adoption = isAggressive ? 1.10 : 0.92;
    const y3Adoption = isAggressive ? 1.28 : 1.04;

    const rawY1Savings = Math.round(totalAnnualValue * y1Adoption);
    const rawY1Hours = Math.round(annualHoursSaved * y1Adoption);
    const rawY1Cost = Math.round(estimatedAnnualCost * 1.12); // Initial configuration & FHIR interface setup
    const rawY1Net = rawY1Savings - rawY1Cost;

    const rawY2Savings = Math.round(totalAnnualValue * y2Adoption);
    const rawY2Hours = Math.round(annualHoursSaved * y2Adoption);
    const rawY2Cost = Math.round(estimatedAnnualCost);
    const rawY2Net = rawY2Savings - rawY2Cost;

    const rawY3Savings = Math.round(totalAnnualValue * y3Adoption);
    const rawY3Hours = Math.round(annualHoursSaved * y3Adoption);
    const rawY3Cost = Math.round(estimatedAnnualCost);
    const rawY3Net = rawY3Savings - rawY3Cost;

    const y1Savings = Math.round(rawY1Savings / cadenceDivisor);
    const y1Hours = Math.round(rawY1Hours / cadenceDivisor);
    const y1Cost = Math.round(rawY1Cost / cadenceDivisor);
    const y1Net = Math.round(rawY1Net / cadenceDivisor);

    const y2Savings = Math.round(rawY2Savings / cadenceDivisor);
    const y2Hours = Math.round(rawY2Hours / cadenceDivisor);
    const y2Cost = Math.round(rawY2Cost / cadenceDivisor);
    const y2Net = Math.round(rawY2Net / cadenceDivisor);

    const y3Savings = Math.round(rawY3Savings / cadenceDivisor);
    const y3Hours = Math.round(rawY3Hours / cadenceDivisor);
    const y3Cost = Math.round(rawY3Cost / cadenceDivisor);
    const y3Net = Math.round(rawY3Net / cadenceDivisor);

    const y1Label = activeCadence === 'monthly'
      ? 'Year 1 (Monthly)'
      : activeCadence === 'quarterly'
      ? 'Year 1 (Quarterly)'
      : 'Year 1 (Rollout)';
    const y2Label = activeCadence === 'monthly'
      ? 'Year 2 (Monthly)'
      : activeCadence === 'quarterly'
      ? 'Year 2 (Quarterly)'
      : 'Year 2 (Maturity)';
    const y3Label = activeCadence === 'monthly'
      ? 'Year 3 (Monthly)'
      : activeCadence === 'quarterly'
      ? 'Year 3 (Quarterly)'
      : 'Year 3 (Optimized)';

    return [
      {
        yearLabel: y1Label,
        yearNum: 1,
        adoptionPct: Math.round(y1Adoption * 100),
        costSavings: y1Savings,
        hoursSaved: y1Hours,
        platformCost: y1Cost,
        netBenefit: y1Net,
        handoffSavings: Math.round((capacityValue * y1Adoption) / cadenceDivisor),
        overtimeSavings: Math.round((totalNursingBenefit * y1Adoption) / cadenceDivisor),
        throughputSavings: Math.round((bedCapacityValue * y1Adoption) / cadenceDivisor),
        cumCostSavings: y1Savings,
        cumHoursSaved: y1Hours,
        cumNetBenefit: y1Net,
      },
      {
        yearLabel: y2Label,
        yearNum: 2,
        adoptionPct: Math.round(y2Adoption * 100),
        costSavings: y2Savings,
        hoursSaved: y2Hours,
        platformCost: y2Cost,
        netBenefit: y2Net,
        handoffSavings: Math.round((capacityValue * y2Adoption) / cadenceDivisor),
        overtimeSavings: Math.round((totalNursingBenefit * y2Adoption) / cadenceDivisor),
        throughputSavings: Math.round((bedCapacityValue * y2Adoption) / cadenceDivisor),
        cumCostSavings: y1Savings + y2Savings,
        cumHoursSaved: y1Hours + y2Hours,
        cumNetBenefit: y1Net + y2Net,
      },
      {
        yearLabel: y3Label,
        yearNum: 3,
        adoptionPct: Math.round(y3Adoption * 100),
        costSavings: y3Savings,
        hoursSaved: y3Hours,
        platformCost: y3Cost,
        netBenefit: y3Net,
        handoffSavings: Math.round((capacityValue * y3Adoption) / cadenceDivisor),
        overtimeSavings: Math.round((totalNursingBenefit * y3Adoption) / cadenceDivisor),
        throughputSavings: Math.round((bedCapacityValue * y3Adoption) / cadenceDivisor),
        cumCostSavings: y1Savings + y2Savings + y3Savings,
        cumHoursSaved: y1Hours + y2Hours + y3Hours,
        cumNetBenefit: y1Net + y2Net + y3Net,
      },
    ];
  }, [
    totalAnnualValue, 
    annualHoursSaved, 
    capacityValue, 
    totalNursingBenefit, 
    bedCapacityValue, 
    estimatedAnnualCost, 
    projectionModel, 
    cadenceDivisor, 
    activeCadence
  ]);

  // 3-Year totals for top callout cards
  const threeYearSavings = projectionData[2].cumCostSavings;
  const threeYearHours = projectionData[2].cumHoursSaved;
  const threeYearNet = projectionData[2].cumNetBenefit;

  // D3 Chart Rendering with ResizeObserver
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 640;
    const height = Math.max(340, Math.min(420, width * 0.52));

    const margin = {
      top: 30,
      right: chartType === 'dual' ? 68 : 28,
      bottom: 48,
      left: 72,
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale: Years
    const x0Scale = d3
      .scaleBand()
      .domain(projectionData.map((d) => d.yearLabel))
      .range([0, innerWidth])
      .padding(0.28);

    // Y Scale Left: Cost Savings ($)
    const maxSavings = viewMode === 'annual'
      ? (d3.max(projectionData, (d) => d.costSavings) || 1000000) * 1.15
      : (d3.max(projectionData, (d) => d.cumCostSavings) || 3000000) * 1.15;

    const ySavingsScale = d3
      .scaleLinear()
      .domain([0, maxSavings])
      .nice()
      .range([innerHeight, 0]);

    // Grid lines for background
    g.append('g')
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(ySavingsScale.ticks(5))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => ySavingsScale(d))
      .attr('y2', (d) => ySavingsScale(d))
      .attr('stroke', '#e2e8f0')
      .attr('stroke-dasharray', '3 3')
      .attr('stroke-width', 1);

    if (chartType === 'dual') {
      // Y Scale Right: Operational Time (Hours)
      const maxHours = viewMode === 'annual'
        ? (d3.max(projectionData, (d) => d.hoursSaved) || 20000) * 1.15
        : (d3.max(projectionData, (d) => d.cumHoursSaved) || 60000) * 1.15;

      const yHoursScale = d3
        .scaleLinear()
        .domain([0, maxHours])
        .nice()
        .range([innerHeight, 0]);

      // Sub-scale for grouped bars (Savings vs Hours)
      const subCategories = ['savings', 'hours'];
      const x1Scale = d3
        .scaleBand()
        .domain(subCategories)
        .range([0, x0Scale.bandwidth()])
        .padding(0.12);

      // Render grouped bars
      const yearGroups = g
        .selectAll('.year-group')
        .data(projectionData)
        .enter()
        .append('g')
        .attr('class', 'year-group')
        .attr('transform', (d) => `translate(${x0Scale(d.yearLabel)},0)`);

      // 1. Savings Bar (Teal / Emerald)
      yearGroups
        .append('rect')
        .attr('class', 'bar-savings')
        .attr('x', x1Scale('savings') || 0)
        .attr('y', innerHeight)
        .attr('width', x1Scale.bandwidth())
        .attr('height', 0)
        .attr('rx', 5)
        .attr('fill', '#0f766e') // Tailwind teal-700
        .attr('cursor', 'pointer')
        .on('mouseenter', (event, d) => {
          const rect = container.getBoundingClientRect();
          setActiveTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            data: d,
            metricType: 'savings',
          });
        })
        .on('mousemove', (event, d) => {
          const rect = container.getBoundingClientRect();
          setActiveTooltip((prev) => prev ? {
            ...prev,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          } : null);
        })
        .on('mouseleave', () => setActiveTooltip(null))
        .transition()
        .duration(650)
        .ease(d3.easeCubicOut)
        .attr('y', (d) => ySavingsScale(viewMode === 'annual' ? d.costSavings : d.cumCostSavings))
        .attr('height', (d) => innerHeight - ySavingsScale(viewMode === 'annual' ? d.costSavings : d.cumCostSavings));

      // 2. Operational Hours Bar (Indigo)
      yearGroups
        .append('rect')
        .attr('class', 'bar-hours')
        .attr('x', x1Scale('hours') || 0)
        .attr('y', innerHeight)
        .attr('width', x1Scale.bandwidth())
        .attr('height', 0)
        .attr('rx', 5)
        .attr('fill', '#4f46e5') // Tailwind indigo-600
        .attr('cursor', 'pointer')
        .on('mouseenter', (event, d) => {
          const rect = container.getBoundingClientRect();
          setActiveTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            data: d,
            metricType: 'hours',
          });
        })
        .on('mousemove', (event, d) => {
          const rect = container.getBoundingClientRect();
          setActiveTooltip((prev) => prev ? {
            ...prev,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          } : null);
        })
        .on('mouseleave', () => setActiveTooltip(null))
        .transition()
        .duration(650)
        .ease(d3.easeCubicOut)
        .attr('y', (d) => yHoursScale(viewMode === 'annual' ? d.hoursSaved : d.cumHoursSaved))
        .attr('height', (d) => innerHeight - yHoursScale(viewMode === 'annual' ? d.hoursSaved : d.cumHoursSaved));

      // Top Value Labels on Savings Bars
      yearGroups
        .append('text')
        .attr('x', (x1Scale('savings') || 0) + x1Scale.bandwidth() / 2)
        .attr('y', (d) => ySavingsScale(viewMode === 'annual' ? d.costSavings : d.cumCostSavings) - 6)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('fill', '#0f766e')
        .text((d) => {
          const val = viewMode === 'annual' ? d.costSavings : d.cumCostSavings;
          const formatted = val >= 1000000 ? `$${(val / 1000000).toFixed(1)}M` : `$${Math.round(val / 1000)}k`;
          return `${formatted}${cadenceSuffix}`;
        });

      // Top Value Labels on Hours Bars
      yearGroups
        .append('text')
        .attr('x', (x1Scale('hours') || 0) + x1Scale.bandwidth() / 2)
        .attr('y', (d) => yHoursScale(viewMode === 'annual' ? d.hoursSaved : d.cumHoursSaved) - 6)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('fill', '#4f46e5')
        .text((d) => {
          const val = viewMode === 'annual' ? d.hoursSaved : d.cumHoursSaved;
          const formatted = val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${Math.round(val)}`;
          return `${formatted} h${cadenceSuffix}`;
        });

      // Right Axis (Operational Hours)
      const rightAxis = d3
        .axisRight(yHoursScale)
        .ticks(5)
        .tickFormat((d) => {
          const val = Number(d);
          if (val >= 1000) return `${(val / 1000).toFixed(0)}k h`;
          return `${Math.round(val)} h`;
        });

      const rightAxisGroup = g
        .append('g')
        .attr('class', 'y-axis-right')
        .attr('transform', `translate(${innerWidth},0)`)
        .call(rightAxis);

      rightAxisGroup.select('.domain').attr('stroke', '#cbd5e1');
      rightAxisGroup.selectAll('.tick line').attr('stroke', '#e2e8f0');
      rightAxisGroup.selectAll('.tick text').attr('fill', '#4f46e5').attr('font-size', '10px');

      // Right Axis Title
      g.append('text')
        .attr('transform', 'rotate(90)')
        .attr('y', -innerWidth - 48)
        .attr('x', innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#4f46e5')
        .attr('font-size', '11px')
        .attr('font-weight', '600')
        .text(`Operational Time (${activeCadence === 'monthly' ? 'Hours / Month' : activeCadence === 'quarterly' ? 'Hours / Quarter' : 'Hours / Year'})`);
    } else {
      // Stacked Savings Breakdown view: Handoff, Overtime, Throughput
      const stackKeys = ['handoffSavings', 'overtimeSavings', 'throughputSavings'] as const;
      const stackColor = d3
        .scaleOrdinal<string>()
        .domain(stackKeys)
        .range(['#0f766e', '#10b981', '#3b82f6']);

      const stack = d3.stack<YearProjection>().keys(stackKeys);
      const series = stack(projectionData);

      const layer = g
        .selectAll('.stack-layer')
        .data(series)
        .enter()
        .append('g')
        .attr('class', 'stack-layer')
        .attr('fill', (d) => stackColor(d.key));

      layer
        .selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => x0Scale(d.data.yearLabel) || 0)
        .attr('y', (d) => ySavingsScale(d[1]))
        .attr('height', (d) => ySavingsScale(d[0]) - ySavingsScale(d[1]))
        .attr('width', x0Scale.bandwidth())
        .attr('rx', 3)
        .attr('cursor', 'pointer')
        .on('mouseenter', (event, d) => {
          const rect = container.getBoundingClientRect();
          setActiveTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            data: d.data,
            metricType: 'all',
          });
        })
        .on('mouseleave', () => setActiveTooltip(null));

      // Total label on top of stack
      g.selectAll('.stack-total-label')
        .data(projectionData)
        .enter()
        .append('text')
        .attr('x', (d) => (x0Scale(d.yearLabel) || 0) + x0Scale.bandwidth() / 2)
        .attr('y', (d) => ySavingsScale(d.costSavings) - 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', '#0f766e')
        .text((d) => {
          const formatted = d.costSavings >= 1000000
            ? `$${(d.costSavings / 1000000).toFixed(2)}M`
            : `$${Math.round(d.costSavings / 1000)}k`;
          return `${formatted}${cadenceSuffix}`;
        });
    }

    // Left Axis (Cost Savings $)
    const leftAxis = d3
      .axisLeft(ySavingsScale)
      .ticks(5)
      .tickFormat((d) => {
        const val = Number(d);
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
        return `$${val}`;
      });

    const leftAxisGroup = g.append('g').attr('class', 'y-axis-left').call(leftAxis);
    leftAxisGroup.select('.domain').attr('stroke', '#cbd5e1');
    leftAxisGroup.selectAll('.tick line').attr('stroke', '#e2e8f0');
    leftAxisGroup.selectAll('.tick text').attr('fill', '#334155').attr('font-size', '10px');

    // Left Axis Title
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -54)
      .attr('x', -innerHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#0f766e')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .text(`Projected Cost Savings ($ ${cadenceSuffix})`);

    // Bottom Axis (Years)
    const bottomAxis = d3.axisBottom(x0Scale);
    const bottomAxisGroup = g
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(bottomAxis);

    bottomAxisGroup.select('.domain').attr('stroke', '#cbd5e1');
    bottomAxisGroup.selectAll('.tick line').attr('stroke', '#cbd5e1');
    bottomAxisGroup
      .selectAll('.tick text')
      .attr('fill', '#1e293b')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('dy', '1.2em');
  }, [projectionData, viewMode, chartType, activeCadence]);

  // Set up ResizeObserver to re-render on container size changes
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // Trigger re-render by bumping state or relying on dependency
      if (svgRef.current && containerRef.current) {
        // Redraw will be handled when component dimensions stabilize
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div 
      id="roi-3year-projection-chart"
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mt-6"
    >
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              <BarChart2 className="w-3.5 h-3.5 text-teal-700" />
              <span>D3 Data Visualization Engine</span>
            </div>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              projectionModel === 'aggressive'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-teal-100 text-teal-900 border border-teal-300'
            }`}>
              {projectionModel === 'aggressive' ? (
                <>
                  <Zap className="w-3 h-3 text-amber-600" />
                  <span>Aggressive Model (+25%)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3 h-3 text-teal-700" />
                  <span>Conservative Model (-15%)</span>
                </>
              )}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
            3-Year Projected Cost Savings vs. Operational Time
          </h4>
          {projectionModel === 'aggressive' ? (
            <p className="text-xs text-amber-800 font-medium mt-0.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Aggressive Adoption Curve: Year 1 (90%), Year 2 (110%), Year 3 (128%) with peak discharge velocity and maximal overtime mitigation.</span>
            </p>
          ) : (
            <p className="text-xs text-teal-800 font-medium mt-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>Conservative Adoption Curve: Year 1 (74%), Year 2 (92%), Year 3 (104%) with risk-adjusted clinical safety buffers.</span>
            </p>
          )}
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Conservative vs. Aggressive Model Toggle Switch */}
          {onToggleProjectionModel && (
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                id="chart-toggle-conservative-btn"
                type="button"
                onClick={() => onToggleProjectionModel('conservative')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  projectionModel === 'conservative'
                    ? 'bg-white text-teal-900 shadow-2xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-teal-700" />
                <span>Conservative</span>
              </button>

              {/* Toggle Switch Pill */}
              <button
                id="chart-toggle-switch-pill"
                type="button"
                role="switch"
                aria-checked={projectionModel === 'aggressive'}
                aria-label="Toggle projection model between conservative and aggressive"
                onClick={() => onToggleProjectionModel(projectionModel === 'conservative' ? 'aggressive' : 'conservative')}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-teal-700 ${
                  projectionModel === 'aggressive' ? 'bg-amber-600' : 'bg-teal-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    projectionModel === 'aggressive' ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>

              <button
                id="chart-toggle-aggressive-btn"
                type="button"
                onClick={() => onToggleProjectionModel('aggressive')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  projectionModel === 'aggressive'
                    ? 'bg-white text-amber-900 shadow-2xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3 h-3 text-amber-600" />
                <span>Aggressive</span>
              </button>
            </div>
          )}

          {/* Timeframe Granularity Toggle: Monthly, Quarterly, Annual */}
          <div 
            id="chart-cadence-toggle-group"
            className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1"
            role="group"
            aria-label="Savings projection timeframe granularity"
          >
            <button
              id="chart-cadence-monthly-btn"
              type="button"
              onClick={() => handleCadenceChange('monthly')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeCadence === 'monthly'
                  ? 'bg-teal-700 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              id="chart-cadence-quarterly-btn"
              type="button"
              onClick={() => handleCadenceChange('quarterly')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeCadence === 'quarterly'
                  ? 'bg-teal-700 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quarterly
            </button>
            <button
              id="chart-cadence-annual-btn"
              type="button"
              onClick={() => handleCadenceChange('annual')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeCadence === 'annual'
                  ? 'bg-teal-700 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual
            </button>
          </div>

          {/* Chart View Toggle: Dual Grouped vs Stacked Breakdown */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setChartType('dual')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                chartType === 'dual'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Savings vs. Time
            </button>
            <button
              onClick={() => setChartType('stacked')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                chartType === 'stacked'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pillars
            </button>
          </div>

          {/* Timeframe Toggle: Annual/Run-Rate vs Cumulative */}
          {chartType === 'dual' && (
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                onClick={() => setViewMode('annual')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'annual'
                    ? 'bg-slate-800 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeCadence === 'annual' ? 'Per-Year' : 'Per-Period'}
              </button>
              <button
                onClick={() => setViewMode('cumulative')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'cumulative'
                    ? 'bg-slate-800 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cumulative (3-Yr)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary Metric Cards (Dynamic by Selected Cadence) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-3.5">
          <div className="text-[11px] font-semibold text-teal-800 flex items-center justify-between">
            <span>{activeCadence === 'annual' ? '3-Year Gross Savings' : `Avg ${cadenceFull} Gross Savings`}</span>
            <DollarSign className="w-3.5 h-3.5 text-teal-700" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-teal-900 font-sans mt-1">
            {activeCadence === 'annual'
              ? `$${(threeYearSavings / 1000000).toFixed(2)}M`
              : `$${Math.round(threeYearSavings / 3).toLocaleString()}${cadenceSuffix}`}
          </div>
          <div className="text-[10px] text-teal-700 mt-0.5">
            {activeCadence === 'annual'
              ? 'Combined bedside handoff, OT & throughput value'
              : `Year 3 Peak: $${projectionData[2].costSavings.toLocaleString()}${cadenceSuffix} • 3-Yr Total: $${(threeYearSavings * cadenceDivisor / 1000000).toFixed(2)}M`}
          </div>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-3.5">
          <div className="text-[11px] font-semibold text-indigo-800 flex items-center justify-between">
            <span>{activeCadence === 'annual' ? '3-Year RN Hours Reclaimed' : `Avg ${cadenceFull} RN Hours Reclaimed`}</span>
            <Clock className="w-3.5 h-3.5 text-indigo-700" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-indigo-900 font-sans mt-1">
            {activeCadence === 'annual'
              ? `${threeYearHours.toLocaleString()} hrs`
              : `${Math.round(threeYearHours / 3).toLocaleString()} ${cadenceHoursSuffix}`}
          </div>
          <div className="text-[10px] text-indigo-700 mt-0.5">
            {activeCadence === 'annual'
              ? `Equivalent to ~${Math.round(threeYearHours / 1920)} full-time RN shifts`
              : `Year 3 Peak: ${projectionData[2].hoursSaved.toLocaleString()} ${cadenceHoursSuffix}`}
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5">
          <div className="text-[11px] font-semibold text-emerald-800 flex items-center justify-between">
            <span>{activeCadence === 'annual' ? '3-Year Net Benefit' : `Avg ${cadenceFull} Net Benefit`}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-900 font-sans mt-1">
            {activeCadence === 'annual'
              ? `$${(threeYearNet / 1000000).toFixed(2)}M`
              : `$${Math.round(threeYearNet / 3).toLocaleString()}${cadenceSuffix}`}
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5">
            {activeCadence === 'annual'
              ? 'Net of multi-year platform investment'
              : `Year 3 Peak: $${projectionData[2].netBenefit.toLocaleString()}${cadenceSuffix}`}
          </div>
        </div>
      </div>

      {/* D3 Visual Container with Relative Position for Tooltips */}
      <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden bg-slate-50/40 rounded-xl border border-slate-200/60 p-2 sm:p-4"
      >
        <svg 
          ref={svgRef} 
          className="w-full h-auto select-none"
        />

        {/* Interactive Floating Tooltip */}
        {activeTooltip && (
          <div
            className="absolute z-20 pointer-events-none bg-slate-900/95 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 max-w-xs transition-all duration-100"
            style={{
              left: `${Math.min(Math.max(16, activeTooltip.x - 100), (containerRef.current?.clientWidth || 400) - 240)}px`,
              top: `${Math.max(10, activeTooltip.y - 120)}px`,
            }}
          >
            <div className="font-bold text-slate-100 border-b border-slate-700 pb-1.5 mb-1.5 flex items-center justify-between">
              <span>{activeTooltip.data.yearLabel}</span>
              <span className="text-[10px] text-teal-300 font-semibold">
                {activeTooltip.data.adoptionPct}% Adoption ({cadenceFull})
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-xs bg-teal-500 inline-block"></span>
                  Savings ({cadenceSuffix.trim()}):
                </span>
                <span className="font-bold text-teal-300">
                  ${(viewMode === 'annual' ? activeTooltip.data.costSavings : activeTooltip.data.cumCostSavings).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-xs bg-indigo-500 inline-block"></span>
                  Hours Reclaimed:
                </span>
                <span className="font-bold text-indigo-300">
                  {(viewMode === 'annual' ? activeTooltip.data.hoursSaved : activeTooltip.data.cumHoursSaved).toLocaleString()} {cadenceHoursSuffix}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800">
                <span className="text-slate-400">Net {cadenceFull} Return:</span>
                <span className="font-bold text-emerald-400">
                  ${(viewMode === 'annual' ? activeTooltip.data.netBenefit : activeTooltip.data.cumNetBenefit).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Legend & Explanatory Context */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          {chartType === 'dual' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-teal-700"></span>
                <span className="font-medium text-slate-700">Cost Savings ($)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-indigo-600"></span>
                <span className="font-medium text-slate-700">Operational Time Saved (Hours)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#0f766e]"></span>
                <span className="font-medium text-slate-700">Bedside Handoffs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#10b981]"></span>
                <span className="font-medium text-slate-700">Overtime & Retention</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#3b82f6]"></span>
                <span className="font-medium text-slate-700">Throughput Velocity</span>
              </div>
            </>
          )}
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Info className="w-3 h-3" />
          <span>Interactive D3 visualization updates automatically with slider adjustments.</span>
        </div>
      </div>
    </div>
  );
};
