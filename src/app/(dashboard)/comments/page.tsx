'use client';

import { useState } from 'react';
import { useVenues } from '@/hooks/use-venues';
import { useCommentsByVenue } from '@/hooks/use-comments';
import { Header } from '@/components/layout/header';
import { VenueSelector, CommentList } from '@/components/comments';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommentsPage() {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const { data: venues = [], isLoading: venuesLoading } = useVenues();
  const { data: comments = [], isLoading: commentsLoading } = useCommentsByVenue(selectedVenueId);

  const selectedVenue = venues.find((v) => v.id === selectedVenueId);

  return (
    <>
      <Header title="評論管理" description="檢視各店家的顧客評論" />

      <div className="p-8">
        {/* 操作列：店家選擇器 */}
        <div className="mb-8">
          {venuesLoading ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-64" />
            </div>
          ) : (
            <VenueSelector
              venues={venues}
              selectedVenueId={selectedVenueId}
              onSelect={setSelectedVenueId}
            />
          )}
        </div>

        {/* 評論區域 */}
        {selectedVenueId ? (
          <div className="space-y-4">
            {/* 店家名稱 & 評論統計 */}
            <div className="flex items-center gap-3">
              <h2 className="text-base font-medium text-foreground">{selectedVenue?.name}</h2>
              <span className="text-xs text-muted-foreground">
                {comments.length} 則評論
              </span>
            </div>

            {/* 評論列表 */}
            <CommentList comments={comments} isLoading={commentsLoading} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-muted-foreground">請先選擇店家</p>
            <p className="mt-1 text-xs text-muted-foreground/70">選擇店家後即可檢視評論</p>
          </div>
        )}
      </div>
    </>
  );
}
