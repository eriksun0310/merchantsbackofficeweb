'use client';

import { useState, useRef, useEffect } from 'react';
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
  venue?: Venue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (id: string, data: VenueFormValues) => Promise<void>;
  onCreate?: (data: VenueFormValues) => Promise<void>;
  isSaving?: boolean;
  /** 'view-edit' 用於現有店家（可檢視/編輯），'create' 用於新增店家 */
  dialogMode?: 'view-edit' | 'create';
}

export type VenueTab = 'basic' | 'hours' | 'images' | 'rules';

export function VenueDialog({
  venue,
  open,
  onOpenChange,
  onSave,
  onCreate,
  isSaving = false,
  dialogMode = 'view-edit',
}: VenueDialogProps) {
  const isCreateMode = dialogMode === 'create';
  const [internalMode, setInternalMode] = useState<'view' | 'edit'>(
    isCreateMode ? 'edit' : 'view'
  );
  const [activeTab, setActiveTab] = useState<VenueTab>('basic');
  const formRef = useRef<VenueFormRef>(null);

  // 當 dialogMode 改變時，重置內部模式
  useEffect(() => {
    if (open) {
      setInternalMode(isCreateMode ? 'edit' : 'view');
      setActiveTab('basic');
    }
  }, [open, isCreateMode]);

  // 關閉 Dialog 時重置模式
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setInternalMode(isCreateMode ? 'edit' : 'view');
      setActiveTab('basic');
    }
    onOpenChange(newOpen);
  };

  // 儲存/建立成功後的處理
  const handleSubmit = async (data: VenueFormValues) => {
    if (isCreateMode) {
      await onCreate?.(data);
    } else if (venue) {
      await onSave?.(venue.id, data);
      setInternalMode('view');
    }
  };

  // 取消編輯
  const handleCancel = () => {
    if (isCreateMode) {
      onOpenChange(false);
    } else {
      setInternalMode('view');
    }
  };

  // 觸發表單提交
  const handleSubmitClick = () => {
    formRef.current?.submit();
  };

  // view-edit 模式下，沒有 venue 時不渲染
  if (!isCreateMode && !venue) return null;

  const showForm = isCreateMode || internalMode === 'edit';

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
                {isCreateMode ? '新增店家' : '編輯店家'}
              </DialogTitle>
              {/* 只有 view-edit 模式且有 venue 時顯示狀態 */}
              {!isCreateMode && venue && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <VenueStatusBadge status={venue.status} />
                  <span className="text-neutral-300">·</span>
                  <span>{BusinessCategoryLabels[venue.categoryType]}</span>
                </div>
              )}
            </div>

            {/* 右側按鈕區 */}
            <div className="flex shrink-0 items-center gap-2">
              {/* 只有 view-edit 模式且在 view 狀態時顯示編輯按鈕 */}
              {!isCreateMode && internalMode === 'view' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInternalMode('edit')}
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
            {showForm ? (
              <VenueForm
                ref={formRef}
                venue={venue ?? undefined}
                activeTab={activeTab}
                onSubmit={handleSubmit}
                isSubmitting={isSaving}
              />
            ) : (
              venue && <VenueView venue={venue} activeTab={activeTab} />
            )}
          </div>
        </Tabs>

        {/* 表單模式的底部按鈕 */}
        {showForm && (
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
              {isSaving
                ? isCreateMode
                  ? '建立中...'
                  : '儲存中...'
                : isCreateMode
                  ? '建立店家'
                  : '儲存變更'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
