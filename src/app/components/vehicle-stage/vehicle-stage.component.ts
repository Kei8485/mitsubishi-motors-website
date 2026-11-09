import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonBadge } from '@ionic/angular';

import { DEFAULT_VEHICLE_HOVER_FX } from '../../core/data/site-data';
import type { VehicleHoverFX, VehicleStageMode } from '../../core/models/vehicle.model';

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
  /**
   * Stage rendering mode:
   * - 'image'       : Displays 2D cutout PNG (`imageSrc`) on the turntable podium
   * - 'placeholder' : Leaves the 3D elliptical turntable wireframe ring (prototype placeholder)
   * - '3d'          : Renders the interactive 3D viewer slot (`model3dSrc` or projected `[stage3d]`)
   */
  @Input() stageMode: VehicleStageMode = 'image';

  /** Single-image mode (used when stageMode === 'image') */
  @Input() imageSrc = '';
  @Input() altText = 'Mitsubishi Vehicle';

  /** Optional 3D model URL (.glb / .gltf) used when stageMode === '3d' */
  @Input() model3dSrc = '';

  /** Reusable hover showcase FX configuration from `site-data.ts` */
  @Input() hoverFx?: VehicleHoverFX;

  /** Multi-slide mode (used by the Hero Showcase carousel for smooth cross-fade + glide) */
  @Input() slides: VehicleStageSlide[] = [];
  @Input() activeIndex = 0;

  @Input() variant: 'hero' | 'card' = 'card';
  @Input() priority = false;

  /** Merged hover FX config combining defaults from `site-data.ts` with any per-car overrides */
  get fx(): Required<Omit<VehicleHoverFX, 'customBackdrop'>> & { customBackdrop?: string } {
    return {
      ...DEFAULT_VEHICLE_HOVER_FX,
      ...(this.hoverFx ?? {}),
    };
  }
}
