import {
  ScreenShell,
  PremiumKpi,
  AiInsightBanner,
  Panel,
  HBar,
  LineChart,
  RadarChart,
  useDrill,
} from "../subrat/primitives";
import type { DrillData } from "../drilldowns";

const EYEBROW = "Kavita Singh · Regional Hospitality Operations · North India Premium Experiences";

const COPILOT = [
  "Which locations have highest staffing risk?",
  "Predict festive season shortages",
  "Show guest satisfaction drivers",
  "Recommend workforce optimization",
  "Identify burnout hotspots",
];

// ============================================================
// BRAND COVERAGE (default)
// ============================================================
export function BrandCoverageScreen() {
  const d = useDrill();
  const locationDrill = (loc: string): DrillData => ({
    title: `${loc} — Location Workforce Deep Dive`,
    subtitle: "Shift coverage · guest impact · pipeline · manager effectiveness",
    summary: [
      `${loc} workforce snapshot: coverage, productivity, guest complaints, hiring pipeline, and AI recommendations.`,
    ],
    metrics: [
      { label: "Workforce", value: loc === "Delhi" ? "612" : loc === "Gurgaon" ? "380" : loc === "Jaipur" ? "428" : loc === "Chandigarh" ? "286" : "300" },
      { label: "Guest Sat", value: loc === "Delhi" ? "4.3" : "4.6", tone: loc === "Delhi" ? "warn" : "up" },
      { label: "Coverage", value: loc === "Jaipur" ? "84%" : "92%", tone: loc === "Jaipur" ? "warn" : "up" },
      { label: "Attrition", value: loc === "Delhi" ? "26%" : "19%", tone: "warn" },
    ],
    table: {
      columns: ["Role band", "Headcount", "Coverage", "Top issue"],
      rows: [
        ["F&B service", 180, "88%", "Weekend shortage"],
        ["Housekeeping", 220, "94%", "Training overdue"],
        ["Front office", 84, "91%", "Manager coaching"],
        ["Culinary", 62, "82%", "Open chef roles"],
      ],
    },
    recommendations: [
      "Activate floating support pool for weekend gaps",
      "Accelerate chef pipeline (2 open · 28 days)",
      "Manager coaching for lowest-scoring 3 shift leads",
    ],
  });

  const riskDrill = (r: string): DrillData => ({
    title: `${r} — Hospitality Risk`,
    summary: [`AI-detected ${r.toLowerCase()} pattern with guest impact and recovery plan.`],
    metrics: [
      { label: "Score", value: r === "Attrition" ? "72/100" : "58/100", tone: "warn" },
      { label: "Locations", value: "3", tone: "warn" },
      { label: "Guest impact", value: "−14%", tone: "critical" },
      { label: "Forecast 30d", value: r === "Burnout" ? "↑" : "→", tone: "warn" },
    ],
    recommendations: ["Floating support pool", "Recognition campaign", "Shift rebalance"],
  });

  const actionsDrill: DrillData = {
    title: "Add Actions — Stabilise Hospitality Operations",
    summary: ["AI-recommended actions with predicted guest sat lift, revenue impact, and attrition reduction."],
    table: {
      columns: ["Action", "Guest Sat lift", "Revenue impact", "Stabilisation"],
      rows: [
        ["Accelerate seasonal hiring", "+0.2", "₹84L", "High"],
        ["Rebalance coverage", "+0.3", "₹42L", "High"],
        ["Retention intervention", "+0.1", "₹1.2 Cr", "Medium"],
        ["Guest experience coaching", "+0.4", "₹62L", "Medium"],
        ["Floating support staff", "+0.2", "₹28L", "High"],
      ],
    },
    recommendations: ["Start with coverage rebalance + floating support this week"],
  };

  return (
    <ScreenShell
      title="Hospitality Workforce Intelligence"
      subtitle="AI-powered workforce visibility across premium hospitality, retail, and customer experience operations."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <PremiumKpi label="Active Workforce" value="2,006" delta="↑ +5.1%" sub="Seasonal ramp" tone="up" spark={[1880, 1910, 1940, 1960, 1980, 1995, 2006]} />
        <PremiumKpi label="Guest Satisfaction" value="4.5/5" delta="↓ North dip" sub="Weekly NPS" tone="warn" spark={[4.6, 4.6, 4.5, 4.5, 4.5, 4.5, 4.5]} />
        <PremiumKpi label="Staffing Coverage" value="92%" delta="Weekend gaps" sub="3 sites critical" tone="warn" />
        <PremiumKpi label="Open Roles" value="64" delta="Peak pressure" sub="Chef + service heavy" tone="critical" />
        <PremiumKpi label="Attrition Risk" value="21%" delta="↑ frontline" sub="Customer-facing" tone="critical" />
        <PremiumKpi label="Training Compliance" value="88%" delta="32 overdue" sub="FSSAI + safety" tone="warn" />
        <PremiumKpi label="AI Workforce Alerts" value="14" delta="Active" sub="Immediate action" tone="critical" />
        <PremiumKpi label="Floating pool" value="42" delta="↑ deployable" sub="Cross-location" tone="up" />
      </div>

      <AiInsightBanner
        title="AI detected staffing shortages impacting guest satisfaction in premium hospitality locations."
        description="Weekend staffing gaps and high frontline attrition are driving slower response times and declining guest experience scores."
        confidence={93}
        sources="Guest feedback · Shift data · Workforce schedules · Exit interviews · Staffing coverage"
        onAddActions={() => d.open(actionsDrill)}
        onView={() => d.open(locationDrill("Delhi"))}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Location Coverage Heatmap" sub="Click a location for full deep dive">
          <div className="space-y-2">
            {[
              { loc: "Delhi", cov: 88, tone: "warn" as const, meta: "F&B weekend gap · 3 sick today" },
              { loc: "Gurgaon", cov: 91, tone: "warn" as const, meta: "Sommelier open Day 19" },
              { loc: "Jaipur", cov: 84, tone: "critical" as const, meta: "Wedding season demand spike" },
              { loc: "Chandigarh", cov: 94, tone: "up" as const, meta: "Stable · monitor" },
              { loc: "Lucknow", cov: 92, tone: "up" as const, meta: "Seasonal ramp on track" },
            ].map((l) => (
              <HBar key={l.loc} label={l.loc} value={l.cov} max={100} tone={l.tone} meta={l.meta} onClick={() => d.open(locationDrill(l.loc))} />
            ))}
          </div>
        </Panel>

        <Panel title="Guest Experience Intelligence" sub="Workforce ↔ guest satisfaction correlation">
          <LineChart data={[
            { label: "W1", value: 4.6 },
            { label: "W2", value: 4.6 },
            { label: "W3", value: 4.5 },
            { label: "W4", value: 4.4 },
            { label: "W5", value: 4.5 },
            { label: "W6e", value: 4.5, forecast: true },
            { label: "W7e", value: 4.6, forecast: true },
          ]} />
          <p className="mt-2 text-xs text-muted-foreground">AI: Guest satisfaction drops 14% during understaffed weekend shifts.</p>
        </Panel>

        <Panel title="Hospitality Risk Radar" sub="5-vector operational risk">
          <RadarChart
            axes={[
              { label: "Attrition", value: 72 },
              { label: "Staffing gaps", value: 64 },
              { label: "Training", value: 38 },
              { label: "Guest impact", value: 58 },
              { label: "Burnout", value: 48 },
            ]}
          />
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {["Attrition", "Staffing gaps", "Training", "Guest impact", "Burnout"].map((r) => (
              <button key={r} onClick={() => d.open(riskDrill(r))} className="rounded-md border border-border bg-background px-2 py-1 text-[11px] hover:border-primary">
                {r} →
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Frontline Engagement Intelligence" sub="Burnout · fatigue · recognition">
          <div className="space-y-2">
            <HBar label="Engagement (eNPS)" value={68} max={100} tone="up" meta="↑ recognition campaign helping" />
            <HBar label="Shift fatigue index" value={54} max={100} tone="warn" meta="Weekend cluster flagged" />
            <HBar label="Manager feedback" value={74} max={100} tone="up" />
            <HBar label="Recognition participation" value={42} max={100} tone="warn" meta="Below target — launch nudge" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">AI: 22 burnout-risk employees clustered in Delhi F&B and Jaipur housekeeping.</p>
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// HIRING PIPELINE
// ============================================================
export function HiringPipelineScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Hospitality Hiring Intelligence"
      subtitle="AI-powered seasonal and frontline hiring operations."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <PremiumKpi label="Open Roles" value="64" delta="↑ peak" sub="Across 5 locations" tone="critical" />
        <PremiumKpi label="Avg Time to Hire" value="18d" delta="↓ improving" sub="Frontline" tone="up" />
        <PremiumKpi label="Weekend Risk" value="High" delta="3 sites" sub="Coverage gap" tone="critical" />
        <PremiumKpi label="Seasonal Demand" value="+28%" delta="Festive" sub="Next 60 days" tone="warn" />
        <PremiumKpi label="Offer Acceptance" value="74%" delta="↓ -4pp" sub="Comp parity issue" tone="warn" />
      </div>

      <AiInsightBanner
        title="Festival season staffing demand expected to exceed current hiring capacity by 19%."
        description="Without contract acceleration and cross-location staffing pool, guest satisfaction and revenue at risk during peak Diwali + wedding season."
        confidence={89}
        sources="Pipeline · Historical demand · Offer data · Calendar of events"
        onAddActions={() => d.open({
          title: "Seasonal Hiring Plan",
          recommendations: [
            "Activate 3 temp agency contracts this week",
            "Cross-location staffing pool — Lucknow → Jaipur",
            "Comp adjustment on offers to lift acceptance to 84%",
          ],
        })}
        onView={() => d.open({
          title: "Seasonal Demand Forecast",
          metrics: [
            { label: "Forecast demand", value: "+28%" },
            { label: "Capacity", value: "+9%", tone: "critical" },
            { label: "Gap", value: "19%", tone: "critical" },
            { label: "Revenue risk", value: "₹3.4 Cr" },
          ],
        })}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Seasonal Hiring Forecast" sub="Festival · weekend · event">
          <LineChart data={[
            { label: "Jun", value: 42 },
            { label: "Jul", value: 48 },
            { label: "Aug", value: 56 },
            { label: "Sep", value: 64 },
            { label: "Oct", value: 78, forecast: true },
            { label: "Nov", value: 92, forecast: true },
          ]} />
        </Panel>
        <Panel title="Candidate Pipeline" sub="AI flags: rejection risk · comp mismatch · delays">
          <div className="space-y-2">
            <HBar label="Screening" value={142} max={150} tone="up" meta="92 active" />
            <HBar label="Interviewing" value={68} max={150} tone="default" />
            <HBar label="Offers out" value={34} max={150} tone="warn" meta="9 at rejection risk" />
            <HBar label="Joining" value={22} max={150} tone="up" meta="2 delayed onboarding" />
          </div>
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// SEASONAL PIPELINE
// ============================================================
export function SeasonalPlanningScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Seasonal Workforce Planning"
      subtitle="Diwali · wedding · New Year demand orchestration and temp workforce allocation."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Diwali demand" value="+34%" delta="Oct–Nov" sub="vs baseline" tone="warn" />
        <PremiumKpi label="Wedding season" value="+42%" delta="Nov–Feb" sub="Jaipur peak" tone="critical" />
        <PremiumKpi label="New Year" value="+28%" delta="Dec 26–Jan 2" sub="All hotels" tone="warn" />
        <PremiumKpi label="Temp pool size" value="142" delta="↑ ramping" sub="Target 220" tone="up" />
      </div>

      <Panel title="AI Recommendations" sub="Seasonal staffing playbook">
        <ul className="space-y-1.5 text-sm">
          <li>• Contract hiring acceleration — 3 agencies activated, target +78 hires by Oct</li>
          <li>• Cross-location staffing — 24 from Lucknow / Chandigarh to Jaipur wedding peak</li>
          <li>• Flexible workforce pool — onboard 40 part-time service staff for Dec window</li>
          <li>• Pre-trained pool — keep 30 trained-ready candidates for surge call-up</li>
        </ul>
      </Panel>

      <Panel title="Season Demand by Location" sub="Click for site-level plan">
        <div className="space-y-2">
          {[
            { loc: "Jaipur (Wedding)", v: 42, tone: "critical" as const },
            { loc: "Delhi (Diwali)", v: 34, tone: "warn" as const },
            { loc: "Gurgaon (Year-end)", v: 28, tone: "warn" as const },
            { loc: "Lucknow (Wedding)", v: 26, tone: "warn" as const },
            { loc: "Chandigarh (NY)", v: 22, tone: "default" as const },
          ].map((l) => (
            <HBar key={l.loc} label={l.loc} value={l.v} max={50} tone={l.tone} meta={`+${l.v}% headcount needed`} onClick={() => d.open({
              title: `${l.loc} — Seasonal Plan`,
              recommendations: ["Pre-book agency capacity", "Confirm cross-location moves", "Lock training calendar"],
            })} />
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// TRAINING & COMPLIANCE
// ============================================================
export function TrainingComplianceScreen() {
  const d = useDrill();
  const trainDrill = (t: string): DrillData => ({
    title: `${t} — Training Status`,
    summary: ["Learning status, team completion, AI recommendations, and guest experience impact."],
    metrics: [
      { label: "Completion", value: "74%", tone: "warn" },
      { label: "Overdue", value: "32", tone: "critical" },
      { label: "Guest impact", value: "Medium" },
      { label: "Compliance", value: "Audit due Q3" },
    ],
    recommendations: ["Auto-nudge overdue", "Manager-led micro-sessions", "Refresher webinar this week"],
  });
  return (
    <ScreenShell
      title="Hospitality Learning & Compliance Intelligence"
      subtitle="Customer service · food safety · guest handling · compliance readiness."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Overall Compliance" value="88%" delta="32 overdue" sub="All certifications" tone="warn" />
        <PremiumKpi label="FSSAI" value="91%" delta="On track" sub="Food safety" tone="up" />
        <PremiumKpi label="Service training" value="78%" delta="↓ slipping" sub="Customer handling" tone="warn" />
        <PremiumKpi label="Manager coaching" value="62%" delta="Action" sub="6 managers flagged" tone="critical" />
      </div>

      <Panel title="AI detects" sub="Compliance + learning intelligence">
        <ul className="space-y-1.5 text-sm">
          <li>• Service quality risk in Delhi F&B — 18 overdue customer-handling certs</li>
          <li>• 6 managers need coaching certification — guest complaint hotspots correlate</li>
          <li>• FSSAI re-cert window opens Sep — start nudge campaign now</li>
        </ul>
      </Panel>

      <Panel title="Training Programs" sub="Click for completion + guest impact">
        <div className="space-y-2">
          {[
            "Customer Service Excellence",
            "Food Safety & FSSAI",
            "Guest Handling — Premium",
            "Manager Coaching Certification",
            "Crisis & Service Recovery",
          ].map((t) => (
            <button
              key={t}
              onClick={() => d.open(trainDrill(t))}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5"
            >
              <span className="text-sm font-semibold">{t}</span>
              <span className="text-[11px] text-muted-foreground">View →</span>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// GUEST SATISFACTION LINKS
// ============================================================
export function GuestSatisfactionScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Guest Experience & Workforce Intelligence"
      subtitle="Workforce ↔ guest satisfaction correlation across all locations."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Guest Sat" value="4.5" delta="↓ -0.1" sub="Last 30 days" tone="warn" />
        <PremiumKpi label="Response time" value="6.2 min" delta="↑ slow" sub="Service requests" tone="warn" />
        <PremiumKpi label="Service rating" value="4.4" delta="Stable" sub="Frontline interactions" tone="default" />
        <PremiumKpi label="Escalations" value="18" delta="↑ +4" sub="This week" tone="critical" />
      </div>

      <AiInsightBanner
        title="Locations with high frontline turnover show 22% lower guest satisfaction scores."
        description="Stabilising attrition in Delhi F&B and Jaipur housekeeping would lift guest sat by 0.3 points within 60 days."
        confidence={90}
        sources="Exit interviews · Guest feedback · Shift logs · Manager 1:1s"
        onAddActions={() => d.open({
          title: "Workforce Stabilisation Plan",
          recommendations: ["Retention intervention for top 30 at-risk frontline", "Floating support pool", "Service recovery training"],
        })}
        onView={() => d.open({
          title: "Guest Sat Correlation Analysis",
          metrics: [
            { label: "Correlation r", value: "0.78", tone: "warn" },
            { label: "Lag", value: "21 days" },
            { label: "Recoverable lift", value: "+0.3", tone: "up" },
            { label: "Timeline", value: "60 days" },
          ],
        })}
      />

      <Panel title="Location Guest Sat vs Workforce Stability" sub="Click for full diagnostic">
        <div className="space-y-2">
          {[
            { loc: "Delhi", sat: 4.3, turn: 26, tone: "critical" as const },
            { loc: "Gurgaon", sat: 4.5, turn: 19, tone: "warn" as const },
            { loc: "Jaipur", sat: 4.4, turn: 24, tone: "warn" as const },
            { loc: "Chandigarh", sat: 4.7, turn: 14, tone: "up" as const },
            { loc: "Lucknow", sat: 4.6, turn: 16, tone: "up" as const },
          ].map((l) => (
            <button
              key={l.loc}
              onClick={() => d.open({
                title: `${l.loc} — Experience Diagnostic`,
                metrics: [
                  { label: "Guest Sat", value: String(l.sat), tone: l.tone },
                  { label: "Turnover", value: `${l.turn}%`, tone: l.tone },
                  { label: "Complaints", value: "12" },
                  { label: "Manager NPS", value: "62" },
                ],
                recommendations: ["Stabilise frontline", "Manager coaching", "Service recovery cohort"],
              })}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5"
            >
              <div>
                <div className="text-sm font-semibold">{l.loc}</div>
                <div className="text-[11px] text-muted-foreground">Guest Sat {l.sat} · Turnover {l.turn}%</div>
              </div>
              <span className="text-[11px] text-muted-foreground">Diagnose →</span>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// CAREER PATHS
// ============================================================
export function HospitalityCareerScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Hospitality Career Growth Intelligence"
      subtitle="Frontline → Supervisor → Operations Manager pathways with AI leadership readiness."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Active career plans" value="184" delta="↑ +28" sub="Across locations" tone="up" />
        <PremiumKpi label="Internal mobility" value="22%" delta="↑ healthy" sub="12-month roll-up" tone="up" />
        <PremiumKpi label="Leadership ready" value="38" delta="↑ HiPo cohort" sub="Supervisor → Mgr" tone="up" />
        <PremiumKpi label="Coaching coverage" value="74%" delta="Gap in Jaipur" sub="Manager-led" tone="warn" />
      </div>

      <Panel title="Career Pathway Funnel" sub="Frontline → Operations Manager">
        <div className="space-y-2">
          <HBar label="Frontline (eligible)" value={420} max={500} tone="up" meta="420 of 480 enrolled" />
          <HBar label="Shift Lead candidates" value={186} max={500} tone="up" meta="Ready: 92" />
          <HBar label="Supervisor candidates" value={84} max={500} tone="default" meta="Ready: 38" />
          <HBar label="Operations Mgr candidates" value={22} max={500} tone="warn" meta="Ready: 6" />
        </div>
      </Panel>

      <Panel title="AI Recommendations" sub="Leadership growth playbook">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            { t: "Launch Leadership Development cohort", s: "38 ready candidates · 9-month programme" },
            { t: "Cross-location exposure rotations", s: "Build operational depth across 5 sites" },
            { t: "Guest excellence coaching", s: "Pair top supervisors with VP Operations" },
            { t: "Manager certification ramp", s: "Close coaching coverage gap in Jaipur" },
          ].map((r) => (
            <button key={r.t} onClick={() => d.open({ title: r.t, summary: [r.s], recommendations: ["Plan kickoff this quarter", "Assign accountable owner", "Track monthly progress"] })} className="rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5">
              <div className="text-sm font-semibold">{r.t}</div>
              <div className="text-[11px] text-muted-foreground">{r.s}</div>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}
