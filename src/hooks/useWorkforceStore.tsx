import React, { createContext, useContext, useState, useEffect } from "react";

export type AttentionStatus = "Open" | "In Progress" | "Done" | "Overdue";

export interface StatefulAttentionItem {
  id: string;
  personaId: string;
  level: "critical" | "warn" | "good";
  title: string;
  meta: string;
  detail: string;
  rec: string;
  cta: string;
  when: string;
  status: AttentionStatus;
  createdAt: string; // ISO timestamp
  escalatedToChro: boolean;
}

interface PersonaStats {
  id: string;
  name: string;
  role: string;
  total: number;
  open: number;
  overdue: number;
  inProgress: number;
  done: number;
  completionRate: number;
}

interface WorkforceStats {
  total: number;
  open: number;
  overdue: number;
  inProgress: number;
  done: number;
  completionRate: number;
  byPersona: Record<string, PersonaStats>;
}

interface WorkforceStoreContextProps {
  attentionItems: StatefulAttentionItem[];
  updateItemStatus: (id: string, status: AttentionStatus) => void;
  escalateItem: (id: string) => void;
  activateBuddyNudge: () => void;
  resetStore: () => void;
  buddyNudgeActivated: boolean;
  stats: WorkforceStats;
  getPersonaAttention: (personaId: string) => StatefulAttentionItem[];
  getDrilldownData: () => {
    title: string;
    subtitle: string;
    summary: string[];
    table: {
      columns: string[];
      rows: (string | number)[][];
    };
    recommendations: string[];
  };
}

const WorkforceStoreContext = createContext<WorkforceStoreContextProps | undefined>(undefined);

// Helper to generate ISO date X hours ago
const hoursAgo = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

const INITIAL_ITEMS: StatefulAttentionItem[] = [
  // ---- Subrat (CHRO) ----
  {
    id: "subrat-1",
    personaId: "subrat",
    level: "critical",
    title: "Skills expiry — Manufacturing · 847 workers",
    meta: "Today",
    detail: "Automation disrupting 34% of floor skills in 18 months",
    rec: "AI-mapped reskilling cohort · Q3 launch",
    cta: "View skills map",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(72), // Over 48 hours - triggers escalation warning
    escalatedToChro: false,
  },
  {
    id: "subrat-2",
    personaId: "subrat",
    level: "critical",
    title: "Sales force attrition — 43% of FMCG exits",
    meta: "48h",
    detail: "1,240 field sales employees · Avg tenure declining",
    rec: "Career clarity + comp benchmarking",
    cta: "Review",
    when: "48h",
    status: "Open",
    createdAt: hoursAgo(12),
    escalatedToChro: false,
  },
  {
    id: "subrat-3",
    personaId: "subrat",
    level: "warn",
    title: "Transformation Index 42% — Target 65%",
    meta: "This week",
    detail: "People + Process combined · 11 initiatives tracked",
    rec: "Prioritise top 3 by business impact",
    cta: "View roadmap",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(36),
    escalatedToChro: false,
  },
  {
    id: "subrat-4",
    personaId: "subrat",
    level: "warn",
    title: "6 succession gaps — critical leadership",
    meta: "Week",
    detail: "2 BU Heads · 3 Practice Heads · 1 CFO-level",
    rec: "HiPo acceleration programme",
    cta: "View gaps",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(40),
    escalatedToChro: false,
  },
  {
    id: "subrat-5",
    personaId: "subrat",
    level: "warn",
    title: "Psychological safety — 3 locations below threshold",
    meta: "3 days",
    detail: "Manufacturing Noida · Plant 2 · Hospitality",
    rec: "Manager coaching + predictive framework",
    cta: "View framework",
    when: "3d",
    status: "Open",
    createdAt: hoursAgo(24),
    escalatedToChro: false,
  },
  {
    id: "subrat-6",
    personaId: "subrat",
    level: "good",
    title: "Board People Review — AI draft 78% ready",
    meta: "Friday",
    detail: "Auto-compiled from cockpit data · 3 sections need CHRO input",
    rec: "45-minute review session today",
    cta: "Open draft",
    when: "Fri",
    status: "Done",
    createdAt: hoursAgo(8),
    escalatedToChro: false,
  },

  // ---- Ravi (Plant HR) ----
  {
    id: "ravi-1",
    personaId: "ravi",
    level: "critical",
    title: "ESIC filing — 1,240 workers · Due 4 days",
    meta: "Today",
    detail: "₹12,84,000 contribution · AI pre-filled 97% records",
    rec: "Generate filing pack",
    cta: "Generate pack",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(14),
    escalatedToChro: false,
  },
  {
    id: "ravi-2",
    personaId: "ravi",
    level: "critical",
    title: "Shift B burnout — 6 workers · Packaging line",
    meta: "Today",
    detail: "3 signals: overtime + heat + grievances",
    rec: "Schedule welfare checks",
    cta: "Schedule",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(54), // Over 48 hours - triggers escalation warning
    escalatedToChro: false,
  },
  {
    id: "ravi-3",
    personaId: "ravi",
    level: "critical",
    title: "Seasonal hiring — 34 workers · Pulse season",
    meta: "48h",
    detail: "Peak demand Jun–Aug · Lead time 3 weeks",
    rec: "Activate temp agency contract today",
    cta: "Open requisitions",
    when: "48h",
    status: "Open",
    createdAt: hoursAgo(22),
    escalatedToChro: false,
  },
  {
    id: "ravi-4",
    personaId: "ravi",
    level: "warn",
    title: "Contract renewals — 12 workers · 30 days",
    meta: "Week",
    detail: "Renewal letters auto-drafted · Need approval",
    rec: "Review and sign",
    cta: "Review",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(10),
    escalatedToChro: false,
  },
  {
    id: "ravi-5",
    personaId: "ravi",
    level: "warn",
    title: "Skill reskilling — 127 workers · 18 months",
    meta: "Week",
    detail: "Packaging automation arriving Q4 2026",
    rec: "View reskilling plan",
    cta: "View plan",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(48),
    escalatedToChro: false,
  },
  {
    id: "ravi-6",
    personaId: "ravi",
    level: "warn",
    title: "Grievance — Packaging Zone 2 · Heat",
    meta: "3 days",
    detail: "Cooling unit ₹92K vs ₹14.4L attrition risk",
    rec: "View resolution options",
    cta: "Resolve",
    when: "3d",
    status: "Open",
    createdAt: hoursAgo(62), // Over 48h but not critical level, no alert
    escalatedToChro: false,
  },
  {
    id: "ravi-7",
    personaId: "ravi",
    level: "good",
    title: "New joiners — 8 workers · Day 1 tomorrow",
    meta: "Today",
    detail: "Induction packs ready · Buddy assigned",
    rec: "View onboarding plan",
    cta: "View",
    when: "Today",
    status: "Done",
    createdAt: hoursAgo(4),
    escalatedToChro: false,
  },

  // ---- Vikram (Field Sales) ----
  {
    id: "vikram-1",
    personaId: "vikram",
    level: "critical",
    title: "15 RSOs at immediate flight risk",
    meta: "Today",
    detail: "Combined annual sales ₹14.2 Cr at stake",
    rec: "1:1 conversations with talking points",
    cta: "View list",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(72), // Over 48 hours - triggers escalation warning
    escalatedToChro: false,
  },
  {
    id: "vikram-2",
    personaId: "vikram",
    level: "critical",
    title: "Suresh Yadav — Top 6%, 4yr, never promoted",
    meta: "Today",
    detail: "Case study of system failure · 89% flight risk",
    rec: "Schedule immediate 1:1",
    cta: "Schedule",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(24),
    escalatedToChro: false,
  },
  {
    id: "vikram-3",
    personaId: "vikram",
    level: "critical",
    title: "Route optimisation skill gap — 39pp",
    meta: "48h",
    detail: "Causing 34% lower call productivity vs competitors",
    rec: "2-day digital bootcamp",
    cta: "Plan bootcamp",
    when: "48h",
    status: "Open",
    createdAt: hoursAgo(12),
    escalatedToChro: false,
  },
  {
    id: "vikram-4",
    personaId: "vikram",
    level: "warn",
    title: "RSO→ASM promotion 8% vs industry 14%",
    meta: "Week",
    detail: "Career path 36% slower than benchmark",
    rec: "Accelerate top 15% to ASM in 2.5 years",
    cta: "Model plan",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(32),
    escalatedToChro: false,
  },
  {
    id: "vikram-5",
    personaId: "vikram",
    level: "warn",
    title: "Comp gap — Top 20% below market P50",
    meta: "Week",
    detail: "Market correction needed for retention",
    rec: "Comp adjustment for top performers",
    cta: "Review comp",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(41),
    escalatedToChro: false,
  },
  {
    id: "vikram-6",
    personaId: "vikram",
    level: "good",
    title: "New joiner onboarding — 12 RSOs Week 2",
    meta: "Monitor",
    detail: "Buddy program active · Field shadowing on track",
    rec: "Continue monitoring",
    cta: "View",
    when: "Week",
    status: "Done",
    createdAt: hoursAgo(48),
    escalatedToChro: false,
  },
  {
    id: "vikram-arjun-risk",
    personaId: "vikram",
    level: "warn",
    title: "⚠ Early flight risk — Arjun Rawat · RSO · Meerut · Day 18",
    meta: "Warning",
    detail:
      "3 signals: order pace below ramp (7 vs 9 expected), buddy gap 4 days, 0 learning logins in 3 days. Cohort: similar profiles exit by Day 45 in 58% of cases.",
    rec: "Activate buddy nudge + manager SMS + monitor next 7 days",
    cta: "View Arjun's profile",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(9),
    escalatedToChro: false,
  },

  // ---- Arjun (RSO) ----
  {
    id: "arjun-1",
    personaId: "arjun",
    level: "critical",
    title: "📄 2 documents missing — salary ruk sakti hai",
    meta: "Open",
    detail: "PF Nomination + Bank Account Copy · Deadline: 10 June",
    rec: "Upload Karo (2 min) →",
    cta: "Upload Karo (2 min) →",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(6),
    escalatedToChro: false,
  },
  {
    id: "arjun-2",
    personaId: "arjun",
    level: "warn",
    title: "🏪 Sharma Kirana — sabse valuable unvisited store",
    meta: "New",
    detail: "Meerut Cantonment · Avg order ₹2,400 · Aaj open 10am–7pm",
    rec: "Direction Lo →",
    cta: "Direction Lo →",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(5),
    escalatedToChro: false,
  },
  {
    id: "arjun-3",
    personaId: "arjun",
    level: "warn",
    title: "🤝 Deepak bhai se 4 din se baat nahi hui",
    meta: "Open",
    detail: "Buddy system important hai probation mein · 5 minute ka call karo",
    rec: "WhatsApp Karo →",
    cta: "WhatsApp Karo →",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(4),
    escalatedToChro: false,
  },
  {
    id: "arjun-4",
    personaId: "arjun",
    level: "good",
    title: "🏅 Badge mila! First 5 Orders — batch mein top 30%",
    meta: "Done",
    detail: "Day 14 par achieve kiya · Share karo DS Group ke RSO Wall of Fame par",
    rec: "Share Karo →",
    cta: "Share Karo →",
    when: "Today",
    status: "Done",
    createdAt: hoursAgo(3),
    escalatedToChro: false,
  },

  // ---- Ananya (Brand Exec) ----
  {
    id: "ananya-1",
    personaId: "ananya",
    level: "good",
    title: "Rajnigandha ASM opportunity — 94% skill fit",
    meta: "New",
    detail: "AI Colleague identified this at 3am · ₹180 Cr brand P&L exposure",
    rec: "Closes both gap skills · 4 months faster to BM",
    cta: "Express interest",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(10),
    escalatedToChro: false,
  },
  {
    id: "ananya-2",
    personaId: "ananya",
    level: "warn",
    title: "Comp gap −14% vs MNC FMCG P50",
    meta: "Mid-year",
    detail: "Top 30% of IIM brand talent leaves within 3 years over comp",
    rec: "Request comp discussion in mid-year review",
    cta: "Prepare ask",
    when: "47d",
    status: "Open",
    createdAt: hoursAgo(50),
    escalatedToChro: false,
  },
  {
    id: "ananya-3",
    personaId: "ananya",
    level: "warn",
    title: "P&L skill gap — biggest blocker to BM",
    meta: "Week",
    detail: "Rajnigandha role would close this immediately",
    rec: "Apply or shadow ASM for 60 days",
    cta: "Plan path",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(96),
    escalatedToChro: false,
  },
  {
    id: "ananya-4",
    personaId: "ananya",
    level: "good",
    title: "Mentor session — CMO · Friday 4pm",
    meta: "Fri",
    detail: "Topic: Cross-category career moves",
    rec: "Bring Rajnigandha opportunity to discuss",
    cta: "Prep notes",
    when: "Fri",
    status: "Done",
    createdAt: hoursAgo(12),
    escalatedToChro: false,
  },
  {
    id: "ananya-5",
    personaId: "ananya",
    level: "good",
    title: "Digital Marketing certification — 64%",
    meta: "Self-paced",
    detail: "3 modules left · 8 hours to complete",
    rec: "Finish before mid-year review",
    cta: "Continue",
    when: "47d",
    status: "Done",
    createdAt: hoursAgo(72),
    escalatedToChro: false,
  },

  // ---- Kavita (Hospitality) ----
  {
    id: "kavita-1",
    personaId: "kavita",
    level: "critical",
    title: "Manu Maharani F&B — 3 sick · 94% occupancy",
    meta: "Today",
    detail: "Sunday service coverage gap · 2 backup staff available",
    rec: "Activate backup staff now",
    cta: "Activate",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(2),
    escalatedToChro: false,
  },
  {
    id: "kavita-2",
    personaId: "kavita",
    level: "critical",
    title: "L'Opera Delhi — 2 Pastry Chefs · Day 28",
    meta: "Today",
    detail: "Peak season 6 weeks · Revenue risk ₹8.4L",
    rec: "Expand sourcing + explore internal transfer",
    cta: "Expand",
    when: "Today",
    status: "Open",
    createdAt: hoursAgo(72), // Over 48 hours - triggers escalation warning
    escalatedToChro: false,
  },
  {
    id: "kavita-3",
    personaId: "kavita",
    level: "critical",
    title: "FSSAI training — 74% · Annual due",
    meta: "Week",
    detail: "847 employees · Food safety mandatory",
    rec: "Auto-nudge 221 pending employees",
    cta: "Auto-nudge",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(75), // Over 48 hours - triggers escalation warning
    escalatedToChro: false,
  },
  {
    id: "kavita-4",
    personaId: "kavita",
    level: "warn",
    title: "Sommelier — Le Marche Gurgaon · Day 19",
    meta: "3d",
    detail: "Premium guest experience gap · Weekend traffic high",
    rec: "Post to specialist boards",
    cta: "Post",
    when: "3d",
    status: "Open",
    createdAt: hoursAgo(44),
    escalatedToChro: false,
  },
  {
    id: "kavita-5",
    personaId: "kavita",
    level: "warn",
    title: "Seasonal readiness — Jun–Aug peak",
    meta: "Week",
    detail: "Housekeeping +22 · F&B +18 · Concierge +8",
    rec: "Open seasonal requisitions",
    cta: "Open reqs",
    when: "Week",
    status: "Open",
    createdAt: hoursAgo(20),
    escalatedToChro: false,
  },
  {
    id: "kavita-6",
    personaId: "kavita",
    level: "warn",
    title: "Guest feedback — 3 service complaints",
    meta: "3d",
    detail: "Root: understaffing + training in F&B",
    rec: "Service recovery plan",
    cta: "View plan",
    when: "3d",
    status: "Open",
    createdAt: hoursAgo(40),
    escalatedToChro: false,
  },
  {
    id: "kavita-7",
    personaId: "kavita",
    level: "good",
    title: "Namah Rishikesh — Full occupancy 3 weekends",
    meta: "Monitor",
    detail: "Staffing confirmed · No gaps",
    rec: "Continue monitoring",
    cta: "View",
    when: "Week",
    status: "Done",
    createdAt: hoursAgo(80),
    escalatedToChro: false,
  },

  // ---- Overdue Items (Seeded to match "3 overdue" at start) ----
  {
    id: "overdue-1",
    personaId: "ravi",
    level: "critical",
    title: "Factories Act returns filing",
    meta: "Overdue",
    detail: "Mandatory consolidated reports for Noida factory",
    rec: "Submit draft immediately to avoid warning",
    cta: "Filing page",
    when: "Overdue",
    status: "Overdue",
    createdAt: hoursAgo(120),
    escalatedToChro: false,
  },
  {
    id: "overdue-2",
    personaId: "vikram",
    level: "critical",
    title: "UP West territory rebalance approval",
    meta: "Overdue",
    detail: "11 routes remain overloaded, causing attrition risk",
    rec: "Approve route-AI plan immediately",
    cta: "Approve plan",
    when: "Overdue",
    status: "Overdue",
    createdAt: hoursAgo(110),
    escalatedToChro: false,
  },
  {
    id: "overdue-3",
    personaId: "kavita",
    level: "critical",
    title: "Sommelier sourcing expansion contract",
    meta: "Overdue",
    detail: "Premium recruiting agency SLA expired",
    rec: "Renew SLA or switch to alternative vendor",
    cta: "Contracts list",
    when: "Overdue",
    status: "Overdue",
    createdAt: hoursAgo(90),
    escalatedToChro: false,
  },

  // ---- Completed Items (Seeded to bring Done count to 32) ----
  // Already have: subrat-6, ravi-7, vikram-6, ananya-4, ananya-5, kavita-7 = 6 items done
  // Need 26 more items to hit exactly 32 done items! Let's seed them.
  {
    id: "done-1",
    personaId: "subrat",
    level: "good",
    title: "Q1 Talent Assessment Review",
    meta: "Completed",
    detail: "Completed across all 12 BUs",
    rec: "Refreshed succession charts",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(120),
    escalatedToChro: false,
  },
  {
    id: "done-2",
    personaId: "subrat",
    level: "good",
    title: "FMCG Comp Benchmark Update",
    meta: "Completed",
    detail: "MNC P50 data uploaded into comp model",
    rec: "Review compensation structure changes",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(100),
    escalatedToChro: false,
  },
  {
    id: "done-3",
    personaId: "subrat",
    level: "good",
    title: "BU Head Mouth Freshener successor",
    meta: "Completed",
    detail: "Successor identified and approved by Board",
    rec: "Announce rotation schedule",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(90),
    escalatedToChro: false,
  },
  {
    id: "done-4",
    personaId: "subrat",
    level: "good",
    title: "Gender Diversity Hiring Guide",
    meta: "Completed",
    detail: "Guideline manual published to all BUs",
    rec: "Audit onboarding cohorts in Q3",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(80),
    escalatedToChro: false,
  },
  {
    id: "done-5",
    personaId: "subrat",
    level: "good",
    title: "HQ Noida Office space allocation",
    meta: "Completed",
    detail: "Accommodated new digital talent cohort",
    rec: "Track facility feedback",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(140),
    escalatedToChro: false,
  },
  {
    id: "done-6",
    personaId: "subrat",
    level: "good",
    title: "L&D Adaptive platform selection",
    meta: "Completed",
    detail: "Vendor contracted; integration sandbox active",
    rec: "Launch trial with Noida factory",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(150),
    escalatedToChro: false,
  },

  {
    id: "done-7",
    personaId: "ravi",
    level: "good",
    title: "ESIC April filing pack submission",
    meta: "Completed",
    detail: "Reconciled and submitted on EPF portal",
    rec: "Audit exception logs",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(160),
    escalatedToChro: false,
  },
  {
    id: "done-8",
    personaId: "ravi",
    level: "good",
    title: "Boiler safety inspection certification",
    meta: "Completed",
    detail: "Noida main plant certified for 12 months",
    rec: "Attach compliance certificate to dashboard",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(130),
    escalatedToChro: false,
  },
  {
    id: "done-9",
    personaId: "ravi",
    level: "good",
    title: "Shift C roster adjustment for festival",
    meta: "Completed",
    detail: "Arranged backup transportation for night shift",
    rec: "Share transport routes with workers",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(110),
    escalatedToChro: false,
  },
  {
    id: "done-10",
    personaId: "ravi",
    level: "good",
    title: "Zone 2 cafeteria upgrade sign-off",
    meta: "Completed",
    detail: "Cooling unit and clean water dispenser installed",
    rec: "Close safety inspection ticket",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(85),
    escalatedToChro: false,
  },
  {
    id: "done-11",
    personaId: "ravi",
    level: "good",
    title: "Contract Labour license half-year return",
    meta: "Completed",
    detail: "Submitted for Greater Noida satellite unit",
    rec: "Archived return pack",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(95),
    escalatedToChro: false,
  },

  {
    id: "done-12",
    personaId: "vikram",
    level: "good",
    title: "Festive hiring drive agency contracts",
    meta: "Completed",
    detail: "Secured Apex and Trident staffing terms",
    rec: "Activate onboarding guides for regional leads",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(180),
    escalatedToChro: false,
  },
  {
    id: "done-13",
    personaId: "vikram",
    level: "good",
    title: "UP East ASM promotion alignment",
    meta: "Completed",
    detail: "Approved fast-track progression for 3 high performers",
    rec: "Issue revised offer letters",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(170),
    escalatedToChro: false,
  },
  {
    id: "done-14",
    personaId: "vikram",
    level: "good",
    title: "TSM leadership workshop",
    meta: "Completed",
    detail: "Delivered in Delhi for 22 regional supervisors",
    rec: "Collect training effectiveness reports",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(150),
    escalatedToChro: false,
  },
  {
    id: "done-15",
    personaId: "vikram",
    level: "good",
    title: "RSO WhatsApp training completion reports",
    meta: "Completed",
    detail: "94% completion across North India field force",
    rec: "Submit digital skills certification report",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(125),
    escalatedToChro: false,
  },
  {
    id: "done-16",
    personaId: "vikram",
    level: "good",
    title: "Competitor salary study FMCG",
    meta: "Completed",
    detail: "Analyzed ITC and HUL basic packages",
    rec: "Formulate regional retention correction proposal",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(115),
    escalatedToChro: false,
  },

  {
    id: "done-17",
    personaId: "ananya",
    level: "good",
    title: "Q1 Catch Spices campaign review",
    meta: "Completed",
    detail: "Exceeded reach targets by 14%",
    rec: "Log key learning modules for next campaign",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(190),
    escalatedToChro: false,
  },
  {
    id: "done-18",
    personaId: "ananya",
    level: "good",
    title: "P&L basics training program",
    meta: "Completed",
    detail: "Passed evaluation assessment at 88%",
    rec: "Request actual product category P&L shadowing",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(155),
    escalatedToChro: false,
  },
  {
    id: "done-19",
    personaId: "ananya",
    level: "good",
    title: "Modern-Trade promotion execution dashboard",
    meta: "Completed",
    detail: "Built using company BI tool; analytics live",
    rec: "Share dashboard link with Brand Head",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(120),
    escalatedToChro: false,
  },

  {
    id: "done-20",
    personaId: "kavita",
    level: "good",
    title: "Housekeeping contract renewals for MM Nainital",
    meta: "Completed",
    detail: "Renewed seasonal agency for 6 months",
    rec: "Audit safety compliance logs of crew",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(175),
    escalatedToChro: false,
  },
  {
    id: "done-21",
    personaId: "kavita",
    level: "good",
    title: "FSSAI audit readiness for L'Opera Delhi",
    meta: "Completed",
    detail: "Food safety audit mock assessments completed",
    rec: "Publish mock checklist to kitchen staff",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(140),
    escalatedToChro: false,
  },
  {
    id: "done-22",
    personaId: "kavita",
    level: "good",
    title: "Le Marche premium retail staffing model approval",
    meta: "Completed",
    detail: "Secured headcount allocation for Gurgaon branch",
    rec: "Open recruitment postings next Monday",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(135),
    escalatedToChro: false,
  },
  {
    id: "done-23",
    personaId: "kavita",
    level: "good",
    title: "Namah Rishikesh off-season rota update",
    meta: "Completed",
    detail: "Shift optimization saved 12% operational costs",
    rec: "Monitor guest satisfaction rates weekly",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(110),
    escalatedToChro: false,
  },
  {
    id: "done-24",
    personaId: "kavita",
    level: "good",
    title: "POSH awareness workshop hospitality",
    meta: "Completed",
    detail: "98% coverage at hotels and premium retail outlets",
    rec: "Update local committee dashboard logs",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(95),
    escalatedToChro: false,
  },
  {
    id: "done-25",
    personaId: "kavita",
    level: "good",
    title: "Sommelier candidate mock assessment",
    meta: "Completed",
    detail: "Interviewer feedback positive for Gurgaon lead",
    rec: "Arrange final round salary discussions",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(70),
    escalatedToChro: false,
  },
  {
    id: "done-26",
    personaId: "kavita",
    level: "good",
    title: "Chef relocation package approvals",
    meta: "Completed",
    detail: "Approved allowance for pastry chef relocation",
    rec: "Onboard candidate next fortnight",
    cta: "View",
    when: "Completed",
    status: "Done",
    createdAt: hoursAgo(60),
    escalatedToChro: false,
  },
];

const LOCAL_STORAGE_KEY = "dsg_workforce_attention_items";
const LOCAL_STORAGE_BUDDY_KEY = "dsg_workforce_buddy_nudge";

export const WorkforceStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<StatefulAttentionItem[]>(INITIAL_ITEMS);
  const [buddyNudgeActivated, setBuddyNudgeActivated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Hydration hook: read from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const buddyStored = localStorage.getItem(LOCAL_STORAGE_BUDDY_KEY);
      if (buddyStored) {
        setBuddyNudgeActivated(JSON.parse(buddyStored));
      }
    } catch (e) {
      console.error("Failed to load attention items from localStorage", e);
    }
    setInitialized(true);
  }, []);

  // Sync back to localStorage whenever items change
  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(LOCAL_STORAGE_BUDDY_KEY, JSON.stringify(buddyNudgeActivated));
    } catch (e) {
      console.error("Failed to save attention items to localStorage", e);
    }
  }, [items, buddyNudgeActivated, initialized]);

  const updateItemStatus = (id: string, status: AttentionStatus) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // If marked Done, remove escalation status automatically
          const escalatedToChro = status === "Done" ? false : item.escalatedToChro;
          return { ...item, status, escalatedToChro };
        }
        return item;
      })
    );
  };

  const escalateItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, escalatedToChro: true } : item))
    );
  };

  const resetStore = () => {
    setItems(INITIAL_ITEMS);
    setBuddyNudgeActivated(false);
  };

  const activateBuddyNudge = () => {
    setBuddyNudgeActivated(true);
    setItems((prev) =>
      prev.map((item) => (item.id === "vikram-arjun-risk" ? { ...item, status: "Done" } : item)),
    );
  };

  const getPersonaAttention = (personaId: string) => {
    return items.filter((item) => item.personaId === personaId);
  };

  // Compile calculations
  const calculateStats = (): WorkforceStats => {
    const total = items.length;
    const open = items.filter((i) => i.status === "Open").length;
    const overdue = items.filter((i) => i.status === "Overdue").length;
    const inProgress = items.filter((i) => i.status === "In Progress").length;
    const done = items.filter((i) => i.status === "Done").length;
    
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

    const personasList = ["subrat", "ravi", "vikram", "ananya", "kavita", "arjun"];
    const personaMeta: Record<string, { name: string; role: string }> = {
      subrat: { name: "Subrat Chakravarty", role: "CHRO Cockpit" },
      ravi: { name: "Ravi Sharma", role: "Plant HR Manager" },
      vikram: { name: "Vikram Tiwari", role: "HRBP Field Sales" },
      ananya: { name: "Ananya Verma", role: "Brand Executive" },
      kavita: { name: "Kavita Singh", role: "HR Manager Hospitality" },
      arjun: { name: "Arjun Rawat", role: "RSO Field Sales" },
    };

    const byPersona: Record<string, PersonaStats> = {};

    personasList.forEach((pId) => {
      const pItems = items.filter((i) => i.personaId === pId);
      const pTotal = pItems.length;
      const pOpen = pItems.filter((i) => i.status === "Open").length;
      const pOverdue = pItems.filter((i) => i.status === "Overdue").length;
      const pInProgress = pItems.filter((i) => i.status === "In Progress").length;
      const pDone = pItems.filter((i) => i.status === "Done").length;
      const pCompRate = pTotal > 0 ? Math.round((pDone / pTotal) * 100) : 0;

      byPersona[pId] = {
        id: pId,
        name: personaMeta[pId]?.name ?? pId,
        role: personaMeta[pId]?.role ?? "",
        total: pTotal,
        open: pOpen,
        overdue: pOverdue,
        inProgress: pInProgress,
        done: pDone,
        completionRate: pCompRate,
      };
    });

    return { total, open, overdue, inProgress, done, completionRate, byPersona };
  };

  const stats = calculateStats();

  const getDrilldownData = () => {
    const rows = Object.values(stats.byPersona).map((p) => [
      p.name + ` (${p.role})`,
      p.total,
      p.done,
      p.open,
      p.overdue,
      p.completionRate + "%",
    ]);

    return {
      title: "Action Completion Summary",
      subtitle: "Performance breakdown across all 6 cockpits YTD",
      summary: [
        `Overall completion rate sits at ${stats.completionRate}% group-wide.`,
        `Out of ${stats.total} total items compiled by AI agents, ${stats.done} are completed, ${stats.open} remain open, and ${stats.overdue} have breached deadlines (Overdue).`,
      ],
      table: {
        columns: ["Cockpit / Persona", "Total Actions", "Completed (Done)", "Open Actions", "Overdue Actions", "Completion Rate"],
        rows,
      },
      recommendations: [
        "Follow up with Hospitality (Kavita Singh) due to seasonal critical staffing pressure.",
        "Review Field Sales (Vikram Tiwari) overdue items regarding UP West route rebalancing.",
        "Escalate long-standing critical actions that have stayed Open for >48 hours.",
      ],
    };
  };

  return (
    <WorkforceStoreContext.Provider
      value={{
        attentionItems: items,
        updateItemStatus,
        escalateItem,
        activateBuddyNudge,
        resetStore,
        buddyNudgeActivated,
        stats,
        getPersonaAttention,
        getDrilldownData,
      }}
    >
      {children}
    </WorkforceStoreContext.Provider>
  );
};

export const useWorkforceStore = () => {
  const context = useContext(WorkforceStoreContext);
  if (context === undefined) {
    throw new Error("useWorkforceStore must be used within a WorkforceStoreProvider");
  }
  return context;
};
