import type { Kpi, AttentionItem } from "./data";

export type DrillSection = { title: string; items: string[] };
export type DrillTable = { columns: string[]; rows: (string | number)[][] };
export type DrillMetric = { label: string; value: string; tone?: "up" | "down" | "warn" | "critical" | "default" };

export type DrillData = {
  title: string;
  subtitle?: string;
  summary?: string[];
  metrics?: DrillMetric[];
  table?: DrillTable;
  sections?: DrillSection[];
  recommendations?: string[];
};

// =========================================================================
// KPI drill-downs — keyed by `${persona}:${kpi.label}`
// =========================================================================
const KPI_OVERRIDES: Record<string, Partial<DrillData>> = {
  // ---- Subrat ----
  "subrat:Total Workforce": {
    summary: ["7,700 total · +340 net YTD across 12 locations. Manufacturing is the largest population (1,240) and the slowest growing; Field Sales is the highest churn population."],
    table: {
      columns: ["Business unit", "Headcount", "YoY", "Attrition", "Open roles"],
      rows: [
        ["Manufacturing (Noida + 2)", 1240, "+2.1%", "12.4%", 11],
        ["Field Sales (Pan-India)", 1840, "+4.4%", "31.0%", 24],
        ["Brand & Marketing", 312, "+7.2%", "14.8%", 9],
        ["Hospitality (4 sites)", 847, "+3.8%", "34.2%", 12],
        ["Premium Retail (L'Opera/Le Marche)", 410, "+9.1%", "27.3%", 7],
        ["Corporate / HQ", 982, "+1.4%", "9.6%", 8],
        ["Supply Chain & R&D", 1228, "+3.7%", "11.2%", 12],
        ["Digital / IT", 841, "+11.8%", "16.9%", 4],
      ],
    },
  },
  "subrat:Skills Expiry Risk": {
    summary: [
      "34% of critical skills carry an 18-month expiry trajectory. Manufacturing process and field-sales digital clusters carry 71% of total risk.",
      "Why this is rising: packaging automation, vision-AI QA, route-AI in field sales, and self-serve BI replacing manual coordination work.",
      "Recommendation: launch Reskilling Wave 1 for the 744 highest-risk employees before automation milestones lock in external hiring costs.",
    ],
    table: {
      columns: ["Skill cluster", "Employees", "Expiry window", "Expiry reason", "Replacement source"],
      rows: [
        ["Packaging line manual ops", 540, "12 months", "Packaging automation replacing repetitive line checks", "Automation Q4 2026"],
        ["QA visual inspection", 184, "14 months", "Vision-AI rollout reducing manual defect spotting", "Vision-AI rollout"],
        ["Field route planning (manual)", 612, "9 months", "CRM route intelligence replacing manual beat planning", "Route-AI in CRM"],
        ["Trade-marketing spreadsheets", 281, "18 months", "Self-serve dashboards replacing manual report stitching", "Self-serve BI"],
        ["Pre-press / artwork manual", 96, "10 months", "Generative tooling speeding artwork iteration and QC", "Generative design tools"],
        ["L&D classroom delivery", 74, "16 months", "Adaptive learning shifting delivery from classroom-led to digital", "Adaptive learning platform"],
      ],
    },
    recommendations: [
      "Launch Reskilling Wave 1 (744 employees) before automation goes live Q4 2026.",
      "Re-band 18-month-window cohort into AI-augmented roles before refill cost is incurred.",
    ],
  },
  "subrat:Attrition (12M)": {
    summary: ["Group attrition 18.4% (+2.1pp YoY). Field Sales drives 43% of all exits. Top-quartile performer exit rate is 2.4× average."],
    table: {
      columns: ["Population", "Attrition", "Top-quartile exit", "Primary driver"],
      rows: [
        ["Field Sales RSO", "31.0%", "2.4×", "Career ceiling + comp"],
        ["Manufacturing", "12.4%", "1.1×", "Shift load + heat"],
        ["Hospitality service", "34.2%", "1.6×", "Comp + chef shortage"],
        ["Brand & Marketing", "14.8%", "1.9×", "MNC comp + career"],
        ["Digital / IT", "16.9%", "2.2×", "Compensation"],
        ["Corporate / HQ", "9.6%", "1.0×", "Within band"],
      ],
    },
  },
  "subrat:Open Critical Roles": {
    summary: ["87 open critical roles · 41-day average to fill (industry 28). Brand and Digital concentrations stretching transformation timeline."],
    table: {
      columns: ["Function", "Open", "Avg days open", "Source of blocker"],
      rows: [
        ["Brand Managers", 14, 52, "MNC comp benchmark"],
        ["Digital / Analytics", 19, 48, "Talent supply"],
        ["Supply Chain Leads", 11, 39, "Specialist + location"],
        ["R&D Food Science", 7, 61, "Niche talent"],
        ["Chef & Sommelier", 12, 38, "Hospitality market tight"],
        ["Plant Operations Supervisors", 9, 24, "Internal pipeline weak"],
        ["Sales ASMs", 15, 31, "Promotion cadence"],
      ],
    },
    recommendations: [
      "Unlock external search for the top 20 business-critical roles within 7 days.",
      "Pair Digital and Brand openings with internal fast-track slates to shorten time-to-fill.",
    ],
  },
  "subrat:Transformation Index": {
    summary: ["Composite of 11 People + Process initiatives. 42% vs 65% target by Mar 2027. People-side ahead of Process-side by 9 points."],
    table: {
      columns: ["Initiative", "Progress", "Owner", "Status"],
      rows: [
        ["AI Colleague rollout (HR)", "61%", "CHRO", "On track"],
        ["Skills graph onboarding", "73%", "L&D Head", "On track"],
        ["Field Sales digital CRM", "38%", "Sales VP", "At risk"],
        ["Plant automation Wave 1", "29%", "Mfg Director", "Delayed"],
        ["Career framework refresh", "55%", "TR Head", "On track"],
        ["Psychological safety framework", "44%", "CHRO", "On track"],
        ["Performance system v2", "31%", "TM Head", "At risk"],
        ["Hospitality coverage model", "26%", "Hosp Head", "Delayed"],
        ["Premium retail expansion staffing", "47%", "Hosp Head", "On track"],
        ["Board reporting automation", "82%", "CHRO Office", "On track"],
        ["Diversity hiring (35% women)", "39%", "TA Head", "At risk"],
      ],
    },
    recommendations: [
      "Protect Q3 capacity for Plant Automation Wave 1 and Field Sales CRM.",
      "Escalate the two delayed workstreams into the weekly CHRO transformation review until they return to plan.",
    ],
  },
  "subrat:Engagement Score": {
    summary: ["71/100 group score · ↓4pp YoY. Manufacturing Noida (63) and Plant 2 (59) are dragging the index. Top 2 drivers: workload, manager quality."],
    table: {
      columns: ["Location", "Score", "Trend", "Top driver"],
      rows: [
        ["HQ Noida (Corporate)", 79, "+2", "Recognition"],
        ["Mfg Noida", 63, "-7", "Workload"],
        ["Mfg Plant 2", 59, "-9", "Heat + overtime"],
        ["Mfg Plant 3", 71, "-2", "Manager quality"],
        ["Field Sales North", 68, "-5", "Career ceiling"],
        ["Field Sales West", 73, "-3", "Comp"],
        ["L'Opera Delhi", 75, "+1", "Pride / brand"],
        ["Manu Maharani", 78, "+3", "Guest impact"],
      ],
    },
    sections: [
      {
        title: "Top engagement drivers",
        items: [
          "Workload pressure is the strongest drag in Manufacturing Noida.",
          "Manager quality and coaching consistency are the second-biggest gap in Plant 2 and Plant 3.",
          "Overtime-linked heat stress is amplifying disengagement on the hottest manufacturing lines.",
        ],
      },
    ],
    recommendations: [
      "Start manager coaching in Plant 2 and Manufacturing Noida this month.",
      "Reduce overtime concentration in the hottest lines before the next engagement pulse.",
    ],
  },
  "subrat:Digital Talent Ratio": {
    summary: ["8.2% of group are digital-skilled. Target 15% by 2027 to support FMCG digital-first plays. Brand and Sales are the largest absolute gaps."],
    table: {
      columns: ["Function", "Current", "Target", "Gap (FTE)"],
      rows: [
        ["Brand & Marketing", "29%", "60%", 97],
        ["Field Sales (digital CRM)", "11%", "45%", 624],
        ["Supply Chain analytics", "14%", "35%", 258],
        ["HR (people analytics)", "21%", "50%", 38],
        ["Finance (FP&A automation)", "26%", "55%", 51],
      ],
    },
    recommendations: [
      "Prioritise CRM, analytics and self-serve BI upskilling in Sales and Brand first.",
      "Shift hiring mix toward digital-ready talent in the largest gap functions until internal supply catches up.",
    ],
  },
  "subrat:Succession Coverage": {
    summary: ["58% of critical leadership roles have a ready successor within 24 months. 6 gaps are zero-coverage."],
    table: {
      columns: ["Role", "Successor pool", "Readiness", "Risk"],
      rows: [
        ["BU Head — Mouth Freshener", 0, "—", "Critical"],
        ["BU Head — Confectionery", 1, "24m", "Warn"],
        ["CFO", 0, "—", "Critical"],
        ["Hospitality Head", 1, "12m", "Healthy"],
        ["Brand Head — Catch", 2, "Ready", "Healthy"],
        ["Practice Head — Digital", 0, "—", "Critical"],
        ["Practice Head — Supply Chain", 0, "—", "Critical"],
        ["Plant Director — Noida", 1, "18m", "Warn"],
      ],
    },
  },

  // ---- Ravi ----
  "ravi:Plant Workforce": {
    summary: ["1,240 plant staff across Noida + 2 satellites. 62% permanent, 38% contract. Pulse season pushes contract share to 48% in Jun–Aug."],
    table: {
      columns: ["Site", "Permanent", "Contract", "Brands run"],
      rows: [
        ["Noida main", 540, 280, "Rajnigandha, Pulse"],
        ["Satellite 1 (Greater Noida)", 180, 110, "Catch, Pass Pass"],
        ["Satellite 2 (Sahibabad)", 145, 85, "Pulse seasonal"],
      ],
    },
  },
  "ravi:Today's Attendance": {
    summary: ["89.2% group · Shift B drags 5.4pp below Shift A. Packaging zone 2 driver is heat complaints + overtime."],
    table: {
      columns: ["Shift", "Strength", "Present", "%", "Δ 21d"],
      rows: [
        ["Shift A (06–14)", 412, 391, "94.9%", "+0.3"],
        ["Shift B (14–22)", 408, 357, "87.4%", "-3.1"],
        ["Shift C (22–06)", 187, 168, "89.8%", "-0.6"],
      ],
    },
  },
  "ravi:Active Grievances": {
    summary: ["9 open · 6 from Packaging Zone 2 · median age 4 days. Heat + overtime cluster accounts for 5."],
    table: {
      columns: ["ID", "Zone", "Type", "Days open", "Owner"],
      rows: [
        ["GR-2188", "Pkg Zone 2", "Heat / cooling", 18, "Plant HR"],
        ["GR-2191", "Pkg Zone 2", "Overtime payout", 12, "Payroll"],
        ["GR-2194", "Pkg Zone 2", "Shift rotation", 7, "Shift Mgr"],
        ["GR-2197", "QA line", "PPE supply", 5, "EHS"],
        ["GR-2198", "Pkg Zone 2", "Break window", 4, "Shift Mgr"],
        ["GR-2201", "Maint.", "Tool kit", 3, "Maint Head"],
        ["GR-2203", "Pkg Zone 2", "Cafeteria", 2, "Admin"],
        ["GR-2205", "Pulse line", "Hiring promise", 1, "Plant HR"],
        ["GR-2206", "QA line", "Roster fairness", 1, "Shift Mgr"],
      ],
    },
  },
  "ravi:Compliance Alerts": {
    summary: ["5 alerts · 2 critical due in 4 days (ESIC + Contract Labour return). AI pre-fill complete on both."],
    table: {
      columns: ["Compliance item", "Due", "Status", "AI pre-fill"],
      rows: [
        ["ESIC May filing", "+4d", "Critical", "97%"],
        ["Contract Labour Act half-year return", "+6d", "Critical", "92%"],
        ["Factories Act welfare report", "+11d", "Warn", "88%"],
        ["PF challan generation", "+9d", "On track", "100%"],
        ["EHS quarterly self-audit", "+14d", "On track", "76%"],
      ],
    },
  },
  "ravi:Attrition Risk": {
    summary: ["18 workers in flight-risk band (87% confidence). Packaging Zone 2 and QA carry 14 of 18."],
    table: {
      columns: ["Zone", "At risk", "Avg tenure", "Top signal"],
      rows: [
        ["Packaging Zone 2", 8, "2.4 yrs", "Heat + OT"],
        ["QA line", 6, "3.1 yrs", "Roster fairness"],
        ["Pulse seasonal", 3, "0.6 yrs", "Conversion clarity"],
        ["Maintenance", 1, "5.2 yrs", "Comp"],
      ],
    },
  },
  "ravi:Seasonal Hiring Gap": {
    summary: ["34 worker gap for Pulse peak (Jun–Aug). Temp-agency lead time 3 weeks; act today to hit start date."],
    table: {
      columns: ["Role", "Gap", "Channel", "Lead time"],
      rows: [
        ["Pulse line operator", 22, "Temp agency A", "3 wks"],
        ["Packers", 8, "Temp agency B", "2 wks"],
        ["Forklift drivers", 4, "Direct walk-in", "1 wk"],
      ],
    },
  },
  "ravi:Skill Expiry Risk": {
    summary: ["127 workers' core skills are on automation collision course. Packaging Wave 1 lands Q4 2026."],
    table: {
      columns: ["Skill", "Workers", "Window", "Reskill path"],
      rows: [
        ["Manual sealing", 48, "10 mo", "Line operator + HMI"],
        ["Visual QC", 39, "12 mo", "Vision-AI supervisor"],
        ["Manual palletising", 22, "8 mo", "Forklift / WMS"],
        ["Manual artwork QC", 18, "14 mo", "Pre-press digital"],
      ],
    },
  },
  "ravi:Contract Renewals": {
    summary: ["12 contracts within 30-day renewal window. Letters auto-drafted; need plant-head signature."],
    table: {
      columns: ["Worker", "Role", "Tenure", "Renewal recommended"],
      rows: [
        ["Suresh K.", "Pkg operator", "2.3 yrs", "Yes — high perf"],
        ["Anita M.", "QA inspector", "3.1 yrs", "Yes"],
        ["Rajat S.", "Pulse line", "1.4 yrs", "Yes"],
        ["Naveen P.", "Maintenance", "2.0 yrs", "Convert to perm"],
        ["Pooja R.", "Pkg operator", "0.9 yrs", "Conditional"],
        ["+ 7 more", "—", "—", "Per attached pack"],
      ],
    },
  },

  // ---- Vikram ----
  "vikram:Field Sales Team": {
    summary: ["1,240 RSO/ASM/TSM across 5 North India zones. UP East and Bihar carry highest attrition."],
    table: {
      columns: ["Zone", "RSO", "ASM", "TSM", "Attrition"],
      rows: [
        ["Delhi NCR", 184, 22, 4, "24%"],
        ["UP West", 218, 26, 5, "29%"],
        ["UP East", 246, 28, 5, "36%"],
        ["Bihar", 198, 22, 4, "38%"],
        ["Punjab/Haryana", 162, 20, 4, "27%"],
        ["Uttarakhand/HP", 78, 11, 3, "22%"],
      ],
    },
  },
  "vikram:Attrition (12M)": {
    summary: ["31% rolling 12-month. 384 exits. Top-quartile leaving at 2.4× rate; ITC, HUL, Dabur are receiving destinations."],
    table: {
      columns: ["Destination", "Exits 12M", "Avg tenure lost", "Avg comp uplift offered"],
      rows: [
        ["ITC", 88, "3.6 yrs", "+22%"],
        ["HUL", 71, "3.1 yrs", "+26%"],
        ["Dabur", 54, "2.8 yrs", "+18%"],
        ["Marico", 38, "3.4 yrs", "+19%"],
        ["Local distributors", 49, "1.9 yrs", "+12%"],
        ["Out of industry", 41, "1.1 yrs", "n/a"],
        ["Career break / other", 43, "—", "—"],
      ],
    },
  },
  "vikram:Competitor Offers": {
    summary: ["47 confirmed competitor approaches this quarter. 31 RSOs have multiple offers."],
    table: {
      columns: ["Competitor", "Approaches", "Conversion so far", "Hot territories"],
      rows: [
        ["ITC FMCG", 18, "9", "UP East, Bihar"],
        ["HUL", 14, "6", "Delhi NCR, UP West"],
        ["Dabur", 9, "4", "UP East, UP West"],
        ["Marico", 4, "1", "Punjab"],
        ["Patanjali", 2, "0", "UP East"],
      ],
    },
  },
  "vikram:At Flight Risk": {
    summary: ["15 RSOs cross the 75% flight-risk threshold this week. Combined territory sales ₹14.2 Cr."],
    sections: [
      {
        title: "Top 5 by risk score",
        items: [
          "Suresh Yadav — Lucknow · Top 6% · 4 yr · 89% risk",
          "Mohit Rana — Patna East · Top 9% · 3 yr · 87% risk",
          "Anurag Pant — Kanpur · Top 12% · 2 yr · 84% risk",
          "Deepak Mishra — Varanasi · Top 8% · 5 yr · 82% risk",
          "Rohit Joshi — Meerut · Top 14% · 3 yr · 81% risk",
        ],
      },
    ],
  },
  "vikram:Avg Time to Fill": {
    summary: ["34 days vs 24-day FMCG benchmark. Cost of vacancy = ₹62K per RSO/month in lost route coverage."],
    table: {
      columns: ["Zone", "Days to fill", "Open reqs", "Coverage hit"],
      rows: [
        ["UP East", 41, 11, "8 routes uncovered"],
        ["Bihar", 39, 9, "6 routes uncovered"],
        ["UP West", 32, 7, "4 routes uncovered"],
        ["Delhi NCR", 28, 5, "2 routes uncovered"],
      ],
    },
  },
  "vikram:Training Completion": {
    summary: ["61% completion on the digital CRM + route-AI module. Adoption is the #1 productivity gap vs competitors."],
    table: {
      columns: ["Module", "Completion", "Time-to-productivity uplift"],
      rows: [
        ["Route-AI in CRM", "47%", "+18% calls/day"],
        ["WhatsApp commerce", "58%", "+12% conversion"],
        ["Trade-marketing analytics", "63%", "+9% promo ROI"],
        ["Self-serve dashboards", "71%", "+6 hrs/week"],
      ],
    },
  },
  "vikram:Top Performer Retention": {
    summary: ["Top 20% retention at 72% vs 88% average. Biggest leak: 3-year promotion expectation unmet."],
  },
  "vikram:Onboarding Success": {
    summary: ["90-day attrition at 32%. Buddy program coverage 64%; full coverage cuts 90-day attrition to 19%."],
  },

  // ---- Ananya ----
  "ananya:Campaign performance": {
    summary: ["Catch Spices Q2 ranks #4 of 18 brand-executive campaigns. Strongest on digital reach, weakest on trade-marketing pull-through."],
    table: {
      columns: ["Dimension", "Your campaign", "Peer P50", "Top 20% bar"],
      rows: [
        ["Digital reach", "12.4 M", "8.2 M", "11.0 M"],
        ["Engagement rate", "4.1%", "2.8%", "3.6%"],
        ["Trade pull-through", "1.18×", "1.22×", "1.35×"],
        ["Cost per reach", "₹0.41", "₹0.58", "₹0.46"],
      ],
    },
  },
  "ananya:Brand Manager readiness": {
    summary: ["58% composite readiness · target 80% for BM band. Two gap skills: P&L management exposure, cross-category experience."],
    table: {
      columns: ["Capability", "You", "BM bar", "Gap"],
      rows: [
        ["Campaign leadership", "82", "75", "+7"],
        ["Digital marketing", "78", "70", "+8"],
        ["Consumer research", "71", "75", "-4"],
        ["P&L management", "38", "70", "-32"],
        ["Cross-category exposure", "42", "65", "-23"],
        ["Trade marketing", "61", "65", "-4"],
      ],
    },
  },
  "ananya:Comp vs FMCG market": {
    summary: ["Total cash 14% below MNC FMCG P50 for IIM-batch brand executives at 2-year mark. ESOP-equivalent partly closes gap."],
  },
  "ananya:Learning progress": {
    summary: ["64% on Digital Marketing + FMCG certificate. 3 modules / 8 hrs remaining. Finish before mid-year review."],
  },
  "ananya:Next review": {
    summary: ["47 days to mid-year. Suggested talking points: Catch Q2 result, Rajnigandha P&L exposure plan, comp benchmark ask."],
  },
  "ananya:Internal opportunity": {
    summary: ["1 new fit: Rajnigandha ASM. 94% skill match. Closes both gap skills. Open since 6 days. 3 other interested candidates."],
  },
  "ananya:Mentor sessions": {
    summary: ["3 of 6 CMO mentor sessions completed. Next: Friday 4pm — Cross-category career moves."],
  },
  "ananya:Cross-functional projects": {
    summary: ["2 active: Digital (Catch performance dashboard), Trade marketing (Q3 modern-trade pilot)."],
  },

  // ---- Kavita ----
  "kavita:Hospitality Workforce": {
    summary: ["847 staff across 7 sites. F&B and Kitchen are largest function (43%). Peak season adds 48 seasonal."],
    table: {
      columns: ["Site", "Headcount", "Open", "Attrition"],
      rows: [
        ["Manu Maharani · Nainital", 188, 3, "31%"],
        ["Namah · Rishikesh", 142, 1, "27%"],
        ["L'Opera · Delhi", 121, 2, "38%"],
        ["L'Opera · Gurgaon", 86, 1, "36%"],
        ["L'Opera · Mumbai", 92, 1, "34%"],
        ["Le Marche · Delhi", 138, 2, "29%"],
        ["Le Marche · Gurgaon", 80, 2, "32%"],
      ],
    },
  },
  "kavita:Weekend Coverage": {
    summary: ["91% group coverage · Manu Maharani F&B gap today (3 sick · 94% occupancy). 2 backup staff identified."],
  },
  "kavita:Attrition (12M)": {
    summary: ["34% group attrition · in line with industry norm. Chef + service roles drive 70% of exits."],
  },
  "kavita:Open Critical Roles": {
    summary: ["12 open · 5 critical (2 Pastry Chefs L'Opera Delhi, Sommelier Le Marche Gurgaon, 2 Site Managers)."],
  },
  "kavita:Guest Satisfaction": {
    summary: ["4.6/5 YTD at Manu Maharani · staffing correlation with satisfaction at r=0.74."],
  },
  "kavita:Training Compliance": {
    summary: ["74% FSSAI + Safety completion. 221 pending. Auto-nudge sequence drafted."],
  },
  "kavita:Avg Time to Fill Chef": {
    summary: ["38 days vs 22-day target. Pastry chefs hardest — niche market + Delhi premium."],
  },
  "kavita:Seasonal Readiness": {
    summary: ["61% ready for Jun–Aug peak. Housekeeping +22, F&B +18, Concierge +8 still to be hired."],
  },
};

// =========================================================================
// Action button drill-downs — keyed by `${persona}:${actionLabel}`
// =========================================================================
const ACTION_OVERRIDES: Record<string, DrillData> = {
  "subrat:View skills map": {
    title: "Skills Map — Group view",
    subtitle: "Critical-skills expiry over the next 18 months",
    summary: [
      "2,618 employees sit in an 18-month expiry window across 6 skill clusters.",
      "Wave 1 cohort (744 employees) must be reskilled before automation goes live Q4 2026 to avoid ₹84 Cr revenue impact.",
    ],
    table: {
      columns: ["Cluster", "Headcount", "Expiry", "Reskill path", "Cost / FTE"],
      rows: [
        ["Packaging manual ops", 540, "12 mo", "Line operator + HMI", "₹38K"],
        ["QA visual inspection", 184, "14 mo", "Vision-AI supervisor", "₹52K"],
        ["Field route planning", 612, "9 mo", "Route-AI co-pilot", "₹14K"],
        ["Trade-marketing spreadsheets", 281, "18 mo", "Self-serve BI", "₹22K"],
        ["Pre-press / artwork", 96, "10 mo", "Generative design", "₹46K"],
        ["L&D classroom", 74, "16 mo", "Adaptive learning ops", "₹61K"],
      ],
    },
    recommendations: [
      "Approve Reskilling Wave 1 budget (₹3.4 Cr) for the 744-FTE cohort.",
      "Re-band roles before refill — saves ₹6.1 Cr in external hiring.",
    ],
  },
  "subrat:Launch reskilling programme": {
    title: "Reskilling programme launch — Wave 1",
    subtitle: "744 employees · 4 cohorts · 14-month AI-accelerated path",
    summary: ["Adaptive learning + on-the-job rotation. Each cohort 186 employees, sequenced Q2 → Q4 2026."],
    table: {
      columns: ["Cohort", "Start", "Size", "Path", "Owner"],
      rows: [
        ["Packaging → HMI operator", "Q2-26", 186, "12 weeks blended", "Plant L&D"],
        ["QA → Vision-AI supervisor", "Q2-26", 138, "10 weeks", "QA + L&D"],
        ["Route plan → CRM co-pilot", "Q3-26", 220, "6 weeks digital", "Sales Ops"],
        ["Trade mktg → BI self-serve", "Q4-26", 200, "8 weeks", "Brand Ops"],
      ],
    },
    recommendations: ["Sign off launch in this week's ExCo.", "Track adoption weekly on Transformation Dashboard."],
  },

  "ravi:Schedule welfare checks": {
    title: "Welfare checks — Packaging Zone 2",
    subtitle: "6 high-risk workers · 45-minute structured 1:1",
    summary: ["3-signal cohort: overtime >22 hrs/mo + heat complaints + grievance proximity. Intervention cost ₹18K vs replacement ₹21.6L."],
    table: {
      columns: ["Worker", "Shift", "Tenure", "Risk score", "Slot"],
      rows: [
        ["R. Kumar", "B", "3.4 yr", "91%", "Today 14:30"],
        ["S. Devi", "B", "2.1 yr", "88%", "Today 15:15"],
        ["A. Yadav", "B", "4.0 yr", "87%", "Today 16:00"],
        ["M. Khan", "B", "1.8 yr", "85%", "Tomorrow 14:30"],
        ["P. Singh", "B", "2.7 yr", "83%", "Tomorrow 15:15"],
        ["V. Sharma", "B", "3.2 yr", "82%", "Tomorrow 16:00"],
      ],
    },
    recommendations: ["Use AI-drafted 1:1 talking points pack.", "Move cooling unit decision in parallel (₹92K)."],
  },
  "ravi:View shift details": {
    title: "Shift B — operating picture",
    subtitle: "Packaging line · 21-day window",
    summary: ["Attendance 87.4% (↓3.1pp). OT median 24.6 hrs/mo. Heat complaints 14 of 18 from Zone 2. Grievances 4 in 7 days."],
    table: {
      columns: ["Day", "Attendance", "OT hrs", "Grievances", "Heat complaints"],
      rows: [
        ["Mon", "88.2%", 5.4, 1, 2],
        ["Tue", "86.9%", 6.1, 0, 3],
        ["Wed", "87.0%", 6.8, 1, 4],
        ["Thu", "85.1%", 7.2, 1, 3],
        ["Fri", "88.4%", 5.9, 0, 1],
        ["Sat", "89.0%", 4.7, 1, 1],
      ],
    },
    recommendations: ["Rotate Zone 2 workers off OT for 2 weeks.", "Approve cooling-unit purchase order today."],
  },

  "vikram:View top 15 at-risk RSOs": {
    title: "Top 15 at-risk RSOs",
    subtitle: "Combined territory sales ₹14.2 Cr",
    summary: ["Each row carries a flight-risk score and a triggered 1:1 talking-points pack."],
    table: {
      columns: ["RSO", "Territory", "Tenure", "Perf decile", "Risk"],
      rows: [
        ["Suresh Yadav", "Lucknow", "4.2y", "Top 6%", "89%"],
        ["Mohit Rana", "Patna E", "3.1y", "Top 9%", "87%"],
        ["Anurag Pant", "Kanpur", "2.4y", "Top 12%", "84%"],
        ["Deepak Mishra", "Varanasi", "5.0y", "Top 8%", "82%"],
        ["Rohit Joshi", "Meerut", "3.0y", "Top 14%", "81%"],
        ["Sunil Verma", "Allahabad", "2.6y", "Top 11%", "80%"],
        ["Naveen S.", "Gorakhpur", "1.9y", "Top 15%", "79%"],
        ["Ramesh G.", "Bareilly", "4.4y", "Top 7%", "78%"],
        ["Pankaj T.", "Patna W", "2.1y", "Top 13%", "77%"],
        ["Imran K.", "Lucknow", "3.6y", "Top 18%", "77%"],
        ["Vikas P.", "Gaya", "2.8y", "Top 10%", "76%"],
        ["Amit S.", "Faizabad", "3.3y", "Top 16%", "76%"],
        ["Saurabh M.", "Muzaffarpur", "1.7y", "Top 19%", "75%"],
        ["Hemant J.", "Aligarh", "4.1y", "Top 17%", "75%"],
        ["Kunal D.", "Moradabad", "2.5y", "Top 20%", "75%"],
      ],
    },
    recommendations: ["Schedule structured 1:1s within 5 working days.", "Pair career-path proposal with comp benchmark."],
  },
  "vikram:Model retention options": {
    title: "Retention model — 3 scenarios",
    subtitle: "Cost vs expected saves vs business impact",
    summary: ["AI-modelled three retention bundles using exit-interview drivers + comp benchmark + promotion velocity."],
    table: {
      columns: ["Scenario", "Cost / yr", "Expected retained", "Sales preserved", "Payback"],
      rows: [
        ["A — Career fast-track only", "₹1.8 Cr", "9 of 15", "₹8.5 Cr", "2.5 mo"],
        ["B — Comp correction P50", "₹2.6 Cr", "11 of 15", "₹10.4 Cr", "3.0 mo"],
        ["C — Both + digital upskill", "₹3.4 Cr", "13 of 15", "₹12.3 Cr", "3.3 mo"],
      ],
    },
    recommendations: ["Scenario C recommended — 3.1× ROI · biggest top-quartile retention impact."],
  },

  "ananya:View acceleration plan": {
    title: "Your accelerated path to Brand Manager",
    subtitle: "Sep 2027 vs standard Jan 2028",
    summary: ["Close two gap skills (P&L exposure, cross-category) in 12 months. Three step-stones outlined."],
    table: {
      columns: ["Quarter", "Move", "Closes", "Owner"],
      rows: [
        ["Q3-26", "Rajnigandha ASM stretch / shadow", "P&L gap", "Brand Head"],
        ["Q4-26", "Cross-category project (Pulse)", "Category gap", "CMO"],
        ["Q1-27", "P&L modelling certificate", "P&L gap", "L&D"],
        ["Q2-27", "Mid-year readiness review", "—", "HRBP"],
        ["Q3-27", "Brand Manager assessment", "—", "Brand Head"],
      ],
    },
  },
  "ananya:See open opportunity": {
    title: "Rajnigandha ASM — 94% skill fit",
    subtitle: "₹180 Cr brand · P&L exposure · Posted 6 days ago",
    summary: ["Closes both your gap skills. 3 other interested candidates. Hiring manager: Anand R. (Brand Head)."],
    table: {
      columns: ["Field", "Detail"],
      rows: [
        ["Role", "Assistant Sales Manager — Rajnigandha"],
        ["Band", "M3 (one below BM)"],
        ["Location", "Noida HQ + travel"],
        ["P&L exposure", "₹180 Cr brand"],
        ["Reports to", "Brand Head — Mouth Freshener"],
        ["Application closes", "+9 days"],
      ],
    },
    recommendations: ["Express interest today.", "Discuss with CMO mentor on Friday before applying."],
  },

  "kavita:Expand sourcing now": {
    title: "Expand sourcing — Pastry Chefs · L'Opera Delhi",
    subtitle: "2 positions · 28 days open · ₹8.4L revenue risk",
    summary: ["Activate 3 additional channels in parallel and post premium-band ad copy."],
    table: {
      columns: ["Channel", "Talent fit", "Lead time", "Cost"],
      rows: [
        ["Hospitality job boards (premium)", "High", "2 wk", "₹35K"],
        ["IHM alumni network", "High", "3 wk", "—"],
        ["Specialist recruiter (patisserie)", "Very high", "3 wk", "8.33% CTC"],
        ["LinkedIn premium boost", "Medium", "1 wk", "₹18K"],
      ],
    },
    recommendations: ["Activate all 4 channels today.", "Approve premium-band offer range (₹6–8L)."],
  },
  "kavita:Check internal transfers": {
    title: "Internal transfers — Pastry Chef candidates",
    subtitle: "3 employees match · 1 ready · 2 stretch",
    summary: ["AI-matched against skill graph + tenure + readiness signals."],
    table: {
      columns: ["Employee", "Current role", "Site", "Readiness", "Match"],
      rows: [
        ["A. Mathew", "Sr. Pastry Cook", "L'Opera Mumbai", "Ready", "92%"],
        ["P. Roy", "Pastry Cook", "L'Opera Gurgaon", "Stretch (6 mo)", "78%"],
        ["S. Khan", "Bakery Lead", "Le Marche Delhi", "Stretch (4 mo)", "74%"],
      ],
    },
    recommendations: ["Make offer to A. Mathew with Delhi relocation pack.", "Build 6-month upskill plan for P. Roy as backup."],
  },
};

// =========================================================================
// Copilot answers — keyed by `${persona}:${question}`
// =========================================================================
const COPILOT_ANSWERS: Record<string, DrillData> = {
  "subrat:What are the 3 highest-impact actions for my transformation agenda this week?": {
    title: "AI Colleague · Top 3 actions this week",
    subtitle: "Confidence 88% · sources: Transformation Index, KPIs, attention queue",
    summary: ["Together these move Transformation Index from 42% → 48% by end of quarter."],
    sections: [
      { title: "1 · Approve Reskilling Wave 1 (744 FTE)", items: ["Unblocks Manufacturing automation timeline", "Avoids ₹84 Cr revenue impact", "Owner: Plant L&D + you"] },
      { title: "2 · Field Sales retention bundle (Scenario C)", items: ["Saves 13 of 15 top RSOs", "₹3.4 Cr cost vs ₹12.3 Cr sales preserved", "Owner: Sales VP + Vikram"] },
      { title: "3 · Close 2 zero-coverage succession gaps", items: ["BU Head Mouth Freshener + Practice Head Digital", "External + internal slate ready", "Owner: TA Head"] },
    ],
  },
  "subrat:Show me skills expiry risk by business unit and location": {
    title: "Skills expiry risk · BU × location",
    subtitle: "18-month critical-skills window",
    summary: ["Manufacturing Noida and Field Sales UP East are the two hottest cells."],
    table: {
      columns: ["BU × location", "Employees at risk", "% of population", "Owner"],
      rows: [
        ["Mfg Noida", 540, "44%", "Ravi"],
        ["Mfg Plant 2", 184, "32%", "Plant 2 HR"],
        ["Field Sales UP East", 612, "44%", "Vikram"],
        ["Brand HQ", 96, "31%", "Brand Ops"],
        ["Hospitality F&B", 281, "33%", "Kavita"],
        ["L&D Corporate", 74, "61%", "L&D Head"],
      ],
    },
  },
  "subrat:Which initiatives are most delayed vs business impact?": {
    title: "Delayed initiatives × business impact",
    summary: ["Plant Automation Wave 1 and Field Sales CRM are the two delayed-AND-high-impact items."],
    table: {
      columns: ["Initiative", "Progress", "Impact", "Status"],
      rows: [
        ["Plant automation Wave 1", "29%", "₹84 Cr", "Delayed 4 wks"],
        ["Field Sales digital CRM", "38%", "₹18.4 Cr", "At risk"],
        ["Hospitality coverage model", "26%", "₹8.4L peak", "Delayed 2 wks"],
        ["Performance system v2", "31%", "Indirect", "At risk"],
      ],
    },
  },
  "subrat:Generate my Friday Board People Review draft": {
    title: "Board People Review · auto-draft",
    subtitle: "78% pre-filled · 3 sections need CHRO input",
    sections: [
      { title: "Sections ready", items: ["Workforce snapshot (7,700, +340 YTD)", "Attrition deep-dive", "Skills + reskilling plan", "Engagement signals", "Diversity scorecard"] },
      { title: "Need CHRO input", items: ["Top-3 strategic priorities (your voice)", "Succession ask of the Board", "Comp envelope FY27"] },
    ],
  },
  "subrat:How is psychological safety tracking across our 12 locations?": {
    title: "Psychological safety · 12 locations",
    summary: ["3 of 12 locations are below the 70-threshold. Manufacturing Noida + Plant 2 + Hospitality F&B."],
    table: {
      columns: ["Location", "Score", "Trend", "Status"],
      rows: [
        ["HQ Noida", 78, "+1", "Healthy"],
        ["Mfg Noida", 64, "-6", "Below"],
        ["Mfg Plant 2", 61, "-8", "Below"],
        ["Mfg Plant 3", 72, "-1", "Watch"],
        ["Field Sales N", 70, "-2", "Watch"],
        ["Field Sales W", 74, "-1", "Healthy"],
        ["L'Opera Delhi", 73, "-1", "Healthy"],
        ["L'Opera Gurgaon", 71, "-2", "Watch"],
        ["L'Opera Mumbai", 72, "+1", "Healthy"],
        ["Le Marche", 75, "+2", "Healthy"],
        ["Manu Maharani", 77, "+2", "Healthy"],
        ["Namah", 76, "+1", "Healthy"],
      ],
    },
  },

  "ravi:Who are my top attrition risks on Shift B this week?": {
    title: "Top attrition risks · Shift B · this week",
    summary: ["8 workers cross 80% flight-risk. All in Packaging Zone 2. Welfare-check slots already drafted."],
    table: {
      columns: ["Worker", "Tenure", "Risk", "Top signal", "Action"],
      rows: [
        ["R. Kumar", "3.4y", "91%", "OT + heat", "1:1 today"],
        ["S. Devi", "2.1y", "88%", "Heat", "1:1 today"],
        ["A. Yadav", "4.0y", "87%", "OT", "1:1 today"],
        ["M. Khan", "1.8y", "85%", "Roster", "1:1 tmrw"],
        ["P. Singh", "2.7y", "83%", "Cafeteria", "1:1 tmrw"],
        ["V. Sharma", "3.2y", "82%", "Break", "1:1 tmrw"],
        ["N. Yadav", "1.5y", "81%", "Heat", "Monitor"],
        ["B. Tiwari", "2.9y", "80%", "OT", "Monitor"],
      ],
    },
  },
  "ravi:Generate ESIC May filing pack for 1,240 workers": {
    title: "ESIC May filing pack",
    summary: ["97% records pre-filled · ₹12,84,000 contribution · 4-day window."],
    sections: [
      { title: "Pack contents", items: ["Workers covered: 1,240", "Wage register reconciled", "Contribution challan", "Exception list: 36 records need wage proof", "Auto-attached: medical updates, dependent changes"] },
    ],
    recommendations: ["Review 36 exceptions today.", "E-sign and submit by EOD Thursday."],
  },
  "ravi:Show me hiring plan for Pulse season peak demand": {
    title: "Pulse season hiring plan · Jun–Aug",
    summary: ["34 hires needed by week of 8 June. 3-week temp-agency lead time → activate today."],
    table: {
      columns: ["Role", "Need", "Channel", "Start by"],
      rows: [
        ["Pulse line operator", 22, "Temp agency A", "8 Jun"],
        ["Packers", 8, "Temp agency B", "15 Jun"],
        ["Forklift drivers", 4, "Walk-in drive", "1 Jun"],
      ],
    },
  },
  "ravi:Which workers need reskilling before packaging automation arrives?": {
    title: "Pre-automation reskilling cohort",
    summary: ["127 workers identified. Wave 1 (Packaging → HMI operator) is the first sequence."],
    table: {
      columns: ["From skill", "Workers", "To role", "Window"],
      rows: [
        ["Manual sealing", 48, "HMI line operator", "10 mo"],
        ["Visual QC", 39, "Vision-AI supervisor", "12 mo"],
        ["Manual palletising", 22, "Forklift + WMS", "8 mo"],
        ["Manual artwork QC", 18, "Pre-press digital", "14 mo"],
      ],
    },
  },

  "vikram:Which RSOs in UP are at highest flight risk this month?": {
    title: "UP zone · highest flight risk this month",
    summary: ["11 RSOs cross 80% threshold across UP East + UP West. Sales at stake ₹9.6 Cr."],
    table: {
      columns: ["RSO", "Territory", "Risk", "Signal"],
      rows: [
        ["Suresh Yadav", "Lucknow", "89%", "ITC offer"],
        ["Mohit Rana", "Patna E (border)", "87%", "HUL offer"],
        ["Anurag Pant", "Kanpur", "84%", "No promo 3y"],
        ["Deepak Mishra", "Varanasi", "82%", "Comp gap"],
        ["Rohit Joshi", "Meerut", "81%", "ITC offer"],
        ["Sunil Verma", "Allahabad", "80%", "Career"],
        ["Naveen S.", "Gorakhpur", "79%", "Comp"],
        ["Ramesh G.", "Bareilly", "78%", "Promo"],
      ],
    },
  },
  "vikram:Show me career progression — how many RSOs were promoted to ASM last year?": {
    title: "RSO → ASM promotion rate",
    summary: ["99 of 1,240 RSOs promoted in last 12M = 8.0%. Industry benchmark 14%. Top-quartile promotion rate even lower at 11%."],
    table: {
      columns: ["Zone", "Eligible", "Promoted", "Rate", "Industry"],
      rows: [
        ["Delhi NCR", 38, 5, "13%", "14%"],
        ["UP West", 44, 4, "9%", "14%"],
        ["UP East", 49, 3, "6%", "14%"],
        ["Bihar", 41, 2, "5%", "14%"],
        ["Punjab/Haryana", 31, 4, "13%", "14%"],
      ],
    },
  },
  "vikram:Generate retention conversation guide for Suresh Yadav": {
    title: "1:1 talking-points · Suresh Yadav",
    subtitle: "Lucknow · 4.2y · Top 6% · 89% flight risk",
    sections: [
      { title: "Open with", items: ["Acknowledge 4 years of top-quartile delivery", "Name the ITC approach explicitly · don't dance around it"] },
      { title: "Career", items: ["Offer ASM track in 9 months (vs current ambiguity)", "Stretch project: Lucknow + Kanpur cluster lead for Q3"] },
      { title: "Comp", items: ["Move to P50 of FMCG market · +18%", "Quarterly performance bonus reset"] },
      { title: "Close", items: ["Ask: what would make you say no to the offer?"] },
    ],
  },
  "vikram:What is the cost of current field sales attrition vs the cost of fixing it?": {
    title: "Attrition cost vs fix cost",
    summary: ["Current annual cost of field-sales attrition: ₹18.4 Cr (replacement + ramp + lost coverage). Scenario C fix cost: ₹3.4 Cr · 3.1× ROI."],
    table: {
      columns: ["Item", "Cost", "Notes"],
      rows: [
        ["Replacement hiring", "₹6.2 Cr", "384 exits × avg ₹1.6L"],
        ["Lost coverage / route", "₹4.8 Cr", "Avg 34 days vacant"],
        ["Ramp to productivity", "₹3.1 Cr", "90-day productivity loss"],
        ["Top-perf sales loss", "₹4.3 Cr", "Top quartile delta"],
        ["Total annual cost", "₹18.4 Cr", ""],
        ["Scenario C fix", "₹3.4 Cr", "Comp + career + digital"],
      ],
    },
  },

  "ananya:What is the fastest path from Brand Executive to Brand Manager at DS Group?": {
    title: "Fastest BE → BM path",
    summary: ["Median 3.4 years. Top-quartile 2.6 years. Two enablers: P&L exposure rotation + cross-category move."],
  },
  "ananya:How does my compensation compare to IIM batchmates at HUL and ITC?": {
    title: "Comp benchmark · IIM 2024 batch · 2-yr mark",
    summary: ["You are 14% below MNC FMCG P50 on cash. Variable + ESOP-equivalent reduces gap to 8%."],
    table: {
      columns: ["Company", "Fixed", "Variable", "Total cash"],
      rows: [
        ["DS Group (you)", "₹16.8L", "₹2.4L", "₹19.2L"],
        ["HUL", "₹18.6L", "₹3.6L", "₹22.2L"],
        ["ITC", "₹19.1L", "₹3.1L", "₹22.2L"],
        ["Marico", "₹17.9L", "₹3.0L", "₹20.9L"],
      ],
    },
  },
  "ananya:What does a strong mid-year review look like for brand executives?": {
    title: "Strong mid-year review · template",
    sections: [
      { title: "Bring", items: ["Q2 Catch result vs target", "Top-20% peer rank evidence", "Digital cert progress 64%", "BM gap-skill plan (P&L + cross-category)"] },
      { title: "Ask", items: ["Rajnigandha ASM nomination", "Comp benchmark conversation", "Cross-category mentor extension"] },
    ],
  },
  "ananya:Should I apply for the Rajnigandha opportunity — what are the pros and cons?": {
    title: "Rajnigandha ASM · decision frame",
    summary: ["Recommendation: apply. Closes both gap skills. 4 months faster to BM."],
    sections: [
      { title: "Pros", items: ["94% skill fit", "Closes both BM-blocker skills", "₹180 Cr P&L exposure", "Strong sponsor (Brand Head)"] },
      { title: "Cons", items: ["Lateral on band — no salary jump", "Travel-heavy", "Leaves Catch campaign mid-cycle"] },
    ],
  },

  "kavita:Find available backup staff for Manu Maharani F&B today": {
    title: "Backup F&B staff · Manu Maharani · today",
    summary: ["2 backup staff available, 1 on standby from Namah Rishikesh (90-min drive)."],
    table: {
      columns: ["Name", "Role", "From", "Available", "Cost"],
      rows: [
        ["R. Negi", "F&B Captain", "On-site standby", "Yes", "OT rate"],
        ["S. Bisht", "Server", "On-site standby", "Yes", "OT rate"],
        ["T. Rana", "Server", "Namah Rishikesh", "Yes (drive)", "OT + travel"],
      ],
    },
  },
  "kavita:Who are the strongest internal candidates for L'Opera Pastry Chef transfer?": {
    title: "Internal transfer candidates · Pastry Chef",
    summary: ["3 candidates. A. Mathew (Mumbai) is ready now; 2 others 4–6 months out."],
    table: {
      columns: ["Employee", "Site", "Match", "Readiness"],
      rows: [
        ["A. Mathew", "L'Opera Mumbai", "92%", "Ready"],
        ["P. Roy", "L'Opera Gurgaon", "78%", "6 mo"],
        ["S. Khan", "Le Marche Delhi", "74%", "4 mo"],
      ],
    },
  },
  "kavita:Show me seasonal hiring plan for all hotels June–August": {
    title: "Hospitality seasonal hiring · Jun–Aug",
    summary: ["48 seasonal hires across 7 sites. Manu Maharani + Namah carry largest share."],
    table: {
      columns: ["Site", "Housekeeping", "F&B", "Concierge"],
      rows: [
        ["Manu Maharani", 9, 7, 3],
        ["Namah", 6, 4, 2],
        ["L'Opera Delhi", 2, 3, 1],
        ["L'Opera Gurgaon", 1, 2, 1],
        ["L'Opera Mumbai", 1, 1, 0],
        ["Le Marche Delhi", 2, 1, 1],
        ["Le Marche Gurgaon", 1, 0, 0],
      ],
    },
  },
  "kavita:Which hospitality employees are at highest flight risk before peak season?": {
    title: "Flight risk before peak · hospitality",
    summary: ["11 employees above 75% risk. 7 in chef + service roles · 4 in housekeeping."],
    table: {
      columns: ["Employee", "Role", "Site", "Risk"],
      rows: [
        ["R. Pant", "Sous Chef", "Manu Maharani", "84%"],
        ["S. Joshi", "Captain", "L'Opera Delhi", "82%"],
        ["A. Khan", "Pastry Cook", "L'Opera Gurgaon", "80%"],
        ["M. Negi", "Concierge", "Namah", "78%"],
        ["P. Bisht", "Housekeeper", "Manu Maharani", "77%"],
        ["+ 6 more", "—", "—", ">75%"],
      ],
    },
  },
};

// =========================================================================
// Public helpers
// =========================================================================
export function getKpiDrill(personaId: string, kpi: Kpi): DrillData {
  const o = KPI_OVERRIDES[`${personaId}:${kpi.label}`];
  const base: DrillData = {
    title: kpi.label,
    subtitle: kpi.sub,
    summary: [
      `${kpi.label}: ${kpi.value}${kpi.signal ? " · " + kpi.signal : ""}.`,
      kpi.sub ?? "AI Colleague is tracking this signal continuously.",
    ],
    metrics: [
      { label: "Current", value: kpi.value, tone: kpi.tone },
      ...(kpi.signal ? [{ label: "Signal", value: kpi.signal, tone: kpi.tone }] : []),
    ],
  };
  return { ...base, ...o, title: kpi.label, subtitle: kpi.sub };
}

export function getActionDrill(personaId: string, action: string): DrillData {
  const o = ACTION_OVERRIDES[`${personaId}:${action}`];
  if (o) return o;
  return {
    title: action,
    summary: [`AI Colleague has prepared the working pack for "${action}".`, "Open the recommended workflow to proceed."],
  };
}

export function getAttentionDrill(personaId: string, item: AttentionItem): DrillData {
  return {
    title: item.title,
    subtitle: item.detail,
    summary: [
      item.detail,
      `Recommended next step: ${item.rec}.`,
      `Window: ${item.when}.`,
    ],
    sections: [
      {
        title: "AI-suggested workflow",
        items: [
          `Step 1 · ${item.rec}`,
          "Step 2 · Notify owning manager with talking points pack",
          "Step 3 · Log decision back to cockpit · update status",
        ],
      },
    ],
    recommendations: [
      item.rec,
      "Tag the relevant stakeholder · auto-draft the outreach message",
    ],
  };
}

export function getCopilotAnswer(personaId: string, question: string): DrillData {
  const o = COPILOT_ANSWERS[`${personaId}:${question}`];
  if (o) return o;
  return {
    title: "AI Colleague",
    subtitle: question,
    summary: [
      "Working answer based on workforce graph, performance data, market benchmarks and exit-interview signals.",
      "Open the relevant cockpit module for full drill-down.",
    ],
  };
}
