import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockVenues } from '@/mock/venues';
import { Venue, VenueEditFormData } from '@/types/venue';

/** 取得店家列表 */
export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: async (): Promise<Venue[]> => {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockVenues;
    },
  });
}

/** 取得單一店家 */
export function useVenue(id: string) {
  return useQuery({
    queryKey: ['venue', id],
    queryFn: async (): Promise<Venue | null> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockVenues.find((v) => v.id === id) ?? null;
    },
    enabled: !!id,
  });
}

/** 更新店家 */
export function useUpdateVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: VenueEditFormData;
    }): Promise<Venue> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const venue = mockVenues.find((v) => v.id === id);
      if (!venue) {
        throw new Error('店家不存在');
      }

      // 模擬更新 (實際上不會修改 mock 資料)
      const updatedVenue: Venue = {
        ...venue,
        ...data,
        tags: data.tagIds?.map((tagId) => ({
          id: tagId,
          name: tagId, // 實際應從 tags 查找
        })),
        updatedAt: new Date().toISOString(),
      };

      return updatedVenue;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });
}

/** 刪除店家 */
export function useDeleteVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const venue = mockVenues.find((v) => v.id === id);
      if (!venue) {
        throw new Error('店家不存在');
      }

      // 模擬刪除
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });
}
