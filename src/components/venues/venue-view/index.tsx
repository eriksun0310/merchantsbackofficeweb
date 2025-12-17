'use client';

import { Venue } from '@/types/venue';
import { VenueTab } from '../venue-dialog';
import { BasicInfoView } from './basic-info-view';
import { OpeningHoursView } from './opening-hours-view';
import { ImagesView } from './images-view';
import { PetRulesView } from './pet-rules-view';

interface VenueViewProps {
  venue: Venue;
  activeTab: VenueTab;
}

export function VenueView({ venue, activeTab }: VenueViewProps) {
  return (
    <div className="p-6">
      {activeTab === 'basic' && <BasicInfoView venue={venue} />}
      {activeTab === 'hours' && <OpeningHoursView venue={venue} />}
      {activeTab === 'images' && <ImagesView venue={venue} />}
      {activeTab === 'rules' && <PetRulesView venue={venue} />}
    </div>
  );
}

export { BasicInfoView } from './basic-info-view';
export { OpeningHoursView } from './opening-hours-view';
export { ImagesView } from './images-view';
export { PetRulesView } from './pet-rules-view';
