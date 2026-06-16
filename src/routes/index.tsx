import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/ds-group-logo.png";
import { IllustrativeDemoBadge } from "@/components/IllustrativeDemoBadge";
import { personaList } from "@/components/cockpit/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DS Group - Agentic Workforce Platform" },
      {
        name: "description",
        content:
          "AI Colleagues built for DS Group's people and process transformation - across manufacturing, field sales, brand, hospitality, and the CHRO cockpit.",
      },
      { property: "og:title", content: "DS Group - Agentic Workforce Platform" },
      {
        property: "og:description",
        content:
          "Six workforce cockpits - manufacturing, field sales, frontline RSO, brand, hospitality, and CHRO - powered by AI Colleagues.",
      },
    ],
  }),
  component: Landing,
});

const accentBg: Record<string, string> = {
  green: "bg-gradient-primary text-primary-foreground",
  gold: "bg-gradient-gold text-gold-foreground",
  dark: "bg-foreground text-background",
  amber: "text-white",
};

const illustrativeRealItems = [
  "DS Group brand names",
  "SBU structure",
  "Seasonal hiring patterns",
  "Compliance requirements (ESIC, PF)",
  "Attrition benchmarks for FMCG, hospitality and manufacturing",
];

const illustrativeModelledItems = [
  "All numbers",
  "Scores",
  "Risk flags",
  "Cost figures",
  "AI inferences",
  "Timelines",
  "Headcounts",
];

const illustrativeUnlockItems = [
  "Replace modelled data with actual HRMS, ATS and project data",
  "Make some numbers real",
  "Turn inference into action",
];

const integrationSections = [
  {
    title: "Core HR Systems",
    items: [
      "SAP SuccessFactors / Workday / Oracle HCM - Employee master, org structure, performance, compensation, career progression",
      "DS Group ERP - Manufacturing workforce data, plant headcount, contract worker records, shift management",
      "Field Sales CRM - RSO activity tracking, territory data, DST login data, target achievement, RSO -> ASM progression tracking",
      "DS Group LMS - Learning completion, certification status, skill assessments, mandatory training compliance",
    ],
  },
  {
    title: "Compliance & Regulatory",
    items: [
      "ESIC Portal - Statutory contribution filing, coverage verification, compliance monitoring",
      "PF Portal - Provident fund reconciliation, employee contribution tracking",
      "Factory Act Registers - Plant compliance records, licence renewal, labour law documentation",
      "FSSAI Compliance System - Food safety certification tracking, audit readiness, renewal calendar",
      "Labour Department Portals - Contract worker compliance, licence monitoring",
    ],
  },
  {
    title: "Communication & Collaboration",
    items: [
      "Microsoft Teams / Slack - Pulse signals, manager inputs, nudge delivery, AI Colleague alerts",
      "Email / SMS Gateway - Employee-facing notifications, field sales alerts, plant worker communications",
      "WhatsApp Business - Field RSO communications, plant worker nudges (where applicable)",
    ],
  },
  {
    title: "Hospitality & Retail Systems",
    items: [
      "Property Management System - L'Opera, Le Marche, Namah, Manu Maharani workforce scheduling",
      "POS Integration - Hospitality staff performance data, guest satisfaction signals",
      "Shift Management System - Plant and hospitality workforce coverage tracking",
    ],
  },
  {
    title: "Data & Security",
    items: [
      "Private tenant deployment - your data never leaves your environment",
      "PII masking at source - sensitive data anonymised before AI Colleague processing",
      "Role-based access control - each persona sees only their authorised data",
      "DPDP Act compliant - India data protection framework adherent",
      "FSSAI data governance - food industry data handling standards maintained",
    ],
  },
];

function Landing() {
  const [showIllustrativeFraming, setShowIllustrativeFraming] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <IllustrativeDemoBadge className="top-[4.5rem]" />
      <header className="border-b border-border bg-surface-elevated/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DS Group" className="h-9 w-9 rounded-md object-contain" />
            <div className="leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                DS Group
              </div>
              <div className="font-display text-sm font-semibold">Agentic Workforce Platform</div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-glow pulse-dot" />
                Built for DS Group - 7,700 workforce - 21+ manufacturing units across India
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-balance lg:text-6xl">
                AI Colleagues for DS Group's
                <span className="block text-primary-glow">
                  people &amp; process transformation.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 lg:text-lg">
                Six operating cockpits - for the CHRO, Manufacturing, Field Sales, Frontline RSO,
                Brand and Hospitality - wired to the realities of Rajnigandha, Catch, Pulse,
                L'Opera, Le Marche and Manu Maharani.
              </p>

              <div className="mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  ["7,700", "Workforce"],
                  ["$5B", "Annual revenue"],
                  ["12", "Brands &amp; businesses"],
                  ["34%", "Skills expiry risk"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div
                      className="font-display text-2xl font-semibold text-white"
                      dangerouslySetInnerHTML={{ __html: value }}
                    />
                    <div
                      className="text-xs uppercase tracking-wider text-white/60"
                      dangerouslySetInnerHTML={{ __html: label }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:ml-8 lg:w-full lg:max-w-xs">
              <div className="rounded-2xl border border-white/15 bg-white/8 p-4 shadow-elevated backdrop-blur-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                  Explore the prototype
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/72">
                  Open a quick explainer or review how AI Colleagues connect into your enterprise
                  landscape.
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <Button
                    onClick={() => setShowIllustrativeFraming((current) => !current)}
                    className="h-11 justify-between rounded-xl bg-white text-foreground hover:bg-white/90"
                  >
                    Illustrative Framing
                    <span aria-hidden="true">{showIllustrativeFraming ? "-" : "+"}</span>
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-11 justify-between rounded-xl border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                      >
                        How It Connects
                        <span aria-hidden="true">+</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[85vh] max-w-4xl overflow-y-auto border-border bg-surface-elevated p-0">
                      <div className="p-6 sm:p-8">
                        <DialogHeader>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                            Integration Architecture
                          </div>
                          <DialogTitle className="font-display text-2xl">
                            How AI Colleagues connect to your existing enterprise systems
                          </DialogTitle>
                          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                            The platform is designed to sit across your HR, compliance,
                            collaboration, hospitality and security landscape without forcing a
                            rip-and-replace approach.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                          {integrationSections.map((section) => (
                            <div
                              key={section.title}
                              className="rounded-2xl border border-border bg-background p-5"
                            >
                              <div className="text-sm font-semibold text-foreground">
                                {section.title}
                              </div>
                              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
                                {section.items.map((item) => (
                                  <li key={item} className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showIllustrativeFraming && (
        <section className="border-b border-white/10 bg-[#0d1412]">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="rounded-3xl border border-white/10 border-l-4 border-l-amber-300 bg-[#121c19] p-6 shadow-elevated lg:p-8">
              <div className="max-w-4xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/80">
                  Illustrative Framing
                </div>
                <h2 className="mt-3 font-display text-3xl font-semibold text-white">
                  Built to Start a Conversation
                </h2>
                <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/70 lg:text-base">
                  This is an illustrative prototype built using DS Group&apos;s public profile -
                  brands, business units, workforce structure, and seasonal patterns. No live
                  systems are connected. Every number is modelled, not measured.
                </p>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/70 lg:text-base">
                  The purpose: show what an Agentic Workforce Platform looks like when it knows
                  your business - before we build the real thing together.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-white">What&apos;s Real</div>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                    {illustrativeRealItems.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-white">What&apos;s Modelled</div>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                    {illustrativeModelledItems.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-primary-glow">
                    What 2 Weeks Unlocks
                  </div>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                    {illustrativeUnlockItems.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="personas" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Six operating cockpits
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold lg:text-4xl">
              One platform. Every DS Group workforce reality.
            </h2>
          </div>
          <div className="hidden text-sm text-muted-foreground md:block">
            Click any persona to open a live cockpit
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personaList.map((p, i) => (
            <Link
              key={p.id}
              to="/cockpit/$persona"
              params={{ persona: p.id }}
              className="group relative flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${accentBg[p.accent]}`}
                  style={p.id === "arjun" ? { backgroundColor: "#D97706" } : undefined}
                >
                  {p.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {p.id === "arjun"
                      ? "Employee experience layer"
                      : i === 0
                        ? "The buyer"
                        : `Persona ${i + 1}`}
                  </div>
                  <div className="font-display text-xl font-semibold">{p.name}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{p.role}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground/75 line-clamp-3">
                {p.id === "arjun"
                  ? "Namaste Arjun. Aaj 6 stores visit karne hain. Sharma Kirana sabse badi opportunity hai - Rs 2,400 potential. 7 orders this month, 15 ka target. Chal shuru karte hain."
                  : p.greeting}
              </p>
              {p.id === "arjun" && (
                <div className="inline-flex w-fit rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
                  Day 18 - Probation
                </div>
              )}
              <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
                    {p.agents} agents
                  </span>
                  <span>-</span>
                  <span>{p.tasks} tasks</span>
                </div>
                <span className="font-medium text-primary group-hover:underline">
                  Open cockpit -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="why" className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Built for DS Group's actual operating reality
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-balance lg:text-4xl">
              Not a generic HR dashboard. A cockpit per workforce population.
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/75">
              DS Group's 7,700 people sit across five very different worlds - manufacturing plants
              making Rajnigandha and Pulse; 1,200+ field sales RSOs selling Catch and Pass Pass;
              brand teams competing with HUL and ITC; premium hospitality at L'Opera and Manu
              Maharani; and a CHRO with a transformation mandate on day 127. One generic dashboard
              cannot serve all five. Five AI Colleague cockpits can.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Skills expiry tracked against 18-month automation horizon",
                "Field sales attrition modelled against ITC / HUL / Dabur poaching",
                "Brand career paths benchmarked to MNC FMCG promotion velocity",
                "Hospitality coverage linked to guest satisfaction and revenue risk",
                "Transformation Index rolling up People + Process across 11 initiatives",
              ].map((label) => (
                <li key={label} className="flex gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground/85">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-gold">
              Brand portfolio in context
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Rajnigandha", "Mouth Freshener - Flagship - Rs 180 Cr brand"],
                ["Catch", "Spices - FMCG - Digital-first campaigns"],
                ["Pulse", "Confectionery - Seasonal peak Jun-Aug"],
                ["Pass Pass", "Mouth Freshener - Year-round line"],
                ["L'Opera", "Premium Patisserie - Delhi+5"],
                ["Le Marche", "Gourmet Retail - Delhi+3"],
                ["Manu Maharani", "Luxury Hotel - Rishikesh"],
                ["Namah", "Hotel - Rishikesh - Full occupancy"],
              ].map(([name, description]) => (
                <div key={name} className="rounded-lg border border-border bg-background p-3">
                  <div className="font-display text-sm font-semibold">{name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 text-xs text-muted-foreground">
          <div>DS Group - Agentic Workforce Platform - Demo build</div>
          <div>
            Rajnigandha - Catch - Pulse - Pass Pass - L&apos;Opera - Le Marche - Manu Maharani -
            Namah
          </div>
        </div>
      </footer>
    </div>
  );
}
