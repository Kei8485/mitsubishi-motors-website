import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, inject, signal } from '@angular/core';
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
  @Output() contactClick = new EventEmitter<void>();

  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;
  readonly menuItems: NavMenuItem[] = NAV_MENU_ITEMS;

  readonly isMenuOpen = signal(false);

  private readonly elRef = inject(ElementRef<HTMLElement>);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  onLogoClick(event: Event): void {
    this.closeMenu();
    if (this.activeRoute === '/home') {
      event.preventDefault();
      this.scrollToTop();
    }
  }

  onNavLinkClick(targetRoute: string, event: Event): void {
    this.closeMenu();
    if (this.activeRoute === targetRoute) {
      event.preventDefault();
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    const pageEl =
      this.elRef.nativeElement.closest('.ion-page') ?? this.elRef.nativeElement.parentElement ?? document;
    const contentEl = pageEl.querySelector('ion-content') as HTMLIonContentElement | null;
    if (contentEl && typeof contentEl.scrollToTop === 'function') {
      void contentEl.scrollToTop(500);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onContactClick(event?: Event): void {
    event?.preventDefault();
    this.closeMenu();
    this.contactClick.emit();

    const pageEl =
      this.elRef.nativeElement.closest('.ion-page') ?? this.elRef.nativeElement.parentElement ?? document;

    setTimeout(() => {
      const contentEl = pageEl.querySelector('ion-content') as HTMLIonContentElement | null;
      const footerHostEl = pageEl.querySelector('app-footer') as HTMLElement | null;
      const footerEl = pageEl.querySelector('#footer-contact') as HTMLElement | null;

      if (contentEl && typeof contentEl.scrollToBottom === 'function') {
        void contentEl.scrollToBottom(500);
      } else {
        footerEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      footerHostEl?.dispatchEvent(new CustomEvent('mm-highlight-contact'));
    }, 50);
  }
}
