import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonGrid,
  IonIcon,
  IonNote,
  IonText,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  chevronDownOutline,
  closeOutline,
  documentTextOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import type { Subscription } from 'rxjs';

import { DEALERSHIP_CONFIG, VEHICLES_DATA } from '../core/data/site-data';
import type { VehicleModel, VehicleVariant } from '../core/models/vehicle.model';
import { AmbientBgComponent } from '../shared/components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HalftoneBandBgComponent } from '../shared/components/halftone-band-bg/halftone-band-bg.component';
import { HeaderComponent } from '../shared/components/header/header.component';

export interface FinancingStepCard {
  number: string;
  title: string;
  description: string;
  bgImage: string;
}

export interface FinancingReceiptData {
  referenceCode: string;
  timestamp: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  branch: string;
  vehicleName: string;
  vehicleYear: string;
  vehicleCategory: string;
  vehicleImage: string;
  variantName: string;
  totalPriceFormatted: string;
  downPaymentPercent: number;
  downPaymentFormatted: string;
  financedAmountFormatted: string;
  termMonths: number;
  interestRateFormatted: string;
  monthlyPaymentFormatted: string;
}

@Component({
  selector: 'app-financing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonGrid,
    IonBadge,
    IonButton,
    IonIcon,
    IonNote,
    IonText,
    HeaderComponent,
    HalftoneBandBgComponent,
    AmbientBgComponent,
    FooterComponent,
  ],
  templateUrl: './financing.page.html',
  styleUrls: ['./financing.page.scss'],
})
export class FinancingPage implements OnInit, OnDestroy {
  readonly allVehicles: VehicleModel[] = VEHICLES_DATA;
  readonly dealership = DEALERSHIP_CONFIG;

  /** Available financing terms in months matching the wireframe */
  readonly termOptions: readonly number[] = [12, 24, 36, 48, 60];

  /** 3-Step "[ HOW IT WORKS ]" Bento Cards matching the wireframe */
  readonly howItWorksSteps: FinancingStepCard[] = [
    {
      number: '01',
      title: 'CHOOSE A MODEL',
      description:
        'Select your preferred 2026 Mitsubishi model from the calculator dropdown or directly from any vehicle detail page.',
      bgImage: 'assets/images/features/comfort-bg.jpg',
    },
    {
      number: '02',
      title: 'PICK YOUR PLAN',
      description:
        'Adjust your down payment slider and choose between 12 to 60 monthly installments to match your ideal budget.',
      bgImage: 'assets/images/promos/financing-bg.jpg',
    },
    {
      number: '03',
      title: 'APPLY ONLINE',
      description:
        'Click Apply Now to submit your temporary pre-qualification form and receive an instant official estimate receipt.',
      bgImage: 'assets/images/features/connectivity-bg.jpg',
    },
  ];

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private querySub?: Subscription;

  // ---------------------------------------------------------------------------
  // REACTIVE CALCULATOR STATE (Angular Signals)
  // ---------------------------------------------------------------------------
  readonly selectedModelId = signal<string>(VEHICLES_DATA[0].id);
  readonly selectedVariantIndex = signal<number>(0);
  readonly downPaymentPercent = signal<number>(20);
  readonly selectedTerm = signal<number>(48);
  readonly isModelDropdownOpen = signal<boolean>(false);
  readonly showDisclaimerNote = signal<boolean>(false);

  // ---------------------------------------------------------------------------
  // APPLY NOW POPUP MODAL & TEMPORARY RECEIPT STATE + VALIDATION
  // ---------------------------------------------------------------------------
  readonly isApplyModalOpen = signal<boolean>(false);
  readonly modalStep = signal<'form' | 'receipt'>('form');

  readonly applicantName = signal<string>('');
  readonly applicantPhone = signal<string>('');
  readonly applicantEmail = signal<string>('');
  readonly applicantBranch = signal<string>('Mitsubishi Motors Cabanatuan — Maharlika Highway, Nueva Ecija');

  readonly nameTouched = signal<boolean>(false);
  readonly phoneTouched = signal<boolean>(false);
  readonly emailTouched = signal<boolean>(false);
  readonly formSubmitted = signal<boolean>(false);
  readonly formError = signal<string>('');

  readonly receiptData = signal<FinancingReceiptData | null>(null);

  /** Validation Computed Signals */
  readonly nameError = computed<string | null>(() => {
    const val = this.applicantName().trim();
    if (!val) {
      return 'FULL LEGAL NAME IS REQUIRED';
    }
    if (val.length < 3) {
      return 'NAME MUST BE AT LEAST 3 CHARACTERS';
    }
    if (!/^[a-zA-Z\s\.\-ñÑ]+$/.test(val)) {
      return 'NAME SHOULD ONLY CONTAIN LETTERS AND SPACES';
    }
    return null;
  });

  readonly phoneError = computed<string | null>(() => {
    const val = this.applicantPhone().trim();
    if (!val) {
      return 'MOBILE NUMBER IS REQUIRED';
    }
    const digits = val.replace(/\D/g, '');
    // Philippine mobile format: 09XXXXXXXXX (11 digits) or 639XXXXXXXXX (12 digits) or 9XXXXXXXXX (10 digits)
    const isValidPh =
      (digits.length === 11 && digits.startsWith('09')) ||
      (digits.length === 12 && digits.startsWith('639')) ||
      (digits.length === 10 && digits.startsWith('9'));

    if (!isValidPh) {
      return 'VALID PH NUMBER REQUIRED (e.g. 0917 123 4567)';
    }
    return null;
  });

  readonly emailError = computed<string | null>(() => {
    const val = this.applicantEmail().trim();
    if (!val) {
      return 'EMAIL ADDRESS IS REQUIRED';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(val)) {
      return 'ENTER A VALID EMAIL ADDRESS (e.g. name@domain.com)';
    }
    return null;
  });

  readonly isFormValid = computed<boolean>(() => {
    return !this.nameError() && !this.phoneError() && !this.emailError();
  });

  // ---------------------------------------------------------------------------
  // COMPUTED FINANCIAL VALUES
  // ---------------------------------------------------------------------------
  readonly selectedVehicle = computed<VehicleModel>(() => {
    const id = this.selectedModelId();
    return this.allVehicles.find((v) => v.id === id) ?? this.allVehicles[0];
  });

  readonly selectedVariant = computed<VehicleVariant | undefined>(() => {
    const variants = this.selectedVehicle().variants ?? [];
    return variants[this.selectedVariantIndex()] ?? variants[0];
  });

  /** Numeric retail price of the selected model/variant */
  readonly totalPriceNumeric = computed<number>(() => {
    const variant = this.selectedVariant();
    if (variant?.price) {
      const digits = Number(variant.price.replace(/[^0-9]/g, ''));
      if (!Number.isNaN(digits) && digits > 0) {
        return digits;
      }
    }
    return this.selectedVehicle().numericPrice;
  });

  /** Down payment in PHP based on the slider percentage (10% - 60%) */
  readonly downPaymentAmount = computed<number>(() => {
    return Math.round((this.totalPriceNumeric() * this.downPaymentPercent()) / 100);
  });

  /** Remaining principal financed after down payment */
  readonly financedAmount = computed<number>(() => {
    return Math.max(0, this.totalPriceNumeric() - this.downPaymentAmount());
  });

  /** Annual interest rate (%) scaled realistically by term length */
  readonly annualInterestRate = computed<number>(() => {
    const term = this.selectedTerm();
    switch (term) {
      case 12:
        return 4.88;
      case 24:
        return 5.48;
      case 36:
        return 6.18;
      case 48:
        return 6.88;
      case 60:
        return 7.48;
      default:
        return 6.88;
    }
  });

  /** Estimated monthly payment using standard amortization formula */
  readonly estimatedMonthlyNumeric = computed<number>(() => {
    const principal = this.financedAmount();
    const months = this.selectedTerm();
    const monthlyRate = this.annualInterestRate() / 100 / 12;

    if (principal <= 0 || months <= 0) {
      return 0;
    }
    if (monthlyRate <= 0) {
      return Math.round(principal / months);
    }

    const factor = Math.pow(1 + monthlyRate, months);
    const monthly = (principal * (monthlyRate * factor)) / (factor - 1);
    return Math.round(monthly);
  });

  /** Formatted display strings matching `[PHP _____]` wireframe style */
  readonly formattedMonthly = computed<string>(() => this.formatBracketPhp(this.estimatedMonthlyNumeric()));
  readonly formattedTotalPrice = computed<string>(() => this.formatBracketPhp(this.totalPriceNumeric()));
  readonly formattedDownPayment = computed<string>(() => this.formatBracketPhp(this.downPaymentAmount()));
  readonly formattedFinancedAmount = computed<string>(() => this.formatBracketPhp(this.financedAmount()));
  readonly formattedInterestRate = computed<string>(() => `[${this.annualInterestRate().toFixed(2)}%]`);

  constructor() {
    addIcons({
      'chevron-down-outline': chevronDownOutline,
      'close-outline': closeOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-outline': checkmarkOutline,
      'document-text-outline': documentTextOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'lock-closed-outline': lockClosedOutline,
      'alert-circle-outline': alertCircleOutline,
    });
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParamMap.subscribe((params) => {
      const modelParam = params.get('model');
      const variantParam = params.get('variant');

      if (modelParam && this.allVehicles.some((v) => v.id === modelParam)) {
        this.selectedModelId.set(modelParam);
      }

      if (variantParam !== null) {
        const parsedIdx = Number(variantParam);
        const variants = this.selectedVehicle().variants ?? [];
        if (!Number.isNaN(parsedIdx) && parsedIdx >= 0 && parsedIdx < variants.length) {
          this.selectedVariantIndex.set(parsedIdx);
        } else {
          this.selectedVariantIndex.set(0);
        }
      } else {
        this.selectedVariantIndex.set(0);
      }
    });
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
  }

  // ---------------------------------------------------------------------------
  // CALCULATOR INTERACTION HANDLERS
  // ---------------------------------------------------------------------------
  toggleModelDropdown(event: Event): void {
    event.stopPropagation();
    this.isModelDropdownOpen.update((open) => !open);
  }

  selectModel(modelId: string, event: Event): void {
    event.stopPropagation();
    this.selectedModelId.set(modelId);
    this.selectedVariantIndex.set(0);
    this.isModelDropdownOpen.set(false);

    // Keep query parameter synced so URL reflects the active car
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { model: modelId, variant: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  onDownPaymentInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (!Number.isNaN(value)) {
      this.downPaymentPercent.set(Math.min(60, Math.max(10, value)));
    }
  }

  selectTerm(months: number): void {
    this.selectedTerm.set(months);
  }

  scrollToCalculator(): void {
    const el = document.getElementById('financing-calculator');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleDisclaimer(): void {
    this.showDisclaimerNote.update((v) => !v);
  }

  // ---------------------------------------------------------------------------
  // APPLY NOW & TEMPORARY RECEIPT POPUP HANDLERS WITH STRICT VALIDATION
  // ---------------------------------------------------------------------------
  openApplyModal(): void {
    this.formError.set('');
    this.formSubmitted.set(false);
    this.nameTouched.set(false);
    this.phoneTouched.set(false);
    this.emailTouched.set(false);
    this.modalStep.set('form');
    this.isApplyModalOpen.set(true);
  }

  closeApplyModal(): void {
    this.isApplyModalOpen.set(false);
  }

  onFieldBlur(field: 'name' | 'phone' | 'email'): void {
    if (field === 'name') this.nameTouched.set(true);
    if (field === 'phone') this.phoneTouched.set(true);
    if (field === 'email') this.emailTouched.set(true);
  }

  submitApplication(): void {
    this.formSubmitted.set(true);
    this.nameTouched.set(true);
    this.phoneTouched.set(true);
    this.emailTouched.set(true);

    if (!this.isFormValid()) {
      this.formError.set('PLEASE RESOLVE THE HIGHLIGHTED FIELDS TO PROCEED');
      return;
    }

    this.formError.set('');
    const name = this.applicantName().trim();
    const phone = this.applicantPhone().trim();
    const email = this.applicantEmail().trim();

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const car = this.selectedVehicle();
    const variant = this.selectedVariant();

    this.receiptData.set({
      referenceCode: `MM-CAB-2026-${randomCode}`,
      timestamp: `${formattedDate.toUpperCase()} · ${formattedTime}`,
      applicantName: name.toUpperCase(),
      applicantPhone: phone,
      applicantEmail: email.toLowerCase(),
      branch: this.applicantBranch().toUpperCase(),
      vehicleName: `2026 MITSUBISHI ${car.name}`,
      vehicleYear: car.year,
      vehicleCategory: car.category,
      vehicleImage: car.image,
      variantName: variant ? variant.name.replace(/\[|\]/g, '') : `${car.name} STANDARD`,
      totalPriceFormatted: this.formattedTotalPrice(),
      downPaymentPercent: this.downPaymentPercent(),
      downPaymentFormatted: this.formattedDownPayment(),
      financedAmountFormatted: this.formattedFinancedAmount(),
      termMonths: this.selectedTerm(),
      interestRateFormatted: this.formattedInterestRate(),
      monthlyPaymentFormatted: this.formattedMonthly(),
    });

    this.modalStep.set('receipt');
  }

  startNewEstimate(): void {
    this.isApplyModalOpen.set(false);
    this.modalStep.set('form');
  }

  private formatBracketPhp(amount: number): string {
    return `[PHP ${amount.toLocaleString('en-US')}]`;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isModelDropdownOpen()) {
      this.isModelDropdownOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isApplyModalOpen()) {
      this.closeApplyModal();
    } else if (this.isModelDropdownOpen()) {
      this.isModelDropdownOpen.set(false);
    }
  }
}
