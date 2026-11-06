import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonNote, IonText } from '@ionic/angular';

import type { VehicleModel, VehicleStageMode } from '../../../core/models/vehicle.model';
import { VehicleStageComponent } from '../vehicle-stage/vehicle-stage.component';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonText,
    IonNote,
    VehicleStageComponent,
  ],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent {
  @Input({ required: true }) vehicle!: VehicleModel;

  /**
   * Controls whether the card stage renders a 2D 'image', '3d' slot, or 'placeholder' ring.
   * Defaults to 'image' (used on the Home page), and can be set to 'placeholder' or '3d'
   * on the Models page or overridden per-vehicle in `site-data.ts`.
   */
  @Input() stageMode: VehicleStageMode = 'image';

  @Output() cardSelect = new EventEmitter<VehicleModel>();

  onSelect(): void {
    this.cardSelect.emit(this.vehicle);
  }
}
