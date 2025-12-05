'use client';

import { Venue, PetGroundingRuleTypeLabels, ReservationMethodLabels } from '@/types/venue';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface PetRulesViewProps {
  venue: Venue;
}

export function PetRulesView({ venue }: PetRulesViewProps) {
  return (
    <div className="space-y-6">
      {/* 落地規定 */}
      <div>
        <Label className="text-neutral-500">落地規定</Label>
        <p className="mt-1 text-sm">
          {venue.petGroundingRuleType !== undefined
            ? PetGroundingRuleTypeLabels[venue.petGroundingRuleType]
            : '-'}
        </p>
      </div>

      {/* 預約方式 */}
      <div>
        <Label className="text-neutral-500">預約方式</Label>
        <div className="mt-1 flex flex-wrap gap-2">
          {venue.reservationMethods && venue.reservationMethods.length > 0 ? (
            venue.reservationMethods.map((method) => (
              <Badge key={method} variant="secondary">
                {ReservationMethodLabels[method]}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-neutral-400">-</span>
          )}
        </div>
      </div>

      {/* 標籤 */}
      <div>
        <Label className="text-neutral-500">毛孩友善標籤</Label>
        <div className="mt-1 flex flex-wrap gap-2">
          {venue.tags && venue.tags.length > 0 ? (
            venue.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-neutral-400">-</span>
          )}
        </div>
      </div>
    </div>
  );
}
