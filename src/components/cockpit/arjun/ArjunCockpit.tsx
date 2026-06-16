import { Link } from "@tanstack/react-router";
import { type ReactNode, useMemo, useState } from "react";
import logo from "@/assets/ds-group-logo.png";
import { IllustrativeDemoBadge } from "@/components/IllustrativeDemoBadge";
import { useWorkforceStore, type AttentionStatus } from "@/hooks/useWorkforceStore";

const AMBER = "#D97706";
const GREEN = "#16a34a";

type NavItem = { key: string; label: string; badge?: string; tone?: "red" | "amber" | "green" | "grey" | "gold" };
type NavSection = { title: string; items: NavItem[] };
type StoreRow = {
  name: string;
  area: string;
  lastVisited: string;
  status: "Visited this week" | "Due" | "Overdue";
  avg: string;
  routeToday: boolean;
};

const sidebarSections: NavSection[] = [
  {
    title: "MERA DASHBOARD",
    items: [
      { key: "target", label: "🎯 Aaj Ka Target" },
      { key: "route", label: "🗺️ Mera Route (40 Stores)", badge: "40", tone: "grey" },
      { key: "earnings", label: "💰 Meri Kamai", badge: "₹4,800", tone: "amber" },
      { key: "sales", label: "📊 Sales Tracker" },
      { key: "scorecard", label: "🏪 Store Scorecard", badge: "7 visited", tone: "green" },
    ],
  },
  {
    title: "MERI JOURNEY",
    items: [
      { key: "roadmap", label: "📅 90-Day Roadmap" },
      { key: "learning", label: "📚 Learning Modules", badge: "2 pending", tone: "amber" },
      { key: "badges", label: "🏅 Badges Earned", badge: "2 🏆", tone: "gold" },
      { key: "buddy", label: "🤝 My Buddy — Deepak", badge: "4d gap", tone: "red" },
      { key: "ranking", label: "📈 Batch Ranking", badge: "12 of 38", tone: "green" },
      { key: "milestones", label: "🎯 Probation Milestones", badge: "3 done", tone: "green" },
    ],
  },
  {
    title: "SUPPORT & MADAD",
    items: [
      { key: "docs", label: "📄 Documents Pending", badge: "2", tone: "red" },
      { key: "salary", label: "💳 Salary & Benefits" },
      { key: "manager", label: "📞 Mera Manager — Rahul TSM" },
      { key: "problem", label: "🆘 Raise a Problem" },
      { key: "lang", label: "🌐 Hindi / English toggle" },
    ],
  },
  {
    title: "MERI COMPANY",
    items: [
      { key: "rajnigandha", label: "🍃 Rajnigandha — Brand Story" },
      { key: "catch", label: "🌶️ Catch Spices — About" },
      { key: "policies", label: "📋 DS Group Policies", badge: "2 new", tone: "amber" },
      { key: "fame", label: "🏆 Top RSO — Wall of Fame" },
    ],
  },
  {
    title: "AI SAATHI",
    items: [{ key: "ai", label: "🤖 Ask AI Saathi", badge: "AI", tone: "amber" }],
  },
];

const badgeTone: Record<NonNullable<NavItem["tone"]>, string> = {
  red: "bg-red-500/15 text-red-300 border border-red-500/30",
  amber: "bg-amber-400/15 text-amber-200 border border-amber-400/30",
  green: "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30",
  grey: "bg-white/10 text-slate-200 border border-white/20",
  gold: "bg-yellow-400/15 text-yellow-200 border border-yellow-400/30",
};

const statusStyles: Record<AttentionStatus, string> = {
  Open: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Done: "bg-green-50 text-green-700 border-green-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
};

const attentionStatusLabels: Record<string, string> = {
  "arjun-2": "New",
};

const STORE_NAMES = [
  "Sharma Kirana",
  "Gupta Provision Store",
  "Singh General Store",
  "Verma Kirana",
  "Patel Store",
  "Agarwal Mart",
  "Joshi Provision",
  "Yadav Kirana",
];

function buildStores(): StoreRow[] {
  const routeToday = new Set([1, 4, 9, 13, 18, 23]);
  return Array.from({ length: 40 }, (_, idx) => {
    const i = idx + 1;
    const area = i % 2 === 0 ? "Meerut Cantonment" : "Civil Lines";
    const status: StoreRow["status"] = i <= 12 ? "Visited this week" : i <= 30 ? "Due" : "Overdue";
    return {
      name: STORE_NAMES[idx % STORE_NAMES.length] + (idx >= STORE_NAMES.length ? ` ${Math.floor(idx / STORE_NAMES.length) + 1}` : ""),
      area,
      lastVisited: i <= 12 ? "2 days ago" : i <= 30 ? "8 days ago" : "16 days ago",
      status,
      avg: `₹${1400 + i * 40}`,
      routeToday: routeToday.has(i),
    };
  });
}

export function ArjunCockpit() {
  const [active, setActive] = useState("target");
  const [activeSelectId, setActiveSelectId] = useState<string | null>(null);
  const { getPersonaAttention, updateItemStatus, buddyNudgeActivated } = useWorkforceStore();
  const attention = getPersonaAttention("arjun");
  const stores = useMemo(() => buildStores(), []);
  const currentDateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    [],
  );

  const navToScreen: Record<string, string> = {
    target: "target",
    route: "route",
    earnings: "earnings",
    sales: "sales",
    scorecard: "scorecard",
    roadmap: "roadmap",
    learning: "learning",
    ranking: "ranking",
    buddy: "target",
    badges: "target",
    milestones: "roadmap",
    docs: "target",
    ai: "target",
  };

  const handleNav = (key: string) => {
    setActive(navToScreen[key] ?? "target");
  };

  const screenKey = active;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white">
        <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src={logo} alt="DS Group" className="h-8 w-8 shrink-0 rounded-md object-contain" />
            <span className="truncate text-sm font-semibold text-slate-900">DS Group Agentic Workforce Platform</span>
          </Link>
          <div className="hidden flex-1 text-center text-sm font-medium text-slate-700 md:block">
            Arjun Rawat · RSO · Meerut Territory · Rajnigandha & Catch
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-3 text-sm text-slate-600">
            <span className="hidden sm:inline">{currentDateLabel}</span>
            <span aria-hidden>🔔</span>
            <span aria-hidden>⚙️</span>
          </div>
        </div>
        <div className="flex h-9 items-center px-4 text-sm text-white lg:px-6" style={{ backgroundColor: AMBER }}>
          Namaste, Arjun! Day 18 of 90 — aaj 6 stores visit karne hain. Sharma Kirana sabse important hai. 🎯
        </div>
      </header>
      <IllustrativeDemoBadge className="top-[6.15rem]" />

      <div className="flex">
        <aside className="sticky top-[5.75rem] hidden h-[calc(100vh-5.75rem)] w-[260px] shrink-0 overflow-y-auto bg-[#1e2433] px-3 py-4 text-slate-200 lg:block">
          <PersonaHeader />
          <JourneyWidget />
          <OpportunityPill />
          <SidebarNav active={screenKey} onNav={handleNav} />
          <SidebarFooter />
        </aside>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          {screenKey === "target" && (
            <TargetScreen
              attention={attention}
              activeSelectId={activeSelectId}
              setActiveSelectId={setActiveSelectId}
              updateItemStatus={updateItemStatus}
              buddyNudgeActivated={buddyNudgeActivated}
              currentDateLabel={currentDateLabel}
            />
          )}
          {screenKey === "route" && <RouteScreen stores={stores} />}
          {screenKey === "earnings" && <EarningsScreen />}
          {screenKey === "sales" && <SalesTracker />}
          {screenKey === "roadmap" && <RoadmapScreen />}
          {screenKey === "learning" && <LearningModules />}
          {screenKey === "ranking" && <BatchRanking />}
          {screenKey === "scorecard" && <StoreScorecard stores={stores} />}
        </main>
      </div>
    </div>
  );
}

function PersonaHeader() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2">
        <div
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: AMBER }}
        >
          AR
        </div>
        <div>
          <div className="text-xs font-semibold text-white">Arjun Rawat</div>
          <div className="text-[10px] text-slate-400">RSO · Field Sales · Day 18 of 90</div>
        </div>
      </div>
      <div className="mt-2 rounded-full bg-amber-500/15 px-2 py-1 text-[9px] text-amber-200">
        DS Group · Rajnigandha & Catch
      </div>
    </div>
  );
}

function JourneyWidget() {
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
      {[
        { label: "Probation", pct: 20, right: "Day 18 / 90", color: "bg-amber-500" },
        { label: "Sales pace", pct: 52, right: "52%", color: "bg-amber-500" },
        { label: "Learning", pct: 67, right: "67%", color: "bg-green-500" },
      ].map((row) => (
        <div key={row.label} className="mb-2">
          <div className="mb-1 flex justify-between text-[10px]">
            <span>{row.label}</span>
            <span>{row.right}</span>
          </div>
          <div className="h-1.5 rounded bg-white/10">
            <div className={`h-full rounded ${row.color}`} style={{ width: `${row.pct}%` }} />
          </div>
        </div>
      ))}
      <div className="my-2 border-t border-white/10" />
      <div className="grid grid-cols-3 gap-2 text-center">
        <MiniStat value="₹4,800" label="projected earnings this month" />
        <MiniStat value="72" label="days left" />
        <MiniStat value="40" label="my stores" />
      </div>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xs font-bold text-white">{value}</div>
      <div className="text-[9px] text-slate-400">{label}</div>
    </div>
  );
}

function OpportunityPill() {
  return (
    <div className="mt-3 rounded-full bg-amber-500/15 px-2.5 py-1.5 text-[9px] leading-snug text-amber-100">
      🤖 Sharma Kirana aaj visit karo — sabse bada unvisited store · ₹2,400 potential
    </div>
  );
}

function SidebarNav({ active, onNav }: { active: string; onNav: (key: string) => void }) {
  return (
    <div className="mt-3 space-y-3">
      {sidebarSections.map((section) => (
        <div key={section.title}>
          <div className="mb-1 text-[9px] uppercase tracking-[0.18em] text-slate-500">{section.title}</div>
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const mapped = navToScreenKey(item.key);
              const isActive = active === mapped && (item.key === mapped || navToScreenKey(item.key) === active);
              const isTargetDefault = item.key === "target" && active === "target";
              const isActiveItem =
                isTargetDefault ||
                (item.key !== "target" && mapped === active) ||
                (["route", "earnings", "sales", "scorecard", "roadmap", "learning", "ranking"].includes(item.key) &&
                  active === item.key);
              return (
                <button
                  key={item.key}
                  onClick={() => onNav(item.key)}
                  className={`flex w-full items-center justify-between px-2 py-1.5 text-[11px] transition ${
                    isActiveItem ? "bg-[rgba(217,119,6,0.2)] text-white" : "text-slate-300 hover:bg-white/5"
                  }`}
                  style={{ borderLeft: isActiveItem ? `2px solid ${AMBER}` : "2px solid transparent" }}
                >
                  <span className="truncate text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-1 shrink-0 rounded-full px-1.5 py-0.5 text-[9px] ${badgeTone[item.tone ?? "grey"]}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function navToScreenKey(key: string) {
  const map: Record<string, string> = {
    target: "target",
    route: "route",
    earnings: "earnings",
    sales: "sales",
    scorecard: "scorecard",
    roadmap: "roadmap",
    learning: "learning",
    ranking: "ranking",
    buddy: "target",
    badges: "target",
    milestones: "roadmap",
    docs: "target",
    ai: "target",
  };
  return map[key] ?? "target";
}

function SidebarFooter() {
  return (
    <div className="mt-4 border-t border-white/10 pt-3">
      <div className="text-[10px] text-slate-400">5 AI agents active · Last run 06:30</div>
      <Link to="/" className="mt-1 inline-block text-[10px] text-slate-300 hover:text-white">
        ← All Cockpits
      </Link>
    </div>
  );
}

function TargetScreen({
  attention,
  activeSelectId,
  setActiveSelectId,
  updateItemStatus,
  buddyNudgeActivated,
  currentDateLabel,
}: {
  attention: ReturnType<ReturnType<typeof useWorkforceStore>["getPersonaAttention"]>;
  activeSelectId: string | null;
  setActiveSelectId: (id: string | null) => void;
  updateItemStatus: (id: string, status: AttentionStatus) => void;
  buddyNudgeActivated: boolean;
  currentDateLabel: string;
}) {
  return (
    <div className="space-y-5">
      <Card>
        <h2 className="font-display text-lg font-semibold text-slate-900">Tera Din — Tuesday, 16 June 2026</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Tere batch mein jo RSOs Day 20 tak 8+ orders kar lete hain, unke probation clear karne ke chances 78% zyada
          hote hain. Abhi tere paas 7 orders hain — aaj 1 aur chahiye. Sharma Kirana Cantonment aur Gupta Provision
          Store dono unvisited hain.
        </p>
        <div className="mt-3 text-[11px] text-slate-500">Performance Nudge Agent · 06:30</div>
      </Card>

      <div>
        <h3 className="font-display text-lg font-semibold text-slate-900">Mera Performance Dashboard</h3>
        <p className="text-xs text-slate-500">Apne numbers dekho — click karke deep dive karo</p>
      </div>

      <KpiGrid buddyNudgeActivated={buddyNudgeActivated} />
      <JourneyStepper />
      <AttentionSection
        attention={attention}
        activeSelectId={activeSelectId}
        setActiveSelectId={setActiveSelectId}
        updateItemStatus={updateItemStatus}
      />
      <AiSaathi />
      <InsightCard />
      <ActivityLog />
    </div>
  );
}

function KpiGrid({ buddyNudgeActivated }: { buddyNudgeActivated: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <KpiTile title="AAJ KA STORE TARGET" value="6" valueColor={AMBER} sub="stores visit karne hain aaj" tag="⚡ 4 stores remaining" tagTone="amber">
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i < 2 ? "bg-amber-500" : "bg-slate-200"}`} />
          ))}
        </div>
        <div className="mt-1 text-[10px] text-slate-500">2 of 6 visited so far today</div>
      </KpiTile>

      <KpiTile
        title="IS MAHINE KE ORDERS"
        value="7"
        valueColor={AMBER}
        sub="of 15 target"
        tag="⚠ 8 more needed · 17 days left"
        tagTone="amber"
        ai="Tere batch mein jo RSOs mahine ke pehle 18 din mein 8+ orders karte hain, unka monthly average 23% zyada hota hai. Aaj Sharma Kirana visit karo — ek order aur aur tu safe zone mein hai."
      >
        <div className="mt-2 h-1.5 rounded bg-slate-100">
          <div className="h-full rounded bg-amber-500" style={{ width: "47%" }} />
        </div>
      </KpiTile>

      <KpiTile
        title="MERI KAMAI"
        value="₹4,800"
        valueColor={AMBER}
        sub="projected this month at current pace"
        tag="Slab 1 of 3"
        tagTone="grey"
        ai="15 orders karne par ₹9,200 milega — aaj ke baad sirf 8 aur chahiye. Sharma Kirana + Gupta Provision Store dono visit karo aaj — dono milake ₹4,800 potential hai."
      >
        <div className="mt-1 text-xs text-slate-600">Hit 15 orders → ₹9,200</div>
        <button className="mt-1 text-[11px] font-medium text-amber-700 hover:underline">Earnings calculator →</button>
      </KpiTile>

      <KpiTile title="PROBATION COUNTDOWN" value="72" valueColor={GREEN} sub="days remaining" tag="✓ On track — 3 milestones complete" tagTone="green">
        <div className="mt-2 flex items-center gap-2">
          <div className="relative h-10 w-10">
            <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <circle cx="18" cy="18" r="14" fill="none" stroke={GREEN} strokeWidth="3" strokeDasharray="88" strokeDashoffset="70" />
            </svg>
          </div>
          <span className="text-[10px] text-slate-500">Day 18 of 90 · 20% complete</span>
        </div>
      </KpiTile>

      <KpiTile
        title="LEARNING PROGRESS"
        value="4 / 6"
        valueColor={AMBER}
        sub="modules complete"
        tag="⚠ 2 modules due this week"
        tagTone="amber"
        ai="Jo RSOs pehle 21 din mein saare modules complete karte hain, unka probation pass rate 34% zyada hota hai. Tere paas 3 din hain — aaj raat 1 module kar lo."
      >
        <div className="mt-2 h-1.5 rounded bg-slate-100">
          <div className="h-full rounded bg-amber-500" style={{ width: "67%" }} />
        </div>
        <div className="mt-1 text-[10px] text-slate-500">Catch Spices Product Training · Objection Handling</div>
      </KpiTile>

      <KpiTile
        title="BATCH RANKING"
        value="12 / 38"
        valueColor={GREEN}
        sub="among Day 18 batch in North India"
        tag="✓ Top third of batch"
        tagTone="green"
        ai="Top 10 mein aane ke liye tujhe sirf 2 aur orders chahiye is mahine. Top 10 RSOs ko DS Group ka Fast Track program milta hai — 6 mahine mein Senior RSO promotion possible hai."
      >
        <div className="mt-2 h-1.5 rounded bg-slate-100">
          <div className="h-full rounded bg-green-500" style={{ width: "32%" }} />
        </div>
      </KpiTile>

      <KpiTile
        title="BUDDY CONNECT"
        value="4 days"
        valueColor="#dc2626"
        sub={buddyNudgeActivated ? "Deepak ne message kiya — aaj baat karo 🤝" : "since last contact with Deepak"}
        tag="⚠ Reconnect recommended"
        tagTone="amber"
      >
        <div className="mt-1 text-[10px] text-slate-600">Deepak Verma · Senior RSO · Meerut</div>
        <button className="mt-2 rounded-md border border-amber-300 px-2 py-1 text-[11px] text-amber-700">
          WhatsApp Karo 👋
        </button>
      </KpiTile>

      <KpiTile title="BADGE WALL" value="🏅" valueColor={AMBER} sub="Achieved Day 14 — top 30% of batch" tag="✓ 2 badges earned" tagTone="green">
        <div className="text-sm font-bold" style={{ color: AMBER }}>
          First 5 Orders 🎯
        </div>
        <button className="mt-1 text-[10px] text-slate-500 hover:underline">Wall of Fame par share karo →</button>
      </KpiTile>
    </div>
  );
}

function KpiTile({
  title,
  value,
  valueColor,
  sub,
  tag,
  tagTone,
  ai,
  children,
}: {
  title: string;
  value: string;
  valueColor: string;
  sub: string;
  tag: string;
  tagTone: "amber" | "green" | "grey";
  ai?: string;
  children?: ReactNode;
}) {
  const tagClass =
    tagTone === "green"
      ? "text-green-700 bg-green-50"
      : tagTone === "amber"
        ? "text-amber-700 bg-amber-50"
        : "text-slate-600 bg-slate-50";
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{title}</div>
      <div className="mt-1 font-display text-2xl font-semibold" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-xs text-slate-600">{sub}</div>
      {children}
      <div className={`mt-2 inline-block rounded px-2 py-0.5 text-[10px] ${tagClass}`}>{tag}</div>
      {ai && (
        <div className="mt-2 rounded-md border border-dashed border-emerald-500/20 bg-emerald-50/50 p-2 text-[10px] leading-snug text-emerald-800">
          <span className="font-semibold">AI · </span>
          {ai}
        </div>
      )}
    </div>
  );
}

function JourneyStepper() {
  const steps = [
    { label: "Week 1: Joining & Training", range: "Day 1–7", state: "done" as const },
    { label: "Week 2–3: Route Learning", range: "Day 8–21", state: "done" as const },
    { label: "Month 2: First Targets", range: "Day 22–60", state: "active" as const },
    { label: "Month 3: Full Territory", range: "Day 61–89", state: "upcoming" as const },
    { label: "Day 90: Probation Review", range: "Day 90", state: "upcoming" as const },
  ];
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">Teri 90-Din Ki Journey</h3>
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-5">
        {steps.map((s) => (
          <div key={s.label} className="rounded-lg border border-[#e5e7eb] p-3">
            <div
              className={`text-xs font-medium ${
                s.state === "done" ? "text-green-600" : s.state === "active" ? "text-amber-600" : "text-slate-400"
              }`}
            >
              {s.state === "done" ? "✓ Completed" : s.state === "active" ? "● Active" : "Upcoming"}
              {s.state === "active" && <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />}
            </div>
            <div className="mt-1 text-sm font-medium text-slate-800">{s.label}</div>
            <div className="text-[10px] text-slate-500">{s.range}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AttentionSection({
  attention,
  activeSelectId,
  setActiveSelectId,
  updateItemStatus,
}: {
  attention: ReturnType<ReturnType<typeof useWorkforceStore>["getPersonaAttention"]>;
  activeSelectId: string | null;
  setActiveSelectId: (id: string | null) => void;
  updateItemStatus: (id: string, status: AttentionStatus) => void;
}) {
  const levelLabel: Record<string, string> = { critical: "CRITICAL", warn: "ACTION TODAY", good: "HEALTHY" };
  const btnClass: Record<string, string> = {
    critical: "bg-red-600 text-white",
    warn: "bg-amber-500 text-white",
    good: "border border-green-400 text-green-700",
  };
  const btnOutline: Record<string, string> = {
    warn: "border border-amber-400 text-amber-700",
  };

  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">What Needs Your Attention</h3>
      <div className="mt-3 space-y-3">
        {attention.map((a) => (
          <div key={a.id} className="rounded-xl border border-[#e5e7eb] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    a.level === "critical" ? "text-red-600" : a.level === "warn" ? "text-amber-600" : "text-green-600"
                  }`}
                >
                  {a.level === "warn" && a.id === "arjun-3" ? "NUDGE" : levelLabel[a.level]}
                </div>
                <div className="mt-1 font-medium text-slate-900">{a.title}</div>
                <div className="mt-0.5 text-sm text-slate-600">{a.detail}</div>
                <button
                  className={`mt-3 rounded-md px-3 py-1.5 text-xs font-medium ${
                    a.level === "good"
                      ? btnClass.good
                      : a.id === "arjun-3"
                        ? btnOutline.warn
                        : btnClass[a.level]
                  }`}
                >
                  {a.cta} →
                </button>
              </div>
              <StatusPill
                id={a.id}
                status={a.status}
                activeSelectId={activeSelectId}
                setActiveSelectId={setActiveSelectId}
                updateItemStatus={updateItemStatus}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StatusPill({
  id,
  status,
  activeSelectId,
  setActiveSelectId,
  updateItemStatus,
}: {
  id: string;
  status: AttentionStatus;
  activeSelectId: string | null;
  setActiveSelectId: (id: string | null) => void;
  updateItemStatus: (id: string, status: AttentionStatus) => void;
}) {
  if (activeSelectId === id) {
    return (
      <div className="flex flex-wrap gap-1 rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-sm">
        {(["Open", "In Progress", "Done", "Overdue"] as AttentionStatus[]).map((st) => (
          <button
            key={st}
            onClick={() => {
              updateItemStatus(id, st);
              setActiveSelectId(null);
            }}
            className={`rounded border px-2 py-1 text-[10px] font-semibold ${statusStyles[st]}`}
          >
            {st}
          </button>
        ))}
      </div>
    );
  }
  return (
    <button
      onClick={() => setActiveSelectId(id)}
      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[status]}`}
    >
      {status}
    </button>
  );
}

function AiSaathi() {
  const prompts = [
    "Agar main 15 orders karta hoon toh kitna milega?",
    "Mera probation clear hone ke kitne chances hain?",
    "Sharma Kirana kaise approach karoon — kya pitch karun?",
    "Deepak bhai se kya baat karun — buddy reconnect tips?",
    "DS Group mein RSO se promotion kitne time mein hota hai?",
  ];
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">AI Saathi · Chat Karo</h3>
      <input
        className="mt-3 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200"
        placeholder="Kuch bhi pucho — targets, kamai, company ke baare mein..."
      />
      <div className="mt-3 grid gap-2">
        {prompts.map((p) => (
          <button key={p} className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-left text-sm text-slate-700 hover:bg-amber-50">
            {p}
          </button>
        ))}
      </div>
    </Card>
  );
}

function InsightCard() {
  return (
    <Card>
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
        Performance Nudge Agent · Arjun ke liye insight aaj
      </div>
      <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">Tum sahi raah par ho — ek push aur chahiye</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        Tumhare batch mein jo RSOs Day 20 tak 8+ orders kar lete hain, unke probation clear karne ke chances 78% zyada
        hote hain. Abhi tumhare paas 7 orders hain. Sharma Kirana (Meerut Cantonment, unvisited, ₹2,400 avg order) aur
        Gupta Provision Store aaj visit karo — dono milake target possible hai.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["7", "Orders so far"],
          ["8", "Target by Day 20"],
          ["78%", "Better pass rate"],
          ["₹2,400", "Sharma Kirana potential"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-lg bg-slate-50 p-3 text-center">
            <div className="font-display text-lg font-semibold">{v}</div>
            <div className="text-[10px] text-slate-500">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-slate-500">74% · 847 RSO cohort records · 21-day ramp window</div>
      <div className="mt-2 flex flex-wrap gap-1">
        {["order data", "batch performance", "store pipeline", "ramp history"].map((s) => (
          <span key={s} className="rounded-full border border-[#e5e7eb] px-2 py-0.5 text-[10px] text-slate-600">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button className="rounded-md border border-green-300 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50">
          Helpful tha 👍
        </button>
      </div>
      <div className="mt-3 border-t border-dashed border-[#e5e7eb] pt-2 text-[10px] text-slate-500">
        Generated 06:30 · Performance Nudge Agent v1.2 · 21-day cohort window
      </div>
    </Card>
  );
}

function ActivityLog() {
  const runs = [
    ["06:30", "Performance Nudge Agent", "Tera order pace dekha — batch comparison kiya. Sharma Kirana unvisited hai — aaj ka top opportunity. Added to your attention."],
    ["06:18", "Route Optimization Agent", "Tere 40 stores analyse kiye. Aaj ke liye best route suggest kiya — 6 stores, 14 km, 5 hours. Saves 2 km vs yesterday."],
    ["06:05", "Earnings Agent", "Is mahine ke orders se projected kamai calculate ki: ₹4,800. 15 orders karne par ₹9,200 milega. Calculator updated."],
    ["05:48", "Learning Agent", "2 modules pending dekhe — Catch Spices Product Training deadline kal hai. Reminder add kiya."],
    ["05:31", "Buddy Connect Agent", "Deepak Verma se 4 din se contact nahi hua. Reconnect nudge add kiya teri attention list mein."],
  ];
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">AI Saathi ki Raat Bhar Ki Activity</h3>
      <ul className="mt-3 space-y-3">
        {runs.map(([time, name, what]) => (
          <li key={time} className="flex gap-3 text-sm">
            <span className="shrink-0 font-mono text-[11px] text-slate-500">{time}</span>
            <div>
              <div className="font-medium text-slate-800">{name}</div>
              <div className="text-slate-600">{what}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function RouteScreen({ stores }: { stores: StoreRow[] }) {
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">Mera Route (40 Stores)</h3>
      <p className="mt-1 text-xs text-slate-500">Aaj ke recommended 6 stores highlighted in amber</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-2">Name</th>
              <th>Area</th>
              <th>Last visited</th>
              <th>Status</th>
              <th>Avg order</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.name} className={`border-t border-[#e5e7eb] ${s.routeToday ? "bg-amber-50" : ""}`}>
                <td className="py-2 font-medium">{s.name}</td>
                <td>{s.area}</td>
                <td>{s.lastVisited}</td>
                <td className={s.status === "Overdue" ? "text-red-600" : s.status === "Due" ? "text-amber-600" : "text-green-600"}>
                  {s.status}
                </td>
                <td>{s.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function EarningsScreen() {
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">Meri Kamai</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Current pace", "₹4,800"],
          ["Hit 10 orders", "₹6,800"],
          ["Hit 15 orders", "₹9,200"],
          ["Hit 20 orders", "₹12,400"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-[#e5e7eb] p-4">
            <div className="text-xs text-slate-500">{l}</div>
            <div className="mt-1 font-display text-xl font-semibold" style={{ color: AMBER }}>
              {v}
            </div>
          </div>
        ))}
      </div>
      <table className="mt-6 w-full text-sm">
        <thead className="text-left text-[11px] uppercase text-slate-500">
          <tr>
            <th className="py-2">Slab</th>
            <th>Orders</th>
            <th>Earnings</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Slab 1", "1–9", "₹4,800"],
            ["Slab 2", "10–14", "₹6,800"],
            ["Slab 3", "15–19", "₹9,200"],
            ["Slab 4", "20+", "₹12,400"],
          ].map(([s, o, e]) => (
            <tr key={s} className="border-t border-[#e5e7eb]">
              <td className="py-2">{s}</td>
              <td>{o}</td>
              <td className="font-semibold" style={{ color: AMBER }}>
                {e}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-medium text-amber-800">Ek order aur = ₹400 zyada</div>
    </Card>
  );
}

function SalesTracker() {
  const days = Array.from({ length: 18 }, (_, i) => ({ day: i + 1, orders: ((i % 5) + 1) }));
  const max = 5;
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">Sales Tracker</h3>
      <div className="mt-4 flex h-48 items-end gap-1">
        {days.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t bg-amber-500/80" style={{ height: `${(d.orders / max) * 100}%`, minHeight: 8 }} />
            <span className="text-[9px] text-slate-400">{d.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="h-2 w-4 rounded bg-amber-500" /> Daily orders
        </span>
        <span className="flex items-center gap-1">
          <span className="h-0.5 w-4 border-t-2 border-dashed border-slate-400" /> Cumulative target
        </span>
      </div>
    </Card>
  );
}

function RoadmapScreen() {
  return (
    <div className="space-y-4">
      <JourneyStepper />
      <Card>
        <h3 className="font-display text-lg font-semibold text-slate-900">90-Day Roadmap — Detail</h3>
        <div className="mt-4 space-y-4 text-sm text-slate-700">
          <Phase title="Week 1: Joining & Training ✓" body="Induction, product basics, shadowing with TSM. Completed Day 7." />
          <Phase title="Week 2–3: Route Learning ✓" body="40-store territory mapped. Buddy Deepak assigned. 7 stores visited." />
          <Phase
            title="Month 2: First Targets ●"
            body="15 orders/month target. 7 done so far. Focus: visit frequency + order value. Current stage."
          />
          <Phase title="Month 3: Full Territory" body="Cover all 40 stores weekly. Hit 15+ orders. Learning modules complete." />
          <Phase title="Day 90: Probation Review" body="TSM + HRBP review. Pass criteria: orders, learning, attendance, manager rating." />
        </div>
      </Card>
    </div>
  );
}

function Phase({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-[#e5e7eb] p-3">
      <div className="font-semibold text-slate-900">{title}</div>
      <p className="mt-1">{body}</p>
    </div>
  );
}

function LearningModules() {
  const modules = [
    ["Rajnigandha Basics", "20 min", "Done", "2 Jun"],
    ["Catch Spices Product Training", "25 min", "Pending", "6 Jun"],
    ["Retail Pitch Essentials", "18 min", "Done", "3 Jun"],
    ["Objection Handling", "22 min", "Pending", "7 Jun"],
    ["Beat Planning", "15 min", "Done", "1 Jun"],
    ["DS Group Culture", "12 min", "Done", "31 May"],
  ];
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">Learning Modules</h3>
      <div className="mt-4 space-y-2">
        {modules.map(([name, dur, status, due]) => (
          <div key={String(name)} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#e5e7eb] p-3">
            <div>
              <div className="font-medium text-slate-900">{name}</div>
              <div className="text-xs text-slate-500">
                {dur} · Due {due}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  status === "Done" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {status}
              </span>
              {status === "Pending" && (
                <button className="rounded-md border border-amber-300 px-2 py-1 text-xs text-amber-700">Start karo →</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BatchRanking() {
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">Batch Ranking</h3>
      <p className="mt-1 text-sm text-slate-600">Top 10 of 38 in Arjun&apos;s Day 18 batch · North India</p>
      <div className="mt-4 space-y-1">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="rounded-md border border-[#e5e7eb] px-3 py-2 text-sm">
            #{i + 1} · RSO {String.fromCharCode(65 + i)}*** (anonymised)
          </div>
        ))}
        <div className="rounded-md border-2 border-amber-400 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
          #12 · Arjun Rawat — highlighted
        </div>
      </div>
      <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Is hafte top 10 mein aa sakte ho 🎯</div>
    </Card>
  );
}

function StoreScorecard({ stores }: { stores: StoreRow[] }) {
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold text-slate-900">Store Scorecard</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase text-slate-500">
            <tr>
              <th className="py-2">Store</th>
              <th>Visit freq</th>
              <th>Last order</th>
              <th>Potential</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s, idx) => (
              <tr key={s.name} className="border-t border-[#e5e7eb]">
                <td className="py-2 font-medium">{s.name}</td>
                <td>{idx % 3 === 0 ? "High" : "Medium"}</td>
                <td>{s.lastVisited}</td>
                <td>{s.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <section className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm lg:p-5">{children}</section>;
}
