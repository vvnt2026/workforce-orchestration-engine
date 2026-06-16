import { HBar, Panel, PremiumKpi, ScreenShell, useDrill } from "./primitives";
import type { DrillData } from "../drilldowns";

const phaseDrill = (phase: string, status: number): DrillData => ({
  title: `Transformation phase — ${phase}`,
  subtitle: `Status ${status}% · AI-orchestrated workstreams`,
  summary: [
    `Phase ${phase} is being orchestrated by 3 AI Colleagues across people, process, and technology workstreams.`,
  ],
  metrics: [
    { label: "Completion", value: `${status}%`, tone: status >= 70 ? "up" : status >= 40 ? "warn" : "critical" },
    { label: "Workstreams", value: "4" },
    { label: "Owners", value: "6 leaders" },
    { label: "Target date", value: status >= 70 ? "Q4 2026" : "Q1 2027" },
  ],
  sections: [
    {
      title: "Key milestones",
      items: [
        "Foundational data layer migrated",
        "AI Copilots deployed for HRBPs across 5 BUs",
        "Workforce orchestration agents live for 8 workflows",
        "Board reporting auto-compilation enabled",
      ],
    },
  ],
  recommendations: ["Lock Q3 milestones in next Board People Review", "Re-baseline KPIs after Phase 3 ships"],
});

export function TransformationRoadmapScreen() {
  const d = useDrill();
  const phases = [
    { name: "Phase 1 · HR Digitisation", status: 92, tone: "up" as const, dates: "Q2 2025 → Q1 2026" },
    { name: "Phase 2 · AI Copilots", status: 74, tone: "up" as const, dates: "Q1 2026 → Q3 2026" },
    { name: "Phase 3 · Workforce Orchestration", status: 42, tone: "warn" as const, dates: "Q2 2026 → Q4 2026" },
    { name: "Phase 4 · Predictive Workforce Intelligence", status: 18, tone: "critical" as const, dates: "Q4 2026 → Q2 2027" },
  ];

  return (
    <ScreenShell
      title="Transformation Roadmap"
      subtitle="People + Process AI transformation · 4 phases · 11 strategic initiatives"
    >
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 items-start">
        <PremiumKpi label="Transformation Index" value="42%" delta="Target 65%" sub="People + Process combined" tone="warn" spark={[28, 30, 33, 36, 38, 40, 42]} />
        <PremiumKpi label="AI Adoption" value="38%" delta="↑ +14pp" sub="HRBPs + line managers" tone="up" spark={[12, 18, 22, 26, 30, 34, 38]} />
        <PremiumKpi label="Process Automation" value="48 workflows" delta="↑ +12 QoQ" sub="HR + workforce ops" tone="up" spark={[12, 18, 24, 30, 36, 42, 48]} />
        <PremiumKpi label="Workforce Readiness" value="61%" delta="Target 80% by Q4" sub="Skills + behavior change" tone="warn" spark={[42, 46, 50, 53, 56, 58, 61]} />
      </section>

      <Panel title="Transformation Phases" sub="Click a phase for workstreams and milestone drilldown">
        <div className="space-y-4">
          {phases.map((p, i) => (
            <button
              key={p.name}
              onClick={() => d.open(phaseDrill(p.name, p.status))}
              className="group block w-full rounded-xl border border-border bg-background p-4 text-left transition-shadow hover:shadow-card"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="font-display text-sm font-semibold">{p.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{p.dates}</span>
              </div>
              <div className="mt-3">
                <HBar label="Completion" value={p.status} max={100} tone={p.tone} meta={`${p.status}% complete · click for milestones`} />
              </div>
            </button>
          ))}
        </div>
      </Panel>

      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="AI Predicted Shifts" sub="Forward look · 18 months">
          <ul className="space-y-2 text-sm">
            {[
              ["Skill shifts", "37% of current critical skills replaced or augmented by AI tooling by Q4 2026."],
              ["Workforce redesign", "12 role families re-banded; 4 new role families created (Workforce AI Steward, Insight Designer, Skills Architect, Automation Lead)."],
              ["Role transformation", "62% of HRBP work shifts to advisory + interpretation, 38% remains transactional under AI Copilot supervision."],
            ].map(([t, b]) => (
              <li key={t} className="rounded-lg border border-border bg-background p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">{t}</div>
                <div className="mt-1 text-foreground/80">{b}</div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="11 Strategic Initiatives" sub="People + Process initiatives tracked by AI Transform Agent">
          <ul className="space-y-1.5 text-xs">
            {[
              ["Skills Operating System", "On track"],
              ["AI Copilot for HRBPs", "On track"],
              ["Field Sales Retention Engine", "Watch"],
              ["Plant Welfare Predictive", "On track"],
              ["Succession Intelligence", "On track"],
              ["Workforce Orchestration Bus", "Watch"],
              ["Board Reporting Automation", "On track"],
              ["Manager Quality Coaching", "Behind"],
              ["Inclusive Sourcing Engine", "On track"],
              ["Compensation Intelligence", "Watch"],
              ["L&D Personalisation", "Behind"],
            ].map(([n, s]) => (
              <li key={n} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-1.5">
                <span>{n}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    s === "On track"
                      ? "bg-success/15 text-success"
                      : s === "Watch"
                      ? "bg-warning/20 text-warning"
                      : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      {d.node}
    </ScreenShell>
  );
}
