'use client';

import { MessageSquare } from 'lucide-react';
import { CommentItem } from '@/types/comment';
import { CommentCard } from './comment-card';
import { Skeleton } from '@/components/ui/skeleton';

interface CommentListProps {
  comments: CommentItem[];
  isLoading?: boolean;
}

export function CommentList({ comments, isLoading }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="divide-y divide-neutral-100 rounded-lg border bg-white">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="mt-3 h-16 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white py-12">
        <MessageSquare className="h-12 w-12 text-neutral-300" />
        <p className="mt-4 text-neutral-500">目前沒有評論</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/50 rounded-lg border bg-white">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
