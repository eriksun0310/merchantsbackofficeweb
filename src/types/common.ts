/** API 回應包裝 */
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

/** 分頁資訊 */
export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

/** 列表回應 */
export type ListResponse<T> = {
  items: T[];
  pagination: Pagination;
};
