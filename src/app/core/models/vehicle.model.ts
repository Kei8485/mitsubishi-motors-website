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

export type VehicleHoverTheme = 'industrial' | 'hangar' | 'asphalt';

/**
 * Reusable configuration for the interactive card hover showcase effect.
 * Stored in `site-data.ts` so every vehicle card across Home, Models, etc. can reuse it.
 */
export interface VehicleHoverFX {
  /** Master toggle for the hover showcase effect (default: true) */
  enabled?: boolean;
  /** Architectural environment backdrop preset (default: 'industrial') */
  theme?: VehicleHoverTheme;
  /** Direction the car cutout faces so headlights & road reflections align ('left' | 'right') */
  facing?: 'left' | 'right';
  /** Optional custom environment backdrop image URL */
  customBackdrop?: string;
  /** Show water splash & tire mist under the wheels on hover (default: true) */
  showSplash?: boolean;
  /** Show 3D kinetic orbital light rings wrapping around the car on hover (default: true) */
  showLightRings?: boolean;
  /** Show xenon + warm amber headlight flares & wet road reflection on hover (default: true) */
  showHeadlights?: boolean;
  /** Show subtle floating ember sparks on hover (default: true) */
  showEmbers?: boolean;
}

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
  /** Reusable interactive hover showcase effect settings (configured in site-data.ts) */
  hoverFx?: VehicleHoverFX;
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
