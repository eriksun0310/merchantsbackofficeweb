'use client';

import { useState } from 'react';
import { RegisterFormValues, ContactMethod } from '@/lib/validations/auth';
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
import { Label } from '@/components/ui/label';

interface RegisterSmartPasteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (data: Partial<RegisterFormValues>) => void;
}

/**
 * 解析貼上的文字，支援格式：
 * 帳號:111@gmail.com
 * 密碼:as123456
 * 負責人姓名:林先生
 * 電話:0912345678
 * 聯絡方式:line
 * line:a0912345678
 */
function parseRegisterText(text: string): Partial<RegisterFormValues> {
  const result: Partial<RegisterFormValues> = {};
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // 支援多種分隔符號：: ： =
    const match = trimmedLine.match(/^(.+?)[:\uff1a=]\s*(.+)$/);
    if (!match) continue;

    const key = match[1].trim().toLowerCase();
    const value = match[2].trim();

    // 帳號 / email
    if (key === '帳號' || key === 'email' || key === 'e-mail' || key === '信箱') {
      result.email = value;
    }
    // 密碼
    else if (key === '密碼' || key === 'password' || key === 'pwd') {
      result.password = value;
    }
    // 負責人姓名
    else if (
      key === '負責人姓名' ||
      key === '姓名' ||
      key === 'name' ||
      key === '負責人'
    ) {
      result.contactName = value;
    }
    // 電話
    else if (key === '電話' || key === 'phone' || key === 'tel' || key === '手機') {
      result.contactPhone = value;
    }
    // 聯絡方式
    else if (key === '聯絡方式' || key === 'contact' || key === '聯繫方式') {
      const lowerValue = value.toLowerCase();
      if (lowerValue === 'line') {
        result.contactMethod = ContactMethod.LINE;
      } else if (lowerValue === '電話' || lowerValue === 'phone') {
        result.contactMethod = ContactMethod.PHONE;
      }
    }
    // LINE ID
    else if (key === 'line' || key === 'lineid' || key === 'line id') {
      result.lineId = value;
      // 如果有 LINE ID，自動設定聯絡方式為 LINE
      if (!result.contactMethod) {
        result.contactMethod = ContactMethod.LINE;
      }
    }
  }

  return result;
}

export function RegisterSmartPasteDialog({
  open,
  onOpenChange,
  onApply,
}: RegisterSmartPasteDialogProps) {
  const [pasteText, setPasteText] = useState('');
  const [parsedData, setParsedData] = useState<Partial<RegisterFormValues> | null>(
    null
  );

  const handleParse = () => {
    const data = parseRegisterText(pasteText);
    setParsedData(data);
  };

  const handleApply = () => {
    if (parsedData) {
      onApply(parsedData);
      onOpenChange(false);
      setPasteText('');
      setParsedData(null);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setPasteText('');
    setParsedData(null);
  };

  const hasData = parsedData && Object.keys(parsedData).length > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>智慧貼上</DialogTitle>
          <DialogDescription>
            貼上註冊資料，系統會自動解析並填入表單
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>貼上資料</Label>
            <Textarea
              placeholder={`範例格式：
帳號:111@gmail.com
密碼:as123456
負責人姓名:林先生
電話:0912345678
聯絡方式:line
line:a0912345678`}
              value={pasteText}
              onChange={(e) => {
                setPasteText(e.target.value);
                setParsedData(null);
              }}
              rows={8}
            />
          </div>

          {parsedData && (
            <div className="rounded-md bg-neutral-50 p-3 space-y-1 text-sm">
              <p className="font-medium mb-2">解析結果：</p>
              {parsedData.email && (
                <p>
                  <span className="text-neutral-500">帳號：</span>
                  {parsedData.email}
                </p>
              )}
              {parsedData.password && (
                <p>
                  <span className="text-neutral-500">密碼：</span>
                  {'*'.repeat(parsedData.password.length)}
                </p>
              )}
              {parsedData.contactName && (
                <p>
                  <span className="text-neutral-500">負責人姓名：</span>
                  {parsedData.contactName}
                </p>
              )}
              {parsedData.contactPhone && (
                <p>
                  <span className="text-neutral-500">電話：</span>
                  {parsedData.contactPhone}
                </p>
              )}
              {parsedData.contactMethod && (
                <p>
                  <span className="text-neutral-500">聯絡方式：</span>
                  {parsedData.contactMethod === ContactMethod.LINE ? 'LINE' : '電話'}
                </p>
              )}
              {parsedData.lineId && (
                <p>
                  <span className="text-neutral-500">LINE ID：</span>
                  {parsedData.lineId}
                </p>
              )}
              {!hasData && (
                <p className="text-amber-600">無法解析任何資料，請確認格式</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={handleClose}>
            取消
          </Button>
          {!parsedData ? (
            <Button
              type="button"
              onClick={handleParse}
              disabled={!pasteText.trim()}
            >
              解析
            </Button>
          ) : (
            <Button type="button" onClick={handleApply} disabled={!hasData}>
              套用
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
