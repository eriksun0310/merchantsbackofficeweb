'use client';

import { Store } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Venue } from '@/types/venue';

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenueId: string | null;
  onSelect: (venueId: string) => void;
  isLoading?: boolean;
}

export function VenueSelector({
  venues,
  selectedVenueId,
  onSelect,
  isLoading,
}: VenueSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        <Store className="h-4 w-4" />
        <span>選擇店家</span>
      </div>
      <Select
        value={selectedVenueId || undefined}
        onValueChange={onSelect}
        disabled={isLoading}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="請選擇店家" />
        </SelectTrigger>
        <SelectContent>
          {venues.map((venue) => (
            <SelectItem key={venue.id} value={venue.id}>
              {venue.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
