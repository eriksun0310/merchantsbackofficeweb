'use client';

import { UseFormReturn } from 'react-hook-form';
import { VenueFormValues } from '@/lib/validations/venue';
import { BusinessCategory, BusinessCategoryLabels } from '@/types/venue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CoordinateInput } from '@/components/ui/coordinate-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BasicInfoTabProps {
  form: UseFormReturn<VenueFormValues>;
}

export function BasicInfoTab({ form }: BasicInfoTabProps) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const categoryType = watch('categoryType');

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      {/* 左欄 */}
      {/* 店家類型 */}
      <div className="space-y-2">
        <Label htmlFor="categoryType">
          店家類型 <span className="text-red-500">*</span>
        </Label>
        <Select
          value={categoryType?.toString()}
          onValueChange={(value) =>
            setValue('categoryType', parseInt(value) as BusinessCategory)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="請選擇類型" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(BusinessCategoryLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryType && (
          <p className="text-sm text-red-500">{errors.categoryType.message}</p>
        )}
      </div>

      {/* 右欄 */}
      {/* Google 地圖連結 */}
      <div className="space-y-2">
        <Label htmlFor="googleMapsUrl">Google 地圖連結</Label>
        <Input
          id="googleMapsUrl"
          type="url"
          placeholder="https://maps.google.com/..."
          {...register('googleMapsUrl')}
        />
        {errors.googleMapsUrl && (
          <p className="text-sm text-red-500">{errors.googleMapsUrl.message}</p>
        )}
      </div>

      {/* 左欄 */}
      {/* 地址 */}
      <div className="space-y-2">
        <Label htmlFor="address">
          地址 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="address"
          placeholder="請輸入完整地址"
          {...register('address')}
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* 右欄 */}
      {/* 官方網站 */}
      <div className="space-y-2">
        <Label htmlFor="website">官方網站</Label>
        <Input
          id="website"
          type="url"
          placeholder="https://example.com"
          {...register('website')}
        />
        {errors.website && (
          <p className="text-sm text-red-500">{errors.website.message}</p>
        )}
      </div>

      {/* 左欄 */}
      {/* 電話 */}
      <div className="space-y-2">
        <Label htmlFor="phone">電話</Label>
        <Input
          id="phone"
          placeholder="例如：02-1234-5678"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* 右欄 */}
      {/* 店家描述 */}
      <div className="row-span-2 space-y-2">
        <Label htmlFor="description">店家描述</Label>
        <Textarea
          id="description"
          placeholder="請輸入店家描述..."
          className="min-h-[120px]"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* 左欄 */}
      {/* 位置座標 - 智慧貼上 */}
      <CoordinateInput
        control={control}
        latitudeName="location.latitude"
        longitudeName="location.longitude"
        label="位置座標"
      />
    </div>
  );
}
