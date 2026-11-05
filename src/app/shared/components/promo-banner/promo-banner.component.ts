import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonRouterLink,
  IonText,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';

import type { PromoBannerItem } from '../../../core/models/vehicle.model';

addIcons({ arrowForwardOutline });

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonRouterLink,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonText,
    IonIcon,
  ],
  templateUrl: './promo-banner.component.html',
  styleUrls: ['./promo-banner.component.scss'],
})
export class PromoBannerComponent {
  @Input({ required: true }) item!: PromoBannerItem;
}
