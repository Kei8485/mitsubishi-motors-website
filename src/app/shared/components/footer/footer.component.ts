import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEALERSHIP_CONFIG } from '../../../core/data/site-data';
import { DealershipConfig } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;
}
