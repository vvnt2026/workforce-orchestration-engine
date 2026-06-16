import { Link } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import logo from "@/assets/ds-group-logo.png";
import { IllustrativeDemoBadge } from "@/components/IllustrativeDemoBadge";
import type { Persona } from "./data";

export function CockpitLayout({
  persona,
  children,
  renderSection,
}: {
  persona: Persona;
  children?: ReactNode;
  renderSection?: (section: string) => ReactNode;
}) {
  const [active, setActive] = useState(persona.nav[0]);
  const useSections = !!renderSection;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface-elevated/90 backdrop-blur-md">
        <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="DS Group" className="h-8 w-8 rounded-md object-contain" />
            <div className="hidden flex-col leading-tight md:flex">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">DS Group</span>
              <span className="font-display text-sm font-semibold">
                DS Group · Agentic Workforce Platform
              </span>
            </div>
          </Link>
          <div className="ml-2 hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
            System Active · {persona.agents} agents · {persona.tasks} workflows
          </div>
          <div className="ml-auto hidden flex-1 max-w-md lg:block">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
              <span>⌘K</span>
              <span className="truncate">Search workforce intelligence, attrition, leadership gaps…</span>
            </div>
          </div>
          <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            Ask AI
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
            {persona.initials}
          </div>
        </div>
      </header>
      <IllustrativeDemoBadge className="top-[4.25rem]" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">
          <nav className="flex flex-col gap-0.5 p-3">
            {persona.nav.map((item) => {
              const isActive = item === active;
              return (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`group flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent font-medium text-white"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                  }`}
                >
                  <span className="truncate">{item}</span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      isActive ? "bg-primary-glow pulse-dot" : "bg-sidebar-foreground/30 group-hover:bg-primary-glow"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
          {persona.quickLinks && persona.quickLinks.length > 0 && (
            <div className="mx-3 mt-4 rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-3">
              <div className="text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/60">
                Quick Links
              </div>
              <ul className="mt-2 space-y-1">
                {persona.quickLinks.map((q) => {
                  const tone =
                    q.tone === "critical"
                      ? "bg-destructive/20 text-destructive"
                      : q.tone === "warn"
                      ? "bg-warning/20 text-warning"
                      : q.tone === "good"
                      ? "bg-success/20 text-success"
                      : "bg-sidebar-accent/60 text-sidebar-foreground/70";
                  return (
                    <li key={q.label}>
                      <button className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[11px] text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white">
                        <span className="truncate">{q.label}</span>
                        {q.badge && (
                          <span className={`ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${tone}`}>
                            {q.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="mx-3 mt-4 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/60">
              Switch Persona
            </div>
            <div className="mt-2 grid grid-cols-5 gap-1">
              {["subrat", "ravi", "vikram", "ananya", "kavita", "arjun"].map((p) => (
                <Link
                  key={p}
                  to="/cockpit/$persona"
                  params={{ persona: p }}
                  className={`flex h-8 items-center justify-center rounded text-[10px] font-semibold uppercase ${
                    p === persona.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-sidebar-accent/60 text-sidebar-foreground/70 hover:bg-sidebar-accent"
                  }`}
                >
                  {p.slice(0, 2)}
                </Link>
              ))}
            </div>
          </div>

        </aside>

        <main className="min-w-0 flex-1">
          {useSections ? renderSection!(active) : children}
        </main>
      </div>
    </div>
  );
}
