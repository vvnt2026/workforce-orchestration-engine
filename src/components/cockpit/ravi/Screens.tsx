import {
  ScreenShell,
  PremiumKpi,
  AiInsightBanner,
  Panel,
  HBar,
  LineChart,
  RadarChart,
  useDrill,
} from "../subrat/primitives";
import type { DrillData } from "../drilldowns";

const EYEBROW = "Ravi Sharma · Plant Workforce Operations · Noida Manufacturing Plant";

const COPILOT = [
  "Which workers are highest fatigue risk?",
  "Predict next month absenteeism",
  "Show compliance gaps",
  "Recommend shift optimization",
  "Which supervisors need intervention?",
];

// ============================================================
// WORKFORCE (default)
// ============================================================
export function WorkforceScreen() {
  const d = useDrill();
  const shiftDrill = (shift: string): DrillData => ({
    title: `Shift ${shift} — Operations Deep Dive`,
    subtitle: "Worker-level analytics · burnout · production dependency",
    summary: [
      `Shift ${shift} ${shift === "B" ? "is the hotspot — attendance and fatigue both flagged" : "operating within tolerance with selective risks"}.`,
    ],
    metrics: [
      { label: "Workers", value: shift === "A" ? "168" : shift === "B" ? "164" : "155" },
      { label: "Attendance", value: shift === "B" ? "87.4%" : shift === "A" ? "93.1%" : "91.8%", tone: shift === "B" ? "critical" : "up" },
      { label: "Productivity", value: shift === "B" ? "81" : "92", tone: shift === "B" ? "warn" : "up" },
      { label: "Fatigue flagged", value: shift === "B" ? "14" : shift === "A" ? "3" : "1", tone: shift === "B" ? "critical" : "default" },
    ],
    table: {
      columns: ["Worker ID", "Line", "OT hrs", "Absences (30d)", "AI risk"],
      rows: [
        ["EMP-4112", "Packaging-2", 28, 4, "High"],
        ["EMP-4218", "Packaging-2", 26, 5, "High"],
        ["EMP-4307", "Quality", 22, 2, "Medium"],
        ["EMP-4451", "Mixing", 19, 1, "Low"],
      ],
    },
    recommendations: [
      "Rotate 6 packaging workers to lighter line for 10 days",
      "Activate backup roster — 4 contract workers on standby",
      "Supervisor coaching for Zone 2 lead — escalation pattern detected",
    ],
  });

  const contractDrill: DrillData = {
    title: "Contract Workforce — Packaging Unit",
    summary: ["Attrition rising in packaging contractor cohort. Agency dependency at 62%."],
    metrics: [
      { label: "Contractors", value: "221" },
      { label: "Agency dep.", value: "62%", tone: "warn" },
      { label: "Compliance", value: "94%", tone: "up" },
      { label: "Renewals 30d", value: "12", tone: "warn" },
    ],
    table: {
      columns: ["Vendor", "Workers", "Compliance", "Attrition (90d)", "Cost / wkr"],
      rows: [
        ["Apex Manpower", 84, "97%", "11%", "₹18,400"],
        ["NorthStar Staffing", 62, "92%", "19%", "₹17,900"],
        ["Trident HR", 45, "95%", "8%", "₹19,200"],
        ["RapidForce", 30, "88%", "24%", "₹17,200"],
      ],
    },
    recommendations: [
      "Consolidate from 4 to 2 vendors — projected ₹6.4L annual saving",
      "Renew Trident HR early — best compliance + retention combo",
      "Replace RapidForce — failing both attrition and compliance bars",
    ],
  };

  const productivityDrill: DrillData = {
    title: "Workforce Productivity — Shift comparison",
    summary: ["Productivity drops 11% after 10 consecutive overtime days."],
    metrics: [
      { label: "Units / shift", value: "14,820" },
      { label: "Efficiency", value: "88%", tone: "up" },
      { label: "Downtime", value: "4.2%", tone: "warn" },
      { label: "OT-driven loss", value: "11%", tone: "critical" },
    ],
    recommendations: ["Cap OT at 8 consecutive days", "Stagger break cycles on Shift B"],
  };

  const riskDrillMap = (cat: string): DrillData => ({
    title: `${cat} — Workforce Risk`,
    summary: [`AI-detected ${cat.toLowerCase()} risk concentrated in Packaging + Shift B.`],
    metrics: [
      { label: "Score", value: cat === "Fatigue" ? "72/100" : "48/100", tone: "warn" },
      { label: "Workers", value: cat === "Fatigue" ? "18" : "9" },
      { label: "Trend", value: "↑ 6 weeks", tone: "warn" },
      { label: "Forecast 30d", value: cat === "Fatigue" ? "High" : "Medium", tone: "critical" },
    ],
    recommendations: ["Targeted intervention list (12 workers)", "Supervisor coaching", "Policy review"],
  });

  return (
    <ScreenShell
      title="Plant Workforce Intelligence"
      subtitle="Real-time workforce visibility across production shifts, contractor workforce, and plant operations."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <PremiumKpi label="Total Workforce" value="487" delta="↑ +4.2% QoQ" sub="Permanent + Contract" tone="up" spark={[420, 440, 455, 462, 470, 480, 487]} ai="Stable headcount, contract share rising" />
        <PremiumKpi label="Contract Workforce" value="221" delta="High dep." sub="45% of total · packaging-led" tone="warn" spark={[180, 190, 200, 205, 212, 218, 221]} ai="Dependency concentration risk" />
        <PremiumKpi label="Attendance Today" value="91.4%" delta="↓ -3.1pp" sub="Shift B below threshold" tone="down" spark={[95, 94, 93, 92, 91, 90, 91]} ai="Decline correlates with OT spike" />
        <PremiumKpi label="Overtime Hours" value="1,842" delta="Threshold approaching" sub="MTD · cap 2,000" tone="critical" spark={[1200, 1320, 1480, 1610, 1720, 1800, 1842]} ai="Will breach in 6 days at current pace" />
        <PremiumKpi
          label="Active Grievances"
          value="7"
          delta="2 escalated"
          sub="Packaging Zone 2 cluster"
          tone="warn"
          ai="Active grievances at Noida Plant rose to 6 this week, primarily related to summer overtime shifts. Average resolution time: 4.8 days. Recommended: union check-in."
        />
        <PremiumKpi label="Safety Incidents" value="3" delta="↓ improving" sub="All minor · MTD" tone="up" spark={[7, 6, 5, 4, 3, 3, 3]} />
        <PremiumKpi label="Shift Fatigue Risk" value="18" delta="High risk" sub="Workers flagged this week" tone="critical" ai="14 from Shift B" />
        <PremiumKpi
          label="Open Reqs"
          value="34"
          delta="Pulse season"
          sub="Lead time 21 days"
          tone="warn"
          ai="Seasonal demand spike in Mouth Freshener production requires +40 operators by next Monday. Current hiring pipeline is short 14 candidates. Overtime cost forecast: +₹2.4L."
        />
      </div>

      <AiInsightBanner
        title="AI detected rising fatigue and attendance decline in Shift B."
        description="Attendance dropped 8.2% over 21 days. Pattern correlates with overtime spikes and seasonal production pressure."
        confidence={91}
        sources="Attendance logs · Shift schedules · Overtime records · Supervisor reports"
        onAddActions={() =>
          d.open({
            title: "Recommended Actions — Shift B Stabilisation",
            summary: ["AI-ranked actions with impact, cost and risk reduction estimates."],
            table: {
              columns: ["Action", "Impact", "Cost", "Productivity Δ", "Risk reduction"],
              rows: [
                ["Redistribute workforce", "High", "₹0", "+4.1%", "32%"],
                ["Reduce overtime cap to 18h", "High", "₹1.4L", "+2.8%", "41%"],
                ["Welfare intervention (14 wkrs)", "Medium", "₹18,000", "+1.6%", "28%"],
                ["Supervisor review — Zone 2", "Medium", "₹0", "+1.2%", "22%"],
                ["Fatigue monitoring wearables", "High", "₹3.6L", "+3.4%", "47%"],
                ["Backup staffing — 8 contract", "High", "₹2.1L", "+2.2%", "36%"],
              ],
            },
            recommendations: ["Trigger top 3 today — cumulative 71% risk reduction"],
          })
        }
        onView={() =>
          d.open({
            title: "Shift B — Full Analysis",
            summary: ["21-day pattern with overtime, attendance and grievance correlation."],
            metrics: [
              { label: "Attendance", value: "87.4%", tone: "critical" },
              { label: "OT / worker", value: "26h", tone: "warn" },
              { label: "Grievances (Zone 2)", value: "4", tone: "warn" },
              { label: "Heat complaints", value: "18 days open", tone: "critical" },
            ],
            recommendations: ["Cooling unit ₹92K capex", "Re-roster 12 workers", "Coaching session for supervisor"],
          })
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Shift Operations Heatmap" sub="Click a shift to drill in">
          <div className="space-y-2">
            {[
              { s: "Shift A", attendance: 93, prod: 92, fatigue: 18, ot: 12, tone: "up" as const },
              { s: "Shift B", attendance: 87, prod: 81, fatigue: 72, ot: 78, tone: "critical" as const },
              { s: "Shift C", attendance: 91, prod: 88, fatigue: 34, ot: 41, tone: "warn" as const },
            ].map((row) => (
              <button
                key={row.s}
                onClick={() => d.open(shiftDrill(row.s.split(" ")[1]))}
                className="grid w-full grid-cols-5 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs hover:border-primary"
              >
                <span className="font-semibold text-foreground">{row.s}</span>
                <Cell label="Attd" v={row.attendance} good />
                <Cell label="Prod" v={row.prod} good />
                <Cell label="Fatg" v={row.fatigue} />
                <Cell label="OT" v={row.ot} />
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Contract Workforce Analytics" sub="Vendor + compliance + attrition">
          <div className="space-y-2.5">
            <HBar label="Apex Manpower" value={97} max={100} tone="up" meta="84 workers · 11% attrition" onClick={() => d.open(contractDrill)} />
            <HBar label="NorthStar Staffing" value={92} max={100} tone="warn" meta="62 workers · 19% attrition" onClick={() => d.open(contractDrill)} />
            <HBar label="Trident HR" value={95} max={100} tone="up" meta="45 workers · 8% attrition" onClick={() => d.open(contractDrill)} />
            <HBar label="RapidForce" value={88} max={100} tone="critical" meta="30 workers · 24% attrition" onClick={() => d.open(contractDrill)} />
          </div>
          <div className="mt-3 rounded-md border border-dashed border-warning/40 bg-warning/5 p-2.5 text-[11px] text-foreground/80">
            <span className="font-semibold text-warning">AI · </span>
            Contract workforce attrition risk rising in Packaging Unit. Consolidate vendors.
          </div>
        </Panel>

        <Panel title="Workforce Productivity" sub="Units vs OT correlation" right={<button onClick={() => d.open(productivityDrill)} className="text-xs text-primary hover:underline">Drill</button>}>
          <LineChart
            data={[
              { label: "W1", value: 14200 },
              { label: "W2", value: 14580 },
              { label: "W3", value: 14820 },
              { label: "W4", value: 14620 },
              { label: "W5", value: 14180 },
              { label: "W6", value: 13180, forecast: true },
              { label: "W7", value: 12940, forecast: true },
            ]}
          />
          <div className="mt-2 rounded-md border border-dashed border-destructive/30 bg-destructive/5 p-2.5 text-[11px] text-foreground/80">
            <span className="font-semibold text-destructive">AI · </span>
            Productivity drops 11% after 10 consecutive overtime days.
          </div>
        </Panel>

        <Panel title="Workforce Risk Radar" sub="5 vectors · click to expand">
          <RadarChart
            axes={[
              { label: "Fatigue", value: 78 },
              { label: "Attrition", value: 54 },
              { label: "Safety", value: 22 },
              { label: "Compliance", value: 38 },
              { label: "Shortages", value: 61 },
            ]}
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Fatigue", "Attrition", "Safety", "Compliance", "Shortages"].map((r) => (
              <button key={r} onClick={() => d.open(riskDrillMap(r))} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] hover:border-primary">
                {r}
              </button>
            ))}
          </div>
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

function Cell({ label, v, good }: { label: string; v: number; good?: boolean }) {
  const tone = good
    ? v >= 90 ? "bg-success/15 text-success" : v >= 80 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
    : v <= 25 ? "bg-success/15 text-success" : v <= 55 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive";
  return (
    <div className={`rounded px-1.5 py-1 text-center text-[10px] font-semibold ${tone}`}>
      <div className="text-[9px] opacity-70">{label}</div>
      <div>{v}{good ? "%" : ""}</div>
    </div>
  );
}

// ============================================================
// COMPLIANCE
// ============================================================
export function ComplianceScreen() {
  const d = useDrill();
  const item = (name: string): DrillData => ({
    title: `${name} — Compliance Drilldown`,
    summary: [`${name} status with missing records, audit readiness and escalation workflow.`],
    metrics: [
      { label: "Coverage", value: "94%", tone: "warn" },
      { label: "SLA", value: "On track", tone: "up" },
      { label: "Severity", value: "Medium", tone: "warn" },
      { label: "AI risk", value: "Low", tone: "up" },
    ],
    table: {
      columns: ["Worker", "Document", "Days open", "Owner"],
      rows: [
        ["EMP-4112", "Form 11", 6, "HR Ops"],
        ["EMP-4218", "PF UAN", 9, "Finance"],
        ["EMP-4307", "Medical fitness", 12, "Plant HR"],
      ],
    },
    recommendations: ["Auto-escalate to plant head after 14 days", "Bulk reminder to 18 workers"],
  });

  return (
    <ScreenShell
      title="Compliance & Workforce Risk"
      subtitle="Real-time factory workforce compliance intelligence."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <PremiumKpi label="ESIC Compliance" value="96%" tone="up" sub="1,191 / 1,240" />
        <PremiumKpi label="PF Reconciliation" value="18" delta="Pending" sub="Workers" tone="warn" />
        <PremiumKpi label="Labour Licence" value="2" delta="Renewal" sub="Due 30 days" tone="warn" />
        <PremiumKpi
          label="Safety Training"
          value="37"
          delta="Overdue"
          sub="Mandatory · Q2"
          tone="critical"
          ai="22 operators have electrical safety certifications expiring within 15 days. Non-compliance could stop Packaging Line 3. Recommended: schedule refresher training."
        />
        <PremiumKpi label="Audit Risks" value="4" delta="Open" sub="Q3 cycle" tone="warn" />
      </div>

      <AiInsightBanner
        title="Mandatory safety certification delays in Packaging Unit may trigger audit non-compliance risk within 14 days."
        description="37 workers on overdue safety refreshers; AI projects audit-readiness drop from 92% to 78% if not actioned this week."
        confidence={88}
        sources="LMS records · Audit calendar · Certification logs"
        onAddActions={() => d.open(item("Safety Training"))}
        onView={() => d.open(item("Audit readiness"))}
      />

      <Panel title="Compliance Tracker" sub="Status · SLA · AI risk · click to drill">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Item</th>
                <th>Status</th>
                <th>SLA</th>
                <th>Severity</th>
                <th>AI risk</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ESIC", "96% complete", "On track", "Low", "Low"],
                ["PF", "18 pending", "5 days", "Medium", "Medium"],
                ["Factory Act", "Compliant", "Annual", "Low", "Low"],
                ["Labour License", "2 renewals", "30 days", "High", "Medium"],
                ["Contractor Docs", "94%", "Rolling", "Medium", "Medium"],
                ["Safety Certification", "37 overdue", "14 days", "High", "High"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>
                    <button onClick={() => d.open(item(row[0]))} className="text-xs text-primary hover:underline">Drill →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Statutory Compliance Calendar" sub="Next 90 days · ESIC · PF · Factory Act · Contract Labour">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Filing</th>
                <th>Authority</th>
                <th>Due Date</th>
                <th>In</th>
                <th>Owner</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ESIC monthly contribution", "ESIC · Min. Labour", "15 Jun 2026", "4d", "Ravi Sharma", "Pre-filled 97%", "critical"],
                ["PF ECR return", "EPFO", "25 Jun 2026", "12d", "Finance Ops", "Reconciling 18 UANs", "warn"],
                ["PF KYC update", "EPFO", "25 Jun 2026", "12d", "HR Ops", "32 pending", "warn"],
                ["Form 5A (Half-yearly)", "Labour Welfare", "30 Jun 2026", "17d", "Plant HR", "Draft ready", "warn"],
                ["Factory Act annual return", "Chief Inspector", "21 Jul 2026", "45d", "Ravi Sharma", "On track", "good"],
                ["Contract Labour register audit", "Contract Cell", "08 Aug 2026", "60d", "Vendor Ops", "Scheduled", "good"],
                ["Minimum Wage revision review", "Labour Comm.", "23 Aug 2026", "75d", "Comp & Ben", "Watching notification", "good"],
                ["POSH committee annual report", "Internal IC", "30 Sep 2026", "112d", "HR Compliance", "Draft Q3", "good"],
              ].map((row) => {
                const tone = row[6] as string;
                const pill =
                  tone === "critical"
                    ? "bg-destructive/15 text-destructive"
                    : tone === "warn"
                    ? "bg-warning/15 text-warning"
                    : "bg-success/15 text-success";
                return (
                  <tr key={row[0] as string} className="border-t border-border hover:bg-muted/40">
                    <td className="py-2.5 font-medium">{row[0]}</td>
                    <td className="text-xs text-muted-foreground">{row[1]}</td>
                    <td className="font-mono text-xs">{row[2]}</td>
                    <td>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pill}`}>{row[3]}</span>
                    </td>
                    <td className="text-xs">{row[4]}</td>
                    <td className="text-xs text-muted-foreground">{row[5]}</td>
                    <td>
                      <button
                        onClick={() => d.open(item(row[0] as string))}
                        className="text-xs text-primary hover:underline"
                      >
                        Drill →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 rounded-md border border-dashed border-destructive/30 bg-destructive/5 p-2.5 text-[11px]">
          <span className="font-semibold text-destructive">AI · </span>
          ESIC contribution of ₹12,84,000 due in 4 days for 1,240 workers — pack auto-generated, awaiting Plant HR sign-off.
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}


// ============================================================
// GRIEVANCES
// ============================================================
export function GrievanceScreen() {
  const d = useDrill();
  const caseDrill = (worker: string): DrillData => ({
    title: `${worker} — Grievance Case`,
    summary: ["Case timeline, sentiment trend, AI-suggested resolution path."],
    metrics: [
      { label: "Severity", value: "High", tone: "critical" },
      { label: "Sentiment", value: "-0.62", tone: "down" },
      { label: "Open days", value: "11" },
      { label: "Repeats", value: "2", tone: "warn" },
    ],
    recommendations: ["Mediation with line supervisor", "Policy review — OT allocation", "Escalate to Plant Head if open >14d"],
  });
  return (
    <ScreenShell
      title="Grievance Intelligence Center"
      subtitle="Active cases, escalations, anonymous complaints, sentiment patterns."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <PremiumKpi
          label="Active Grievances"
          value="7"
          tone="warn"
          sub="+3 this week"
          ai="Active grievances at Noida Plant rose to 6 this week, primarily related to summer overtime shifts. Average resolution time: 4.8 days. Recommended: union check-in."
        />
        <PremiumKpi label="Escalated" value="2" tone="critical" sub="Plant Head queue" />
        <PremiumKpi label="Anonymous" value="3" tone="warn" sub="Safety + cafeteria" />
        <PremiumKpi label="Avg Sentiment" value="-0.18" tone="down" sub="Shift B trending down" />
        <PremiumKpi label="Repeat Supervisors" value="2" tone="warn" sub="Pattern detected" />
      </div>

      <Panel title="Grievance Cases" sub="AI-prioritised by severity + sentiment">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Worker</th>
                <th>Dept</th>
                <th>Issue</th>
                <th>Severity</th>
                <th>Sentiment</th>
                <th>Status</th>
                <th>AI Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["EMP-4112 · S. Kumar", "Packaging Z2", "Overtime fairness", "High", "-0.62", "Open 11d", "Mediation + OT cap"],
                ["EMP-4218 · R. Devi", "Packaging Z2", "Supervisor behaviour", "High", "-0.71", "Escalated", "Supervisor coaching"],
                ["EMP-4307 · M. Singh", "Quality", "Shift allocation", "Medium", "-0.34", "In review", "Policy clarification"],
                ["Anon · #A-019", "Cafeteria", "Food quality", "Low", "-0.22", "Open 4d", "Vendor review"],
                ["EMP-4451 · K. Yadav", "Mixing", "Safety concern", "High", "-0.58", "Open 7d", "Site walk + fix"],
                ["EMP-4612 · P. Sharma", "Packaging Z2", "Heat / cooling", "High", "-0.66", "Open 18d", "Capex ₹92K cooling"],
                ["EMP-4710 · A. Khan", "Stores", "Wage clarification", "Low", "-0.11", "Resolved", "Closed loop comms"],
              ].map((row) => (
                <tr key={row[0] as string} className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>{row[5]}</td>
                  <td>
                    <button onClick={() => d.open(caseDrill(row[0] as string))} className="text-xs text-primary hover:underline">{row[6]} →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="AI Pattern Analysis">
          <ul className="space-y-2 text-sm">
            <li className="rounded-md border border-dashed border-destructive/30 bg-destructive/5 p-2.5">Repeat supervisor escalation pattern — Zone 2 (3 cases in 21 days)</li>
            <li className="rounded-md border border-dashed border-warning/30 bg-warning/5 p-2.5">Shift B morale decline — 5-week trend in sentiment scores</li>
            <li className="rounded-md border border-dashed border-warning/30 bg-warning/5 p-2.5">Grievance cluster — Packaging Z2 (4 of 7 active cases)</li>
          </ul>
        </Panel>
        <Panel title="Suggested Actions">
          <ul className="space-y-2 text-sm">
            <li>Mediation session — Zone 2 supervisor and 3 workers</li>
            <li>Supervisor coaching programme — 2 supervisors flagged</li>
            <li>Policy review — overtime allocation fairness</li>
            <li>Escalate 2 cases open &gt; 14 days to Plant Head</li>
          </ul>
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// SHIFT MANAGEMENT
// ============================================================
export function ShiftManagementScreen() {
  const d = useDrill();
  const drill = (shift: string): DrillData => ({
    title: `Shift ${shift} — Roster & Workforce Plan`,
    summary: [`Worker roster, fatigue trend, attendance history, OT trend, and production dependency.`],
    metrics: [
      { label: "Roster", value: shift === "B" ? "164" : "168" },
      { label: "OT avg", value: shift === "B" ? "26h" : "12h", tone: shift === "B" ? "critical" : "default" },
      { label: "Backup avail.", value: "12" },
      { label: "Productivity", value: shift === "B" ? "81%" : "92%", tone: shift === "B" ? "warn" : "up" },
    ],
    recommendations: ["Cap OT to 18h/wk", "Activate 6 backup workers", "Stagger break windows"],
  });
  return (
    <ScreenShell
      title="Shift Operations & Workforce Planning"
      subtitle="Schedules, staffing gaps, overtime allocation, fatigue prediction, backup availability."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Shifts running" value="3" sub="A · B · C" />
        <PremiumKpi
          label="Staffing Gap"
          value="14"
          delta="Today"
          sub="Shift B + Packaging"
          tone="warn"
          ai="Seasonal demand spike in Mouth Freshener production requires +40 operators by next Monday. Current hiring pipeline is short 14 candidates. Overtime cost forecast: +₹2.4L."
        />
        <PremiumKpi label="OT Allocation" value="1,842h" delta="MTD" tone="critical" />
        <PremiumKpi label="Backup Pool" value="38" sub="On-call contract" tone="up" />
      </div>

      <AiInsightBanner
        title="Shift B overtime exceeding sustainable threshold for 18 workers."
        description="18 workers above 22h OT/week for 3 consecutive weeks. Productivity drop and exit probability both rising."
        confidence={92}
        sources="Roster · OT logs · Productivity · Exit prediction model"
        onAddActions={() => d.open(drill("B"))}
        onView={() => d.open(drill("B"))}
      />

      <Panel title="Shift Roster + Risk View">
        <div className="grid gap-3 md:grid-cols-3">
          {["A", "B", "C"].map((s) => (
            <button key={s} onClick={() => d.open(drill(s))} className="rounded-xl border border-border bg-background p-4 text-left hover:border-primary">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Shift {s}</div>
              <div className="mt-1 font-display text-xl font-semibold">{s === "B" ? "164" : s === "A" ? "168" : "155"} workers</div>
              <div className="mt-2 space-y-1.5 text-xs">
                <Row k="Attendance" v={s === "B" ? "87.4%" : "92%"} bad={s === "B"} />
                <Row k="OT / worker" v={s === "B" ? "26h" : "12h"} bad={s === "B"} />
                <Row k="Fatigue flagged" v={s === "B" ? "14" : "2"} bad={s === "B"} />
                <Row k="Productivity" v={s === "B" ? "81%" : "92%"} bad={s === "B"} />
              </div>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

function Row({ k, v, bad }: { k: string; v: string; bad?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={bad ? "font-semibold text-destructive" : "font-semibold text-foreground"}>{v}</span>
    </div>
  );
}

// ============================================================
// TRAINING
// ============================================================
export function TrainingScreen() {
  const d = useDrill();
  const drill = (name: string): DrillData => ({
    title: `${name} — Programme detail`,
    summary: [`Cohort, completion, AI-suggested next intake.`],
    metrics: [
      { label: "Enrolled", value: "184" },
      { label: "Completed", value: "121", tone: "up" },
      { label: "Overdue", value: "37", tone: "critical" },
      { label: "Avg score", value: "78" },
    ],
    recommendations: ["Trigger reminders for 37 overdue", "Replace classroom with on-floor microlearning"],
  });
  return (
    <ScreenShell
      title="Plant Learning & Compliance Training"
      subtitle="Safety, equipment certification, mandatory compliance learning, supervisor development."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi
          label="Safety Training"
          value="84%"
          sub="161 / 192 workers"
          tone="up"
          ai="22 operators have electrical safety certifications expiring within 15 days. Non-compliance could stop Packaging Line 3. Recommended: schedule refresher training."
        />
        <PremiumKpi label="Equipment Cert." value="71%" sub="Forklift + line ops" tone="warn" />
        <PremiumKpi label="Compliance Learning" value="92%" sub="Mandatory POSH + ethics" tone="up" />
        <PremiumKpi label="Supervisor Dev." value="48%" sub="12 supervisors" tone="down" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="AI Recommended Programmes">
          <div className="space-y-2">
            {[
              ["Safety refresher · Packaging Z2", 37, "critical"],
              ["Supervisor coaching · Shift B", 6, "warn"],
              ["Fatigue awareness · all shifts", 487, "warn"],
              ["Automation readiness · Packaging", 127, "warn"],
            ].map(([name, count, tone]) => (
              <button
                key={name as string}
                onClick={() => d.open(drill(name as string))}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm hover:border-primary"
              >
                <span className="font-medium">{name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone === "critical" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"}`}>
                  {count} workers
                </span>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Completion Trend">
          <LineChart
            data={[
              { label: "Jan", value: 62 },
              { label: "Feb", value: 68 },
              { label: "Mar", value: 71 },
              { label: "Apr", value: 74 },
              { label: "May", value: 78 },
              { label: "Jun", value: 82 },
            ]}
          />
        </Panel>
      </div>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// BRAND PRODUCTION
// ============================================================
export function BrandProductionScreen() {
  const d = useDrill();
  const drill = (brand: string): DrillData => ({
    title: `${brand} — Production Workforce`,
    summary: [`Workforce allocation, output, downtime correlation and quality issues linked to staffing.`],
    metrics: [
      { label: "Workforce", value: brand === "Pulse" ? "142" : "98" },
      { label: "Output (units/d)", value: brand === "Pulse" ? "4.2L" : "1.8L", tone: "up" },
      { label: "Downtime", value: brand === "Pulse" ? "6.8%" : "3.1%", tone: brand === "Pulse" ? "warn" : "default" },
      { label: "Quality issues", value: brand === "Pulse" ? "12" : "3", tone: brand === "Pulse" ? "warn" : "default" },
    ],
    recommendations: ["Add 8 workers to Pulse line during season peak", "Quality coaching for 2 line leads"],
  });
  return (
    <ScreenShell
      title="Production Workforce Intelligence"
      subtitle="Production lines, workforce allocation, output vs staffing, downtime correlation."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <PremiumKpi label="Brands in production" value="5" sub="Rajnigandha · Catch · Pulse · Pass Pass · FRU" />
        <PremiumKpi label="Output today" value="11.4L" delta="↑ 6%" sub="Units across lines" tone="up" />
        <PremiumKpi label="Downtime" value="4.6%" delta="↓ 0.8pp" sub="MTD" tone="up" />
        <PremiumKpi label="Quality issues" value="21" delta="Pulse-led" sub="Linked to staffing" tone="warn" />
      </div>

      <AiInsightBanner
        title="Staffing shortage on Pulse line affecting throughput and quality."
        description="Pulse line running 11% understaffed during season ramp; quality complaints up 38% week-on-week."
        confidence={87}
        sources="Production logs · Roster · QA reports"
        onAddActions={() => d.open(drill("Pulse"))}
        onView={() => d.open(drill("Pulse"))}
      />

      <Panel title="Brand Lines">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {["Rajnigandha", "Catch", "Pulse", "Pass Pass", "FRU"].map((b) => (
            <button key={b} onClick={() => d.open(drill(b))} className="rounded-xl border border-border bg-background p-4 text-left hover:border-primary">
              <div className="font-display text-base font-semibold">{b}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <Row k="Workforce" v={b === "Pulse" ? "142" : "98"} />
                <Row k="Output" v={b === "Pulse" ? "4.2L" : "1.8L"} />
                <Row k="Downtime" v={b === "Pulse" ? "6.8%" : "3.1%"} bad={b === "Pulse"} />
                <Row k="QA issues" v={b === "Pulse" ? "12" : "3"} bad={b === "Pulse"} />
              </div>
            </button>
          ))}
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}

// ============================================================
// ATTRITION
// ============================================================
export function PlantAttritionScreen() {
  const d = useDrill();
  const drill = (reason: string): DrillData => ({
    title: `${reason} — Exit pattern`,
    summary: [`Cohort analysis with cost, replacement lead time and AI recommendation.`],
    metrics: [
      { label: "Exits (12M)", value: "84" },
      { label: "Cost", value: "₹3.6L / wkr" },
      { label: "Tenure at exit", value: "1.8 yrs" },
      { label: "Replace time", value: "21 days" },
    ],
    recommendations: ["Wage benchmark vs ITC plant", "Transport route enhancement", "Supervisor coaching"],
  });
  return (
    <ScreenShell
      title="Plant Attrition Intelligence"
      subtitle="AI-driven exit analysis across permanent and contract workforce."
      eyebrow={EYEBROW}
      copilotPrompts={COPILOT}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <PremiumKpi label="Plant Attrition" value="24%" delta="↑ +2pp" sub="12M trailing" tone="warn" spark={[20, 21, 21, 22, 23, 24, 24]} />
        <PremiumKpi
          label="Contract Exits"
          value="41%"
          delta="High"
          sub="Packaging-led"
          tone="critical"
          ai="14 operator contracts expire on June 30. Replacing them in the open market will cost ₹2.1L. Recommended: start automated renewal workflows for top 10 performance scores."
        />
        <PremiumKpi label="Avg Tenure at Exit" value="1.8 yrs" delta="↓" sub="Industry 2.4 yrs" tone="down" />
        <PremiumKpi label="Replacement Cost" value="₹3.6L" delta="/ worker" sub="Hire + train + ramp" tone="warn" />
      </div>

      <Panel title="AI Exit Analysis — Top reasons">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-2">Reason</th><th>% citing</th><th>AI Recommendation</th><th></th></tr>
            </thead>
            <tbody>
              {[
                ["Better wages elsewhere", "58%", "Wage benchmarking vs ITC + Dabur plants"],
                ["Shift fatigue", "34%", "Cap OT, redesign Shift B"],
                ["Supervisor quality", "27%", "Coaching for 2 flagged supervisors"],
                ["Transport issues", "22%", "Add 2 routes Greater Noida + Sec-62"],
                ["Lack of growth", "18%", "Line lead apprenticeship cohort"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border hover:bg-muted/40">
                  <td className="py-2.5 font-medium">{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td><button onClick={() => d.open(drill(row[0]))} className="text-xs text-primary hover:underline">Drill →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      {d.node}
    </ScreenShell>
  );
}
