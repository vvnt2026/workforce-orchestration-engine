import { Panel, PremiumKpi, ScreenShell, useDrill, HBar } from "./primitives";
import type { DrillData } from "../drilldowns";

const successorDrill = (name: string, role: string, ready: number): DrillData => ({
  title: `${name} — Successor profile`,
  subtitle: `Target role: ${role} · Readiness ${ready}%`,
  summary: [
    `${name} is the AI-ranked top successor for ${role}. Strengths in P&L delivery and team leadership; gap areas in cross-category exposure and external stakeholder management.`,
  ],
  metrics: [
    { label: "Readiness", value: `${ready}%`, tone: ready >= 80 ? "up" : ready >= 60 ? "warn" : "critical" },
    { label: "Tenure", value: "9.4 yrs" },
    { label: "Last promotion", value: "26 mo ago" },
    { label: "Flight risk", value: ready < 60 ? "Medium" : "Low", tone: ready < 60 ? "warn" : "up" },
  ],
  sections: [
    {
      title: "Readiness plan",
      items: [
        "Cross-BU rotation — 6 months in Hospitality Ops",
        "Board exposure — own 2 quarterly People reviews",
        "External coaching — 12 sessions with leadership coach",
      ],
    },
  ],
  recommendations: ["Confirm as primary successor", "Backfill plan from HiPo bench", "Re-rank in 90 days"],
});

export function SuccessionScreen() {
  const d = useDrill();
  const roles = [
    { role: "BU Head — Confectionery", incumbent: "S. Mehta", ready: "1 ready / 2 emerging", risk: "Low", successor: "A. Khanna", readiness: 82 },
    { role: "BU Head — Hospitality", incumbent: "R. Iyer", ready: "0 ready / 1 emerging", risk: "Critical", successor: "P. Verma", readiness: 48 },
    { role: "CHRO Direct — Manufacturing HR", incumbent: "V. Rao", ready: "2 ready / 3 emerging", risk: "Healthy", successor: "K. Nair", readiness: 88 },
    { role: "Practice Head — Brand Marketing", incumbent: "M. Bose", ready: "1 ready / 2 emerging", risk: "Watch", successor: "T. Ghosh", readiness: 71 },
    { role: "Practice Head — Field Sales", incumbent: "D. Singh", ready: "0 ready / 2 emerging", risk: "High", successor: "H. Yadav", readiness: 54 },
    { role: "CFO−1 — Group Finance Ops", incumbent: "A. Pillai", ready: "1 ready / 1 emerging", risk: "Watch", successor: "N. Saxena", readiness: 76 },
  ];
  return (
    <ScreenShell
      title="Succession Intelligence — DS Group"
      subtitle="27 critical roles · 58% bench coverage · 6 succession gaps flagged"
    >
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Critical Roles Tracked" value="27" sub="Top 3 layers of leadership" />
        <PremiumKpi label="Bench Coverage" value="58%" delta="Target 75%" sub="Ready + Emerging" tone="warn" />
        <PremiumKpi label="Succession Gaps" value="6" delta="Active gaps" sub="3 BU heads · 3 practice heads" tone="critical" />
        <PremiumKpi label="HiPo Pipeline" value="84" delta="Top 5%" sub="In structured development" tone="up" />
      </section>

      <Panel title="Critical Roles · Successor Readiness" sub="Click a row to inspect successor profile, readiness plan, and risk forecast">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Critical role</th>
                <th className="px-3 py-2 font-medium">Incumbent</th>
                <th className="px-3 py-2 font-medium">Bench</th>
                <th className="px-3 py-2 font-medium">Top successor</th>
                <th className="px-3 py-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr
                  key={r.role}
                  onClick={() => d.open(successorDrill(r.successor, r.role, r.readiness))}
                  className="cursor-pointer border-t border-border odd:bg-background even:bg-muted/20 hover:bg-primary/5"
                >
                  <td className="px-3 py-2 font-medium">{r.role}</td>
                  <td className="px-3 py-2 text-foreground/80">{r.incumbent}</td>
                  <td className="px-3 py-2 text-foreground/80">{r.ready}</td>
                  <td className="px-3 py-2">
                    {r.successor} <span className="text-xs text-muted-foreground">· {r.readiness}%</span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        r.risk === "Critical" || r.risk === "High"
                          ? "bg-destructive/15 text-destructive"
                          : r.risk === "Watch"
                          ? "bg-warning/20 text-warning"
                          : "bg-success/15 text-success"
                      }`}
                    >
                      {r.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="Leadership Pipeline Health" sub="Across 5 BUs">
          <div className="space-y-3">
            <HBar label="Confectionery" value={82} max={100} tone="up" meta="2 ready successors · healthy" />
            <HBar label="Hospitality" value={42} max={100} tone="critical" meta="South region bench depleted" />
            <HBar label="Field Sales" value={56} max={100} tone="warn" meta="HiPo runway thin in North" />
            <HBar label="Brand & Marketing" value={71} max={100} tone="warn" meta="2 readiness gaps closing" />
            <HBar label="Manufacturing" value={88} max={100} tone="up" meta="Strongest bench" />
          </div>
        </Panel>
        <Panel title="AI Succession Insight" sub="Confidence 88%">
          <div className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/85">
            <p>
              <span className="font-semibold text-primary">Insight · </span>
              Hospitality leadership bench strength is below target in South region. AI projects a 14-month exposure
              window if Manu Maharani GM retires on plan in Q1 2027.
            </p>
            <ul className="list-disc space-y-1 pl-4 text-foreground/80">
              <li>P. Verma (Le Marche) is closest internal successor at 48% readiness</li>
              <li>External shortlist of 3 candidates assembled by AI Sourcing Agent</li>
              <li>Recommended HiPo rotation: P. Verma → Manu Maharani 60-day shadowing in Q3</li>
            </ul>
          </div>
        </Panel>
      </section>

      {d.node}
    </ScreenShell>
  );
}
