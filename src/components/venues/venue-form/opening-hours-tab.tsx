'use client';

import { useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Plus, X, ClipboardPaste, Calendar, CalendarDays, CalendarRange } from 'lucide-react';
import { VenueFormValues } from '@/lib/validations/venue';
import { DayTypeLabels } from '@/types/venue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SmartPasteDialog } from './smart-paste-dialog';
import { QuickSetDialog } from './quick-set-dialog';

interface OpeningHoursTabProps {
  form: UseFormReturn<VenueFormValues>;
}

type QuickSetType = 'all' | 'weekdays' | 'weekend' | null;

const QUICK_SET_CONFIG = {
  all: {
    title: '全週統一設定',
    days: [1, 2, 3, 4, 5, 6, 7],
  },
  weekdays: {
    title: '週一至週五設定',
    days: [1, 2, 3, 4, 5],
  },
  weekend: {
    title: '週末設定',
    days: [6, 7],
  },
};

export function OpeningHoursTab({ form }: OpeningHoursTabProps) {
  const { watch, setValue } = form;
  const [smartPasteOpen, setSmartPasteOpen] = useState(false);
  const [quickSetType, setQuickSetType] = useState<QuickSetType>(null);

  const openingHours = watch('openingHours');

  // 判斷是否為暫停營業（所有七天的 periods 都為空）
  const isSuspended = useMemo(() => {
    return openingHours.every((day) => day.periods.length === 0);
  }, [openingHours]);

  // 切換暫停營業狀態
  const handleSuspendedChange = (suspended: boolean) => {
    if (suspended) {
      const suspendedHours = openingHours.map((day) => ({
        ...day,
        periods: [],
      }));
      setValue('openingHours', suspendedHours);
    } else {
      const defaultHours = openingHours.map((day) => ({
        ...day,
        periods: [{ openTime: '09:00', closeTime: '18:00' }],
      }));
      setValue('openingHours', defaultHours);
    }
  };

  const handleAddPeriod = (dayIndex: number) => {
    const currentPeriods = openingHours[dayIndex].periods;
    setValue(`openingHours.${dayIndex}.periods`, [
      ...currentPeriods,
      { openTime: '09:00', closeTime: '18:00' },
    ]);
  };

  const handleRemovePeriod = (dayIndex: number, periodIndex: number) => {
    const currentPeriods = openingHours[dayIndex].periods;
    setValue(
      `openingHours.${dayIndex}.periods`,
      currentPeriods.filter((_, i) => i !== periodIndex)
    );
  };

  const handleSetClosed = (dayIndex: number) => {
    setValue(`openingHours.${dayIndex}.periods`, []);
  };

  const handleSetOpen = (dayIndex: number) => {
    setValue(`openingHours.${dayIndex}.periods`, [
      { openTime: '09:00', closeTime: '18:00' },
    ]);
  };

  const handleSmartPasteApply = (
    newOpeningHours: { dayType: number; periods: { openTime: string; closeTime: string }[] }[]
  ) => {
    setValue('openingHours', newOpeningHours);
  };

  const handleQuickSetApply = (openTime: string, closeTime: string, targetDays: number[]) => {
    const newOpeningHours = openingHours.map((day) => {
      if (targetDays.includes(day.dayType)) {
        return {
          ...day,
          periods: [{ openTime, closeTime }],
        };
      }
      return day;
    });
    setValue('openingHours', newOpeningHours);
  };

  return (
    <div className="space-y-6">
      {/* 標題和暫停營業 */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-medium">每日營業時間</Label>
          <p className="text-sm text-neutral-500">
            設定每日營業時間，可新增多個時段
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="suspended-switch"
            checked={isSuspended}
            onCheckedChange={handleSuspendedChange}
          />
          <Label
            htmlFor="suspended-switch"
            className={`cursor-pointer text-sm ${isSuspended ? 'font-medium text-red-600' : 'text-neutral-600'}`}
          >
            暫停營業11
          </Label>
        </div>
      </div>

      {/* 快捷設定按鈕 */}
      <div className={`flex flex-wrap items-center gap-2 ${isSuspended ? 'pointer-events-none opacity-50' : ''}`}>
        <span className="text-sm text-neutral-500">快捷設定：</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuickSetType('all')}
          disabled={isSuspended}
        >
          <Calendar className="mr-1.5 h-3.5 w-3.5" />
          全週統一
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuickSetType('weekdays')}
          disabled={isSuspended}
        >
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          週一至五
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuickSetType('weekend')}
          disabled={isSuspended}
        >
          <CalendarRange className="mr-1.5 h-3.5 w-3.5" />
          週末
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setSmartPasteOpen(true)}
          disabled={isSuspended}
        >
          <ClipboardPaste className="mr-1.5 h-3.5 w-3.5" />
          智慧貼上
        </Button>
      </div>

      {/* 營業時間表格 */}
      <div className={`rounded-lg border ${isSuspended ? 'pointer-events-none opacity-50' : ''}`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">星期</TableHead>
              <TableHead>營業時間</TableHead>
              <TableHead className="w-28 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {openingHours.map((day, dayIndex) => (
              <TableRow key={day.dayType}>
                <TableCell className="font-medium">
                  {DayTypeLabels[day.dayType]}
                </TableCell>
                <TableCell>
                  {day.periods.length === 0 ? (
                    <span className="text-neutral-400">公休</span>
                  ) : (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {day.periods.map((period, periodIndex) => (
                        <div
                          key={periodIndex}
                          className="flex items-center gap-1.5"
                        >
                          <Input
                            type="time"
                            className="h-8 w-36"
                            value={period.openTime}
                            disabled={isSuspended}
                            onChange={(e) =>
                              setValue(
                                `openingHours.${dayIndex}.periods.${periodIndex}.openTime`,
                                e.target.value
                              )
                            }
                          />
                          <span className="text-neutral-400">-</span>
                          <Input
                            type="time"
                            className="h-8 w-36"
                            value={period.closeTime}
                            disabled={isSuspended}
                            onChange={(e) =>
                              setValue(
                                `openingHours.${dayIndex}.periods.${periodIndex}.closeTime`,
                                e.target.value
                              )
                            }
                          />
                          {day.periods.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-neutral-400 hover:text-red-500"
                              onClick={() => handleRemovePeriod(dayIndex, periodIndex)}
                              disabled={isSuspended}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {periodIndex < day.periods.length - 1 && (
                            <span className="text-neutral-300">,</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {day.periods.length === 0 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleSetOpen(dayIndex)}
                        disabled={isSuspended}
                      >
                        營業
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-neutral-500 hover:text-red-500"
                        onClick={() => handleSetClosed(dayIndex)}
                        disabled={isSuspended}
                      >
                        公休
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleAddPeriod(dayIndex)}
                      disabled={isSuspended}
                      title="新增時段"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 智慧貼上 Dialog */}
      <SmartPasteDialog
        open={smartPasteOpen}
        onOpenChange={setSmartPasteOpen}
        currentOpeningHours={openingHours}
        onApply={handleSmartPasteApply}
      />

      {/* 快捷設定 Dialog */}
      {quickSetType && (
        <QuickSetDialog
          open={!!quickSetType}
          onOpenChange={(open) => !open && setQuickSetType(null)}
          targetDays={QUICK_SET_CONFIG[quickSetType].days}
          title={QUICK_SET_CONFIG[quickSetType].title}
          onApply={handleQuickSetApply}
        />
      )}
    </div>
  );
}
