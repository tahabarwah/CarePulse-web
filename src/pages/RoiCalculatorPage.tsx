import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { HealthcareRoiCalculator } from '../components/HealthcareRoiCalculator';
import { Calculator, ShieldCheck, DollarSign, TrendingUp, Info } from 'lucide-react';

export const RoiCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleApplyToDemo = (roiNotes: string) => {
    // Navigate to demo request page with calculation notes pre-populated
    navigate('/demo', { state: { initialNotes: roiNotes } });
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: 'ROI & Efficiency Calculator' }]} />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded mb-3">
              <Calculator className="w-3.5 h-3.5 text-teal-600" />
              Evidence-Based Financial & Capacity Modeling
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Healthcare ROI & Operational Efficiency Calculator
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Model the financial and operational impact of reducing shift handoff friction, eliminating nursing overtime, and accelerating discharge order velocity across your health system.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Calculator */}
      <div className="py-6">
        <HealthcareRoiCalculator onApplyToDemo={handleApplyToDemo} />
      </div>
    </div>
  );
};
