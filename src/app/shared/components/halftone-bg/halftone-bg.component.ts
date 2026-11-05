import { isPlatformBrowser } from '@angular/common';
import type { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, Input, NgZone, PLATFORM_ID, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-halftone-bg',
  standalone: true,
  templateUrl: './halftone-bg.component.html',
  styleUrls: ['./halftone-bg.component.scss'],
})
export class HalftoneBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('halftoneCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  /** Grid spacing in CSS pixels (matches the tight 8px halftone matrix in the reference) */
  @Input() dotSpacing = 8;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private startTime = 0;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startTime = performance.now();
    this.ngZone.runOutsideAngular(() => {
      this.setupCanvas();
      this.renderLoop(performance.now());
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const updateSize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };

    updateSize();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => updateSize());
      this.resizeObserver.observe(parent);
    }
  }

  private renderLoop = (now: number): void => {
    this.drawFrame((now - this.startTime) * 0.001);
    this.animationFrameId = requestAnimationFrame(this.renderLoop);
  };

  private drawFrame(t: number): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const step = this.dotSpacing * dpr;

    // Clear with deep carbon black (#070506)
    ctx.fillStyle = '#070506';
    ctx.fillRect(0, 0, width, height);

    const cols = Math.ceil(width / step);
    const rows = Math.ceil(height / step);

    // Organic wave drift
    const time = t * 0.65;

    for (let r = 0; r < rows; r++) {
      const y = (r + 0.5) * step;
      const ny = y / height; // 0..1 top to bottom

      // Fade out smoothly at the very bottom edge into the page background
      const bottomFade = ny > 0.78 ? Math.max(0, 1 - (ny - 0.78) / 0.22) : 1;
      if (bottomFade <= 0.01) continue;

      for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * step;
        const nx = x / width; // 0..1 left to right

        // Multi-layered interference waves creating organic dark channels & glowing red clusters
        const wave1 = Math.sin(nx * 6.8 + time * 0.9 + Math.cos(ny * 4.2 - time * 0.6) * 1.4);
        const wave2 = Math.cos(ny * 7.5 - time * 0.75 + Math.sin(nx * 5.2 + time * 0.5) * 1.3);
        const wave3 = Math.sin((nx + ny) * 9.0 - time * 1.1);

        // Combine waves into 0..1 plasma field
        let intensity = (wave1 * 0.42 + wave2 * 0.38 + wave3 * 0.2 + 1) * 0.5;

        // Hotspot boosts matching the reference screenshot:
        // 1) Center podium & title core glow
        const dxCenter = (nx - 0.5) / 0.36;
        const dyCenter = (ny - 0.58) / 0.28;
        const centerSpot = Math.exp(-(dxCenter * dxCenter + dyCenter * dyCenter));

        // 2) Upper-right & upper-left dramatic halftone clouds
        const dxTopRight = (nx - 0.86) / 0.26;
        const dyTopRight = (ny - 0.26) / 0.25;
        const topRightSpot = Math.exp(-(dxTopRight * dxTopRight + dyTopRight * dyTopRight));

        const dxTopLeft = (nx - 0.14) / 0.25;
        const dyTopLeft = (ny - 0.24) / 0.24;
        const topLeftSpot = Math.exp(-(dxTopLeft * dxTopLeft + dyTopLeft * dyTopLeft));

        intensity = intensity * 0.72 + centerSpot * 0.52 + topRightSpot * 0.42 + topLeftSpot * 0.38;

        // Carve sharp organic dark ribbons like the reference image
        const ribbon = Math.abs(Math.sin(nx * 4.4 - ny * 3.1 + time * 0.45));
        if (ribbon < 0.22) {
          intensity *= ribbon / 0.22;
        }

        intensity = Math.min(1, Math.max(0, (intensity - 0.16) * 1.28)) * bottomFade;

        if (intensity < 0.04) continue;

        // Modulate dot radius and color from dark maroon -> crimson -> bright scarlet-orange core
        const radius = step * (0.14 + Math.min(0.34, intensity * 0.32));

        let red: number;
        let green: number;
        let blue: number;
        let alpha: number;

        if (intensity < 0.45) {
          // Deep wine / dark crimson dots
          const k = intensity / 0.45;
          red = Math.floor(65 + k * 125);
          green = Math.floor(6 + k * 10);
          blue = Math.floor(12 + k * 18);
          alpha = 0.35 + k * 0.45;
        } else if (intensity < 0.8) {
          // Vibrant Mitsubishi crimson red dots
          const k = (intensity - 0.45) / 0.35;
          red = Math.floor(190 + k * 55);
          green = Math.floor(16 + k * 22);
          blue = Math.floor(30 - k * 8);
          alpha = 0.8 + k * 0.15;
        } else {
          // Hot scarlet-orange core highlights
          const k = (intensity - 0.8) / 0.2;
          red = 255;
          green = Math.floor(38 + k * 58);
          blue = Math.floor(22 + k * 18);
          alpha = 0.95;
        }

        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
