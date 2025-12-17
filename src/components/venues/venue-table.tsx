'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, Trash2, ImageIcon, Store } from 'lucide-react';
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
    e.stopPropagation();
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
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Store className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">尚無店家</p>
        <p className="mt-1 text-sm text-muted-foreground">
          點擊「新增店家」開始建立
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
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
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => onRowClick?.(venue)}
            >
              <TableCell>
                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-muted">
                  {venue.images[0] ? (
                    <Image
                      src={venue.images[0]}
                      alt={venue.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium text-foreground">{venue.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {BusinessCategoryLabels[venue.categoryType]}
                </span>
              </TableCell>
              <TableCell>
                <span className="line-clamp-1 text-sm text-muted-foreground">
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
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
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
          <TableRow key={i} className="hover:bg-transparent">
            <TableCell>
              <Skeleton className="h-12 w-12 rounded-lg" />
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
              <Skeleton className="h-5 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="ml-auto h-8 w-8" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
