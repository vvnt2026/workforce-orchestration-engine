import { useState } from "react";
import type { Persona, Kpi } from "./data";
import { DrillSheet } from "./DrillSheet";
import { CopilotChat } from "./CopilotChat";
import {
  getKpiDrill,
  getActionDrill,
  getAttentionDrill,
  type DrillData,
} from "./drilldowns";
import { useWorkforceStore, type AttentionStatus } from "@/hooks/useWorkforceStore";

const toneStyles: Record<string, string> = {
  default: "text-muted-foreground",
  up: "text-success",
  down: "text-destructive",
  warn: "text-warning",
  critical: "text-destructive font-medium",
};

const levelStyles: Record<"critical" | "warn" | "good", { dot: string; ring: string; label: string }> = {
  critical: { dot: "bg-destructive", ring: "ring-destructive/20", label: "Critical" },
  warn: { dot: "bg-warning", ring: "ring-warning/20", label: "Warning" },
  good: { dot: "bg-success", ring: "ring-success/20", label: "Healthy" },
};

const statusStyles: Record<AttentionStatus, string> = {
  Open: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  Done: "bg-success/10 text-success border-success/20",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
};

const KPI_INFERENCES: Record<string, string> = {
  "subrat:Skills Expiry Risk":
    "71% of the risk sits in Manufacturing and Field Sales digital skills. Recommendation: launch Wave 1 reskilling for 744 employees before Q4 2026 automation lands.",
  "subrat:Open Critical Roles":
    "Brand, Digital and R&D roles are now stretching transformation timelines. Recommendation: unlock external search plus an internal fast-track slate for the top 20 roles.",
  "subrat:Transformation Index":
    "Field Sales CRM and Plant Automation are the main drag on the index. Recommendation: ring-fence Q3 capacity for the two delayed workstreams.",
  "subrat:Engagement Score":
    "Top drivers: workload, manager quality and overtime-led heat stress in Manufacturing. Recommendation: start Plant 2 manager coaching and a workload reset this month.",
  "subrat:Digital Talent Ratio":
    "Sales and Brand carry the biggest digital capability gap versus the 2027 target. Recommendation: prioritise CRM, analytics and self-serve BI cohorts in those functions first.",
};

function KpiCard({ kpi, onClick }: { kpi: Kpi; onClick: () => void }) {
  const inference = kpi.ai ?? KPI_INFERENCES[`subrat:${kpi.label}`];

  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-border bg-card p-4 text-left shadow-card transition-shadow hover:shadow-elevated focus:outline-none focus:ring-2 focus:ring-primary/40 h-full w-full flex flex-col"
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground w-full">
        {kpi.label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2 w-full">
        <span className="font-display text-2xl font-semibold text-foreground">{kpi.value}</span>
        {kpi.signal && (
          <span className={`text-xs ${toneStyles[kpi.tone ?? "default"]}`}>{kpi.signal}</span>
        )}
      </div>
      {kpi.sub && <div className="mt-1 text-xs text-muted-foreground w-full">{kpi.sub}</div>}
      {inference && (
        <div className="mt-2 rounded-md border border-dashed border-primary/30 bg-primary/5 px-2 py-1 text-[10px] leading-snug text-primary w-full">
          <span className="font-semibold">AI · </span>
          {inference}
        </div>
      )}
      <div className="mt-auto pt-2 text-[10px] font-medium uppercase tracking-wider text-primary/80 w-full">
        View drill-down →
      </div>
    </button>
  );
}

type DrillKind = "kpi" | "action" | "attention" | "copilot";

export function CockpitContent({ persona }: { persona: Persona }) {
  const [drill, setDrill] = useState<{ data: DrillData; kind: DrillKind } | null>(null);
  const open = (data: DrillData, kind: DrillKind) => setDrill({ data, kind });

  const {
    getPersonaAttention,
    updateItemStatus,
    escalateItem,
    activateBuddyNudge,
    buddyNudgeActivated,
    stats,
    getDrilldownData,
    attentionItems,
  } = useWorkforceStore();

  const [activeSelectId, setActiveSelectId] = useState<string | null>(null);
  const [showArjunPanel, setShowArjunPanel] = useState(false);

  const attention = getPersonaAttention(persona.id);
  const arjunAttention = getPersonaAttention("arjun");

  // Compute display KPIs: Subrat gets the dynamic "Action Completion Rate" KPI card at the start
  const displayKpis: Kpi[] =
    persona.id === "subrat"
      ? [
          {
            label: "Action Completion Rate",
            value: `${stats.completionRate}%`,
            signal: `${stats.open} open · ${stats.overdue} overdue`,
            sub: "This week · Group roll-up",
            tone: stats.overdue > 0 ? ("critical" as const) : stats.open > 0 ? ("warn" as const) : ("up" as const),
          },
          ...persona.kpis,
        ]
      : persona.kpis;

  // Calculate 48h warning nudges: Critical items that are Open and older than 48 hours
  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const criticalOverdueNudges = attention.filter(
    (item) =>
      item.level === "critical" &&
      item.status === "Open" &&
      new Date(item.createdAt) < fortyEightHoursAgo
  );

  // Items escalated to the CHRO (from Ravi, Vikram, Kavita)
  const escalatedItems = attentionItems.filter((item) => item.escalatedToChro);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-8">
      {/* Header block */}
      <section className="rounded-2xl border border-border bg-gradient-hero p-6 text-white shadow-elevated lg:p-8">
        <div className="flex flex-wrap items-start gap-6">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-semibold ${
              persona.accent === "gold"
                ? "bg-gradient-gold text-gold-foreground"
                : "bg-gradient-primary text-primary-foreground"
            }`}
          >
            {persona.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow pulse-dot" />
              Live Cockpit · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </div>
            <h1 className="mt-1 font-display text-2xl font-semibold lg:text-3xl">{persona.name}</h1>
            <div className="mt-1 text-sm text-white/75">{persona.role}</div>
            <div className="mt-0.5 text-xs text-white/55">{persona.meta}</div>
          </div>
        </div>
        <p className="mt-6 max-w-4xl text-balance text-[15px] leading-relaxed text-white/85">
          {persona.greeting}
        </p>
      </section>

      {/* 48hr Overdue Critical Alert Nudges */}
      {criticalOverdueNudges.length > 0 && (
        <div className="space-y-2">
          {criticalOverdueNudges.map((nudge) => (
            <div
              key={nudge.id}
              className="relative overflow-hidden rounded-xl border border-destructive/30 bg-destructive/5 p-4 shadow-card flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive text-white font-bold animate-pulse">
                  ⚠️
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-destructive font-semibold">
                    Critical Alert
                  </div>
                  <div className="font-display text-sm font-semibold text-foreground mt-0.5">
                    {nudge.title}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 max-w-xl">
                    This critical item remains unresolved. Recommended: {nudge.rec}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {nudge.escalatedToChro ? (
                  <button
                    type="button"
                    className="rounded-md bg-destructive px-3.5 py-1.5 text-xs font-medium text-white hover:bg-destructive/90 transition-colors"
                  >
                    Take Action
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      escalateItem(nudge.id);
                      alert(`Action "${nudge.title}" has been escalated to CHRO Subrat Chakravarty.`);
                    }}
                    className="rounded-md bg-destructive px-3.5 py-1.5 text-xs font-medium text-white hover:bg-destructive/90 transition-colors"
                  >
                    Take Action
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CHRO Escalated Issues panel */}
      {persona.id === "subrat" && escalatedItems.length > 0 && (
        <section className="rounded-2xl border border-warning/30 bg-warning/5 p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning text-white font-bold animate-pulse">
              🚨
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                Escalated Critical Issues from Business Units
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Urgent items escalated by regional managers needing CHRO intervention or budget approval
              </p>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            {escalatedItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-warning/10 px-2 py-0.5 text-[9px] font-semibold uppercase text-warning border border-warning/20">
                      Escalated
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      From: {item.personaId.toUpperCase()} (Plant / Sales)
                    </span>
                  </div>
                  <div className="font-medium text-sm mt-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.detail}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateItemStatus(item.id, "Done");
                      alert(`Escalated item "${item.title}" approved and resolved.`);
                    }}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                  >
                    Approve & Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KPI Grid */}
      <section>
        <SectionHeader title="Control Tower" sub="Click any KPI for drill-down" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {displayKpis.map((k) => (
            <KpiCard
              key={k.label}
              kpi={k}
              onClick={() => {
                if (k.label === "Action Completion Rate") {
                  open(getDrilldownData(), "kpi");
                } else {
                  open(getKpiDrill(persona.id, k), "kpi");
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* Insight + Agent Activity */}
      <section className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-sm text-primary-foreground">
                AI
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  AI Insight
                </div>
                <div className="font-display text-base font-semibold">{persona.insight.title}</div>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              {persona.insight.confidenceRange
                ? `${persona.insight.confidenceRange[0]}–${persona.insight.confidenceRange[1]}% confidence`
                : `${persona.insight.confidence}% confidence`}
            </div>
          </div>
          {(persona.insight.sampleSize || persona.insight.window) && (
            <div className="mt-2 text-[11px] text-muted-foreground">
              {[persona.insight.sampleSize, persona.insight.window].filter(Boolean).join(" · ")}
            </div>
          )}
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/85">
            {persona.insight.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/40 p-3 text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground/70">Sources:</span> {persona.insight.sources}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {persona.insight.stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-secondary/60 p-3">
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-foreground">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => open(getActionDrill(persona.id, persona.insight.actions[0]), "action")}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {persona.insight.actions[0]}
            </button>
            <button
              onClick={() => open(getActionDrill(persona.id, persona.insight.actions[1]), "action")}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {persona.insight.actions[1]}
            </button>
            <button
              onClick={() =>
                alert(
                  "Feedback logged. The AI will retrain on this signal and reduce confidence on similar patterns in this cohort.",
                )
              }
              className="ml-auto rounded-md border border-dashed border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-destructive hover:text-destructive"
            >
              This looks wrong →
            </button>
          </div>
          <div className="mt-3 border-t border-dashed border-border pt-2 text-[10px] text-muted-foreground">
            Generated {persona.insight.runAt ?? "07:12"} · {persona.insight.agentVersion ?? "Agent v2.1"} · View run log →
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
          <SectionHeader title="Agent Activity" sub="Overnight runs" inline />
          <ul className="mt-4 space-y-3 text-sm">
            {(persona.agentRuns ?? [
              { name: "Skills Agent", what: "Mapped expiry profiles", time: "02:14" },
              { name: "Attrition Agent", what: "Flight risk model updated", time: "04:32" },
              { name: "Learning Agent", what: "Adoption report compiled", time: "05:17" },
              { name: "Succession Agent", what: "HiPo matches identified", time: "06:04" },
              { name: "Analytics Agent", what: "Board review auto-compiled", time: "06:48" },
              { name: "Transform Agent", what: "Index updated · 8 initiatives", time: "07:12" },
            ])
              .slice(0, persona.agents)
              .map((r) => (
                <li key={r.name} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary pulse-dot" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">{r.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{r.what}</div>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{r.time}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Attention Items */}
      <section>
        <SectionHeader title="What Needs Your Attention" sub={`${attention.length} items prioritised by AI · click status to edit`} />
        <div className="space-y-2">
          {attention.map((a) => {
            if (persona.id === "vikram" && a.id === "vikram-arjun-risk") {
              return (
                <div key={a.id} className="rounded-xl border border-warning/40 bg-warning/5 p-4 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning">
                      Warning
                    </span>
                    <button
                      onClick={() => setActiveSelectId(activeSelectId === a.id ? null : a.id)}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${statusStyles[a.status]}`}
                    >
                      {a.status}
                    </button>
                  </div>
                  {activeSelectId === a.id && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(["Open", "In Progress", "Done", "Overdue"] as AttentionStatus[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            updateItemStatus(a.id, st);
                            setActiveSelectId(null);
                          }}
                          className={`rounded px-2 py-1 text-[10px] font-semibold border ${statusStyles[st]}`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 font-medium text-foreground">{a.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{a.detail}</div>
                  <div className="mt-3 rounded-lg border border-warning/30 bg-background p-3 text-xs">
                    <div className="font-semibold text-foreground">Replacement cost: ₹84,000 · Intervention cost: ₹400</div>
                    <div className="mt-1 text-muted-foreground">buddy call + manager SMS</div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={activateBuddyNudge}
                      className="rounded-md bg-warning px-3 py-1.5 text-xs font-medium text-warning-foreground hover:opacity-90"
                    >
                      Activate buddy nudge
                    </button>
                    <button
                      onClick={() => updateItemStatus(a.id, "In Progress")}
                      className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
                    >
                      Send manager SMS to Rahul TSM
                    </button>
                    <button
                      onClick={() => setShowArjunPanel(true)}
                      className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
                    >
                      View Arjun&apos;s profile
                    </button>
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    Early Attrition Risk Agent · Run 05:31 · Confidence 58% · 847-record cohort
                  </div>
                </div>
              );
            }
            const s = levelStyles[a.level];
            return (
              <div
                key={a.id}
                className={`flex flex-wrap items-start gap-4 rounded-xl border border-border bg-card p-4 ring-1 ${s.ring} shadow-card transition-shadow hover:shadow-elevated`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </span>
                  </div>

                  {/* Stateful Click-to-edit Status Pill */}
                  <div className="relative">
                    {activeSelectId === a.id ? (
                      <div className="absolute left-0 top-0 z-20 flex items-center gap-1 rounded-lg border border-border bg-surface-elevated p-1 shadow-elevated">
                        {(["Open", "In Progress", "Done", "Overdue"] as AttentionStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateItemStatus(a.id, st);
                              setActiveSelectId(null);
                            }}
                            className={`rounded px-2 py-1 text-[10px] font-semibold border transition-colors ${statusStyles[st]} hover:opacity-85`}
                          >
                            {st}
                          </button>
                        ))}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSelectId(null);
                          }}
                          className="rounded px-2 py-1 text-[10px] font-semibold border border-border bg-background text-foreground/80 hover:bg-muted"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSelectId(a.id);
                        }}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${statusStyles[a.status]} hover:opacity-85 flex items-center gap-1.5`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            a.status === "Done"
                              ? "bg-success"
                              : a.status === "Overdue"
                              ? "bg-destructive"
                              : a.status === "In Progress"
                              ? "bg-warning"
                              : "bg-blue-400"
                          }`}
                        />
                        {a.status}
                        <span className="text-[8px] opacity-60">▼</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground">{a.title}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{a.detail}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/70">Recommended:</span> {a.rec}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden text-xs text-muted-foreground sm:inline">{a.when}</span>
                  <button
                    onClick={() => open(getAttentionDrill(persona.id, a), "attention")}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
                  >
                    {a.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Copilot */}
      <CopilotChat persona={persona} />

      {persona.id === "vikram" && showArjunPanel && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowArjunPanel(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-border bg-background p-5 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Arjun Rawat · Read-only Profile</h3>
              <button onClick={() => setShowArjunPanel(false)} className="text-sm text-muted-foreground">Close</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["Aaj ka store target", "6"],
                ["Is mahine ke orders", "7 / 15"],
                ["Meri kamai", "₹4,800"],
                ["Probation countdown", "72 days"],
                ["Learning progress", "4 / 6"],
                ["Batch ranking", "12 / 38"],
                ["Buddy connect", buddyNudgeActivated ? "Deepak ne message kiya — aaj baat karo 🤝" : "4 days gap"],
                ["Badges earned", "2"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-card p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-border bg-card p-4">
              <div className="text-sm font-medium text-foreground">Arjun&apos;s progress items</div>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                {arjunAttention.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-md border border-border px-2 py-1.5">
                    <span className="truncate pr-2">{item.title}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] border ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Intervene
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-border pt-6 text-xs text-muted-foreground">
        DS Group · Agentic Workforce Platform · Built for People & Process Transformation
      </footer>

      <DrillSheet
        open={!!drill}
        onOpenChange={(v) => !v && setDrill(null)}
        data={drill?.data ?? null}
        kind={drill?.kind ?? "kpi"}
      />
    </div>
  );
}

function SectionHeader({ title, sub, inline }: { title: string; sub?: string; inline?: boolean }) {
  return (
    <div className={inline ? "flex items-baseline justify-between" : "mb-3 flex items-baseline justify-between"}>
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
    </div>
  );
}
