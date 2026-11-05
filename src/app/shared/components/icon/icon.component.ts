import { Component, Input } from '@angular/core';

export type IconName =
  | 'pin'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'arrow-up';

/**
 * Lightweight inline SVG icon set (stroke icons inherit currentColor).
 * Usage: <app-icon name="phone" [size]="16" />
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name) {
        @case ('pin') {
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        }
        @case ('phone') {
          <path
            d="M21 16.5v3a1.5 1.5 0 0 1-1.6 1.5A17.5 17.5 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3h3a1.5 1.5 0 0 1 1.5 1.3c.1.9.4 1.8.7 2.6a1.5 1.5 0 0 1-.3 1.6L8.1 9.8a14 14 0 0 0 6.1 6.1l1.3-1.3a1.5 1.5 0 0 1 1.6-.3c.8.3 1.7.6 2.6.7a1.5 1.5 0 0 1 1.3 1.5Z"
          />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m3.5 6 8.5 7 8.5-7" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        }
        @case ('facebook') {
          <path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V8.9a.9.9 0 0 1 .5-.9Z" />
        }
        @case ('instagram') {
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
        }
        @case ('youtube') {
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
          <path d="m10.2 9.2 4.8 2.8-4.8 2.8Z" fill="currentColor" />
        }
        @case ('arrow-up') {
          <path d="M12 19V5M6 11l6-6 6 6" />
        }
      }
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
        flex-shrink: 0;
      }
    `,
  ],
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 16;
}
