import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonBadge,
  IonContent,
  IonGrid,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  calendarOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  chevronDownOutline,
  closeOutline,
  documentTextOutline,
  informationCircleOutline,
  locationOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  timeOutline,
} from 'ionicons/icons';
import type { Subscription } from 'rxjs';

import { DEALERSHIP_CONFIG, VEHICLES_DATA } from '../core/data/site-data';
import type { VehicleModel } from '../core/models/vehicle.model';
import { AmbientBgComponent } from '../shared/components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HalftoneBandBgComponent } from '../shared/components/halftone-band-bg/halftone-band-bg.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { VehicleCardComponent } from '../shared/components/vehicle-card/vehicle-card.component';

export interface TestDriveReceiptData {
  referenceCode: string;
  timestamp: string;
  driverName: string;
  driverPhone: string;
  driverEmail: string;
  vehicleName: string;
  vehicleCategory: string;
  vehicleImage: string;
  startingPrice: string;
  appointmentDateFormatted: string;
  appointmentTime: string;
  branchName: string;
  branchAddress: string;
  branchPhone: string;
}

@Component({
  selector: 'app-test-drive',
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
    VehicleCardComponent,
    FooterComponent,
  ],
  templateUrl: './test-drive.page.html',
  styleUrls: ['./test-drive.page.scss'],
})
export class TestDrivePage implements OnInit, OnDestroy {
  readonly allVehicles: VehicleModel[] = VEHICLES_DATA;
  readonly dealership = DEALERSHIP_CONFIG;

  /** Available test drive appointment time slots at Cabanatuan Branch */
  readonly timeSlots: readonly string[] = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
  ];

  private readonly route = inject(ActivatedRoute);
  private querySub?: Subscription;

  // ---------------------------------------------------------------------------
  // Interactive State: Selected Vehicle & Dropdowns
  // ---------------------------------------------------------------------------
  readonly selectedVehicle = signal<VehicleModel>(VEHICLES_DATA[0]);
  readonly isModelDropdownOpen = signal<boolean>(false);
  readonly isTimeDropdownOpen = signal<boolean>(false);
  readonly showGuideDetails = signal<boolean>(false);

  // ---------------------------------------------------------------------------
  // Interactive State: Form Fields & Real-Time Signals Validation
  // ---------------------------------------------------------------------------
  readonly driverName = signal<string>('');
  readonly driverPhone = signal<string>('');
  readonly driverEmail = signal<string>('');
  readonly testDriveDate = signal<string>(this.getDefaultTomorrowDate());
  readonly testDriveTime = signal<string>('10:30 AM');
  readonly consentChecked = signal<boolean>(false);

  readonly nameTouched = signal<boolean>(false);
  readonly phoneTouched = signal<boolean>(false);
  readonly emailTouched = signal<boolean>(false);
  readonly dateTouched = signal<boolean>(false);
  readonly consentTouched = signal<boolean>(false);
  readonly formSubmitted = signal<boolean>(false);

  readonly minTestDriveDate = this.getDefaultTomorrowDate();

  /** Validation error for Full Name */
  readonly nameError = computed<string | null>(() => {
    const val = this.driverName().trim();
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

  /** Validation error for PH Mobile Number */
  readonly phoneError = computed<string | null>(() => {
    const raw = this.driverPhone().trim();
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

  /** Validation error for Email Address */
  readonly emailError = computed<string | null>(() => {
    const val = this.driverEmail().trim();
    if (!val) {
      return 'EMAIL ADDRESS IS REQUIRED';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(val)) {
      return 'ENTER A VALID EMAIL (E.G. CLIENT@DOMAIN.COM)';
    }
    return null;
  });

  /** Validation error for Date */
  readonly dateError = computed<string | null>(() => {
    const raw = this.testDriveDate().trim();
    if (!raw) {
      return 'PICK A TEST DRIVE DATE';
    }
    const picked = new Date(`${raw}T00:00:00`);
    if (Number.isNaN(picked.getTime())) {
      return 'INVALID DATE SELECTED';
    }
    return null;
  });

  /** Validation error for Consent Checkbox */
  readonly consentError = computed<string | null>(() => {
    if (!this.consentChecked()) {
      return 'PLEASE AGREE TO BE CONTACTED TO CONFIRM YOUR SLOT';
    }
    return null;
  });

  readonly isFormValid = computed<boolean>(() => {
    return (
      !this.nameError() &&
      !this.phoneError() &&
      !this.emailError() &&
      !this.dateError() &&
      !this.consentError()
    );
  });

  // ---------------------------------------------------------------------------
  // Confirmed Test Drive Voucher Receipt Modal State
  // ---------------------------------------------------------------------------
  readonly testDriveReceipt = signal<TestDriveReceiptData | null>(null);

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
      calendarOutline,
      timeOutline,
      locationOutline,
      informationCircleOutline,
    });
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParamMap.subscribe((params) => {
      const modelId = params.get('model');
      if (modelId) {
        const found = this.allVehicles.find(
          (v) => v.id.toLowerCase() === modelId.toLowerCase()
        );
        if (found) {
          this.selectedVehicle.set(found);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
  }

  /** Smooth-scroll to the booking section when clicking the FREE button */
  scrollToBooking(): void {
    const el = document.getElementById('test-drive-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleGuideDetails(): void {
    this.showGuideDetails.update((v) => !v);
  }

  toggleModelDropdown(event: Event): void {
    event.stopPropagation();
    this.isTimeDropdownOpen.set(false);
    this.isModelDropdownOpen.update((v) => !v);
  }

  selectVehicleModel(vehicle: VehicleModel, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedVehicle.set(vehicle);
    this.isModelDropdownOpen.set(false);
  }

  toggleTimeDropdown(event: Event): void {
    event.stopPropagation();
    this.isModelDropdownOpen.set(false);
    this.isTimeDropdownOpen.update((v) => !v);
  }

  selectTimeSlot(slot: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.testDriveTime.set(slot);
    this.isTimeDropdownOpen.set(false);
  }

  toggleConsent(): void {
    this.consentTouched.set(true);
    this.consentChecked.update((v) => !v);
  }

  onFieldBlur(field: 'name' | 'phone' | 'email' | 'date'): void {
    if (field === 'name') this.nameTouched.set(true);
    if (field === 'phone') this.phoneTouched.set(true);
    if (field === 'email') this.emailTouched.set(true);
    if (field === 'date') this.dateTouched.set(true);
  }

  /** Validate form and open the official Cabanatuan Test Drive Pass modal */
  submitTestDriveBooking(): void {
    this.formSubmitted.set(true);
    this.nameTouched.set(true);
    this.phoneTouched.set(true);
    this.emailTouched.set(true);
    this.dateTouched.set(true);
    this.consentTouched.set(true);

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

    const pickedDate = new Date(`${this.testDriveDate()}T09:00:00`);
    const formattedDate = Number.isNaN(pickedDate.getTime())
      ? this.testDriveDate()
      : pickedDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        });

    this.testDriveReceipt.set({
      referenceCode: `MMC-TD-${randomNum}`,
      timestamp,
      driverName: this.driverName().trim(),
      driverPhone: this.driverPhone().trim(),
      driverEmail: this.driverEmail().trim(),
      vehicleName: `2026 MITSUBISHI ${vehicle.name}`,
      vehicleCategory: vehicle.category,
      vehicleImage: vehicle.image,
      startingPrice: vehicle.startingPrice,
      appointmentDateFormatted: formattedDate.toUpperCase(),
      appointmentTime: this.testDriveTime(),
      branchName: 'MITSUBISHI MOTORS CABANATUAN',
      branchAddress: this.dealership.address,
      branchPhone: this.dealership.phone,
    });
  }

  closeReceiptModal(): void {
    this.testDriveReceipt.set(null);
  }

  resetAndBookAnother(): void {
    this.testDriveReceipt.set(null);
    this.driverName.set('');
    this.driverPhone.set('');
    this.driverEmail.set('');
    this.consentChecked.set(false);
    this.nameTouched.set(false);
    this.phoneTouched.set(false);
    this.emailTouched.set(false);
    this.dateTouched.set(false);
    this.consentTouched.set(false);
    this.formSubmitted.set(false);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isModelDropdownOpen()) {
      this.isModelDropdownOpen.set(false);
    }
    if (this.isTimeDropdownOpen()) {
      this.isTimeDropdownOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isModelDropdownOpen()) {
      this.isModelDropdownOpen.set(false);
    }
    if (this.isTimeDropdownOpen()) {
      this.isTimeDropdownOpen.set(false);
    }
    if (this.testDriveReceipt()) {
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
