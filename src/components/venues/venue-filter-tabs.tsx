'use client';

import { Venue, BusinessStatus } from '@/types/venue';
import { cn } from '@/lib/utils';

interface VenueFilterTabsProps {
  venues: Venue[];
  selectedStatus: BusinessStatus | null;
  onStatusChange: (status: BusinessStatus | null) => void;
}

export function VenueFilterTabs({ venues, selectedStatus, onStatusChange }: VenueFilterTabsProps) {
  const tabs = [
    {
      label: '全部',
      count: venues.length,
      status: null as BusinessStatus | null,
    },
    {
      label: '營業中',
      count: venues.filter((v) => v.status === BusinessStatus.ACTIVE).length,
      status: BusinessStatus.ACTIVE as BusinessStatus | null,
    },
    {
      label: '待審核',
      count: venues.filter((v) => v.status === BusinessStatus.PENDING).length,
      status: BusinessStatus.PENDING as BusinessStatus | null,
    },
    {
      label: '已關閉',
      count: venues.filter((v) => v.status === BusinessStatus.CLOSED || v.status === BusinessStatus.INACTIVE).length,
      status: BusinessStatus.CLOSED as BusinessStatus | null,
    },
  ];

  return (
    <div className="flex gap-1 px-2">
      {tabs.map((tab) => {
        const isActive = selectedStatus === tab.status;

        return (
          <button
            key={tab.label}
            onClick={() => onStatusChange(tab.status)}
            className={cn(
              'relative px-4 py-3 text-sm font-medium transition-colors',
              'hover:text-foreground',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                'ml-1.5 inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 py-0.5 text-xs tabular-nums',
                isActive
                  ? 'bg-foreground text-white'
                  : 'bg-neutral-100 text-muted-foreground'
              )}
            >
              {tab.count}
            </span>

            {/* 選中指示線 */}
            {isActive && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-foreground" />
            )}
          </button>
        );
      })}
    </div>
  );
}
