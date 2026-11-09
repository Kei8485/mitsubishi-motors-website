import { isPlatformBrowser } from '@angular/common';
import type { AfterViewInit, OnDestroy } from '@angular/core';
import { Component, ElementRef, NgZone, PLATFORM_ID, inject } from '@angular/core';

/**
 * Ambient background for lower content sections (Home & Models pages).
 * Combines slow-drifting crimson light pools, a panning dot grid, and an
 * interactive cursor-following crimson spotlight + grid parallax.
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
    <div class="mm-ambient__cursor-glow"></div>
    <div class="mm-ambient__scan"></div>
  `,
  styleUrls: ['./ambient-bg.component.scss'],
  host: { 'aria-hidden': 'true' },
})
export class AmbientBgComponent implements AfterViewInit, OnDestroy {
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private animationFrameId: number | null = null;
  private targetX = -9999;
  private targetY = -9999;
  private currentX = -9999;
  private currentY = -9999;
  private isInside = false;

  private readonly onMouseMove = (e: MouseEvent): void => {
    const host = this.hostRef.nativeElement;
    const rect = host.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    if (
      localX >= -200 &&
      localX <= rect.width + 200 &&
      localY >= -200 &&
      localY <= rect.height + 200
    ) {
      this.targetX = localX;
      this.targetY = localY;
      if (!this.isInside) {
        this.currentX = localX;
        this.currentY = localY;
        this.isInside = true;
        host.style.setProperty('--cursor-opacity', '1');
      }
    } else if (this.isInside) {
      this.isInside = false;
      host.style.setProperty('--cursor-opacity', '0');
    }
  };

  private readonly onMouseLeave = (): void => {
    this.isInside = false;
    this.hostRef.nativeElement.style.setProperty('--cursor-opacity', '0');
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      document.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
      this.tick();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }

  private readonly tick = (): void => {
    if (this.isInside) {
      this.currentX += (this.targetX - this.currentX) * 0.12;
      this.currentY += (this.targetY - this.currentY) * 0.12;
      const host = this.hostRef.nativeElement;
      host.style.setProperty('--cursor-x', `${this.currentX.toFixed(1)}px`);
      host.style.setProperty('--cursor-y', `${this.currentY.toFixed(1)}px`);
    }
    this.animationFrameId = requestAnimationFrame(this.tick);
  };
}
