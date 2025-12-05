import { useQuery } from '@tanstack/react-query';
import { mockTags } from '@/mock/tags';
import { VenueTag } from '@/types/venue';

/** 取得所有標籤 */
export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async (): Promise<VenueTag[]> => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockTags;
    },
  });
}
