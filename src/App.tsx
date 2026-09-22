/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductBenefits } from './components/ProductBenefits';
import { ClinicalWorkflow } from './components/ClinicalWorkflow';
import { RoleUseCases } from './components/RoleUseCases';
import { SecurityCompliance } from './components/SecurityCompliance';
import { IntegrationsSection } from './components/IntegrationsSection';
import { DiagnosticTool } from './components/DiagnosticTool';
import { FaqSection } from './components/FaqSection';
import { DemoRequestSection } from './components/DemoRequestSection';
import { Footer } from './components/Footer';
import { X, Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function App() {
  const [modalType, setModalType] = useState<'demo' | 'diagnostic' | null>(null);
  const [diagnosticAttachedNotes, setDiagnosticAttachedNotes] = useState<string>('');

  const scrollToDemo = (notes?: string) => {
    setModalType(null);
    if (notes) {
      setDiagnosticAttachedNotes(notes);
    }
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDiagnostic = () => {
    setModalType(null);
    const diagElement = document.getElementById('diagnostic');
    if (diagElement) {
      diagElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-teal-100 selection:text-teal-900">
      {/* Sticky Header with Trust Banner */}
      <Navbar
        onOpenDemo={() => scrollToDemo()}
        onOpenDiagnostic={() => scrollToDiagnostic()}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section with Live Hospital Board Simulator */}
        <Hero
          onOpenDemo={() => scrollToDemo()}
          onOpenDiagnostic={() => scrollToDiagnostic()}
        />

        {/* 2. Core Product Benefits */}
        <ProductBenefits
          onOpenDemo={() => scrollToDemo()}
          onOpenDiagnostic={() => scrollToDiagnostic()}
        />

        {/* 3. Interactive Clinical Workflow (Admission to Discharge) */}
        <ClinicalWorkflow
          onOpenDemo={() => scrollToDemo()}
        />

        {/* 4. Role-Based Stakeholder Use Cases */}
        <RoleUseCases
          onOpenDemo={() => scrollToDemo()}
        />

        {/* 5. Enterprise Security & Compliance Overview */}
        <SecurityCompliance
          onOpenDemo={() => scrollToDemo()}
        />

        {/* 6. EHR Ecosystem & Standards Interoperability */}
        <IntegrationsSection
          onOpenDemo={() => scrollToDemo()}
        />

        {/* 7. AI Clinical Workflow Diagnostic (Powered by Gemini 3.1 Pro with High Thinking) */}
        <DiagnosticTool
          onOpenDemoWithData={(notes) => scrollToDemo(notes)}
        />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />

        {/* 9. Request a Demo Form & Interactive Scheduling */}
        <DemoRequestSection
          initialNotes={diagnosticAttachedNotes}
        />
      </main>

      {/* Global Footer with Regulatory Notices */}
      <Footer
        onOpenDemo={() => scrollToDemo()}
        onOpenDiagnostic={() => scrollToDiagnostic()}
      />
    </div>
  );
}
