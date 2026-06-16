import { Panel, PremiumKpi, ScreenShell, useDrill } from "./primitives";

export function BoardReportingScreen() {
  const d = useDrill();
  return (
    <ScreenShell
      title="Board Reporting · People & Workforce"
      subtitle="Executive-grade workforce briefing · AI-compiled · ready for Friday review"
    >
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Attrition (12M)" value="18.4%" delta="↑ +2.1pp" sub="Sales-led" tone="warn" spark={[16.2, 16.6, 17.1, 17.5, 17.9, 18.2, 18.4]} />
        <PremiumKpi label="Leadership Pipeline" value="58%" delta="Target 75%" sub="Bench coverage" tone="warn" spark={[52, 53, 54, 55, 56, 57, 58]} />
        <PremiumKpi label="Workforce Cost YoY" value="↑ 11.8%" sub="Compensation pressure" tone="warn" spark={[8.1, 8.9, 9.4, 10.1, 10.8, 11.4, 11.8]} />
        <PremiumKpi label="AI Adoption" value="38%" delta="↑ +14pp" sub="HRBPs + line managers" tone="up" spark={[12, 18, 22, 26, 30, 34, 38]} />
        <PremiumKpi label="Women in Leadership" value="17%" delta="Target 30%" sub="2027 commitment" tone="warn" spark={[14.1, 14.8, 15.3, 15.8, 16.2, 16.6, 17]} />
        <PremiumKpi label="Skills Expiry Risk" value="34%" delta="18M window" sub="Manufacturing led" tone="critical" spark={[26, 28, 30, 31, 32, 33, 34]} />
        <PremiumKpi label="Transformation Index" value="42%" delta="Target 65%" sub="People + Process" tone="warn" spark={[28, 30, 33, 36, 38, 40, 42]} />
        <PremiumKpi label="Engagement" value="71" delta="↓ −4pp" sub="3 sites below threshold" tone="down" spark={[76, 75, 74, 73, 72, 71, 71]} />
      </section>

      <Panel
        title="AI-Generated Executive Summary"
        sub="Auto-compiled from cockpit data · 78% ready · 3 sections need CHRO input"
        right={
          <div className="flex gap-2">
            <button
              onClick={() =>
                d.open({
                  title: "Generate Board Summary",
                  subtitle: "AI Board Composer · GPT-grade narrative",
                  sections: [
                    {
                      title: "Will produce",
                      items: [
                        "Executive narrative (one-page)",
                        "Strategic risks (top 5 with mitigations)",
                        "AI recommendations (3 board-level decisions)",
                        "Appendix: 18 charts, 6 tables, 11 initiative trackers",
                      ],
                    },
                  ],
                  recommendations: ["Export as .pptx", "Export as .pdf", "Send to Board pre-read inbox"],
                })
              }
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              Generate Board Summary
            </button>
            <button className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
              Export PPT
            </button>
            <button className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
              Export PDF
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-sm leading-relaxed text-foreground/85">
          <p>
            DS Group's workforce is growing at +4.1% YoY to 18,742, with Hospitality leading growth and Manufacturing
            contracting on automation. The defining risk this quarter is the convergence of <strong>field sales attrition</strong>{" "}
            (18.4%, sales force = 43% of exits) and <strong>skills expiry</strong> (34% of critical skills with an 18-month
            window). Combined revenue exposure is estimated at ₹84 Cr over 12 months.
          </p>
          <p>
            Leadership pipeline coverage is 58% against a 75% target. The Hospitality South bench is the single
            largest succession exposure. AI has assembled an external shortlist and proposed an internal HiPo
            rotation; both options are detailed in the appendix.
          </p>
          <p>
            The People + Process Transformation Index is 42% against a 65% target. Two initiatives are behind
            (Manager Quality Coaching, L&D Personalisation) and three are on watch. Recommendation to the Board is
            to ring-fence Q3 spend for the Retention Action Plan and Manager Coaching cohorts.
          </p>
        </div>
      </Panel>

      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="Strategic Risks (Board view)">
          <ul className="space-y-2 text-sm">
            {[
              ["Field sales attrition + festive distribution", "Critical", "Retention Action Plan + territory redesign"],
              ["Skills obsolescence (Manufacturing)", "Critical", "Reskilling Wave 1 — 744 workers"],
              ["Hospitality leadership bench (South)", "High", "HiPo rotation + external shortlist"],
              ["Comp pressure & OT (Manufacturing Plant 2)", "High", "Comp band review + OT cap policy"],
              ["L&D adoption lag", "Watch", "Personalisation + manager nudges"],
            ].map(([r, sev, mit]) => (
              <li key={r} className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium text-foreground">{r}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      sev === "Critical"
                        ? "bg-destructive/15 text-destructive"
                        : sev === "High"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/15 text-success"
                    }`}
                  >
                    {sev}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Mitigation: {mit}</div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="AI Recommendations · Board-level decisions">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-foreground/85">
            <li>
              <strong>Approve ₹14 Cr Retention Action Plan</strong> — protects ₹84 Cr revenue exposure across Field
              Sales N&E.
            </li>
            <li>
              <strong>Ring-fence ₹6 Cr for Reskilling Wave 1</strong> — 744 manufacturing workers, ahead of
              automation Q4 2026.
            </li>
            <li>
              <strong>Endorse Hospitality leadership refresh</strong> — internal HiPo rotation + external shortlist
              for Manu Maharani GM.
            </li>
          </ol>
        </Panel>
      </section>

      {d.node}
    </ScreenShell>
  );
}
