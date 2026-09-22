import React, { useState } from 'react';
import { 
  Smartphone, 
  Tv, 
  Clock, 
  CheckCircle2, 
  Circle, 
  User, 
  Stethoscope, 
  Heart, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Bell, 
  Share2, 
  ArrowRight, 
  ChevronRight, 
  ThumbsUp, 
  Coffee, 
  HelpCircle, 
  AlertCircle,
  Activity,
  BedDouble,
  Pill,
  Award,
  Globe,
  Check
} from 'lucide-react';

interface PatientPortalPreviewProps {
  onOpenDemo: () => void;
}

interface CareMilestone {
  id: string;
  time: string;
  title: string;
  category: 'Vitals' | 'Rounding' | 'Therapy' | 'Medication' | 'Discharge' | 'Dietary';
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  caregiver: string;
  caregiverRole: string;
  ehrSyncResource: string;
}

interface PatientScenario {
  id: string;
  name: string;
  age: number;
  gender: string;
  room: string;
  unit: string;
  diagnosis: string;
  admissionDay: string;
  estimatedDischarge: string;
  dischargeReadiness: number; // percentage 0-100
  focusSummary: string;
  primaryCaregiver: {
    name: string;
    role: string;
    credentials: string;
    shift: string;
  };
  attendingPhysician: {
    name: string;
    specialty: string;
  };
  milestones: CareMilestone[];
}

const PATIENT_SCENARIOS: PatientScenario[] = [
  {
    id: 'ortho-postop',
    name: 'Margaret Sterling',
    age: 68,
    gender: 'Female',
    room: 'Room 412-B',
    unit: 'Orthopedic Surgical Care Unit',
    diagnosis: 'Left Total Knee Arthroplasty (Post-Op Day 2)',
    admissionDay: 'Day 2 of 3',
    estimatedDischarge: 'Tomorrow, 11:30 AM',
    dischargeReadiness: 75,
    focusSummary: "Today's Focus: Safe movement with your walker, transitioning to oral pain medications, and practicing stairs with physical therapy.",
    primaryCaregiver: {
      name: 'Sarah Miller',
      role: 'Primary Day Nurse',
      credentials: 'BSN, RN, ONC',
      shift: 'Day Shift (07:00 – 19:30)',
    },
    attendingPhysician: {
      name: 'Dr. Marcus Vance, MD',
      specialty: 'Orthopedic Surgery & Hospital Medicine',
    },
    milestones: [
      {
        id: 'm1',
        time: '07:30 AM',
        title: 'Morning Vitals & Pain Comfort Check',
        category: 'Vitals',
        description: 'Blood pressure 124/78, pulse 72. Pain managed comfortably at 2/10 after morning oral regimen.',
        status: 'completed',
        caregiver: 'Sarah Miller, RN',
        caregiverRole: 'Primary Nurse',
        ehrSyncResource: 'FHIR R4 Observation & MedicationAdministration (Epic)',
      },
      {
        id: 'm2',
        time: '09:15 AM',
        title: 'Interdisciplinary Bedside Rounding',
        category: 'Rounding',
        description: 'Dr. Vance reviewed knee stability and clear post-op incision healing. Surgical drain successfully removed.',
        status: 'completed',
        caregiver: 'Dr. Marcus Vance, MD',
        caregiverRole: 'Attending Surgeon',
        ehrSyncResource: 'FHIR R4 ClinicalImpression & CarePlan',
      },
      {
        id: 'm3',
        time: '11:00 AM',
        title: 'Physical Therapy & Hallway Ambulation',
        category: 'Therapy',
        description: 'Target reached: Walked 65 feet with walker and achieved 85-degree active knee flexion.',
        status: 'current',
        caregiver: 'David Chen, DPT',
        caregiverRole: 'Physical Therapist',
        ehrSyncResource: 'FHIR R4 Procedure & Task #PT-4402',
      },
      {
        id: 'm4',
        time: '02:30 PM',
        title: 'Occupational Therapy & Home Prep',
        category: 'Therapy',
        description: 'Practicing car transfer techniques and using adaptive dressing tools for home recovery.',
        status: 'upcoming',
        caregiver: 'Jessica Ramos, OTR/L',
        caregiverRole: 'Occupational Therapist',
        ehrSyncResource: 'FHIR R4 Task (Scheduled)',
      },
      {
        id: 'm5',
        time: '04:45 PM',
        title: 'Surgical Dressing Inspection & Cryotherapy',
        category: 'Vitals',
        description: 'Incision check, application of fresh waterproof dressing, and 30-minute ice wrap.',
        status: 'upcoming',
        caregiver: 'Sarah Miller, RN',
        caregiverRole: 'Primary Nurse',
        ehrSyncResource: 'FHIR R4 Nursing Order',
      },
      {
        id: 'm6',
        time: '06:15 PM',
        title: 'Evening Medication & Nutrition Check',
        category: 'Medication',
        description: 'Oral antibiotic dose, multivitamin, and chef-prepared diabetic-friendly evening meal.',
        status: 'upcoming',
        caregiver: 'Hospital Dietary & Nursing Team',
        caregiverRole: 'Clinical Nutritionist',
        ehrSyncResource: 'FHIR R4 MedicationOrder',
      },
    ],
  },
  {
    id: 'cardio-obs',
    name: 'Robert Morales',
    age: 54,
    gender: 'Male',
    room: 'Room 308-A',
    unit: 'Cardiovascular Step-Down Unit',
    diagnosis: 'Congestive Heart Failure (Acute Observation)',
    admissionDay: 'Day 3 of 4',
    estimatedDischarge: 'Thursday, 1:00 PM',
    dischargeReadiness: 60,
    focusSummary: "Today's Focus: Monitoring your fluid balance, checking morning lab results, and reviewing low-sodium meal plans.",
    primaryCaregiver: {
      name: 'David O’Connor',
      role: 'Primary Day Nurse',
      credentials: 'RN, PCCN',
      shift: 'Day Shift (07:00 – 19:30)',
    },
    attendingPhysician: {
      name: 'Dr. Kimberly Hayes, MD',
      specialty: 'Cardiovascular Medicine',
    },
    milestones: [
      {
        id: 'c1',
        time: '07:00 AM',
        title: 'Morning Weight & Electrolyte Panel',
        category: 'Vitals',
        description: 'Morning dry weight: 184.2 lbs (down 2.1 lbs from admission). Potassium and renal markers stable.',
        status: 'completed',
        caregiver: 'Central Clinical Lab & Nurse David',
        caregiverRole: 'Phlebotomy / RN',
        ehrSyncResource: 'FHIR R4 Observation & DiagnosticReport (Cerner)',
      },
      {
        id: 'c2',
        time: '08:45 AM',
        title: 'Cardiology Attending Bedside Review',
        category: 'Rounding',
        description: 'Lungs auscultated clear at bases. Transitioning from IV loop diuretics to daily oral furosemide.',
        status: 'completed',
        caregiver: 'Dr. Kimberly Hayes, MD',
        caregiverRole: 'Cardiologist',
        ehrSyncResource: 'FHIR R4 Encounter & CarePlan',
      },
      {
        id: 'c3',
        time: '11:30 AM',
        title: 'Dietary Low-Sodium Education Session',
        category: 'Dietary',
        description: 'Reviewing 2,000 mg daily sodium limits and fluid tracking strategies with certified inpatient dietitian.',
        status: 'current',
        caregiver: 'Angela Wu, MS, RD',
        caregiverRole: 'Clinical Dietitian',
        ehrSyncResource: 'FHIR R4 Educational Task',
      },
      {
        id: 'c4',
        time: '03:00 PM',
        title: 'Transthoracic Echocardiogram Results Review',
        category: 'Rounding',
        description: 'Cardiology team will review ejection fraction comparisons and outpatient follow-up timing.',
        status: 'upcoming',
        caregiver: 'Cardiology Team',
        caregiverRole: 'Specialty Care',
        ehrSyncResource: 'FHIR R4 DiagnosticReport',
      },
      {
        id: 'c5',
        time: '05:30 PM',
        title: 'Supervised Hallway Ambulation',
        category: 'Therapy',
        description: '10-minute cardiac rehabilitation hallway walk with continuous pulse oximetry tracking.',
        status: 'upcoming',
        caregiver: 'Carlos Diaz, PCA',
        caregiverRole: 'Patient Care Tech',
        ehrSyncResource: 'FHIR R4 Task',
      },
    ],
  },
  {
    id: 'peds-asthma',
    name: 'Liam Chen (Parent: Emily Chen)',
    age: 8,
    gender: 'Male',
    room: 'Room 520',
    unit: 'Pediatric Acute Care Pavilion',
    diagnosis: 'Pediatric Asthma Exacerbation (Resolved)',
    admissionDay: 'Day 2 of 2',
    estimatedDischarge: 'Today, 3:30 PM',
    dischargeReadiness: 90,
    focusSummary: "Today's Focus: Finalizing your child's 4-hour nebulizer spacing, reviewing the Asthma Action Plan, and taking home medications.",
    primaryCaregiver: {
      name: 'Maria Santos',
      role: 'Pediatric Nurse',
      credentials: 'BSN, RN, CPN',
      shift: 'Day Shift (07:00 – 19:30)',
    },
    attendingPhysician: {
      name: 'Dr. Elena Rostova, MD',
      specialty: 'Pediatric Hospitalist',
    },
    milestones: [
      {
        id: 'p1',
        time: '08:00 AM',
        title: 'Respiratory Therapy Assessment',
        category: 'Vitals',
        description: 'Lungs clear bilaterally. Zero wheezing noted. Oxygen saturation 99% on room air.',
        status: 'completed',
        caregiver: 'James Wilson, RRT',
        caregiverRole: 'Respiratory Therapist',
        ehrSyncResource: 'FHIR R4 Respiratory Assessment (Epic)',
      },
      {
        id: 'p2',
        time: '10:00 AM',
        title: 'Spaced Inhaler Trial & Spacer Technique',
        category: 'Medication',
        description: 'Liam demonstrated proper metered-dose inhaler technique using the chamber spacer.',
        status: 'completed',
        caregiver: 'Maria Santos, RN',
        caregiverRole: 'Pediatric RN',
        ehrSyncResource: 'FHIR R4 MedicationStatement',
      },
      {
        id: 'p3',
        time: '01:00 PM',
        title: 'Pediatrician Final Discharge Exam',
        category: 'Discharge',
        description: 'Dr. Rostova conducting final physical exam and handing off the signed school Asthma Action Plan.',
        status: 'current',
        caregiver: 'Dr. Elena Rostova, MD',
        caregiverRole: 'Pediatric Hospitalist',
        ehrSyncResource: 'FHIR R4 DischargeDisposition',
      },
      {
        id: 'p4',
        time: '02:30 PM',
        title: 'Outpatient Pharmacy Bedside Delivery',
        category: 'Discharge',
        description: 'Discharge medications (Flovent & Albuterol) delivered directly to bedside with pharmacist consult.',
        status: 'upcoming',
        caregiver: 'Pediatric Pharmacist',
        caregiverRole: 'Clinical Pharmacist',
        ehrSyncResource: 'FHIR R4 Meds-to-Beds Order',
      },
      {
        id: 'p5',
        time: '03:30 PM',
        title: 'Discharge Finalization & Departure',
        category: 'Discharge',
        description: 'Wheelchair escort to main entrance loop. Follow-up appointment confirmed for Tuesday with Dr. Patel.',
        status: 'upcoming',
        caregiver: 'Hospital Transport Service',
        caregiverRole: 'Patient Transport',
        ehrSyncResource: 'FHIR R4 Encounter (Discharge)',
      },
    ],
  },
];

export const PatientPortalPreview: React.FC<PatientPortalPreviewProps> = ({ onOpenDemo }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('ortho-postop');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet'>('mobile');
  const [selectedMilestone, setSelectedMilestone] = useState<CareMilestone | null>(null);
  const [quickRequestSent, setQuickRequestSent] = useState<string | null>(null);
  const [familyShared, setFamilyShared] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const currentScenario = PATIENT_SCENARIOS.find((s) => s.id === activeScenarioId) || PATIENT_SCENARIOS[0];

  const handleSendQuickRequest = (item: string) => {
    setQuickRequestSent(item);
    setTimeout(() => {
      setQuickRequestSent(null);
    }, 4000);
  };

  return (
    <section 
      id="patient-portal" 
      className="py-20 sm:py-24 bg-white border-b border-slate-200"
      aria-label="Patient Portal & Bedside Care Timeline Preview"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 mb-3">
            <Heart className="w-3.5 h-3.5 text-blue-700" />
            <span>Patient & Family Experience Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-sans">
            Interactive Patient Portal Preview
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            See how CarePulse translates complex EHR orders into a clear, anxiety-reducing bedside care timeline 
            for patients and family members — cutting non-urgent call bells and boosting HCAHPS scores.
          </p>
        </div>

        {/* Top Control Bar: Scenarios & Viewport Toggles */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Patient Persona Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide mr-1">
              Select Patient Scenario:
            </span>
            {PATIENT_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenarioId(sc.id);
                  setSelectedMilestone(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeScenarioId === sc.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sc.name.split(' ')[0]} ({sc.diagnosis.split('(')[0].trim()})
              </button>
            ))}
          </div>

          {/* Device & Language Controls */}
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  deviceMode === 'mobile'
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Bedside Mobile</span>
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  deviceMode === 'tablet'
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="In-Room Tablet View"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Room Tablet</span>
              </button>
            </div>

            <div className="inline-flex items-center gap-1 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-2.5 py-1">
              <Globe className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="font-medium text-slate-700 hover:text-teal-700 cursor-pointer"
              >
                {language === 'en' ? 'English (EN)' : 'Español (ES)'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Interface Layout: Interactive Device Frame (Left/Center) + Hospital Administrator Insights (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Device Mockup Wrapper */}
          <div className={`transition-all duration-300 ${
            deviceMode === 'mobile' ? 'lg:col-span-7 flex justify-center' : 'lg:col-span-8'
          }`}>
            {/* The Actual Simulated Patient App Interface */}
            <div 
              id="patient-portal-device-frame"
              className={`bg-slate-900 rounded-[32px] p-3 shadow-2xl border-4 border-slate-800 transition-all ${
                deviceMode === 'mobile' ? 'w-full max-w-[390px]' : 'w-full'
              }`}
            >
              {/* Screen Inner */}
              <div className="bg-slate-50 rounded-[24px] overflow-hidden text-slate-900 flex flex-col max-h-[640px] overflow-y-auto">
                {/* Mobile Top Status Bar */}
                <div className="bg-teal-800 text-white px-5 pt-3 pb-2 flex items-center justify-between text-[11px] font-medium">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-1.5 text-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Hospital Bedside Wi-Fi • Encrypted</span>
                  </div>
                </div>

                {/* Patient App Header */}
                <div className="bg-teal-800 text-white px-5 pb-5 pt-2 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-700 border border-teal-500/50 flex items-center justify-center font-bold text-xs text-white">
                        {currentScenario.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{currentScenario.name}</div>
                        <div className="text-[10px] text-teal-200">
                          {currentScenario.room} • {currentScenario.unit}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFamilyShared(!familyShared)}
                      className={`p-1.5 rounded-full transition-all cursor-pointer ${
                        familyShared ? 'bg-emerald-400 text-slate-900' : 'bg-teal-700 text-white hover:bg-teal-600'
                      }`}
                      title={familyShared ? 'Family Proxy Synced' : 'Share with Family Member'}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Discharge Target Banner */}
                  <div className="bg-teal-900/80 rounded-xl p-3 border border-teal-700/60 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-teal-300 font-bold">
                        Target Discharge
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {currentScenario.estimatedDischarge}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-teal-300 font-medium">Readiness</div>
                      <div className="text-xs font-bold text-emerald-400">
                        {currentScenario.dischargeReadiness}% Complete
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Body */}
                <div className="p-4 space-y-4">
                  {/* Family Notification Badge if active */}
                  {familyShared && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-2.5 text-xs flex items-center justify-between animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] leading-tight">
                          <strong>Family Proxy Connected:</strong> Updates mirror live to designated family member.
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-200/70 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        Live
                      </span>
                    </div>
                  )}

                  {/* Today's Focus Card */}
                  <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      <span>{language === 'en' ? "Today's Recovery Focus" : "Enfoque de Recuperación Hoy"}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentScenario.focusSummary}
                    </p>
                  </div>

                  {/* Primary Shift Care Team Section */}
                  <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
                    <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-teal-700" />
                        <span>{language === 'en' ? "Your Shift Care Team" : "Su Equipo de Atención"}</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Active On Duty
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-medium">Day Nurse</div>
                        <div className="font-bold text-slate-800 text-xs mt-0.5">{currentScenario.primaryCaregiver.name}</div>
                        <div className="text-[10px] text-teal-700">{currentScenario.primaryCaregiver.credentials}</div>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-medium">Attending MD</div>
                        <div className="font-bold text-slate-800 text-xs mt-0.5">{currentScenario.attendingPhysician.name}</div>
                        <div className="text-[10px] text-slate-500">{currentScenario.attendingPhysician.specialty}</div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Care Timeline Stream */}
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-700" />
                        <span>{language === 'en' ? "Today's Care Timeline" : "Cronograma de Atención"}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Tap event for details</span>
                    </div>

                    <div className="space-y-2 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                      {currentScenario.milestones.map((m) => {
                        const isDone = m.status === 'completed';
                        const isCurrent = m.status === 'current';
                        const isSelected = selectedMilestone?.id === m.id;

                        return (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMilestone(m)}
                            className={`relative pl-8 text-left transition-all cursor-pointer rounded-xl p-2 ${
                              isSelected
                                ? 'bg-teal-50 border border-teal-200'
                                : 'hover:bg-white'
                            }`}
                          >
                            {/* Circle bullet */}
                            <div className="absolute left-2.5 top-3 -translate-x-1/2">
                              {isDone ? (
                                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              ) : isCurrent ? (
                                <div className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center ring-4 ring-teal-100 animate-pulse">
                                  <Activity className="w-2.5 h-2.5" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300"></div>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-800">{m.title}</span>
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                {m.time}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                              {m.description}
                            </p>

                            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                              <span>By {m.caregiver}</span>
                              <span className={`font-semibold ${
                                isDone ? 'text-emerald-700' : isCurrent ? 'text-teal-700' : 'text-slate-400'
                              }`}>
                                {isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Scheduled'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bedside Non-Urgent Service Requestor (Reduces Call Bell Volume) */}
                  <div className="bg-slate-100/90 rounded-xl p-3 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                      <span>Need Assistance? (Non-Emergency)</span>
                      <span className="text-[9px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                        Routes to Floor Tech
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => handleSendQuickRequest('Fresh Water & Ice')}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[10px] font-medium text-slate-700 border border-slate-200 transition-colors text-center cursor-pointer"
                      >
                        💧 Ice Water
                      </button>
                      <button
                        onClick={() => handleSendQuickRequest('Warm Blanket')}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[10px] font-medium text-slate-700 border border-slate-200 transition-colors text-center cursor-pointer"
                      >
                        🛏️ Warm Blanket
                      </button>
                      <button
                        onClick={() => handleSendQuickRequest('Assistance to Restroom')}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[10px] font-medium text-slate-700 border border-slate-200 transition-colors text-center cursor-pointer"
                      >
                        🚶 Help to Chair
                      </button>
                    </div>

                    {quickRequestSent && (
                      <div className="mt-2 p-2 bg-emerald-100 text-emerald-900 rounded-lg text-[10px] font-medium flex items-center gap-1.5 animate-in fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Request for <strong>{quickRequestSent}</strong> received! Dispatching patient care tech.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hospital Administrator Value & Technical Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Detailed Selected Milestone Inspector */}
            {selectedMilestone ? (
              <div className="bg-slate-50 rounded-2xl border-2 border-teal-700/30 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    Live Timeline Inspection
                  </span>
                  <button
                    onClick={() => setSelectedMilestone(null)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                </div>

                <h4 className="text-base font-bold text-slate-900 font-sans mb-1">
                  {selectedMilestone.title}
                </h4>
                <div className="text-xs text-slate-500 mb-4 flex items-center gap-2">
                  <span>Scheduled Time: <strong>{selectedMilestone.time}</strong></span>
                  <span>•</span>
                  <span>Category: {selectedMilestone.category}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-4 bg-white p-3 rounded-xl border border-slate-200">
                  {selectedMilestone.description}
                </p>

                {/* Behind the scenes EHR data mapping */}
                <div className="pt-3 border-t border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    Behind the Scenes EHR Interoperability:
                  </div>
                  <div className="text-xs text-teal-900 font-mono bg-teal-50/70 p-2 rounded-lg border border-teal-100">
                    {selectedMilestone.ehrSyncResource}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 leading-snug">
                    Zero double-documentation. When a clinician marks a medication given or physical therapy note complete in Epic or Cerner, the patient timeline updates instantly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-teal-900 text-white rounded-2xl p-6 sm:p-7 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5 mb-2">
                  <Award className="w-3.5 h-3.5" />
                  Administrator Operational Impact
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white font-sans mb-2">
                  Why Hospital Leaders Prioritize Bedside Transparency
                </h3>
                <p className="text-xs sm:text-sm text-teal-100 leading-relaxed mb-6">
                  In traditional acute wards, patients repeatedly push the emergency call light simply to ask 
                  "When is my doctor coming?" or "Can I get some ice?". CarePulse automates transparency to liberate bedside nurses.
                </p>

                <div className="space-y-3 pt-4 border-t border-teal-800">
                  <div className="flex items-start gap-2.5 text-xs text-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">38% Drop in Bedside Call-Light Volume:</strong> Routine amenity requests 
                      route automatically to patient care technicians and dietary, preserving nurse focus.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">+14 Percentile Points in HCAHPS:</strong> Directly raises hospital survey metrics 
                      for "Communication with Nurses" and "Discharge Information & Care Transitions".
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Remote Family Peace of Mind:</strong> Designated caregivers receive automated milestones, 
                      eliminating dozens of anxious phone calls to nursing stations.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-teal-700" />
                  Multilingual Compliance
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Automatic translation into Spanish, Cantonese, and 12+ hospital languages with plain-language medical glossaries.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  HIPAA Role Separation
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Encrypted proxy authentication verifies proxy relations before sharing timeline progress or medication summaries.
                </p>
              </div>
            </div>

            {/* Demo CTA Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <div className="font-bold text-slate-900">Explore patient bedside hardware integrations</div>
                <div>Compatible with Epic MyChart Bedside, Cerner, and in-room smart televisions.</div>
              </div>
              <button
                onClick={onOpenDemo}
                className="shrink-0 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-xs cursor-pointer"
              >
                <span>Request Portal Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
