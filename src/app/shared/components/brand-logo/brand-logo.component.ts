import { Component, Input } from '@angular/core';

/**
 * Mitsubishi Three-Diamond emblem (authored SVG, scales crisply at any size).
 * Usage: <app-brand-logo [size]="28" />   — color follows `color` / currentColor.
 */
@Component({
  selector: 'app-brand-logo',
  standalone: true,
  template: `
    <svg
      class="mm-brand-logo"
      [attr.width]="size"
      [attr.height]="size * 0.866"
      viewBox="6.7 0 86.6 75"
      role="img"
      aria-label="Mitsubishi Motors"
    >
      <g fill="currentColor">
        <path d="M50 0 L64.43 25 L50 50 L35.57 25 Z" />
        <path d="M50 0 L64.43 25 L50 50 L35.57 25 Z" transform="rotate(120 50 50)" />
        <path d="M50 0 L64.43 25 L50 50 L35.57 25 Z" transform="rotate(240 50 50)" />
      </g>
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
        color: var(--mm-red-bright);
      }
      .mm-brand-logo {
        display: block;
        flex-shrink: 0;
      }
    `,
  ],
})
export class BrandLogoComponent {
  /** Rendered width in px (height is derived from the emblem's aspect ratio) */
  @Input() size = 28;
}
