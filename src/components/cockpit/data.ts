export type Kpi = {
  label: string;
  value: string;
  signal?: string;
  sub?: string;
  ai?: string;
  tone?: "default" | "up" | "down" | "warn" | "critical";
};

export type AttentionItem = {
  level: "critical" | "warn" | "good";
  title: string;
  meta: string;
  detail: string;
  rec: string;
  cta: string;
  when: string;
};

export type QuickLink = {
  label: string;
  badge?: string;
  tone?: "critical" | "warn" | "good" | "default";
};

export type AgentRun = { name: string; what: string; time: string };

export type Persona = {
  id: string;
  initials: string;
  name: string;
  role: string;
  meta: string;
  brands?: string;
  agents: number;
  tasks: number;
  greeting: string;
  kpis: Kpi[];
  insight: {
    title: string;
    confidence: number;
    confidenceRange?: [number, number];
    sampleSize?: string;
    window?: string;
    runAt?: string;
    agentVersion?: string;
    body: string[];
    sources: string;
    stats: { label: string; value: string }[];
    actions: [string, string];
  };
  attention: AttentionItem[];
  nav: string[];
  quickLinks?: QuickLink[];
  agentRuns?: AgentRun[];
  copilot: string[];
  accent: "green" | "gold" | "dark" | "amber";
};


export const personas: Record<string, Persona> = {
  subrat: {
    id: "subrat",
    initials: "SC",
    name: "Subrat Chakravarty",
    role: "CHRO & Head Business Excellence · DS Group · Noida",
    meta: "Day 127 in role · People & Process Transformation mandate",
    agents: 8,
    tasks: 22,
    accent: "dark",
    greeting:
      "Good morning, Subrat. 3 critical workforce signals and 2 strategic priorities need your attention. Skills obsolescence is accelerating in Manufacturing — 34% of critical skills will expire within 18 months without intervention. AI has mapped your transformation roadmap status overnight.",
    kpis: [
      { label: "Total Workforce", value: "7,700", signal: "+340 YTD", sub: "Noida HQ + 12 locations", tone: "up" },
      { label: "Skills Expiry Risk", value: "34%", signal: "↑ +8pp", sub: "Critical skills · 18-month window", tone: "critical" },
      { label: "Attrition (12M)", value: "18.4%", signal: "↑ +2.1pp", sub: "Sales force = 43% of exits", tone: "warn" },
      { label: "Open Critical Roles", value: "87", signal: "Avg 41 days", sub: "Brand · Supply Chain · Digital", tone: "warn" },
      { label: "Transformation Index", value: "42%", signal: "Target 65%", sub: "People + Process combined", tone: "warn" },
      { label: "Engagement Score", value: "71", signal: "↓ -4pp", sub: "Manufacturing below threshold", tone: "down" },
      { label: "Digital Talent Ratio", value: "8.2%", signal: "Target 15%", sub: "By 2027", tone: "up" },
      { label: "Succession Coverage", value: "58%", signal: "6 gaps", sub: "Critical leadership roles", tone: "warn" },
    ],
    insight: {
      title: "Skills Obsolescence — Manufacturing & Sales",
      confidence: 91,
      confidenceRange: [88, 94],
      sampleSize: "7,700 employees · 12 BUs",
      window: "18-month forward window",
      runAt: "07:12",
      agentVersion: "Skills Agent v2.4",
      body: [
        "34% of DS Group's critical workforce skills are on an 18-month expiry trajectory. Manufacturing process skills are being disrupted by automation. Sales force digital skills lag market significantly.",
        "At current reskilling pace: gap closes in 31 months. With AI-driven learning acceleration: 14 months.",
      ],
      sources: "skills graph · market benchmarks · learning completion · attrition patterns · role taxonomy",
      stats: [
        { label: "Employees at risk", value: "2,618" },
        { label: "Revenue impact", value: "₹84 Cr" },
        { label: "Transformation gap", value: "23 months" },
        { label: "AI-accelerated", value: "6 months" },
      ],
      actions: ["View skills map", "Launch reskilling programme"],
    },

    attention: [
      { level: "critical", title: "Skills expiry — Manufacturing · 847 workers", meta: "Today", detail: "Automation disrupting 34% of floor skills in 18 months", rec: "AI-mapped reskilling cohort · Q3 launch", cta: "View skills map", when: "Today" },
      { level: "critical", title: "Sales force attrition — 43% of FMCG exits", meta: "48h", detail: "1,240 field sales employees · Avg tenure declining", rec: "Career clarity + comp benchmarking", cta: "Review", when: "48h" },
      { level: "warn", title: "Transformation Index 42% — Target 65%", meta: "This week", detail: "People + Process combined · 11 initiatives tracked", rec: "Prioritise top 3 by business impact", cta: "View roadmap", when: "Week" },
      { level: "warn", title: "6 succession gaps — critical leadership", meta: "Week", detail: "2 BU Heads · 3 Practice Heads · 1 CFO-level", rec: "HiPo acceleration programme", cta: "View gaps", when: "Week" },
      { level: "warn", title: "Psychological safety — 3 locations below threshold", meta: "3 days", detail: "Manufacturing Noida · Plant 2 · Hospitality", rec: "Manager coaching + predictive framework", cta: "View framework", when: "3d" },
      { level: "good", title: "Board People Review — AI draft 78% ready", meta: "Friday", detail: "Auto-compiled from cockpit data · 3 sections need CHRO input", rec: "45-minute review session today", cta: "Open draft", when: "Fri" },
    ],
    nav: ["HR Cockpit", "Workforce Intelligence", "DEI & Compliance", "Talent Acquisition", "Performance", "Learning", "Succession", "Attrition Dashboard", "Transformation Roadmap", "Board Reporting"],
    agentRuns: [
      { name: "Skills Agent", what: "Mapped expiry profiles", time: "02:14" },
      { name: "Attrition Agent", what: "Flight risk model updated", time: "03:48" },
      { name: "Learning Agent", what: "Adoption report compiled", time: "04:33" },
      { name: "Succession Agent", what: "HiPo matches identified", time: "05:21" },
      { name: "Analytics Agent", what: "Board review auto-compiled", time: "06:09" },
      { name: "Transform Agent", what: "Index updated · 8 initiatives", time: "07:12" },
    ],
    copilot: [
      "What are the 3 highest-impact actions for my transformation agenda this week?",
      "Show me skills expiry risk by business unit and location",
      "Which initiatives are most delayed vs business impact?",
      "Generate my Friday Board People Review draft",
      "How is psychological safety tracking across our 12 locations?",
    ],

  },

  ravi: {
    id: "ravi",
    initials: "RS",
    name: "Ravi Sharma",
    role: "Plant HR Manager · DS Group Manufacturing · Noida Plant",
    meta: "Brands: Rajnigandha · Catch · Pulse · Pass Pass",
    agents: 6,
    tasks: 16,
    accent: "green",
    greeting:
      "Good morning, Ravi. Shift B attendance is at 87.4% — below threshold. 6 workers are showing burnout signals. ESIC filing is due in 4 days. AI has prepared your Monday operating picture.",
    kpis: [
      { label: "Plant Workforce", value: "1,240", sub: "Permanent + Contract · Noida + 2 satellite" },
      { label: "Today's Attendance", value: "89.2%", signal: "↓ -3.1pp", sub: "Shift B below threshold", tone: "down" },
      { label: "Active Grievances", value: "9", signal: "↑ +3 new", sub: "Packaging line dominant", tone: "warn" },
      { label: "Compliance Alerts", value: "5", signal: "Urgent", sub: "ESIC + contract renewals", tone: "critical" },
      { label: "Attrition Risk", value: "18", signal: "workers", sub: "Packaging + QA lines", tone: "warn" },
      { label: "Seasonal Hiring Gap", value: "34", signal: "Urgent", sub: "Pulse season peak", tone: "critical" },
      { label: "Skill Expiry Risk", value: "127", signal: "18 months", sub: "Automation disruption", tone: "critical" },
      { label: "Contract Renewals", value: "12", signal: "30 days", sub: "Action needed", tone: "warn" },
    ],
    insight: {
      title: "Shift B Attendance + Burnout Cluster",
      confidence: 89,
      confidenceRange: [86, 92],
      sampleSize: "1,240 workers · Packaging cohort",
      window: "21-day rolling window",
      runAt: "05:48",
      agentVersion: "Shift Health Agent v1.8",
      body: [
        "Shift B attendance has declined 3.1pp over 21 days (plant rollup 89.2%, Shift B specifically 87.4%). Packaging line workers show 3 simultaneous signals: overtime above 22 hrs/month, heat complaints unresolved for 18 days, and 4 grievances from same zone.",
        "Together these signals predict exit within 45 days with 87% confidence.",
      ],
      sources: "attendance · shift data · grievance log · overtime records · temperature complaints",
      stats: [
        { label: "Workers at risk", value: "6" },
        { label: "Replacement cost", value: "₹3.6L each" },
        { label: "Intervention cost", value: "₹18,000" },
        { label: "vs replacement", value: "₹21.6L" },
      ],
      actions: ["Schedule welfare checks", "View shift details"],
    },
    attention: [
      { level: "critical", title: "ESIC filing — 1,240 workers · Due 4 days", meta: "Today", detail: "₹12,84,000 contribution · AI pre-filled 97% records", rec: "Generate filing pack", cta: "Generate pack", when: "Today" },
      { level: "critical", title: "Shift B burnout — 6 workers · Packaging line", meta: "Today", detail: "3 signals: overtime + heat + grievances", rec: "Schedule welfare checks", cta: "Schedule", when: "Today" },
      { level: "critical", title: "Seasonal hiring — 34 workers · Pulse season", meta: "48h", detail: "Peak demand Jun–Aug · Lead time 3 weeks", rec: "Activate temp agency contract today", cta: "Open requisitions", when: "48h" },
      { level: "warn", title: "Contract renewals — 12 workers · 30 days", meta: "Week", detail: "Renewal letters auto-drafted · Need approval", rec: "Review and sign", cta: "Review", when: "Week" },
      { level: "warn", title: "Skill reskilling — 127 workers · 18 months", meta: "Week", detail: "Packaging automation arriving Q4 2026", rec: "View reskilling plan", cta: "View plan", when: "Week" },
      { level: "warn", title: "Grievance — Packaging Zone 2 · Heat", meta: "3 days", detail: "Cooling unit ₹92K vs ₹14.4L attrition risk", rec: "View resolution options", cta: "Resolve", when: "3d" },
      { level: "good", title: "New joiners — 8 workers · Day 1 tomorrow", meta: "Today", detail: "Induction packs ready · Buddy assigned", rec: "View onboarding plan", cta: "View", when: "Today" },
    ],
    nav: ["HR Cockpit", "Workforce", "Compliance", "Grievances", "Shift Management", "Training", "Brand Production", "Attrition"],
    quickLinks: [
      { label: "Contractor tracker", badge: "221" },
      { label: "Safety incidents (30d)", badge: "3", tone: "warn" },
      { label: "Rajnigandha line — Plant 1", badge: "Live", tone: "good" },
      { label: "Catch Spices line — Plant 2", badge: "OT 17%", tone: "warn" },
      { label: "ESIC calendar", badge: "4d", tone: "critical" },
    ],
    agentRuns: [
      { name: "Attendance Agent", what: "Shift A/B/C reconciled", time: "04:42" },
      { name: "Compliance Agent", what: "ESIC pack pre-filled 97%", time: "05:10" },
      { name: "Burnout Agent", what: "6 packaging workers flagged", time: "05:48" },
      { name: "Hiring Agent", what: "Pulse-season req draft", time: "06:21" },
      { name: "Grievance Agent", what: "Zone 2 heat sentiment", time: "06:58" },
      { name: "Training Agent", what: "Safety overdue list refreshed", time: "07:24" },
    ],
    copilot: [
      "Who are my top attrition risks on Shift B this week?",
      "Generate ESIC May filing pack for 1,240 workers",
      "Show me hiring plan for Pulse season peak demand",
      "Which workers need reskilling before packaging automation arrives?",
    ],
  },


  vikram: {
    id: "vikram",
    initials: "VT",
    name: "Vikram Tiwari",
    role: "HR Business Partner · Field Sales · North India",
    meta: "Brands: Rajnigandha · Catch · Pulse · Pass Pass · FRU · 1,240 RSOs",
    agents: 5,
    tasks: 13,
    accent: "green",
    greeting:
      "Good morning, Vikram. Field sales attrition in North India is running at 26.4% — 8pp above company average. 47 RSOs have received competitor offers this quarter (flagged via exit interviews, mid-quarter pulse, and manager disclosures). AI has identified the top 15 at immediate flight risk.",
    kpis: [
      { label: "Field Sales Team", value: "1,240", sub: "RSO + ASM + TSM · North India" },
      { label: "Attrition (12M)", value: "26.4%", signal: "↑ +8pp vs co. avg", sub: "327 exits · ₹18.4 Cr cost", tone: "critical" },
      { label: "Competitor Offers", value: "47", signal: "↑ Quarter", sub: "ITC + HUL + Dabur poaching", tone: "critical" },
      { label: "At Flight Risk", value: "15", signal: "Immediate", sub: "Comp + career signals", tone: "critical" },
      { label: "Avg Time to Fill", value: "34d", signal: "↑", sub: "Territory coverage gap", tone: "warn" },
      { label: "Training Completion", value: "61%", signal: "↓", sub: "Digital tools adoption low", tone: "down" },
      { label: "Top Performer Retention", value: "72%", signal: "↓", sub: "Top 20% leaving fastest", tone: "down" },
      { label: "Onboarding Success", value: "68%", signal: "↓", sub: "90-day attrition high", tone: "down" },
    ],
    insight: {
      title: "Field Sales — Top Performer Exodus",
      confidence: 88,
      confidenceRange: [85, 91],
      sampleSize: "1,240 RSOs · 12-month cohort",
      window: "Trailing 12 months · refreshed nightly",
      runAt: "04:18",
      agentVersion: "Flight Risk Agent v3.1",
      body: [
        "DS Group is losing its best field sales talent to ITC, HUL, and Dabur at an accelerating rate. North India attrition is 26.4% vs company-wide 18.4%. Top 20% performers are leaving 2.4× faster than average. Primary driver: career ceiling — RSO→ASM promotion rate is 8% vs industry 14%.",
        "Secondary: Digital skills gap making them less competitive as FMCG goes digital-first.",
      ],
      sources: "exit interviews · mid-quarter pulse · manager disclosures · comp data · promotion history · performance data",
      stats: [
        { label: "Annual exits", value: "327" },
        { label: "Annual cost", value: "₹18.4 Cr" },
        { label: "Top performer loss", value: "2.4× rate" },
        { label: "Promotion fix ROI", value: "3.1×" },
      ],
      actions: ["View top 15 at-risk RSOs", "Model retention options"],
    },
    attention: [
      { level: "critical", title: "15 RSOs at immediate flight risk", meta: "Today", detail: "Combined annual sales ₹14.2 Cr at stake", rec: "1:1 conversations with talking points", cta: "View list", when: "Today" },
      { level: "critical", title: "Suresh Yadav — Top 6%, 4yr, never promoted", meta: "Today", detail: "Case study of system failure · 89% flight risk", rec: "Schedule immediate 1:1", cta: "Schedule", when: "Today" },
      { level: "critical", title: "Route optimisation skill gap — 39pp", meta: "48h", detail: "Causing 34% lower call productivity vs competitors", rec: "2-day digital bootcamp", cta: "Plan bootcamp", when: "48h" },
      { level: "warn", title: "RSO→ASM promotion 8% vs industry 14%", meta: "Week", detail: "Career path 36% slower than benchmark", rec: "Accelerate top 15% to ASM in 2.5 years", cta: "Model plan", when: "Week" },
      { level: "warn", title: "Comp gap — Top 20% below market P50", meta: "Week", detail: "Market correction needed for retention", rec: "Comp adjustment for top performers", cta: "Review comp", when: "Week" },
      { level: "good", title: "New joiner onboarding — 12 RSOs Week 2", meta: "Monitor", detail: "Buddy program active · Field shadowing on track", rec: "Continue monitoring", cta: "View", when: "Week" },
    ],
    nav: ["HR Cockpit", "Field Sales Force", "Attrition & Retention", "Career Paths", "Compensation", "Digital Upskilling", "Territory Coverage"],
    quickLinks: [
      { label: "Flight risk list", badge: "15", tone: "critical" },
      { label: "Promotion pipeline", badge: "23 HiPo", tone: "warn" },
      { label: "Bootcamp tracker", badge: "Day 2/14", tone: "good" },
      { label: "Competitor offer log", badge: "47 Q" },
      { label: "Territory rebalance plan", badge: "Draft" },
    ],
    agentRuns: [
      { name: "Flight Risk Agent", what: "Top 15 RSOs scored", time: "03:12" },
      { name: "Comp Benchmark Agent", what: "MNC P50 refreshed", time: "04:18" },
      { name: "Competitor Intel Agent", what: "Poaching signals · ITC/HUL", time: "04:55" },
      { name: "Career Path Agent", what: "RSO→ASM pipeline updated", time: "05:32" },
      { name: "Bootcamp Agent", what: "Digital tools cohort built", time: "06:14" },
    ],
    copilot: [
      "Which RSOs in UP are at highest flight risk this month?",
      "Show me career progression — how many RSOs were promoted to ASM last year?",
      "Generate retention conversation guide for Suresh Yadav",
      "What is the cost of current field sales attrition vs the cost of fixing it?",
    ],
  },


  ananya: {
    id: "ananya",
    initials: "AV",
    name: "Ananya Verma",
    role: "Brand Executive · Catch Spices · DS Group · Noida HQ",
    meta: "2.1 years · IIM Lucknow (2024 batch)",
    agents: 4,
    tasks: 8,
    accent: "gold",
    greeting:
      "Good morning, Ananya. Your Catch Spices Q2 campaign performance is top 20% among brand executives. AI has identified a gap-closing plan for your Brand Manager readiness — and found an internal opportunity that matches your profile exactly.",
    kpis: [
      { label: "Campaign performance", value: "Top 20%", signal: "↑", sub: "Catch Spices Q2 · peer rank", tone: "up" },
      { label: "Brand Manager readiness", value: "58%", signal: "↑ +12pp", sub: "Target 80% for promotion", tone: "up" },
      { label: "Comp vs FMCG market", value: "-14%", signal: "Gap", sub: "vs MNC FMCG Brand Exec P50", tone: "down" },
      { label: "Learning progress", value: "64%", signal: "↑", sub: "Digital marketing · FMCG cert", tone: "up" },
      { label: "Next review", value: "47d", signal: "Upcoming", sub: "Mid-year July cycle" },
      { label: "Internal opportunity", value: "1", signal: "New match", sub: "Found overnight by AI", tone: "up" },
      { label: "Mentor sessions", value: "3/6", signal: "↑", sub: "CMO mentoring programme", tone: "up" },
      { label: "Cross-functional projects", value: "2", signal: "Active", sub: "Digital + Trade marketing" },
    ],
    insight: {
      title: "Your Path to Brand Manager — Accelerated Route",
      confidence: 86,
      confidenceRange: [83, 89],
      sampleSize: "184 Brand Exec peer cohort · 4 FY ladders",
      window: "12-month forward projection",
      runAt: "03:34",
      agentVersion: "Career Path Agent v2.0",
      body: [
        "Your Q2 Catch Spices digital campaign puts you in the top 20% of your peer cohort. The gap to Brand Manager is not performance — it is two skill areas: P&L management exposure and cross-category experience. Both can be addressed in 12 months.",
        "Standard timeline: Jan 2028. Accelerated: Sep 2027.",
      ],
      sources: "performance data · skill graph · career ladder · peer benchmarks · internal opportunities",
      stats: [
        { label: "Promotion readiness", value: "58%" },
        { label: "Gap skills", value: "2" },
        { label: "Standard timeline", value: "Jan 2028" },
        { label: "Accelerated", value: "Sep 2027" },
      ],
      actions: ["View acceleration plan", "See open opportunity"],
    },
    attention: [
      { level: "good", title: "Rajnigandha ASM opportunity — 94% skill fit", meta: "New", detail: "AI Colleague identified this at 3am · ₹180 Cr brand P&L exposure", rec: "Closes both gap skills · 4 months faster to BM", cta: "Express interest", when: "Today" },
      { level: "warn", title: "Comp gap −14% vs MNC FMCG P50", meta: "Mid-year", detail: "Top 30% of IIM brand talent leaves within 3 years over comp", rec: "Request comp discussion in mid-year review", cta: "Prepare ask", when: "47d" },
      { level: "warn", title: "P&L skill gap — biggest blocker to BM", meta: "Week", detail: "Rajnigandha role would close this immediately", rec: "Apply or shadow ASM for 60 days", cta: "Plan path", when: "Week" },
      { level: "good", title: "Mentor session — CMO · Friday 4pm", meta: "Fri", detail: "Topic: Cross-category career moves", rec: "Bring Rajnigandha opportunity to discuss", cta: "Prep notes", when: "Fri" },
      { level: "good", title: "Digital Marketing certification — 64%", meta: "Self-paced", detail: "3 modules left · 8 hours to complete", rec: "Finish before mid-year review", cta: "Continue", when: "47d" },
    ],
    nav: ["My Cockpit", "My Career Path", "My Compensation", "My Learning", "My 1:1s", "My Opportunities", "My Mentor"],
    quickLinks: [
      { label: "Campaign calendar", badge: "Q2", tone: "good" },
      { label: "MNC benchmark", badge: "−14%", tone: "warn" },
      { label: "P&L exposure plan", badge: "Draft" },
      { label: "Internal opps board", badge: "1 new", tone: "good" },
    ],
    agentRuns: [
      { name: "Opportunity Scout", what: "Rajnigandha ASM matched", time: "03:02" },
      { name: "Career Path Agent", what: "BM readiness recomputed", time: "03:34" },
      { name: "Skill Gap Agent", what: "P&L + cross-category flagged", time: "04:11" },
      { name: "Comp Bench Agent", what: "MNC FMCG P50 refreshed", time: "05:06" },
    ],
    copilot: [
      "What is the fastest path from Brand Executive to Brand Manager at DS Group?",
      "How does my compensation compare to IIM batchmates at HUL and ITC?",
      "What does a strong mid-year review look like for brand executives?",
      "Should I apply for the Rajnigandha opportunity — what are the pros and cons?",
    ],
  },


  kavita: {
    id: "kavita",
    initials: "KS",
    name: "Kavita Singh",
    role: "HR Manager · Hospitality & Premium Retail · DS Group",
    meta: "Brands: L'Opera · Le Marche · The Manu Maharani · Namah",
    agents: 5,
    tasks: 11,
    accent: "gold",
    greeting:
      "Good morning, Kavita. Weekend occupancy at Manu Maharani hit 94% — but 3 F&B team members called in sick creating a coverage gap. L'Opera Delhi has 2 chef positions unfilled for 28 days. AI has prepared your Monday operating picture.",
    kpis: [
      { label: "Hospitality Workforce", value: "847", sub: "7 locations · Hotels + Patisserie + Retail" },
      { label: "Weekend Coverage", value: "91%", signal: "↓ -3 sick", sub: "Manu Maharani F&B gap today", tone: "down" },
      { label: "Attrition (12M)", value: "34%", signal: "Industry norm", sub: "Chef + service roles high", tone: "warn" },
      { label: "Open Critical Roles", value: "12", signal: "↑", sub: "Chef × 2 · Sommelier · Mgr × 2", tone: "critical" },
      { label: "Guest Satisfaction", value: "4.6/5", signal: "↑", sub: "Manu Maharani YTD", tone: "up" },
      { label: "Training Compliance", value: "74%", signal: "↓", sub: "FSSAI + Safety annual", tone: "down" },
      { label: "Avg Time to Fill Chef", value: "38d", signal: "↑", sub: "Hospitality market tight", tone: "warn" },
      { label: "Seasonal Readiness", value: "61%", signal: "↓", sub: "Peak season Jun–Aug", tone: "warn" },
    ],
    insight: {
      title: "L'Opera Chef Pipeline — Critical Shortage",
      confidence: 84,
      confidenceRange: [80, 87],
      sampleSize: "7 properties · 847 hospitality staff",
      window: "6-week pre-monsoon window",
      runAt: "04:46",
      agentVersion: "Hospitality Hiring Agent v1.6",
      body: [
        "L'Opera Delhi has 2 Pastry Chef positions unfilled for 28 days. Peak monsoon patisserie demand begins in 6 weeks. At current hiring pace — 0 of 2 positions filled before peak.",
        "Guest experience risk and revenue loss estimated ₹8.4L over peak season.",
      ],
      sources: "hiring pipeline · calendar · revenue data · market availability · hospitality job boards",
      stats: [
        { label: "Revenue risk", value: "₹8.4L" },
        { label: "Positions unfilled", value: "2" },
        { label: "Market talent", value: "Scarce" },
        { label: "Internal options", value: "3 candidates" },
      ],
      actions: ["Expand sourcing now", "Check internal transfers"],
    },
    attention: [
      { level: "critical", title: "Manu Maharani F&B — 3 sick · 94% occupancy", meta: "Today", detail: "Sunday service coverage gap · 2 backup staff available", rec: "Activate backup staff now", cta: "Activate", when: "Today" },
      { level: "critical", title: "L'Opera Delhi — 2 Pastry Chefs · Day 28", meta: "Today", detail: "Peak season 6 weeks · Revenue risk ₹8.4L", rec: "Expand sourcing + explore internal transfer", cta: "Expand", when: "Today" },
      { level: "critical", title: "FSSAI training — 74% · Annual due", meta: "Week", detail: "847 employees · Food safety mandatory", rec: "Auto-nudge 221 pending employees", cta: "Auto-nudge", when: "Week" },
      { level: "warn", title: "Sommelier — Le Marche Gurgaon · Day 19", meta: "3d", detail: "Premium guest experience gap · Weekend traffic high", rec: "Post to specialist boards", cta: "Post", when: "3d" },
      { level: "warn", title: "Seasonal readiness — Jun–Aug peak", meta: "Week", detail: "Housekeeping +22 · F&B +18 · Concierge +8", rec: "Open seasonal requisitions", cta: "Open reqs", when: "Week" },
      { level: "warn", title: "Guest feedback — 3 service complaints", meta: "3d", detail: "Root: understaffing + training in F&B", rec: "Service recovery plan", cta: "View plan", when: "3d" },
      { level: "good", title: "Namah Rishikesh — Full occupancy 3 weekends", meta: "Monitor", detail: "Staffing confirmed · No gaps", rec: "Continue monitoring", cta: "View", when: "Week" },
    ],
    nav: ["HR Cockpit", "Brand Coverage", "Hiring Pipeline", "Seasonal Planning", "Training & Compliance", "Guest Satisfaction Link", "Career Paths"],
    quickLinks: [
      { label: "L'Opera Delhi", badge: "−2 chef", tone: "critical" },
      { label: "Le Marche Gurgaon", badge: "−1 somm", tone: "warn" },
      { label: "Manu Maharani Nainital", badge: "94% occ", tone: "good" },
      { label: "Namah Rishikesh", badge: "Full", tone: "good" },
      { label: "Rota gaps (7d)", badge: "11", tone: "warn" },
      { label: "FSSAI tracker", badge: "221", tone: "critical" },
      { label: "Chef pipeline", badge: "5 active" },
      { label: "Seasonal hiring board", badge: "48 reqs" },
    ],
    agentRuns: [
      { name: "Coverage Agent", what: "Sunday rota recomputed", time: "04:08" },
      { name: "Hiring Agent", what: "L'Opera chef sourcing widened", time: "04:46" },
      { name: "FSSAI Agent", what: "221 pending nudges queued", time: "05:22" },
      { name: "Seasonal Agent", what: "Jun–Aug demand forecast", time: "06:05" },
      { name: "Guest Sentiment Agent", what: "3 complaints clustered", time: "06:51" },
    ],
    copilot: [
      "Find available backup staff for Manu Maharani F&B today",
      "Who are the strongest internal candidates for L'Opera Pastry Chef transfer?",
      "Show me seasonal hiring plan for all hotels June–August",
      "Which hospitality employees are at highest flight risk before peak season?",
    ],
  },

  arjun: {
    id: "arjun",
    initials: "AR",
    name: "Arjun Rawat",
    role: "RSO · Field Sales · Meerut",
    meta: "Day 18 of 90 · Rajnigandha & Catch · Reports to Rahul Sharma (TSM)",
    agents: 5,
    tasks: 4,
    accent: "amber",
    greeting:
      "Namaste Arjun. Aaj 6 stores visit karne hain. Sharma Kirana sabse badi opportunity hai — ₹2,400 potential. 7 orders this month, 15 ka target. Chal shuru karte hain. 🎯",
    kpis: [
      { label: "Aaj ka store target", value: "6", sub: "2 visited · 4 remaining", tone: "warn" },
      { label: "Is mahine ke orders", value: "7", sub: "of 15 target", tone: "warn" },
      { label: "Meri kamai", value: "₹4,800", sub: "projected this month", tone: "up" },
      { label: "Probation countdown", value: "72", sub: "days remaining", tone: "up" },
      { label: "Learning progress", value: "4/6", sub: "2 modules pending", tone: "warn" },
      { label: "Batch ranking", value: "12/38", sub: "top third of batch", tone: "up" },
      { label: "Buddy connect", value: "4 days", sub: "since last contact", tone: "critical" },
      { label: "Badges earned", value: "2", sub: "First 5 Orders unlocked", tone: "up" },
    ],
    insight: {
      title: "Tum sahi raah par ho — ek push aur chahiye",
      confidence: 74,
      sampleSize: "847 RSO cohort records",
      window: "21-day ramp window",
      runAt: "06:30",
      agentVersion: "Performance Nudge Agent v1.2",
      body: [
        "Tumhare batch mein jo RSOs Day 20 tak 8+ orders kar lete hain, unke probation clear karne ke chances 78% zyada hote hain. Abhi tumhare paas 7 orders hain.",
        "Sharma Kirana (Meerut Cantonment, unvisited, ₹2,400 avg order) aur Gupta Provision Store aaj visit karo — dono milake target possible hai.",
      ],
      sources: "order data · batch performance · store pipeline · ramp history",
      stats: [
        { label: "Orders so far", value: "7" },
        { label: "Target by Day 20", value: "8" },
        { label: "Better pass rate", value: "78%" },
        { label: "Sharma potential", value: "₹2,400" },
      ],
      actions: ["Direction Lo", "Helpful tha 👍"],
    },
    attention: [
      {
        level: "critical",
        title: "📄 2 documents missing — salary ruk sakti hai",
        meta: "Open",
        detail: "PF Nomination + Bank Account Copy · Deadline: 10 June",
        rec: "Upload Karo (2 min) →",
        cta: "Upload Karo (2 min) →",
        when: "Today",
      },
      {
        level: "warn",
        title: "🏪 Sharma Kirana — sabse valuable unvisited store",
        meta: "New",
        detail: "Meerut Cantonment · Avg order ₹2,400 · Aaj open 10am–7pm",
        rec: "Direction Lo →",
        cta: "Direction Lo →",
        when: "Today",
      },
      {
        level: "warn",
        title: "🤝 Deepak bhai se 4 din se baat nahi hui",
        meta: "Open",
        detail: "Buddy system important hai probation mein · 5 minute ka call karo",
        rec: "WhatsApp Karo →",
        cta: "WhatsApp Karo →",
        when: "Today",
      },
      {
        level: "good",
        title: "🏅 Badge mila! First 5 Orders — batch mein top 30%",
        meta: "Done",
        detail: "Day 14 par achieve kiya · Share karo DS Group ke RSO Wall of Fame par",
        rec: "Share Karo →",
        cta: "Share Karo →",
        when: "Today",
      },
    ],
    nav: ["Aaj Ka Target", "Mera Route", "Meri Kamai", "Sales Tracker", "Store Scorecard"],
    agentRuns: [
      { name: "Performance Nudge Agent", what: "Sharma Kirana ko top priority banaya", time: "06:30" },
      { name: "Route Optimization Agent", what: "6-store plan optimise kiya · 14 km", time: "06:18" },
      { name: "Earnings Agent", what: "₹4,800 projection refresh", time: "06:05" },
      { name: "Learning Agent", what: "2 pending module reminders", time: "05:48" },
      { name: "Buddy Connect Agent", what: "Reconnect nudge push kiya", time: "05:31" },
    ],
    copilot: [
      "Agar main 15 orders karta hoon toh kitna milega?",
      "Mera probation clear hone ke kitne chances hain?",
      "Sharma Kirana kaise approach karoon — kya pitch karun?",
      "Deepak bhai se kya baat karun — buddy reconnect tips?",
      "DS Group mein RSO se promotion kitne time mein hota hai?",
    ],
  },

};

export const personaList = Object.values(personas);
