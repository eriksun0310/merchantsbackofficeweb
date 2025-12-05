'use client';

import { Venue } from '@/types/venue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicInfoView } from './basic-info-view';
import { OpeningHoursView } from './opening-hours-view';
import { ImagesView } from './images-view';
import { PetRulesView } from './pet-rules-view';

interface VenueViewProps {
  venue: Venue;
}

export function VenueView({ venue }: VenueViewProps) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-4">
        <TabsTrigger value="basic">基本資訊</TabsTrigger>
        <TabsTrigger value="hours">營業時間</TabsTrigger>
        <TabsTrigger value="images">圖片</TabsTrigger>
        <TabsTrigger value="rules">寵物規定</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <BasicInfoView venue={venue} />
      </TabsContent>

      <TabsContent value="hours">
        <OpeningHoursView venue={venue} />
      </TabsContent>

      <TabsContent value="images">
        <ImagesView venue={venue} />
      </TabsContent>

      <TabsContent value="rules">
        <PetRulesView venue={venue} />
      </TabsContent>
    </Tabs>
  );
}

export { BasicInfoView } from './basic-info-view';
export { OpeningHoursView } from './opening-hours-view';
export { ImagesView } from './images-view';
export { PetRulesView } from './pet-rules-view';
