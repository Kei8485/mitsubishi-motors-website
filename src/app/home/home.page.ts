import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { AmbientBgComponent } from '../shared/components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HeroShowcaseComponent } from '../shared/components/hero-showcase/hero-showcase.component';
import { PromoBannerComponent } from '../shared/components/promo-banner/promo-banner.component';
import { VehicleCardComponent } from '../shared/components/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    HeaderComponent,
    HeroShowcaseComponent,
    AmbientBgComponent,
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
}
