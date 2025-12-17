'use client';

import { useState, useEffect } from 'react';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import { MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from './input';
import { Label } from './label';

/**
 * 解析座標字串
 * 支援格式：
 * - "25.0330, 121.5654" (Google Maps 格式)
 * - "25.0330,121.5654" (無空格)
 * - "25.0330 121.5654" (空格分隔)
 */
function parseCoordinates(value: string): { latitude: number | null; longitude: number | null } {
  const trimmed = value.trim();

  // 嘗試用逗號分隔
  let parts = trimmed.split(',').map((s) => s.trim());

  // 如果沒有逗號，嘗試用空格分隔
  if (parts.length !== 2) {
    parts = trimmed.split(/\s+/);
  }

  if (parts.length !== 2) {
    return { latitude: null, longitude: null };
  }

  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);

  // 驗證是否為有效數字
  if (isNaN(lat) || isNaN(lng)) {
    return { latitude: null, longitude: null };
  }

  // 驗證經緯度範圍
  // 緯度: -90 ~ 90
  // 經度: -180 ~ 180
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return { latitude: null, longitude: null };
  }

  return { latitude: lat, longitude: lng };
}

interface CoordinateInputProps<T extends FieldValues> {
  control: Control<T>;
  latitudeName: Path<T>;
  longitudeName: Path<T>;
  required?: boolean;
  label?: string;
}

export function CoordinateInput<T extends FieldValues>({
  control,
  latitudeName,
  longitudeName,
  required = false,
  label = '經緯度座標',
}: CoordinateInputProps<T>) {
  const [inputValue, setInputValue] = useState('');
  const [parseStatus, setParseStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    field: latitudeField,
    fieldState: { error: latitudeError },
  } = useController({
    name: latitudeName,
    control,
  });

  const {
    field: longitudeField,
    fieldState: { error: longitudeError },
  } = useController({
    name: longitudeName,
    control,
  });

  // 初始化：如果表單已有值，顯示在輸入框中
  useEffect(() => {
    const lat = latitudeField.value;
    const lng = longitudeField.value;

    if (lat && lng && !inputValue) {
      setInputValue(`${lat}, ${lng}`);
      setParseStatus('success');
    }
  }, [latitudeField.value, longitudeField.value, inputValue]);

  // 處理輸入變化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value.trim()) {
      latitudeField.onChange(undefined);
      longitudeField.onChange(undefined);
      setParseStatus('idle');
      return;
    }

    const { latitude, longitude } = parseCoordinates(value);

    if (latitude !== null && longitude !== null) {
      latitudeField.onChange(latitude);
      longitudeField.onChange(longitude);
      setParseStatus('success');
    } else {
      latitudeField.onChange(undefined);
      longitudeField.onChange(undefined);
      setParseStatus('error');
    }
  };

  const errorMessage = latitudeError?.message || longitudeError?.message;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Label className="text-base font-medium">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      </div>

      <p className="text-sm text-muted-foreground">
        可從 Google Maps 右鍵點擊地點獲取座標，支援直接貼上
      </p>

      {/* 輸入框 */}
      <div className="relative">
        <Input
          type="text"
          placeholder="例如：25.0330, 121.5654"
          value={inputValue}
          onChange={handleInputChange}
          className={errorMessage ? 'border-red-500 pr-10' : 'pr-10'}
        />
        {/* 解析狀態圖示 */}
        {parseStatus === 'success' && (
          <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
        )}
        {parseStatus === 'error' && (
          <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
        )}
      </div>

      {/* 錯誤訊息 */}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      {/* 解析成功：顯示經緯度 */}
      {parseStatus === 'success' && latitudeField.value && longitudeField.value && (
        <div className="grid grid-cols-2 gap-4 rounded-lg bg-neutral-50 p-3">
          <div>
            <p className="mb-1 text-xs text-muted-foreground">緯度 (Latitude)</p>
            <p className="font-mono text-sm font-semibold">{latitudeField.value}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-muted-foreground">經度 (Longitude)</p>
            <p className="font-mono text-sm font-semibold">{longitudeField.value}</p>
          </div>
        </div>
      )}

      {/* 解析失敗提示 */}
      {parseStatus === 'error' && inputValue.trim() && (
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-xs text-red-600">
            無法解析座標，請確認格式正確（例：25.0330, 121.5654）
          </p>
        </div>
      )}
    </div>
  );
}
