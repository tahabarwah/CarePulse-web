import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Quote, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  FileText, 
  Sparkles, 
  Star, 
  Check, 
  Users, 
  Stethoscope, 
  Layers, 
  Activity,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SlidersHorizontal,
  LayoutGrid
} from 'lucide-react';
import { TRUSTED_INSTITUTIONS } from '../data/healthcareData';

export interface TestimonialPartner {
  id: string;
  category: 'all' | 'cmo' | 'cno' | 'coo' | 'coordination';
  author: {
    name: string;
    credentials: string;
    title: string;
    department: string;
    organization: string;
    facilityScale: string;
    avatarInitials: string;
    avatarBg: string;
  };
  headline: string;
  quote: string;
  ehrSystem: string;
  primaryMetric: {
    value: string;
    label: string;
    subtext: string;
  };
  secondaryMetrics: {
    value: string;
    label: string;
  }[];
  challenge: string;
  solutionImplemented: string;
  deploymentTimeframe: string;
  verifiedGovernance: string;
}

export const CLIENT_TESTIMONIALS: TestimonialPartner[] = [
  {
    id: 'dr-marcus-vance',
    category: 'cmo',
    author: {
      name: 'Dr. Marcus Vance, MD, MBA',
      credentials: 'MD, MBA (Internal Medicine & Clinical Operations)',
      title: 'Chief Medical Officer & VP of Clinical Quality',
      department: 'Office of the CMO & Inpatient Medical Services',
      organization: "St. Luke's Regional Health Network",
      facilityScale: '7 Acute Hospitals • 1,240 Inpatient Beds',
      avatarInitials: 'MV',
      avatarBg: 'bg-teal-700',
    },
    headline: 'Shifted median discharge orders 1.4 hours earlier while eliminating morning rounding gridlock',
    quote: 'Before CarePulse, morning interdisciplinary rounds were bogged down by disparate clipboard sheets, missed consult pages, and fragmented verbal updates. CarePulse unified our hospitalists, bedside nurses, case managers, and clinical pharmacists onto a single synchronized real-time patient progression board. By resolving discharge barriers 24 to 48 hours early, we reclaimed afternoon bed capacity and significantly reduced emergency department boarding.',
    ehrSystem: 'Epic Systems (SMART on FHIR)',
    primaryMetric: {
      value: '1.4 hrs',
      label: 'Earlier Daily Discharge Order Placement',
      subtext: 'Median order placement shifted from 2:45 PM to 1:05 PM across all acute floors',
    },
    secondaryMetrics: [
      { value: '41%', label: 'Faster consult response' },
      { value: '94%', label: 'Attending physician satisfaction' },
    ],
    challenge: 'Discharge planning across our 7 hospitals was historically reactive, causing afternoon bed gridlock and emergency department boarding times that frequently exceeded 4.5 hours.',
    solutionImplemented: 'CarePulse Multidisciplinary Rounding Board and Proactive Discharge Milestones integrated directly into Epic provider workspaces via SMART on FHIR.',
    deploymentTimeframe: 'Initial 8-week pilot on 2 medical-surgical floors, followed by full 7-hospital rollout over 4 months.',
    verifiedGovernance: 'Enterprise BAA executed, annual SOC 2 Type II controls verified, zero model training on patient health information.',
  },
  {
    id: 'elena-rostova',
    category: 'cno',
    author: {
      name: 'Elena Rostova, DNP, RN, NEA-BC',
      credentials: 'DNP, RN, NEA-BC (Nursing Executive Advanced)',
      title: 'Chief Nursing Officer & VP of Patient Care Services',
      department: 'Nursing Operations & Patient Care Executive Committee',
      organization: 'MetroHealth Acute Care & Trauma Center',
      facilityScale: '640 Acute Beds • 1,450 Bedside Nurses',
      avatarInitials: 'ER',
      avatarBg: 'bg-emerald-700',
    },
    headline: 'Returned 28 minutes per nurse every shift while slashing interruptive noise by 52%',
    quote: 'Nursing burnout is fundamentally tied to cognitive fragmentation. Our nursing staff used to spend over 40 minutes at each shift transition manually transcribing vitals, orders, and telemetry notes into informal paper sheets. CarePulse structured our handoffs using standardized SBAR templates that automatically pull live EHR data with clear digital acknowledgments. Our nurses leave their shifts on time, bedside transitions are seamless, and alert noise has dropped dramatically.',
    ehrSystem: 'Oracle Health / Cerner Millennium',
    primaryMetric: {
      value: '28 mins',
      label: 'Saved per Nurse per 12-hr Shift',
      subtext: 'Shift transition duration decreased from 42 mins to 14 mins with zero lost chart notes',
    },
    secondaryMetrics: [
      { value: '52%', label: 'Reduction in false alarm noise' },
      { value: '19%', label: 'Improvement in 1st-year RN retention' },
    ],
    challenge: 'Bedside nurses faced persistent cognitive fatigue from manual paper handoffs, fragmented telemetry pages during medication administration, and chronic shift-end overtime.',
    solutionImplemented: 'Standardized SBAR Shift Handoff modules with automated FHIR R4 vital/lab population and intelligent alert triage delivered to clinical floor workstations and tablets.',
    deploymentTimeframe: '6-week phased rollout across 18 acute inpatient units with 25-minute nursing in-service sessions.',
    verifiedGovernance: 'Strict role-based access control (RBAC) ensuring minimum necessary data visibility; digital signature audit log aligned with Joint Commission standards.',
  },
  {
    id: 'david-chen',
    category: 'coo',
    author: {
      name: 'David Chen, MHA, FACHE',
      credentials: 'MHA, FACHE (Fellow, American College of Healthcare Executives)',
      title: 'Chief Operating Officer & VP of Hospital Operations',
      department: 'Hospital Administration & Patient Placement Operations',
      organization: 'Pacific Horizon Health System',
      facilityScale: '4 Facilities • 480 Total Beds',
      avatarInitials: 'DC',
      avatarBg: 'bg-indigo-700',
    },
    headline: 'Achieved a 0.8-day reduction in avoidable length of stay with immediate bed turnaround visibility',
    quote: 'From an executive operations perspective, bed capacity and patient throughput dictate hospital viability. CarePulse provided our operations and patient placement command center with immediate, real-time visibility into bed-cleaning milestones, pending diagnostic clearances, and post-acute transfer approvals across all four acute facilities. The quantifiable impact on our length of stay and capacity management paid for the platform within the first two quarters.',
    ehrSystem: 'MEDITECH Expanse & Epic Hybrid',
    primaryMetric: {
      value: '0.8 day',
      label: 'Reduction in Avoidable Length of Stay',
      subtext: 'Geometric mean inpatient LOS reduced from 4.7 to 3.9 days hospital-wide',
    },
    secondaryMetrics: [
      { value: '$3.2M', label: 'Annual operational value unlocked' },
      { value: '32 mins', label: 'Faster EVS terminal bed turns' },
    ],
    challenge: 'Operations executives and bed placement coordinators lacked unified, cross-facility visibility into actual discharge progress, resulting in delayed turnover and emergency patient holds.',
    solutionImplemented: 'Centralized Operational Throughput Command View connecting admission-discharge-transfer (ADT) feeds, transport milestones, and environmental services workflows.',
    deploymentTimeframe: '10-week implementation encompassing 4 hospitals with bidirectional HL7 interface engine connectivity.',
    verifiedGovernance: 'Annual third-party SOC 2 Type II audit report available under mutual NDA; enterprise SAML 2.0 SSO integrated with Imprivata badge readers.',
  },
  {
    id: 'dr-sarah-lin',
    category: 'cmo',
    author: {
      name: 'Dr. Sarah Lin, MD, MS-HBI',
      credentials: 'MD, MS (Health Biomedical Informatics)',
      title: 'Chief Medical Information Officer & Attending Hospitalist',
      department: 'Clinical Informatics & Inpatient Medicine',
      organization: 'Cascadia Academic Health System',
      facilityScale: 'Academic Medical Center • 850 Beds',
      avatarInitials: 'SL',
      avatarBg: 'bg-cyan-700',
    },
    headline: 'Native SMART on FHIR integration with zero dual-charting across 220 attending hospitalists',
    quote: 'As both an informatics officer and a practicing hospitalist, my mandate was zero double-documentation. CarePulse embedded directly into Epic Hyperspace as an authorized SMART on FHIR application. Our 220 hospitalists review prioritized clinical milestones, acknowledge telemetry trends, and sign off on interdisciplinary handoffs without switching applications. Interface latency is under 300 milliseconds.',
    ehrSystem: 'Epic Hyperspace (FHIR R4 Certified)',
    primaryMetric: {
      value: '48%',
      label: 'Drop in Non-Actionable Alert Pages',
      subtext: 'Algorithmic clustering consolidated repetitive laboratory alerts into contextual batches',
    },
    secondaryMetrics: [
      { value: '0 mins', label: 'Double-documentation required' },
      { value: '99.98%', label: 'Continuous FHIR R4 uptime' },
    ],
    challenge: 'Physicians were overwhelmed by EHR alert fatigue and resisted adding standalone operational software that demanded separate logins and duplicate charting.',
    solutionImplemented: 'Direct SMART on FHIR App Orchard integration providing single sign-on (SSO) and bidirectional synchronization with native Epic clinical records.',
    deploymentTimeframe: 'Full health system Go-Live completed in 7 weeks including sandbox IT validation and security testing.',
    verifiedGovernance: 'OAuth 2.0 Bearer Token auth with ephemeral token rotation, zero storage of patient protected health information on mobile devices.',
  },
  {
    id: 'dr-keith-oconnor',
    category: 'coordination',
    author: {
      name: "Dr. Keith O'Connor, PharmD, BCPS",
      credentials: 'PharmD, BCPS (Board Certified Pharmacotherapy Specialist)',
      title: 'Director of Inpatient Pharmacy & Medication Safety',
      department: 'Department of Pharmacy Services',
      organization: 'Vanguard Medical Center Network',
      facilityScale: '5 Acute Hospitals • 920 Beds',
      avatarInitials: 'KO',
      avatarBg: 'bg-amber-700',
    },
    headline: 'Increased bedside Meds-to-Beds discharge delivery from 34% to 89% across medical units',
    quote: 'The primary cause of afternoon discharge delays was final medication reconciliation and courier dispatch. Prior to CarePulse, pharmacy learned about patient discharges 20 minutes before the family arrived. With CarePulse, impending discharge flags appear 6 to 12 hours in advance. Our bedside Meds-to-Beds delivery rate surged to 89%, virtually eliminating post-discharge pharmacy callbacks.',
    ehrSystem: 'Oracle Cerner Millennium',
    primaryMetric: {
      value: '89%',
      label: 'Meds-to-Beds Bedside Delivery Rate',
      subtext: 'Surged from a baseline of 34%, eliminating 45 minutes of bedside waiting for patients',
    },
    secondaryMetrics: [
      { value: '38 mins', label: 'Earlier discharge medication prep' },
      { value: '23%', label: 'Reduction in 30-day medication-related readmissions' },
    ],
    challenge: 'Floor nurses and pharmacy technicians operated in silos, leading to rushed discharge reconciliations, late medication deliveries, and frustrated patients waiting hours for prescriptions.',
    solutionImplemented: 'Automated Pharmacy Discharge Flagging that broadcasts impending discharge orders directly to the central inpatient dispensary queue.',
    deploymentTimeframe: 'Rolled out across 5 facilities in 5 weeks with automated Cerner Pharmacy dispensing queue listeners.',
    verifiedGovernance: 'Full audit trails for controlled substance tracking, DEA compliance integration, and HIPAA-compliant delivery confirmation.',
  },
  {
    id: 'tamika-washington',
    category: 'coordination',
    author: {
      name: 'Tamika Washington, LCSW, ACM-SW',
      credentials: 'LCSW, ACM-SW (Accredited Case Manager)',
      title: 'Director of Care Coordination & Post-Acute Placement',
      department: 'Case Management & Social Work Services',
      organization: 'Pinecrest Regional Health',
      facilityScale: 'Multi-Facility Network • 520 Beds',
      avatarInitials: 'TW',
      avatarBg: 'bg-rose-700',
    },
    headline: 'Cut avoidable post-acute placement delays by 1.2 days per complex discharge',
    quote: 'Discovering a missing prior authorization or unconfirmed skilled nursing facility (SNF) bed on the morning of discharge was our biggest operational pain point. CarePulse automated our discharge barrier checklist, highlighting pending physical therapy notes and DME approvals 48 hours ahead of time. It turned chaos into a calm, proactive, predictable workflow for our entire social work team.',
    ehrSystem: 'Epic Systems & Allscripts Sunrise',
    primaryMetric: {
      value: '1.2 days',
      label: 'Faster Post-Acute Placement Authorization',
      subtext: 'Complex patients transition to skilled nursing and home health without avoidable weekend stays',
    },
    secondaryMetrics: [
      { value: '91%', label: 'Early barrier detection rate' },
      { value: '16%', label: 'Drop in CMS readmission penalty risk' },
    ],
    challenge: 'Case managers spent hours making manual phone calls and tracking insurance authorizations on paper checklists, frequently delaying complex patient discharges by 2 to 3 days.',
    solutionImplemented: 'CarePulse Proactive Discharge Barrier Matrix with automated payer prior-authorization milestone tracking and SNF placement coordination.',
    deploymentTimeframe: '4-week rollout across care coordination and social work teams with custom post-acute transition templates.',
    verifiedGovernance: 'Secure encrypted electronic transmission of transition packets to verified post-acute receiving facilities with full timestamp auditing.',
  },
];

const AUTOPLAY_DURATION = 6500; // 6.5 seconds per slide
const TICK_INTERVAL = 50; // 50ms smooth tick rate

export const ClientTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cmo' | 'cno' | 'coo' | 'coordination'>('all');
  const [inspectModalPartner, setInspectModalPartner] = useState<TestimonialPartner | null>(null);
  const [sliderMode, setSliderMode] = useState<'spotlight' | 'multi'>('spotlight');
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [slideProgress, setSlideProgress] = useState<number>(0);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const filteredPartners = selectedCategory === 'all'
    ? CLIENT_TESTIMONIALS
    : CLIENT_TESTIMONIALS.filter(p => p.category === selectedCategory);

  const totalSlides = filteredPartners.length;

  // Keep currentIndex bounded when category changes
  useEffect(() => {
    if (currentIndex >= filteredPartners.length) {
      setCurrentIndex(0);
      setSlideProgress(0);
    }
  }, [filteredPartners.length, currentIndex]);

  // Subtle Scroll-In Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNext = useCallback(() => {
    setSlideDirection('next');
    setSlideProgress(0);
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setSlideDirection('prev');
    setSlideProgress(0);
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleSelectSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setSlideDirection(idx > currentIndex ? 'next' : 'prev');
    setSlideProgress(0);
    setCurrentIndex(idx);
  };

  // High-precision smooth progress timer for autoplay
  useEffect(() => {
    if (!isPlaying || isHovered || totalSlides <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setSlideProgress(prev => {
        const nextVal = prev + (TICK_INTERVAL / AUTOPLAY_DURATION) * 100;
        if (nextVal >= 100) {
          setSlideDirection('next');
          setCurrentIndex(curr => (curr + 1) % totalSlides);
          return 0;
        }
        return nextVal;
      });
    }, TICK_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPlaying, isHovered, totalSlides]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inspectModalPartner) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, inspectModalPartner]);

  const currentPartner = filteredPartners[currentIndex] || filteredPartners[0] || CLIENT_TESTIMONIALS[0];

  const categories = [
    { id: 'all', label: 'All Healthcare Leaders', count: CLIENT_TESTIMONIALS.length },
    { id: 'cmo', label: 'Chief Medical Officers (CMOs)', count: CLIENT_TESTIMONIALS.filter(p => p.category === 'cmo').length },
    { id: 'cno', label: 'Chief Nursing Officers (CNOs)', count: CLIENT_TESTIMONIALS.filter(p => p.category === 'cno').length },
    { id: 'coo', label: 'Hospital Operations (COOs)', count: CLIENT_TESTIMONIALS.filter(p => p.category === 'coo').length },
    { id: 'coordination', label: 'Pharmacy & Care Coordination', count: CLIENT_TESTIMONIALS.filter(p => p.category === 'coordination').length },
  ];

  return (
    <section 
      ref={sectionRef}
      id="client-testimonials"
      className="py-16 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden transition-opacity duration-700"
      aria-label="Client Testimonials and Healthcare Success Stories Slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Subtle Scroll In-View Animation */}
        <div 
          className={`max-w-3xl mx-auto text-center mb-10 sm:mb-14 transition-all duration-700 transform ${
            isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs mb-3">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Interactive Partner Outcomes Slider</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
            Trusted by Inpatient Leadership Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600">
              18+ Acute Care Networks
            </span>
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            From Chief Medical Officers and Nursing Executives to Hospital COOs and Clinical Pharmacists—explore validated clinical outcomes through our interactive partner testimonial slider.
          </p>

          {/* Trusted Institutions Logos Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-400 font-medium">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] block sm:inline w-full sm:w-auto mb-1 sm:mb-0">
              Verified Deployments:
            </span>
            {TRUSTED_INSTITUTIONS.slice(0, 4).map((inst, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500/80" />
                {inst.name}
              </span>
            ))}
          </div>
        </div>

        {/* Controls Toolbar: Categories, Slider Controls, Mode Toggle */}
        <div 
          className={`flex flex-col md:flex-row items-center justify-between gap-4 mb-6 transition-all duration-700 delay-100 transform ${
            isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto pb-1 gap-1.5 max-w-full scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  setCurrentIndex(0);
                  setSlideProgress(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-teal-800 text-teal-100' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Slider Player Controls & Dynamic Progress Track */}
          <div className="flex items-center gap-3 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setSliderMode('spotlight')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  sliderMode === 'spotlight' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Spotlight Slide View"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Spotlight</span>
              </button>
              <button
                onClick={() => setSliderMode('multi')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  sliderMode === 'multi' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Multi-Card Carousel Track"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-teal-600" />
                <span>Carousel</span>
              </button>
            </div>

            {/* Segmented Progress Capsule Track */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              {filteredPartners.map((_, idx) => {
                const isActive = idx === currentIndex;
                const isPast = idx < currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectSlide(idx)}
                    className="h-2 rounded-full overflow-hidden transition-all duration-300 relative cursor-pointer group"
                    style={{ width: isActive ? '2.25rem' : '0.625rem' }}
                    title={`Jump to Partner Story ${idx + 1}`}
                    aria-label={`Jump to Partner Story ${idx + 1}`}
                  >
                    <div className="w-full h-full bg-slate-200 group-hover:bg-slate-300" />
                    {isActive && (
                      <div 
                        className="absolute inset-0 bg-teal-700 rounded-full transition-[width] duration-75 ease-linear"
                        style={{ width: `${slideProgress}%` }}
                      />
                    )}
                    {isPast && (
                      <div className="absolute inset-0 bg-teal-600/70 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Slide Index Counter */}
            <div className="text-xs font-mono text-slate-500 font-semibold px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-teal-700 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-slate-300 mx-1">/</span>
              <span>{String(totalSlides).padStart(2, '0')}</span>
            </div>

            {/* Auto-play Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
              title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-teal-700" /> : <Play className="w-3.5 h-3.5 text-slate-700" />}
            </button>

            {/* Prev & Next Arrow Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-800 hover:border-teal-300 hover:bg-teal-50/50 transition-all shadow-2xs cursor-pointer active:scale-95"
                aria-label="Previous Testimonial"
                title="Previous Slide (or left arrow key)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-800 hover:border-teal-300 hover:bg-teal-50/50 transition-all shadow-2xs cursor-pointer active:scale-95"
                aria-label="Next Testimonial"
                title="Next Slide (or right arrow key)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. SPOTLIGHT SLIDER VIEW */}
        {sliderMode === 'spotlight' ? (
          <div
            className={`relative transition-all duration-700 delay-200 transform ${
              isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* The Main Stage Card */}
            <div className="bg-white rounded-3xl border-2 border-teal-600/30 shadow-xl overflow-hidden transition-all duration-300 hover:border-teal-600/60 relative">
              
              {/* REAL-TIME TOP PROGRESS BAR INDICATOR (Animates smoothly across the 6.5s interval) */}
              <div 
                className="w-full bg-slate-900 h-1 overflow-hidden relative"
                aria-hidden="true"
              >
                <div 
                  className={`h-full bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-300 transition-[width] duration-75 ease-linear shadow-xs ${
                    isHovered ? 'opacity-70 animate-pulse' : 'opacity-100'
                  }`}
                  style={{ width: `${slideProgress}%` }}
                />
              </div>

              {/* Top verified banner */}
              <div className="bg-slate-900 text-white px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-teal-300 uppercase tracking-wider text-[11px]">
                    Verified Partner Case Study
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {currentPartner.author.organization}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-teal-400" />
                    {currentPartner.ehrSystem}
                  </span>
                  <span className="hidden sm:inline text-slate-500">·</span>
                  <span className="hidden sm:inline font-mono">{currentPartner.author.facilityScale}</span>
                  {isHovered && (
                    <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 text-[10px]">
                      <Pause className="w-2.5 h-2.5" /> Paused on hover
                    </span>
                  )}
                </div>
              </div>

              {/* Main Content Split with Directional Slide Transition Animation */}
              <div 
                key={currentPartner.id}
                className={`p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300 ${
                  slideDirection === 'next' ? 'slide-in-from-right-4' : 'slide-in-from-left-4'
                }`}
              >
                {/* Left 7 Columns: Quote & Leadership */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Headline */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded inline-block mb-3">
                      Hospital Executive Outcome
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      "{currentPartner.headline}"
                    </h3>
                  </div>

                  {/* Full Clinical Quote */}
                  <div className="relative pl-5 border-l-4 border-teal-600">
                    <Quote className="w-8 h-8 text-slate-200 absolute -top-3 -left-3 -z-0 opacity-40" />
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic relative z-10">
                      "{currentPartner.quote}"
                    </p>
                  </div>

                  {/* Leader Profile Badge */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <div className={`w-14 h-14 rounded-2xl ${currentPartner.author.avatarBg} text-white font-bold flex items-center justify-center shrink-0 shadow-md text-lg`}>
                      {currentPartner.author.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">
                          {currentPartner.author.name}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="text-xs font-semibold text-teal-800">
                        {currentPartner.author.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {currentPartner.author.department} · {currentPartner.author.organization}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 5 Columns: Hard Verified Metrics & Deep Dive Action */}
                <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Audited Performance Delta
                    </div>

                    {/* Primary Highlight Metric */}
                    <div className="bg-white p-5 rounded-xl border border-teal-200 shadow-xs mb-4">
                      <div className="text-3xl sm:text-4xl font-black text-teal-700 font-mono tracking-tight tabular-nums">
                        {currentPartner.primaryMetric.value}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                        {currentPartner.primaryMetric.label}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {currentPartner.primaryMetric.subtext}
                      </p>
                    </div>

                    {/* Secondary Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      {currentPartner.secondaryMetrics.map((sec, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                            {sec.value}
                          </div>
                          <div className="text-[11px] font-medium text-slate-600 mt-0.5 leading-tight">
                            {sec.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/80">
                    <button
                      onClick={() => setInspectModalPartner(currentPartner)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-teal-900 bg-white border border-teal-300 hover:bg-teal-50 hover:border-teal-400 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      <span>Inspect Clinical Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      onClick={() => navigate('/demo')}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Request Matching Sandbox Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Thumbnail Navigator Strip: Jump to any leader */}
              <div className="bg-slate-100/70 border-t border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Select Clinical Partner:
                  </span>
                  
                  {/* Miniature progress badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {Math.round(slideProgress)}%
                    </span>
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-600 rounded-full transition-[width] duration-75 ease-linear"
                        style={{ width: `${slideProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
                  {filteredPartners.map((partner, idx) => {
                    const isSelected = idx === currentIndex;
                    return (
                      <button
                        key={partner.id}
                        onClick={() => handleSelectSlide(idx)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 relative overflow-hidden ${
                          isSelected
                            ? 'bg-white border-teal-600 shadow-sm ring-2 ring-teal-600/25 scale-[1.02]'
                            : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700 hover:scale-[1.01]'
                        }`}
                      >
                        {/* Selected thumbnail mini progress line */}
                        {isSelected && (
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 transition-[width] duration-75 ease-linear"
                            style={{ width: `${slideProgress}%` }}
                          />
                        )}
                        <div className={`w-8 h-8 rounded-lg ${partner.author.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                          {partner.author.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <div className={`text-xs font-bold truncate ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                            {partner.author.name.split(',')[0]}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {partner.primaryMetric.value} delta
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 2. MULTI-CARD CAROUSEL TRACK VIEW */
          <div 
            className={`relative transition-all duration-700 delay-200 transform ${
              isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Multi-Track Progress Bar */}
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-teal-600 transition-[width] duration-75 ease-linear rounded-full"
                style={{ width: `${slideProgress}%` }}
              />
            </div>

            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{
                  transform: `translateX(-${currentIndex * (100 / Math.min(filteredPartners.length, 3))}%)`
                }}
              >
                {filteredPartners.map((partner, idx) => (
                  <div
                    key={partner.id}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between p-6 group"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-xl ${partner.author.avatarBg} text-white font-bold flex items-center justify-center shrink-0 shadow-xs text-xs`}>
                            {partner.author.avatarInitials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-slate-900 truncate">
                                {partner.author.name}
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {partner.author.title}
                            </div>
                            <div className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                              {partner.author.organization}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] uppercase font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded shrink-0">
                          Verified
                        </span>
                      </div>

                      {/* EHR Strip */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 mb-3.5 pb-2.5 border-b border-slate-100">
                        <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                          <Layers className="w-3 h-3 text-slate-400" />
                          {partner.ehrSystem}
                        </span>
                        <span className="text-slate-300" aria-hidden="true">·</span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {partner.author.facilityScale}
                        </span>
                      </div>

                      {/* Quantified Outcome */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-semibold text-slate-900 block leading-tight">
                            {partner.primaryMetric.label}
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5 line-clamp-1">
                            {partner.primaryMetric.subtext}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xl font-extrabold text-teal-700 font-mono tabular-nums">
                            {partner.primaryMetric.value}
                          </span>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative mb-4">
                        <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-1 -z-0 opacity-80" />
                        <p className="text-xs text-slate-700 leading-relaxed italic relative z-10 pl-3 border-l-2 border-teal-600/40 line-clamp-4">
                          "{partner.quote}"
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                      <div className="text-[11px] text-slate-500 truncate">
                        <strong className="text-slate-800">{partner.secondaryMetrics[0].value}</strong>{' '}
                        <span>{partner.secondaryMetrics[0].label}</span>
                      </div>

                      <button
                        onClick={() => setInspectModalPartner(partner)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors shrink-0 cursor-pointer"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Segmented Progress Dots for Track */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filteredPartners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSlide(idx)}
                  className="h-2 rounded-full overflow-hidden transition-all duration-300 relative cursor-pointer group"
                  style={{ width: idx === currentIndex ? '2.5rem' : '0.625rem' }}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className="w-full h-full bg-slate-200 group-hover:bg-slate-300" />
                  {idx === currentIndex && (
                    <div 
                      className="absolute inset-0 bg-teal-700 rounded-full transition-[width] duration-75 ease-linear"
                      style={{ width: `${slideProgress}%` }}
                    />
                  )}
                  {idx < currentIndex && (
                    <div className="absolute inset-0 bg-teal-600/70 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Global Directory Link & Security Bar */}
        <div 
          className={`mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all duration-700 delay-300 transform ${
            isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                100% HIPAA-Compliant & SOC 2 Type II Audited Deployments
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Every partner deployment includes an executable BAA, dedicated clinical informatics support, and zero model training on patient PHI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/case-stories"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-teal-800 hover:border-teal-300 transition-colors shadow-2xs"
            >
              Browse Full Case Stories
            </Link>
            <Link
              to="/demo"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-xs"
            >
              Schedule Partner Briefing
            </Link>
          </div>
        </div>

      </div>

      {/* Case Study Deep-Dive Modal */}
      {inspectModalPartner && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => setInspectModalPartner(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-3.5 mb-6 pr-8">
              <div className={`w-12 h-12 rounded-xl ${inspectModalPartner.author.avatarBg} text-white font-bold flex items-center justify-center shrink-0 shadow-xs text-base`}>
                {inspectModalPartner.author.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {inspectModalPartner.author.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                    Verified Partner
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {inspectModalPartner.author.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {inspectModalPartner.author.organization} · {inspectModalPartner.author.facilityScale}
                </div>
              </div>
            </div>

            {/* Headline Callout */}
            <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-4 mb-6">
              <div className="text-xs font-semibold text-teal-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Validated Health System Impact
              </div>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                "{inspectModalPartner.headline}"
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-2xl font-black text-teal-700 font-mono tabular-nums">
                  {inspectModalPartner.primaryMetric.value}
                </div>
                <div className="text-[11px] font-semibold text-slate-800 mt-0.5 leading-tight">
                  {inspectModalPartner.primaryMetric.label}
                </div>
              </div>

              {inspectModalPartner.secondaryMetrics.map((sec, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                    {sec.value}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-800 mt-0.5 leading-tight">
                    {sec.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Clinical Deep-Dive Sections */}
            <div className="space-y-4 text-xs text-slate-700 mb-6">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  1. Operational Baseline & Challenge
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-200/70">
                  {inspectModalPartner.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  2. Solution & Workflow Architecture
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-200/70">
                  {inspectModalPartner.solutionImplemented}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  3. EHR Environment & Deployment Velocity
                </h4>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700 border border-slate-200">
                    EHR: <strong>{inspectModalPartner.ehrSystem}</strong>
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700 border border-slate-200">
                    Rollout: <strong>{inspectModalPartner.deploymentTimeframe}</strong>
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  4. Governance & HIPAA Compliance
                </h4>
                <p className="text-slate-500 leading-relaxed italic">
                  {inspectModalPartner.verifiedGovernance}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setInspectModalPartner(null)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close Summary
              </button>
              <button
                onClick={() => {
                  setInspectModalPartner(null);
                  navigate('/demo');
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Request Custom EHR Architecture Walkthrough</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
