import { useEffect, useRef, useState } from "react";
import type { Persona } from "./data";
import { getCopilotAnswer, type DrillData } from "./drilldowns";

type Msg =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "bot"; text?: string; data?: DrillData; typing?: boolean };

const uid = () => Math.random().toString(36).slice(2, 10);

import { useWorkforceStore, type StatefulAttentionItem } from "@/hooks/useWorkforceStore";

function buildFallback(persona: Persona, q: string, attention: StatefulAttentionItem[]): DrillData {
  const ql = q.toLowerCase();
  const kpiHit = persona.kpis.find((k) => ql.includes(k.label.toLowerCase().split(" ")[0]));
  const attHit = attention.find((a) =>
    ql.split(/\s+/).some((w) => w.length > 3 && a.title.toLowerCase().includes(w))
  );

  if (kpiHit) {
    return {
      title: kpiHit.label,
      subtitle: `Current reading for ${persona.name}`,
      summary: [kpiHit.sub ?? `Tracking ${kpiHit.label} across ${persona.role}.`],
      metrics: [
        { label: kpiHit.label, value: kpiHit.value, tone: kpiHit.tone },
        ...(kpiHit.signal ? [{ label: "Signal", value: kpiHit.signal, tone: kpiHit.tone }] : []),
      ],
    };
  }
  if (attHit) {
    return {
      title: attHit.title,
      subtitle: attHit.detail,
      summary: [`Recommended: ${attHit.rec}`, `Window: ${attHit.when}`],
    };
  }
  return {
    title: "Here's what I can see right now",
    subtitle: `Live snapshot for ${persona.name}`,
    summary: [
      persona.insight.title + " — " + (persona.insight.body[0] ?? ""),
      `Try one of the suggested prompts below, or ask about any KPI on screen (e.g. "${persona.kpis[0]?.label}").`,
    ],
    metrics: persona.kpis.slice(0, 4).map((k) => ({
      label: k.label,
      value: k.value,
      tone: k.tone,
    })),
  };
}

const toneStyles: Record<string, string> = {
  default: "text-foreground",
  up: "text-success",
  down: "text-destructive",
  warn: "text-warning",
  critical: "text-destructive font-medium",
};

function BotPayload({ data }: { data: DrillData }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="font-display text-sm font-semibold text-foreground">{data.title}</div>
        {data.subtitle && (
          <div className="text-xs text-muted-foreground">{data.subtitle}</div>
        )}
      </div>

      {data.summary?.map((p, i) => (
        <p key={i} className="text-sm leading-relaxed text-foreground/85">
          {p}
        </p>
      ))}

      {data.metrics && data.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {data.metrics.map((m) => (
            <div key={m.label} className="rounded-lg bg-background p-2.5">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {m.label}
              </div>
              <div className={`mt-0.5 font-display text-base font-semibold ${toneStyles[m.tone ?? "default"]}`}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.table && (
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/60 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  {data.table.columns.map((c) => (
                    <th key={c} className="px-2.5 py-1.5 font-medium">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row, i) => (
                  <tr key={i} className="border-t border-border odd:bg-background even:bg-muted/20">
                    {row.map((cell, j) => (
                      <td key={j} className="px-2.5 py-1.5 text-foreground/85">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.sections?.map((s) => (
        <div key={s.title} className="rounded-lg bg-background p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {s.title}
          </div>
          <ul className="mt-1.5 space-y-1 text-xs">
            {s.items.map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/85">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {data.recommendations && data.recommendations.length > 0 && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Recommended actions
          </div>
          <ul className="mt-1.5 space-y-1 text-xs">
            {data.recommendations.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/90">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function CopilotChat({ persona }: { persona: Persona }) {
  const { getPersonaAttention } = useWorkforceStore();
  const attention = getPersonaAttention(persona.id);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid(),
      role: "bot",
      text: `Hi ${persona.name.split(" ")[0]} — I'm your AI Colleague. I can drill into any KPI, attention item, or workforce signal on this cockpit. Pick a prompt or ask me anything.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (q: string) => {
    if (!q.trim() || busy) return;
    const userMsg: Msg = { id: uid(), role: "user", text: q };
    const typingMsg: Msg = { id: uid(), role: "bot", typing: true };
    setMessages((m) => [...m, userMsg, typingMsg]);
    setInput("");
    setBusy(true);

    setTimeout(() => {
      const known = persona.copilot.find((p) => p.toLowerCase() === q.toLowerCase());
      const data = known ? getCopilotAnswer(persona.id, known) : buildFallback(persona, q, attention);
      setMessages((m) =>
        m.map((msg) => (msg.id === typingMsg.id ? { id: msg.id, role: "bot", data } : msg))
      );
      setBusy(false);
    }, 650);
  };

  return (
    <section className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-xs font-semibold text-primary-foreground">
            AI
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Ask DSG Disha</h2>
            <div className="text-xs text-muted-foreground">
              Chat with your AI Colleague · grounded in this cockpit's data
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
          Online
        </div>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[520px] space-y-4 overflow-y-auto bg-muted/20 px-6 py-5"
      >
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-card">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-semibold text-primary-foreground">
                AI
              </div>
              <div className="max-w-[85%] flex-1 rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 shadow-card">
                {m.typing ? (
                  <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                  </div>
                ) : m.data ? (
                  <BotPayload data={m.data} />
                ) : (
                  <p className="text-sm leading-relaxed text-foreground/85">{m.text}</p>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {persona.copilot.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={busy}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary hover:bg-primary/5 hover:text-foreground disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-xl border border-border bg-background p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about KPIs, attrition, skills, attention items…"
            className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
