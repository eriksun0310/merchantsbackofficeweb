'use client';

import { useState, useRef } from 'react';
import { Venue, BusinessCategoryLabels } from '@/types/venue';
import { VenueFormValues } from '@/lib/validations/venue';
import { VenueView } from './venue-view';
import { VenueForm, VenueFormRef } from './venue-form';
import { VenueStatusBadge } from './venue-status-badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Pencil, X } from 'lucide-react';

interface VenueDialogProps {
  venue: Venue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: VenueFormValues) => Promise<void>;
  isSaving?: boolean;
}

export type VenueTab = 'basic' | 'hours' | 'images' | 'rules';

export function VenueDialog({
  venue,
  open,
  onOpenChange,
  onSave,
  isSaving = false,
}: VenueDialogProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [activeTab, setActiveTab] = useState<VenueTab>('basic');
  const formRef = useRef<VenueFormRef>(null);

  // 關閉 Dialog 時重置模式
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setMode('view');
      setActiveTab('basic');
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
      <DialogContent
        className="flex h-[85vh] w-[90vw] max-w-5xl flex-col gap-0 p-0"
        showCloseButton={false}
      >
        {/* 標題區 */}
        <DialogHeader className="shrink-0 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <DialogTitle className="text-xl font-semibold">
                {venue.name}
              </DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <VenueStatusBadge status={venue.status} />
                <span className="text-neutral-300">·</span>
                <span>{BusinessCategoryLabels[venue.categoryType]}</span>
              </div>
            </div>

            {/* 右側按鈕區 */}
            <div className="flex shrink-0 items-center gap-2">
              {mode === 'view' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMode('edit')}
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  編輯
                </Button>
              )}
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">關閉</span>
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        {/* 共用 Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as VenueTab)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="shrink-0 w-full justify-start rounded-none border-b border-neutral-200 bg-transparent px-6">
            <TabsTrigger value="basic">基本資訊</TabsTrigger>
            <TabsTrigger value="hours">營業時間</TabsTrigger>
            <TabsTrigger value="images">圖片</TabsTrigger>
            <TabsTrigger value="rules">寵物規定</TabsTrigger>
          </TabsList>

          {/* 內容區 */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            {mode === 'view' ? (
              <VenueView venue={venue} activeTab={activeTab} />
            ) : (
              <VenueForm
                ref={formRef}
                venue={venue}
                activeTab={activeTab}
                onSubmit={handleSave}
                isSubmitting={isSaving}
              />
            )}
          </div>
        </Tabs>

        {/* Edit 模式的底部按鈕 */}
        {mode === 'edit' && (
          <div className="flex shrink-0 justify-end gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-4">
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
