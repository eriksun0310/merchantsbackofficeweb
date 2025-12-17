'use client';

import { Store, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Venue, BusinessStatus } from '@/types/venue';
import { cn } from '@/lib/utils';

interface VenueStatsProps {
  venues: Venue[];
  selectedStatus: BusinessStatus | null;
  onStatusClick: (status: BusinessStatus | null) => void;
}

export function VenueStats({ venues, selectedStatus, onStatusClick }: VenueStatsProps) {
  const stats = [
    {
      label: '全部店家',
      value: venues.length,
      icon: Store,
      status: null as BusinessStatus | null,
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
      activeRing: 'ring-foreground/20',
    },
    {
      label: '營業中',
      value: venues.filter((v) => v.status === BusinessStatus.ACTIVE).length,
      icon: CheckCircle,
      status: BusinessStatus.ACTIVE as BusinessStatus | null,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      activeRing: 'ring-emerald-500/30',
    },
    {
      label: '待審核',
      value: venues.filter((v) => v.status === BusinessStatus.PENDING).length,
      icon: Clock,
      status: BusinessStatus.PENDING as BusinessStatus | null,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      activeRing: 'ring-amber-500/30',
    },
    {
      label: '已關閉',
      value: venues.filter((v) => v.status === BusinessStatus.CLOSED || v.status === BusinessStatus.INACTIVE).length,
      icon: XCircle,
      status: BusinessStatus.CLOSED as BusinessStatus | null,
      color: 'text-neutral-500',
      bgColor: 'bg-neutral-100',
      activeRing: 'ring-neutral-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isActive = selectedStatus === stat.status;

        return (
          <button
            key={stat.label}
            onClick={() => onStatusClick(isActive ? null : stat.status)}
            className={cn(
              'flex items-center gap-3 rounded-lg border bg-card p-4 text-left transition-all',
              'hover:border-neutral-400 hover:shadow-sm',
              isActive ? `ring-2 ${stat.activeRing} border-transparent` : 'border-neutral-300'
            )}
          >
            <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', stat.bgColor)}>
              <Icon className={cn('h-5 w-5', stat.color)} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-semibold tabular-nums text-foreground">{stat.value}</p>
              <p className="truncate text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
