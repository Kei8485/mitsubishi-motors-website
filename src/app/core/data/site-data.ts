import type { DealershipConfig, NavMenuItem, PromoBannerItem, VehicleModel } from '../models/vehicle.model';

// =============================================================================
// MITSUBISHI MOTORS — CENTRAL DATA STORE
// All of these data will be shown in the main page
// For Adding or edititing datas
// All pages and components automatically render from this configuration.
// =============================================================================

export const DEALERSHIP_CONFIG: DealershipConfig = {
  brandName: 'MITSUBISHI MOTORS',
  dealerName: 'CITIMOTORS MAKATI',
  city: 'METRO MANILA',
  taglineSummary: 'Sales, financing and service in one place.',
  aboutHeading: 'BUILT FOR\nEVERY ROAD.',
  aboutStory:
    'Mitsubishi Motors is a Japanese automaker known for tough, dependable SUVs, MPVs and pickups. For over three decades, our dealership has delivered factory-certified vehicles, transparent financing, and master-technician after-sales care across the Philippines.',
  address: '2285 Chino Roces Ave, Makati, Metro Manila',
  phone: '+63 (02) 8817-0000',
  email: 'inquiries@mitsubishi-makati.com.ph',
  openingHours: 'MON–SAT · 8:00 AM – 6:00 PM',
  copyrightYear: 2026,
  stats: [
    { value: '[35]', label: 'YEARS' },
    { value: '[06]', label: 'MODELS' },
    { value: '[12]', label: 'BRANCHES' },
  ],
  socials: [
    { label: 'Facebook', url: 'https://www.facebook.com/MitsubishiMotorsPH' },
    { label: 'Instagram', url: 'https://www.instagram.com/mitsubishimotorsph' },
    { label: 'YouTube', url: 'https://www.youtube.com/@MitsubishiMotorsPhilippines' },
  ],
};

export const NAV_MENU_ITEMS: NavMenuItem[] = [
  { number: '01', label: 'HOME', route: '/home' },
  { number: '02', label: 'MODELS', route: '/models' },
  { number: '03', label: 'FINANCING', route: '/financing' },
  { number: '04', label: 'AFTER-SALES', route: '/service' },
  { number: '05', label: 'ABOUT US', route: '/home', fragment: 'about-section' },
  { number: '06', label: 'CONTACT', route: '/home', fragment: 'footer-contact' },
];

/**
 * VEHICLE CATALOG
 * - Ordered in default "Most Popular First" sequence:
 *   1. XPANDER, 2. MONTERO SPORT, 3. STRADA, 4. XFORCE, 5. DESTINATOR, 6. MIRAGE G4
 * - Set `isFeatured: true` to include in the Home Page Hero Showcase carousel.
 * - Set `isBrandNewHome: true` to display in the Home Page "BRAND NEW" grid.
 * - To change how a vehicle appears inside a card stage:
 *   • Put a 2D image path in `image: 'assets/images/cars/<model>.png'`
 *   • Or put a 3D model path in `model3d: 'assets/models/<model>.glb'` and `stageMode: '3d'`
 */
export const VEHICLES_DATA: VehicleModel[] = [
  {
    id: 'xpander',
    name: 'XPANDER',
    category: 'MPV',
    year: '2026',
    startingPrice: '[PHP 1,068,000]',
    numericPrice: 1068000,
    image: 'assets/images/cars/xpander.png',
    cardSpecs: ['7 SEATS', 'GASOLINE', '4AT / MT'],
    isFeatured: true,
    isBrandNewHome: false,
    heroLabel: 'FEATURED · 2026',
    tagline: 'BUILT FOR THE ROAD AHEAD.\nMADE FOR EVERY FAMILY.',
    shortDescription:
      'Commanding Dynamic Shield styling meets class-leading 7-seater cabin versatility and 225mm ground clearance built for Philippine roads.',
    fullDescription:
      'The new Mitsubishi Xpander combines SUV-inspired ground clearance with a whisper-quiet, flexible 7-passenger cabin. Engineered with a fuel-efficient 1.5L MIVEC DOHC engine and reinforced RISE body construction, it turns daily commutes and long provincial drives into effortless journeys.',
    colors: [
      { name: 'Quartz White Pearl', hex: '#F3F3F1' },
      { name: 'Blade Silver Metallic', hex: '#A5A9AE' },
      { name: 'Graphite Gray Metallic', hex: '#2D2F33' },
      { name: 'Red Metallic', hex: '#C8102E' },
    ],
  },
  {
    id: 'montero-sport',
    name: 'MONTERO SPORT',
    category: 'SUV',
    year: '2026',
    startingPrice: '[PHP 1,568,000]',
    numericPrice: 1568000,
    image: 'assets/images/cars/montero-sport.png',
    cardSpecs: ['7 SEATS', 'DIESEL', '8AT'],
    isFeatured: true,
    isBrandNewHome: true,
    tagline: 'ELEVATE YOUR JOURNEY.',
    shortDescription:
      'Flagship 7-seater midsize diesel SUV with 8-speed automatic transmission and Forward Collision Mitigation.',
    fullDescription:
      'A benchmark in prestige and capability, the Montero Sport combines a 2.4L MIVEC turbocharged diesel engine with an 8-speed automatic gearbox and luxurious leather-appointed seating.',
  },
  {
    id: 'strada',
    name: 'STRADA',
    category: 'PICKUP',
    year: '2026',
    startingPrice: '[PHP 1,157,000]',
    numericPrice: 1157000,
    image: 'assets/images/cars/strada.png',
    cardSpecs: ['5 SEATS', 'DIESEL', '6AT / 6MT'],
    isFeatured: false,
    isBrandNewHome: false,
    heroLabel: 'FEATURED · 2026',
    tagline: 'ENGINEERED BEYOND TOUGH.\nREADY FOR ANY TERRAIN.',
    shortDescription:
      '2.4L Bi-Turbo MIVEC clean diesel pickup with Super Select 4WD-II and a reinforced ladder frame built for heavy payloads.',
    fullDescription:
      'Built to dominate work sites and mountain trails alike, the Strada delivers relentless low-end torque, seven terrain modes, and SUV-grade interior ergonomics.',
  },
  {
    id: 'xforce',
    name: 'XFORCE',
    category: 'CROSSOVER',
    year: '2026',
    startingPrice: '[PHP 1,367,000]',
    numericPrice: 1367000,
    image: 'assets/images/cars/xforce.png',
    cardSpecs: ['5 SEATS', 'GASOLINE', 'CVT'],
    isFeatured: true,
    isBrandNewHome: true,
    heroLabel: 'FEATURED · 2026',
    tagline: 'SILKY AND SOLID.\nENGINEERED FOR EXCITEMENT.',
    shortDescription:
      'Compact 5-seater urban crossover featuring 4 ASEAN-tuned drive modes including Wet Mode and Dynamic Sound Yamaha Premium audio.',
    fullDescription:
      'Designed under the Silky & Solid concept, the all-new Xforce pairs futuristic T-shaped LED lighting with Active Yaw Control and four selectable drive modes (Normal, Wet, Gravel, Mud) to conquer sudden tropical downpours with total confidence.',
  },
  {
    id: 'destinator',
    name: 'DESTINATOR',
    category: 'SUV',
    year: '2026',
    startingPrice: '[PHP 1,680,000]',
    numericPrice: 1680000,
    image: 'assets/images/cars/destinator.png',
    cardSpecs: ['7 SEATS', 'GASOLINE', 'CVT / AT'],
    isFeatured: false,
    isBrandNewHome: true,
    heroLabel: 'FEATURED · 2026',
    tagline: 'COMMAND EVERY HORIZON.\nSPACE WITHOUT COMPROMISE.',
    shortDescription:
      'Next-generation three-row family SUV derived from the DST Concept with panoramic cabin comfort and all-road stability.',
    fullDescription:
      'The Mitsubishi Destinator brings bold gravitas and three rows of first-class seating to the modern SUV segment. With a high-rigidity monocoque platform and sculpted aerodynamic fenders, it bridges urban refinement and weekend adventure.',
  },
  {
    id: 'mirage-g4',
    name: 'MIRAGE G4',
    category: 'SEDAN',
    year: '2026',
    startingPrice: '[PHP 769,000]',
    numericPrice: 769000,
    image: 'assets/images/cars/xforce.png',
    cardSpecs: ['5 SEATS', 'GASOLINE', 'CVT / MT'],
    isFeatured: false,
    isBrandNewHome: false,
    tagline: 'SMART, PRACTICAL, EFFORTLESS.',
    shortDescription: 'Practical subcompact sedan delivering up to 21 km/L fuel economy and a spacious 450L trunk.',
    fullDescription:
      'With its tight 4.8-meter turning radius, Dynamic Shield front fascia, and exceptional fuel economy, the Mirage G4 is the smart daily driver for city streets.',
  },
];

export const HOME_PROMO_BANNERS: PromoBannerItem[] = [
  {
    id: 'financing',
    tag: '[ PLAN ]',
    title: 'FINANCING',
    ctaText: 'VIEW →',
    route: '/financing',
    bgImage: '../../../assets/images/promos/financing-bg.jpg',
  },
  {
    id: 'after-sales',
    tag: '[ SERVICE ]',
    title: 'AFTER-SALES',
    ctaText: 'VIEW →',
    route: '/service',
    bgImage: '../../../assets/images/promos/aftersales-bg.jpg',
  },
];
