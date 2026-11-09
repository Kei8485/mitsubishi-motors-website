import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonChip,
  IonContent,
  IonGrid,
  IonLabel,
  IonList,
  IonNote,
  IonText,
} from '@ionic/angular';
import type { Subscription } from 'rxjs';

import { VEHICLES_DATA } from '../../core/data/site-data';
import type {
  VehicleColorOption,
  VehicleFeatureCard,
  VehicleModel,
  VehicleStageMode,
  VehicleVariant,
} from '../../core/models/vehicle.model';
import { AmbientBgComponent } from '../../components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HalftoneBgComponent } from '../../components/halftone-bg/halftone-bg.component';
import { HeaderComponent } from '../../components/header/header.component';
import { VehicleStageComponent } from '../../components/vehicle-stage/vehicle-stage.component';

export interface OverviewSpecItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-model-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonGrid,
    IonChip,
    IonLabel,
    IonBadge,
    IonButton,
    IonList,
    IonText,
    IonNote,
    HeaderComponent,
    HalftoneBgComponent,
    AmbientBgComponent,
    VehicleStageComponent,
    FooterComponent,
  ],
  templateUrl: './model-detail.page.html',
  styleUrls: ['./model-detail.page.scss'],
})
export class ModelDetailPage implements OnInit, OnDestroy {
  /**
   * ===========================================================================
   * STAGE DISPLAY MODE SWITCHES (EASY 1-LINE CONFIGURATION)
   * ===========================================================================
   * Easily switch how the vehicle stage renders on this detail page:
   * - 'image'       : Renders the 2D studio cutout PNG from `site-data.ts`
   * - 'placeholder' : Leaves the 3D elliptical turntable wireframe ring
   * - '3d'          : Renders the interactive 3D model viewer slot (`vehicle.model3d`)
   */
  readonly heroStageMode: VehicleStageMode = 'image';
  readonly configuratorStageMode: VehicleStageMode = 'image';

  readonly allVehicles: VehicleModel[] = VEHICLES_DATA;

  private readonly route = inject(ActivatedRoute);
  private routeSub?: Subscription;

  /** Currently active vehicle ID from route parameter `/models/:id` */
  readonly activeVehicleId = signal<string>(VEHICLES_DATA[0].id);

  /** Currently selected paint color index */
  readonly selectedColorIndex = signal<number>(0);

  /** Currently selected variant index (0 = base starting trim) */
  readonly selectedVariantIndex = signal<number>(0);

  /** Animation tick incremented when switching models or colors */
  readonly modelAnimTick = signal<number>(0);

  /** Resolved VehicleModel object from `site-data.ts` */
  readonly vehicle = computed<VehicleModel>(() => {
    const id = this.activeVehicleId();
    return this.allVehicles.find((v) => v.id === id) ?? this.allVehicles[0];
  });

  /** Available paint colors for the active vehicle */
  readonly colors = computed<VehicleColorOption[]>(() => {
    const car = this.vehicle();
    return (
      car.colors ?? [
        { name: 'Quartz White Pearl', hex: '#F3F3F1' },
        { name: 'Blade Silver Metallic', hex: '#A5A9AE' },
        { name: 'Graphite Gray Metallic', hex: '#2D2F33' },
        { name: 'Red Metallic', hex: '#C8102E' },
      ]
    );
  });

  /** Currently active paint color swatch */
  readonly selectedColor = computed<VehicleColorOption>(() => {
    const list = this.colors();
    const idx = this.selectedColorIndex();
    return list[idx] ?? list[0];
  });

  /** 6-card technical overview specs array for the 2x3 grid */
  readonly overviewSpecItems = computed<OverviewSpecItem[]>(() => {
    const car = this.vehicle();
    const specs = car.overviewSpecs;
    return [
      { label: 'ENGINE', value: specs?.engine ?? '[1.5L MIVEC]' },
      { label: 'TRANSMISSION', value: specs?.transmission ?? `[${car.cardSpecs[2]}]` },
      { label: 'SEATING', value: specs?.seating ?? `[${car.cardSpecs[0]}]` },
      { label: 'FUEL', value: specs?.fuel ?? `[${car.cardSpecs[1]}]` },
      { label: 'DIMENSIONS', value: specs?.dimensions ?? '[4595 × 1750 MM]' },
      { label: 'CLEARANCE', value: specs?.clearance ?? '[222 MM]' },
    ];
  });

  /** Trim variants list */
  readonly variants = computed<VehicleVariant[]>(() => {
    const car = this.vehicle();
    return (
      car.variants ?? [
        { name: `[${car.name} GLX BASE]`, price: car.startingPrice },
        { name: `[${car.name} GLS MID]`, price: car.startingPrice },
        { name: `[${car.name} GT FLAGSHIP]`, price: car.startingPrice },
      ]
    );
  });

  /** Currently active variant (updates configurator price display when clicked) */
  readonly selectedVariant = computed<VehicleVariant | undefined>(() => {
    const list = this.variants();
    return list[this.selectedVariantIndex()] ?? list[0];
  });

  /** 4 Bento feature cards (Safety, Comfort, Connectivity, Performance) */
  readonly features = computed<VehicleFeatureCard[]>(() => {
    const car = this.vehicle();
    return car.features ?? [];
  });

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && this.allVehicles.some((v) => v.id === id)) {
        this.activeVehicleId.set(id);
      } else {
        this.activeVehicleId.set(this.allVehicles[0].id);
      }
      this.selectedColorIndex.set(0);
      this.selectedVariantIndex.set(0);
      this.modelAnimTick.update((v) => v + 1);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  // ---------------------------------------------------------------------------
  // USER INTERACTION HANDLERS
  // ---------------------------------------------------------------------------
  selectColor(index: number): void {
    this.selectedColorIndex.set(index);
  }

  selectVariant(index: number): void {
    this.selectedVariantIndex.set(index);
  }
}
