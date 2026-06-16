import {
  AiInsightBanner,
  HBar,
  Panel,
  PremiumKpi,
  ScreenShell,
  useDrill,
} from "./primitives";
import type { DrillData } from "../drilldowns";

export function DeiComplianceScreen() {
  const d = useDrill();

  const poshDrill = (caseId: string): DrillData => {
    const casesMap: Record<string, DrillData> = {
      "POSH-2026-08": {
        title: "POSH-2026-08 — Noida Main Plant Case",
        subtitle: "Verbal Harassment investigation in Packaging line",
        summary: [
          "Case filed by worker S. Devi on 29 May 2026. External committee member appointed. Investigation hearings currently active.",
        ],
        metrics: [
          { label: "Status", value: "Active", tone: "critical" },
          { label: "Days Active", value: "12" },
          { label: "Hearings", value: "2 / 3" },
          { label: "Risk Level", value: "Medium" },
        ],
        table: {
          columns: ["Date", "Milestone", "Action by", "Result"],
          rows: [
            ["29 May", "Complaint logged", "Plant HR", "Case ID generated"],
            ["02 Jun", "Respondent response rec.", "IC Committee", "Noted in file"],
            ["08 Jun", "Hearing 1 (Complainant)", "IC Committee", "Statements recorded"],
            ["11 Jun", "Hearing 2 (Respondent)", "IC Committee", "Scheduled today 15:00"],
          ],
        },
        recommendations: [
          "Ensure respondent remains relocated to Plant 2 during hearings.",
          "Complete final IC review report by 20 June deadline.",
        ],
      },
      "POSH-2026-07": {
        title: "POSH-2026-07 — Sales North East Case",
        subtitle: "Retaliation complaint by ex-RSO",
        summary: [
          "Complaint filed alleging hostile manager retaliation after internal transfer request. Statements being collected under strict confidentiality.",
        ],
        metrics: [
          { label: "Status", value: "Active", tone: "critical" },
          { label: "Days Active", value: "19" },
          { label: "Hearings", value: "1 / 4" },
          { label: "Risk Level", value: "High", tone: "critical" },
        ],
        table: {
          columns: ["Date", "Action", "Owner", "Status"],
          rows: [
            ["22 May", "Complaint filed", "CHRO Office", "Initiated"],
            ["25 May", "Preliminary review", "IC Lead", "Admitted"],
            ["04 Jun", "Hearing 1 (Complainant)", "IC Committee", "Done"],
            ["15 Jun", "Hearing 2 (Witnesses)", "IC Committee", "Scheduled"],
          ],
        },
        recommendations: [
          "Expedite hearings. Regional manager must not have direct route influence.",
        ],
      },
    };

    return (
      casesMap[caseId] ?? {
        title: `${caseId} Case Details`,
        subtitle: "Resolved case files",
        summary: ["Case investigation closed. Remedial actions implemented successfully."],
        metrics: [
          { label: "Status", value: "Resolved", tone: "up" },
          { label: "Resolution", value: "11 days" },
          { label: "Compliance", value: "100%" },
        ],
      }
    );
  };

  const calendarDrill = (filingName: string): DrillData => ({
    title: `${filingName} Group Filing Profile`,
    subtitle: "Statutory filings details",
    summary: [`State-by-state compliance profile for ${filingName}.`],
    metrics: [
      { label: "Entities covered", value: "8" },
      { label: "Due Date", value: "30 June" },
      { label: "Status", value: "Drafting", tone: "warn" },
      { label: "AI pre-fill", value: "84%" },
    ],
    table: {
      columns: ["Entity / BU", "State", "Filing Status", "Assigned Owner"],
      rows: [
        ["DS Group Manufacturing", "Uttar Pradesh", "Pre-filled 92%", "Ravi Sharma"],
        ["Catch Spices (Satellite)", "Delhi NCR", "Drafting 80%", "N. Verma"],
        ["Hospitality Division", "Uttarakhand", "Pending", "K. Singh"],
        ["Retail Division (Le Marche)", "Haryana", "Completed", "A. Roy"],
      ],
    },
    recommendations: [
      "Hospitality entity has not initiated draft. Nudge Kavita Singh.",
    ],
  });

  return (
    <ScreenShell
      title="DEI & Compliance Intelligence"
      subtitle="Group-level diversity scorecards, POSH caseloads, and statutory factory compliance tracking."
    >
      {/* KPI Row */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <PremiumKpi
          label="Women Workforce Ratio"
          value="21%"
          delta="↑ +2.4% YoY"
          sub="Target 28% by 2027"
          tone="up"
          spark={[18.2, 18.9, 19.4, 19.8, 20.2, 20.7, 21]}
          ai="HQ leads at 35%; Manufacturing lags at 14%."
        />
        <PremiumKpi
          label="Active POSH cases"
          value="2"
          delta="Critical alert"
          sub="14 resolved YTD · Avg 11d resolution"
          tone="critical"
          spark={[4, 3, 2, 3, 1, 2, 2]}
          ai="2 active cases under formal IC investigation."
        />
        <PremiumKpi
          label="PwD Representation"
          value="2.4%"
          delta="↑ +0.3% YoY"
          sub="184 employees · Target 3.0%"
          tone="warn"
          spark={[1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.4]}
        />
        <PremiumKpi
          label="Labour filings compliance"
          value="100%"
          delta="All BUs certified"
          sub="No SLA breaches YTD"
          tone="up"
        />
      </section>

      <AiInsightBanner
        title="AI identified a minor gender diversity sourcing gap in Sales and Hospitality roles."
        description="FMCG distributor route hires lag target diversity ratios by 9pp; onboarding retention for hospitality crew is 12% higher for female buds."
        confidence={90}
        sources="Onboarding telemetry · Recruitment logs · HR statistics"
        onAddActions={() =>
          d.open({
            title: "Recommended Actions — DEI Acceleration",
            summary: ["AI-ranked talent sourcing actions to bridge diversity gaps."],
            recommendations: [
              "Partner with 3 diversity-focused vocational placement cells for Hospitality.",
              "Introduce a structured referral bonus (+15%) for female field sales routes.",
              "Deploy accessibility checkups to Greater Noida Plant 2."
            ],
          })
        }
        onView={() =>
          d.open({
            title: "Diversity Deep-dive",
            summary: ["Detailed statistics of female hires and retention metrics."],
            metrics: [
              { label: "Hired 6M", value: "34%", tone: "up" },
              { label: "Retention diff", value: "+12% F", tone: "up" },
              { label: "Sourcing deficit", value: "-9pp Sales", tone: "warn" }
            ],
          })
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Gender Diversity BU Heatmap */}
        <Panel
          title="Gender Ratio by Business Unit"
          sub="Women representation against BU target metrics"
        >
          <div className="space-y-3.5">
            <HBar
              label="Corporate Headquarters (Noida HQ)"
              value={35}
              max={45}
              tone="warn"
              meta="35% representation · BU Target: 45%"
            />
            <HBar
              label="Brand & Marketing Executive cohort"
              value={44}
              max={50}
              tone="up"
              meta="44% representation · BU Target: 50%"
            />
            <HBar
              label="Premium Retail (L'Opera & Le Marche)"
              value={42}
              max={50}
              tone="up"
              meta="42% representation · BU Target: 50%"
            />
            <HBar
              label="Hospitality Division"
              value={38}
              max={45}
              tone="warn"
              meta="38% representation · BU Target: 45%"
            />
            <HBar
              label="Field Sales Force"
              value={18}
              max={30}
              tone="down"
              meta="18% representation · BU Target: 30%"
            />
            <HBar
              label="Manufacturing Plants (Noida rollup)"
              value={14}
              max={25}
              tone="down"
              meta="14% representation · BU Target: 25%"
            />
          </div>
        </Panel>

        {/* Social Inclusion SC/ST & PwD */}
        <Panel
          title="Social Inclusion Scorecard"
          sub="PwD accessibility & social categories metrics"
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                SC/ST Representation
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold text-foreground">15.8%</span>
                <span className="text-xs text-success">Compliant</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Aligned with central regulatory guidelines across all corporate scales. Recruitment audits in May confirm zero anomalies.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                PwD Accessibility & Audits
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary/60 p-2.5">
                  <div className="text-[9px] uppercase text-muted-foreground">Sites Audited</div>
                  <div className="font-display text-sm font-semibold">9 / 12</div>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2.5">
                  <div className="text-[9px] uppercase text-muted-foreground">Accommodations</div>
                  <div className="font-display text-sm font-semibold">94% Met</div>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-primary">
                ✔ Greater Noida Plant 2 audit scheduled for next fortnight.
              </div>
            </div>
          </div>
        </Panel>

        {/* POSH Incident Tracker */}
        <Panel
          title="POSH Case Registry"
          sub="Prevention of Sexual Harassment cases · active & resolved YTD"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-2">Case ID</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Filed</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">POSH-2026-08</td>
                  <td>Mfg Noida</td>
                  <td>Verbal harassment</td>
                  <td>12d ago</td>
                  <td>
                    <span className="rounded bg-destructive/15 px-1.5 py-0.5 text-[9px] font-semibold text-destructive">
                      Active
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => d.open(poshDrill("POSH-2026-08"))}
                      className="text-xs text-primary hover:underline"
                    >
                      Investigate →
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">POSH-2026-07</td>
                  <td>Sales East</td>
                  <td>Retaliation claim</td>
                  <td>19d ago</td>
                  <td>
                    <span className="rounded bg-destructive/15 px-1.5 py-0.5 text-[9px] font-semibold text-destructive">
                      Active
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => d.open(poshDrill("POSH-2026-07"))}
                      className="text-xs text-primary hover:underline"
                    >
                      Investigate →
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">POSH-2026-06</td>
                  <td>HQ Corporate</td>
                  <td>Conduct breach</td>
                  <td>32d ago</td>
                  <td>
                    <span className="rounded bg-success/15 px-1.5 py-0.5 text-[9px] font-semibold text-success">
                      Resolved
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => d.open(poshDrill("POSH-2026-06"))}
                      className="text-xs text-primary hover:underline"
                    >
                      Logs →
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Group Labour Compliance Calendar */}
        <Panel
          title="Labour Compliance Calendar"
          sub="Group-level statutory returns across state jurisdictions"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-2">Filing Name</th>
                  <th>Frequency</th>
                  <th>Due Date</th>
                  <th>Coverage</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">Form C (Gratuity Annual)</td>
                  <td>Annual</td>
                  <td>30 Jun 2026</td>
                  <td>All Entities (8)</td>
                  <td>
                    <span className="rounded bg-warning/15 px-1.5 py-0.5 font-semibold text-warning">
                      Drafting (84%)
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => d.open(calendarDrill("Form C Gratuity"))}
                      className="text-primary hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">Contract Labour Return (Form XXIV)</td>
                  <td>Half-yearly</td>
                  <td>15 Jul 2026</td>
                  <td>Mfg Plants (3)</td>
                  <td>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                      Pending
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => d.open(calendarDrill("Form XXIV Contract Labour"))}
                      className="text-primary hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">Factories Act Return</td>
                  <td>Annual</td>
                  <td>21 Jul 2026</td>
                  <td>Mfg Plants (3)</td>
                  <td>
                    <span className="rounded bg-success/15 px-1.5 py-0.5 font-semibold text-success">
                      Completed
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => d.open(calendarDrill("Factories Act Return"))}
                      className="text-primary hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">Equal Opportunity Policy returns</td>
                  <td>Annual</td>
                  <td>31 Aug 2026</td>
                  <td>All Entities (8)</td>
                  <td>
                    <span className="rounded bg-success/15 px-1.5 py-0.5 font-semibold text-success">
                      Completed
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => d.open(calendarDrill("Equal Opportunity Return"))}
                      className="text-primary hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {d.node}
    </ScreenShell>
  );
}
