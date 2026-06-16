import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { DrillData } from "./drilldowns";

const toneStyles: Record<string, string> = {
  default: "text-foreground",
  up: "text-success",
  down: "text-destructive",
  warn: "text-warning",
  critical: "text-destructive font-medium",
};

export function DrillSheet({
  open,
  onOpenChange,
  data,
  kind,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  data: DrillData | null;
  kind: "kpi" | "action" | "attention" | "copilot";
}) {
  if (!data) return null;

  const kindLabel = {
    kpi: "KPI drill-down",
    action: "Workflow",
    attention: "Attention item",
    copilot: "Ask DSG Disha · AI answer",
  }[kind];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-2xl"
      >
        <div className="border-b border-border bg-gradient-hero p-6 text-white">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            {kindLabel}
          </div>
          <SheetHeader className="mt-1 space-y-1 text-left">
            <SheetTitle className="font-display text-2xl font-semibold text-white">
              {data.title}
            </SheetTitle>
            {data.subtitle && (
              <SheetDescription className="text-sm text-white/75">
                {data.subtitle}
              </SheetDescription>
            )}
          </SheetHeader>
        </div>

        <div className="space-y-6 p-6">
          {data.summary && (
            <div className="space-y-2 text-sm leading-relaxed text-foreground/85">
              {data.summary.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {data.metrics && data.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {data.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-secondary/60 p-3">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </div>
                  <div
                    className={`mt-1 font-display text-lg font-semibold ${
                      toneStyles[m.tone ?? "default"]
                    }`}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.table && (
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      {data.table.columns.map((c) => (
                        <th key={c} className="px-3 py-2 font-medium">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.table.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-t border-border odd:bg-background even:bg-muted/20"
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-3 py-2 text-foreground/85"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {data.sections?.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.title}
              </div>
              <ul className="mt-2 space-y-1.5 text-sm">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/85">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {data.recommendations && data.recommendations.length > 0 && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Recommended actions
              </div>
              <ul className="mt-2 space-y-1.5 text-sm">
                {data.recommendations.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/90">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-border pt-4 text-[11px] text-muted-foreground">
            AI Colleague · evidence pack · last refreshed just now
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
