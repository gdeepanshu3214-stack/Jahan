export type RoutePath =
  | '/'
  | '/about'
  | '/services'
  | '/services/road-freight'
  | '/services/air-freight'
  | '/services/ocean-freight'
  | '/services/student-express'
  | '/coverage'
  | '/track'
  | '/get-a-quote'
  | '/contact'
  | '/faq'
  | '/privacy'
  | '/terms'
  | '/audit';

export type ServiceId = 'road-freight' | 'air-freight' | 'ocean-freight' | 'student-express';

export interface ServiceDetail {
  id: ServiceId;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  idealFor: string[];
  cargoExamples: string[];
  processSteps: { title: string; desc: string }[];
  availabilityNotice: string;
  faqs: { question: string; answer: string }[];
  imageAlt: string;
}

export interface QuoteFormData {
  // Step 1: Shipment
  service: ServiceId | '';
  shipmentType: 'domestic' | 'international';
  originCountry: string;
  originCity: string;
  originPincode: string;
  destCountry: string;
  destCity: string;
  destPincode: string;
  packageCount: number;
  totalWeightKg: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  pickupDate: string;
  cargoDescription: string;
  studentMovementType?: 'home-to-hostel' | 'hostel-to-home' | 'none';

  // Step 2: Contact
  fullName: string;
  phone: string;
  email: string;
  businessName?: string;
  notes?: string;
}

export type QuoteStep = 1 | 2 | 3;

export interface TrackingCheckpoint {
  timestamp: string;
  location: string;
  status: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface ShipmentRecord {
  trackingNumber: string;
  service: string;
  origin: string;
  destination: string;
  senderNameMasked: string;
  recipientNameMasked: string;
  currentStatus: 'Booked' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Exception';
  estimatedDelivery?: string;
  lastUpdated: string;
  packagesCount: number;
  weightKg: number;
  checkpoints: TrackingCheckpoint[];
  isDemo: boolean;
}

export interface CoverageZone {
  id: string;
  name: string;
  category: 'Special Zone' | 'North India Hub' | 'Domestic Network' | 'International Gateway';
  coverageDescription: string;
  keyHubs: string[];
  transportModes: ('Road' | 'Air' | 'Ocean')[];
  terrainNotes?: string;
  specialNotice?: string;
}

export interface MigrationChecklistItem {
  sourceUrl: string;
  originalSection: string;
  originalClaimOrData: string;
  statusInNewSite: 'Preserved & Refined' | 'Preserved As Provisional' | 'Explicitly Flagged For Verification' | 'Hidden Pending Approval';
  newLocation: string;
  notes: string;
}
