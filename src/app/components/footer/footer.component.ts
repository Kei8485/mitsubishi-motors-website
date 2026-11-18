import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, ElementRef, HostListener, Input, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonBadge, IonCol, IonFooter, IonGrid, IonList, IonNote, IonRow, IonText } from '@ionic/angular';
import type { Subscription } from 'rxjs';

import { DEALERSHIP_CONFIG } from '../../core/data/site-data';
import type { DealershipConfig } from '../../core/models/vehicle.model';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import type { IconName } from '../icon/icon.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonBadge,
    IonText,
    IonNote,
    BrandLogoComponent,
    IconComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() highlightContact = false;

  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;

  private readonly route = inject(ActivatedRoute);
  private readonly elRef = inject(ElementRef<HTMLElement>);
  private fragmentSub?: Subscription;
  private highlightTimeout?: ReturnType<typeof setTimeout>;

  readonly isContactHighlighted = signal(false);

  @HostListener('mm-highlight-contact')
  triggerContactHighlight(): void {
    this.isContactHighlighted.set(true);
    if (this.highlightTimeout) {
      clearTimeout(this.highlightTimeout);
    }
    this.highlightTimeout = setTimeout(() => {
      this.isContactHighlighted.set(false);
    }, 1500);
  }

  ngOnInit(): void {
    this.fragmentSub = this.route.fragment.subscribe((fragment) => {
      if (fragment === 'footer-contact') {
        this.triggerContactHighlight();
        setTimeout(() => {
          const pageEl =
            this.elRef.nativeElement.closest('.ion-page') ?? this.elRef.nativeElement.parentElement ?? document;
          const contentEl = pageEl.querySelector('ion-content') as HTMLIonContentElement | null;
          if (contentEl && typeof contentEl.scrollToBottom === 'function') {
            void contentEl.scrollToBottom(500);
          } else {
            this.elRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    });
  }

  ngOnDestroy(): void {
    this.fragmentSub?.unsubscribe();
    if (this.highlightTimeout) {
      clearTimeout(this.highlightTimeout);
    }
  }

  getSocialIcon(label: string): IconName {
    const key = label.trim().toLowerCase();
    if (key.includes('instagram')) return 'instagram';
    if (key.includes('youtube')) return 'youtube';
    return 'facebook';
  }
}
