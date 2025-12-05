'use client';

import { UseFormReturn } from 'react-hook-form';
import { VenueFormValues } from '@/lib/validations/venue';
import { BusinessCategory, BusinessCategoryLabels } from '@/types/venue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    formState: { errors },
    setValue,
    watch,
  } = form;

  const categoryType = watch('categoryType');

  return (
    <div className="space-y-6">
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
          <SelectTrigger>
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

      {/* 位置座標 */}
      <div className="space-y-2">
        <Label>位置座標</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude" className="text-sm text-neutral-500">
              緯度
            </Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              placeholder="例如：25.0339"
              {...register('location.latitude', { valueAsNumber: true })}
            />
            {errors.location?.latitude && (
              <p className="text-sm text-red-500">
                {errors.location.latitude.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude" className="text-sm text-neutral-500">
              經度
            </Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              placeholder="例如：121.5619"
              {...register('location.longitude', { valueAsNumber: true })}
            />
            {errors.location?.longitude && (
              <p className="text-sm text-red-500">
                {errors.location.longitude.message}
              </p>
            )}
          </div>
        </div>
      </div>

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

      {/* 店家描述 */}
      <div className="space-y-2">
        <Label htmlFor="description">店家描述</Label>
        <Textarea
          id="description"
          placeholder="請輸入店家描述..."
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
}
