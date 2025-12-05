'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useVenues } from '@/hooks/use-venues';
import { useCommentsByVenue } from '@/hooks/use-comments';
import { Header } from '@/components/layout/header';
import { VenueSelector, CommentList } from '@/components/comments';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommentsPage() {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const { data: venues = [], isLoading: venuesLoading } = useVenues();
  const { data: comments = [], isLoading: commentsLoading } = useCommentsByVenue(selectedVenueId);

  const selectedVenue = venues.find((v) => v.id === selectedVenueId);

  return (
    <>
      <Header title="評論管理" description="檢視各店家的顧客評論" />

      <div className="p-6">
        {/* 操作列：店家選擇器 */}
        <div className="mb-6">
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
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-green-700">{selectedVenue?.name}</h2>
              <Badge variant="secondary" className="gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {comments.length} 則評論
              </Badge>
            </div>

            {/* 評論列表 */}
            <CommentList comments={comments} isLoading={commentsLoading} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-16">
            <MessageSquare className="h-16 w-16 text-neutral-300" />
            <p className="mt-4 text-lg font-medium text-neutral-500">請先選擇店家</p>
            <p className="mt-1 text-sm text-neutral-400">選擇店家後即可檢視該店家的所有評論</p>
          </div>
        )}
      </div>
    </>
  );
}
