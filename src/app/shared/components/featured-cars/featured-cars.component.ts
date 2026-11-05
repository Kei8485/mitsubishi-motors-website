import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, Input, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonChip, IonIcon, IonLabel, IonNote, IonRouterLink, IonText } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

import { VEHICLES_DATA } from '../../../core/data/site-data';
import type { VehicleModel } from '../../../core/models/vehicle.model';
import { HalftoneBgComponent } from '../halftone-bg/halftone-bg.component';
import type { VehicleStageSlide } from '../vehicle-stage/vehicle-stage.component';
import { VehicleStageComponent } from '../vehicle-stage/vehicle-stage.component';

addIcons({ chevronBackOutline, chevronForwardOutline });

@Component({
  selector: 'app-featured-cars',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonRouterLink,
    IonChip,
    IonLabel,
    IonNote,
    IonButton,
    IonIcon,
    IonText,
    HalftoneBgComponent,
    VehicleStageComponent,
  ],
  templateUrl: './featured-cars.component.html',
  styleUrls: ['./featured-cars.component.scss'],
})
export class FeaturedCarsComponent implements OnInit, OnDestroy {
  /** Array of featured vehicles (defaults to vehicles marked isFeatured in site-data.ts) */
  @Input() vehicles: VehicleModel[] = VEHICLES_DATA.filter((v) => v.isFeatured);

  /** Auto-advance interval in milliseconds (5 seconds) */
  private static readonly AUTO_SCROLL_INTERVAL_MS = 5000;
  private autoScrollTimer: ReturnType<typeof setInterval> | null = null;

  readonly activeFeaturedIndex = signal(0);

  readonly currentFeatured = computed<VehicleModel>(
    () => this.vehicles[this.activeFeaturedIndex()] ?? VEHICLES_DATA[0],
  );

  readonly stageSlides = computed<VehicleStageSlide[]>(() =>
    this.vehicles.map((v) => ({
      id: v.id,
      imageSrc: v.image,
      altText: `${v.year} Mitsubishi ${v.name}`,
    })),
  );

  readonly slideCounter = computed<string>(() => {
    const current = String(this.activeFeaturedIndex() + 1).padStart(2, '0');
    const total = String(this.vehicles.length).padStart(2, '0');
    return `${current} / ${total}`;
  });

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  prevFeatured(): void {
    this.activeFeaturedIndex.update((idx) => (idx === 0 ? this.vehicles.length - 1 : idx - 1));
    this.resetAutoScroll();
  }

  nextFeatured(): void {
    this.advanceSlide();
    this.resetAutoScroll();
  }

  private advanceSlide(): void {
    if (this.vehicles.length <= 1) {
      return;
    }
    this.activeFeaturedIndex.update((idx) => (idx === this.vehicles.length - 1 ? 0 : idx + 1));
  }

  private startAutoScroll(): void {
    this.stopAutoScroll();
    this.autoScrollTimer = setInterval(() => {
      this.advanceSlide();
    }, FeaturedCarsComponent.AUTO_SCROLL_INTERVAL_MS);
  }

  private stopAutoScroll(): void {
    if (this.autoScrollTimer !== null) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
    }
  }

  private resetAutoScroll(): void {
    this.startAutoScroll();
  }
}
