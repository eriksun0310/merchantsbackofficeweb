'use client';

import { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useVenues, useUpdateVenue, useCreateVenue } from '@/hooks/use-venues';
import { Venue, BusinessStatus, BusinessCategoryLabels } from '@/types/venue';
import { VenueFormValues } from '@/lib/validations/venue';
import { Header } from '@/components/layout/header';
import { VenueFilterTabs } from '@/components/venues/venue-filter-tabs';
import { VenueTable } from '@/components/venues/venue-table';
import { VenueDialog } from '@/components/venues/venue-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function VenuesPage() {
  const { data: venues = [], isLoading } = useVenues();
  const updateVenue = useUpdateVenue();
  const createVenue = useCreateVenue();

  // 篩選狀態
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BusinessStatus | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dialog 狀態
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // 篩選邏輯
  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      // 搜尋過濾
      const matchesSearch =
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase());

      // 狀態過濾
      const matchesStatus =
        selectedStatus === null ||
        venue.status === selectedStatus ||
        (selectedStatus === BusinessStatus.CLOSED &&
          (venue.status === BusinessStatus.CLOSED || venue.status === BusinessStatus.INACTIVE));

      // 類型過濾
      const matchesCategory =
        selectedCategory === 'all' || venue.categoryType === Number(selectedCategory);

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [venues, searchQuery, selectedStatus, selectedCategory]);

  const handleRowClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setDialogOpen(true);
  };

  const handleSave = async (id: string, data: VenueFormValues) => {
    try {
      await updateVenue.mutateAsync({ id, data });
      toast.success('店家資訊已更新');
    } catch {
      toast.error('更新失敗，請稍後再試');
      throw new Error('Update failed');
    }
  };

  const handleCreate = async (data: VenueFormValues) => {
    try {
      await createVenue.mutateAsync(data);
      toast.success('店家已建立');
      setCreateDialogOpen(false);
    } catch {
      toast.error('建立失敗，請稍後再試');
      throw new Error('Create failed');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus(null);
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchQuery || selectedStatus !== null || selectedCategory !== 'all';

  return (
    <>
      <Header title="店家管理" description="管理您的所有店家資訊" />

      <div className="p-6 lg:p-8">
        {/* 搜尋 + 類型篩選 + 操作按鈕 */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* 搜尋框 */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
              <Input
                placeholder="搜尋店家名稱或地址..."
                className="border-0 bg-white pl-9 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 類型篩選 */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full border-0 bg-white shadow-sm sm:w-32">
                <SelectValue placeholder="類型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部類型</SelectItem>
                {Object.entries(BusinessCategoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 清除篩選 */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground"
              >
                清除篩選
              </Button>
            )}
          </div>

          {/* 新增按鈕 */}
          <Button className="shrink-0" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            新增店家
          </Button>
        </div>

        {/* 狀態 Tab + 表格 */}
        <div>
          <VenueFilterTabs
            venues={venues}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
          <VenueTable
            venues={filteredVenues}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      {/* 編輯店家 Dialog */}
      <VenueDialog
        venue={selectedVenue}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        isSaving={updateVenue.isPending}
        dialogMode="view-edit"
      />

      {/* 新增店家 Dialog */}
      <VenueDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreate={handleCreate}
        isSaving={createVenue.isPending}
        dialogMode="create"
      />
    </>
  );
}
