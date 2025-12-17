'use client';

import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { Upload, X, Star, ImageIcon } from 'lucide-react';
import { VenueFormValues } from '@/lib/validations/venue';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImagesTabProps {
  form: UseFormReturn<VenueFormValues>;
}

export function ImagesTab({ form }: ImagesTabProps) {
  const { watch, setValue } = form;
  const images = watch('images');

  const handleRemoveImage = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index)
    );
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const [moved] = newImages.splice(index, 1);
    newImages.unshift(moved);
    setValue('images', newImages);
  };

  const handleMockUpload = () => {
    // Mock 上傳 - 新增一張隨機圖片
    const mockImages = [
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400',
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];

    if (images.length < 10) {
      setValue('images', [...images, randomImage]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* 左欄：上傳區域 */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">店家圖片</Label>
          <p className="text-sm text-neutral-500">
            最多上傳 10 張圖片，第一張為主圖
          </p>
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Upload className="h-10 w-10 text-neutral-400" />
            <p className="mt-2 text-sm text-neutral-600">
              拖曳圖片至此處上傳
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={handleMockUpload}
              disabled={images.length >= 10}
            >
              選擇檔案 (Mock)
            </Button>
            <p className="mt-2 text-xs text-neutral-400">
              支援 JPG、PNG，單檔最大 5MB
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 右欄：已上傳圖片 */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          已上傳圖片 ({images.length}/10)
        </Label>

        {images.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
              >
                <Image
                  src={image}
                  alt={`店家圖片 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />

                {/* 主圖標籤 */}
                {index === 0 && (
                  <div className="absolute left-1 top-1 flex items-center gap-0.5 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                    <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                    主圖
                  </div>
                )}

                {/* 操作按鈕 */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  {index !== 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleSetPrimary(index)}
                    >
                      <Star className="mr-1 h-3 w-3" />
                      主圖
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-12">
            <ImageIcon className="h-10 w-10 text-neutral-300" />
            <p className="mt-2 text-sm text-neutral-500">尚未上傳任何圖片</p>
          </div>
        )}
      </div>
    </div>
  );
}
