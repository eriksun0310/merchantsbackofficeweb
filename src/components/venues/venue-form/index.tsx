'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import { Venue } from '@/types/venue';
import {
  venueFormSchema,
  VenueFormValues,
  venueToFormValues,
} from '@/lib/validations/venue';
import { BasicInfoTab } from './basic-info-tab';
import { OpeningHoursTab } from './opening-hours-tab';
import { ImagesTab } from './images-tab';
import { PetRulesTab } from './pet-rules-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface VenueFormRef {
  submit: () => void;
}

interface VenueFormProps {
  venue: Venue;
  onSubmit: (data: VenueFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export const VenueForm = forwardRef<VenueFormRef, VenueFormProps>(
  function VenueForm({ venue, onSubmit, isSubmitting }, ref) {
    const form = useForm<VenueFormValues>({
      resolver: zodResolver(venueFormSchema),
      defaultValues: venueToFormValues(venue),
    });

    const handleSubmit = form.handleSubmit(async (data) => {
      await onSubmit(data);
    });

    // 暴露 submit 方法給外部
    useImperativeHandle(ref, () => ({
      submit: () => {
        handleSubmit();
      },
    }));

    return (
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-4">
            <TabsTrigger value="basic">基本資訊</TabsTrigger>
            <TabsTrigger value="hours">營業時間</TabsTrigger>
            <TabsTrigger value="images">圖片</TabsTrigger>
            <TabsTrigger value="rules">寵物規定</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-0">
            <BasicInfoTab form={form} />
          </TabsContent>

          <TabsContent value="hours" className="mt-0">
            <OpeningHoursTab form={form} />
          </TabsContent>

          <TabsContent value="images" className="mt-0">
            <ImagesTab form={form} />
          </TabsContent>

          <TabsContent value="rules" className="mt-0">
            <PetRulesTab form={form} />
          </TabsContent>
        </Tabs>
      </form>
    );
  }
);

export { BasicInfoTab } from './basic-info-tab';
export { OpeningHoursTab } from './opening-hours-tab';
export { ImagesTab } from './images-tab';
export { PetRulesTab } from './pet-rules-tab';
