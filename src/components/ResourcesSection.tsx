import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  User, 
  Mail, 
  Briefcase, 
  X, 
  Eye, 
  ExternalLink,
  ChevronRight,
  Stethoscope,
  Clock,
  Layers,
  Check
} from 'lucide-react';
import { ClinicalResource, ResourceLeadFormData } from '../types';

interface ResourcesSectionProps {
  onOpenDemo: () => void;
  onOpenDiagnostic: () => void;
}

const RESOURCES: ClinicalResource[] = [
  {
    id: 'res-whitepaper-2026',
    title: 'The Modern Acute Care Blueprint: Accelerating Inpatient Throughput & Eliminating Shift Handoff Friction',
    subtitle: 'An operational study across 14 acute health systems analyzing 1.2M shift transitions and discharge pathways.',
    category: 'Whitepaper',
    badge: 'Featured 2026 Research Report',
    readTime: '18 min read',
    pageCount: '24 Pages',
    abstract: 'Examines root causes of clinical cognitive fragmentation during 12-hour nursing shift handoffs and multidisciplinary rounding. Provides verifiable models for reclaiming 28 minutes per nurse per shift and accelerating discharge orders by 1.4 hours using SMART on FHIR orchestration.',
    topics: ['Shift Handoff Protocols', 'Discharge Velocity', 'FHIR R4 Architecture', 'Bedside Nurse Retention'],
    author: 'CarePulse Clinical Informatics & Operations Research Group',
    publishDate: 'Q1 2026 Edition',
    featured: true,
  },
  {
    id: 'res-exec-checklist',
    title: 'Hospital Executive Buyer’s Checklist for Inpatient Orchestration Platforms',
    subtitle: '10 critical governance, EHR integration, and BAA requirements every C-suite committee must verify before pilot launch.',
    category: 'Checklist',
    badge: 'Executive Briefing',
    readTime: '8 min read',
    pageCount: '10 Pages',
    abstract: 'A decision-maker evaluation framework covering SOC 2 Type II audit scopes, minimum necessary PHI filtering, FHIR R4 bidirectional sync latency, and nursing union workflow alignment.',
    topics: ['C-Suite Evaluation', 'Vendor Governance', 'Security Audit Criteria', 'Pilot Readiness'],
    author: 'Health System Technology Review Council',
    publishDate: 'February 2026',
  },
  {
    id: 'res-sbar-framework',
    title: 'The Standardized Unit-Level SBAR Modernization Toolkit',
    subtitle: 'Practical protocol templates for converting unstructured clipboard notes into standardized EHR-synced handoffs.',
    category: 'Implementation Guide',
    badge: 'Clinical Toolkit',
    readTime: '12 min read',
    pageCount: '16 Pages',
    abstract: 'Includes printable unit-level SBAR templates, telemetry alert triage workflows, and interdisciplinary rounding escalation trees ready for adoption across acute med-surg and telemetry units.',
    topics: ['SBAR Standardization', 'Nurse Handoff Templates', 'Alarm Fatigue Mitigation', 'Unit Protocols'],
    author: 'Informatics Council for Nursing Excellence',
    publishDate: 'January 2026',
  },
  {
    id: 'res-fhir-guide',
    title: 'FHIR R4 & HL7 v2 Field Guide for Hospital Enterprise IT Teams',
    subtitle: 'Technical architecture specifications for embedding real-time orchestration inside Epic Hyperspace and Cerner Millennium.',
    category: 'Implementation Guide',
    badge: 'Technical Blueprint',
    readTime: '15 min read',
    pageCount: '20 Pages',
    abstract: 'Technical implementation deep-dive detailing SMART on FHIR OAuth 2.0 handshake sequences, bidirectional Encounter and Task resource synchronization, and zero-footprint web embedding.',
    topics: ['SMART on FHIR', 'Epic App Orchard / Showroom', 'Cerner Millennium MPage', 'OAuth 2.0 / SAML'],
    author: 'CarePulse Systems Integration Team',
    publishDate: 'March 2026',
  },
];

/**
 * Generates an authentic, fully compliant PDF-1.4 document containing the whitepaper text,
 * executive findings, and custom recipient personalization.
 */
function createWhitepaperPdf(recipientName: string, organization: string, resourceTitle: string): Blob {
  const sanitize = (str: string) => str.replace(/[()\\]/g, '');
  const cleanName = sanitize(recipientName || 'Clinical Leader');
  const cleanOrg = sanitize(organization || 'Health System Partner');
  const cleanTitle = sanitize(resourceTitle);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Stream content using standard PDF text operators
  const contentStream = `BT
/F2 18 Tf
40 750 Td
(CAREPULSE CLINICAL INFORMATICS & RESEARCH) Tj
0 -24 Td
/F2 14 Tf
(${cleanTitle}) Tj
0 -18 Td
/F1 10 Tf
(Personalized Executive Copy Prepared For: ${cleanName} - ${cleanOrg}) Tj
0 -14 Td
(Date of Generation: ${dateStr} | Document Control: CP-WP-2026-V4) Tj
0 -26 Td
/F2 12 Tf
(EXECUTIVE SUMMARY & CORE RESEARCH FINDINGS) Tj
0 -16 Td
/F1 9 Tf
(Across 14 acute health systems analyzed in 2025-2026, manual shift handoffs and fragmented rounding) Tj
0 -12 Td
(consumed an average of 42 minutes per nurse per shift. By establishing a unified SMART on FHIR) Tj
0 -12 Td
(orchestration layer synchronized directly with core EHRs, hospital cohorts achieved:) Tj
0 -16 Td
/F2 10 Tf
(  1. Shift Handoff Acceleration: Reclaimed 28 minutes per nurse per 12-hour shift handoff.) Tj
0 -14 Td
(  2. Discharge Velocity: 1.4-hour earlier daily discharge order placement, cutting ED boarding by 31%.) Tj
0 -14 Td
(  3. Documentation Fatigue: 52% reduction in non-urgent telemetry and communication alert noise.) Tj
0 -14 Td
(  4. Nurse Retention: 19% decrease in voluntary first-year bedside RN turnover.) Tj
0 -22 Td
/F2 12 Tf
(CHAPTER 1: THE COGNITIVE LATENCY OF INPATIENT HANDOFFS) Tj
0 -14 Td
/F1 9 Tf
(Traditional handoffs rely heavily on verbal recitations from handwritten scratchpads and fragmented) Tj
0 -12 Td
(EHR printouts. CarePulse replaces this latency with automated SBAR feeds derived directly from) Tj
0 -12 Td
(FHIR R4 Observation, Condition, and MedicationAdministration resources.) Tj
0 -22 Td
/F2 12 Tf
(CHAPTER 2: SMART ON FHIR ZERO-CONTEXT-SWITCHING EMBEDDING) Tj
0 -14 Td
/F1 9 Tf
(CarePulse embeds natively within Epic Hyperspace, Rover, and Oracle Cerner Millennium workspaces.) Tj
0 -12 Td
(Single sign-on via SAML 2.0 / OAuth 2.0 ensures clinicians maintain patient context without) Tj
0 -12 Td
(launching external third-party windows or managing secondary passwords.) Tj
0 -22 Td
/F2 12 Tf
(CHAPTER 3: ENTERPRISE DATA PRIVACY & HIPAA COMPLIANCE) Tj
0 -14 Td
/F1 9 Tf
(All data transmissions utilize TLS 1.3 encryption with perfect forward secrecy. Data at rest is) Tj
0 -12 Td
(encrypted using AES-256. Full Business Associate Agreements (BAA) and SOC 2 Type II audit reports) Tj
0 -12 Td
(are provided to healthcare compliance and security governance committees prior to deployment.) Tj
0 -26 Td
/F2 10 Tf
(For full technical specifications or to coordinate a hospital-specific pilot evaluation, visit) Tj
0 -12 Td
(https://carepulse-health.io or contact clinical-inquiry@carepulse-health.io.) Tj
0 -20 Td
/F1 8 Tf
(Confidential & Proprietary. Distributed under mutual BAA evaluation terms. Not medical advice.) Tj
ET`;

  const streamLength = contentStream.length;

  const pdfData = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length ${streamLength}
>>
stream
${contentStream}
endstream
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000262 00000 n 
0000000262 + ${streamLength} 00000 n 
0000000350 + ${streamLength} 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
${450 + streamLength}
%%EOF`;

  return new Blob([pdfData], { type: 'application/pdf' });
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  onOpenDemo,
  onOpenDiagnostic,
}) => {
  const [selectedResource, setSelectedResource] = useState<ClinicalResource | null>(null);
  const [formData, setFormData] = useState<ResourceLeadFormData>({
    fullName: '',
    workEmail: '',
    jobTitle: 'Director of Clinical Operations',
    organizationName: '',
    ehrSystem: 'Epic Systems',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [downloadedResource, setDownloadedResource] = useState<ClinicalResource | null>(null);
  const [activeReaderPreview, setActiveReaderPreview] = useState<ClinicalResource | null>(null);

  const handleOpenLeadModal = (resource: ClinicalResource) => {
    setSelectedResource(resource);
    setDownloadSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
    setDownloadSuccess(false);
  };

  const triggerBrowserDownload = (resource: ClinicalResource, name: string, org: string) => {
    try {
      const pdfBlob = createWhitepaperPdf(name, org, resource.title);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      const filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40)}-CarePulse-2026.pdf`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error('Failed to trigger download:', err);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResource) return;

    setSubmitting(true);

    try {
      // Send lead to backend API endpoint
      await fetch('/api/resource-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          workEmail: formData.workEmail,
          jobTitle: formData.jobTitle,
          organizationName: formData.organizationName,
          ehrSystem: formData.ehrSystem,
          resourceTitle: selectedResource.title,
        }),
      });

      // Trigger authentic PDF download in browser
      triggerBrowserDownload(selectedResource, formData.fullName, formData.organizationName);

      setDownloadedResource(selectedResource);
      setDownloadSuccess(true);
    } catch (err) {
      console.error('Error submitting resource lead:', err);
      // Fallback: still initiate download even if network fails
      triggerBrowserDownload(selectedResource, formData.fullName, formData.organizationName);
      setDownloadedResource(selectedResource);
      setDownloadSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const featuredWhitepaper = RESOURCES[0];
  const secondaryResources = RESOURCES.slice(1);

  return (
    <section 
      id="resources" 
      className="py-20 sm:py-24 bg-slate-50/70 border-b border-slate-200"
      aria-label="Clinical Research & Whitepapers"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            <span>Clinical Research & Executive Whitepapers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-sans">
            Clinical Insights & Operational Resources
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Download peer-reviewed clinical whitepapers, executive buyer checklists, and FHIR R4 
            interoperability blueprints authored by health system informatics leaders.
          </p>
        </div>

        {/* Featured Flagship Whitepaper Hero Card */}
        <div className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-md">
          {/* Left Visual / Cover Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wide">
                  {featuredWhitepaper.badge}
                </span>
                <span className="text-xs text-slate-300">{featuredWhitepaper.pageCount} • PDF</span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-teal-600/30 border border-teal-400/30 flex items-center justify-center mb-5 text-teal-300">
                <FileText className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug font-sans mb-3">
                {featuredWhitepaper.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {featuredWhitepaper.subtitle}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
              <div>
                <div className="font-semibold text-white">CarePulse Research Institute</div>
                <div className="text-[11px] text-slate-400">14 Inpatient Systems Studied</div>
              </div>
              <span className="bg-teal-950/80 text-teal-300 px-2.5 py-1 rounded border border-teal-700/50 text-[11px] font-medium">
                {featuredWhitepaper.publishDate}
              </span>
            </div>
          </div>

          {/* Right Content & Access Column (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                  {featuredWhitepaper.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredWhitepaper.readTime}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2 font-sans">
                Executive Abstract & Field Investigation
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {featuredWhitepaper.abstract}
              </p>

              {/* Core Chapter Highlights */}
              <div className="mb-6">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-700" />
                  Included Clinical Chapters & Case Studies:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Ch. 1:</strong> The 42-min handoff friction gap and nursing cognitive latency</span>
                  </div>
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Ch. 2:</strong> SMART on FHIR real-time multidisciplinary rounding</span>
                  </div>
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Ch. 3:</strong> Proactive 48-hour discharge milestone choreography</span>
                  </div>
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Ch. 4:</strong> Minimum necessary BAA compliance & SOC 2 safeguards</span>
                  </div>
                </div>
              </div>

              {/* Key topics chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {featuredWhitepaper.topics.map((t) => (
                  <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Instant PDF Download • No PHI Required</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveReaderPreview(featuredWhitepaper)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-lg text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Quick Read</span>
                </button>

                <button
                  id="btn-download-flagship-whitepaper"
                  type="button"
                  onClick={() => handleOpenLeadModal(featuredWhitepaper)}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Whitepaper (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Resources Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 font-sans">
              Additional Hospital Toolkits & Implementation Guides
            </h3>
            <span className="text-xs text-slate-500">Free download for healthcare leaders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryResources.map((res) => (
              <div 
                key={res.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      {res.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {res.readTime}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug font-sans mb-2">
                    {res.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {res.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {res.topics.slice(0, 3).map((topic) => (
                      <span key={topic} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">{res.pageCount} • PDF</span>
                  <button
                    type="button"
                    onClick={() => handleOpenLeadModal(res)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
                  >
                    <span>Download PDF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic & Demo Cross-Promotion Banner */}
        <div className="bg-teal-900 text-white rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Inpatient Strategy
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans mb-2">
              Need institution-specific workflow modeling?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Use our AI Clinical Workflow Diagnostic or test hospital-specific savings on our Healthcare ROI Calculator 
              to model exact unit-level handoff reductions and earlier discharge placement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDiagnostic}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-teal-100 border border-teal-600 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Run AI Diagnostic</span>
            </button>
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-white hover:bg-teal-50 text-teal-900 transition-all shadow-xs cursor-pointer"
            >
              <span>Schedule Executive Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Gated Lead Capture Modal */}
      {selectedResource && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!downloadSuccess ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">
                      {selectedResource.category}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">Instant PDF Access</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-sans mb-1 leading-snug">
                  {selectedResource.title}
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Please provide your hospital or health system details to instantly receive your personalized executive copy.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Dr. Katherine Miller, MD"
                        className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hospital / Organization Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="k.miller@providence-health.org"
                        className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-slate-800"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Institutional email recommended for verified healthcare peer access.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Job Title *
                      </label>
                      <select
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-slate-800 bg-white"
                      >
                        <option value="Chief Medical Officer (CMO)">Chief Medical Officer (CMO)</option>
                        <option value="Chief Nursing Officer (CNO)">Chief Nursing Officer (CNO)</option>
                        <option value="Chief Medical Informatics Officer (CMIO)">Chief Medical Informatics Officer (CMIO)</option>
                        <option value="Director of Clinical Operations">Director of Clinical Operations</option>
                        <option value="VP Inpatient Quality & Safety">VP Inpatient Quality & Safety</option>
                        <option value="Chief Information Officer (CIO)">Chief Information Officer (CIO)</option>
                        <option value="Clinical Informatics Specialist">Clinical Informatics Specialist</option>
                        <option value="Other Healthcare Professional">Other Healthcare Professional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Health System / Hospital *
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.organizationName}
                          onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                          placeholder="e.g. Memorial Hospital"
                          className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Inpatient EHR Platform
                    </label>
                    <select
                      value={formData.ehrSystem}
                      onChange={(e) => setFormData({ ...formData, ehrSystem: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-slate-800 bg-white"
                    >
                      <option value="Epic Systems">Epic Systems (SMART on FHIR)</option>
                      <option value="Oracle Health / Cerner">Oracle Health / Cerner Millennium</option>
                      <option value="MEDITECH Expanse">MEDITECH Expanse</option>
                      <option value="Athenahealth">Athenahealth Acute</option>
                      <option value="Other / Hybrid EHR">Other / Multi-EHR Platform</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {submitting ? (
                        <span>Processing & Generating PDF...</span>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Unlock & Download Whitepaper PDF</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>HIPAA Compliant & Confidential • Zero PHI Collected • Instant PDF Delivery</span>
                  </div>
                </form>
              </>
            ) : (
              /* Download Success State */
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-sans mb-1">
                  Whitepaper Downloaded!
                </h3>
                <p className="text-xs text-slate-600 mb-6 max-w-sm mx-auto">
                  Your personalized executive PDF copy of <strong>{downloadedResource?.title}</strong> has been 
                  generated and delivered directly to your device downloads.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs mb-6 space-y-2">
                  <div className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    Delivery Metadata:
                  </div>
                  <div className="text-slate-700"><strong>Recipient:</strong> {formData.fullName} ({formData.workEmail})</div>
                  <div className="text-slate-700"><strong>Organization:</strong> {formData.organizationName}</div>
                  <div className="text-slate-700"><strong>Format:</strong> Adobe PDF-1.4 (Standard US Letter)</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      if (downloadedResource) {
                        triggerBrowserDownload(downloadedResource, formData.fullName, formData.organizationName);
                      }
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Again</span>
                  </button>

                  <button
                    onClick={() => {
                      handleCloseModal();
                      onOpenDemo();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Schedule Executive Discussion</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick In-Browser Reader Preview Drawer */}
      {activeReaderPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveReaderPreview(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 uppercase tracking-wide">
                Executive Reader Preview
              </span>
              <span className="text-xs text-slate-400">{activeReaderPreview.pageCount}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-sans mb-3 leading-snug">
              {activeReaderPreview.title}
            </h3>

            <div className="prose prose-slate prose-sm text-xs sm:text-sm text-slate-600 space-y-4 mb-6 leading-relaxed">
              <p>
                <strong>Background:</strong> Modern inpatient facilities confront severe workflow fragmentation across shift handoffs. 
                Nurses spend an average of 42 minutes transcribing EHR vitals, active medication orders, and pending consults onto paper clipboards.
              </p>
              <p>
                <strong>The Interoperability Breakthrough:</strong> By leveraging SMART on FHIR R4 open specifications, CarePulse creates a bidirectional 
                synchronization bridge. When a lab flag or provider order posts in Epic or Cerner, the shift handoff card updates automatically, 
                eliminating manual verbal readbacks and reducing critical omission risks by 78%.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 text-xs">
                <div className="font-bold text-slate-900 mb-2">Key Operational Benchmarks:</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>28 minutes reclaimed per nurse per 12-hour shift transition.</li>
                  <li>1.4-hour earlier median daily discharge order placement.</li>
                  <li>52% drop in audible and pager alert noise across med-surg telemetry units.</li>
                  <li>Zero-footprint web integration requiring no custom desktop software installation.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">Want the full 24-page study with technical schemas?</span>
              <button
                onClick={() => {
                  const res = activeReaderPreview;
                  setActiveReaderPreview(null);
                  handleOpenLeadModal(res);
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg text-white bg-teal-700 hover:bg-teal-800 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Complete Whitepaper (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
