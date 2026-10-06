import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  ExternalLink, 
  FileText, 
  Layers, 
  Cpu, 
  Database,
  Building2,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';

export interface ComplianceCertification {
  id: string;
  name: string;
  shortTag: string;
  badgeType: 'hipaa' | 'soc2' | 'iso' | 'hitrust' | 'nist' | 'fhir';
  standard: string;
  verificationStatus: string;
  auditorAuthority: string;
  validityWindow: string;
  coreSafeguards: string[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  executiveSummary: string;
}

export const COMPLIANCE_ITEMS: ComplianceCertification[] = [
  {
    id: 'hipaa-hitech',
    name: 'HIPAA & HITECH Compliance',
    shortTag: 'HIPAA Ready',
    badgeType: 'hipaa',
    standard: '45 CFR Parts 160 & 164 (Security, Privacy & Breach Rules)',
    verificationStatus: 'Mandatory BAA Executed for Every Covered Entity',
    auditorAuthority: 'Independent Healthcare Regulatory Legal Counsel & Internal Privacy Office',
    validityWindow: 'Continuous Enforcement • Annual Policy Attestation',
    executiveSummary: 'CarePulse operates strictly as a Business Associate under HIPAA. We execute comprehensive, mutual Business Associate Agreements (BAAs) prior to ingesting any Protected Health Information (PHI). We enforce the HIPAA Minimum Necessary rule, mandate AES-256 encryption at rest, and contractually pledge zero model training on patient data.',
    coreSafeguards: [
      'Executable Business Associate Agreements (BAAs) covering all inpatient and ambulatory workflows',
      'Zero model training or secondary commercialization of patient protected health information (PHI)',
      'Granular Role-Based Access Control (RBAC) restricting patient chart visibility to assigned clinical care teams',
      'Automated breach notification procedures exceeding HHS 60-day reporting statutory requirements'
    ],
    technicalSpecs: [
      { label: 'Data at Rest', value: 'AES-256 with Automated Envelope Key Rotation' },
      { label: 'Data in Transit', value: 'Mandatory TLS 1.3 with Perfect Forward Secrecy' },
      { label: 'Access Protocol', value: 'Role-Based Access Control (RBAC) & Minimum Necessary' },
      { label: 'Data Tenancy', value: 'Logical Multi-Tenant Isolation or Dedicated Single-Tenant VPC' }
    ]
  },
  {
    id: 'soc2-type2',
    name: 'AICPA SOC 2 Type II Certified',
    shortTag: 'SOC 2 Type II',
    badgeType: 'soc2',
    standard: 'AICPA Trust Services Criteria (Security, Availability & Confidentiality)',
    verificationStatus: 'Annual Unqualified Audit Report Available Under NDA',
    auditorAuthority: 'Accredited Independent CPA Auditing Firm (AICPA Peer Reviewed)',
    validityWindow: 'Annual Recurring Audit Cycle (Current Period Verified)',
    executiveSummary: 'Undergoes recurring annual third-party SOC 2 Type II examination evaluating system operations and controls across a continuous multi-month audit window. The audit tests technical safeguards, employee background checks, automated CI/CD security pipelines, and disaster recovery failover.',
    coreSafeguards: [
      'Independent examination testing operating effectiveness over a minimum 6-month historical window',
      'Quarterly third-party network penetration testing and continuous vulnerability scanning',
      'Automated change management with mandatory dual-peer code review and static analysis testing',
      'Multi-region disaster recovery architecture tested semi-annually with < 15 minute RPO'
    ],
    technicalSpecs: [
      { label: 'Audit Standard', value: 'AICPA Trust Services Criteria (TSC)' },
      { label: 'Examined Principles', value: 'Security, Availability, and Confidentiality' },
      { label: 'Pen Testing', value: 'Annual Third-Party Grey-Box Penetration Audit' },
      { label: 'Disaster Recovery', value: 'Hot-Standby Cloud Failover (RTO < 30m, RPO < 15m)' }
    ]
  },
  {
    id: 'iso-27001',
    name: 'ISO/IEC 27001 & ISO 27701',
    shortTag: 'ISO 27001 / 27701',
    badgeType: 'iso',
    standard: 'ISO/IEC 27001:2022 (ISMS) & ISO/IEC 27701:2019 (PIMS Privacy)',
    verificationStatus: 'Accredited Global Certification Standard Aligned',
    auditorAuthority: 'Internationally Accredited ISO Conformity Assessment Registrar',
    validityWindow: '3-Year Certification Lifecycle with Annual Surveillance Audits',
    executiveSummary: 'CarePulse aligns with ISO/IEC 27001 for Information Security Management Systems (ISMS) and ISO/IEC 27701 for Privacy Information Management Systems (PIMS). This global framework enforces structured risk assessments, supplier relationship controls, physical security, and cryptographic asset protection.',
    coreSafeguards: [
      'Formalized Information Security Management System (ISMS) governing software engineering and operations',
      'Privacy Information Management System (PIMS) establishing data controller and data processor boundaries',
      'Comprehensive vendor risk management program auditing third-party infrastructure and sub-processors',
      'Continuous employee security awareness training with recurring simulated phishing evaluations'
    ],
    technicalSpecs: [
      { label: 'Security Standard', value: 'ISO/IEC 27001:2022 Information Security Management' },
      { label: 'Privacy Extension', value: 'ISO/IEC 27701:2019 Privacy Information Management' },
      { label: 'Risk Methodology', value: 'ISO 31000 Continuous Risk Assessment Framework' },
      { label: 'Sub-processors', value: 'Annual SOC 2 / ISO Verification Required for All Vendors' }
    ]
  },
  {
    id: 'hitrust-csf',
    name: 'HITRUST CSF v11 Framework',
    shortTag: 'HITRUST Aligned',
    badgeType: 'hitrust',
    standard: 'HITRUST Common Security Framework v11 (Healthcare Security Baseline)',
    verificationStatus: 'Maturity Scored Across 19 Healthcare Control Domains',
    auditorAuthority: 'Health Information Trust Alliance (HITRUST Alliance)',
    validityWindow: 'Aligned to v11 Core Healthcare Specifications',
    executiveSummary: 'The HITRUST Common Security Framework provides the healthcare industry benchmark for harmonizing HIPAA, NIST, ISO, and federal requirements into a single comprehensive matrix. CarePulse controls are mapped across all 19 HITRUST CSF domains to expedite hospital vendor risk assessments.',
    coreSafeguards: [
      'Comprehensive mapping across 19 security domains including Endpoint Protection and Transmission Security',
      'Immutable SIEM audit streaming recording actor, target patient MRN, timestamp, and action type',
      'Proximity badge authentication integration via Imprivata OneSign for shared hospital workstations',
      'Strict session timeout policies enforced across clinical desktop and mobile device interfaces'
    ],
    technicalSpecs: [
      { label: 'Framework Version', value: 'HITRUST CSF v11 Control Matrix' },
      { label: 'Domain Coverage', value: '19 Operational & Technical Healthcare Security Domains' },
      { label: 'Audit Logging', value: 'Immutable WORM-compliant SIEM Audit Stream (Splunk/Sentinel)' },
      { label: 'Identity Protocol', value: 'SAML 2.0 / SCIM / Imprivata Proximity Badge Integration' }
    ]
  },
  {
    id: 'nist-sp800',
    name: 'NIST SP 800-66 & 800-53',
    shortTag: 'NIST 800-53 Aligned',
    badgeType: 'nist',
    standard: 'NIST SP 800-66 Rev 2 (HIPAA Security Rule) & NIST SP 800-53 Rev 5',
    verificationStatus: 'Federal Healthcare Information Security Guidelines Aligned',
    auditorAuthority: 'National Institute of Standards and Technology (NIST Benchmark)',
    validityWindow: 'Continuous Automated Configuration Compliance Audits',
    executiveSummary: 'Built in direct alignment with NIST Special Publication 800-66 Rev 2 guidelines for implementing the HIPAA Security Rule. Incorporates NIST SP 800-53 Rev 5 technical controls for identity governance, cryptographic key storage, and vulnerability remediation timelines.',
    coreSafeguards: [
      'NIST-compliant vulnerability remediation with mandatory critical patch deployment within 72 hours',
      'Customer-Managed Encryption Keys (CMEK) option supported for enterprise health system tenancy',
      'Principle of Least Privilege enforced via zero-standing-privilege infrastructure access',
      'Automated secret rotation and hardware security module (HSM) backing for cryptographic roots'
    ],
    technicalSpecs: [
      { label: 'NIST Framework', value: 'NIST SP 800-66 Rev 2 & SP 800-53 Rev 5 Controls' },
      { label: 'Key Architecture', value: 'Cloud KMS with Customer-Managed Keys (CMEK) Option' },
      { label: 'Privilege Model', value: 'Zero-Standing-Privilege with Just-In-Time Elevation' },
      { label: 'Patch SLA', value: 'Critical Vulnerability Remediation Window ≤ 72 Hours' }
    ]
  },
  {
    id: 'smart-fhir',
    name: 'SMART on FHIR R4 & ONC Cures',
    shortTag: 'FHIR R4 Certified',
    badgeType: 'fhir',
    standard: 'HL7 FHIR Release 4 • 21st Century Cures Act Interoperability',
    verificationStatus: 'Epic Systems & Oracle Cerner Developer Partner Ready',
    auditorAuthority: 'Health Level Seven (HL7) & Office of the National Coordinator (ONC)',
    validityWindow: 'Certified API Standard Compliance',
    executiveSummary: 'CarePulse is engineered on certified healthcare interoperability standards. Our native SMART on FHIR R4 connectors integrate into Epic Hyperspace, Cerner PowerChart, and MEDITECH Expanse via OAuth 2.0 Bearer authorization, guaranteeing seamless bi-directional data flow with zero dual-charting.',
    coreSafeguards: [
      'OAuth 2.0 SMART App Launch framework supporting clinician single sign-on from within native EHR',
      'Fine-grained FHIR R4 resource scopes ensuring minimum necessary patient observation retrieval',
      'Bidirectional HL7 v2.x (ADT, ORM, ORU) interface engine integration with Mirth and Cloverleaf',
      'Sub-second API latency with 99.98% high-availability multi-region clinical uptime SLA'
    ],
    technicalSpecs: [
      { label: 'FHIR Specification', value: 'HL7 FHIR R4 (US Core Implementation Guide STU3)' },
      { label: 'Auth Standard', value: 'SMART App Launch Framework / OAuth 2.0 with PKCE' },
      { label: 'Legacy Protocols', value: 'HL7 v2.3/v2.5.1 (ADT Admissions, ORM Orders, ORU Labs)' },
      { label: 'EHR Gateways', value: 'Epic App Orchard / Oracle Cerner Open Developer / MEDITECH' }
    ]
  }
];

export const TrustComplianceStrip: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<ComplianceCertification | null>(null);

  const renderBadgeIcon = (type: ComplianceCertification['badgeType']) => {
    switch (type) {
      case 'hipaa':
        return (
          <div className="w-12 h-12 rounded-xl bg-teal-900/90 text-teal-300 border border-teal-700/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Lock className="w-6 h-6 text-teal-400" />
          </div>
        );
      case 'soc2':
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-900/90 text-blue-300 border border-blue-700/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
        );
      case 'iso':
        return (
          <div className="w-12 h-12 rounded-xl bg-indigo-900/90 text-indigo-300 border border-indigo-700/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6 text-indigo-400" />
          </div>
        );
      case 'hitrust':
        return (
          <div className="w-12 h-12 rounded-xl bg-emerald-900/90 text-emerald-300 border border-emerald-700/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6 text-emerald-400" />
          </div>
        );
      case 'nist':
        return (
          <div className="w-12 h-12 rounded-xl bg-cyan-900/90 text-cyan-300 border border-cyan-700/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Cpu className="w-6 h-6 text-cyan-400" />
          </div>
        );
      case 'fhir':
        return (
          <div className="w-12 h-12 rounded-xl bg-amber-900/90 text-amber-300 border border-amber-700/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Layers className="w-6 h-6 text-amber-400" />
          </div>
        );
    }
  };

  return (
    <section 
      id="trust-and-compliance"
      className="bg-slate-950 text-white py-14 sm:py-18 border-y border-slate-800 relative overflow-hidden"
      aria-label="Enterprise Trust, Security and Regulatory Compliance Certifications"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-950 text-teal-400 border border-teal-800/80 mb-3 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Enterprise Healthcare Security & Governance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-sans">
              Built for Regulated Healthcare Environments
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              CarePulse enforces defense-in-depth safeguards across all clinical operational layers. Fully accredited to satisfy the strictest hospital vendor risk assessments, CISO security reviews, and Institutional Review Boards.
            </p>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 text-xs">
            <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">BAA Ready:</span>
              <strong className="text-white">100% Included</strong>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-slate-300">PHI Retention:</span>
              <strong className="text-white">Zero Model Training</strong>
            </div>

            <Link
              to="/security"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              <span>Security Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 6 Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {COMPLIANCE_ITEMS.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/60 rounded-2xl p-6 transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-lg relative overflow-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
              aria-label={`View ${cert.name} certification details`}
            >
              <div>
                {/* Top Badge & Certification Type */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  {renderBadgeIcon(cert.badgeType)}

                  <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-950/80 border border-teal-800/80 px-2 py-0.5 rounded shrink-0">
                    {cert.shortTag}
                  </span>
                </div>

                {/* Certification Title & Authority */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition-colors mb-1.5">
                  {cert.name}
                </h3>

                <div className="text-xs text-slate-400 mb-3 font-mono leading-tight">
                  {cert.standard}
                </div>

                {/* Summary Excerpt */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {cert.executiveSummary}
                </p>
              </div>

              {/* Card Footer: Status & Inspector Trigger */}
              <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{cert.validityWindow.split('•')[0]}</span>
                </span>

                <span className="text-xs font-semibold text-teal-400 group-hover:text-teal-300 flex items-center gap-1 shrink-0 ml-2">
                  <span>Inspect Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Assurance Strip */}
        <div className="mt-10 p-5 sm:p-6 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-950 text-teal-400 border border-teal-800/80 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">
                Preparing for a Hospital Vendor Risk Assessment or Clinical Architecture Committee?
              </div>
              <p className="text-slate-400 mt-0.5">
                We provide our complete Third-Party SOC 2 Type II Examination, HECVAT, and BAA Execution Packet under mutual NDA.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/security"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Technical Security Architecture
            </Link>
            <Link
              to="/demo"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 font-bold transition-colors shadow-xs"
            >
              Request Compliance Packet
            </Link>
          </div>
        </div>

      </div>

      {/* Certification Deep-Dive Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-700 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Certification Inspector"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              {renderBadgeIcon(selectedCert.badgeType)}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 id="cert-modal-title" className="text-xl font-bold text-white">
                    {selectedCert.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-teal-300 bg-teal-950 border border-teal-800 px-2 py-0.5 rounded">
                    {selectedCert.shortTag}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  {selectedCert.standard}
                </div>
                <div className="text-xs text-teal-400 mt-0.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedCert.verificationStatus}</span>
                </div>
              </div>
            </div>

            {/* Executive Summary Callout */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4.5 mb-6 text-xs text-slate-300 leading-relaxed">
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Audit Scope & Executive Summary
              </div>
              <p>{selectedCert.executiveSummary}</p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Cryptographic & Implementation Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {selectedCert.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-mono">{spec.label}</div>
                    <div className="text-slate-200 font-semibold mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Safeguards */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Operational & Technical Safeguards Enforced
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedCert.coreSafeguards.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auditor & Governance Authority */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-slate-500">Examining Authority:</span>{' '}
                <strong className="text-slate-300">{selectedCert.auditorAuthority}</strong>
              </div>
              <div className="text-teal-400 font-mono">
                {selectedCert.validityWindow}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
              <Link
                to="/security"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center transition-colors"
              >
                Full Security Controls Hub
              </Link>
              <Link
                to="/demo"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 font-bold text-center transition-colors shadow-sm"
              >
                Request Audit Report (Under NDA)
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
