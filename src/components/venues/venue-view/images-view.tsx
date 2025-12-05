'use client';

import Image from 'next/image';
import { Venue } from '@/types/venue';
import { ImageIcon, Star } from 'lucide-react';

interface ImagesViewProps {
  venue: Venue;
}

export function ImagesView({ venue }: ImagesViewProps) {
  if (venue.images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-neutral-400">
        <ImageIcon className="h-12 w-12" />
        <p className="mt-2 text-sm">尚無圖片</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {venue.images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
        >
          <Image
            src={image}
            alt={`${venue.name} 圖片 ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
          {index === 0 && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              主圖
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
