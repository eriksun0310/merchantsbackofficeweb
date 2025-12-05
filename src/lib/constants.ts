/** Sidebar 導航選項 */
export const NAV_ITEMS = [
  {
    title: '店家管理',
    href: '/venues',
    icon: 'Store',
  },
  {
    title: '會員管理',
    href: '/members',
    icon: 'Users',
    disabled: true, // 預留功能
  },
] as const;

/** Sidebar 寬度 */
export const SIDEBAR_WIDTH = {
  EXPANDED: 240,
  COLLAPSED: 64,
} as const;
