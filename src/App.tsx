/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { RoiCalculatorPage } from './pages/RoiCalculatorPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { SecurityPage } from './pages/SecurityPage';
import { CaseStoriesPage } from './pages/CaseStoriesPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { DemoPage } from './pages/DemoPage';
import { PatientOverviewPage } from './pages/PatientOverviewPage';

function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-teal-100 selection:text-teal-900">
      {/* Ensures viewport scrolls to top on navigation */}
      <ScrollToTop />

      {/* Top Header & Navigation */}
      <Navbar />

      {/* Multi-Page Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/patient-overview" element={<PatientOverviewPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/roi-calculator" element={<RoiCalculatorPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/case-stories" element={<CaseStoriesPage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer with Regulatory and Navigation Links */}
      <Footer />

      {/* Global Live Interactive Clinical Chat Widget */}
      <LiveChatWidget
        onOpenDemo={() => navigate('/demo')}
        onOpenDiagnostic={() => navigate('/diagnostic')}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
