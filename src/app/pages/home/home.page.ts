import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonNote,
  IonRouterLink,
  IonRow,
  IonText,
} from '@ionic/angular';
import type { Subscription } from 'rxjs';

import { DEALERSHIP_CONFIG, HOME_PROMO_BANNERS, VEHICLES_DATA } from '../../core/data/site-data';
import type { DealershipConfig, PromoBannerItem, VehicleModel } from '../../core/models/vehicle.model';
import { AmbientBgComponent } from '../../components/ambient-bg/ambient-bg.component';
import { FeaturedCarsComponent } from '../../components/featured-cars/featured-cars.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonRouterLink,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonButton,
    IonText,
    IonNote,
    HeaderComponent,
    FeaturedCarsComponent,
    AmbientBgComponent,
    VehicleCardComponent,
    PromoBannerComponent,
    FooterComponent,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonContent) content?: IonContent;

  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;

  /** Featured vehicles for the Hero showcase carousel (Xpander first) */
  readonly featuredVehicles: VehicleModel[] = VEHICLES_DATA.filter((v) => v.isFeatured);

  /** Brand new vehicles for the 3-card grid section */
  readonly brandNewVehicles: VehicleModel[] = VEHICLES_DATA.filter((v) => v.isBrandNewHome);

  /** Promo banner cards (Financing & After-Sales) */
  readonly promoBanners: PromoBannerItem[] = HOME_PROMO_BANNERS;

  private readonly route = inject(ActivatedRoute); // modern way of using constructor 
  private fragmentSub?: Subscription; // the ? means it can be empty

  ngOnInit(): void {
    this.fragmentSub = this.route.fragment.subscribe((fragment) => {
      // auto scroll 
      // the fragment is now equal to the current url and will be compared to the 'if'
      if (fragment === 'footer-contact') {
        setTimeout(() => {
          this.content?.scrollToBottom(500);
        }, 150);
      }
      else if(fragment === 'home-header'){
        setTimeout(() => {
          this.content?.scrollToTop(500);
        }, 150);
      }
    });
  }

  ngOnDestroy(): void {
    this.fragmentSub?.unsubscribe();
  }
}
