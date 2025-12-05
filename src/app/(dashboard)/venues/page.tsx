'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useVenues, useUpdateVenue } from '@/hooks/use-venues';
import { Venue } from '@/types/venue';
import { VenueFormValues } from '@/lib/validations/venue';
import { Header } from '@/components/layout/header';
import { VenueTable } from '@/components/venues/venue-table';
import { VenueDialog } from '@/components/venues/venue-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VenuesPage() {
  const { data: venues = [], isLoading } = useVenues();
  const updateVenue = useUpdateVenue();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <>
      <Header title="店家管理" description="管理您的所有店家資訊" />

      <div className="p-6">
        {/* 操作列 */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="搜尋店家名稱或地址..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            新增店家
          </Button>
        </div>

        {/* 店家列表 */}
        <VenueTable
          venues={filteredVenues}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />
      </div>

      {/* 店家 Dialog */}
      <VenueDialog
        venue={selectedVenue}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        isSaving={updateVenue.isPending}
      />
    </>
  );
}
