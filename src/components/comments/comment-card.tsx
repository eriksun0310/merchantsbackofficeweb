'use client';

import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { PawPrint } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
    <div className="border-l-2 border-neutral-200 bg-white py-4 pl-4 pr-4">
      {/* Header: 評論者 & 評價 */}
      <div className="flex items-start justify-between gap-4">
        {/* 左側：頭像、姓名、寵物 */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={reviewer.avatarUrl} alt={reviewer.name} />
            <AvatarFallback className="bg-neutral-100">{reviewer.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{reviewer.name}</p>
            {petInfo && (
              <p className="text-sm text-neutral-500">
                {PetSpeciesLabels[petInfo.species]} · {petInfo.name}
                {petInfo.breed && ` (${petInfo.breed})`}
              </p>
            )}
          </div>
        </div>

        {/* 右側：評價 & 友善度 */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              'gap-1',
              isPositive
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-amber-200 bg-amber-50 text-amber-700'
            )}
          >
            <PawPrint className="h-3.5 w-3.5" />
            {isPositive ? '腳掌' : '大便'}
          </Badge>
          <span className="text-sm text-neutral-500">
            友善度: {PetFriendlyLevelLabels[petFriendlyLevel]}
          </span>
        </div>
      </div>

      {/* 評論內容 */}
      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{content}</p>

      {/* 附加圖片 */}
      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file) => (
            <a
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-md border border-neutral-200 transition-opacity hover:opacity-80"
            >
              <img
                src={file.thumbnailUrl || file.url}
                alt="評論圖片"
                className="h-20 w-20 object-cover"
              />
            </a>
          ))}
        </div>
      )}

      {/* 時間 */}
      <p className="mt-3 text-xs text-neutral-400">
        {format(new Date(updateTime), 'yyyy/MM/dd HH:mm', { locale: zhTW })}
      </p>
    </div>
  );
}
