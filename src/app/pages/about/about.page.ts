import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonBadge,
  IonContent,
  IonGrid,
} from '@ionic/angular';

import { DEALERSHIP_CONFIG } from '../../core/data/site-data';
import { AmbientBgComponent } from '../../components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HalftoneBandBgComponent } from '../../components/halftone-band-bg/halftone-band-bg.component';
import { HeaderComponent } from '../../components/header/header.component';

export interface TeamMemberCard {
  index: string;
  numericIndex: number;
  codeTag: string;
  fullName: string;
  surname: string;
  givenName: string;
  initials: string;
  role: string;
  moduleFocus: string;
  description: string;
}

export interface AccentPaletteOption {
  id: string;
  label: string;
  hex: string;
  rgb: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonGrid,
    IonBadge,
    HeaderComponent,
    HalftoneBandBgComponent,
    AmbientBgComponent,
    FooterComponent,
  ],
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {
  readonly dealership = DEALERSHIP_CONFIG;
  readonly companyName = 'ITELLECT PRIVATE LIMITED COMPANY';
  readonly caseStudyCode = 'ITIPT02 CASE STUDY';

  /**
   * 10 Group Members of ITELLECT Private Limited Company
   * Listed in the exact order provided by the user, with Bautista, Ynand Andrei flagged with isMe: true
   */
  readonly teamMembers: TeamMemberCard[] = [
    {
      index: '01',
      numericIndex: 0,
      codeTag: 'EXP // INFO-01',
      fullName: 'Abenales, Matthew',
      surname: 'ABENALES',
      givenName: 'MATTHEW',
      initials: 'MA',
      role: 'CHIEF INFORMATION OFFICER',
      moduleFocus: 'ENTERPRISE DATA & VEHICLE INVENTORY',
      description:
        'Oversees vehicle specifications, dealership data pipelines, and fleet inventory allocation across Central Luzon.',
    },
    {
      index: '02',
      numericIndex: 1,
      codeTag: 'EXP // TECH-02',
      fullName: 'Bautista, Ynand Andrei',
      surname: 'BAUTISTA',
      givenName: 'YNAND ANDREI',
      initials: 'YB',
      role: 'CHIEF TECHNOLOGY OFFICER & LEAD DEVELOPER',
      moduleFocus: 'PLATFORM ARCHITECTURE & DIGITAL SYSTEMS',
      description:
        'Spearheaded the end-to-end digital showroom engineering, technical system architecture, and interactive dealership platform.',
    },
    {
      index: '03',
      numericIndex: 2,
      codeTag: 'EXP // DSGN-03',
      fullName: 'Caspe, Dhaydee Sofia',
      surname: 'CASPE',
      givenName: 'DHAYDEE SOFIA',
      initials: 'DC',
      role: 'HEAD OF BRAND DESIGN & CUSTOMER EXPERIENCE',
      moduleFocus: 'DEALERSHIP IDENTITY & SPATIAL STYLING',
      description:
        'Leads brand visual standards, customer touchpoint design, and luxury showroom presentation guidelines.',
    },
    {
      index: '04',
      numericIndex: 3,
      codeTag: 'EXP // FINC-04',
      fullName: 'Correa, Clarence',
      surname: 'CORREA',
      givenName: 'CLARENCE',
      initials: 'CC',
      role: 'FINANCIAL CONTROLLER & CREDIT HEAD',
      moduleFocus: 'AUTO FINANCING & CHATTEL MORTGAGE',
      description:
        'Manages banking partner tie-ups, chattel mortgage structuring, flexible monthly amortization plans, and customer credit evaluations.',
    },
    {
      index: '05',
      numericIndex: 4,
      codeTag: 'EXP // SHOW-05',
      fullName: 'Cruzada, Gabriel',
      surname: 'CRUZADA',
      givenName: 'GABRIEL',
      initials: 'GC',
      role: 'SHOWROOM OPERATIONS & FLEET MANAGER',
      moduleFocus: '2026 VEHICLE SHOWCASE & PRODUCT LINEUP',
      description:
        'Directs the 2026 model lineup rollout, dealership floor staging, trim-level packages, and customer walkaround consultations.',
    },
    {
      index: '06',
      numericIndex: 5,
      codeTag: 'EXP // SRVC-06',
      fullName: 'Domingo, Joyce Ericha',
      surname: 'DOMINGO',
      givenName: 'JOYCE ERICHA',
      initials: 'JD',
      role: 'SERVICE DIRECTOR & AFTER-SALES HEAD',
      moduleFocus: 'PREVENTIVE MAINTENANCE & SERVICE CARE',
      description:
        'Supervises the Cabanatuan Service Center, certified technician dispatch, preventive maintenance scheduling (PMS), and warranty protection.',
    },
    {
      index: '07',
      numericIndex: 6,
      codeTag: 'EXP // QUAL-07',
      fullName: 'Gonzaga, Irish',
      surname: 'GONZAGA',
      givenName: 'IRISH',
      initials: 'IG',
      role: 'QUALITY ASSURANCE & CLIENT RELATIONS LEAD',
      moduleFocus: 'CUSTOMER CARE & DEALERSHIP AUDIT',
      description:
        'Ensures ISO service compliance, dealership customer satisfaction (CSI) scores, and inquiry response protocols.',
    },
    {
      index: '08',
      numericIndex: 7,
      codeTag: 'EXP // DRVE-08',
      fullName: 'Gabatino, Samuel',
      surname: 'GABATINO',
      givenName: 'SAMUEL',
      initials: 'SG',
      role: 'TEST DRIVE LOGISTICS & VIP CLIENT MANAGER',
      moduleFocus: 'CUSTOMER DRIVE EXPERIENCE & FLEET DEMOS',
      description:
        'Coordinates on-road vehicle demonstrations, VIP customer test drive itineraries, and vehicle readiness protocols in Cabanatuan.',
    },
    {
      index: '09',
      numericIndex: 8,
      codeTag: 'EXP // CREA-09',
      fullName: 'Ligon, Kurt Dan Amos',
      surname: 'LIGON',
      givenName: 'KURT DAN AMOS',
      initials: 'KL',
      role: 'CREATIVE DIRECTOR & MEDIA RELATIONS',
      moduleFocus: 'VISUAL CAMPAIGNS & DIGITAL MEDIA',
      description:
        'Orchestrates multimedia marketing campaigns, digital promotional assets, and brand storytelling for the dealership.',
    },
    {
      index: '10',
      numericIndex: 9,
      codeTag: 'EXP // EXEC-10',
      fullName: 'Padilla, Kyle Casper',
      surname: 'PADILLA',
      givenName: 'KYLE CASPER',
      initials: 'KP',
      role: 'DEALER PRINCIPAL & MANAGING DIRECTOR',
      moduleFocus: 'CABANATUAN DEALERSHIP STRATEGY & OPERATIONS',
      description:
        'Steers regional market operations, Nueva Ecija dealership expansion, strategic partnerships, and general management.',
    },
  ];

  /**
   * Fiddle.Digital-inspired live color palette switcher
   * Allows dynamically re-tinting the 3D experimental stage in real time
   */
  readonly accentPalettes: AccentPaletteOption[] = [
    { id: 'crimson', label: 'MITSUBISHI RED', hex: '#e01637', rgb: '224, 22, 55' },
    { id: 'emerald', label: 'CYBER EMERALD', hex: '#36e278', rgb: '54, 226, 120' },
    { id: 'amber', label: 'SOLAR AMBER', hex: '#f5a623', rgb: '245, 166, 35' },
    { id: 'ice', label: 'TITANIUM ICE', hex: '#4da3ff', rgb: '77, 163, 255' },
    { id: 'mono', label: 'PURE PLATINUM', hex: '#ffffff', rgb: '255, 255, 255' },
  ];

  readonly activePalette = signal<AccentPaletteOption>(this.accentPalettes[0]);

  /** View mode switcher: 'ribbon' (3D curved Fiddle ribbon) or 'roster' (Kinetic editorial list) */
  readonly viewMode = signal<'ribbon' | 'roster'>('ribbon');

  /**
   * Continuous floating-point scroll position across the 10 cards in an infinite circular loop.
   * Starts at 0 so "01 — Abenales, Matthew" is centered on initial load.
   */
  readonly ribbonProgress = signal<number>(0);
  readonly ribbonVelocity = signal<number>(0);
  readonly activeIndex = computed<number>(() => {
    return this.normalizeIndex(this.ribbonProgress());
  });
  readonly activeMember = computed<TeamMemberCard>(() => {
    return this.teamMembers[this.activeIndex()] ?? this.teamMembers[0];
  });

  readonly hoveredRosterIndex = signal<number>(0);

  // Internal physics state for smooth 60fps requestAnimationFrame interpolation
  private targetProgress = 0;
  private currentProgress = 0;
  private rafId: number | null = null;
  private wheelSnapTimer: ReturnType<typeof setTimeout> | null = null;
  private isPointerDown = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartProgress = 0;
  private dragAxis: 'undecided' | 'x' | 'y' = 'undecided';
  private didDrag = false;

  ngOnInit(): void {
    this.startPhysicsLoop();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.wheelSnapTimer !== null) {
      clearTimeout(this.wheelSnapTimer);
      this.wheelSnapTimer = null;
    }
  }

  /** Smoothly scroll down to the Fiddle.Digital 3D Team Showcase */
  scrollToTeamShowcase(): void {
    const el = document.getElementById('fiddle-team-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  setViewMode(mode: 'ribbon' | 'roster'): void {
    this.viewMode.set(mode);
  }

  selectPalette(palette: AccentPaletteOption): void {
    this.activePalette.set(palette);
  }

  /** Jump camera smoothly to a specific team member card (0..9) along the shortest circular path */
  focusMember(index: number): void {
    const offset = this.getCircularOffset(index, this.targetProgress);
    this.targetProgress = Math.round(this.targetProgress + offset);
    this.hoveredRosterIndex.set(this.normalizeIndex(this.targetProgress));
  }

  onCardClick(index: number): void {
    if (this.didDrag) {
      return;
    }
    this.focusMember(index);
  }

  stepMember(delta: number): void {
    this.targetProgress = Math.round(this.targetProgress) + delta;
    this.hoveredRosterIndex.set(this.normalizeIndex(this.targetProgress));
  }

  /**
   * Desktop mouse wheel / trackpad scrubbing inside the 3D ribbon stage.
   * Always prevents main page scrolling on desktop and loops continuously in a circle.
   */
  onRibbonWheel(event: WheelEvent): void {
    // On touch-only devices, disable scroll-wheel rotation so vertical swipes scroll the main page
    if (this.isTouchOnlyDevice()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    const step = dominantDelta * 0.0042;
    this.targetProgress += step;
    this.hoveredRosterIndex.set(this.normalizeIndex(this.targetProgress));

    if (this.wheelSnapTimer !== null) {
      clearTimeout(this.wheelSnapTimer);
    }
    this.wheelSnapTimer = setTimeout(() => {
      this.targetProgress = Math.round(this.targetProgress);
      this.hoveredRosterIndex.set(this.normalizeIndex(this.targetProgress));
    }, 160);
  }

  /** Pointer drag / swipe handling on the 3D ribbon */
  onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    this.isPointerDown = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragStartProgress = this.targetProgress;
    this.dragAxis = 'undecided';
    this.didDrag = false;
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isPointerDown) {
      return;
    }

    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;

    if (this.dragAxis === 'undecided') {
      const distance = Math.hypot(deltaX, deltaY);
      if (distance < 6) {
        return;
      }

      // On touch devices, if the user swipes vertically, let the main page scroll naturally
      if (event.pointerType !== 'mouse' && Math.abs(deltaY) > Math.abs(deltaX)) {
        this.dragAxis = 'y';
        this.isPointerDown = false;
        return;
      }

      this.dragAxis = 'x';
      this.didDrag = true;
    }

    if (this.dragAxis !== 'x') {
      return;
    }

    const cardSpacingPx = 280;
    this.targetProgress = this.dragStartProgress - deltaX / cardSpacingPx;
    this.hoveredRosterIndex.set(this.normalizeIndex(this.targetProgress));
  }

  onPointerUp(): void {
    if (!this.isPointerDown) {
      return;
    }
    this.isPointerDown = false;
    this.dragAxis = 'undecided';
    // Snap gently to the nearest card in the circular loop after releasing drag
    this.targetProgress = Math.round(this.targetProgress);
    this.hoveredRosterIndex.set(this.normalizeIndex(this.targetProgress));
  }

  /**
   * Computes the 3D cylindrical circular loop CSS transform for each member card
   */
  getCardStyle(index: number): Record<string, string> {
    const progress = this.ribbonProgress();
    const velocity = this.ribbonVelocity();
    const offset = this.getCircularOffset(index, progress);
    const absOffset = Math.abs(offset);

    // Horizontal arc spread + cylindrical depth drop + Y rotation bend + velocity skew
    const translateX = offset * 295;
    const translateZ = -Math.pow(absOffset, 1.28) * 135;
    const translateY = Math.pow(absOffset, 1.6) * 14;
    const rotateY = offset * -18;
    const rotateZ = offset * 1.6 - velocity * 14;
    const scale = Math.max(0.72, 1 - absOffset * 0.065);
    const opacity =
      absOffset >= 3.8 ? 0 : Math.max(0, 1 - Math.max(0, absOffset - 0.25) * 0.32);
    const zIndex = Math.round(100 - absOffset * 20);

    return {
      transform: `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
      opacity: opacity.toFixed(3),
      'z-index': String(zIndex),
      'pointer-events': absOffset > 2.6 ? 'none' : 'auto',
      visibility: opacity <= 0.01 ? 'hidden' : 'visible',
    };
  }

  /** Normalizes any arbitrary continuous progress value into a valid teamMembers index (0..length-1) */
  private normalizeIndex(value: number): number {
    const len = this.teamMembers.length;
    return ((Math.round(value) % len) + len) % len;
  }

  /** Computes the shortest signed circular distance (-length/2 .. +length/2) from progress to index */
  private getCircularOffset(index: number, progress: number): number {
    const len = this.teamMembers.length;
    const normalizedProgress = ((progress % len) + len) % len;
    let offset = index - normalizedProgress;
    if (offset > len / 2) {
      offset -= len;
    } else if (offset < -len / 2) {
      offset += len;
    }
    return offset;
  }

  private isTouchOnlyDevice(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return (
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(any-pointer: fine)').matches
    );
  }

  private startPhysicsLoop(): void {
    const tick = () => {
      const diff = this.targetProgress - this.currentProgress;
      const step = diff * 0.095;
      this.currentProgress += step;

      if (Math.abs(diff) > 0.0005 || Math.abs(this.ribbonVelocity()) > 0.0005) {
        this.ribbonProgress.set(this.currentProgress);
        this.ribbonVelocity.set(Math.max(-0.45, Math.min(0.45, step)));
      } else if (this.ribbonVelocity() !== 0) {
        this.ribbonVelocity.set(0);
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }
}
