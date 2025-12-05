'use client';

import { Venue, BusinessCategoryLabels } from '@/types/venue';
import { Label } from '@/components/ui/label';
import { ExternalLink } from 'lucide-react';

interface BasicInfoViewProps {
  venue: Venue;
}

export function BasicInfoView({ venue }: BasicInfoViewProps) {
  return (
    <div className="space-y-4">
      <ViewField label="店家類型" value={BusinessCategoryLabels[venue.categoryType]} />
      <ViewField label="地址" value={venue.address} />
      <ViewField label="電話" value={venue.phone || '-'} />
      <ViewField
        label="位置座標"
        value={`${venue.location.latitude}, ${venue.location.longitude}`}
      />
      <ViewField
        label="Google 地圖"
        value={venue.googleMapsUrl}
        isLink
      />
      <ViewField
        label="官方網站"
        value={venue.website}
        isLink
      />
      <ViewField label="店家描述" value={venue.description || '-'} />
    </div>
  );
}

function ViewField({
  label,
  value,
  isLink = false
}: {
  label: string;
  value?: string;
  isLink?: boolean;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-2">
      <Label className="text-neutral-500">{label}</Label>
      {isLink && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          {value}
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        <span className="text-sm">{value || '-'}</span>
      )}
    </div>
  );
}
