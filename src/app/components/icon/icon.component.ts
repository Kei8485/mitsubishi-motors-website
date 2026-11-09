import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  arrowUpOutline,
  callOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  locationOutline,
  logoFacebook,
  logoInstagram,
  logoYoutube,
  mailOutline,
  timeOutline,
} from 'ionicons/icons';

addIcons({
  locationOutline,
  callOutline,
  mailOutline,
  timeOutline,
  logoFacebook,
  logoInstagram,
  logoYoutube,
  arrowUpOutline,
  arrowForwardOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
});

export type IconName = 'pin' | 'phone' | 'mail' | 'clock' | 'facebook' | 'instagram' | 'youtube' | 'arrow-up';

const ICON_NAME_MAP: Record<IconName, string> = {
  pin: 'location-outline',
  phone: 'call-outline',
  mail: 'mail-outline',
  clock: 'time-outline',
  facebook: 'logo-facebook',
  instagram: 'logo-instagram',
  youtube: 'logo-youtube',
  'arrow-up': 'arrow-up-outline',
};

/**
 * Ionic <ion-icon> wrapper that maps semantic icon names to registered Ionicons.
 * Usage: <app-icon name="phone" [size]="15" />
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [IonIcon],
  template: `
    <ion-icon
      [name]="ionIconName"
      [style.font-size.px]="size"
      [style.width.px]="size"
      [style.height.px]="size"
      aria-hidden="true"
    ></ion-icon>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        flex-shrink: 0;
      }

      ion-icon {
        display: block;
        color: currentColor;
      }
    `,
  ],
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 16;

  get ionIconName(): string {
    return ICON_NAME_MAP[this.name] ?? 'location-outline';
  }
}
