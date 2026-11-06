import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonBadge,
  IonContent,
  IonGrid,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  arrowForwardOutline,
  calendarOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  chevronDownOutline,
  closeOutline,
  constructOutline,
  documentTextOutline,
  locationOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

import { DEALERSHIP_CONFIG, VEHICLES_DATA } from '../core/data/site-data';
import type { VehicleModel } from '../core/models/vehicle.model';
import { AmbientBgComponent } from '../shared/components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HalftoneBandBgComponent } from '../shared/components/halftone-band-bg/halftone-band-bg.component';
import { HeaderComponent } from '../shared/components/header/header.component';

export interface ServiceOfferingCard {
  id: string;
  title: string;
  shortDescription: string;
  tag: string;
  turnaround: string;
  coverageNote: string;
  fullDescription: string;
  highlights: string[];
  bgImage: string;
}

export interface ServiceBookingReceipt {
  referenceCode: string;
  timestamp: string;
  clientName: string;
  clientPhone: string;
  vehicleName: string;
  vehicleCategory: string;
  vehicleImage: string;
  serviceType: string;
  appointmentDateFormatted: string;
  branchName: string;
  branchAddress: string;
  branchPhone: string;
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonGrid,
    IonBadge,
    IonIcon,
    HeaderComponent,
    HalftoneBandBgComponent,
    AmbientBgComponent,
    FooterComponent,
  ],
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage {
  readonly dealership = DEALERSHIP_CONFIG;
  readonly allVehicles: VehicleModel[] = VEHICLES_DATA;

  /**
   * 4 After-Sales Service Cards matching the wireframe:
   * PREVENTIVE MAINTENANCE | GENUINE PARTS | WARRANTY | ROADSIDE ASSISTANCE
   */
  readonly serviceOfferings: ServiceOfferingCard[] = [
    {
      id: 'preventive-maintenance',
      title: 'PREVENTIVE MAINTENANCE',
      shortDescription:
        'Scheduled 1,000 km to 40,000 km PMS checkups, synthetic oil service, and MUT-III diagnostics.',
      tag: '[ PMS // FACTORY SCHEDULE ]',
      turnaround: 'EST. 60–90 MINS EXPRESS BAY',
      coverageNote: '2026 MY FACTORY SERVICE PROTOCOL',
      fullDescription:
        'Keep your 2026 Mitsubishi performing at factory peak with Periodic Maintenance Service (PMS) executed by Mitsubishi-certified master technicians at our Cabanatuan service bays.',
      highlights: [
        'Complete 1,000 km, 5,000 km, and 10,000 km interval inspections',
        'Genuine Mitsubishi Fully Synthetic Motor Oil & Diamond oil filter replacement',
        'MUT-III SE computerized engine, transmission, and ADAS calibration',
        'Brake pad thickness, battery health, and wheel alignment check',
      ],
      bgImage: 'assets/images/promos/aftersales-bg.jpg',
    },
    {
      id: 'genuine-parts',
      title: 'GENUINE PARTS',
      shortDescription:
        '100% factory-engineered OEM Mitsubishi components built for exact fit and durability.',
      tag: '[ OEM // DIAMOND CERTIFIED ]',
      turnaround: 'DIRECT CABANATUAN PARTS DEPOT',
      coverageNote: '1-YEAR / 20,000 KM PARTS WARRANTY',
      fullDescription:
        'Every replacement component installed at Mitsubishi Motors Cabanatuan is sourced directly from Mitsubishi Motors Philippines Corporation to preserve your vehicle safety and resale value.',
      highlights: [
        'Factory-serialized OEM filters, brake pads, belts, and suspension parts',
        'Official Ralliart & Mitsubishi genuine accessories installation',
        'Zero-compromise compatibility with 2026 MIVEC & Super Select 4WD-II systems',
        'Protected by official MMPC parts warranty against manufacturing defects',
      ],
      bgImage: 'assets/images/features/performance-bg.jpg',
    },
    {
      id: 'warranty',
      title: 'WARRANTY',
      shortDescription:
        'Comprehensive 3-Year / 100,000 km factory coverage with hassle-free Cabanatuan claims.',
      tag: '[ PROTECTION // 100,000 KM ]',
      turnaround: 'DIRECT MMPC CLAIM PROCESSING',
      coverageNote: '3 YEARS OR 100,000 KM (WHICHEVER COMES FIRST)',
      fullDescription:
        'Every brand-new 2026 Mitsubishi purchased or serviced at Mitsubishi Motors Cabanatuan is backed by comprehensive manufacturer warranty protection and paperless service history tracking.',
      highlights: [
        '3-Year or 100,000 km bumper-to-bumper factory powertrain & electrical coverage',
        'Dedicated Cabanatuan warranty officer for fast, transparent claim approval',
        'Complimentary factory recall & software ECU bulletin updates',
        'Full digital service booklet validation to protect your warranty status',
      ],
      bgImage: 'assets/images/features/safety-bg.jpg',
    },
    {
      id: 'roadside-assistance',
      title: 'ROADSIDE ASSISTANCE',
      shortDescription:
        '24/7 emergency towing, battery jump-start, and flat-tire dispatch across Nueva Ecija.',
      tag: '[ 24/7 // EMERGENCY DISPATCH ]',
      turnaround: 'RAPID NUEVA ECIJA & CLLEX RESPONSE',
      coverageNote: 'HOTLINE: +63 (044) 463-8888',
      fullDescription:
        'Drive across Cabanatuan City, Central Luzon, and beyond with total peace of mind. Our emergency response team provides round-the-clock roadside recovery straight to our Maharlika Highway facility.',
      highlights: [
        '24/7 flatbed towing directly to Mitsubishi Motors Cabanatuan Service Center',
        'On-site battery jump-start, flat tire replacement, and emergency fuel delivery',
        'Lockout recovery and emergency mechanical first-aid on major highways',
        'Priority service bay intake for towed-in 2026 Mitsubishi vehicles',
      ],
      bgImage: 'assets/images/features/connectivity-bg.jpg',
    },
  ];

  // ---------------------------------------------------------------------------
  // Interactive State: Selected Service Offering Detail Modal
  // ---------------------------------------------------------------------------
  readonly activeOfferingModal = signal<ServiceOfferingCard | null>(null);
  readonly selectedServiceType = signal<string>('PREVENTIVE MAINTENANCE');

  // ---------------------------------------------------------------------------
  // Interactive State: [ BOOK A SERVICE ] Form Fields & Validation
  // ---------------------------------------------------------------------------
  readonly clientName = signal<string>('');
  readonly clientPhone = signal<string>('');
  readonly selectedVehicle = signal<VehicleModel>(VEHICLES_DATA[0]);
  readonly appointmentDate = signal<string>(this.getDefaultTomorrowDate());

  readonly isModelDropdownOpen = signal<boolean>(false);

  readonly nameTouched = signal<boolean>(false);
  readonly phoneTouched = signal<boolean>(false);
  readonly dateTouched = signal<boolean>(false);
  readonly formSubmitted = signal<boolean>(false);

  /** Real-time validation error for client name */
  readonly nameError = computed<string | null>(() => {
    const val = this.clientName().trim();
    if (!val) {
      return 'FULL NAME IS REQUIRED';
    }
    if (val.length < 3) {
      return 'ENTER AT LEAST 3 CHARACTERS';
    }
    if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(val)) {
      return 'USE VALID LETTERS ONLY';
    }
    return null;
  });

  /** Real-time validation error for PH mobile number */
  readonly phoneError = computed<string | null>(() => {
    const raw = this.clientPhone().trim();
    if (!raw) {
      return 'PHONE NUMBER IS REQUIRED';
    }
    const digitsOnly = raw.replace(/[\s()-]/g, '');
    const isValidPH = /^(\+639\d{9}|639\d{9}|09\d{9})$/.test(digitsOnly);
    const isValidLandline = /^\d{7,11}$/.test(digitsOnly);
    if (!isValidPH && !isValidLandline) {
      return 'USE FORMAT: 0917 123 4567';
    }
    return null;
  });

  /** Real-time validation error for appointment date */
  readonly dateError = computed<string | null>(() => {
    const raw = this.appointmentDate().trim();
    if (!raw) {
      return 'PICK A SERVICE DATE';
    }
    const picked = new Date(`${raw}T00:00:00`);
    if (Number.isNaN(picked.getTime())) {
      return 'INVALID DATE SELECTED';
    }
    return null;
  });

  readonly isFormValid = computed<boolean>(() => {
    return !this.nameError() && !this.phoneError() && !this.dateError();
  });

  readonly minServiceDate = this.getDefaultTomorrowDate();

  // ---------------------------------------------------------------------------
  // Confirmed Appointment Receipt Modal State
  // ---------------------------------------------------------------------------
  readonly bookingReceipt = signal<ServiceBookingReceipt | null>(null);

  constructor() {
    addIcons({
      chevronDownOutline,
      checkmarkOutline,
      closeOutline,
      checkmarkCircleOutline,
      documentTextOutline,
      shieldCheckmarkOutline,
      lockClosedOutline,
      alertCircleOutline,
      arrowForwardOutline,
      calendarOutline,
      constructOutline,
      locationOutline,
    });
  }

  /** Smooth-scroll to the [ BOOK A SERVICE ] section when clicking BOOK ONLINE */
  scrollToBooking(): void {
    const el = document.getElementById('service-booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /** Open the detailed modal for one of the 4 service cards */
  openOfferingDetail(card: ServiceOfferingCard): void {
    this.activeOfferingModal.set(card);
  }

  closeOfferingDetail(): void {
    this.activeOfferingModal.set(null);
  }

  /** Pre-select this service category and scroll down to the booking form */
  selectServiceAndBook(card: ServiceOfferingCard): void {
    this.selectedServiceType.set(card.title);
    this.activeOfferingModal.set(null);
    setTimeout(() => {
      this.scrollToBooking();
    }, 80);
  }

  /** Set service category pill directly in the booking section */
  setServiceCategory(title: string): void {
    this.selectedServiceType.set(title);
  }

  /** Toggle the 2026 Model selector dropdown inside the booking grid */
  toggleModelDropdown(event: Event): void {
    event.stopPropagation();
    this.isModelDropdownOpen.update((v) => !v);
  }

  selectVehicleModel(vehicle: VehicleModel, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedVehicle.set(vehicle);
    this.isModelDropdownOpen.set(false);
  }

  onFieldBlur(field: 'name' | 'phone' | 'date'): void {
    if (field === 'name') this.nameTouched.set(true);
    if (field === 'phone') this.phoneTouched.set(true);
    if (field === 'date') this.dateTouched.set(true);
  }

  /** Validate and generate an instant Cabanatuan Service Appointment Receipt */
  submitServiceBooking(): void {
    this.formSubmitted.set(true);
    this.nameTouched.set(true);
    this.phoneTouched.set(true);
    this.dateTouched.set(true);

    if (!this.isFormValid()) {
      return;
    }

    const vehicle = this.selectedVehicle();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const pickedDate = new Date(`${this.appointmentDate()}T09:00:00`);
    const formattedDate = Number.isNaN(pickedDate.getTime())
      ? this.appointmentDate()
      : pickedDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        });

    this.bookingReceipt.set({
      referenceCode: `MMC-SVC-${randomNum}`,
      timestamp,
      clientName: this.clientName().trim(),
      clientPhone: this.clientPhone().trim(),
      vehicleName: `2026 MITSUBISHI ${vehicle.name}`,
      vehicleCategory: vehicle.category,
      vehicleImage: vehicle.image,
      serviceType: this.selectedServiceType(),
      appointmentDateFormatted: formattedDate.toUpperCase(),
      branchName: 'MITSUBISHI MOTORS CABANATUAN',
      branchAddress: this.dealership.address,
      branchPhone: this.dealership.phone,
    });
  }

  closeReceiptModal(): void {
    this.bookingReceipt.set(null);
  }

  resetAndBookAnother(): void {
    this.bookingReceipt.set(null);
    this.clientName.set('');
    this.clientPhone.set('');
    this.nameTouched.set(false);
    this.phoneTouched.set(false);
    this.dateTouched.set(false);
    this.formSubmitted.set(false);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isModelDropdownOpen()) {
      this.isModelDropdownOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isModelDropdownOpen()) {
      this.isModelDropdownOpen.set(false);
    }
    if (this.activeOfferingModal()) {
      this.closeOfferingDetail();
    }
    if (this.bookingReceipt()) {
      this.closeReceiptModal();
    }
  }

  private getDefaultTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
