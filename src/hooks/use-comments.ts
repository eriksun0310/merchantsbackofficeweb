import { useQuery } from '@tanstack/react-query';
import { getCommentsByVenueId } from '@/mock/comments';
import { CommentItem } from '@/types/comment';

/** 根據店家 ID 取得評論列表 */
export function useCommentsByVenue(venueId: string | null) {
  return useQuery({
    queryKey: ['comments', venueId],
    queryFn: async (): Promise<CommentItem[]> => {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!venueId) {
        return [];
      }

      return getCommentsByVenueId(venueId);
    },
    enabled: !!venueId,
  });
}
