import { useState, type ReactNode } from "react";
import { DrillSheet } from "../DrillSheet";
import type { DrillData } from "../drilldowns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// ============================================================
// Shared primitives
// ============================================================

export function ScreenShell({
  title,
  subtitle,
  eyebrow = "Subrat Chakravarty · CHRO Workspace",
  copilotPrompts,
  children,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  copilotPrompts?: string[];
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-8">
      <header className="rounded-2xl border border-border bg-gradient-hero p-6 text-white shadow-elevated">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow pulse-dot" />
          {eyebrow}
        </div>
        <h1 className="mt-1.5 font-display text-2xl font-semibold lg:text-3xl">{title}</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-white/75">{subtitle}</p>
      </header>
      {children}
      <AiCopilotRail prompts={copilotPrompts} />
    </div>
  );
}

const toneText: Record<string, string> = {
  default: "text-foreground",
  up: "text-success",
  down: "text-destructive",
  warn: "text-warning",
  critical: "text-destructive",
};

const toneRing: Record<string, string> = {
  default: "ring-border",
  up: "ring-success/20",
  down: "ring-destructive/20",
  warn: "ring-warning/30",
  critical: "ring-destructive/30",
};

export function PremiumKpi({
  label,
  value,
  delta,
  sub,
  tone = "default",
  spark,
  ai,
  signalBasis,
  infoText,
  onClick,
}: {
  label: string;
  value: string;
  delta?: string;
  sub?: string;
  tone?: keyof typeof toneText;
  spark?: number[];
  ai?: string;
  signalBasis?: string;
  infoText?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-4 text-left shadow-card ring-1 transition-all hover:-translate-y-0.5 hover:shadow-elevated h-[220px] md:h-[200px] w-full flex flex-col ${toneRing[tone]}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-2 w-full">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        {delta && <span className={`text-[11px] font-medium ${toneText[tone]}`}>{delta}</span>}
      </div>
      <div className="mt-1.5 flex items-end gap-2 w-full">
        <span className={`font-display text-2xl font-semibold ${toneText[tone]}`}>{value}</span>
        {infoText && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[10px] font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                aria-label={`More information about ${label}`}
              >
                i
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 text-[11px] leading-relaxed">
              {infoText}
            </PopoverContent>
          </Popover>
        )}
        {spark && <Sparkline points={spark} tone={tone} />}
      </div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
      {ai && (
        <div className="mt-2 rounded-md border border-dashed border-primary/30 bg-primary/5 px-2 py-1 text-[10px] leading-snug text-primary w-full overflow-y-auto max-h-[60px]">
          <span className="font-semibold">AI · </span>
          {ai}
        </div>
      )}
      {signalBasis && (
        <div className="mt-auto pt-2 text-[10px] text-muted-foreground w-full">
          <span className="font-medium text-foreground/70">Signal basis:</span> {signalBasis}
        </div>
      )}
    </button>
  );
}

function Sparkline({ points, tone = "default" }: { points: number[]; tone?: keyof typeof toneText }) {
  const w = 70;
  const h = 22;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke =
    tone === "down" || tone === "critical"
      ? "var(--destructive)"
      : tone === "warn"
      ? "var(--warning)"
      : "var(--primary)";
  return (
    <svg width={w} height={h} className="ml-auto opacity-80">
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

export function AiInsightBanner({
  title,
  description,
  confidence,
  confidenceRange,
  sampleSize,
  window,
  runAt,
  agentVersion,
  sources,
  signalBasis,
  onAddActions,
  onView,
  onDisagree,
}: {
  title: string;
  description: string;
  confidence: number;
  confidenceRange?: [number, number];
  sampleSize?: string;
  window?: string;
  runAt?: string;
  agentVersion?: string;
  sources: string;
  signalBasis?: string;
  onAddActions: () => void;
  onView: () => void;
  onDisagree?: () => void;
}) {
  const conf = confidenceRange
    ? `${confidenceRange[0]}–${confidenceRange[1]}%`
    : `${confidence}%`;
  const meta = [sampleSize, window].filter(Boolean).join(" · ");
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-card">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative flex flex-wrap items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-glow">
          AI
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">AI Insight</div>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
              {conf} confidence
            </span>
            {meta && (
              <span className="text-[11px] text-muted-foreground">· {meta}</span>
            )}
          </div>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{description}</p>
          <div className="mt-2 text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground/70">Sources:</span> {sources}
          </div>
          {signalBasis && (
            <div className="mt-1 text-[11px] text-muted-foreground">
              <span className="font-medium text-foreground/70">Signal basis:</span> {signalBasis}
            </div>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={onAddActions}
            className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            Add Actions
          </button>
          <button
            onClick={onView}
            className="rounded-md border border-border bg-background px-4 py-2 text-xs font-medium hover:bg-muted"
          >
            View Analysis
          </button>
          <button
            onClick={
              onDisagree ??
              (() =>
                alert(
                  "Feedback logged. The AI will retrain on this signal and reduce confidence on similar patterns in this cohort.",
                ))
            }
            className="rounded-md border border-dashed border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:border-destructive hover:text-destructive"
          >
            This looks wrong →
          </button>
        </div>
      </div>
      <div className="relative mt-4 border-t border-dashed border-border pt-2 text-[10px] text-muted-foreground">
        Generated {runAt ?? "07:12"} · {agentVersion ?? "Agent v2.1"} · View run log →
      </div>
    </section>
  );
}


export function Panel({
  title,
  sub,
  right,
  children,
}: {
  title: string;
  sub?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">{title}</h2>
          {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function AiCopilotRail({ prompts }: { prompts?: string[] }) {
  const list = prompts ?? [
    "Predict next quarter attrition hotspots",
    "Which businesses have leadership gaps?",
    "Show workforce cost optimization",
    "Compare attrition with industry benchmarks",
    "Which regions need intervention first?",
  ];
  return (
    <section className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-5 shadow-card">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-xs font-semibold text-primary-foreground">
          AI
        </div>
        <div>
          <div className="font-display text-sm font-semibold">Ask DSG Disha</div>
          <div className="text-[11px] text-muted-foreground">Grounded in this screen · explainable reasoning</div>
        </div>
        <span className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
          Online
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {list.map((q) => (
          <button
            key={q}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 hover:border-primary hover:bg-primary/5"
          >
            {q}
          </button>
        ))}
      </div>
    </section>
  );
}

export function useDrill() {
  const [drill, setDrill] = useState<DrillData | null>(null);
  return {
    drill,
    open: (d: DrillData) => setDrill(d),
    close: () => setDrill(null),
    node: (
      <DrillSheet
        open={!!drill}
        onOpenChange={(v) => !v && setDrill(null)}
        data={drill}
        kind="kpi"
      />
    ),
  };
}

// ============================================================
// Mini chart primitives
// ============================================================

export function HBar({
  label,
  value,
  max,
  tone = "default",
  meta,
  onClick,
}: {
  label: string;
  value: number;
  max: number;
  tone?: keyof typeof toneText;
  meta?: string;
  onClick?: () => void;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const bar =
    tone === "critical" || tone === "down"
      ? "bg-destructive"
      : tone === "warn"
      ? "bg-warning"
      : tone === "up"
      ? "bg-success"
      : "bg-primary";
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-lg p-2 text-left transition-colors hover:bg-muted/40"
    >
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className={`font-semibold ${toneText[tone]}`}>{value}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${bar} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      {meta && <div className="mt-1 text-[10px] text-muted-foreground">{meta}</div>}
    </button>
  );
}

export function LineChart({ data, height = 140 }: { data: { label: string; value: number; forecast?: boolean }[]; height?: number }) {
  const w = 600;
  const h = height;
  const padding = 24;
  const values = data.map((d) => d.value);
  const min = Math.min(...values) * 0.9;
  const max = Math.max(...values) * 1.05;
  const range = max - min || 1;
  const x = (i: number) => padding + (i / (data.length - 1)) * (w - padding * 2);
  const y = (v: number) => h - padding - ((v - min) / range) * (h - padding * 2);
  const linePts = data.map((d, i) => `${x(i)},${y(d.value)}`).join(" ");
  const area = `M${x(0)},${h - padding} L${linePts} L${x(data.length - 1)},${h - padding} Z`;
  const forecastStart = data.findIndex((d) => d.forecast);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      <defs>
        <linearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lc)" />
      <polyline points={linePts} fill="none" stroke="var(--primary)" strokeWidth="2" />
      {forecastStart > 0 && (
        <rect
          x={x(forecastStart)}
          y={padding}
          width={w - padding - x(forecastStart)}
          height={h - padding * 2}
          fill="var(--warning)"
          opacity="0.06"
        />
      )}
      {data.map((d, i) => (
        <g key={d.label}>
          <circle cx={x(i)} cy={y(d.value)} r="3" fill="var(--primary)" />
          <text x={x(i)} y={h - 6} fontSize="9" fill="var(--muted-foreground)" textAnchor="middle">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function RadarChart({ axes }: { axes: { label: string; value: number }[] }) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 90;
  const n = axes.length;
  const pt = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const poly = axes
    .map((a, i) => {
      const [x, y] = pt(i, (a.value / 100) * radius);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full max-w-[260px]">
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon
          key={r}
          points={Array.from({ length: n }, (_, i) => {
            const [x, y] = pt(i, radius * r);
            return `${x},${y}`;
          }).join(" ")}
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.6"
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, radius);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth="0.6" />;
      })}
      <polygon points={poly} fill="var(--primary)" fillOpacity="0.25" stroke="var(--primary)" strokeWidth="1.5" />
      {axes.map((a, i) => {
        const [x, y] = pt(i, radius + 14);
        return (
          <text key={a.label} x={x} y={y} fontSize="10" fill="var(--foreground)" textAnchor="middle" dominantBaseline="middle">
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

// ============================================================
// Drilldown builders
// ============================================================

const REGION_DATA: Record<string, DrillData> = {
  North: {
    title: "North Region — Workforce Deep Dive",
    subtitle: "4,312 workforce · 33% sales attrition · Productivity 82 · Engagement 66",
    summary: [
      "North carries the highest combined risk: attrition, territory pressure and a 12% pay gap. AI flags 3 high-impact interventions.",
    ],
    metrics: [
      { label: "Workforce", value: "4,312" },
      { label: "Attrition", value: "33%", tone: "critical" },
      { label: "Productivity", value: "82", tone: "warn" },
      { label: "Engagement", value: "66", tone: "down" },
    ],
    table: {
      columns: ["Cluster", "Headcount", "Attrition", "Top exit driver"],
      rows: [
        ["Field Sales RSO", 900, "33%", "Compensation gap −12%"],
        ["Merchandisers", 190, "24%", "Seasonal contract churn"],
        ["ASM / TSM", 112, "18%", "Career ceiling"],
        ["Trade Marketing", 38, "14%", "Workload"],
      ],
    },
    recommendations: [
      "Territory rebalance — move 12 routes from overloaded to under-utilised RSOs",
      "Top-quartile comp correction +9% for retention-critical 84 RSOs",
      "Manager coaching for 6 lowest-scoring ASMs in the region",
    ],
  },
  East: {
    title: "East Region — Workforce Deep Dive",
    subtitle: "2,086 · 29% · Productivity 85 · Engagement 69",
    summary: [
      "East's risk is payout-driven: delayed incentives push RSO exits. AI flags 2 interventions.",
    ],
    metrics: [
      { label: "Workforce", value: "2,086" },
      { label: "Attrition", value: "29%", tone: "critical" },
      { label: "Productivity", value: "85", tone: "warn" },
      { label: "Engagement", value: "69", tone: "down" },
    ],
    table: {
      columns: ["Cluster", "Headcount", "Attrition", "Top exit driver"],
      rows: [
        ["Field Sales RSO", 124, "29%", "Delayed incentive payout"],
        ["Merchandisers", 22, "21%", "Wage disparity"],
        ["ASM / TSM", 16, "15%", "Career progression"],
        ["Trade Marketing", 6, "12%", "Workload"],
      ],
    },
    recommendations: [
      "Incentive payout cycle acceleration — shift quarterly bonus to monthly disbursement",
      "Targeted RSO retention package for high-performing tier",
    ],
  },
  West: {
    title: "West Region — Workforce Deep Dive",
    subtitle: "2,214 · 22% · Productivity 91 · Engagement 74",
    summary: [
      "West is the strongest performer; watch the RSO pay gap. AI flags 1 intervention.",
    ],
    metrics: [
      { label: "Workforce", value: "2,214" },
      { label: "Attrition", value: "22%", tone: "warn" },
      { label: "Productivity", value: "91", tone: "up" },
      { label: "Engagement", value: "74", tone: "warn" },
    ],
    table: {
      columns: ["Cluster", "Headcount", "Attrition", "Top exit driver"],
      rows: [
        ["Field Sales RSO", 114, "22%", "RSO pay gap"],
        ["Merchandisers", 22, "17%", "Contract expiration"],
        ["ASM / TSM", 14, "12%", "Role clarity"],
        ["Trade Marketing", 6, "10%", "Market coverage"],
      ],
    },
    recommendations: [
      "RSO pay gap benchmark correction to align with FMCG market standard",
    ],
  },
  South: {
    title: "South Region — Workforce Deep Dive",
    subtitle: "1,874 · 19% · Productivity 88 · Engagement 78",
    summary: [
      "South is the most stable region; territory and language fit drive the few exits. AI flags 1 intervention.",
    ],
    metrics: [
      { label: "Workforce", value: "1,874" },
      { label: "Attrition", value: "19%", tone: "up" },
      { label: "Productivity", value: "88", tone: "up" },
      { label: "Engagement", value: "78", tone: "up" },
    ],
    table: {
      columns: ["Cluster", "Headcount", "Attrition", "Top exit driver"],
      rows: [
        ["Field Sales RSO", 88, "19%", "Territory & language fit"],
        ["Merchandisers", 16, "14%", "Distance to route"],
        ["ASM / TSM", 12, "10%", "Relocation"],
        ["Trade Marketing", 4, "8%", "Bandwidth"],
      ],
    },
    recommendations: [
      "Territory alignment and localized language-fit onboarding program",
    ],
  },
};

export const regionDrill = (region: string): DrillData => {
  return REGION_DATA[region] || REGION_DATA.North;
};

export const riskDrill = (risk: string): DrillData => {
  const map: Record<string, DrillData> = {
    Attrition: {
      title: "Attrition Risk — Root cause",
      summary: ["Field Sales drives 43% of all exits. Top quartile exiting 2.4× the average."],
      metrics: [
        { label: "12M attrition", value: "18.4%", tone: "warn" },
        { label: "Sales share", value: "43%", tone: "critical" },
        { label: "Top-quartile loss", value: "2.4×", tone: "critical" },
        { label: "Replacement cost", value: "₹18.4 Cr" },
      ],
      recommendations: [
        "Career ladder reset for RSO → ASM",
        "Top-performer comp band correction",
        "Manager quality coaching for bottom 12%",
      ],
    },
    Burnout: {
      title: "Burnout Risk — Cluster analysis",
      summary: ["Manufacturing Shift B and Hospitality South show 3 simultaneous overload signals."],
      metrics: [
        { label: "Workers at risk", value: "612" },
        { label: "Plants flagged", value: "3", tone: "warn" },
        { label: "OT > 22h", value: "18%", tone: "critical" },
        { label: "Heat complaints", value: "Open 21d", tone: "warn" },
      ],
      recommendations: ["Welfare checks", "Cooling-unit capex ₹92K", "OT cap policy refresh"],
    },
    Compliance: {
      title: "Compliance Risk",
      summary: ["ESIC, PF, and contract renewals trending well. Two state-level audits due Q3."],
      metrics: [
        { label: "Open alerts", value: "5", tone: "warn" },
        { label: "ESIC ready", value: "97%", tone: "up" },
        { label: "Audits Q3", value: "2" },
        { label: "SLA breach risk", value: "Low", tone: "up" },
      ],
    },
    "Leadership gaps": {
      title: "Leadership Gap Forecast",
      summary: ["6 succession gaps in critical leadership roles. Hospitality South lowest bench strength."],
      metrics: [
        { label: "Critical roles", value: "27" },
        { label: "Covered", value: "21", tone: "up" },
        { label: "Gaps", value: "6", tone: "critical" },
        { label: "Bench strength", value: "58%", tone: "warn" },
      ],
      recommendations: ["HiPo acceleration cohort", "External search for 2 BU heads", "Cross-BU rotation programme"],
    },
    "Skill shortages": {
      title: "Skill Shortage Map",
      summary: ["Digital, automation, and analytics skills lag market significantly."],
      metrics: [
        { label: "Skill clusters", value: "12" },
        { label: "Critical gap", value: "5", tone: "critical" },
        { label: "Reskilling pace", value: "31 mo", tone: "warn" },
        { label: "AI-accelerated", value: "14 mo", tone: "up" },
      ],
    },
  };
  return map[risk] ?? map.Attrition;
};
