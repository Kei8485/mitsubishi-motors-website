import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList,
  IonNote,
  IonRouterLink,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, closeOutline } from 'ionicons/icons';

import { DEALERSHIP_CONFIG, NAV_MENU_ITEMS } from '../../core/data/site-data';
import type { DealershipConfig, NavMenuItem } from '../../core/models/vehicle.model';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { HalftoneBgComponent } from '../halftone-bg/halftone-bg.component';

addIcons({ closeOutline, arrowForwardOutline });

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonNote,
    IonText,
    HalftoneBgComponent,
    BrandLogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() activeRoute = '/home';

  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;
  readonly menuItems: NavMenuItem[] = NAV_MENU_ITEMS;

  readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
