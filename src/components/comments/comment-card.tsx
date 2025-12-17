'use client';

import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { PawPrint } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CommentItem,
  FeedbackType,
  PetFriendlyLevelLabels,
  PetSpeciesLabels,
} from '@/types/comment';
import { cn } from '@/lib/utils';

interface CommentCardProps {
  comment: CommentItem;
}

export function CommentCard({ comment }: CommentCardProps) {
  const { reviewer, petInfo, petFriendlyLevel, feedback, content, files, updateTime } = comment;

  const isPositive = feedback.type === FeedbackType.PAW;

  return (
    <div className="py-5 border-b border-border/50 last:border-b-0">
      {/* Header: 評論者 & 評價 */}
      <div className="flex items-start justify-between gap-4">
        {/* 左側：頭像、姓名、寵物 */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={reviewer.avatarUrl} alt={reviewer.name} />
            <AvatarFallback className="bg-muted text-xs">{reviewer.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{reviewer.name}</p>
            {petInfo && (
              <p className="text-xs text-muted-foreground">
                {PetSpeciesLabels[petInfo.species]} · {petInfo.name}
                {petInfo.breed && ` (${petInfo.breed})`}
              </p>
            )}
          </div>
        </div>

        {/* 右側：評價 & 友善度 */}
        <div className="flex items-center gap-3">
          <span className={cn(
            'inline-flex items-center gap-1 text-xs',
            isPositive ? 'text-foreground' : 'text-muted-foreground'
          )}>
            <PawPrint className="h-3 w-3" />
            {isPositive ? '腳掌' : '大便'}
          </span>
          <span className="text-xs text-muted-foreground">
            {PetFriendlyLevelLabels[petFriendlyLevel]}
          </span>
        </div>
      </div>

      {/* 評論內容 */}
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{content}</p>

      {/* 附加圖片 */}
      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file) => (
            <a
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded bg-muted transition-opacity hover:opacity-70"
            >
              <img
                src={file.thumbnailUrl || file.url}
                alt="評論圖片"
                className="h-16 w-16 object-cover"
              />
            </a>
          ))}
        </div>
      )}

      {/* 時間 */}
      <p className="mt-3 text-xs text-muted-foreground/70">
        {format(new Date(updateTime), 'yyyy/MM/dd HH:mm', { locale: zhTW })}
      </p>
    </div>
  );
}
