import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEALERSHIP_CONFIG, NAV_MENU_ITEMS } from '../../../core/data/site-data';
import { DealershipConfig, NavMenuItem } from '../../../core/models/vehicle.model';
import { HalftoneBgComponent } from '../halftone-bg/halftone-bg.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HalftoneBgComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() activeRoute = '/home';

  readonly dealership: DealershipConfig = DEALERSHIP_CONFIG;
  readonly menuItems: NavMenuItem[] = NAV_MENU_ITEMS;

  readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
