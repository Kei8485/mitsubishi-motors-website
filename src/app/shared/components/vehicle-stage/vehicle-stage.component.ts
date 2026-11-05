import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-stage.component.html',
  styleUrls: ['./vehicle-stage.component.scss'],
})
export class VehicleStageComponent {
  /** Path to the transparent vehicle PNG */
  @Input({ required: true }) imageSrc!: string;

  /** Accessible alt text for the vehicle image */
  @Input({ required: true }) altText!: string;

  /** Stage variant: 'hero' for large landing/detail showcase, 'card' for catalog cards */
  @Input() variant: 'hero' | 'card' = 'card';

  /** Whether to prioritize image loading (LCP optimization for hero image) */
  @Input() priority = false;
}
