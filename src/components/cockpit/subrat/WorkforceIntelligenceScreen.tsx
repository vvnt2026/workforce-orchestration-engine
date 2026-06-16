import {
  AiInsightBanner,
  HBar,
  LineChart,
  Panel,
  PremiumKpi,
  RadarChart,
  ScreenShell,
  regionDrill,
  riskDrill,
  useDrill,
} from "./primitives";

export function WorkforceIntelligenceScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Workforce Intelligence — DS Group"
      subtitle="Enterprise workforce visibility across FMCG, Manufacturing, Hospitality, and Sales operations."
    >
      {/* KPI row */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 items-start">
        <PremiumKpi
          label="Total Workforce"
          value="18,742"
          delta="↑ +4.1% YoY"
          sub="Active across 12 BUs"
          tone="up"
          spark={[17800, 17910, 18020, 18180, 18340, 18520, 18742]}
          ai="Net growth driven by Hospitality and Digital hiring waves."
          onClick={() =>
            d.open({
              title: "Total Workforce — 18,742",
              summary: ["+4.1% YoY · Hospitality +9.2% leads growth; Manufacturing −1.1% on automation."],
              table: {
                columns: ["BU", "Headcount", "YoY"],
                rows: [
                  ["Field Sales", 5820, "+2.4%"],
                  ["Manufacturing", 7114, "−1.1%"],
                  ["Hospitality", 2006, "+9.2%"],
                  ["Brand & Marketing", 612, "+7.1%"],
                  ["Corporate / HQ", 1882, "+1.8%"],
                  ["Supply Chain & R&D", 1308, "+3.7%"],
                ],
              },
            })
          }
        />
        <PremiumKpi label="Field Sales Workforce" value="5,820" delta="High attrition risk" sub="1,240 in North zone" tone="critical" spark={[5910, 5880, 5860, 5840, 5830, 5825, 5820]} ai="Top 20% performers exiting 2.4× the average." />
        <PremiumKpi label="Manufacturing Workforce" value="7,114" delta="Stable utilization" sub="3 plants · 84.2% util" tone="up" spark={[7180, 7170, 7160, 7140, 7130, 7120, 7114]} />
        <PremiumKpi label="Hospitality Workforce" value="2,006" delta="Seasonal demand rising" sub="7 properties · Peak Apr–Jun" tone="warn" spark={[1880, 1910, 1940, 1965, 1980, 1995, 2006]} ai="Weekend coverage trending 91% — chef gap in South." />
        <PremiumKpi label="Women Workforce Ratio" value="21%" delta="↑ +2.4% improvement" sub="Target 28% by 2027" tone="up" spark={[18.2, 18.9, 19.4, 19.8, 20.2, 20.7, 21]} />
        <PremiumKpi label="Workforce Cost YoY" value="↑ 11.8%" delta="Pressure detected" sub="Comp + OT + Contractor" tone="warn" spark={[8.1, 8.9, 9.4, 10.1, 10.8, 11.4, 11.8]} ai="Manufacturing OT +17% — investigate." />
        <PremiumKpi label="AI Risk Alerts" value="38" delta="Priority review" sub="12 critical · 26 warn" tone="critical" spark={[22, 26, 28, 30, 32, 35, 38]} />
        <PremiumKpi
          label="Engagement Index"
          value="71"
          delta="↓ −4pp"
          sub="3 sites below threshold"
          tone="down"
          spark={[76, 75, 74, 73, 72, 71, 71]}
          ai="4pp drop is driven entirely by Manufacturing (stable in other BUs). Morale decline at Noida Plant 2 (Shift B fatigue & heat complaints) is the root cause. Target coaching."
        />
      </section>

      <AiInsightBanner
        title="AI detected increasing workforce risk in Field Sales North & East regions."
        description="Attrition, territory overload, and compensation gaps are expected to impact festive distribution readiness by 8–11%."
        confidence={92}
        sources="Attrition data · Sales productivity · Attendance · Engagement"
        onAddActions={() =>
          d.open({
            title: "Recommended Actions — Field Sales N&E",
            subtitle: "Bundle deploys 5 workflows · Est. cycle 21 days",
            sections: [
              {
                title: "Workflow bundle",
                items: [
                  "Territory rebalance — 38 routes across 6 districts",
                  "Compensation correction — top 20% RSOs +9%",
                  "Manager coaching cohort — 14 ASMs",
                  "Retention incentive — Q3 festive lock-in bonus",
                  "Fast-track hiring — 24 backfill requisitions",
                ],
              },
            ],
            recommendations: [
              "Approve bundle today to protect Aug–Oct festive sell-in",
              "Pilot territory rebalance in Lucknow + Kanpur first",
            ],
          })
        }
        onView={() => d.open(regionDrill("North"))}
      />

      {/* Main grid */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="Workforce Distribution Heatmap" sub="Click any region to drill into demographics, exits and pressure" right={<span className="text-[10px] uppercase tracking-wider text-muted-foreground">Live</span>}>
          <div className="grid grid-cols-2 gap-2">
            {[
              { r: "North", size: "2,180", attr: "31%", prod: "82", eng: "66", tone: "critical" as const },
              { r: "East", size: "1,640", attr: "27%", prod: "85", eng: "69", tone: "critical" as const },
              { r: "West", size: "2,060", attr: "19%", prod: "91", eng: "74", tone: "warn" as const },
              { r: "South", size: "1,820", attr: "16%", prod: "88", eng: "78", tone: "up" as const },
            ].map((x) => (
              <button
                key={x.r}
                onClick={() => d.open(regionDrill(x.r))}
                className={`rounded-xl border border-border p-3 text-left transition-shadow hover:shadow-card ${
                  x.tone === "critical" ? "bg-destructive/5" : x.tone === "warn" ? "bg-warning/5" : "bg-success/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-sm font-semibold">{x.r}</div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      x.tone === "critical"
                        ? "bg-destructive/15 text-destructive"
                        : x.tone === "warn"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/15 text-success"
                    }`}
                  >
                    {x.attr} attr
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] text-muted-foreground">
                  <div>WF<br /><span className="font-mono text-foreground">{x.size}</span></div>
                  <div>Prod<br /><span className="font-mono text-foreground">{x.prod}</span></div>
                  <div>Eng<br /><span className="font-mono text-foreground">{x.eng}</span></div>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Workforce Cost Intelligence" sub="₹2,184 Cr annualised · Forecast Q4 2026">
          <LineChart
            data={[
              { label: "Q1", value: 482 },
              { label: "Q2", value: 511 },
              { label: "Q3", value: 538 },
              { label: "Q4", value: 562 },
              { label: "Q1F", value: 591, forecast: true },
              { label: "Q2F", value: 614, forecast: true },
            ]}
          />
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            {[
              ["Cost / FTE", "₹11.6L"],
              ["Incentives", "₹148 Cr"],
              ["Contractor", "₹212 Cr"],
              ["Overtime", "↑ 17%"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-secondary/60 p-2">
                <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
                <div className="font-display text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-md border border-dashed border-warning/40 bg-warning/5 px-3 py-2 text-xs text-foreground/80">
            <span className="font-semibold text-warning">AI · </span>
            Manufacturing overtime cost increased 17% in last 2 quarters — investigate Plant 2 packaging line.
          </div>
        </Panel>

        <Panel title="Workforce Risk Radar" sub="Composite enterprise risk score · 5 vectors">
          <div className="flex flex-wrap items-center gap-4">
            <RadarChart
              axes={[
                { label: "Attrition", value: 78 },
                { label: "Burnout", value: 62 },
                { label: "Compliance", value: 22 },
                { label: "Leadership", value: 54 },
                { label: "Skills", value: 71 },
              ]}
            />
            <ul className="flex-1 space-y-1.5 text-xs">
              {["Attrition", "Burnout", "Compliance", "Leadership gaps", "Skill shortages"].map((r) => (
                <li key={r}>
                  <button
                    onClick={() => d.open(riskDrill(r))}
                    className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary"
                  >
                    <span>{r}</span>
                    <span className="text-muted-foreground">View →</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title="Diversity & Inclusion Intelligence" sub="Tracking against 2027 commitments">
          <div className="space-y-3">
            <HBar label="Women in Leadership" value={17} max={30} tone="warn" meta="17% · Target 30% by 2027" />
            <HBar label="Plant Diversity" value={14} max={25} tone="warn" meta="Manufacturing baseline 14%" />
            <HBar label="Hiring Diversity Mix" value={34} max={50} tone="up" meta="34% women hires in last 6M" />
            <HBar label="Internal Mobility Equity" value={42} max={60} tone="up" meta="42% women in lateral moves" />
          </div>
          <div className="mt-4 rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-xs text-foreground/85">
            <span className="font-semibold text-primary">AI recommendations · </span>
            Launch women-leadership accelerator for 24 HiPos; expand inclusive sourcing to 6 new campuses.
          </div>
        </Panel>
      </section>

      {d.node}
    </ScreenShell>
  );
}
