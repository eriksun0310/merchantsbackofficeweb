'use client';

import { useState, useRef } from 'react';
import { Venue } from '@/types/venue';
import { VenueFormValues } from '@/lib/validations/venue';
import { VenueView } from './venue-view';
import { VenueForm, VenueFormRef } from './venue-form';
import { VenueStatusBadge } from './venue-status-badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface VenueDialogProps {
  venue: Venue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: VenueFormValues) => Promise<void>;
  isSaving?: boolean;
}

export function VenueDialog({
  venue,
  open,
  onOpenChange,
  onSave,
  isSaving = false,
}: VenueDialogProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const formRef = useRef<VenueFormRef>(null);

  // 關閉 Dialog 時重置模式
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setMode('view');
    }
    onOpenChange(newOpen);
  };

  // 儲存成功後切回 View 模式
  const handleSave = async (data: VenueFormValues) => {
    if (!venue) return;
    await onSave(venue.id, data);
    setMode('view');
  };

  // 取消編輯
  const handleCancel = () => {
    setMode('view');
  };

  // 觸發表單提交
  const handleSubmitClick = () => {
    formRef.current?.submit();
  };

  if (!venue) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-[80vh] max-w-2xl flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pr-8">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl">{venue.name}</DialogTitle>
            <VenueStatusBadge status={venue.status} />
          </div>
          {mode === 'view' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMode('edit')}
            >
              <Pencil className="mr-2 h-4 w-4" />
              編輯
            </Button>
          )}
        </DialogHeader>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
          {mode === 'view' ? (
            <VenueView venue={venue} />
          ) : (
            <VenueForm
              ref={formRef}
              venue={venue}
              onSubmit={handleSave}
              isSubmitting={isSaving}
            />
          )}
        </div>

        {/* Edit 模式的底部按鈕 */}
        {mode === 'edit' && (
          <div className="mt-4 flex shrink-0 justify-end gap-3 border-t border-neutral-200 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              取消
            </Button>
            <Button
              onClick={handleSubmitClick}
              disabled={isSaving}
            >
              {isSaving ? '儲存中...' : '儲存變更'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
