'use client';

import { UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';
import { VenueFormValues } from '@/lib/validations/venue';
import {
  PetGroundingRuleType,
  PetGroundingRuleTypeLabels,
  ReservationMethod,
  ReservationMethodLabels,
} from '@/types/venue';
import { useTags } from '@/hooks/use-tags';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface PetRulesTabProps {
  form: UseFormReturn<VenueFormValues>;
}

export function PetRulesTab({ form }: PetRulesTabProps) {
  const { watch, setValue } = form;
  const { data: allTags = [] } = useTags();

  const petGroundingRuleType = watch('petGroundingRuleType');
  const reservationMethods = watch('reservationMethods') ?? [];
  const tagIds = watch('tagIds') ?? [];

  const handleReservationMethodChange = (
    method: ReservationMethod,
    checked: boolean
  ) => {
    if (checked) {
      setValue('reservationMethods', [...reservationMethods, method]);
    } else {
      setValue(
        'reservationMethods',
        reservationMethods.filter((m) => m !== method)
      );
    }
  };

  const handleTagAdd = (tagId: string) => {
    if (!tagIds.includes(tagId)) {
      setValue('tagIds', [...tagIds, tagId]);
    }
  };

  const handleTagRemove = (tagId: string) => {
    setValue(
      'tagIds',
      tagIds.filter((id) => id !== tagId)
    );
  };

  const selectedTags = allTags.filter((tag) => tagIds.includes(tag.id));
  const availableTags = allTags.filter((tag) => !tagIds.includes(tag.id));

  return (
    <div className="space-y-8">
      {/* 落地規定 */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">落地規定</Label>
          <p className="text-sm text-neutral-500">寵物在店內的活動規定</p>
        </div>
        <RadioGroup
          value={petGroundingRuleType?.toString()}
          onValueChange={(value) =>
            setValue(
              'petGroundingRuleType',
              parseInt(value) as PetGroundingRuleType
            )
          }
        >
          {Object.entries(PetGroundingRuleTypeLabels).map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`grounding-${value}`} />
              <Label
                htmlFor={`grounding-${value}`}
                className="font-normal cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* 預約方式 */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">預約方式</Label>
          <p className="text-sm text-neutral-500">可複選</p>
        </div>
        <div className="space-y-3">
          {Object.entries(ReservationMethodLabels).map(([value, label]) => {
            const method = parseInt(value) as ReservationMethod;
            const isChecked = reservationMethods.includes(method);

            return (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`reservation-${value}`}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleReservationMethodChange(method, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`reservation-${value}`}
                  className="font-normal cursor-pointer"
                >
                  {label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* 毛孩友善標籤 */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">毛孩友善標籤</Label>
          <p className="text-sm text-neutral-500">選擇適合的標籤</p>
        </div>

        {/* 已選標籤 */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="gap-1 pl-3 pr-1"
              >
                {tag.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 hover:bg-transparent"
                  onClick={() => handleTagRemove(tag.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* 可選標籤 */}
        {availableTags.length > 0 && (
          <div>
            <Label className="mb-2 block text-sm text-neutral-500">
              可選標籤：
            </Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTagAdd(tag.id)}
                >
                  + {tag.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
