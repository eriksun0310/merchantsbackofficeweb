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
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { DayTypeLabels } from '@/types/venue';
import {
  parseOpeningHoursText,
  convertToFormFormat,
  getParsedDayTypes,
  ParseResult,
} from './utils/opening-hours-parser';

interface SmartPasteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentOpeningHours: { dayType: number; periods: { openTime: string; closeTime: string }[] }[];
  onApply: (openingHours: { dayType: number; periods: { openTime: string; closeTime: string }[] }[]) => void;
}

export function SmartPasteDialog({
  open,
  onOpenChange,
  currentOpeningHours,
  onApply,
}: SmartPasteDialogProps) {
  const [pastedText, setPastedText] = useState('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // 取得現有已有時段的天
  const existingDaysWithPeriods = currentOpeningHours
    .filter(day => day.periods.length > 0)
    .map(day => day.dayType);

  // 重置狀態
  const handleClose = () => {
    setPastedText('');
    setParseResult(null);
    setShowPreview(false);
    onOpenChange(false);
  };

  // 解析文字
  const handleParse = () => {
    const result = parseOpeningHoursText(pastedText, existingDaysWithPeriods);
    setParseResult(result);
    setShowPreview(true);
  };

  // 返回修改
  const handleBack = () => {
    setShowPreview(false);
  };

  // 確認套用
  const handleApply = () => {
    if (!parseResult) return;

    const hasData = parseResult.success.length > 0 || parseResult.closedDays.length > 0;
    if (!hasData) return;

    const newOpeningHours = convertToFormFormat(
      parseResult.success,
      parseResult.closedDays,
      currentOpeningHours
    );

    onApply(newOpeningHours);
    handleClose();
  };

  // 格式化時段顯示
  const formatPeriods = (dayType: number): string => {
    if (!parseResult) return '';

    // 檢查是否為休息日
    if (parseResult.closedDays.includes(dayType)) {
      return '休息';
    }

    const periods = parseResult.success.filter(p => p.dayType === dayType);
    if (periods.length === 0) return '';

    return periods.map(p => `${p.openTime}-${p.closeTime}`).join(', ');
  };

  // 取得解析到的星期列表
  const parsedDays = parseResult
    ? getParsedDayTypes(parseResult.success, parseResult.closedDays)
    : [];

  // 檢查是否有可套用的資料
  const hasApplicableData = parseResult
    ? parseResult.success.length > 0 || parseResult.closedDays.length > 0
    : false;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex h-[80vh] max-w-xl flex-col">
        {!showPreview ? (
          // 第一步：輸入文字
          <>
            <DialogHeader>
              <DialogTitle>智慧貼上營業時間</DialogTitle>
              <DialogDescription>
                請貼上營業時間文字，系統會自動解析並填入
              </DialogDescription>
            </DialogHeader>

            <div className="flex min-h-0 flex-1 flex-col space-y-4">
              <Textarea
                placeholder="請貼上營業時間文字..."
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                className="min-h-0 flex-1 resize-none font-mono text-sm"
              />

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <div className="text-xs text-blue-800">
                    <div className="mb-1 font-medium">支援格式範例：</div>
                    <pre className="whitespace-pre-wrap text-blue-600">
{`星期二
11:30–14:30
16:30–22:30

星期三
休息`}
                    </pre>
                    <div className="mt-2 text-blue-600">
                      可直接從 Google 地圖複製貼上
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="shrink-0">
              <Button variant="outline" onClick={handleClose}>
                取消
              </Button>
              <Button onClick={handleParse} disabled={!pastedText.trim()}>
                解析
              </Button>
            </DialogFooter>
          </>
        ) : (
          // 第二步：預覽結果
          <>
            <DialogHeader>
              <DialogTitle>解析結果預覽</DialogTitle>
              <DialogDescription>請確認解析結果是否正確</DialogDescription>
            </DialogHeader>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
              {/* 成功解析 */}
              {parsedDays.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-green-700">
                    成功解析 {parsedDays.length} 天的營業時間：
                  </div>
                  <div className="space-y-1 rounded-lg border bg-neutral-50 p-3">
                    {parsedDays.map((dayType) => (
                      <div key={dayType} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                        <span className="min-w-[3rem] font-medium">
                          {DayTypeLabels[dayType]}:
                        </span>
                        <span className="text-neutral-600">
                          {formatPeriods(dayType)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 解析錯誤 */}
              {parseResult && parseResult.errors.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    <div className="text-xs">
                      <div className="mb-1 font-medium text-red-800">
                        部分內容無法解析：
                      </div>
                      <div className="space-y-1 text-red-700">
                        {parseResult.errors.map((error, index) => (
                          <div key={index}>
                            • {error.reason}
                            {error.line && (
                              <span className="text-red-500">
                                : &quot;{error.line.substring(0, 30)}
                                {error.line.length > 30 ? '...' : ''}&quot;
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 覆蓋警告 */}
              {parseResult && parseResult.hasConflicts && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
                    <div className="text-xs text-yellow-800">
                      以下星期已有設定，將會被覆蓋：
                      <span className="ml-1 font-medium">
                        {parseResult.conflictDays.map(d => DayTypeLabels[d]).join('、')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 無法解析任何資料 */}
              {parseResult && !hasApplicableData && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    <div className="text-sm text-red-800">
                      無法解析任何營業時間，請檢查格式是否正確
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="shrink-0">
              <Button variant="outline" onClick={handleBack}>
                返回修改
              </Button>
              <Button onClick={handleApply} disabled={!hasApplicableData}>
                確認套用
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
