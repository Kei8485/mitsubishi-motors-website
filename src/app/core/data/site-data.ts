import type {
  DealershipConfig,
  NavMenuItem,
  PromoBannerItem,
  VehicleHoverFX,
  VehicleModel,
} from '../models/vehicle.model';

// =============================================================================
// MITSUBISHI MOTORS — CENTRAL DATA STORE
// All of these data will be shown in the main page, models catalog, and model
// detail pages. All pages and components automatically render from this file.
// =============================================================================

export const DEALERSHIP_CONFIG: DealershipConfig = {
  brandName: 'MITSUBISHI MOTORS',
  dealerName: 'MITSUBISHI CABANATUAN',
  city: 'NUEVA ECIJA',
  taglineSummary: 'Sales, financing and service in one place.',
  aboutHeading: 'BUILT FOR\nEVERY ROAD.',
  aboutStory:
    'Mitsubishi Motors Cabanatuan is the premier authorized dealership in Nueva Ecija, delivering factory-certified 2026 vehicles, flexible financing plans, and genuine after-sales care across Central Luzon.',
  address: 'Maharlika Highway, Cabanatuan City, Nueva Ecija',
  phone: '+63 (044) 463-8888',
  email: 'inquiries@mitsubishi-cabanatuan.com.ph',
  openingHours: 'MON–SAT · 8:00 AM – 6:00 PM',
  copyrightYear: 2026,
  stats: [
    { value: '[25]', label: 'YEARS' },
    { value: '[06]', label: 'MODELS' },
    { value: '[01]', label: 'EXCLUSIVE BRANCH' },
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
  { number: '05', label: 'ABOUT US', route: '/about' },
  { number: '06', label: 'CONTACT', route: '/home', fragment: 'footer-contact' },
];

/**
 * REUSABLE DEFAULT HOVER SHOWCASE FX
 * Applied automatically to all vehicle cards (Home page, Models page, etc.).
 * Any individual vehicle in `VEHICLES_DATA` can override specific properties via `hoverFx`.
 */
export const DEFAULT_VEHICLE_HOVER_FX: Required<Omit<VehicleHoverFX, 'customBackdrop'>> = {
  enabled: true,
  theme: 'industrial',
  facing: 'left',
  showSplash: true,
  showLightRings: true,
  showHeadlights: false,
  showEmbers: true,
};

/**
 * VEHICLE CATALOG
 * - Ordered in default "Most Popular First" sequence:
 *   1. XPANDER, 2. MONTERO SPORT, 3. STRADA, 4. XFORCE, 5. DESTINATOR, 6. MIRAGE G4
 * - Set `isFeatured: true` to include in the Home Page Hero Showcase carousel.
 * - Set `isBrandNewHome: true` to display in the Home Page "BRAND NEW" grid.
 * - `hoverFx` configures the interactive card hover showcase (industrial backdrop,
 *   water splash, orbital light rings, embers, and PNG scale-up).
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
    hoverFx: {
      ...DEFAULT_VEHICLE_HOVER_FX,
      facing: 'left',
    },
    cardSpecs: ['7 SEATS', 'GASOLINE', '4AT / MT'],
    isFeatured: true,
    isBrandNewHome: false,
    heroLabel: 'FEATURED · 2026',
    tagline: 'BUILT FOR THE ROAD AHEAD.\nMADE FOR EVERY FAMILY.',
    shortDescription:
      'Commanding Dynamic Shield styling meets class-leading 7-seater cabin versatility and 225mm ground clearance built for Philippine roads.',
    fullDescription:
      'The new Mitsubishi Xpander combines SUV-inspired ground clearance with a whisper-quiet, flexible 7-passenger cabin. Engineered with a fuel-efficient 1.5L MIVEC DOHC engine and reinforced RISE body construction, it turns daily commutes and long provincial drives into effortless journeys. High-grade suspension tuning absorbs rough urban asphalt while keeping every row stable and comfortable.',
    colors: [
      { name: 'Quartz White Pearl', hex: '#F3F3F1' },
      { name: 'Blade Silver Metallic', hex: '#A5A9AE' },
      { name: 'Graphite Gray Metallic', hex: '#2D2F33' },
      { name: 'Red Metallic', hex: '#C8102E' },
    ],
    overviewSpecs: {
      engine: '[1.5L MIVEC DOHC]',
      transmission: '[4AT / 5MT]',
      seating: '[7 SEATS]',
      fuel: '[GASOLINE]',
      dimensions: '[4595 × 1750 MM]',
      clearance: '[225 MM]',
    },
    variants: [
      { name: '[XPANDER GLX 1.5G 2WD MT]', price: '[PHP 1,068,000]' },
      { name: '[XPANDER GLS 1.5G 2WD AT]', price: '[PHP 1,216,000]' },
      { name: '[XPANDER CROSS 1.5G 2WD AT]', price: '[PHP 1,348,000]' },
    ],
    features: [
      {
        title: 'SAFETY',
        description:
          'Reinforced Impact Safety Evolution (RISE) body, Active Stability Control, Hill Start Assist, and reverse camera with dynamic guidelines.',
        bgImage: '../../../assets/images/features/safety-bg.jpg',
      },
      {
        title: 'COMFORT',
        description:
          'Horizontal-axis dashboard with soft-touch knee pads, digital dual-zone climate control, and fold-flat 7-seater configurations.',
        bgImage: '../../../assets/images/features/comfort-bg.jpg',
      },
      {
        title: 'CONNECTIVITY',
        description:
          '9-inch capacitive Smartphone-Link Display Audio with wireless Apple CarPlay, Android Auto, and hands-free steering controls.',
        bgImage: '../../../assets/images/features/connectivity-bg.jpg',
      },
      {
        title: 'PERFORMANCE',
        description:
          '1.5L MIVEC DOHC 16-valve engine delivering responsive low-rpm torque, paired with high-performance rear shock absorbers borrowed from the Montero Sport and a class-leading 225mm ground clearance for flood-prone roads.',
        fullWidth: true,
        bgImage: '../../../assets/images/features/performance-bg.jpg',
      },
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
    hoverFx: {
      ...DEFAULT_VEHICLE_HOVER_FX,
      facing: 'right',
    },
    cardSpecs: ['7 SEATS', 'DIESEL', '8AT'],
    isFeatured: true,
    isBrandNewHome: true,
    tagline: 'ELEVATE YOUR JOURNEY.\nMASTER EVERY TERRAIN.',
    shortDescription:
      'Flagship 7-seater midsize diesel SUV with 8-speed automatic transmission and Forward Collision Mitigation.',
    fullDescription:
      'A benchmark in prestige and capability, the Montero Sport combines a 2.4L MIVEC turbocharged clean-diesel engine with an 8-speed automatic gearbox and luxurious leather-appointed seating. Equipped with Super Select 4WD-II and an array of active driver-assist radars, it transitions seamlessly from Cabanatuan highways to rugged provincial mountain passes.',
    colors: [
      { name: 'Sterling Silver Metallic', hex: '#B4B8BC' },
      { name: 'White Diamond', hex: '#F4F4F2' },
      { name: 'Graphite Gray Metallic', hex: '#303338' },
      { name: 'Jet Black Mica', hex: '#141518' },
    ],
    overviewSpecs: {
      engine: '[2.4L MIVEC TURBO]',
      transmission: '[8-SPEED AT]',
      seating: '[7 SEATS]',
      fuel: '[DIESEL]',
      dimensions: '[4825 × 1815 MM]',
      clearance: '[218 MM]',
    },
    variants: [
      { name: '[MONTERO SPORT GLX 2.4D 2WD MT]', price: '[PHP 1,568,000]' },
      { name: '[MONTERO SPORT GLS 2.4D 2WD AT]', price: '[PHP 1,899,000]' },
      { name: '[MONTERO SPORT BLACK SERIES 4WD AT]', price: '[PHP 2,502,000]' },
    ],
    features: [
      {
        title: 'SAFETY',
        description:
          'Forward Collision Mitigation (FCM), Blind Spot Warning with Lane Change Assist, Ultrasonic Misacceleration Mitigation, and 7 SRS airbags.',
        bgImage: 'assets/images/features/safety-bg.jpg',
      },
      {
        title: 'COMFORT',
        description:
          'Quilted leather power-adjustable seats, dual-zone automatic climate control with Nanoe™ air purification, and hands-free power tailgate.',
        bgImage: 'assets/images/features/comfort-bg.jpg',
      },
      {
        title: 'CONNECTIVITY',
        description:
          '8-inch full-color LCD digital meter cluster paired with Smartphone-Link Display Audio, Mitsubishi Remote Control app, and multi-around monitor.',
        bgImage: 'assets/images/features/connectivity-bg.jpg',
      },
      {
        title: 'PERFORMANCE',
        description:
          '2.4L 4N15 MIVEC Variable Geometry Turbocharged diesel producing 181 PS and 430 Nm of torque, channeled through a silky 8-speed automatic transmission and Super Select 4WD-II with four off-road terrain modes.',
        fullWidth: true,
        bgImage: 'assets/images/features/performance-bg.jpg',
      },
    ],
  },
  {
    id: 'strada',
    name: 'STRADA',
    category: 'PICKUP',
    year: '2026',
    startingPrice: '[PHP 1,157,000]',
    numericPrice: 1157000,
    image: 'assets/images/cars/strada.png',
    hoverFx: {
      ...DEFAULT_VEHICLE_HOVER_FX,
      facing: 'left',
    },
    cardSpecs: ['5 SEATS', 'DIESEL', '6AT / 6MT'],
    isFeatured: false,
    isBrandNewHome: false,
    heroLabel: 'FEATURED · 2026',
    tagline: 'ENGINEERED BEYOND TOUGH.\nREADY FOR ANY TERRAIN.',
    shortDescription:
      '2.4L Bi-Turbo MIVEC clean diesel pickup with Super Select 4WD-II and a reinforced ladder frame built for heavy payloads.',
    fullDescription:
      'Built to dominate work sites and mountain trails alike, the Strada delivers relentless low-end torque, seven terrain modes, and SUV-grade interior ergonomics. Its newly developed high-tensile ladder frame increases torsional rigidity by 60% while reducing cabin noise and vibration on long highway hauls.',
    colors: [
      { name: 'Impulse Red Metallic', hex: '#C8102E' },
      { name: 'Yamabuki Orange Metallic', hex: '#D96B27' },
      { name: 'Blade Silver Metallic', hex: '#A5A9AE' },
      { name: 'Graphite Gray Metallic', hex: '#2D2F33' },
    ],
    overviewSpecs: {
      engine: '[2.4L BI-TURBO]',
      transmission: '[6AT / 6MT]',
      seating: '[5 SEATS]',
      fuel: '[DIESEL]',
      dimensions: '[5320 × 1865 MM]',
      clearance: '[222 MM]',
    },
    variants: [
      { name: '[STRADA GLX 2.4D 2WD MT]', price: '[PHP 1,157,000]' },
      { name: '[STRADA GLS 2.4D 2WD AT]', price: '[PHP 1,582,000]' },
      { name: '[STRADA ATHLETE 2.4D BI-TURBO 4WD AT]', price: '[PHP 1,920,000]' },
    ],
    features: [
      {
        title: 'SAFETY',
        description:
          'Active Yaw Control (AYC), Hill Descent Control, Trailer Stability Assist, Rear Cross Traffic Alert, and 360-degree bird’s-eye view camera.',
        bgImage: 'assets/images/features/safety-bg.jpg',
      },
      {
        title: 'COMFORT',
        description:
          'SUV-like J-line cabin geometry with generous rear legroom, insulated acoustic glass, and ceiling-mounted rear air circulator.',
        bgImage: 'assets/images/features/comfort-bg.jpg',
      },
      {
        title: 'CONNECTIVITY',
        description:
          '9-inch floating touchscreen display with wireless smartphone mirroring, wireless charging pad, and dual USB-A/USB-C fast charge ports.',
        bgImage: 'assets/images/features/connectivity-bg.jpg',
      },
      {
        title: 'PERFORMANCE',
        description:
          'Two-stage Bi-Turbo 2.4L 4N16 clean diesel engine generating 204 PS and 470 Nm of flat-curve torque from 1,500 rpm, paired with Super Select 4WD-II and 7 selectable drive modes across Normal, Eco, Gravel, Snow, Mud, Sand, and Rock.',
        fullWidth: true,
        bgImage: 'assets/images/features/performance-bg.jpg',
      },
    ],
  },
  {
    id: 'xforce',
    name: 'XFORCE',
    category: 'CROSSOVER',
    year: '2026',
    startingPrice: '[PHP 1,367,000]',
    numericPrice: 1367000,
    image: 'assets/images/cars/xforce.png',
    hoverFx: {
      ...DEFAULT_VEHICLE_HOVER_FX,
      facing: 'left',
    },
    cardSpecs: ['5 SEATS', 'GASOLINE', 'CVT'],
    isFeatured: true,
    isBrandNewHome: true,
    heroLabel: 'FEATURED · 2026',
    tagline: 'SILKY AND SOLID.\nENGINEERED FOR EXCITEMENT.',
    shortDescription:
      'Compact 5-seater urban crossover featuring 4 ASEAN-tuned drive modes including Wet Mode and Dynamic Sound Yamaha Premium audio.',
    fullDescription:
      'Designed under the Silky & Solid concept, the all-new Xforce pairs futuristic T-shaped LED lighting with Active Yaw Control and four selectable drive modes (Normal, Wet, Gravel, Mud) to conquer sudden tropical downpours with total confidence. Inside, a monolithic 12.3-inch infotainment display and 8-speaker Dynamic Sound Yamaha Premium audio turn every drive into a private concert hall.',
    colors: [
      { name: 'Graphite Gray Metallic', hex: '#383B40' },
      { name: 'Energetic Yellow Metallic', hex: '#D8A928' },
      { name: 'Quartz White Pearl', hex: '#F3F3F1' },
      { name: 'Red Metallic', hex: '#C8102E' },
    ],
    overviewSpecs: {
      engine: '[1.5L MIVEC DOHC]',
      transmission: '[HIGH-EFFICIENCY CVT]',
      seating: '[5 SEATS]',
      fuel: '[GASOLINE]',
      dimensions: '[4390 × 1810 MM]',
      clearance: '[222 MM]',
    },
    variants: [
      { name: '[XFORCE GLS 1.5G 2WD CVT]', price: '[PHP 1,367,000]' },
      { name: '[XFORCE GLS TWO-TONE 1.5G 2WD CVT]', price: '[PHP 1,382,000]' },
      { name: '[XFORCE GT 1.5G 2WD CVT]', price: '[PHP 1,581,000]' },
    ],
    features: [
      {
        title: 'SAFETY',
        description:
          'Mitsubishi Motors Safety Sensing (MMSS) with Adaptive Cruise Control, Lead Car Departure Notification, Blind Spot Warning, and 6 SRS airbags.',
        bgImage: 'assets/images/features/safety-bg.jpg',
      },
      {
        title: 'COMFORT',
        description:
          'Melange fabric stain-resistant dashboard trim, 8-step reclining 40:20:40 rear seats, and console beverage cooler box.',
        bgImage: 'assets/images/features/comfort-bg.jpg',
      },
      {
        title: 'CONNECTIVITY',
        description:
          '12.3-inch monolith Smartphone-Link Display Audio with multi-widget avionics gauges and 8-speaker Dynamic Sound Yamaha Premium system.',
        bgImage: 'assets/images/features/connectivity-bg.jpg',
      },
      {
        title: 'PERFORMANCE',
        description:
          'First-in-Mitsubishi Wet Mode engineered specifically for Southeast Asian monsoons, working alongside Active Yaw Control (AYC), high-efficiency CVT, and class-best 222mm ground clearance on 18-inch alloy wheels.',
        fullWidth: true,
        bgImage: 'assets/images/features/performance-bg.jpg',
      },
    ],
  },
  {
    id: 'destinator',
    name: 'DESTINATOR',
    category: 'SUV',
    year: '2026',
    startingPrice: '[PHP 1,680,000]',
    numericPrice: 1680000,
    image: 'assets/images/cars/destinator.png',
    hoverFx: {
      ...DEFAULT_VEHICLE_HOVER_FX,
      facing: 'left',
    },
    cardSpecs: ['7 SEATS', 'GASOLINE', 'CVT / AT'],
    isFeatured: false,
    isBrandNewHome: true,
    heroLabel: 'FEATURED · 2026',
    tagline: 'COMMAND EVERY HORIZON.\nSPACE WITHOUT COMPROMISE.',
    shortDescription:
      'Next-generation three-row family SUV derived from the DST Concept with panoramic cabin comfort and all-road stability.',
    fullDescription:
      'The Mitsubishi Destinator brings bold gravitas and three rows of first-class seating to the modern SUV segment. Derived directly from the acclaimed DST Concept, its high-rigidity monocoque platform and sculpted aerodynamic fenders bridge urban refinement and weekend family adventure with effortless poise.',
    colors: [
      { name: 'Titanium Gray Metallic', hex: '#464A50' },
      { name: 'White Diamond', hex: '#F3F3F1' },
      { name: 'Blade Silver Metallic', hex: '#A5A9AE' },
      { name: 'Red Diamond', hex: '#C8102E' },
    ],
    overviewSpecs: {
      engine: '[1.5L MIVEC TURBO]',
      transmission: '[CVT / 8AT]',
      seating: '[7 SEATS]',
      fuel: '[GASOLINE]',
      dimensions: '[4680 × 1840 MM]',
      clearance: '[220 MM]',
    },
    variants: [
      { name: '[DESTINATOR GLS 1.5T 2WD CVT]', price: '[PHP 1,680,000]' },
      { name: '[DESTINATOR GT 1.5T 2WD CVT]', price: '[PHP 1,845,000]' },
      { name: '[DESTINATOR SIGNATURE 1.5T AWD]', price: '[PHP 2,050,000]' },
    ],
    features: [
      {
        title: 'SAFETY',
        description:
          '360-degree Multi-Around Monitor with Moving Object Detection, Lane Keep Assist, Forward Collision Mitigation, and full-length curtain airbags.',
        bgImage: 'assets/images/features/safety-bg.jpg',
      },
      {
        title: 'COMFORT',
        description:
          'Panoramic glass sunroof with ambient LED lighting, captain-style second-row lounge seating, and three-zone independent climate control.',
        bgImage: 'assets/images/features/comfort-bg.jpg',
      },
      {
        title: 'CONNECTIVITY',
        description:
          'Dual 12.3-inch integrated cockpit displays with wireless Apple CarPlay, Android Auto, and connected telematics suite.',
        bgImage: 'assets/images/features/connectivity-bg.jpg',
      },
      {
        title: 'PERFORMANCE',
        description:
          'Responsive 1.5L turbocharged MIVEC powerplant paired with All-Wheel Control (AWC) torque vectoring and five terrain modes (Normal, Tarmac, Gravel, Mud, Wet) for confident all-weather family touring.',
        fullWidth: true,
        bgImage: 'assets/images/features/performance-bg.jpg',
      },
    ],
  },
  {
    id: 'mirage-g4',
    name: 'MIRAGE G4',
    category: 'SEDAN',
    year: '2026',
    startingPrice: '[PHP 769,000]',
    numericPrice: 769000,
    image: 'assets/images/cars/xforce.png',
    hoverFx: {
      ...DEFAULT_VEHICLE_HOVER_FX,
      facing: 'left',
    },
    cardSpecs: ['5 SEATS', 'GASOLINE', 'CVT / MT'],
    isFeatured: false,
    isBrandNewHome: false,
    tagline: 'SMART, PRACTICAL, EFFORTLESS.\nBUILT FOR THE EVERYDAY.',
    shortDescription: 'Practical subcompact sedan delivering up to 21 km/L fuel economy and a spacious 450L trunk.',
    fullDescription:
      'With its tight 4.8-meter turning radius, sharp Dynamic Shield front fascia, and exceptional fuel economy, the Mirage G4 is the smart daily driver for Cabanatuan and Central Luzon streets. Its surprisingly roomy 5-passenger cabin and deep 450-liter luggage trunk handle weekday commutes and weekend errands without breaking your budget.',
    colors: [
      { name: 'Red Metallic', hex: '#C8102E' },
      { name: 'Titanium Gray Metallic', hex: '#4A4D52' },
      { name: 'Cool Silver Metallic', hex: '#B4B8BC' },
      { name: 'White Solid', hex: '#F2F2F0' },
    ],
    overviewSpecs: {
      engine: '[1.2L 3A92 MIVEC]',
      transmission: '[INVECS-III CVT / 5MT]',
      seating: '[5 SEATS]',
      fuel: '[GASOLINE]',
      dimensions: '[4305 × 1670 MM]',
      clearance: '[170 MM]',
    },
    variants: [
      { name: '[MIRAGE G4 GLX 1.2G MT]', price: '[PHP 769,000]' },
      { name: '[MIRAGE G4 GLX 1.2G CVT]', price: '[PHP 819,000]' },
      { name: '[MIRAGE G4 GLS 1.2G CVT]', price: '[PHP 899,000]' },
    ],
    features: [
      {
        title: 'SAFETY',
        description:
          'RISE high-rigidity safety body, Active Stability Control, Hill Start Assist, ABS with Electronic Brakeforce Distribution, and dual SRS airbags.',
        bgImage: 'assets/images/features/safety-bg.jpg',
      },
      {
        title: 'COMFORT',
        description:
          'Keyless Operation System with push-button start, automatic climate control, and best-in-class rear legroom with a 450L trunk.',
        bgImage: 'assets/images/features/comfort-bg.jpg',
      },
      {
        title: 'CONNECTIVITY',
        description:
          '7-inch Smartphone-Link Display Audio with Apple CarPlay, Android Auto, Bluetooth hands-free calling, and steering audio switches.',
        bgImage: 'assets/images/features/connectivity-bg.jpg',
      },
      {
        title: 'PERFORMANCE',
        description:
          '1.2-liter 3-cylinder DOHC MIVEC engine engineered with wide-ratio INVECS-III CVT to achieve up to 21 km/L fuel efficiency alongside a class-leading 4.8-meter minimum turning radius.',
        fullWidth: true,
        bgImage: 'assets/images/features/performance-bg.jpg',
      },
    ],
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
