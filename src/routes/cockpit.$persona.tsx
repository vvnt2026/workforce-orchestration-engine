import { createFileRoute, notFound } from "@tanstack/react-router";
import { CockpitLayout } from "@/components/cockpit/CockpitLayout";
import { CockpitContent } from "@/components/cockpit/CockpitContent";
import { personas } from "@/components/cockpit/data";
import { WorkforceIntelligenceScreen } from "@/components/cockpit/subrat/WorkforceIntelligenceScreen";
import { AttritionDashboardScreen } from "@/components/cockpit/subrat/AttritionDashboardScreen";
import { SuccessionScreen } from "@/components/cockpit/subrat/SuccessionScreen";
import { TransformationRoadmapScreen } from "@/components/cockpit/subrat/TransformationRoadmapScreen";
import { BoardReportingScreen } from "@/components/cockpit/subrat/BoardReportingScreen";
import { DeiComplianceScreen } from "@/components/cockpit/subrat/DeiComplianceScreen";
import {
  TalentAcquisitionScreen,
  PerformanceScreen,
  LearningScreen,
} from "@/components/cockpit/subrat/CoreScreens";
import {
  WorkforceScreen,
  ComplianceScreen,
  GrievanceScreen,
  ShiftManagementScreen,
  TrainingScreen,
  BrandProductionScreen,
  PlantAttritionScreen,
} from "@/components/cockpit/ravi/Screens";
import {
  FieldSalesScreen,
  AttritionRetentionScreen,
  CareerPathsScreen,
  CompensationScreen,
  DigitalUpskillingScreen,
  TerritoryCoverageScreen,
} from "@/components/cockpit/vikram/Screens";
import {
  CareerPathScreen,
  MyCompensationScreen,
  MyLearningScreen,
  MyOneOnOnesScreen,
  MyOpportunitiesScreen,
  MyMentorScreen,
} from "@/components/cockpit/ananya/Screens";
import {
  BrandCoverageScreen,
  HiringPipelineScreen,
  SeasonalPlanningScreen,
  TrainingComplianceScreen,
  GuestSatisfactionScreen,
  HospitalityCareerScreen,
} from "@/components/cockpit/kavita/Screens";
import { ArjunCockpit } from "@/components/cockpit/arjun/ArjunCockpit";

export const Route = createFileRoute("/cockpit/$persona")({
  loader: ({ params }) => {
    const p = personas[params.persona];
    if (!p) throw notFound();
    return { persona: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.persona.name} · DS Group AI Cockpit` },
      { name: "description", content: `${loaderData?.persona.role} — Agentic Workforce Platform for DS Group.` },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-semibold">Persona not found</h1>
        <p className="mt-2 text-muted-foreground">Try one of the 6 DS Group personas from the home page.</p>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-destructive">Failed to load cockpit: {error.message}</div>
  ),
  component: CockpitPage,
});

function CockpitPage() {
  const { persona } = Route.useLoaderData();

  if (persona.id === "subrat") {
    return (
      <CockpitLayout
        persona={persona}
        renderSection={(section) => {
          switch (section) {
            case "HR Cockpit":
              return <CockpitContent persona={persona} />;
            case "Workforce Intelligence":
              return <WorkforceIntelligenceScreen />;
            case "DEI & Compliance":
              return <DeiComplianceScreen />;
            case "Talent Acquisition":
              return <TalentAcquisitionScreen />;
            case "Performance":
              return <PerformanceScreen />;
            case "Learning":
              return <LearningScreen />;
            case "Succession":
              return <SuccessionScreen />;
            case "Attrition Dashboard":
              return <AttritionDashboardScreen />;
            case "Transformation Roadmap":
              return <TransformationRoadmapScreen />;
            case "Board Reporting":
              return <BoardReportingScreen />;
            default:
              return <CockpitContent persona={persona} />;
          }
        }}
      />
    );
  }

  if (persona.id === "ravi") {
    return (
      <CockpitLayout
        persona={persona}
        renderSection={(section) => {
          switch (section) {
            case "HR Cockpit":
              return <CockpitContent persona={persona} />;
            case "Workforce":
              return <WorkforceScreen />;
            case "Compliance":
              return <ComplianceScreen />;
            case "Grievances":
              return <GrievanceScreen />;
            case "Shift Management":
              return <ShiftManagementScreen />;
            case "Training":
              return <TrainingScreen />;
            case "Brand Production":
              return <BrandProductionScreen />;
            case "Attrition":
              return <PlantAttritionScreen />;
            default:
              return <CockpitContent persona={persona} />;
          }
        }}
      />
    );
  }

  if (persona.id === "vikram") {
    return (
      <CockpitLayout
        persona={persona}
        renderSection={(section) => {
          switch (section) {
            case "HR Cockpit":
              return <CockpitContent persona={persona} />;
            case "Field Sales Force":
              return <FieldSalesScreen />;
            case "Attrition & Retention":
              return <AttritionRetentionScreen />;
            case "Career Paths":
              return <CareerPathsScreen />;
            case "Compensation":
              return <CompensationScreen />;
            case "Digital Upskilling":
              return <DigitalUpskillingScreen />;
            case "Territory Coverage":
              return <TerritoryCoverageScreen />;
            default:
              return <CockpitContent persona={persona} />;
          }
        }}
      />
    );
  }

  if (persona.id === "ananya") {
    return (
      <CockpitLayout
        persona={persona}
        renderSection={(section) => {
          switch (section) {
            case "My Cockpit":
              return <CockpitContent persona={persona} />;
            case "My Career Path":
              return <CareerPathScreen />;
            case "My Compensation":
              return <MyCompensationScreen />;
            case "My Learning":
              return <MyLearningScreen />;
            case "My 1:1s":
              return <MyOneOnOnesScreen />;
            case "My Opportunities":
              return <MyOpportunitiesScreen />;
            case "My Mentor":
              return <MyMentorScreen />;
            default:
              return <CockpitContent persona={persona} />;
          }
        }}
      />
    );
  }

  if (persona.id === "kavita") {
    return (
      <CockpitLayout
        persona={persona}
        renderSection={(section) => {
          switch (section) {
            case "HR Cockpit":
              return <CockpitContent persona={persona} />;
            case "Brand Coverage":
              return <BrandCoverageScreen />;
            case "Hiring Pipeline":
              return <HiringPipelineScreen />;
            case "Seasonal Planning":
              return <SeasonalPlanningScreen />;
            case "Training & Compliance":
              return <TrainingComplianceScreen />;
            case "Guest Satisfaction Link":
              return <GuestSatisfactionScreen />;
            case "Career Paths":
              return <HospitalityCareerScreen />;
            default:
              return <CockpitContent persona={persona} />;
          }
        }}
      />
    );
  }

  if (persona.id === "arjun") {
    return <ArjunCockpit />;
  }

  return (
    <CockpitLayout persona={persona}>
      <CockpitContent persona={persona} />
    </CockpitLayout>
  );
}
