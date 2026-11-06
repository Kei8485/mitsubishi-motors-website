// =============================================================================
// MITSUBISHI MOTORS — DATA MODELS & INTERFACES
// =============================================================================

export type VehicleCategory = 'MPV' | 'SUV' | 'CROSSOVER' | 'PICKUP' | 'SEDAN';

/**
 * Controls how a vehicle is rendered inside `<app-vehicle-stage>`:
 * - 'placeholder' : Shows the 3D elliptical turntable wireframe ring & [3D] badge
 * - 'image'       : Renders the 2D transparent cutout PNG (`vehicle.image`)
 * - '3d'          : Renders the interactive 3D model slot (`vehicle.model3d` or projected 3D viewer)
 */
export type VehicleStageMode = 'placeholder' | 'image' | '3d';

export interface VehicleColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface VehicleVariant {
  name: string;
  price: string;
}

export interface VehicleFeatureCard {
  title: string;
  description: string;
  fullWidth?: boolean;
}

export interface VehicleOverviewSpecs {
  engine: string;
  transmission: string;
  seating: string;
  fuel: string;
  dimensions: string;
  clearance: string;
}
export interface VehicleModel {
  id: string;
  name: string;
  category: VehicleCategory;
  year: string;
  startingPrice: string;
  numericPrice: number;
  /** 2D studio cutout PNG path (used when stageMode is 'image') */
  image: string;
  /** Optional 3D model path e.g. 'assets/models/xpander.glb' (used when stageMode is '3d') */
  model3d?: string;
  /** Optional per-vehicle override for stage rendering ('placeholder' | 'image' | '3d') */
  stageMode?: VehicleStageMode;
  /** Short 3-pill badge array displayed at the bottom of every Vehicle Card: [SEATS, FUEL, TRANS] */
  cardSpecs: [string, string, string];
  /** Show in the Home Page Hero Featured Carousel */
  isFeatured?: boolean;
  /** Show in the Home Page "BRAND NEW" section */
  isBrandNewHome?: boolean;
  heroLabel?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  colors?: VehicleColorOption[];
  overviewSpecs?: VehicleOverviewSpecs;
  variants?: VehicleVariant[];
  features?: VehicleFeatureCard[];
}

export interface DealershipStat {
  value: string;
  label: string;
}

export interface PromoBannerItem {
  id: string;
  tag: string;
  title: string;
  ctaText: string;
  route: string;
  bgImage?: string;
}

export interface NavMenuItem {
  number: string;
  label: string;
  route: string;
  fragment?: string;
}

export interface DealershipConfig {
  brandName: string;
  dealerName: string;
  city: string;
  taglineSummary: string;
  aboutHeading: string;
  aboutStory: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  copyrightYear: number;
  stats: DealershipStat[];
  socials: { label: string; url: string }[];
}
