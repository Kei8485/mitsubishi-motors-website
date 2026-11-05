import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonBadge } from '@ionic/angular';

export interface VehicleStageSlide {
  id: string;
  imageSrc: string;
  altText: string;
}

@Component({
  selector: 'app-vehicle-stage',
  standalone: true,
  imports: [CommonModule, IonBadge],
  templateUrl: './vehicle-stage.component.html',
  styleUrls: ['./vehicle-stage.component.scss'],
})
export class VehicleStageComponent {
  /** Single-image mode (used by catalog cards) */
  @Input() imageSrc = '';
  @Input() altText = 'Mitsubishi Vehicle';

  /** Multi-slide mode (used by the Hero Showcase carousel for smooth cross-fade + glide) */
  @Input() slides: VehicleStageSlide[] = [];
  @Input() activeIndex = 0;

  @Input() variant: 'hero' | 'card' = 'card';
  @Input() priority = false;
}
