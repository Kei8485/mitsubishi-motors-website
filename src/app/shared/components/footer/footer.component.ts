import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEALERSHIP_CONFIG } from '../../../core/data/site-data';
import { DealershipConfig } from '../../../core/models/vehicle.model';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { IconComponent, IconName } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, BrandLogoComponent, IconComponent],
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
