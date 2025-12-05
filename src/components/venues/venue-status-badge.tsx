import { BusinessStatus, BusinessStatusLabels } from '@/types/venue';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface VenueStatusBadgeProps {
  status: BusinessStatus;
}

export function VenueStatusBadge({ status }: VenueStatusBadgeProps) {
  const statusConfig = {
    [BusinessStatus.PENDING]: {
      variant: 'outline' as const,
      className: 'border-yellow-500 text-yellow-600 bg-yellow-50',
      dot: 'bg-yellow-500',
    },
    [BusinessStatus.ACTIVE]: {
      variant: 'outline' as const,
      className: 'border-green-500 text-green-600 bg-green-50',
      dot: 'bg-green-500',
    },
    [BusinessStatus.INACTIVE]: {
      variant: 'outline' as const,
      className: 'border-neutral-400 text-neutral-600 bg-neutral-50',
      dot: 'bg-neutral-400',
    },
    [BusinessStatus.CLOSED]: {
      variant: 'outline' as const,
      className: 'border-red-500 text-red-600 bg-red-50',
      dot: 'bg-red-500',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn('gap-1.5', config.className)}>
      <span className={cn('h-2 w-2 rounded-full', config.dot)} />
      {BusinessStatusLabels[status]}
    </Badge>
  );
}
