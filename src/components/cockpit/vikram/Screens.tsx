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

const EYEBROW = "Vikram Tiwari · Regional Sales Workforce Leader · North & East India";

const COPILOT = [
  "Which territories have highest attrition risk?",
  "Predict festive season workforce shortages",
  "Show compensation gaps",
  "Recommend territory optimization",
  "Identify burnout hotspots",
];

// ============================================================
// FIELD SALES FORCE (default)
// ============================================================
export function FieldSalesScreen() {
  const d = useDrill();
  const territoryDrill = (region: string): DrillData => ({
    title: `${region} — Territory Deep Dive`,
    summary: [`Rep coverage, travel load, distributor complexity and revenue impact for ${region}.`],
    metrics: [
      { label: "Reps", value: region === "North" ? "2,180" : region === "East" ? "1,640" : region === "West" ? "1,180" : "820" },
      { label: "Coverage", value: region === "East" ? "84%" : "92%", tone: region === "East" ? "warn" : "up" },
      { label: "Travel load", value: region === "North" ? "High" : "Moderate", tone: region === "North" ? "critical" : "warn" },
      { label: "Attrition", value: region === "North" ? "26.4%" : region === "East" ? "22%" : region === "West" ? "18%" : "17%", tone: region === "North" ? "critical" : "warn" },
    ],
    table: {
      columns: ["Cluster", "Reps", "Coverage", "Productivity (₹/rep)"],
      rows: [
        ["Metro", 420, "94%", "₹21.4L"],
        ["Tier-2", 680, "88%", "₹18.2L"],
        ["Tier-3", 540, "82%", "₹15.6L"],
        ["Rural", 540, "76%", "₹12.8L"],
      ],
    },
    recommendations: [
      "Rebalance 14 routes from overloaded reps to under-utilised ones",
      "Open 12 vacancies before festive ramp",
      "Coaching for bottom-quartile distributor relationships",
    ],
  });
  const riskDrill = (cat: string): DrillData => ({
    title: `${cat} — Sales Workforce Risk`,
    summary: [`AI-detected ${cat.toLowerCase()} pattern, revenue impact, and forecast.`],
    metrics: [
      { label: "Score", value: cat === "Attrition" ? "78/100" : "62/100", tone: "critical" },
      { label: "Reps affected", value: cat === "Attrition" ? "609" : "182" },
      { label: "Revenue at risk", value: "₹24 Cr", tone: "critical" },
      { label: "Forecast 90d", value: "↑", tone: "warn" },
    ],
    recommendations: ["Compensation correction for top quartile", "Territory rebalance", "Manager coaching"],
  });

  return (
    <ScreenShell
      title="Field Sales Workforce Intelligence"
      subtitle="AI-powered workforce visibility across territories, distributor operations, and frontline sales execution."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <PremiumKpi label="Active Sales Workforce" value="5,820" delta="↑ +3.1% YoY" sub="RSO + ASM + TSM" tone="up" spark={[5400, 5480, 5560, 5640, 5720, 5780, 5820]} />
        <PremiumKpi label="Territory Coverage" value="91%" delta="East at risk" sub="4-region rollup" tone="warn" />
        <PremiumKpi label="Attrition Risk" value="609" delta="43% of all exits" sub="Top performers leading" tone="critical" />
        <PremiumKpi label="Avg Productivity" value="₹18.2L" delta="↓ -6.4% North" sub="Per rep / month" tone="down" spark={[19.4, 19.1, 18.8, 18.6, 18.4, 18.3, 18.2]} />
        <PremiumKpi label="Burnout Risk" value="182" delta="High travel" sub="Reps flagged" tone="critical" />
        <PremiumKpi label="Open Positions" value="87" delta="Festive risk" sub="21-day lead time" tone="warn" />
        <PremiumKpi label="Digital Adoption" value="62%" delta="↑ improving" sub="CRM + mobile" tone="up" spark={[48, 52, 55, 58, 60, 61, 62]} />
        <PremiumKpi label="Distributor NPS" value="64" delta="↓ East" sub="Service quality" tone="warn" />
      </div>

      <AiInsightBanner
        title="AI detected rising attrition and workload imbalance across North & East field sales territories."
        description="Compensation variance, excessive travel load, and territory imbalance are impacting sales morale and retention."
        confidence={94}
        sources="Sales productivity · Attendance · Expense claims · Engagement surveys · Incentive data"
        onAddActions={() =>
          d.open({
            title: "Recommended Actions — North & East Stabilisation",
            summary: ["AI-ranked actions with predicted attrition reduction and revenue impact."],
            table: {
              columns: ["Action", "Attrition Δ", "Revenue Δ", "Coverage Δ", "Cost"],
              rows: [
                ["Territory rebalance — 14 routes", "-18%", "+₹3.6 Cr", "+4pp", "₹0"],
                ["Compensation correction — top 20%", "-24%", "+₹6.2 Cr", "+0", "₹2.4 Cr"],
                ["Incentive scheme rework", "-12%", "+₹1.8 Cr", "+0", "₹0"],
                ["Additional hiring — 38 reps", "-9%", "+₹4.1 Cr", "+6pp", "₹1.6 Cr"],
                ["Manager intervention — 12 ASMs", "-14%", "+₹2.2 Cr", "+0", "₹40L"],
                ["Wellness + travel optimisation", "-7%", "+₹1.1 Cr", "+0", "₹60L"],
              ],
            },
            recommendations: ["Top-3 combo: rebalance + comp correction + 12-ASM coaching cuts attrition by ~46%"],
          })
        }
        onView={() => d.open(territoryDrill("North"))}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Territory Workload Heatmap" sub="Click a region to drill in">
          <div className="space-y-2">
            {[
              { r: "North", coverage: 92, travel: 88, prod: 78, burn: 72, attr: 78 },
              { r: "East", coverage: 84, travel: 74, prod: 82, burn: 68, attr: 64 },
              { r: "West", coverage: 93, travel: 52, prod: 88, burn: 42, attr: 34 },
              { r: "South", coverage: 95, travel: 48, prod: 91, burn: 31, attr: 28 },
            ].map((row) => (
              <button
                key={row.r}
                onClick={() => d.open(territoryDrill(row.r))}
                className="grid w-full grid-cols-6 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs hover:border-primary"
              >
                <span className="font-semibold text-foreground">{row.r}</span>
                <Heat label="Cov" v={row.coverage} good />
                <Heat label="Trv" v={row.travel} />
                <Heat label="Prod" v={row.prod} good />
                <Heat label="Burn" v={row.burn} />
                <Heat label="Attr" v={row.attr} />
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Sales Productivity Intelligence" sub="Regional trend">
          <LineChart
            data={[
              { label: "M1", value: 19.4 },
              { label: "M2", value: 19.1 },
              { label: "M3", value: 18.8 },
              { label: "M4", value: 18.6 },
              { label: "M5", value: 18.4 },
              { label: "M6", value: 18.2 },
              { label: "M7", value: 17.6, forecast: true },
            ]}
          />
          <div className="mt-2 rounded-md border border-dashed border-destructive/30 bg-destructive/5 p-2.5 text-[11px]">
            <span className="font-semibold text-destructive">AI · </span>
            North territory productivity declined 9% after workforce shortages.
          </div>
        </Panel>

        <Panel title="Sales Workforce Risk Radar">
          <RadarChart
            axes={[
              { label: "Attrition", value: 78 },
              { label: "Burnout", value: 62 },
              { label: "Comp gap", value: 71 },
              { label: "Digital adopt.", value: 38 },
              { label: "Leadership", value: 44 },
            ]}
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Attrition", "Burnout", "Comp gap", "Digital adopt.", "Leadership"].map((r) => (
              <button key={r} onClick={() => d.open(riskDrill(r))} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] hover:border-primary">
                {r}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Distributor Engagement Intelligence">
          <div className="space-y-2.5">
            <HBar label="North · Metro" value={78} max={100} tone="warn" meta="Avg visits 14/mo · NPS 64" />
            <HBar label="North · Tier-2" value={68} max={100} tone="warn" meta="Escalations rising" />
            <HBar label="East · Tier-2" value={58} max={100} tone="critical" meta="Coverage gap impact" />
            <HBar label="West" value={86} max={100} tone="up" meta="Stable" />
            <HBar label="South" value={88} max={100} tone="up" meta="Best in class" />
          </div>
          <div className="mt-2 rounded-md border border-dashed border-warning/40 bg-warning/5 p-2.5 text-[11px]">
            <span className="font-semibold text-warning">AI · </span>
            Declining distributor engagement in East zone — territory overload affecting relationship quality.
          </div>
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

function Heat({ label, v, good }: { label: string; v: number; good?: boolean }) {
  const tone = good
    ? v >= 90 ? "bg-success/15 text-success" : v >= 80 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
    : v <= 35 ? "bg-success/15 text-success" : v <= 65 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive";
  return (
    <div className={`rounded px-1.5 py-1 text-center text-[10px] font-semibold ${tone}`}>
      <div className="text-[9px] opacity-70">{label}</div>
      <div>{v}</div>
    </div>
  );
}

// ============================================================
// ATTRITION & RETENTION
// ============================================================
export function AttritionRetentionScreen() {
  const d = useDrill();
  const repDrill = (name: string): DrillData => ({
    title: `${name} — Retention Profile`,
    summary: ["Attrition probability, compensation gap, productivity trend, engagement, travel load, manager feedback."],
    metrics: [
      { label: "Attrition prob.", value: "82%", tone: "critical" },
      { label: "Comp gap", value: "-14%", tone: "down" },
      { label: "Productivity %ile", value: "P88", tone: "up" },
      { label: "Travel load", value: "High", tone: "warn" },
    ],
    table: {
      columns: ["Signal", "Value", "Trend"],
      rows: [
        ["Comp vs market P50", "-14%", "↓"],
        ["Routes / week", "32", "↑"],
        ["Engagement score", "54", "↓"],
        ["Manager rating", "3.2 / 5", "→"],
      ],
    },
    recommendations: [
      "Comp correction +12% (urgent)",
      "Reduce route load to 26 / week",
      "Career conversation — ASM pathway in 18 months",
    ],
  });
  return (
    <ScreenShell
      title="Sales Attrition & Retention Intelligence"
      subtitle="AI-driven retention visibility across field sales operations."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <PremiumKpi
          label="Sales Attrition"
          value="26.4%"
          delta="↑ +8pp vs co. avg"
          sub="327 exits / 12M"
          tone="critical"
          spark={[22, 23, 24, 25.2, 26, 26.3, 26.4]}
          ai="North zone attrition is running 8pp above company average — ITC and Dabur are actively hiring from your RSO pool in Meerut and Agra. Top 15 flight-risk profiles identified."
        />
        <PremiumKpi label="High-Risk Reps" value="118" delta="Immediate" tone="critical" />
        <PremiumKpi
          label="Avg Tenure at Exit"
          value="1.9 yrs"
          delta="↓"
          tone="down"
          ai="RSOs who cross 18 months show 3.2× lower exit probability. Current avg tenure at exit: 11 months — 7 months below the retention inflection point. Onboarding quality is the lever."
        />
        <PremiumKpi label="Competitor Poaching" value="High" delta="ITC + HUL" tone="critical" />
        <PremiumKpi label="Revenue at Risk" value="₹24 Cr" delta="12M" tone="critical" />
      </div>

      <AiInsightBanner
        title="Field Sales North attrition is 3× company average and concentrated among high-performing reps with high travel intensity."
        description="Top 20% performers leaving 2.4× faster than average — career ceiling and comp gap are the dominant drivers."
        confidence={91}
        sources="Exit interviews · Competitor intel · Comp data · Promotion history · Performance"
        onAddActions={() => d.open(repDrill("Top 15 At-Risk RSOs"))}
        onView={() => d.open(repDrill("Top 15 At-Risk RSOs"))}
      />

      <Panel title="Top Exit Drivers — AI clustered">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-2">Reason</th><th>% citing</th><th>AI recommendation</th><th></th></tr>
            </thead>
            <tbody>
              {[
                ["Better compensation", "64%", "Benchmark ITC/HUL compensation"],
                ["Territory overload", "41%", "Territory redesign"],
                ["No career visibility", "48%", "Career ladder rollout"],
                ["Manager quality", "29%", "Coaching intervention"],
                ["Travel fatigue", "33%", "Travel optimization"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td><button onClick={() => d.open(repDrill(row[0]))} className="text-xs text-primary hover:underline">Plan →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="High-Risk Rep Watchlist" sub="Top 8 of 118 · click for retention plan">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Suresh Yadav · North · 4 yrs",
            "Anil Kumar · East · 3 yrs",
            "Priya Sharma · North · 5 yrs",
            "Rakesh Verma · East · 2 yrs",
            "Manoj Singh · North · 6 yrs",
            "Deepak Joshi · West · 3 yrs",
            "Vinay Gupta · North · 4 yrs",
            "Sandeep Rao · East · 2 yrs",
          ].map((n) => (
            <button key={n} onClick={() => d.open(repDrill(n))} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary">
              <span>{n}</span>
              <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">Flight risk</span>
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
export function CareerPathsScreen() {
  const d = useDrill();
  const drill = (path: string): DrillData => ({
    title: `${path} — Career Pathway`,
    summary: [`Promotion readiness, skill gaps, internal mobility, leadership potential.`],
    metrics: [
      { label: "Ready (12M)", value: "62" },
      { label: "Skill gap avg", value: "2.4", tone: "warn" },
      { label: "Mobility moves YTD", value: "38", tone: "up" },
      { label: "Promotion rate", value: "11%", tone: "warn" },
    ],
    recommendations: ["Leadership programme intake", "Cross-functional mobility for 12 HiPos", "Future-role readiness assessment"],
  });
  return (
    <ScreenShell
      title="Sales Career Growth Intelligence"
      subtitle="Pathways, promotion readiness, skill gaps and leadership potential."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {["Territory Manager", "Key Account", "Modern Trade", "Sales Leadership"].map((p) => (
          <button key={p} onClick={() => d.open(drill(p))} className="rounded-xl border border-border bg-card p-4 text-left shadow-card hover:border-primary">
            <div className="font-display text-base font-semibold">{p}</div>
            <div className="mt-3 space-y-1.5 text-xs">
              <Row k="Ready now" v={p === "Sales Leadership" ? "8" : "24"} />
              <Row k="Skill gap" v={p === "Modern Trade" ? "High" : "Medium"} bad={p === "Modern Trade"} />
              <Row k="Promotion %" v={p === "Sales Leadership" ? "4%" : "12%"} />
              <Row k="HiPos in pool" v={p === "Sales Leadership" ? "18" : "42"} />
            </div>
          </button>
        ))}
      </div>

      <Panel title="AI Recommendations">
        <ul className="space-y-2 text-sm">
          <li>Leadership programme — accelerate 15 ASMs to RSM in 18 months</li>
          <li>Cross-functional mobility — 8 RSOs into Modern Trade for category exposure</li>
          <li>Future-role readiness — digital selling + AI assist for top 50</li>
        </ul>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

function Row({ k, v, bad }: { k: string; v: string; bad?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={bad ? "font-semibold text-destructive" : "font-semibold text-foreground"}>{v}</span>
    </div>
  );
}

// ============================================================
// COMPENSATION
// ============================================================
export function CompensationScreen() {
  const d = useDrill();
  const drill = (name: string): DrillData => ({
    title: `${name} — Compensation Drill`,
    summary: ["Benchmark, incentive comparison, peer analysis and retention risk."],
    metrics: [
      { label: "DSG vs P50", value: "-12%", tone: "down" },
      { label: "Incentive var.", value: "High", tone: "warn" },
      { label: "Peer cohort", value: "P38", tone: "down" },
      { label: "Retention risk", value: "78%", tone: "critical" },
    ],
    recommendations: ["+₹84,000 correction", "Re-band into S2 grade", "Quarterly incentive smoothing"],
  });
  return (
    <ScreenShell
      title="Sales Compensation Intelligence"
      subtitle="Fairness, market benchmarking and incentive gap analysis."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Comp vs P50" value="-12%" delta="Underpaid" tone="down" />
        <PremiumKpi
          label="Incentive Fairness"
          value="68"
          delta="↓"
          sub="Fairness index"
          tone="warn"
          ai="34% of RSOs missed incentive target 2+ months running — the strongest single predictor of exit within 60 days in this cohort. Recommended: manager 1:1 this week."
        />
        <PremiumKpi label="Variable Payout" value="₹6.2 Cr" delta="QTD" tone="up" />
        <PremiumKpi label="Comp Risk" value="142" delta="Reps" sub="Underpaid high-performers" tone="critical" />
      </div>

      <Panel title="Underpaid High-Performers" sub="Click for benchmark detail">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-2">Rep</th><th>Region</th><th>Performance</th><th>Comp gap</th><th>Retention risk</th><th></th></tr>
            </thead>
            <tbody>
              {[
                ["Suresh Yadav", "North", "P92", "-14%", "82%"],
                ["Priya Sharma", "North", "P88", "-12%", "74%"],
                ["Anil Kumar", "East", "P85", "-16%", "78%"],
                ["Manoj Singh", "North", "P90", "-11%", "68%"],
                ["Deepak Joshi", "West", "P80", "-9%", "54%"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td className="text-destructive">{row[3]}</td>
                  <td>{row[4]}</td>
                  <td><button onClick={() => d.open(drill(row[0]))} className="text-xs text-primary hover:underline">Drill →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Compensation Benchmarking — RSO / ASM / TSM" sub="DSG vs FMCG market · P25 · P50 · P75 (₹ LPA total cash)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Role / Band</th>
                <th>DSG Median</th>
                <th>Mkt P25</th>
                <th>Mkt P50</th>
                <th>Mkt P75</th>
                <th>Gap vs P50</th>
                <th>Top peers</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["RSO · 0–2 yrs", "₹3.6L", "₹3.4L", "₹4.0L", "₹4.6L", "−10%", "ITC, HUL, Dabur"],
                ["RSO · 3–5 yrs (Top 20%)", "₹4.8L", "₹4.6L", "₹5.6L", "₹6.4L", "−14%", "HUL, Marico, Nestlé"],
                ["ASM · Tier-2", "₹9.2L", "₹9.8L", "₹11.2L", "₹12.8L", "−18%", "HUL, P&G, ITC"],
                ["ASM · Metro", "₹12.4L", "₹13.2L", "₹15.0L", "₹17.4L", "−17%", "P&G, Nestlé, Mondelez"],
                ["TSM · 8+ yrs", "₹18.6L", "₹20.0L", "₹22.4L", "₹26.0L", "−17%", "HUL, Dabur, Britannia"],
                ["RSM · ₹100Cr+ territory", "₹34L", "₹36L", "₹42L", "₹48L", "−19%", "HUL, P&G, ITC"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">{row[0]}</td>
                  <td className="font-mono text-xs">{row[1]}</td>
                  <td className="font-mono text-xs text-muted-foreground">{row[2]}</td>
                  <td className="font-mono text-xs text-muted-foreground">{row[3]}</td>
                  <td className="font-mono text-xs text-muted-foreground">{row[4]}</td>
                  <td className="text-destructive">{row[5]}</td>
                  <td className="text-xs text-muted-foreground">{row[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Roles below P50</div>
            <div className="font-display text-xl font-semibold text-destructive">6 / 6</div>
            <div className="text-[11px] text-muted-foreground">Every band lags market median</div>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Correction cost · top 20%</div>
            <div className="font-display text-xl font-semibold">₹4.2 Cr</div>
            <div className="text-[11px] text-muted-foreground">Move 142 high-perf to P50</div>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="text-[10px] uppercase text-muted-foreground">Replacement cost avoided</div>
            <div className="font-display text-xl font-semibold text-success">₹12.8 Cr</div>
            <div className="text-[11px] text-muted-foreground">3× ROI on correction</div>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-dashed border-warning/40 bg-warning/5 p-2.5 text-[11px]">
          <span className="font-semibold text-warning">AI · </span>
          Source: AON FMCG Sales Comp Survey FY25 + Mercer India FMCG · DSG sample n=1,240 · refreshed 04:18 today.
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}


// ============================================================
// DIGITAL UPSKILLING
// ============================================================
export function DigitalUpskillingScreen() {
  const d = useDrill();
  const drill = (cap: string): DrillData => ({
    title: `${cap} — Capability Drill`,
    summary: ["Adoption clusters, resistance signals, training acceleration plan."],
    metrics: [
      { label: "Adoption", value: "62%", tone: "warn" },
      { label: "Resistant cohort", value: "184" },
      { label: "Coaching slots", value: "48", tone: "up" },
      { label: "AI assistant usage", value: "34%", tone: "warn" },
    ],
    recommendations: ["Fast-track digital coaching for 184", "Embed AI assistant in CRM workflow", "Reverse-mentoring with Gen-Z reps"],
  });
  return (
    <ScreenShell
      title="Digital Sales Capability Intelligence"
      subtitle="CRM adoption, AI-assisted selling, mobile reporting compliance, digital literacy."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="CRM Adoption" value="71%" delta="↑ +6pp" tone="up" />
        <PremiumKpi label="AI-Assisted Selling" value="34%" delta="Early" tone="warn" />
        <PremiumKpi label="Mobile Reporting" value="88%" delta="On track" tone="up" />
        <PremiumKpi label="Digital Literacy" value="62%" delta="Mixed" tone="warn" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Adoption Heatmap by Region">
          <div className="space-y-2.5">
            <HBar label="North" value={68} max={100} tone="warn" onClick={() => d.open(drill("North CRM"))} />
            <HBar label="East" value={54} max={100} tone="critical" onClick={() => d.open(drill("East CRM"))} />
            <HBar label="West" value={78} max={100} tone="up" onClick={() => d.open(drill("West CRM"))} />
            <HBar label="South" value={82} max={100} tone="up" onClick={() => d.open(drill("South CRM"))} />
          </div>
        </Panel>
        <Panel title="AI Recommendations">
          <ul className="space-y-2 text-sm">
            <li>Digital coaching cohort — 184 resistant reps · 6-week sprint</li>
            <li>Fast-track learning bundle — mobile-first microlearning</li>
            <li>AI sales assistant rollout — top 500 first, then phase 2</li>
            <li>Reverse-mentoring — 60 Gen-Z reps coach senior reps</li>
          </ul>
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// TERRITORY COVERAGE
// ============================================================
export function TerritoryCoverageScreen() {
  const d = useDrill();
  const drill = (terr: string): DrillData => ({
    title: `${terr} — Coverage Optimisation`,
    summary: ["Outlet coverage, rep utilisation, vacancy impact and travel burden."],
    metrics: [
      { label: "Outlet coverage", value: "84%", tone: "warn" },
      { label: "Rep utilisation", value: "92%", tone: "up" },
      { label: "Vacancies", value: "18", tone: "warn" },
      { label: "Travel burden", value: "High", tone: "critical" },
    ],
    recommendations: ["Move 4 routes to under-utilised reps", "Hire 6 reps before festive", "Optimise beat plans with AI router"],
  });
  return (
    <ScreenShell
      title="Territory Coverage & Workforce Optimization"
      subtitle="Outlet coverage, rep utilisation, vacancy impact, travel burden and revenue risk."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Outlet Coverage" value="89%" delta="East 84%" tone="warn" />
        <PremiumKpi label="Rep Utilisation" value="91%" delta="On target" tone="up" />
        <PremiumKpi label="Vacancy Impact" value="₹4.2 Cr" delta="Quarterly" tone="critical" />
        <PremiumKpi
          label="Coverage Gaps"
          value="38"
          sub="Districts under-served"
          tone="warn"
          ai="3 territories in Meerut have been vacant 18+ days. Revenue leakage estimated at ₹1.8L/week based on average territory throughput. Temp coverage recommended."
        />
      </div>

      <AiInsightBanner
        title="AI predicts ₹6.4 Cr revenue impact from current vacancies through festive ramp."
        description="87 open positions, lead time 21 days. Without immediate action coverage drops to 82% by week 6."
        confidence={89}
        sources="Vacancy data · Outlet master · Productivity model"
        onAddActions={() => d.open(drill("Festive ramp"))}
        onView={() => d.open(drill("Festive ramp"))}
      />

      <Panel title="Territory Coverage by Region">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            { r: "North", cov: 92, vac: 28, risk: "High" },
            { r: "East", cov: 84, vac: 31, risk: "Critical" },
            { r: "West", cov: 93, vac: 14, risk: "Low" },
            { r: "South", cov: 95, vac: 14, risk: "Low" },
          ].map((t) => (
            <button key={t.r} onClick={() => d.open(drill(t.r))} className="rounded-xl border border-border bg-background p-4 text-left hover:border-primary">
              <div className="font-display text-base font-semibold">{t.r}</div>
              <div className="mt-2 space-y-1.5 text-xs">
                <Row k="Coverage" v={`${t.cov}%`} bad={t.cov < 90} />
                <Row k="Vacancies" v={String(t.vac)} bad={t.vac > 20} />
                <Row k="Risk" v={t.risk} bad={t.risk !== "Low"} />
              </div>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}
