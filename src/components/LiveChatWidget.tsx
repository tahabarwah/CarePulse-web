import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Minus, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  RefreshCw,
  Clock,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'demo' | 'diagnostic' | 'security' | 'integrations' | 'stories' | 'roi' | 'resources' | 'patient-portal';
  }[];
}

interface LiveChatWidgetProps {
  onOpenDemo: () => void;
  onOpenDiagnostic: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hello! I'm Sarah Chen from CarePulse Clinical Solutions. How can I assist your clinical or health system team today?",
    timestamp: 'Just now',
    actions: [
      { label: 'Schedule an Executive Demo', actionType: 'demo' },
      { label: 'Run Workflow Diagnostic', actionType: 'diagnostic' },
    ],
  },
];

const SUGGESTED_QUERIES = [
  { text: 'Do you sign HIPAA BAAs?', query: 'Do you sign HIPAA BAAs?' },
  { text: 'How does Epic/Cerner integration work?', query: 'How does Epic and Cerner EHR integration work?' },
  { text: 'Can we run a single-unit pilot?', query: 'Can our hospital start with a single-unit pilot?' },
  { text: 'How much nursing time is saved?', query: 'How much nursing time is saved during shift handoffs?' },
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenDemo,
  onOpenDiagnostic,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [showCallout, setShowCallout] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  // Show friendly callout badge after 3.5 seconds if user hasn't opened chat
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCallout(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowCallout(false);
    setHasUnread(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const executeAction = (actionType: 'demo' | 'diagnostic' | 'security' | 'integrations' | 'stories' | 'roi' | 'resources' | 'patient-portal') => {
    if (actionType === 'demo') {
      onOpenDemo();
    } else if (actionType === 'diagnostic') {
      onOpenDiagnostic();
    } else if (actionType === 'security') {
      document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'integrations') {
      document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'stories') {
      document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'roi') {
      document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'resources') {
      document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'patient-portal') {
      document.getElementById('patient-portal')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateBotReply = (userText: string): { text: string; actions?: ChatMessage['actions'] } => {
    const lower = userText.toLowerCase();

    if (lower.includes('hipaa') || lower.includes('baa') || lower.includes('security') || lower.includes('compliance') || lower.includes('phi')) {
      return {
        text: 'Yes, absolutely. CarePulse executes a formal Business Associate Agreement (BAA) with all covered healthcare entities. Data is cryptographically secured via TLS 1.3 in transit and AES-256 at rest, audited annually under SOC 2 Type II controls. We strictly adhere to Minimum Necessary standards and never train AI models on patient health information.',
        actions: [
          { label: 'View Security Specifications', actionType: 'security' },
          { label: 'Schedule Security Architecture Review', actionType: 'demo' },
        ],
      };
    }

    if (lower.includes('epic') || lower.includes('cerner') || lower.includes('meditech') || lower.includes('ehr') || lower.includes('fhir') || lower.includes('integration') || lower.includes('interop')) {
      return {
        text: 'CarePulse connects natively with Epic Systems (SMART on FHIR and App Market ready), Oracle Health / Cerner Millennium, MEDITECH Expanse, and Athenahealth. We map standard FHIR R4 resources (Encounter, Patient, Task, CarePlan) and ingest real-time ADT/HL7 feeds with single sign-on (SAML/OAuth 2.0), avoiding double-documentation for floor staff.',
        actions: [
          { label: 'Explore Supported EHR Ecosystem', actionType: 'integrations' },
          { label: 'Request EHR Integration Guide', actionType: 'demo' },
        ],
      };
    }

    if (lower.includes('pilot') || lower.includes('timeline') || lower.includes('rollout') || lower.includes('how long') || lower.includes('trial')) {
      return {
        text: 'Most hospital partners launch with a targeted 4-to-8 week clinical pilot on 1–2 acute inpatient or medical-surgical units. This allows your nursing directors and clinical informatics leads to validate handoff time reclamation and rounding metrics before hospital-wide rollout.',
        actions: [
          { label: 'Request Pilot Evaluation Proposal', actionType: 'demo' },
          { label: 'Analyze Unit Bottlenecks', actionType: 'diagnostic' },
        ],
      };
    }

    if (lower.includes('nurse') || lower.includes('handoff') || lower.includes('sbar') || lower.includes('time') || lower.includes('shift')) {
      return {
        text: 'CarePulse automates digital SBAR shift handoffs (Situation, Background, Assessment, Recommendation) with real-time vital and telemetry feeds pulled directly from your EHR. In verified clinical deployments, bedside nurses save an average of 28 minutes per 12-hour shift transition, significantly cutting end-of-shift charting overtime.',
        actions: [
          { label: 'Read Nurse Executive Case Study', actionType: 'stories' },
          { label: 'Schedule Nursing Workflow Demo', actionType: 'demo' },
        ],
      };
    }

    if (lower.includes('discharge') || lower.includes('los') || lower.includes('length of stay') || lower.includes('throughput') || lower.includes('bed')) {
      return {
        text: 'CarePulse tracks proactive discharge milestones 24–48 hours ahead of expected release, coordinating hospitalists, floor nurses, case management, and EVS bed turnaround in real time. Partner health systems report a median 1.4-hour earlier daily discharge order placement and an average 0.8-day reduction in avoidable length of stay.',
        actions: [
          { label: 'Explore Hospitalist & Operations Cases', actionType: 'stories' },
          { label: 'Run LOS Savings Diagnostic', actionType: 'diagnostic' },
        ],
      };
    }

    if (lower.includes('roi') || lower.includes('calculator') || lower.includes('savings') || lower.includes('return') || lower.includes('financial') || lower.includes('report') || lower.includes('cost')) {
      return {
        text: 'CarePulse delivers an average 4.8x–5.4x ROI across acute health systems, driven by 28 minutes saved per nurse per shift handoff, reduced after-shift charting overtime, and 1.4-hour earlier daily discharge placement. You can model your facility savings and generate a personalized executive summary PDF report for your leadership committee in our Healthcare ROI Calculator.',
        actions: [
          { label: 'Open ROI Calculator & Download Report', actionType: 'roi' },
          { label: 'Schedule Financial Review Demo', actionType: 'demo' },
        ],
      };
    }

    if (lower.includes('whitepaper') || lower.includes('paper') || lower.includes('research') || lower.includes('download') || lower.includes('resource') || lower.includes('guide')) {
      return {
        text: 'We have published "The Modern Acute Care Blueprint" (2026 Executive Research Report), examining 1.2M shift transitions across 14 acute hospitals. It includes peer benchmarks on 28-min handoff time savings, SMART on FHIR architecture diagrams, and discharge milestone templates. You can download the complete PDF or read the executive summary in our Resources section.',
        actions: [
          { label: 'Download 2026 Clinical Whitepaper (PDF)', actionType: 'resources' },
          { label: 'Schedule Executive Demo', actionType: 'demo' },
        ],
      };
    }

    if (lower.includes('patient') || lower.includes('portal') || lower.includes('bedside') || lower.includes('family') || lower.includes('hcahps') || lower.includes('call bell')) {
      return {
        text: 'The CarePulse Patient & Family Portal transforms real-time EHR orders into a clear, anxiety-reducing bedside timeline. It shows today’s care milestones, who is on duty, and discharge readiness, while providing a non-urgent request button for ice, blankets, or assistance that cuts emergency call-bell activations by 38% and boosts HCAHPS scores by +14 percentile points.',
        actions: [
          { label: 'Explore Interactive Patient Portal Preview', actionType: 'patient-portal' },
          { label: 'Schedule Bedside Integration Demo', actionType: 'demo' },
        ],
      };
    }

    if (lower.includes('cost') || lower.includes('pricing') || lower.includes('quote') || lower.includes('subscription')) {
      return {
        text: 'CarePulse is licensed on an enterprise annual subscription tailored to your active staffed inpatient bed capacity and licensed clinical user volume. Every tier includes dedicated clinical informatics onboarding, continuous EHR interface maintenance, enterprise BAA coverage, and 24/7 hospital support.',
        actions: [
          { label: 'Request Health System Pricing', actionType: 'demo' },
        ],
      };
    }

    if (lower.includes('demo') || lower.includes('talk') || lower.includes('speak') || lower.includes('contact') || lower.includes('call') || lower.includes('meeting')) {
      return {
        text: "I'd be glad to schedule a live, 30-minute demonstration tailored specifically to your clinical specialties and EHR platform. You can review live interface mockups and ask technical questions directly to our informatics team.",
        actions: [
          { label: 'Open Interactive Demo Scheduler', actionType: 'demo' },
        ],
      };
    }

    // Default helpful fallback response
    return {
      text: "Thank you for reaching out! CarePulse provides an enterprise clinical orchestration layer built specifically for acute hospital networks, focusing on SBAR shift handoffs, multidisciplinary rounding, and proactive discharge velocity. Would you like to review an interactive demo or run a fast diagnostic analysis on your unit's current bottlenecks?",
      actions: [
        { label: 'Book Clinical Team Demo', actionType: 'demo' },
        { label: 'Run AI Workflow Diagnostic', actionType: 'diagnostic' },
        { label: 'View Customer Success Stories', actionType: 'stories' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate realistic clinical specialist typing delay (650ms - 1100ms)
    setTimeout(() => {
      const botResponse = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse.text,
        timestamp: 'Just now',
        actions: botResponse.actions,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <>
      {/* Floating Unopened State Tooltip / Greeting Callout */}
      {!isOpen && showCallout && (
        <div 
          id="chat-callout-bubble"
          className="fixed bottom-22 right-5 z-40 max-w-xs sm:max-w-sm bg-white rounded-2xl p-4 shadow-xl border border-slate-200 text-slate-900 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
          role="dialog"
          aria-label="CarePulse Live Support Notification"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
              SC
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Sarah Chen, MSN, RN</span>
                <button
                  onClick={() => setShowCallout(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                  aria-label="Dismiss message notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-snug">
                Questions about EHR compatibility, BAA terms, or clinical pilots? Chat with our team in real time.
              </p>
              <button
                id="btn-open-chat-from-callout"
                onClick={handleOpenChat}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
              >
                <span>Chat with Clinical Specialist</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          id="floating-live-chat-bubble"
          onClick={handleOpenChat}
          className="fixed bottom-5 right-5 z-40 group flex items-center gap-3 bg-teal-700 hover:bg-teal-800 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-teal-700/30"
          aria-label="Open Live Clinical Support Chat"
        >
          {/* Active online green badge */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-teal-600/60 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-teal-900"></span>
            </span>
          </div>

          <div className="text-left">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>Live Support</span>
              {hasUnread && (
                <span className="bg-emerald-400 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full leading-none">
                  1
                </span>
              )}
            </div>
            <div className="text-[10px] text-teal-100 hidden sm:block">
              Clinical Informatics Desk
            </div>
          </div>
        </button>
      )}

      {/* Simulated Support Chat Window */}
      {isOpen && (
        <div
          id="live-chat-window"
          className={`fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-200 ${
            isMinimized ? 'h-14' : 'h-[560px] max-h-[85vh]'
          }`}
          role="region"
          aria-label="Live Clinical Solutions Chat Window"
        >
          {/* Window Header */}
          <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shadow-inner">
                  SC
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span>Sarah Chen, MSN, RN</span>
                  <span className="text-[9px] bg-teal-900/80 text-teal-300 px-1.5 py-0.5 rounded border border-teal-700/60 font-medium">
                    Verified Staff
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Active Now • Typical reply &lt; 1m</span>
                </div>
              </div>
            </div>

            {/* Window Top Controls */}
            <div className="flex items-center gap-1">
              <button
                id="btn-chat-reset"
                onClick={handleResetChat}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-chat-minimize"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title={isMinimized ? 'Expand Chat' : 'Minimize Chat'}
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-chat-close"
                onClick={handleCloseChat}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Close Chat"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* If NOT minimized, show messages and input */}
          {!isMinimized && (
            <>
              {/* Trust & Compliance Sub-Banner */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                  <span>Enterprise Support • HIPAA Safeguarded</span>
                </div>
                <span className="text-[10px] text-slate-400">No PHI Transmitted</span>
              </div>

              {/* Chat Message Stream */}
              <div 
                id="chat-message-list"
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-end gap-2 max-w-[88%]">
                        {!isUser && (
                          <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mb-1">
                            SC
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                            isUser
                              ? 'bg-teal-700 text-white rounded-br-xs shadow-xs'
                              : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-xs'
                          }`}
                        >
                          {msg.text}

                          {/* Action Recommendation Buttons */}
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                              {msg.actions.map((act, aIdx) => (
                                <button
                                  key={aIdx}
                                  onClick={() => executeAction(act.actionType)}
                                  className="w-full text-left inline-flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100/80 text-teal-900 text-[11px] font-semibold transition-colors cursor-pointer border border-teal-200/70"
                                >
                                  <span>{act.label}</span>
                                  <ArrowRight className="w-3 h-3 text-teal-700" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 px-2 mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      SC
                    </div>
                    <div className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-[10px] text-slate-400 ml-1.5">Sarah is typing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Query Suggestion Chips */}
              <div className="px-3 pt-2 pb-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-teal-600" />
                  Quick:
                </span>
                {SUGGESTED_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.query)}
                    disabled={isTyping}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/70 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                  >
                    {q.text}
                  </button>
                ))}
              </div>

              {/* Input Box & Action Footer */}
              <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about Epic, BAAs, pilots..."
                    disabled={isTyping}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-slate-800 placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                <div className="mt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <span>🔒 For operational inquiries. Never submit real patient PHI.</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
