import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const TOOLTIP_COPY =
  "Data is modelled on DS Group's public profile. In production, agents connect to your HRMS, ATS, LMS and ERP in real time.";

export function IllustrativeDemoBadge({ className }: { className?: string }) {
  return (
    <div className={cn("fixed right-3 z-50 sm:right-4", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="max-w-[calc(100vw-1.5rem)] rounded-full border border-amber-300/80 bg-amber-200/95 px-3 py-1.5 text-[10px] font-medium text-amber-950 shadow-card transition hover:bg-amber-200 sm:max-w-none sm:text-[11px]"
          >
            ⚠ Illustrative Demo · Not connected to live systems
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-72 border-amber-300/80 bg-amber-50 text-[11px] leading-relaxed text-amber-950"
        >
          {TOOLTIP_COPY}
        </PopoverContent>
      </Popover>
    </div>
  );
}
