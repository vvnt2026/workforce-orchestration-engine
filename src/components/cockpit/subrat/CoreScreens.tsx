import { HBar, Panel, PremiumKpi, ScreenShell, useDrill, LineChart, AiInsightBanner } from "./primitives";

export function TalentAcquisitionScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Talent Acquisition Intelligence"
      subtitle="87 open critical roles · AI-sourced shortlists · 41-day average time to fill"
    >
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 items-start">
        <PremiumKpi
          label="Open Roles"
          value="312"
          delta="87 critical"
          sub="Across 12 BUs"
          tone="warn"
          spark={[260, 268, 278, 290, 298, 305, 312]}
          ai="Brand & R&D positions are taking 41 days to fill vs industry average of 28 days. Employer brand strength in digital/marketing ranks below HUL/ITC. LinkedIn talent push needed."
        />
        <PremiumKpi label="Avg Time to Fill" value="41d" delta="Target 30d" sub="Brand · Supply Chain · Digital" tone="warn" spark={[48, 47, 45, 44, 42, 41, 41]} />
        <PremiumKpi label="AI Sourced Pipeline" value="2,184" delta="↑ 38% MoM" sub="Across 7 funnels" tone="up" spark={[1200, 1320, 1480, 1660, 1820, 1960, 2184]} />
        <PremiumKpi label="Offer Acceptance" value="71%" delta="↑ +6pp" sub="Top-quartile candidates" tone="up" spark={[62, 64, 66, 68, 69, 70, 71]} />
        <PremiumKpi label="Cost per Hire" value="₹86k" delta="↓ −9% QoQ" sub="AI sourcing efficiency" tone="up" spark={[102, 98, 94, 92, 90, 88, 86]} />
        <PremiumKpi label="Diversity Hires" value="34%" delta="Target 40%" sub="Last 6M intake" tone="warn" spark={[27, 28, 30, 31, 32, 33, 34]} />
        <PremiumKpi label="90-Day Retention" value="82%" delta="↑ +3pp" sub="New joiner stickiness" tone="up" spark={[76, 77, 78, 79, 80, 81, 82]} />
        <PremiumKpi label="Campus Conversions" value="68%" sub="IIM + NIFT + IHM intake" tone="up" spark={[58, 60, 62, 64, 65, 66, 68]} />
      </section>

      <AiInsightBanner
        title="Critical role velocity is improving — but Brand & Digital remain pressure points."
        description="AI Sourcing Agent surfaced 84 new passive candidates this week across Digital Brand Manager and Supply Chain Lead — 12 are warm-introduced through DS alumni."
        confidence={87}
        sources="ATS · LinkedIn signals · alumni graph · referral velocity"
        onAddActions={() =>
          d.open({
            title: "Sourcing acceleration bundle",
            sections: [
              {
                title: "Workflows",
                items: [
                  "Activate warm-intro outreach via 6 DS alumni",
                  "Open campus refresh for IIM Lucknow + ISB",
                  "Refer-a-Friend bonus pulse for 30 days",
                  "Diversity sourcing partnership extension",
                ],
              },
            ],
            recommendations: ["Target 18 critical roles closed in next 30 days"],
          })
        }
        onView={() =>
          d.open({
            title: "Critical Roles Pipeline",
            table: {
              columns: ["Role", "BU", "Days open", "Stage"],
              rows: [
                ["Digital Brand Manager", "Catch Spices", 38, "Final round"],
                ["Plant Manager", "Manufacturing Plant 2", 51, "Offer drafting"],
                ["Head of Sourcing", "Supply Chain", 44, "Shortlisted"],
                ["GM — Manu Maharani", "Hospitality", 62, "Search"],
                ["Sommelier", "L'Opera Delhi", 28, "Shortlisted"],
                ["Trade Marketing Lead", "Pulse", 33, "Final round"],
              ],
            },
          })
        }
      />

      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="Funnel Conversion" sub="Last 90 days">
          <div className="space-y-3">
            <HBar label="Sourced → Screened" value={62} max={100} tone="up" meta="↑ +4pp · AI screener live" />
            <HBar label="Screened → Interviewed" value={48} max={100} tone="warn" meta="Manager interview slot scarcity" />
            <HBar label="Interviewed → Offered" value={34} max={100} tone="warn" />
            <HBar label="Offered → Joined" value={71} max={100} tone="up" meta="71% acceptance" />
          </div>
        </Panel>
        <Panel title="Hiring Velocity Trend" sub="Joiners by month">
          <LineChart
            data={[
              { label: "Dec", value: 88 },
              { label: "Jan", value: 96 },
              { label: "Feb", value: 102 },
              { label: "Mar", value: 110 },
              { label: "Apr", value: 118 },
              { label: "May", value: 124 },
              { label: "JunF", value: 132, forecast: true },
              { label: "JulF", value: 138, forecast: true },
            ]}
          />
        </Panel>
      </section>

      {d.node}
    </ScreenShell>
  );
}

export function PerformanceScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Performance Intelligence"
      subtitle="Continuous performance signals across 7,700 employees · AI-calibrated · bias-checked"
    >
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 items-start">
        <PremiumKpi label="Goals on Track" value="74%" delta="↑ +3pp" sub="Mid-year cycle" tone="up" spark={[68, 69, 70, 72, 73, 74, 74]} />
        <PremiumKpi label="Calibration Coverage" value="91%" delta="Target 95%" sub="Managers calibrated" tone="up" spark={[78, 82, 85, 87, 89, 90, 91]} />
        <PremiumKpi label="Low Performers" value="6.2%" delta="3.4pp PIP active" sub="Manufacturing + Sales" tone="warn" />
        <PremiumKpi label="High Performers" value="18%" delta="2.4× exit risk" sub="Retention focus" tone="critical" spark={[16, 16.5, 17, 17.4, 17.7, 17.9, 18]} />
        <PremiumKpi label="9-Box Talent Mix" value="22% Stars" sub="Top-right quadrant" tone="up" />
        <PremiumKpi label="Manager Quality Index" value="68" delta="Target 78" sub="Bottom decile = 6 ASMs" tone="warn" />
        <PremiumKpi label="Bias-Risk Flags" value="14" delta="AI-detected" sub="Calibration outliers" tone="warn" />
        <PremiumKpi label="Recognition Rate" value="48%" delta="↑ +12pp" sub="Peer + manager recognition" tone="up" />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="Performance Distribution" sub="9-Box Talent Matrix · summarised">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              ["Future Leader", 6, "up"],
              ["High Performer", 12, "up"],
              ["Star", 22, "up"],
              ["Solid Contributor", 18, "default"],
              ["Core Player", 24, "default"],
              ["High Potential", 9, "up"],
              ["Underperformer", 3, "down"],
              ["Inconsistent", 4, "warn"],
              ["At Risk", 2, "critical"],
            ].map(([n, v, t]) => (
              <div
                key={n as string}
                className={`rounded-lg p-3 ${
                  t === "up"
                    ? "bg-success/10"
                    : t === "warn"
                    ? "bg-warning/10"
                    : t === "down" || t === "critical"
                    ? "bg-destructive/10"
                    : "bg-muted/40"
                }`}
              >
                <div className="font-display text-base font-semibold">{v}%</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{n}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="AI Calibration & Bias Watch" sub="Bias outliers flagged in last calibration cycle">
          <ul className="space-y-2 text-sm">
            {[
              ["Tenure halo — long tenure rated higher", "Manufacturing Plant 1", "Critical"],
              ["Gender skew in 'High Potential' ratings", "Sales North", "High"],
              ["Manager-cluster compression in 'Solid Contributor'", "Brand Marketing", "Watch"],
              ["Recency bias — recent project recall", "Corporate HQ", "Watch"],
            ].map(([t, scope, sev]) => (
              <li
                key={t}
                onClick={() =>
                  d.open({
                    title: `Bias flag — ${t}`,
                    subtitle: `${scope} · ${sev}`,
                    summary: ["AI calibration agent recommends a re-review session and a structured rubric refresh."],
                    recommendations: [
                      "Re-run calibration with anonymised inputs",
                      "Manager debrief with examples and counter-examples",
                      "Track delta in next cycle",
                    ],
                  })
                }
                className="cursor-pointer rounded-lg border border-border bg-background p-3 hover:border-primary"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium">{t}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      sev === "Critical"
                        ? "bg-destructive/15 text-destructive"
                        : sev === "High"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/15 text-success"
                    }`}
                  >
                    {sev}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{scope}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      {d.node}
    </ScreenShell>
  );
}

export function LearningScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Learning Intelligence"
      subtitle="Adaptive learning aligned to skills expiry · 744-worker reskilling wave in motion"
    >
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 items-start">
        <PremiumKpi label="L&D Adoption" value="64%" delta="↑ +9pp" sub="Active learners last 30d" tone="up" spark={[44, 48, 52, 55, 58, 61, 64]} />
        <PremiumKpi label="Reskilling Cohort" value="744" delta="Wave 1 · Q3" sub="Manufacturing automation" tone="warn" />
        <PremiumKpi label="Time to Competency" value="−28%" delta="AI-personalised" sub="vs classroom baseline" tone="up" />
        <PremiumKpi label="Certifications Earned" value="1,128" delta="↑ +22% QoQ" sub="External + internal" tone="up" spark={[680, 750, 820, 890, 960, 1040, 1128]} />
        <PremiumKpi label="Manager-led Coaching" value="38%" delta="Target 60%" sub="Adoption gap" tone="warn" />
        <PremiumKpi label="Critical Skill Coverage" value="48%" delta="↑ +14pp" sub="Across 12 clusters" tone="warn" />
        <PremiumKpi label="Content Effectiveness" value="4.4 / 5" sub="AI relevance + outcomes" tone="up" />
        <PremiumKpi label="Spend per Learner" value="₹6,400" delta="−12% YoY" sub="AI authoring saves cost" tone="up" />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="Skill Cluster Coverage" sub="Critical skills mapped to expiring roles">
          <div className="space-y-3">
            <HBar label="Digital Sales & Route AI" value={36} max={100} tone="critical" meta="Field Sales · 612 RSOs in scope" />
            <HBar label="Plant Automation & PLC" value={42} max={100} tone="warn" meta="540 packaging operators · Q4 trigger" />
            <HBar label="QA Vision Systems" value={58} max={100} tone="warn" meta="184 QA inspectors" />
            <HBar label="Self-serve Analytics" value={62} max={100} tone="warn" meta="281 trade-marketing analysts" />
            <HBar label="Generative Design (Pre-press)" value={71} max={100} tone="up" />
            <HBar label="Adaptive Learning Facilitation" value={48} max={100} tone="warn" meta="74 L&D facilitators" />
          </div>
        </Panel>
        <Panel title="Reskilling Wave 1 · Manufacturing 744" sub="Cohort overview">
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Cohort size", "744"],
                ["Active", "612"],
                ["Completed", "118"],
                ["At-risk learners", "34"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-md bg-secondary/60 p-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
                  <div className="font-display text-base font-semibold">{v}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                d.open({
                  title: "Reskilling Wave 1 · Drilldown",
                  subtitle: "Manufacturing · 744 workers · Q3 2026 launch",
                  sections: [
                    {
                      title: "Modules",
                      items: [
                        "PLC fundamentals · 12 hours",
                        "Automation co-working safety · 6 hours",
                        "Quality vision systems orientation · 8 hours",
                        "Digital workflow & shift handover · 4 hours",
                      ],
                    },
                  ],
                  recommendations: [
                    "Shift-line scheduling to release 2 hours/week per worker",
                    "Buddy assignment from advanced-skill peers",
                    "AI nudges for 34 at-risk learners",
                  ],
                })
              }
              className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              Open cohort plan
            </button>
          </div>
        </Panel>
      </section>

      {d.node}
    </ScreenShell>
  );
}
