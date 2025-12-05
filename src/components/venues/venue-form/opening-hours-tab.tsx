'use client';

import { useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Plus, X, ClipboardPaste } from 'lucide-react';
import { VenueFormValues } from '@/lib/validations/venue';
import { DayTypeLabels } from '@/types/venue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { SmartPasteDialog } from './smart-paste-dialog';

interface OpeningHoursTabProps {
  form: UseFormReturn<VenueFormValues>;
}

export function OpeningHoursTab({ form }: OpeningHoursTabProps) {
  const { watch, setValue } = form;
  const [smartPasteOpen, setSmartPasteOpen] = useState(false);

  const openingHours = watch('openingHours');

  // 判斷是否為暫停營業（所有七天的 periods 都為空）
  const isSuspended = useMemo(() => {
    return openingHours.every((day) => day.periods.length === 0);
  }, [openingHours]);

  // 切換暫停營業狀態
  const handleSuspendedChange = (suspended: boolean) => {
    if (suspended) {
      // 開啟暫停營業：所有天設為空陣列
      const suspendedHours = openingHours.map((day) => ({
        ...day,
        periods: [],
      }));
      setValue('openingHours', suspendedHours);
    } else {
      // 關閉暫停營業：恢復預設營業時間 09:00-18:00
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

  const handleSmartPasteApply = (
    newOpeningHours: { dayType: number; periods: { openTime: string; closeTime: string }[] }[]
  ) => {
    setValue('openingHours', newOpeningHours);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-medium">每日營業時間</Label>
          <p className="text-sm text-neutral-500">
            設定每日營業時間，可新增多個時段
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* 暫停營業 Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="suspended-switch"
              checked={isSuspended}
              onCheckedChange={handleSuspendedChange}
            />
            <Label
              htmlFor="suspended-switch"
              className={`text-sm cursor-pointer ${isSuspended ? 'text-red-600 font-medium' : 'text-neutral-600'}`}
            >
              暫停營業
            </Label>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSmartPasteOpen(true)}
            disabled={isSuspended}
          >
            <ClipboardPaste className="mr-2 h-4 w-4" />
            智慧貼上
          </Button>
        </div>
      </div>

      <div className={`space-y-4 ${isSuspended ? 'opacity-50 pointer-events-none' : ''}`}>
        {openingHours.map((day, dayIndex) => (
          <Card key={day.dayType}>
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center justify-between">
                    <Label className="font-medium">
                      {DayTypeLabels[day.dayType]}
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleSetClosed(dayIndex)}
                        disabled={isSuspended}
                      >
                        設為公休
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleAddPeriod(dayIndex)}
                        disabled={isSuspended}
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        新增時段
                      </Button>
                    </div>
                  </div>

                  {day.periods.length === 0 ? (
                    <p className="text-sm text-neutral-500">
                      {isSuspended ? '休息' : '公休日'}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {day.periods.map((period, periodIndex) => (
                        <div
                          key={periodIndex}
                          className="flex items-center gap-2"
                        >
                          <Input
                            type="time"
                            className="w-32"
                            value={period.openTime}
                            disabled={isSuspended}
                            onChange={(e) =>
                              setValue(
                                `openingHours.${dayIndex}.periods.${periodIndex}.openTime`,
                                e.target.value
                              )
                            }
                          />
                          <span className="text-neutral-500">至</span>
                          <Input
                            type="time"
                            className="w-32"
                            value={period.closeTime}
                            disabled={isSuspended}
                            onChange={(e) =>
                              setValue(
                                `openingHours.${dayIndex}.periods.${periodIndex}.closeTime`,
                                e.target.value
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-neutral-400 hover:text-red-500"
                            disabled={isSuspended}
                            onClick={() =>
                              handleRemovePeriod(dayIndex, periodIndex)
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 智慧貼上 Dialog */}
      <SmartPasteDialog
        open={smartPasteOpen}
        onOpenChange={setSmartPasteOpen}
        currentOpeningHours={openingHours}
        onApply={handleSmartPasteApply}
      />
    </div>
  );
}
