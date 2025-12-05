'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, Trash2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Venue, BusinessCategoryLabels } from '@/types/venue';
import { useDeleteVenue } from '@/hooks/use-venues';
import { VenueStatusBadge } from './venue-status-badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

interface VenueTableProps {
  venues: Venue[];
  isLoading?: boolean;
  onRowClick?: (venue: Venue) => void;
}

export function VenueTable({ venues, isLoading, onRowClick }: VenueTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<Venue | null>(null);
  const deleteVenue = useDeleteVenue();

  const handleDeleteClick = (e: React.MouseEvent, venue: Venue) => {
    e.stopPropagation(); // 阻止觸發 row click
    setVenueToDelete(venue);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!venueToDelete) return;

    try {
      await deleteVenue.mutateAsync(venueToDelete.id);
      toast.success('店家已刪除');
      setDeleteDialogOpen(false);
      setVenueToDelete(null);
    } catch {
      toast.error('刪除失敗');
    }
  };

  if (isLoading) {
    return <VenueTableSkeleton />;
  }

  if (venues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-16">
        <ImageIcon className="h-12 w-12 text-neutral-400" />
        <h3 className="mt-4 text-lg font-medium">尚無店家</h3>
        <p className="mt-1 text-sm text-neutral-500">
          點擊「新增店家」開始建立您的第一間店家
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">圖片</TableHead>
              <TableHead>店家名稱</TableHead>
              <TableHead className="w-24">類型</TableHead>
              <TableHead>地址</TableHead>
              <TableHead className="w-28">狀態</TableHead>
              <TableHead className="w-16 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {venues.map((venue) => (
              <TableRow
                key={venue.id}
                className="cursor-pointer hover:bg-neutral-50"
                onClick={() => onRowClick?.(venue)}
              >
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-md bg-neutral-100">
                    {venue.images[0] ? (
                      <Image
                        src={venue.images[0]}
                        alt={venue.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-neutral-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{venue.name}</TableCell>
                <TableCell>
                  <span className="text-sm text-neutral-600">
                    {BusinessCategoryLabels[venue.categoryType]}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1 text-sm text-neutral-600">
                    {venue.address}
                  </span>
                </TableCell>
                <TableCell>
                  <VenueStatusBadge status={venue.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={(e) => handleDeleteClick(e, venue)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        刪除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 刪除確認對話框 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確定要刪除此店家？</DialogTitle>
            <DialogDescription>
              您即將刪除「{venueToDelete?.name}」，此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteVenue.isPending}
            >
              {deleteVenue.isPending ? '刪除中...' : '確定刪除'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function VenueTableSkeleton() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">圖片</TableHead>
            <TableHead>店家名稱</TableHead>
            <TableHead className="w-24">類型</TableHead>
            <TableHead>地址</TableHead>
            <TableHead className="w-28">狀態</TableHead>
            <TableHead className="w-16 text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-10 w-10 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="ml-auto h-8 w-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
