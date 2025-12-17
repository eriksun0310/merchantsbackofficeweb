'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DayTypeLabels } from '@/types/venue';

interface QuickSetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetDays: number[];
  title: string;
  onApply: (openTime: string, closeTime: string, targetDays: number[]) => void;
}

export function QuickSetDialog({
  open,
  onOpenChange,
  targetDays,
  title,
  onApply,
}: QuickSetDialogProps) {
  const [openTime, setOpenTime] = useState('09:00');
  const [closeTime, setCloseTime] = useState('18:00');

  const handleApply = () => {
    onApply(openTime, closeTime, targetDays);
    onOpenChange(false);
  };

  const targetDayNames = targetDays.map((d) => DayTypeLabels[d]).join('、');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            設定營業時間將套用到：{targetDayNames}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="open-time">開始時間</Label>
              <Input
                id="open-time"
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
              />
            </div>
            <div className="flex items-end pb-2">
              <span className="text-neutral-500">至</span>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="close-time">結束時間</Label>
              <Input
                id="close-time"
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleApply}>套用</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
