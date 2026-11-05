import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent } from '@ionic/angular';
import {
  DEALERSHIP_CONFIG,
  HOME_PROMO_BANNERS,
  VEHICLES_DATA,
} from '../core/data/site-data';
import {
  DealershipConfig,
  PromoBannerItem,
  VehicleModel,
} from '../core/models/vehicle.model';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HalftoneBgComponent } from '../shared/components/halftone-bg/halftone-bg.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { PromoBannerComponent } from '../shared/components/promo-banner/promo-banner.component';
import { VehicleCardComponent } from '../shared/components/vehicle-card/vehicle-card.component';
import { VehicleStageComponent } from '../shared/components/vehicle-stage/vehicle-stage.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    NavbarComponent,
    HalftoneBgComponent,
    VehicleStageComponent,
    VehicleCardComponent,
    PromoBannerComponent,
    FooterComponent,
  ],
})
export class HomePage {
  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;

  /** Featured vehicles for the Hero showcase carousel (Xpander first) */
  readonly featuredVehicles: VehicleModel[] = VEHICLES_DATA.filter((v) => v.isFeatured);

  /** Brand new vehicles for the 3-card grid section */
  readonly brandNewVehicles: VehicleModel[] = VEHICLES_DATA.filter((v) => v.isBrandNewHome);

  /** Promo banner cards (Financing & After-Sales) */
  readonly promoBanners: PromoBannerItem[] = HOME_PROMO_BANNERS;

  /** Active index in the hero featured carousel */
  readonly activeFeaturedIndex = signal(0);

  /** Currently displayed featured vehicle */
  readonly currentFeatured = computed<VehicleModel>(
    () => this.featuredVehicles[this.activeFeaturedIndex()] ?? VEHICLES_DATA[0]
  );

  /** Formatted 2-digit counter e.g. "01 / 03" */
  readonly slideCounter = computed<string>(() => {
    const current = String(this.activeFeaturedIndex() + 1).padStart(2, '0');
    const total = String(this.featuredVehicles.length).padStart(2, '0');
    return `${current} / ${total}`;
  });

  prevFeatured(): void {
    this.activeFeaturedIndex.update((idx) =>
      idx === 0 ? this.featuredVehicles.length - 1 : idx - 1
    );
  }

  nextFeatured(): void {
    this.activeFeaturedIndex.update((idx) =>
      idx === this.featuredVehicles.length - 1 ? 0 : idx + 1
    );
  }
}
