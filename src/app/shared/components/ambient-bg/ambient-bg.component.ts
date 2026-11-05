import { Component } from '@angular/core';

/**
 * Minimal ambient background for long content sections.
 * Slow-drifting crimson light pools + a faint panning dot grid.
 * Place inside any `position: relative` wrapper: <app-ambient-bg />
 */
@Component({
  selector: 'app-ambient-bg',
  standalone: true,
  template: `
    <div class="mm-ambient__grid"></div>
    <div class="mm-ambient__glow mm-ambient__glow--a"></div>
    <div class="mm-ambient__glow mm-ambient__glow--b"></div>
    <div class="mm-ambient__glow mm-ambient__glow--c"></div>
    <div class="mm-ambient__scan"></div>
  `,
  styleUrls: ['./ambient-bg.component.scss'],
  host: { 'aria-hidden': 'true' },
})
export class AmbientBgComponent {}
