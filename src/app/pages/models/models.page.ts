import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonList,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';

import { VEHICLES_DATA } from '../../core/data/site-data';
import type { VehicleModel, VehicleStageMode } from '../../core/models/vehicle.model';
import { AmbientBgComponent } from '../../components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HalftoneBandBgComponent } from '../../components/halftone-band-bg/halftone-band-bg.component';
import { HeaderComponent } from '../../components/header/header.component';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';

export type SortOptionId = 'popular' | 'price-asc' | 'price-desc' | 'name-asc';

export interface SortOption {
  id: SortOptionId;
  label: string;
}

export interface CategoryFilterOption {
  id: string;
  label: string;
  pillLabel: string;
  matchCategories: string[];
}

export interface PriceRangeFilterOption {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface FuelFilterOption {
  id: string;
  label: string;
  matchSpec: string;
}

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonButton,
    IonIcon,
    IonList,
    IonText,
    IonNote,
    HeaderComponent,
    HalftoneBandBgComponent,
    AmbientBgComponent,
    VehicleCardComponent,
    FooterComponent,
  ],
  templateUrl: './models.page.html',
  styleUrls: ['./models.page.scss'],
})
export class ModelsPage {
  /**
   * ===========================================================================
   * VEHICLE STAGE DISPLAY MODE SWITCH (EASY 1-LINE CONFIGURATION)
   * ===========================================================================
   * Controls what appears inside the stage of each vehicle card on this page:
   * - 'image'       : Renders the 2D studio cutout PNG from `vehicle.image` in `site-data.ts`
   *                   with the interactive hover showcase FX (`vehicle.hoverFx`)
   * - 'placeholder' : Leaves the 3D elliptical turntable wireframe ring
   * - '3d'          : Renders the 3D model viewer slot using `vehicle.model3d`
   *
   * You can also override `stageMode` per individual car in `src/app/core/data/site-data.ts`.
   */
  readonly cardStageMode: VehicleStageMode = 'image';

  readonly allVehicles: VehicleModel[] = VEHICLES_DATA;

  // ---------------------------------------------------------------------------
  // FILTER DEFINITIONS (Desktop Sidebar + Tablet/Mobile Horizontal Pills)
  // ---------------------------------------------------------------------------
  readonly categoryOptions: CategoryFilterOption[] = [
    { id: 'suv', label: 'SUV', pillLabel: 'SUV', matchCategories: ['SUV', 'CROSSOVER'] },
    { id: 'mpv', label: 'MPV', pillLabel: 'MPV', matchCategories: ['MPV'] },
    { id: 'pickup', label: 'Pickup', pillLabel: 'PICKUP', matchCategories: ['PICKUP'] },
    { id: 'sedan', label: 'Sedan', pillLabel: 'SEDAN', matchCategories: ['SEDAN'] },
  ];

  readonly priceRangeOptions: PriceRangeFilterOption[] = [
    {
      id: 'under-1.3m',
      label: '[PHP 750K] - [PHP 1.3M]',
      min: 0,
      max: 1300000,
    },
    {
      id: 'over-1.3m',
      label: '[PHP 1.3M]+',
      min: 1300001,
      max: Number.POSITIVE_INFINITY,
    },
  ];

  readonly fuelOptions: FuelFilterOption[] = [
    { id: 'gasoline', label: 'Gasoline', matchSpec: 'GASOLINE' },
    { id: 'diesel', label: 'Diesel', matchSpec: 'DIESEL' },
  ];

  // ---------------------------------------------------------------------------
  // SORT OPTIONS
  // ---------------------------------------------------------------------------
  readonly sortOptions: SortOption[] = [
    { id: 'popular', label: 'MOST POPULAR FIRST' },
    { id: 'price-asc', label: 'PRICE: LOW TO HIGH' },
    { id: 'price-desc', label: 'PRICE: HIGH TO LOW' },
    { id: 'name-asc', label: 'NAME: A TO Z' },
  ];

  // ---------------------------------------------------------------------------
  // REACTIVE FILTER, SORT & ANIMATION STATE
  // ---------------------------------------------------------------------------
  readonly selectedCategories = signal<string[]>([]);
  readonly selectedPrices = signal<string[]>([]);
  readonly selectedFuels = signal<string[]>([]);
  readonly activeSortId = signal<SortOptionId>('popular');
  readonly isSortMenuOpen = signal(false);

  /** Incremented whenever filters or sort change so cards play a staggered filter transition */
  readonly filterAnimTick = signal(0);

  readonly activeSortLabel = computed(() => {
    const found = this.sortOptions.find((o) => o.id === this.activeSortId());
    return found ? found.label : 'MOST POPULAR FIRST';
  });

  readonly hasActiveFilters = computed(
    () =>
      this.selectedCategories().length > 0 ||
      this.selectedPrices().length > 0 ||
      this.selectedFuels().length > 0
  );

  /** Filtered & sorted vehicles rendered in the catalog grid */
  readonly filteredVehicles = computed<VehicleModel[]>(() => {
    const cats = this.selectedCategories();
    const prices = this.selectedPrices();
    const fuels = this.selectedFuels();
    const sortId = this.activeSortId();

    const filtered = this.allVehicles.filter((car) => {
      // 1. Category match
      if (cats.length > 0) {
        const matchesCat = this.categoryOptions
          .filter((opt) => cats.includes(opt.id))
          .some((opt) => opt.matchCategories.includes(car.category));
        if (!matchesCat) return false;
      }

      // 2. Price range match
      if (prices.length > 0) {
        const matchesPrice = this.priceRangeOptions
          .filter((opt) => prices.includes(opt.id))
          .some((opt) => car.numericPrice >= opt.min && car.numericPrice <= opt.max);
        if (!matchesPrice) return false;
      }

      // 3. Fuel type match
      if (fuels.length > 0) {
        const carFuel = car.cardSpecs[1]?.toUpperCase() ?? '';
        const matchesFuel = this.fuelOptions
          .filter((opt) => fuels.includes(opt.id))
          .some((opt) => carFuel.includes(opt.matchSpec));
        if (!matchesFuel) return false;
      }

      return true;
    });

    // 4. Sort order
    const copy = [...filtered];
    if (sortId === 'price-asc') {
      copy.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortId === 'price-desc') {
      copy.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortId === 'name-asc') {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    }

    return copy;
  });

  constructor() {
    addIcons({
      'chevron-down-outline': chevronDownOutline,
    });
  }

  // ---------------------------------------------------------------------------
  // USER INTERACTION HANDLERS (Trigger staggered card animation on change)
  // ---------------------------------------------------------------------------
  private triggerFilterAnimation(): void {
    this.filterAnimTick.update((v) => v + 1);
  }

  isCategorySelected(id: string): boolean {
    return this.selectedCategories().includes(id);
  }

  toggleCategory(id: string): void {
    this.selectedCategories.update((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    this.triggerFilterAnimation();
  }

  /** Used by Tablet & Mobile horizontal quick-filter pills (ALL | SUV | MPV | PICKUP | SEDAN) */
  selectPillCategory(id: string | 'all'): void {
    if (id === 'all') {
      if (this.selectedCategories().length > 0) {
        this.selectedCategories.set([]);
        this.triggerFilterAnimation();
      }
      return;
    }
    const current = this.selectedCategories();
    if (current.length === 1 && current[0] === id) {
      this.selectedCategories.set([]);
    } else {
      this.selectedCategories.set([id]);
    }
    this.triggerFilterAnimation();
  }

  isPriceSelected(id: string): boolean {
    return this.selectedPrices().includes(id);
  }

  togglePrice(id: string): void {
    this.selectedPrices.update((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    this.triggerFilterAnimation();
  }

  isFuelSelected(id: string): boolean {
    return this.selectedFuels().includes(id);
  }

  toggleFuel(id: string): void {
    this.selectedFuels.update((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    this.triggerFilterAnimation();
  }

  resetAllFilters(): void {
    this.selectedCategories.set([]);
    this.selectedPrices.set([]);
    this.selectedFuels.set([]);
    this.triggerFilterAnimation();
  }

  toggleSortMenu(event: Event): void {
    event.stopPropagation();
    this.isSortMenuOpen.update((open) => !open);
  }

  selectSort(optionId: SortOptionId, event: Event): void {
    event.stopPropagation();
    const changed = this.activeSortId() !== optionId;
    this.activeSortId.set(optionId);
    this.isSortMenuOpen.set(false);
    if (changed) {
      this.triggerFilterAnimation();
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isSortMenuOpen()) {
      this.isSortMenuOpen.set(false);
    }
  }
}
