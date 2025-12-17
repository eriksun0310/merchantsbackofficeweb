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
import { VenueTab } from '../venue-dialog';
import { BasicInfoTab } from './basic-info-tab';
import { OpeningHoursTab } from './opening-hours-tab';
import { ImagesTab } from './images-tab';
import { PetRulesTab } from './pet-rules-tab';

export interface VenueFormRef {
  submit: () => void;
}

interface VenueFormProps {
  venue: Venue;
  activeTab: VenueTab;
  onSubmit: (data: VenueFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export const VenueForm = forwardRef<VenueFormRef, VenueFormProps>(
  function VenueForm({ venue, activeTab, onSubmit, isSubmitting }, ref) {
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
      <form onSubmit={handleSubmit} className="p-6">
        {activeTab === 'basic' && <BasicInfoTab form={form} />}
        {activeTab === 'hours' && <OpeningHoursTab form={form} />}
        {activeTab === 'images' && <ImagesTab form={form} />}
        {activeTab === 'rules' && <PetRulesTab form={form} />}
      </form>
    );
  }
);

export { BasicInfoTab } from './basic-info-tab';
export { OpeningHoursTab } from './opening-hours-tab';
export { ImagesTab } from './images-tab';
export { PetRulesTab } from './pet-rules-tab';
