import { isPlatformBrowser } from '@angular/common';
import type { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, Input, NgZone, PLATFORM_ID, ViewChild, inject } from '@angular/core';

/**
 * =============================================================================
 * HALFTONE BAND BACKGROUND COMPONENT (`<app-halftone-band-bg />`)
 * =============================================================================
 * Renders a 60fps HTML5 Canvas halftone dot-grid animation tailored for sub-page
 * hero headers (such as the "CHOOSE YOUR MODEL" / See All Models page).
 *
 * VISUAL & ANIMATION CHARACTERISTICS:
 * 1. Near-black base surface (#0a0508) that fades cleanly to black at the top
 *    and bottom edges.
 * 2. A ~8px grid of round dots where dot SIZE (radius up to ~3px), rather than
 *    just opacity, creates the halftone gradient look.
 * 3. A horizontal crimson glow band (#c8102e, brighter at the core) positioned
 *    in the lower-middle of the hero section between the top bar and heading.
 * 4. The horizontal band slowly drifts up and down while a soft sine wave
 *    ripples dot sizes from left to right.
 * 5. Dots near the mouse cursor gently swell in radius and brightness.
 * =============================================================================
 */
@Component({
  selector: 'app-halftone-band-bg',
  standalone: true,
  templateUrl: './halftone-band-bg.component.html',
  styleUrls: ['./halftone-band-bg.component.scss'],
})
export class HalftoneBandBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bandCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  /** Spacing between dot centers in CSS pixels (default: 8px) */
  @Input() dotSpacing = 8;

  /** Maximum dot radius in CSS pixels at the brightest center of the band (default: 3px) */
  @Input() maxDotRadius = 3;

  /** Normalized vertical position of the glow band center (0 = top, 1 = bottom) */
  @Input() bandCenterY = 0.56;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private startTime = 0;

  // Cached canvas metrics to avoid layout thrashing during the 60fps loop
  private canvasWidth = 0;
  private canvasHeight = 0;
  private dpr = 1;
  private parentRect: DOMRect | null = null;

  // Mouse state in CSS pixels relative to the canvas (smoothed each frame)
  private mouseTargetX = -9999;
  private mouseTargetY = -9999;
  private mouseCurrentX = -9999;
  private mouseCurrentY = -9999;
  private isMouseInside = false;

  // Bound event listeners for clean removal on destroy
  private readonly onWindowMouseMove = (e: MouseEvent): void => {
    if (!this.parentRect) return;
    const localX = e.clientX - this.parentRect.left;
    const localY = e.clientY - this.parentRect.top;

    // Track cursor when within or near the hero bounds
    if (
      localX >= -80 &&
      localX <= this.parentRect.width + 80 &&
      localY >= -80 &&
      localY <= this.parentRect.height + 80
    ) {
      this.mouseTargetX = localX;
      this.mouseTargetY = localY;
      if (!this.isMouseInside) {
        this.mouseCurrentX = localX;
        this.mouseCurrentY = localY;
        this.isMouseInside = true;
      }
    } else {
      this.isMouseInside = false;
    }
  };

  private readonly onWindowScrollOrResize = (): void => {
    const parent = this.canvasRef?.nativeElement?.parentElement;
    if (parent) {
      this.parentRect = parent.getBoundingClientRect();
    }
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startTime = performance.now();

    // Run canvas setup, listeners, and 60fps loop outside Angular zone for peak performance
    this.ngZone.runOutsideAngular(() => {
      this.setupCanvas();
      window.addEventListener('mousemove', this.onWindowMouseMove, { passive: true });
      window.addEventListener('scroll', this.onWindowScrollOrResize, { passive: true, capture: true });
      window.addEventListener('resize', this.onWindowScrollOrResize, { passive: true });
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
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.onWindowMouseMove);
      window.removeEventListener('scroll', this.onWindowScrollOrResize, true);
      window.removeEventListener('resize', this.onWindowScrollOrResize);
    }
  }

  /**
   * Initializes canvas sizing and attaches a ResizeObserver so resizing the
   * browser window updates the canvas dimensions smoothly without lag.
   */
  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const updateSize = (): void => {
      const rect = parent.getBoundingClientRect();
      this.parentRect = rect;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvasWidth = Math.max(1, Math.floor(rect.width * this.dpr));
      this.canvasHeight = Math.max(1, Math.floor(rect.height * this.dpr));
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
    };

    updateSize();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => updateSize());
      this.resizeObserver.observe(parent);
    }
  }

  /**
   * 60fps requestAnimationFrame loop.
   */
  private readonly renderLoop = (now: number): void => {
    const elapsedSeconds = (now - this.startTime) * 0.001;
    this.drawFrame(elapsedSeconds);
    this.animationFrameId = requestAnimationFrame(this.renderLoop);
  };

  /**
   * Renders a single frame of the halftone dot-grid animation.
   * @param t Elapsed time in seconds
   */
  private drawFrame(t: number): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = this.canvasWidth;
    const height = this.canvasHeight;
    if (width === 0 || height === 0) return;

    const dpr = this.dpr;
    const step = this.dotSpacing * dpr;
    const maxRadius = this.maxDotRadius * dpr;

    // 1. Fill background with near-black (#0a0508)
    ctx.fillStyle = '#0a0508';
    ctx.fillRect(0, 0, width, height);

    // Smoothly interpolate cursor coordinates for fluid mouse interaction
    if (this.isMouseInside) {
      this.mouseCurrentX += (this.mouseTargetX - this.mouseCurrentX) * 0.14;
      this.mouseCurrentY += (this.mouseTargetY - this.mouseCurrentY) * 0.14;
    } else {
      this.mouseCurrentX = -9999;
      this.mouseCurrentY = -9999;
    }

    const mouseX = this.mouseCurrentX * dpr;
    const mouseY = this.mouseCurrentY * dpr;
    const mouseRadius = 135 * dpr; // Influence radius around the cursor
    const mouseRadiusSq = mouseRadius * mouseRadius;

    const cols = Math.ceil(width / step);
    const rows = Math.ceil(height / step);

    // 2. Slow vertical drift of the horizontal glow band
    const verticalDrift = Math.sin(t * 0.65) * 0.045;

    for (let r = 0; r < rows; r++) {
      const y = (r + 0.5) * step;
      const ny = y / height; // Normalized Y: 0 (top) -> 1 (bottom)

      // 3. Top and bottom edge fade to full black so edges blend seamlessly
      const topEdgeFade = Math.min(1, ny / 0.18);
      const bottomEdgeFade = Math.min(1, (1 - ny) / 0.22);
      const edgeMask = topEdgeFade * bottomEdgeFade;
      if (edgeMask <= 0.01) continue;

      for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * step;
        const nx = x / width; // Normalized X: 0 (left) -> 1 (right)

        // 4. Soft wave undulation along the band centerline (moving left to right)
        const bandCurve =
          Math.sin(nx * 5.2 - t * 1.15) * 0.045 +
          Math.cos(nx * 2.8 + t * 0.7) * 0.025;

        const dynamicBandY = this.bandCenterY + verticalDrift + bandCurve;

        // Gaussian bell-curve distance from the horizontal glow band center
        const distFromBand = (ny - dynamicBandY) / 0.23;
        const bandIntensity = Math.exp(-(distFromBand * distFromBand));

        // 5. Left-to-right rippling wave that modulates dot size along the grid
        const rippleWave =
          Math.sin(nx * 10.0 - t * 1.85 + ny * 3.0) * 0.5 +
          Math.cos(nx * 5.5 - t * 1.1 - ny * 2.2) * 0.5;
        const rippleFactor = 0.78 + rippleWave * 0.22; // 0.56 .. 1.0

        // Combine vertical band bell-curve, horizontal ripple, and top/bottom edge fade
        let intensity = bandIntensity * rippleFactor * edgeMask;

        // 6. Mouse cursor interaction: dots near the cursor grow slightly
        if (this.isMouseInside) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadiusSq) {
            const proximity = 1 - Math.sqrt(distSq) / mouseRadius;
            // Smooth cubic falloff for natural cursor swell
            const cursorBoost = proximity * proximity * (3 - 2 * proximity);
            intensity = Math.min(1, intensity + cursorBoost * 0.36 * edgeMask);
          }
        }

        // Skip sub-pixel invisible dots near the top/bottom black edges
        if (intensity < 0.035) continue;

        // 7. Dot SIZE changes with intensity (shrinking to 0 toward top/bottom, up to ~3px at band center)
        const radius = maxRadius * Math.pow(intensity, 0.92);
        if (radius < 0.25 * dpr) continue;

        // 8. Dot COLOR: Mitsubishi crimson (#c8102e -> rgb(200, 16, 46)), brighter at band center
        let red: number;
        let green: number;
        let blue: number;
        let alpha: number;

        if (intensity < 0.65) {
          // Outer band -> core crimson (#c8102e)
          const k = intensity / 0.65;
          red = Math.floor(110 + k * 90);   // 110 -> 200
          green = Math.floor(8 + k * 8);    // 8   -> 16
          blue = Math.floor(20 + k * 26);   // 20  -> 46
          alpha = 0.45 + k * 0.45;
        } else {
          // Band center highlight: brighter crimson-scarlet core
          const k = (intensity - 0.65) / 0.35;
          red = Math.floor(200 + k * 48);   // 200 -> 248
          green = Math.floor(16 + k * 34);  // 16  -> 50
          blue = Math.floor(46 + k * 14);   // 46  -> 60
          alpha = 0.9 + k * 0.1;
        }

        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
