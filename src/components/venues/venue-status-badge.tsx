import { BusinessStatus, BusinessStatusLabels } from '@/types/venue';
import { cn } from '@/lib/utils';

interface VenueStatusBadgeProps {
  status: BusinessStatus;
}

export function VenueStatusBadge({ status }: VenueStatusBadgeProps) {
  const dotColors = {
    [BusinessStatus.PENDING]: 'bg-amber-400',
    [BusinessStatus.ACTIVE]: 'bg-emerald-500',
    [BusinessStatus.INACTIVE]: 'bg-neutral-400',
    [BusinessStatus.CLOSED]: 'bg-red-400',
  };

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[status])} />
      {BusinessStatusLabels[status]}
    </span>
  );
}
