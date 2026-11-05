import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PromoBannerItem } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './promo-banner.component.html',
  styleUrls: ['./promo-banner.component.scss'],
})
export class PromoBannerComponent {
  @Input({ required: true }) item!: PromoBannerItem;
}
