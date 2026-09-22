import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Building2, 
  Users, 
  RefreshCw, 
  ShieldCheck,
  Stethoscope,
  Activity,
  FileText
} from 'lucide-react';
import { DiagnosticInput } from '../types';

interface DiagnosticToolProps {
  onOpenDemoWithData?: (notes: string) => void;
}

export const DiagnosticTool: React.FC<DiagnosticToolProps> = ({ onOpenDemoWithData }) => {
  const [formData, setFormData] = useState<DiagnosticInput>({
    organizationType: '250-bed Regional Acute Care Hospital',
    clinicianCount: '450 clinicians and bedside nurses',
    ehrSystem: 'Epic Systems (Hyperspace / Rover)',
    clinicalBottlenecks: 'Delayed shift handoffs, discharge communication friction, nurse alarm fatigue',
    primaryGoal: 'Reduce avoidable length of stay (LOS) and shave 30 mins off daily shift change',
  });

  const [loading, setLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presets = [
    {
      label: 'Regional Acute Care (Epic)',
      data: {
        organizationType: '300-bed Regional Community Hospital',
        clinicianCount: '520 physicians, residents, and staff RNs',
        ehrSystem: 'Epic Systems (Hyperspace / Rover)',
        clinicalBottlenecks: 'Disorganized paper handoffs between shifts, 4 PM discharge gridlock, hallway verbal task drop',
        primaryGoal: 'Advance median discharge time by 1.5 hours and reduce shift transition overtime',
      }
    },
    {
      label: 'Academic Medical Center (Cerner)',
      data: {
        organizationType: '650-bed Tertiary Academic Medical Center',
        clinicianCount: '1,400 multidisciplinary clinical personnel',
        ehrSystem: 'Oracle Cerner Millennium (PowerChart / CareAware)',
        clinicalBottlenecks: 'Consult response lag, ICU-to-stepdown transfer communication gaps, high paging noise',
        primaryGoal: 'Synchronize multidisciplinary rounding and eliminate alarm fatigue across telemetry units',
      }
    },
    {
      label: 'Ambulatory Surgical Center (Athena)',
      data: {
        organizationType: 'Multi-Site Ambulatory Surgical Center Network',
        clinicianCount: '180 surgeons, peri-op nurses, and case managers',
        ehrSystem: 'Athenahealth Clinicals',
        clinicalBottlenecks: 'Pre-op clearance delays, post-anesthesia handoff friction, delayed transportation pickup',
        primaryGoal: 'Ensure 100% closed-loop post-op recovery tasking and automated transport scheduling',
      }
    }
  ];

  const applyPreset = (presetData: DiagnosticInput) => {
    setFormData(presetData);
    setAnalysisResult(null);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setAnalysisResult(null);
    setThinkingStep(0);

    // Simulated thinking progress steps
    const timer1 = setTimeout(() => setThinkingStep(1), 1200);
    const timer2 = setTimeout(() => setThinkingStep(2), 2600);
    const timer3 = setTimeout(() => setThinkingStep(3), 4200);

    try {
      const response = await fetch('/api/diagnose-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete diagnostic evaluation');
      }

      setAnalysisResult(data.analysis);
      setModelUsed(data.modelUsed || 'gemini-3.1-pro-preview');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Unable to connect to diagnostic engine.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="diagnostic" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Glow decorations */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-950 text-teal-400 border border-teal-800 mb-3">
            <BrainCircuit className="w-4 h-4 text-teal-400" />
            High-Thinking Clinical Operations Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Healthcare Workflow & Team Sizing Diagnostic
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Test real-world operational parameters for your hospital or health system. Powered by Gemini 3.1 Pro with High Thinking to generate an actionable informatics re-engineering plan and compliance checklist.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs text-slate-400 font-semibold mr-1">Quick Scenarios:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset.data)}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Form on Left, Output on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form Column */}
          <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-700 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-400" />
              Institutional Parameters
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Organization / Facility Type
                </label>
                <input
                  type="text"
                  value={formData.organizationType}
                  onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                  placeholder="e.g. 250-bed Regional Acute Care Hospital"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Clinician & Staff Scale
                </label>
                <input
                  type="text"
                  value={formData.clinicianCount}
                  onChange={(e) => setFormData({ ...formData, clinicianCount: e.target.value })}
                  placeholder="e.g. 450 physicians and floor nurses"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Core EHR / Clinical Information System
                </label>
                <input
                  type="text"
                  value={formData.ehrSystem}
                  onChange={(e) => setFormData({ ...formData, ehrSystem: e.target.value })}
                  placeholder="e.g. Epic Systems (Hyperspace / Rover)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Primary Operational Friction & Bottlenecks
                </label>
                <textarea
                  rows={2}
                  value={formData.clinicalBottlenecks}
                  onChange={(e) => setFormData({ ...formData, clinicalBottlenecks: e.target.value })}
                  placeholder="e.g. Delayed shift handoffs, discharge gridlock, alarm fatigue"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Strategic Clinical Goal
                </label>
                <input
                  type="text"
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  placeholder="e.g. Reduce avoidable LOS and shave 30 mins off shift transition"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:bg-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing with High Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Run High-Thinking Diagnostic Evaluation
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Strictly administrative workflow analysis; no medical diagnoses provided.</span>
              </div>
            </form>
          </div>

          {/* Results / Analysis Output Column */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-700 min-h-[480px] flex flex-col justify-between shadow-xl">
            {loading ? (
              <div className="my-auto py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-teal-500/20 border-t-teal-400 animate-spin"></div>
                  <BrainCircuit className="w-6 h-6 text-teal-400 absolute inset-0 m-auto" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Gemini 3.1 Pro (Thinking Mode: High)
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Deeply reasoning across hospital operational informatics, HL7/FHIR mappings, and clinical staff retention models...
                  </p>
                </div>

                {/* Animated thinking steps */}
                <div className="space-y-1.5 text-left text-xs max-w-md w-full bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 text-teal-300 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Analyzing clinical shift handoff latency...</span>
                  </div>
                  <div className={`flex items-center gap-2 font-mono transition-opacity ${thinkingStep >= 1 ? 'text-teal-300' : 'text-slate-500'}`}>
                    {thinkingStep >= 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-600"></span>}
                    <span>Correlating {formData.ehrSystem} FHIR R4 interfaces...</span>
                  </div>
                  <div className={`flex items-center gap-2 font-mono transition-opacity ${thinkingStep >= 2 ? 'text-teal-300' : 'text-slate-500'}`}>
                    {thinkingStep >= 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-600"></span>}
                    <span>Synthesizing time-savings & discharge throughput impact...</span>
                  </div>
                  <div className={`flex items-center gap-2 font-mono transition-opacity ${thinkingStep >= 3 ? 'text-teal-300' : 'text-slate-500'}`}>
                    {thinkingStep >= 3 ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-600"></span>}
                    <span>Auditing HIPAA safeguards & BAA governance scope...</span>
                  </div>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-700 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Clinical Diagnostic Report
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      {modelUsed}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-2.5 py-1 rounded text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Report'}
                    </button>
                    {onOpenDemoWithData && (
                      <button
                        onClick={() => onOpenDemoWithData(analysisResult)}
                        className="px-2.5 py-1 rounded text-xs bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Attach to Demo Request
                      </button>
                    )}
                  </div>
                </div>

                {/* Rendered Analysis text with structured typography */}
                <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed max-h-[460px] overflow-y-auto space-y-3 font-sans whitespace-pre-line">
                  {analysisResult}
                </div>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700">
                  <span>Report tailored for {formData.organizationType}</span>
                  <span className="text-emerald-400">FHIR R4 Compliant Architecture</span>
                </div>
              </div>
            ) : (
              <div className="my-auto py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-teal-400">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Ready to Generate Your Clinical Informatics Roadmap
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Select a preset or customize your facility's parameters on the left, then click <strong>Run High-Thinking Diagnostic Evaluation</strong> to generate a comprehensive analysis.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    SBAR Handoff Optimization
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    Quantified ROI Projections
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    FHIR Resource Mapping
                  </span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-950/70 border border-red-800 text-red-200 text-xs rounded-lg mt-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
