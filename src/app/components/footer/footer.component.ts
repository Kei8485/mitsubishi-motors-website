import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonBadge, IonCol, IonFooter, IonGrid, IonList, IonNote, IonRow, IonText } from '@ionic/angular';

import { DEALERSHIP_CONFIG } from '../../core/data/site-data';
import type { DealershipConfig } from '../../core/models/vehicle.model';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import type { IconName } from '../icon/icon.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IonFooter,
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
export class FooterComponent {
  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;

  getSocialIcon(label: string): IconName {
    const key = label.trim().toLowerCase();
    if (key.includes('instagram')) return 'instagram';
    if (key.includes('youtube')) return 'youtube';
    return 'facebook';
  }
}
