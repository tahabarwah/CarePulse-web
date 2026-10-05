export interface TriageAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  detail: string;
  timestamp: string;
  acknowledged: boolean;
  source: 'Telemetry' | 'Lab Monitor' | 'Sepsis Screening' | 'Fall Sensor' | 'Nursing Assessment';
}

export interface UpcomingProcedure {
  id: string;
  name: string;
  department: string;
  scheduledTime: string;
  estimatedDurationMinutes: number;
  status: 'scheduled' | 'prep-ready' | 'in-transit' | 'in-progress' | 'completed';
  location: string;
  npoStatus: 'NPO Since 00:00' | 'Clear Liquids' | 'Regular Diet' | 'N/A';
  consentStatus: 'Signed' | 'Pending Physician' | 'Declined';
  ivAccess: string;
  transportStatus: 'Requested' | 'Assigned' | 'En Route' | 'Bedside' | 'Not Required';
  checklist: {
    npoConfirmed: boolean;
    consentOnChart: boolean;
    ivPatent: boolean;
    preOpLabsVerified: boolean;
    transportDispatched: boolean;
  };
  notes?: string;
}

export interface CommandCenterPatient {
  id: string;
  room: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  mrn: string;
  admissionDate: string;
  losDays: number;
  diagnosis: string;
  acuity: 'critical' | 'high' | 'moderate' | 'stable' | 'discharge-ready';
  attendingPhysician: string;
  primaryNurse: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    spo2: number;
    respiratoryRate: number;
    temperature: number;
    painScore?: number;
    lastUpdated: string;
    isAbnormal: boolean;
  };
  triageAlerts: TriageAlert[];
  upcomingProcedure: UpcomingProcedure | null;
  isolationPrecaution: 'None' | 'Contact' | 'Droplet' | 'Airborne' | 'Neutropenic';
  fallRiskLevel: 1 | 2 | 3;
  codeStatus: 'Full Code' | 'DNR/DNI' | 'Limited Intervention';
  dischargeReadiness: {
    readinessPercent: number;
    targetTime?: string;
    primaryBlocker?: string;
    medicationReconciliationComplete: boolean;
    transportArranged: boolean;
  };
  recentHandoffSbar: {
    situation: string;
    background: string;
    assessment: string;
    recommendation: string;
  };
}

export interface HospitalUnitOption {
  id: string;
  name: string;
  category: string;
  totalBeds: number;
  occupiedBeds: number;
  rnShiftCount: number;
}

export const HOSPITAL_UNITS: HospitalUnitOption[] = [
  { id: 'telemetry-4w', name: 'Telemetry 4-West', category: 'Acute Cardiology / Step-Down', totalBeds: 32, occupiedBeds: 30, rnShiftCount: 8 },
  { id: 'micu-3e', name: 'Medical ICU 3-East', category: 'Critical Care', totalBeds: 18, occupiedBeds: 17, rnShiftCount: 9 },
  { id: 'surg-5s', name: 'Surgical Step-Down 5-South', category: 'Post-Operative Acute', totalBeds: 28, occupiedBeds: 25, rnShiftCount: 7 },
  { id: 'neuro-6n', name: 'Neurovascular 6-North', category: 'Stroke & Neurological', totalBeds: 24, occupiedBeds: 22, rnShiftCount: 6 },
];

export const INITIAL_COMMAND_CENTER_PATIENTS: CommandCenterPatient[] = [
  {
    id: 'pt-101',
    room: 'Bed 408-A',
    name: 'James K.',
    age: 64,
    gender: 'M',
    mrn: 'MRN-88214',
    admissionDate: '2026-10-02',
    losDays: 3,
    diagnosis: 'Acute Decompensated CHF (NYHA Class III)',
    acuity: 'high',
    attendingPhysician: 'Dr. Rivera, MD (Hospitalist)',
    primaryNurse: 'J. Morales, BSN, RN',
    vitals: {
      heartRate: 98,
      bloodPressure: '148/88',
      spo2: 92,
      respiratoryRate: 22,
      temperature: 37.1,
      painScore: 2,
      lastUpdated: '12m ago',
      isAbnormal: true,
    },
    triageAlerts: [
      {
        id: 'alt-101-1',
        severity: 'warning',
        title: 'SpO2 Trending Downward (<93% on Room Air)',
        detail: 'Patient desaturated to 91% on ambulation. Nasal cannula 2L O2 titration initiated by bedside RN.',
        timestamp: '18m ago',
        acknowledged: false,
        source: 'Telemetry',
      },
      {
        id: 'alt-101-2',
        severity: 'info',
        title: 'Morning BNP Result High (1,240 pg/mL)',
        detail: 'Trending down from admission (1,890 pg/mL) following IV furosemide regimen.',
        timestamp: '45m ago',
        acknowledged: true,
        source: 'Lab Monitor',
      }
    ],
    upcomingProcedure: {
      id: 'proc-101',
      name: 'Transesophageal Echocardiogram (TEE)',
      department: 'Cardiac Diagnostics Lab',
      scheduledTime: '13:30',
      estimatedDurationMinutes: 45,
      status: 'prep-ready',
      location: 'Cardiology 2nd Floor, Suite 210',
      npoStatus: 'NPO Since 00:00',
      consentStatus: 'Signed',
      ivAccess: '18G Right Antecubital (Patent)',
      transportStatus: 'Requested',
      checklist: {
        npoConfirmed: true,
        consentOnChart: true,
        ivPatent: true,
        preOpLabsVerified: true,
        transportDispatched: false,
      },
      notes: 'Evaluate mitral regurgitation severity and left ventricular ejection fraction prior to oral heart failure titration.',
    },
    isolationPrecaution: 'None',
    fallRiskLevel: 2,
    codeStatus: 'Full Code',
    dischargeReadiness: {
      readinessPercent: 45,
      targetTime: 'Tomorrow, 14:00',
      primaryBlocker: 'TEE completion & DME home oxygen authorization pending',
      medicationReconciliationComplete: false,
      transportArranged: false,
    },
    recentHandoffSbar: {
      situation: '64M admitted with acute CHF exacerbation; diuresis responding adequately (net -1.8L yesterday).',
      background: 'Hypertensive cardiomyopathy, CAD with prior LAD stent in 2021. Home carvedilol resumed.',
      assessment: 'Bilateral trace pedal edema, lung bases with mild bibasilar crackles, O2 saturation maintained at 95% on 2L NC.',
      recommendation: 'Ensure NPO status holds for 13:30 TEE; verify post-procedure swallow before advancing to cardiac diet.'
    }
  },
  {
    id: 'pt-102',
    room: 'Bed 408-B',
    name: 'Elena V.',
    age: 58,
    gender: 'F',
    mrn: 'MRN-88229',
    admissionDate: '2026-10-04',
    losDays: 1,
    diagnosis: 'NSTEMI, Post-Cath Stent to Circumflex',
    acuity: 'moderate',
    attendingPhysician: 'Dr. Marcus Vance, MD (Interventional Cardiology)',
    primaryNurse: 'J. Morales, BSN, RN',
    vitals: {
      heartRate: 72,
      bloodPressure: '124/76',
      spo2: 98,
      respiratoryRate: 16,
      temperature: 36.8,
      painScore: 1,
      lastUpdated: '8m ago',
      isAbnormal: false,
    },
    triageAlerts: [],
    upcomingProcedure: {
      id: 'proc-102',
      name: 'Femoral Arterial Sheath Removal & Bedside Hemostasis',
      department: 'Bedside Invasive Nursing Protocol',
      scheduledTime: '11:00',
      estimatedDurationMinutes: 30,
      status: 'prep-ready',
      location: 'Bedside 408-B',
      npoStatus: 'Clear Liquids',
      consentStatus: 'Signed',
      ivAccess: '20G Left Forearm',
      transportStatus: 'Not Required',
      checklist: {
        npoConfirmed: true,
        consentOnChart: true,
        ivPatent: true,
        preOpLabsVerified: true,
        transportDispatched: false,
      },
      notes: 'Activated clotting time (ACT) < 180s confirmed at 10:15. Post-pull compression device staged at bedside.',
    },
    isolationPrecaution: 'None',
    fallRiskLevel: 3,
    codeStatus: 'Full Code',
    dischargeReadiness: {
      readinessPercent: 65,
      targetTime: 'Tomorrow, 11:30',
      primaryBlocker: 'Post-pull 4h strict bedrest observation & dual antiplatelet therapy education',
      medicationReconciliationComplete: true,
      transportArranged: false,
    },
    recentHandoffSbar: {
      situation: '58F post-PCI to obtuse marginal branch; asymptomatic chest-wise overnight on heparin bridge.',
      background: 'Type 2 Diabetes, hyperlipidemia. Dual antiplatelet (aspirin + ticagrelor) loaded in cath lab.',
      assessment: 'Right groin puncture site clean, soft, no hematoma. Distal pedal pulses 2+ palpable bilaterally.',
      recommendation: 'Perform sheath pull at 11:00; enforce 4 hours of strict supine bedrest with sandbag compression.'
    }
  },
  {
    id: 'pt-103',
    room: 'Bed 410-A',
    name: 'Robert T.',
    age: 72,
    gender: 'M',
    mrn: 'MRN-88190',
    admissionDate: '2026-10-01',
    losDays: 4,
    diagnosis: 'Acute COPD Exacerbation with Hypercapnic Respiratory Acidosis',
    acuity: 'critical',
    attendingPhysician: 'Dr. Aris Thorne, MD (Pulmonology / Critical Care)',
    primaryNurse: 'K. Patel, RN, CCRN',
    vitals: {
      heartRate: 104,
      bloodPressure: '152/92',
      spo2: 89,
      respiratoryRate: 26,
      temperature: 37.8,
      painScore: 3,
      lastUpdated: '3m ago',
      isAbnormal: true,
    },
    triageAlerts: [
      {
        id: 'alt-103-1',
        severity: 'critical',
        title: 'BiPAP High Circuit Leak Alert (>42 L/min)',
        detail: 'Mask displacement detected on telemetry feed. Patient exhibiting accessory muscle breathing. Immediate respiratory therapy consult dispatched.',
        timestamp: '6m ago',
        acknowledged: false,
        source: 'Telemetry',
      },
      {
        id: 'alt-103-2',
        severity: 'critical',
        title: 'ABG Flag: pH 7.28, pCO2 68 mmHg',
        detail: 'Critical respiratory acidosis threshold reached. Attending Dr. Thorne paged at 09:48.',
        timestamp: '22m ago',
        acknowledged: true,
        source: 'Lab Monitor',
      }
    ],
    upcomingProcedure: {
      id: 'proc-103',
      name: 'Stat Arterial Blood Gas (ABG) & Mask Re-fitting',
      department: 'Respiratory Care Unit',
      scheduledTime: '10:30',
      estimatedDurationMinutes: 20,
      status: 'in-progress',
      location: 'Bedside 410-A',
      npoStatus: 'NPO Since 00:00',
      consentStatus: 'Signed',
      ivAccess: '18G Right Forearm + Left Radial Art-line',
      transportStatus: 'Bedside',
      checklist: {
        npoConfirmed: true,
        consentOnChart: true,
        ivPatent: true,
        preOpLabsVerified: true,
        transportDispatched: true,
      },
      notes: 'Assess need for step-up to Medical ICU if pCO2 remains > 65 mmHg on IPAP 16 / EPAP 6.',
    },
    isolationPrecaution: 'Droplet',
    fallRiskLevel: 3,
    codeStatus: 'Full Code',
    dischargeReadiness: {
      readinessPercent: 15,
      targetTime: 'Under Review',
      primaryBlocker: 'Acute ventilator-dependence stabilization & ABG normalization',
      medicationReconciliationComplete: false,
      transportArranged: false,
    },
    recentHandoffSbar: {
      situation: '72M with severe COPD flare, struggling to synchronize with nocturnal BiPAP non-invasive ventilation.',
      background: '50-pack-year smoking history, baseline FEV1 38% predicted. Prednisone 40mg IV and nebulizers active.',
      assessment: 'Somnolent, tachypneic, diffuse expiratory wheezing throughout all lung fields.',
      recommendation: 'Do not remove BiPAP except for stat ABG puncture; notify pulmonary fellow if GCS drops.'
    }
  },
  {
    id: 'pt-104',
    room: 'Bed 410-B',
    name: 'Maria L.',
    age: 42,
    gender: 'F',
    mrn: 'MRN-88241',
    admissionDate: '2026-10-03',
    losDays: 2,
    diagnosis: 'Post-Op Laparoscopic Cholecystectomy (Acute Cholecystitis)',
    acuity: 'discharge-ready',
    attendingPhysician: 'Dr. Sophia Reyes, MD (General Surgery)',
    primaryNurse: 'K. Patel, RN, CCRN',
    vitals: {
      heartRate: 68,
      bloodPressure: '118/74',
      spo2: 99,
      respiratoryRate: 14,
      temperature: 36.6,
      painScore: 1,
      lastUpdated: '15m ago',
      isAbnormal: false,
    },
    triageAlerts: [],
    upcomingProcedure: null,
    isolationPrecaution: 'None',
    fallRiskLevel: 1,
    codeStatus: 'Full Code',
    dischargeReadiness: {
      readinessPercent: 95,
      targetTime: 'Today, 11:45',
      primaryBlocker: 'Final surgical wound check & outpatient pharmacy prescription pickup',
      medicationReconciliationComplete: true,
      transportArranged: true,
    },
    recentHandoffSbar: {
      situation: '42F post-op day 2 lap cholecystectomy; tolerating regular low-fat diet, ambulating independently.',
      background: 'Uncomplicated laparoscopic resection for acute calculous cholecystitis.',
      assessment: '4 laparoscopic port incisions clean/dry/intact without erythema; oral ibuprofen adequate for pain.',
      recommendation: 'Review lifting restrictions (max 10 lbs x 2 weeks); complete electronic discharge summary for 11:45 departure.'
    }
  },
  {
    id: 'pt-105',
    room: 'Bed 412-A',
    name: 'Samuel D.',
    age: 79,
    gender: 'M',
    mrn: 'MRN-88177',
    admissionDate: '2026-10-02',
    losDays: 3,
    diagnosis: 'Urosepsis Secondary to Obstructive Nephrolithiasis (AKI Stage 2)',
    acuity: 'high',
    attendingPhysician: 'Dr. Rivera, MD (Hospitalist) / Dr. Park (Urology)',
    primaryNurse: 'T. Brooks, BSN, RN',
    vitals: {
      heartRate: 102,
      bloodPressure: '96/58',
      spo2: 94,
      respiratoryRate: 20,
      temperature: 38.4,
      painScore: 4,
      lastUpdated: '5m ago',
      isAbnormal: true,
    },
    triageAlerts: [
      {
        id: 'alt-105-1',
        severity: 'critical',
        title: 'SIRS Sepsis Criteria Triggered',
        detail: 'Temp 38.4°C + Tachycardia (102 bpm) + WBC 16.8k + Lactate 2.6 mmol/L. Repeat lactate order queued.',
        timestamp: '14m ago',
        acknowledged: false,
        source: 'Sepsis Screening',
      },
      {
        id: 'alt-105-2',
        severity: 'warning',
        title: 'Low Mean Arterial Pressure (MAP 70 mmHg)',
        detail: 'Blood pressure trending borderline (96/58). 500mL IV Plasmalyte bolus infused.',
        timestamp: '32m ago',
        acknowledged: true,
        source: 'Telemetry',
      }
    ],
    upcomingProcedure: {
      id: 'proc-105',
      name: 'Renal & Retroperitoneal Ultrasound (Stat)',
      department: 'Diagnostic Imaging / Radiology',
      scheduledTime: '12:15',
      estimatedDurationMinutes: 30,
      status: 'in-transit',
      location: 'Main Radiology B-Level, Room 14',
      npoStatus: 'Clear Liquids',
      consentStatus: 'Signed',
      ivAccess: '18G Left Hand + Foley Catheter in Place',
      transportStatus: 'En Route',
      checklist: {
        npoConfirmed: true,
        consentOnChart: true,
        ivPatent: true,
        preOpLabsVerified: true,
        transportDispatched: true,
      },
      notes: 'Evaluate hydronephrosis degree and proximal ureteral stone location for possible cystoscopy with stent placement.',
    },
    isolationPrecaution: 'Contact',
    fallRiskLevel: 3,
    codeStatus: 'DNR/DNI',
    dischargeReadiness: {
      readinessPercent: 30,
      targetTime: 'Oct 07, 12:00',
      primaryBlocker: 'Urosepsis resolution, creatinine down-trend (<1.8), and urology intervention',
      medicationReconciliationComplete: false,
      transportArranged: false,
    },
    recentHandoffSbar: {
      situation: '79M with fever and right flank pain; urine culture positive for pan-sensitive E. coli.',
      background: 'Benign prostatic hyperplasia, chronic kidney disease stage 3 baseline (Cr 1.5).',
      assessment: 'Febrile, flushed, Foley draining cloudy amber urine (45 mL/hr over past 4 hours).',
      recommendation: 'Track imaging results with urology fellow on call; prepare for possible urgent double-J stent.'
    }
  },
  {
    id: 'pt-106',
    room: 'Bed 412-B',
    name: 'Aisha M.',
    age: 51,
    gender: 'F',
    mrn: 'MRN-88203',
    admissionDate: '2026-10-03',
    losDays: 2,
    diagnosis: 'Diabetic Ketoacidosis (DKA) - Resolved, Transitioning to SQ Insulin',
    acuity: 'moderate',
    attendingPhysician: 'Dr. Rivera, MD (Hospitalist)',
    primaryNurse: 'T. Brooks, BSN, RN',
    vitals: {
      heartRate: 78,
      bloodPressure: '126/80',
      spo2: 97,
      respiratoryRate: 16,
      temperature: 36.9,
      painScore: 0,
      lastUpdated: '10m ago',
      isAbnormal: false,
    },
    triageAlerts: [
      {
        id: 'alt-106-1',
        severity: 'info',
        title: 'Anion Gap Normalized (10 mEq/L)',
        detail: 'Venous blood gas pH 7.39 with beta-hydroxybutyrate down to 0.4 mmol/L. Discontinue regular insulin infusion.',
        timestamp: '50m ago',
        acknowledged: true,
        source: 'Lab Monitor',
      }
    ],
    upcomingProcedure: {
      id: 'proc-106',
      name: 'Subcutaneous Basal Insulin Overlap Injection (Glargine 24u)',
      department: 'Bedside Nursing Protocol',
      scheduledTime: '11:30',
      estimatedDurationMinutes: 15,
      status: 'scheduled',
      location: 'Bedside 412-B',
      npoStatus: 'Regular Diet',
      consentStatus: 'Signed',
      ivAccess: '20G Right Forearm',
      transportStatus: 'Not Required',
      checklist: {
        npoConfirmed: false,
        consentOnChart: true,
        ivPatent: true,
        preOpLabsVerified: true,
        transportDispatched: false,
      },
      notes: 'Administer glargine 2 hours before stopping regular IV insulin drip to prevent rebound hyperglycemia.',
    },
    isolationPrecaution: 'None',
    fallRiskLevel: 1,
    codeStatus: 'Full Code',
    dischargeReadiness: {
      readinessPercent: 70,
      targetTime: 'Tomorrow, 10:00',
      primaryBlocker: 'Diabetic educator appointment & continuous glucose monitor (CGM) sensor verification',
      medicationReconciliationComplete: true,
      transportArranged: false,
    },
    recentHandoffSbar: {
      situation: '51F admitted in DKA with blood sugar 480 mg/dL; gap closed and ready for subcutaneous regimen.',
      background: 'Type 1 Diabetes x 22 years, pump failure prior to admission.',
      assessment: 'Alert, oriented x 4, oral intake verified with diabetic lunch tray ordered.',
      recommendation: 'Ensure dual-nurse sign-off for glargine dose; fingerstick glucose checks Q4H.'
    }
  },
  {
    id: 'pt-107',
    room: 'Bed 414-A',
    name: 'William H.',
    age: 67,
    gender: 'M',
    mrn: 'MRN-88165',
    admissionDate: '2026-09-30',
    losDays: 5,
    diagnosis: 'Acute Ischemic MCA Stroke (NIHSS 6, Mild Dysarthria)',
    acuity: 'moderate',
    attendingPhysician: 'Dr. Jonathan Chen, MD (Neurology)',
    primaryNurse: 'S. Gallagher, RN',
    vitals: {
      heartRate: 76,
      bloodPressure: '138/84',
      spo2: 96,
      respiratoryRate: 15,
      temperature: 37.0,
      painScore: 1,
      lastUpdated: '20m ago',
      isAbnormal: false,
    },
    triageAlerts: [
      {
        id: 'alt-107-1',
        severity: 'warning',
        title: 'Aspiration Risk Caution Active',
        detail: 'Patient failed bedside water swallow screening at 08:30. Strictly NPO pending FEES diagnostic study.',
        timestamp: '1h 15m ago',
        acknowledged: true,
        source: 'Nursing Assessment',
      }
    ],
    upcomingProcedure: {
      id: 'proc-107',
      name: 'Fiberoptic Endoscopic Evaluation of Swallowing (FEES)',
      department: 'Speech Language Pathology',
      scheduledTime: '14:45',
      estimatedDurationMinutes: 30,
      status: 'scheduled',
      location: 'Bedside 414-A',
      npoStatus: 'NPO Since 00:00',
      consentStatus: 'Signed',
      ivAccess: '20G Left Wrist',
      transportStatus: 'Not Required',
      checklist: {
        npoConfirmed: true,
        consentOnChart: true,
        ivPatent: true,
        preOpLabsVerified: true,
        transportDispatched: false,
      },
      notes: 'Determine safety for pureed diet vs. temporary nasogastric tube feeding before discharge to stroke rehab.',
    },
    isolationPrecaution: 'None',
    fallRiskLevel: 3,
    codeStatus: 'Full Code',
    dischargeReadiness: {
      readinessPercent: 50,
      targetTime: 'Oct 07, 11:00',
      primaryBlocker: 'Acute inpatient rehabilitation facility (IRF) bed authorization from Medicare',
      medicationReconciliationComplete: false,
      transportArranged: false,
    },
    recentHandoffSbar: {
      situation: '67M day 5 post-ischemic stroke; right-sided pronator drift improved, mild expressive dysphasia persists.',
      background: 'Atrial fibrillation on apixaban; therapeutic anticoagulation resumed 48h post-CT scan.',
      assessment: 'Neuro checks stable (NIHSS 6 unchanged). Bed alarm active due to impulsive attempts to stand.',
      recommendation: 'Keep bedside suction ready; hold all oral meds until Speech Pathologist completes FEES assessment.'
    }
  },
  {
    id: 'pt-108',
    room: 'Bed 414-B',
    name: 'Grace P.',
    age: 83,
    gender: 'F',
    mrn: 'MRN-88235',
    admissionDate: '2026-10-03',
    losDays: 2,
    diagnosis: 'Left Femoral Neck Fracture, Post-Op Day 1 ORIF',
    acuity: 'stable',
    attendingPhysician: 'Dr. Michael Chang, MD (Orthopedic Surgery)',
    primaryNurse: 'S. Gallagher, RN',
    vitals: {
      heartRate: 70,
      bloodPressure: '122/72',
      spo2: 97,
      respiratoryRate: 16,
      temperature: 36.7,
      painScore: 2,
      lastUpdated: '18m ago',
      isAbnormal: false,
    },
    triageAlerts: [],
    upcomingProcedure: {
      id: 'proc-108',
      name: 'Physical Therapy Early Ambulation & Weight-Bearing Evaluation',
      department: 'Inpatient Rehabilitation & PT',
      scheduledTime: '14:00',
      estimatedDurationMinutes: 45,
      status: 'scheduled',
      location: 'Bedside 414-B / Unit Hallway',
      npoStatus: 'Regular Diet',
      consentStatus: 'Signed',
      ivAccess: '20G Right Forearm',
      transportStatus: 'Not Required',
      checklist: {
        npoConfirmed: false,
        consentOnChart: true,
        ivPatent: true,
        preOpLabsVerified: true,
        transportDispatched: false,
      },
      notes: 'Assess tolerance of walker-assisted 50-foot transfer. Pre-medicate with oral acetaminophen 30 mins prior.',
    },
    isolationPrecaution: 'None',
    fallRiskLevel: 3,
    codeStatus: 'DNR/DNI',
    dischargeReadiness: {
      readinessPercent: 80,
      targetTime: 'Tomorrow, 13:00',
      primaryBlocker: 'Physical therapy clearance for skilled nursing facility (SNF) transport',
      medicationReconciliationComplete: true,
      transportArranged: false,
    },
    recentHandoffSbar: {
      situation: '83F POD 1 left hip ORIF; hemoglobin 10.4 g/dL stable, surgical dressing clean and dry.',
      background: 'Osteoporosis, mechanical ground-level fall at home.',
      assessment: 'Alert, oriented, left foot warm with 2+ dorsalis pedis pulse; no calf tenderness or DVT signs.',
      recommendation: 'Ensure Lovenox DVT prophylaxis administered at 18:00; encourage incentive spirometer 10x/hr.'
    }
  }
];
