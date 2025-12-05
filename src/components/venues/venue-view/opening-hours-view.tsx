'use client';

import { Venue, DayTypeLabels } from '@/types/venue';
import { Label } from '@/components/ui/label';

interface OpeningHoursViewProps {
  venue: Venue;
}

export function OpeningHoursView({ venue }: OpeningHoursViewProps) {
  return (
    <div className="space-y-3">
      {venue.openingHours.map((day) => (
        <div key={day.dayType} className="grid grid-cols-[80px_1fr] gap-2">
          <Label className="text-neutral-500">{DayTypeLabels[day.dayType]}</Label>
          <span className="text-sm">
            {day.periods.length === 0 ? (
              <span className="text-neutral-400">公休</span>
            ) : (
              day.periods.map((p, i) => (
                <span key={i}>
                  {i > 0 && '、'}
                  {p.openTime} - {p.closeTime}
                </span>
              ))
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
