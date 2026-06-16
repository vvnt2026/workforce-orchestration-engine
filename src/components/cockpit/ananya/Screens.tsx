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

const EYEBROW = "Ananya Verma · Management Trainee · Corporate Strategy · Mumbai";

const COPILOT = [
  "What should I do to accelerate promotion?",
  "Which leadership skills should I improve?",
  "Recommend best-fit internal roles",
  "How competitive is my compensation?",
  "Which projects improve visibility?",
];

// ============================================================
// MY CAREER PATH (default)
// ============================================================
export function CareerPathScreen() {
  const d = useDrill();

  const roleDrill = (role: string): DrillData => ({
    title: `${role} — Role Intelligence`,
    subtitle: "AI readiness, comp benchmark, and open positions",
    summary: [
      `Required capabilities, internal openings, leadership expectations, and AI-projected readiness for ${role}.`,
    ],
    metrics: [
      { label: "AI Readiness", value: role.includes("Strategy") ? "74%" : "62%", tone: "up" },
      { label: "Open positions", value: role.includes("Brand") ? "2" : "1", tone: "up" },
      { label: "Comp band", value: role.includes("Manager") ? "₹28–34L" : "₹24–30L" },
      { label: "Time-to-ready", value: "9–14 months", tone: "warn" },
    ],
    table: {
      columns: ["Capability", "Current", "Target", "Gap"],
      rows: [
        ["Strategic thinking", "Strong", "Strong", "0"],
        ["P&L exposure", "Limited", "Working", "Medium"],
        ["Cross-functional influence", "Working", "Strong", "Low"],
        ["Advanced analytics", "Basic", "Working", "Medium"],
      ],
    },
    recommendations: [
      "Shadow a Brand Manager for 60 days for P&L exposure",
      "Lead 1 cross-functional digital initiative this quarter",
      "Complete Data-Driven Decision Making cert (8 weeks)",
    ],
  });

  const riskDrill = (risk: string): DrillData => ({
    title: `${risk} — Growth Risk Analysis`,
    summary: [`AI-detected ${risk.toLowerCase()} pattern with root cause and recommended interventions.`],
    metrics: [
      { label: "Severity", value: risk === "Visibility risk" ? "Medium" : "Low", tone: "warn" },
      { label: "Promotion impact", value: "−3 months", tone: "warn" },
      { label: "Peer benchmark", value: "Behind 18%" },
      { label: "Forecast 90d", value: "Improving", tone: "up" },
    ],
    recommendations: [
      "Volunteer for Q3 executive review presentation",
      "Co-author a leadership POV with mentor",
      "Quarterly skip-level with CSO",
    ],
  });

  const actionsDrill: DrillData = {
    title: "Add Actions — Accelerate Your Growth",
    subtitle: "AI-recommended next steps with predicted impact",
    summary: ["Each action is scored on promotion acceleration, skill impact, leadership readiness, and visibility."],
    table: {
      columns: ["Action", "Promotion lift", "Skill impact", "Visibility"],
      rows: [
        ["Enroll in Leadership Accelerator", "+4 months", "High", "High"],
        ["Assign senior mentor", "+2 months", "Medium", "Medium"],
        ["Cross-functional digital project", "+3 months", "High", "High"],
        ["Succession readiness plan", "+5 months", "High", "Executive"],
        ["Manager career discussion", "+1 month", "Low", "Direct"],
      ],
    },
    recommendations: [
      "Combine Leadership Accelerator + cross-functional project for fastest path",
      "Schedule succession readiness discussion with CSO this quarter",
    ],
  };

  return (
    <ScreenShell
      title="My Career Growth Intelligence"
      subtitle="AI-powered visibility into your future growth, leadership readiness, and career opportunities."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <PremiumKpi
          label="Career Readiness"
          value="74%"
          delta="↑ +8% / 6M"
          sub="On accelerated track"
          tone="up"
          spark={[58, 62, 65, 68, 70, 72, 74]}
          ai="You are 71% ready for Brand Manager. Two gaps remain: cross-category campaign ownership and P&L exposure. One internal project this quarter could close both."
        />
        <PremiumKpi label="Promotion Potential" value="High" delta="Leadership pipeline" sub="Eligible for HiPo cohort" tone="up" />
        <PremiumKpi
          label="Internal Matches"
          value="6"
          delta="2 high-fit"
          sub="Refreshed today"
          tone="up"
          ai="1 internal role matches your profile exactly — Associate Brand Manager, Pulse & Confectionery, Noida HQ. Application window closes in 8 days. Subrat's team has flagged you as a HiPo candidate."
        />
        <PremiumKpi label="Learning Progress" value="68%" delta="↑ ahead of peers" sub="3 active pathways" tone="up" spark={[42, 48, 54, 58, 62, 65, 68]} />
        <PremiumKpi label="Leadership Potential" value="Top 12%" delta="Future leader cohort" sub="9-box: top-right" tone="up" />
        <PremiumKpi label="Manager Feedback" value="4.4/5" delta="↑ collaboration" sub="Last 4 reviews avg" tone="up" />
        <PremiumKpi label="Skill Gap Risk" value="Low" delta="1 gap: analytics" sub="Closable in 8 weeks" tone="up" />
        <PremiumKpi label="Visibility Score" value="72" delta="↑ improving" sub="Cross-BU exposure" tone="up" spark={[58, 60, 62, 65, 68, 70, 72]} />
      </div>

      <AiInsightBanner
        title="AI detected strong leadership readiness and accelerated growth potential."
        description="Your strategic thinking, cross-functional collaboration, and learning agility place you in the top leadership pipeline segment for future business managers."
        confidence={91}
        sources="Performance reviews · Learning data · 1:1 sentiment · Collaboration analytics"
        onAddActions={() => d.open(actionsDrill)}
        onView={() => d.open(roleDrill("Business Strategy Manager"))}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Career Path Visualizer" sub="Possible next roles · AI fit + timeline + comp">
          <div className="space-y-2">
            {[
              { role: "Business Strategy Manager", fit: 89, time: "9–12 mo", comp: "₹28–34L" },
              { role: "Brand Innovation Lead", fit: 84, time: "12–15 mo", comp: "₹26–32L" },
              { role: "Digital Transformation Manager", fit: 82, time: "10–14 mo", comp: "₹27–33L" },
              { role: "Category Excellence Lead", fit: 76, time: "14–18 mo", comp: "₹25–30L" },
            ].map((r) => (
              <button
                key={r.role}
                onClick={() => d.open(roleDrill(r.role))}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5"
              >
                <div>
                  <div className="text-sm font-semibold">{r.role}</div>
                  <div className="text-[11px] text-muted-foreground">{r.time} · {r.comp}</div>
                </div>
                <span className="rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary">{r.fit}% fit</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Leadership Readiness Radar" sub="Strategic capability profile vs cohort">
          <RadarChart
            axes={[
              { label: "Executive presence", value: 72 },
              { label: "Strategic thinking", value: 84 },
              { label: "Collaboration", value: 88 },
              { label: "Learning agility", value: 82 },
              { label: "Influence", value: 68 },
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground">AI: Leadership readiness rose 14pp after cross-functional initiative exposure.</p>
        </Panel>

        <Panel title="Internal Opportunities" sub="AI-matched · ranked by fit">
          <div className="space-y-2">
            {[
              { name: "Business Strategy — Office of CSO", fit: 89, type: "Role" },
              { name: "Digital Innovation Project — D2C", fit: 84, type: "Stretch" },
              { name: "Brand Analytics rotation — Catch", fit: 82, type: "Rotation" },
              { name: "Transformation Cohort 2026", fit: 78, type: "Programme" },
            ].map((o) => (
              <button
                key={o.name}
                onClick={() => d.open({
                  title: o.name,
                  summary: [`Role overview, readiness gaps, recommended preparation, and hiring manager expectations.`],
                  metrics: [
                    { label: "AI Fit", value: `${o.fit}%`, tone: "up" },
                    { label: "Type", value: o.type },
                    { label: "Duration", value: o.type === "Role" ? "Permanent" : "4–6 months" },
                    { label: "Visibility", value: "Executive", tone: "up" },
                  ],
                  recommendations: ["Express interest within 7 days", "Prep 2-page POV on the opportunity", "Loop in mentor for endorsement"],
                })}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5"
              >
                <div>
                  <div className="text-sm font-semibold">{o.name}</div>
                  <div className="text-[11px] text-muted-foreground">{o.type}</div>
                </div>
                <span className="rounded-full bg-success/15 px-2 py-1 text-[11px] font-semibold text-success">{o.fit}%</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Growth Risk Radar" sub="Early-warning signals for career trajectory">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Skill stagnation", v: 22, tone: "up" as const },
              { label: "Visibility risk", v: 48, tone: "warn" as const },
              { label: "Promotion delay", v: 28, tone: "up" as const },
              { label: "Learning gaps", v: 34, tone: "up" as const },
              { label: "Career plateau", v: 18, tone: "up" as const },
            ].map((r) => (
              <HBar key={r.label} label={r.label} value={r.v} max={100} tone={r.tone} onClick={() => d.open(riskDrill(r.label))} />
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Skill Gaps to Brand Manager" sub="AI-detected · ranked by promotion impact · click for closure plan">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Skill</th>
                <th>Current</th>
                <th>Target (BM)</th>
                <th>Gap</th>
                <th>Promotion impact</th>
                <th>Close in</th>
                <th>How</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: "P&L management", c: "Limited", t: "Working", gap: "High", impact: "+4 months", time: "60d", how: "Shadow Rajnigandha ASM" },
                { s: "Cross-category experience", c: "Catch only", t: "2+ categories", gap: "High", impact: "+3 months", time: "90d", how: "Rotation — Pulse Mints" },
                { s: "Trade marketing depth", c: "Basic", t: "Working", gap: "Medium", impact: "+2 months", time: "45d", how: "TM project lead Q3" },
                { s: "Advanced analytics", c: "Basic", t: "Working", gap: "Medium", impact: "+1.5 months", time: "8 wks", how: "Data-Driven Decisions cert" },
                { s: "Digital marketing", c: "Strong", t: "Strong", gap: "Closed ✓", impact: "—", time: "—", how: "Continue Q2 campaigns" },
                { s: "Stakeholder influence", c: "Working", t: "Strong", gap: "Low", impact: "+1 month", time: "Ongoing", how: "Skip-level + CMO mentor" },
              ].map((row) => {
                const tone =
                  row.gap === "High"
                    ? "bg-destructive/15 text-destructive"
                    : row.gap === "Medium"
                    ? "bg-warning/15 text-warning"
                    : row.gap === "Low"
                    ? "bg-primary/15 text-primary"
                    : "bg-success/15 text-success";
                return (
                  <tr
                    key={row.s}
                    className="cursor-pointer border-t border-border hover:bg-muted/40"
                    onClick={() =>
                      d.open({
                        title: `${row.s} — Closure plan`,
                        summary: [`AI-recommended 12-week plan to close the ${row.s.toLowerCase()} gap to Brand Manager readiness.`],
                        metrics: [
                          { label: "Current", value: row.c },
                          { label: "Target", value: row.t },
                          { label: "Gap", value: row.gap, tone: row.gap === "High" ? "critical" : row.gap === "Medium" ? "warn" : "up" },
                          { label: "Promotion lift", value: row.impact, tone: "up" },
                        ],
                        recommendations: [row.how, "Pair with CMO mentor for monthly review", "Log evidence in your readiness portfolio"],
                      })
                    }
                  >
                    <td className="py-2.5 font-medium">{row.s}</td>
                    <td className="text-xs text-muted-foreground">{row.c}</td>
                    <td className="text-xs">{row.t}</td>
                    <td>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone}`}>{row.gap}</span>
                    </td>
                    <td className="text-xs text-success">{row.impact}</td>
                    <td className="font-mono text-[11px] text-muted-foreground">{row.time}</td>
                    <td className="text-xs text-muted-foreground">{row.how}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Total gap to BM</div>
            <div className="font-display text-xl font-semibold">2 high · 2 medium</div>
            <div className="text-[11px] text-muted-foreground">Down from 4 high · 6M ago</div>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">If all closed</div>
            <div className="font-display text-xl font-semibold text-success">Sep 2027</div>
            <div className="text-[11px] text-muted-foreground">vs standard Jan 2028 · −4 months</div>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Highest-ROI next step</div>
            <div className="font-display text-xl font-semibold text-primary">Rajnigandha ASM</div>
            <div className="text-[11px] text-muted-foreground">Closes 2 high gaps at once</div>
          </div>
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}


// ============================================================
// MY COMPENSATION
// ============================================================
export function MyCompensationScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Compensation & Growth Intelligence"
      subtitle="Transparent AI-powered compensation and career value visibility."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <PremiumKpi label="Current CTC" value="₹18.4L" sub="FY26 base + variable" tone="up" />
        <PremiumKpi label="Market Percentile" value="P82" delta="↑ above market" sub="MT cohort · BFSI+FMCG" tone="up" />
        <PremiumKpi label="Variable Payout" value="108%" delta="Q4 target hit" sub="Of target bonus" tone="up" />
        <PremiumKpi label="Growth YoY" value="+14%" delta="Above peer" sub="Total comp" tone="up" spark={[12, 12, 13, 13, 14, 14, 14]} />
        <PremiumKpi label="Promotion Lift" value="+22%" delta="Projected" sub="On Strategy Mgr move" tone="up" />
      </div>

      <AiInsightBanner
        title="Your compensation growth trajectory is above peer benchmark."
        description="High leadership potential and strong business impact have driven faster-than-cohort growth. Next promotion projected to lift total comp by 22%."
        confidence={87}
        sources="Compensation history · Market benchmarks · Performance data · Peer cohort"
        onAddActions={() => d.open({
          title: "Maximise Compensation Trajectory",
          summary: ["AI-recommended moves to accelerate compensation and value."],
          recommendations: [
            "Target Strategy Mgr role for +22% comp lift",
            "Lead high-impact project for differentiated bonus",
            "Negotiate ESOP allocation in next review cycle",
          ],
        })}
        onView={() => d.open({
          title: "Compensation Deep Dive",
          metrics: [
            { label: "Base", value: "₹14.2L" },
            { label: "Variable", value: "₹3.4L", tone: "up" },
            { label: "Benefits", value: "₹0.8L" },
            { label: "Total", value: "₹18.4L", tone: "up" },
          ],
        })}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Compensation History" sub="3-year trajectory">
          <LineChart data={[
            { label: "FY24", value: 14.2 },
            { label: "FY25", value: 16.1 },
            { label: "FY26", value: 18.4 },
            { label: "FY27e", value: 22.4, forecast: true },
            { label: "FY28e", value: 26.8, forecast: true },
          ]} />
        </Panel>
        <Panel title="Benchmark vs Peer Cohort" sub="MT batch · IIM 2024">
          <div className="space-y-2">
            <HBar label="You" value={82} max={100} tone="up" meta="P82 of cohort" />
            <HBar label="MNC FMCG (HUL/ITC)" value={78} max={100} tone="default" />
            <HBar label="Consulting (BCG/Bain)" value={91} max={100} tone="warn" meta="Above DSG band" />
            <HBar label="MT Cohort median" value={62} max={100} tone="default" />
          </div>
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// MY LEARNING
// ============================================================
export function MyLearningScreen() {
  const d = useDrill();
  const courseDrill = (name: string): DrillData => ({
    title: name,
    subtitle: "Weekly plan · career impact · leadership value",
    summary: [`Personalised weekly learning plan for ${name}. AI maps modules to your active capability gaps.`],
    metrics: [
      { label: "Duration", value: "8 weeks" },
      { label: "Effort", value: "3 hrs/wk" },
      { label: "Promotion impact", value: "High", tone: "up" },
      { label: "Skill lift", value: "+18%", tone: "up" },
    ],
    table: {
      columns: ["Week", "Module", "Outcome"],
      rows: [
        [1, "Foundations", "Frameworks + cases"],
        [2, "Applied lab", "DSG dataset project"],
        [4, "Capstone scoping", "Manager-reviewed brief"],
        [8, "Capstone present", "Executive review"],
      ],
    },
    recommendations: ["Block 3 hrs / week on calendar", "Pair with mentor for capstone review"],
  });

  return (
    <ScreenShell
      title="Learning & Future Skills Intelligence"
      subtitle="AI-curated learning pathways aligned to your leadership trajectory."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <PremiumKpi label="Active Pathways" value="3" sub="Leadership + analytics" tone="up" />
          <PremiumKpi
            label="Completion"
            value="68%"
            delta="↑ ahead of peers"
            sub="vs cohort 54%"
            tone="up"
            spark={[42, 48, 54, 58, 62, 65, 68]}
            ai="2 modules pending this month — Digital Analytics and Consumer Insights. Completing both adds 12 points to your Brand Manager readiness score and unlocks the fast-track review track."
          />
          <PremiumKpi label="Certifications" value="4" delta="+1 this Q" sub="2 in progress" tone="up" />
          <PremiumKpi label="Skill Lift" value="+22%" delta="Last 6M" sub="Composite score" tone="up" />
      </div>

      <Panel title="AI detects" sub="Active learning intelligence">
        <ul className="space-y-1.5 text-sm">
          <li>• Strong strategic capability — push toward executive-level POVs</li>
          <li>• Need advanced analytics exposure — biggest gap to BM role</li>
          <li>• Cross-functional learning opportunity in D2C / Digital</li>
        </ul>
      </Panel>

      <Panel title="AI-Recommended Courses" sub="Click any course for the weekly plan">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "AI for Business Leaders",
            "Data-Driven Decision Making",
            "Strategic Financial Acumen",
            "Digital Transformation Leadership",
          ].map((c) => (
            <button
              key={c}
              onClick={() => d.open(courseDrill(c))}
              className="rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5"
            >
              <div className="text-sm font-semibold">{c}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">8 weeks · 3 hrs/wk · High promotion impact</div>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// MY 1:1s
// ============================================================
export function MyOneOnOnesScreen() {
  const d = useDrill();
  const meetingDrill = (date: string): DrillData => ({
    title: `1:1 with Manager · ${date}`,
    subtitle: "AI agenda, previous commitments, sentiment trends",
    summary: ["AI-generated agenda from your active growth signals and previous commitments."],
    table: {
      columns: ["Topic", "Owner", "Status"],
      rows: [
        ["Strategy Mgr promotion path", "Manager", "Open"],
        ["Cross-functional digital project", "You", "In progress"],
        ["Analytics certification", "You", "62%"],
        ["CSO mentor intro", "Manager", "Scheduled"],
      ],
    },
    recommendations: [
      "Bring Rajnigandha opportunity discussion",
      "Ask for stretch role in Q3 leadership review",
      "Request comp band visibility for next cycle",
    ],
  });

  return (
    <ScreenShell
      title="AI Meeting Intelligence"
      subtitle="AI-generated agendas, sentiment trends, and career-discussion guidance."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Upcoming 1:1s" value="3" sub="Next: Fri 4pm" tone="up" />
        <PremiumKpi label="Action items open" value="5" delta="2 due this week" sub="From last 4 meetings" tone="warn" />
        <PremiumKpi label="Sentiment trend" value="Positive" delta="↑ improving" sub="Last 6 meetings" tone="up" />
        <PremiumKpi label="Career discussions" value="4" delta="↑ frequency up" sub="Last 90 days" tone="up" />
      </div>

      <Panel title="AI-Generated Talking Points" sub="For your next 1:1">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Promotion readiness — what does Strategy Mgr need?",
            "Cross-functional opportunities in D2C / Digital",
            "Leadership visibility — Q3 executive review slot",
            "Stretch assignment — succession readiness path",
          ].map((t) => (
            <div key={t} className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3 text-sm">{t}</div>
          ))}
        </div>
      </Panel>

      <Panel title="Upcoming & Recent" sub="Click for AI agenda + sentiment + follow-ups">
        <div className="space-y-2">
          {[
            { date: "Fri · Jun 12", manager: "Manager 1:1", status: "Scheduled" },
            { date: "Jun 20", manager: "Skip-level with CSO", status: "Scheduled" },
            { date: "May 28", manager: "Manager 1:1", status: "Completed" },
            { date: "May 14", manager: "Mentor session — Rajeev Khanna", status: "Completed" },
          ].map((m) => (
            <button
              key={m.date}
              onClick={() => d.open(meetingDrill(m.date))}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5"
            >
              <div>
                <div className="text-sm font-semibold">{m.manager}</div>
                <div className="text-[11px] text-muted-foreground">{m.date}</div>
              </div>
              <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-semibold">{m.status}</span>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// MY OPPORTUNITIES
// ============================================================
export function MyOpportunitiesScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Internal Opportunities Marketplace"
      subtitle="AI-curated open roles, stretch assignments, transformation projects, and leadership programmes."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi
          label="Active Matches"
          value="6"
          delta="↑ +2 today"
          sub="AI-refreshed daily"
          tone="up"
          ai="1 internal role matches your profile exactly — Associate Brand Manager, Pulse & Confectionery, Noida HQ. Application window closes in 8 days. Subrat's team has flagged you as a HiPo candidate."
        />
        <PremiumKpi label="High-Fit Roles" value="2" delta=">85% match" sub="Action recommended" tone="up" />
        <PremiumKpi label="Stretch Projects" value="3" sub="2 cross-BU" tone="up" />
        <PremiumKpi label="Programmes" value="2" sub="Leadership Accel + Tx" tone="up" />
      </div>

      <Panel title="Best Fit For You" sub="AI-matched · click for full role detail">
        <div className="space-y-2">
          {[
            { name: "Business Strategy Manager — Office of CSO · Mumbai", fit: 89, type: "Role · Permanent" },
            { name: "Digital Innovation Project — D2C Launch", fit: 84, type: "Stretch · 6 months" },
            { name: "Brand Analytics rotation — Catch", fit: 82, type: "Rotation · 4 months" },
            { name: "Transformation Cohort 2026", fit: 78, type: "Programme · 12 months" },
            { name: "International Mobility — Dubai Hub", fit: 71, type: "Role · 18 months" },
            { name: "Leadership Accelerator (HiPo)", fit: 88, type: "Programme · 9 months" },
          ].map((o) => (
            <button
              key={o.name}
              onClick={() => d.open({
                title: o.name,
                summary: ["AI-projected fit, readiness gaps, hiring manager expectations, and preparation roadmap."],
                metrics: [
                  { label: "AI Fit", value: `${o.fit}%`, tone: "up" },
                  { label: "Type", value: o.type },
                  { label: "Apply by", value: "Jul 5" },
                  { label: "Visibility", value: "Executive", tone: "up" },
                ],
                recommendations: ["Express interest in 7 days", "Prep 2-page POV", "Get mentor endorsement"],
              })}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3 text-left hover:border-primary hover:bg-primary/5"
            >
              <div>
                <div className="text-sm font-semibold">{o.name}</div>
                <div className="text-[11px] text-muted-foreground">{o.type}</div>
              </div>
              <span className="rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary">{o.fit}% fit</span>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// MY MENTOR
// ============================================================
export function MyMentorScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="AI Mentorship & Leadership Guidance"
      subtitle="Personalised mentor matches, coaching plans, and leadership connects."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Active Mentor" value="1" sub="Rajeev Khanna · VP Strategy" tone="up" />
        <PremiumKpi label="Compatibility" value="87%" delta="High" sub="AI-matched" tone="up" />
        <PremiumKpi label="Sessions YTD" value="9" delta="↑ on cadence" sub="Monthly + ad-hoc" tone="up" />
        <PremiumKpi label="Coaching plan" value="On track" sub="6 of 9 goals met" tone="up" />
      </div>

      <Panel title="Your Mentor" sub="AI-matched leadership pairing">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow">RK</div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-lg font-semibold">Rajeev Khanna</div>
            <div className="text-xs text-muted-foreground">VP Strategy · DS Group · 18 years</div>
            <div className="mt-2 grid gap-1 text-xs">
              <div><span className="font-semibold">Why matched:</span> Similar growth journey from MT to leadership</div>
              <div><span className="font-semibold">Strength:</span> Strategic leadership · people development track record</div>
              <div><span className="font-semibold">Compatibility:</span> 87% (sentiment + topic + cadence)</div>
            </div>
          </div>
          <button
            onClick={() => d.open({
              title: "Mentor Coaching Plan",
              summary: ["6-month coaching plan with quarterly milestones and executive exposure goals."],
              table: {
                columns: ["Goal", "Status", "Owner"],
                rows: [
                  ["P&L exposure via shadow", "In progress", "Ananya"],
                  ["Executive POV co-author", "Scheduled Jul", "Both"],
                  ["Skip-level with CSO", "Done", "Rajeev"],
                  ["Cross-BU project lead", "In progress", "Ananya"],
                ],
              },
            })}
            className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            View coaching plan
          </button>
        </div>
      </Panel>

      <Panel title="Recommended Additional Mentors" sub="AI-matched for capability gaps">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            { name: "Priya Menon — CFO Office", reason: "Closes P&L / financial acumen gap", fit: 84 },
            { name: "Arjun Rao — CDO", reason: "Digital transformation exposure", fit: 81 },
          ].map((m) => (
            <div key={m.name} className="rounded-lg border border-border bg-background p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{m.name}</div>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">{m.fit}% fit</span>
              </div>
              <div className="text-[11px] text-muted-foreground">{m.reason}</div>
            </div>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}
