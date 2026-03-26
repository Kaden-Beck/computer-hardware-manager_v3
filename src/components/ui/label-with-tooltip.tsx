import React from 'react';
import { Info } from 'lucide-react';
import { FieldLabel } from '@/components/ui/field';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LabelWithTooltipProps {
  htmlFor: string;
  label: string;
  tip: string;
}

export function LabelWithTooltip({
  htmlFor,
  label,
  tip,
}: LabelWithTooltipProps) {
  return (
    <div className="flex items-center gap-1.5">
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`More info about ${label}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Info className="size-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{tip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
