'use client';

import { Venue } from '@/types/venue';
import { MapPin, Phone, Globe, ExternalLink, Copy, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface BasicInfoViewProps {
  venue: Venue;
}

export function BasicInfoView({ venue }: BasicInfoViewProps) {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venue.address);
    toast.success('已複製地址');
  };

  const handleOpenMap = () => {
    const url = venue.googleMapsUrl ||
      `https://maps.google.com/?q=${venue.location.latitude},${venue.location.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 地址區塊 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>地址</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm leading-relaxed">{venue.address}</p>
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={handleCopyAddress}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={handleOpenMap}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <hr className="border-neutral-200" />

      {/* 聯絡資訊 */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* 電話 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>電話</span>
          </div>
          {venue.phone ? (
            <a
              href={`tel:${venue.phone}`}
              className="text-sm hover:underline"
            >
              {venue.phone}
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">未提供</p>
          )}
        </div>

        {/* 官方網站 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>官方網站</span>
          </div>
          {venue.website ? (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm hover:underline"
            >
              <span className="truncate max-w-[200px]">
                {venue.website.replace(/^https?:\/\//, '')}
              </span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">未提供</p>
          )}
        </div>
      </div>

      {/* 店家描述 */}
      {venue.description && (
        <>
          <hr className="border-neutral-200" />
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>店家描述</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {venue.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
