'use client';

import { Venue, PetGroundingRuleTypeLabels, ReservationMethodLabels } from '@/types/venue';
import { Badge } from '@/components/ui/badge';
import { PawPrint, CalendarCheck, Tags } from 'lucide-react';

interface PetRulesViewProps {
  venue: Venue;
}

export function PetRulesView({ venue }: PetRulesViewProps) {
  return (
    <div className="space-y-6">
      {/* 落地規定 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <PawPrint className="h-4 w-4" />
          <span>落地規定</span>
        </div>
        <p className="text-sm">
          {venue.petGroundingRuleType !== undefined
            ? PetGroundingRuleTypeLabels[venue.petGroundingRuleType]
            : '未提供'}
        </p>
      </div>

      <hr className="border-neutral-200" />

      {/* 預約方式 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CalendarCheck className="h-4 w-4" />
          <span>預約方式</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {venue.reservationMethods && venue.reservationMethods.length > 0 ? (
            venue.reservationMethods.map((method) => (
              <Badge key={method} variant="default">
                {ReservationMethodLabels[method]}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">未提供</p>
          )}
        </div>
      </div>

      <hr className="border-neutral-200" />

      {/* 標籤 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Tags className="h-4 w-4" />
          <span>毛孩友善標籤ㄅ</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {venue.tags && venue.tags.length > 0 ? (
            venue.tags.map((tag) => (
              <Badge key={tag.id} variant="default">
                {tag.name}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">未提供</p>
          )}
        </div>
      </div>
    </div>
  );
}
