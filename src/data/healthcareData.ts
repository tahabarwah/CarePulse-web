import { BenefitItem, WorkflowStep, RoleUseCase, SecurityControl, IntegrationPartner, FaqItem } from '../types';

export const HERO_METRICS = [
  { value: '38%', label: 'Reduction in Shift Handoff Duration', sub: 'Measured across inpatient units' },
  { value: '1.4 hrs', label: 'Earlier Average Discharge Time', sub: 'Unlocking afternoon bed throughput' },
  { value: '54%', label: 'Decrease in Pager & Alert Noise', sub: 'Algorithmic prioritization & deduplication' },
  { value: '99.98%', label: 'Enterprise Uptime SLA', sub: 'Redundant multi-region infrastructure' },
];

export const TRUSTED_INSTITUTIONS = [
  { name: 'MetroHealth Regional Network', type: '600-bed Acute Care' },
  { name: 'Cascadia Health System', type: 'Multi-hospital System' },
  { name: 'St. Jude Academic Care Center', type: 'Academic Medical Center' },
  { name: 'Vanguard Ambulatory Network', type: '45 Outpatient Clinics' },
  { name: 'Pinecrest Children\'s Health', type: 'Specialty Pediatric Center' },
];

export const PRODUCT_BENEFITS: BenefitItem[] = [
  {
    id: 'sbar-handoffs',
    tag: 'Care Continuity',
    title: 'Standardized SBAR Shift Transitions',
    description: 'Eliminate fragmented paper printouts and forgotten verbal handoffs with structured, automatically collated Situation-Background-Assessment-Recommendation shift packets.',
    metric: '26 mins',
    metricLabel: 'Saved per nurse per 12-hr shift',
    iconName: 'ClipboardList',
    features: [
      'Auto-syncs current vitals, pending labs, and active orders directly from EHR',
      'Shift-to-shift acknowledgment audit trail with digital signature verification',
      'Context-aware patient acuity tags highlighting high-risk trajectory changes',
      'Cross-unit transfer handoff templates for ICU-to-stepdown transitions'
    ],
  },
  {
    id: 'multidisciplinary-rounds',
    tag: 'Team Synchronization',
    title: 'Synchronized Multidisciplinary Rounding',
    description: 'Bring hospitalists, bedside nurses, clinical pharmacists, physical therapists, and case managers onto a single real-time rounding dashboard.',
    metric: '4.2x',
    metricLabel: 'Faster barrier resolution',
    iconName: 'Users',
    features: [
      'Live synchronized patient cards updating simultaneously across tablets and workstations',
      'Automated rounding order sequencing optimized by physical room geography',
      'Instant consult dispatch with target response time tracking',
      'Direct order verification flag preventing duplicate testing'
    ],
  },
  {
    id: 'alert-fatigue',
    tag: 'Clinician Wellness',
    title: 'Intelligent Alert Triage & Noise Filtering',
    description: 'Mitigate the cognitive exhaustion that fuels clinical burnout. Contextually bundle non-critical alerts while guaranteeing immediate escalation for vital deterioration.',
    metric: '58%',
    metricLabel: 'Fewer non-actionable alarms',
    iconName: 'BellOff',
    features: [
      'Clinical context clustering that suppresses repeat telemetry false alarms',
      'Escalation fallback paths when attending clinicians are scrubbed in surgery',
      'Quiet-hours telemetry profiles tailored for recovery wards without compromising safety',
      'Unit-level analytics identifying alarm trigger anomalies'
    ],
  },
  {
    id: 'discharge-velocity',
    tag: 'Capacity Management',
    title: 'Proactive Discharge Barrier Resolution',
    description: 'Identify discharge hurdles 48 hours in advance—including transport, DME authorization, SNF placement, and pharmacy reconciliations—to free inpatient beds faster.',
    metric: '1.2 days',
    metricLabel: 'Avoidable hospital day reduction',
    iconName: 'DoorOpen',
    features: [
      'Automated milestone checklists (e.g., Home O2 delivery, PT clearance, Meds to Beds)',
      'Real-time case management tracker with external post-acute facility status',
      'Estimated Time of Discharge (EDD) calibration based on historical clinical pathways',
      'Emergency Department boarding decompression alerts'
    ],
  },
  {
    id: 'closed-loop-tasks',
    tag: 'Accountability',
    title: 'Closed-Loop Task Orchestration',
    description: 'Convert informal verbal orders and hallway requests into tracked, auditable micro-tasks with definitive clinician ownership and completion timestamps.',
    metric: '100%',
    metricLabel: 'Audited task accountability',
    iconName: 'CheckCircle2',
    features: [
      'One-tap task delegation from attending physicians to respiratory or nursing staff',
      'Location-aware task routing directing requests to the nearest available clinician',
      'Voice-to-structured task capture designed for sterile field environments',
      'Stat lab results and critical imaging read notifications delivered with read receipts'
    ],
  },
  {
    id: 'cross-facility-census',
    tag: 'Operational Intelligence',
    title: 'Health System Wide Capacity Intelligence',
    description: 'Executive command view across ICUs, step-downs, med-surg, and PACU units across regional campuses for balanced transfer management and resource allocation.',
    metric: '18%↑',
    metricLabel: 'Inpatient bed utilization rate',
    iconName: 'LayoutGrid',
    features: [
      'Live census heatmaps by clinical service line and infectious isolation status',
      'Predictive surgical backlog and emergency intake capacity projections',
      'Transfer center coordination hub with inter-facility ambulance dispatch tracking',
      'Staff-to-patient acuity ratio balancing recommendations'
    ],
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    id: 'intake-admission',
    phase: 'Admission & Ingest',
    title: 'Continuous EHR Ingest & Unit Census Sync',
    shortDesc: 'Instant patient intake via HL7 ADT and FHIR R4 Encounter subscriptions with zero manual re-entry.',
    detailedDescription: 'As soon as a patient is admitted from the Emergency Department or Post-Anesthesia Care Unit (PACU), CarePulse captures patient demographics, chief complaints, fall-risk indices, and isolation requirements directly from Epic or Cerner.',
    actionItems: [
      'Ingest HL7 ADT-A01/A02/A08 message streams without polling delay',
      'Assign clinical primary care team (Hospitalist, Primary RN, Case Manager)',
      'Initialize standardized clinical pathway tailored to primary admission diagnosis',
      'Map telemetry monitor and bed sensor endpoints automatically'
    ],
    fhirResources: ['Patient', 'Encounter', 'Condition', 'AllergyIntolerance'],
    mockData: {
      unit: 'Telemetry Stepdown 4-West',
      patientId: 'PT-88241 (Bed 408-A)',
      acuity: 'Moderate',
      assignedTeam: ['Dr. Rivera (Hospitalist)', 'J. Morales, RN', 'T. Vance, LCSW'],
      currentMilestone: 'Initial Nursing Assessment & VTE Prophylaxis Verified',
      pendingAction: 'Awaiting Echo Read & Electrolyte Lab Panel',
      timeRemaining: '38 mins into shift'
    }
  },
  {
    stepNumber: 2,
    id: 'multidisciplinary-rounding',
    phase: 'Daily Care Rounds',
    title: 'Synchronized Multidisciplinary Rounding',
    shortDesc: 'Interdisciplinary care teams align in 3-minute structured rounding huddles using live digital whiteboards.',
    detailedDescription: 'Replaces disorganized dry-erase boards with a synchronized digital rounding console. Hospitalists, bedside nurses, clinical pharmacists, and physical therapists review clinical trajectory, active orders, and discharge hurdles simultaneously.',
    actionItems: [
      'Real-time aggregation of overnight vitals, lab delta trends, and intake/output',
      'Instant recording of daily clinical goals visible to the patient bedside tablet',
      'Pharmacist medication reconciliation flag for high-risk anticoagulants/antibiotics',
      'Automated escalation of physical therapy clearance barriers'
    ],
    fhirResources: ['Observation', 'CarePlan', 'MedicationRequest', 'ServiceRequest'],
    mockData: {
      unit: 'Medical-Surgical 5-North',
      patientId: 'PT-91042 (Bed 512-B)',
      acuity: 'High',
      assignedTeam: ['Dr. Campbell (Cardiology)', 'E. Becker, BSN', 'R. Patel, PharmD'],
      currentMilestone: 'Morning Multidisciplinary Round Completed',
      pendingAction: 'Titration Protocol Approval & Dietary Diet Texture Advance',
      timeRemaining: 'Next review: 14:00'
    }
  },
  {
    stepNumber: 3,
    id: 'closed-loop-escalations',
    phase: 'Active Shift Orchestration',
    title: 'Closed-Loop Task Tracking & Critical Escalation',
    shortDesc: 'Time-sensitive clinical requests routed with fallback chains and digital read-receipt audits.',
    detailedDescription: 'Eliminates lost sticky notes and unacknowledged hallway requests. When an urgent consult, repeat blood draw, or nursing assistance task is spawned, CarePulse monitors acknowledgment time and automatically cascades to backup personnel if unattended.',
    actionItems: [
      'Priority categorization (Stat 15-min, Urgent 1-hr, Routine shift target)',
      'Dynamic escalation ladder: Bedside RN → Charge RN → Clinical Nurse Specialist',
      'Two-way acknowledgment confirming nurse or tech has received and accepted duty',
      'Cryptographic tamper-evident timestamping for clinical medicolegal governance'
    ],
    fhirResources: ['Task', 'Communication', 'DiagnosticReport'],
    mockData: {
      unit: 'Cardiothoracic Stepdown 3-East',
      patientId: 'PT-76490 (Bed 318)',
      acuity: 'High',
      assignedTeam: ['Dr. Kowalski (CT Surg)', 'M. Reynolds, RN', 'Charge Nurse Station'],
      currentMilestone: 'Stat Potassium Repeat Order Dispatched to Phlebotomy',
      pendingAction: 'Acknowledged by Phlebotomy tech (4 min response time)',
      timeRemaining: 'Lab turnaround: 18 min'
    }
  },
  {
    stepNumber: 4,
    id: 'discharge-readiness',
    phase: 'Discharge & Transition',
    title: 'Proactive Discharge Barrier Resolution & Handoff',
    shortDesc: 'Solve pharmacy, DME, transport, and post-acute barriers hours before the planned discharge time.',
    detailedDescription: 'CarePulse monitors the multi-point discharge readiness criteria in parallel: final physician summary, home oxygen delivery confirmation, skilled nursing facility (SNF) insurance prior authorization, and patient education verification.',
    actionItems: [
      'Multi-stakeholder discharge sign-off matrix (MD, RN, Case Management, Pharmacy)',
      'Automated Meds-to-Beds bedside delivery coordination with hospital outpatient pharmacy',
      'Post-acute referral document packet bundle auto-generation',
      'Instant bed status release notice sent to environmental services (EVS) for turnover'
    ],
    fhirResources: ['CarePlan', 'Appointment', 'DocumentReference'],
    mockData: {
      unit: 'Orthopedic Recovery 2-South',
      patientId: 'PT-83912 (Bed 224-A)',
      acuity: 'Discharge Pending',
      assignedTeam: ['Dr. Sterling (Ortho)', 'K. O\'Connor, RN', 'D. Huang, MSW'],
      currentMilestone: 'Prior-Auth Secured for Home Physical Therapy Services',
      pendingAction: 'Meds-to-Beds bedside delivery & ride arrival confirmed for 11:30',
      timeRemaining: 'Estimated bed turn: 12:15'
    }
  }
];

export const ROLE_USE_CASES: RoleUseCase[] = [
  {
    id: 'cmio-physicians',
    roleTitle: 'Chief Medical Information Officers & Attending Physicians',
    personaCategory: 'Physicians & CMIO',
    headline: 'Reclaim Clinical Autonomy and Cut In-EHR Clicking Fatigue',
    corePains: [
      'Clinicians spend 2+ hours nightly on "pajama time" charting and hunting for disparate test results',
      'Fragmented communication channels lead to delayed consult response times and physician burnout',
      'Lack of unified clinical pathway views across attending, consulting, and resident teams'
    ],
    solutionCapabilities: [
      'SMART-on-FHIR embedded views directly within Epic Hyperspace and Cerner Millennium',
      'Synthesized rounding sheets that surface trajectory anomalies in seconds',
      'One-touch consult ordering with verified acknowledgment timestamps',
      'Zero double-charting: all workflow milestones push cleanly back to the legal medical record'
    ],
    quantifiedOutcome: 'Reclaims an average of 48 minutes per inpatient physician shift, drastically diminishing off-hours EHR documentation.',
    quote: {
      text: 'CarePulse allows our hospitalists to step onto the floor and immediately know which 3 patients require urgent rounding, without sifting through dozens of buried narrative notes.',
      author: 'Marcus Vance, MD, MS, FACP',
      org: 'Chief Medical Information Officer, Cascade Health Network'
    }
  },
  {
    id: 'cno-nursing',
    roleTitle: 'Chief Nursing Officers, Nurse Managers & Floor RNs',
    personaCategory: 'Nursing & Floor Ops',
    headline: 'Eliminate Chaotic Handoffs and Restore Focus to Bedside Patient Care',
    corePains: [
      'Nurse shift handoffs average 45+ minutes of unstructured verbal reading and scribbled paper sheets',
      'Constant phone interruptions, overhead pages, and false alarms interrupt sterile medication passes',
      'Floor charge nurses lack real-time visibility into staff workload and patient acuity imbalances'
    ],
    solutionCapabilities: [
      'Digital SBAR handoff workflows pre-populated with active IV drips, vitals, and pending tasks',
      'Intelligent notification quiet zones during medication administration and wound dressing changes',
      'Live charge nurse board showing nurse-to-patient acuity weighting across the entire unit',
      'One-tap call-light escalation to nursing assistants for non-clinical patient requests'
    ],
    quantifiedOutcome: 'Reduces nursing shift change time by 38% and cuts non-urgent clinical interruptions during medication administration by over 50%.',
    quote: {
      text: 'Our bedside nurses no longer start their shifts feeling behind. The structured SBAR handoff gives them complete clarity in under 15 minutes, preserving their clinical energy.',
      author: 'Elena Rostova, MSN, RN, NEA-BC',
      org: 'VP of Patient Care Services & CNO, MetroHealth Regional'
    }
  },
  {
    id: 'coo-operations',
    roleTitle: 'Chief Operating Officers & Hospital Administration',
    personaCategory: 'Health System Ops & COO',
    headline: 'Accelerate Discharge Velocity and Maximize Operating Capacity',
    corePains: [
      'Discharges clustered between 3 PM and 6 PM cause severe Emergency Department boarding and ambulance diversions',
      'Avoidable hospital days resulting from delayed skilled nursing approvals and weekend consult barriers',
      'Siloed operating data obscures bottlenecks until monthly retrospective committee reviews'
    ],
    solutionCapabilities: [
      'Proactive 36-hour discharge hurdle tracking with automated case management alerts',
      'Predictive capacity forecasting integrating surgical elective admissions with ED intake',
      'Immediate Environmental Services (EVS) dispatch upon discharge order confirmation',
      'System-wide executive command dashboards tracking throughput metrics in real time'
    ],
    quantifiedOutcome: 'Advances median inpatient discharge time by 1.4 hours earlier in the day, reducing ED boarding hours by 22%.',
    quote: {
      text: 'Every hour our inpatient beds sit idle waiting for paperwork or EVS turnover is an hour an emergency room patient waits in a hallway. CarePulse smoothed our entire hospital flow.',
      author: 'David K. Hensley, FACHE',
      org: 'Chief Operating Officer, St. Jude Academic Health System'
    }
  },
  {
    id: 'ciso-health-it',
    roleTitle: 'Chief Information Security Officers & Health IT Leadership',
    personaCategory: 'CISO & Health IT',
    headline: 'Ironclad Security and Standards-Based Interoperability with Zero Compromise',
    corePains: [
      'Third-party software sprawl increases attack surfaces and creates regulatory exposure',
      'Uncertainty around AI tools and risk of Protected Health Information (PHI) model leaks',
      'Complex legacy HL7 feeds breaking during EHR upgrades and causing prolonged downtime'
    ],
    solutionCapabilities: [
      'Full BAA execution with dedicated VPC tenant isolation and customer-managed KMS encryption',
      'AES-256 encryption at rest, TLS 1.3 in transit with strict HSTS and forward secrecy',
      'SAML 2.0 / SCIM federated identity with Okta, Azure AD, and Imprivata integration',
      'Immutable, tamper-evident audit logging for all PHI access in compliance with HIPAA Technical Safeguards',
      'Zero model retention: PHI is never used to train generalized foundation models'
    ],
    quantifiedOutcome: 'Accelerates IT vendor risk assessment with a turnkey compliance packet, pre-mapped SOC 2 Type II controls, and standard FHIR R4 APIs.',
    quote: {
      text: 'CarePulse was one of the few healthcare tech vendors whose security documentation didn\'t use hand-waving buzzwords. Their BAA, technical controls, and audit trails passed our rigorous review on the first pass.',
      author: 'Alicia Thorne, CISSP, HCISPP',
      org: 'Chief Information Security Officer, Vanguard Health Systems'
    }
  },
  {
    id: 'case-managers',
    roleTitle: 'Care Coordinators, Case Managers & Social Work',
    personaCategory: 'Care Coordination & Case Mgmt',
    headline: 'Resolve Post-Acute Barriers Early to Prevent Length of Stay Outliers',
    corePains: [
      'Discovering missing physical therapy notes or pending DME orders on the morning of discharge',
      'Repetitive manual phone calls to outside skilled nursing facilities (SNF) and home health agencies',
      'Incomplete handoffs leading to preventable 30-day readmissions and CMS penalties'
    ],
    solutionCapabilities: [
      'Automated barrier checklist flagging pending prior-authorizations 48 hours in advance',
      'Direct integration with post-acute placement networks and DME vendor dispatchers',
      'Standardized post-discharge transition summaries shared securely with outpatient clinics',
      'High-risk readmission risk scoring based on clinical and social determinants of health (SDOH)'
    ],
    quantifiedOutcome: 'Reduces avoidable post-acute placement delays by 1.2 days per complex discharge, lowering 30-day readmission risk.',
    quote: {
      text: 'I can see exactly where every pending auth and transport booking stands across my 28 patients in one clean list. It turned fire drills into predictable workflows.',
      author: 'Tamika Washington, LCSW, ACM-SW',
      org: 'Director of Care Coordination, Pinecrest Health'
    }
  }
];

export const SECURITY_CONTROLS: SecurityControl[] = [
  {
    category: 'Technical Safeguards',
    title: 'Cryptographic Protections (At Rest & In Transit)',
    description: 'All customer data, clinical logs, and transactional records are encrypted at rest using AES-256 with automated key rotation. All communications over public networks mandate TLS 1.3 with Perfect Forward Secrecy.',
    specification: 'AES-256 / TLS 1.3 / HSTS Enforced',
    supportedStatus: 'Production Standard'
  },
  {
    category: 'Technical Safeguards',
    title: 'Customer-Managed Encryption Keys (CMEK)',
    description: 'Enterprise healthcare systems may opt for KMS-managed cryptographic keys stored in their own Google Cloud or AWS tenancy, maintaining cryptographic revocation authority.',
    specification: 'AWS KMS / GCP Cloud KMS',
    supportedStatus: 'Enterprise Add-On'
  },
  {
    category: 'Access & Identity Governance',
    title: 'Role-Based Access Control (RBAC) & Minimum Necessary',
    description: 'Enforces strict adherence to the HIPAA Minimum Necessary rule. Clinicians only access PHI for patients actively admitted to their clinical service line or assigned floor.',
    specification: 'Granular Role & Unit Permission Matrices',
    supportedStatus: 'Native Capability'
  },
  {
    category: 'Access & Identity Governance',
    title: 'Enterprise SSO, SAML 2.0 & Imprivata Tap-In',
    description: 'Integrates natively with health system identity providers including Microsoft Entra ID (Azure AD), Okta, Ping Identity, and Imprivata OneSign proximity badge tap.',
    specification: 'SAML 2.0 / OIDC / SCIM v2 / Imprivata',
    supportedStatus: 'Standard Integration'
  },
  {
    category: 'Access & Identity Governance',
    title: 'Immutable, Tamper-Evident Audit Logging',
    description: 'Every interaction involving Protected Health Information (PHI)—including views, searches, exports, and status changes—is immutably recorded with actor ID, IP, and UTC timestamp.',
    specification: 'SIEM Integration (Splunk, Datadog, Sentinel)',
    supportedStatus: 'Continuous Export'
  },
  {
    category: 'Compliance Readiness',
    title: 'Executable Business Associate Agreements (BAA)',
    description: 'CarePulse executes comprehensive BAAs with all covered entities and business associates prior to production deployment, legally binding our privacy and breach notification responsibilities.',
    specification: 'Standard or Customer-Customized BAA Templates',
    supportedStatus: 'Mandatory Upon Contract'
  },
  {
    category: 'Compliance Readiness',
    title: 'SOC 2 Type II Independent Attestation',
    description: 'Undergoes recurring annual third-party SOC 2 Type II examinations conducted by an accredited AICPA auditing firm, evaluating Security, Availability, and Confidentiality trust principles.',
    specification: 'Full Annual Audit Report Available Under NDA',
    supportedStatus: 'Current & Audited'
  },
  {
    category: 'Compliance Readiness',
    title: 'HITRUST CSF Control Framework Alignment',
    description: 'Information security controls and internal operational policies are systematically mapped against the HITRUST Common Security Framework (CSF) control specifications.',
    specification: 'HITRUST CSF v9+ Control Mapping',
    supportedStatus: 'Architectural Alignment'
  },
  {
    category: 'Data Segregation & Privacy',
    title: 'Multi-Tenant Isolation & Dedicated VPC Options',
    description: 'Strict logical database segregation with tenant ID scoping at the database query level. Dedicated single-tenant Virtual Private Cloud (VPC) deployments available for large health systems.',
    specification: 'Row-Level Security & Dedicated VPC Tenancy',
    supportedStatus: 'Configurable Architecture'
  },
  {
    category: 'Data Segregation & Privacy',
    title: 'Zero Model Training on Customer PHI',
    description: 'Proprietary clinical workflows and patient health information are never used to train generalized machine learning or foundational AI models without explicit institutional authorization.',
    specification: 'Zero Data Retention / Ephemeral Processing',
    supportedStatus: 'Contractually Guaranteed'
  },
];

export const INTEGRATIONS_LIST: IntegrationPartner[] = [
  {
    id: 'epic-systems',
    name: 'Epic Systems',
    category: 'EHR / EMR Platforms',
    description: 'Seamless integration with Epic Hyperspace, Rover mobile, and MyChart via Epic App Orchard and standard FHIR APIs.',
    compatibilityType: 'Native App Orchard / SMART on FHIR',
    badge: 'Epic App Market Listed',
    keyCapability: 'Bidirectional sync of Encounter, CarePlan, and Task resources with zero double-charting'
  },
  {
    id: 'oracle-cerner',
    name: 'Oracle Cerner Millennium',
    category: 'EHR / EMR Platforms',
    description: 'Validated interoperability with Cerner Millennium, PowerChart, and CareAware clinical workflow components.',
    compatibilityType: 'Bi-directional Webhook / API',
    badge: 'Code Certified',
    keyCapability: 'Real-time patient census, order status, and multidisciplinary milestone ingestion'
  },
  {
    id: 'meditech',
    name: 'MEDITECH Expanse',
    category: 'EHR / EMR Platforms',
    description: 'Deep integration with MEDITECH Expanse web-based EHR platform using RESTful APIs and HL7 messaging.',
    compatibilityType: 'Bi-directional Webhook / API',
    badge: 'Expanse Compatible',
    keyCapability: 'Automated shift handoff compilation and bed status release notifications'
  },
  {
    id: 'athenahealth',
    name: 'Athenahealth',
    category: 'EHR / EMR Platforms',
    description: 'Direct synchronization with AthenaClinicals for ambulatory networks, surgical centers, and outpatient clinics.',
    compatibilityType: 'Certified Standard',
    badge: 'Marketplace Partner',
    keyCapability: 'Appointment schedule alignment and post-discharge outpatient follow-up tracking'
  },
  {
    id: 'hl7-fhir',
    name: 'HL7 v2.x & FHIR R4',
    category: 'Interoperability Standards',
    description: 'Full support for legacy HL7 message feeds (ADT, ORM, ORU) and modern ONC-compliant FHIR R4 RESTful resource APIs.',
    compatibilityType: 'Certified Standard',
    badge: 'USCDI v3 Aligned',
    keyCapability: 'Universal compatibility across enterprise integration engines (Mirth, Cloverleaf, Corepoint)'
  },
  {
    id: 'imprivata',
    name: 'Imprivata OneSign & GroundControl',
    category: 'Identity & SSO',
    description: 'Fast proximity badge tap-in and tap-out at shared clinical workstations and iOS/Android shared hospital devices.',
    compatibilityType: 'SAML 2.0 / SCIM',
    badge: 'Imprivata Ready',
    keyCapability: 'Instant clinician authentication in 1.8 seconds with active unit context'
  },
  {
    id: 'okta-azure',
    name: 'Microsoft Entra ID & Okta',
    category: 'Identity & SSO',
    description: 'Enterprise federated single sign-on (SSO), multi-factor authentication (MFA), and automated SCIM user provisioning.',
    compatibilityType: 'SAML 2.0 / SCIM',
    badge: 'Enterprise SSO',
    keyCapability: 'Automated offboarding upon credential revocation to prevent orphaned PHI access'
  },
  {
    id: 'vocera-rover',
    name: 'Vocera & Clinical Pagers',
    category: 'Clinical Communications',
    description: 'Integration with hands-free wearable badges, VoIP nurse call systems, and mobile clinical smartphones.',
    compatibilityType: 'Bi-directional Webhook / API',
    badge: 'Clinical Audio / VoIP',
    keyCapability: 'Smart escalation fallback routing to Vocera smartbadges when tasks remain unacknowledged'
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    category: 'Security & BAA',
    question: 'How does CarePulse handle HIPAA obligations and Business Associate Agreements (BAAs)?',
    answer: 'CarePulse operates strictly as a Business Associate for covered healthcare entities under HIPAA. Prior to ingesting any Protected Health Information (PHI), we execute a comprehensive, mutual Business Associate Agreement (BAA). Our technical safeguards mandate AES-256 encryption at rest, TLS 1.3 in transit, role-based access control (RBAC), and immutable audit logging for all interactions. We never sell, monetize, or use customer PHI to train generalized third-party AI models.'
  },
  {
    category: 'Security & BAA',
    question: 'What third-party security audits and certifications can we review?',
    answer: 'We provide annual SOC 2 Type II attestation reports issued by an accredited independent CPA firm under NDA. Additionally, our control framework aligns with HITRUST Common Security Framework (CSF) specifications, and our infrastructure undergoes regular third-party penetration testing. You can request our comprehensive Security & Compliance Architecture Packet directly via our demo form.'
  },
  {
    category: 'EHR Interoperability',
    question: 'Does CarePulse require replacing our current EHR or double-charting?',
    answer: 'Absolutely not. CarePulse is designed as a complementary operational orchestration overlay, not a replacement for your legal system of record. Through SMART-on-FHIR and bidirectional HL7 feeds, CarePulse reads patient demographics, orders, and lab results, and pushes workflow milestones (such as handoff completions or discharge readiness flags) back into your EHR. Clinicians never need to double-chart.'
  },
  {
    category: 'EHR Interoperability',
    question: 'Which integration protocols and interface engines are supported?',
    answer: 'We support HL7 v2.x (ADT admissions, ORM orders, ORU observation results) and modern FHIR R4 APIs (Encounter, CarePlan, Task, Observation, Communication). CarePulse connects with all standard healthcare interface engines, including Cloverleaf, Mirth Connect (NextGen Connect), Lyniate Corepoint/Rhapsody, and native Epic Bridges / Cerner Open Developer environments.'
  },
  {
    category: 'Clinical Adoption',
    question: 'What is the typical time required to train floor nurses and physicians?',
    answer: 'Because CarePulse adopts familiar clinical paradigms (standard SBAR tables, visual Kanban rounding boards, and one-tap acknowledgments), floor nurses typically master the tool in a single 25-minute in-service session. Attending physicians require less than 10 minutes of orientation. Imprivata badge-tap integration ensures zero friction during shift changeovers.'
  },
  {
    category: 'Clinical Adoption',
    question: 'Is CarePulse considered a medical device or diagnostic clinical tool?',
    answer: 'No. CarePulse is an operational workflow orchestration and clinical team coordination software platform. It provides administrative task management, shift handoff structure, and communication facilitation. CarePulse is not a diagnostic medical device, does not provide autonomous clinical diagnoses, and does not replace the professional clinical judgment of licensed physicians and healthcare professionals.'
  },
  {
    category: 'Pricing & Deployment',
    question: 'How is CarePulse licensed, and what deployment options exist?',
    answer: 'CarePulse is licensed on an annual enterprise B2B SaaS subscription model based on licensed inpatient bed capacity or active clinician seat tiers, with no punitive per-message or per-transaction fees. Deployment options include multi-tenant cloud with logical data isolation or dedicated single-tenant Virtual Private Clouds (VPC) hosted in US healthcare-grade regions.'
  },
  {
    category: 'Pricing & Deployment',
    question: 'What does the implementation timeline look like from contract signing to Go-Live?',
    answer: 'A standard health system rollout takes between 6 to 12 weeks. This includes initial sandbox EHR connection (Weeks 1-3), interface validation and security audit review (Weeks 4-6), unit-level workflow pilot on 1-2 nursing units (Weeks 7-8), and phased hospital-wide Go-Live with on-floor clinical informatics support (Weeks 9-12).'
  }
];
