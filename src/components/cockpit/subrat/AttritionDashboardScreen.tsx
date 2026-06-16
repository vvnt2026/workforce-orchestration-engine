import { HBar, LineChart, Panel, PremiumKpi, ScreenShell, useDrill } from "./primitives";
import type { DrillData } from "../drilldowns";

const buExitDrill = (bu: string, attr: number): DrillData => ({
  title: `${bu} — Attrition Deep Dive`,
  subtitle: `${attr}% rolling 12M · AI exit pattern detected`,
  summary: [
    `${bu} is contributing materially to enterprise attrition. AI flags compensation, career path, and manager quality as the top three drivers.`,
  ],
  metrics: [
    { label: "Attrition", value: `${attr}%`, tone: attr >= 25 ? "critical" : attr >= 18 ? "warn" : "default" },
    { label: "Top quartile loss", value: "2.4×", tone: "critical" },
    { label: "Comp gap vs market", value: "−9% to −14%", tone: "warn" },
    { label: "Future-90d forecast", value: `${(attr + 1.2).toFixed(1)}%`, tone: "warn" },
  ],
  sections: [
    {
      title: "AI exit drivers",
      items: [
        "Compensation gap vs ITC / HUL / Dabur P50",
        "Career ladder stagnation — RSO→ASM promotion 8% vs industry 14%",
        "Territory overload — 38 routes flagged as overburdened",
        "Manager quality — 6 ASMs in lowest decile",
      ],
    },
  ],
  recommendations: [
    "Top-performer comp correction +9% (cost ₹3.4 Cr · saving ₹14.8 Cr)",
    "Publish career ladders and run promotion review",
    "Manager coaching cohort — 14 ASMs in 6 weeks",
  ],
});

const exitReasonDrill = (reason: string): DrillData => ({
  title: `Exit driver — ${reason}`,
  subtitle: "Sentiment + transcript intelligence from 480 exit interviews",
  summary: [
    `AI clustered open-text responses across 480 exit interviews. ${reason} appears with high co-occurrence with compensation and manager-quality signals.`,
  ],
  metrics: [
    { label: "Citing", value: "64%", tone: "critical" },
    { label: "Sentiment", value: "−0.42", tone: "down" },
    { label: "Regional skew", value: "North + East", tone: "warn" },
    { label: "AI confidence", value: "91%", tone: "up" },
  ],
  recommendations: [
    "Benchmark compensation bands against ITC / HUL / Dabur live data",
    "Publish role-level career ladders within 30 days",
    "Pilot targeted manager coaching in flagged territories",
  ],
});

export function AttritionDashboardScreen() {
  const d = useDrill();
  const bus = [
    { name: "Field Sales North", v: 31, max: 35, tone: "critical" as const, meta: "Critical · 3× company avg" },
    { name: "Field Sales East", v: 27, max: 35, tone: "critical" as const, meta: "Critical" },
    { name: "Manufacturing Contract", v: 24, max: 35, tone: "critical" as const, meta: "High" },
    { name: "Hospitality", v: 21, max: 35, tone: "warn" as const, meta: "High" },
    { name: "Manufacturing Permanent", v: 12, max: 35, tone: "warn" as const, meta: "Stable" },
    { name: "Brand & Marketing", v: 9, max: 35, tone: "up" as const, meta: "Healthy" },
    { name: "Corporate HQ", v: 7, max: 35, tone: "up" as const, meta: "Healthy" },
    { name: "Company Overall", v: 18.4, max: 35, tone: "warn" as const, meta: "↑ +2.1pp YoY" },
  ];

  return (
    <ScreenShell
      title="Attrition Dashboard — DS Group"
      subtitle="18.4% rolling 12M · Sales force = 43% of exits · AI exit drivers mapped"
    >
      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <PremiumKpi label="Exits Last 12M" value="1,417" delta="18.4% rate" sub="Workforce 7,700" tone="critical" spark={[1180, 1220, 1265, 1310, 1352, 1390, 1417]} ai="Tracking 1.6× internal benchmark." />
        <PremiumKpi label="Sales Exits" value="609" delta="43% of all exits" sub="Field Sales N&E concentrated" tone="critical" spark={[460, 490, 510, 540, 570, 590, 609]} />
        <PremiumKpi label="Avg Tenure at Exit" value="2.1y" delta="↓ from 2.8y FY25" sub="Top quartile leaving fastest" tone="warn" spark={[2.8, 2.7, 2.6, 2.45, 2.3, 2.2, 2.1]} />
      </section>

      <section className="space-y-5">
        <Panel title="Attrition by Business Unit" sub="Click any BU for exit intelligence drilldown" right={<span className="text-[10px] uppercase tracking-wider text-muted-foreground">12M rolling</span>}>
          <div className="space-y-1">
            {bus.map((b) => (
              <HBar
                key={b.name}
                label={b.name}
                value={b.v}
                max={b.max}
                tone={b.tone}
                meta={b.meta}
                onClick={() => d.open(buExitDrill(b.name, b.v))}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Monthly Attrition Trend" sub="12M actual + 3M forecast · incentive-cycle markers">
          <LineChart
            data={[
              { label: "Jun", value: 116 },
              { label: "Jul", value: 122 },
              { label: "Aug", value: 138 },
              { label: "Sep", value: 119 },
              { label: "Oct", value: 124 },
              { label: "Nov", value: 131 },
              { label: "Dec", value: 142 },
              { label: "Jan", value: 158 },
              { label: "Feb", value: 134 },
              { label: "Mar", value: 121 },
              { label: "Apr", value: 128 },
              { label: "May", value: 144 },
              { label: "JunF", value: 152, forecast: true },
              { label: "JulF", value: 161, forecast: true },
              { label: "AugF", value: 148, forecast: true },
            ]}
          />
          <div className="mt-3 rounded-md border border-dashed border-warning/40 bg-warning/5 px-3 py-2 text-xs text-foreground/85">
            <span className="font-semibold text-warning">AI · </span>
            Field sales attrition spikes consistently after incentive cycle (Dec–Jan, Aug).
          </div>
        </Panel>
      </section>

      <Panel title="Exit Interview Intelligence" sub="AI-clustered drivers across 480 interviews · click any row to inspect transcripts">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Reason</th>
                <th className="px-3 py-2 font-medium">% citing</th>
                <th className="px-3 py-2 font-medium">BU impacted</th>
                <th className="px-3 py-2 font-medium">AI recommendation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Better compensation elsewhere", "64%", "Field Sales", "Benchmark ITC/HUL compensation"],
                ["No visible career path", "48%", "Field Sales + Manufacturing", "Publish career ladders"],
                ["Territory overload", "41%", "Field Sales", "Territory redesign"],
                ["Manager quality", "29%", "Manufacturing + Hospitality", "Coaching program"],
                ["Skills anxiety — automation", "22%", "Manufacturing", "Reskilling communication"],
                ["Relocation / personal", "18%", "All businesses", "—"],
              ].map((row, i) => (
                <tr
                  key={i}
                  onClick={() => d.open(exitReasonDrill(row[0]))}
                  className="cursor-pointer border-t border-border odd:bg-background even:bg-muted/20 hover:bg-primary/5"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-foreground/85">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
        <div>
          <div className="font-display text-base font-semibold">Retention Action Plan</div>
          <div className="text-xs text-muted-foreground">AI-orchestrated · 6 workflows · 21-day cycle · Est. ₹14.8 Cr saving</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              d.open({
                title: "Retention Action Plan — generated",
                subtitle: "21-day cycle · 6 workflows · Owner: CHRO",
                sections: [
                  {
                    title: "Workflow bundle",
                    items: [
                      "Compensation correction — top quartile, +9% band shift",
                      "Career path rollout — RSO/ASM/TSM ladders published",
                      "Territory redesign — 38 routes rebalanced (N+E)",
                      "Manager coaching — 14 ASMs in cohort",
                      "Learning interventions — digital sales bootcamp",
                      "Hiring acceleration — 24 backfills · 18-day SLA",
                    ],
                  },
                ],
                recommendations: ["Approve and trigger from Board People Review on Friday"],
              })
            }
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Generate Retention Action Plan
          </button>
          <button
            onClick={() => d.open(buExitDrill("Field Sales North", 31))}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            View Field Sales Detail
          </button>
        </div>
      </section>

      {d.node}
    </ScreenShell>
  );
}
