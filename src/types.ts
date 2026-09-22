export interface BenefitItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
  features: string[];
}

export interface WorkflowStep {
  stepNumber: number;
  id: string;
  phase: string;
  title: string;
  shortDesc: string;
  detailedDescription: string;
  actionItems: string[];
  fhirResources: string[];
  mockData: {
    unit: string;
    patientId: string;
    acuity: 'High' | 'Moderate' | 'Stable' | 'Discharge Pending';
    assignedTeam: string[];
    currentMilestone: string;
    pendingAction: string;
    timeRemaining: string;
  };
}

export interface RoleUseCase {
  id: string;
  roleTitle: string;
  personaCategory: 'Physicians & CMIO' | 'Nursing & Floor Ops' | 'Health System Ops & COO' | 'CISO & Health IT' | 'Care Coordination & Case Mgmt';
  headline: string;
  corePains: string[];
  solutionCapabilities: string[];
  quantifiedOutcome: string;
  quote: {
    text: string;
    author: string;
    org: string;
  };
}

export interface SecurityControl {
  category: 'Technical Safeguards' | 'Access & Identity Governance' | 'Compliance Readiness' | 'Data Segregation & Privacy';
  title: string;
  description: string;
  specification: string;
  supportedStatus: string;
}

export interface IntegrationPartner {
  id: string;
  name: string;
  category: 'EHR / EMR Platforms' | 'Interoperability Standards' | 'Identity & SSO' | 'Clinical Communications';
  description: string;
  compatibilityType: 'Native App Orchard / SMART on FHIR' | 'Certified Standard' | 'Bi-directional Webhook / API' | 'SAML 2.0 / SCIM';
  badge: string;
  keyCapability: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Security & BAA' | 'EHR Interoperability' | 'Clinical Adoption' | 'Pricing & Deployment';
}

export interface DemoFormData {
  fullName: string;
  workEmail: string;
  jobTitle: string;
  organizationName: string;
  orgType: string;
  ehrSystem: string;
  clinicianCount: string;
  primaryChallenge: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface DiagnosticInput {
  organizationType: string;
  clinicianCount: string;
  ehrSystem: string;
  clinicalBottlenecks: string;
  primaryGoal: string;
}
