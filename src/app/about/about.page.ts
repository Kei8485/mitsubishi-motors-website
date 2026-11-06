import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonBadge,
  IonContent,
  IonGrid,
} from '@ionic/angular';

import { DEALERSHIP_CONFIG } from '../core/data/site-data';
import { AmbientBgComponent } from '../shared/components/ambient-bg/ambient-bg.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HalftoneBandBgComponent } from '../shared/components/halftone-band-bg/halftone-band-bg.component';
import { HeaderComponent } from '../shared/components/header/header.component';

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
  isMe?: boolean;
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
      codeTag: 'EXP // MTRX-01',
      fullName: 'Abenales, Matthew',
      surname: 'ABENALES',
      givenName: 'MATTHEW',
      initials: 'MA',
      role: 'SYSTEMS & DATA ARCHITECT',
      moduleFocus: '2026 VEHICLE CATALOG & SPEC ENGINE',
      description:
        'Structured the 2026 Mitsubishi technical specifications, trim pricing matrices, and dealership telemetry schema.',
    },
    {
      index: '02',
      numericIndex: 1,
      codeTag: 'LEAD // CREATOR-02',
      fullName: 'Bautista, Ynand Andrei',
      surname: 'BAUTISTA',
      givenName: 'YNAND ANDREI',
      initials: 'YB',
      role: 'LEAD ARCHITECT & FRONTEND ENGINEER',
      moduleFocus: 'CORE PLATFORM, UI/UX & INTERACTIVE FX',
      description:
        'Spearheaded the end-to-end Ionic + Angular Signals architecture, Cabanatuan dealership flows, and interactive 3D/Canvas visual systems.',
      isMe: true,
    },
    {
      index: '03',
      numericIndex: 2,
      codeTag: 'EXP // DSGN-03',
      fullName: 'Caspe, Dhaydee Sofia',
      surname: 'CASPE',
      givenName: 'DHAYDEE SOFIA',
      initials: 'DC',
      role: 'UI/UX & INTERACTION DESIGNER',
      moduleFocus: 'WIREFRAMES & RESPONSIVE DESIGN SYSTEM',
      description:
        'Crafted the multi-viewport layout hierarchy across Desktop (1440px), Tablet (820px), and Mobile showroom interfaces.',
    },
    {
      index: '04',
      numericIndex: 3,
      codeTag: 'EXP // FINC-04',
      fullName: 'Correa, Clarence',
      surname: 'CORREA',
      givenName: 'CLARENCE',
      initials: 'CC',
      role: 'FINANCING MODULE SPECIALIST',
      moduleFocus: 'AMORTIZATION & VOUCHER RECEIPT FLOW',
      description:
        'Engineered the chattel mortgage calculation logic, down payment sliders, and instant pre-qualification receipt generator.',
    },
    {
      index: '05',
      numericIndex: 4,
      codeTag: 'EXP // SHOW-05',
      fullName: 'Cruzada, Gabriel',
      surname: 'CRUZADA',
      givenName: 'GABRIEL',
      initials: 'GC',
      role: 'SHOWROOM & CONFIGURATOR DEVELOPER',
      moduleFocus: 'INTERACTIVE COLOR & STAGE TURNTABLE',
      description:
        'Developed the 2026 vehicle detail showcase, live paint swatch switcher, and environmental hover lighting presets.',
    },
    {
      index: '06',
      numericIndex: 5,
      codeTag: 'EXP // SRVC-06',
      fullName: 'Domingo, Joyce Ericha',
      surname: 'DOMINGO',
      givenName: 'JOYCE ERICHA',
      initials: 'JD',
      role: 'AFTER-SALES & UX RESEARCHER',
      moduleFocus: 'PMS SCHEDULING & SERVICE WORKFLOW',
      description:
        'Designed the Cabanatuan Service Center booking workflow, preventive maintenance cards, and warranty coverage guides.',
    },
    {
      index: '07',
      numericIndex: 6,
      codeTag: 'EXP // QUAL-07',
      fullName: 'Gonzaga, Irish',
      surname: 'GONZAGA',
      givenName: 'IRISH',
      initials: 'IG',
      role: 'QUALITY ASSURANCE & VALIDATION LEAD',
      moduleFocus: 'FORM VALIDATION & ACCESSIBILITY',
      description:
        'Implemented real-time Philippine mobile/email input validation, error state feedback, and cross-device usability testing.',
    },
    {
      index: '08',
      numericIndex: 7,
      codeTag: 'EXP // DRVE-08',
      fullName: 'Gabatino, Samuel',
      surname: 'GABATINO',
      givenName: 'SAMUEL',
      initials: 'SG',
      role: 'TEST DRIVE & BOOKING ENGINEER',
      moduleFocus: 'TEST DRIVE PASS & SLOT SCHEDULER',
      description:
        'Built the interactive test drive scheduling interface, model preview synchronization, and Cabanatuan pass generator.',
    },
    {
      index: '09',
      numericIndex: 8,
      codeTag: 'EXP // MOTN-09',
      fullName: 'Ligon, Kurt Dan Amos',
      surname: 'LIGON',
      givenName: 'KURT DAN AMOS',
      initials: 'KL',
      role: 'CREATIVE TECHNOLOGIST & MOTION DEV',
      moduleFocus: 'HALFTONE MATRIX & KINETIC TRANSITIONS',
      description:
        'Tuned the custom HTML5 canvas halftone wave animations, cursor-reactive ambient lighting, and micro-interactions.',
    },
    {
      index: '10',
      numericIndex: 9,
      codeTag: 'EXP // DOCS-10',
      fullName: 'Padilla, Kyle Casper',
      surname: 'PADILLA',
      givenName: 'KYLE CASPER',
      initials: 'KP',
      role: 'CASE STUDY ANALYST & STRATEGIST',
      moduleFocus: 'CABANATUAN LOCALIZATION & DOCUMENTATION',
      description:
        'Directed the Nueva Ecija market localization, dealership operational alignment, and ITIPT02 case study documentation.',
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
   * Continuous floating-point scroll position across the 10 cards (0 to 9).
   * Starts at 1.0 so "02 — Bautista, Ynand Andrei (ME)" is centered on initial load!
   */
  readonly ribbonProgress = signal<number>(1);
  readonly ribbonVelocity = signal<number>(0);
  readonly activeIndex = computed<number>(() => {
    const clamped = Math.max(0, Math.min(this.teamMembers.length - 1, Math.round(this.ribbonProgress())));
    return clamped;
  });
  readonly activeMember = computed<TeamMemberCard>(() => {
    return this.teamMembers[this.activeIndex()] ?? this.teamMembers[1];
  });

  readonly hoveredRosterIndex = signal<number>(1);

  // Internal physics state for smooth 60fps requestAnimationFrame interpolation
  private targetProgress = 1;
  private currentProgress = 1;
  private rafId: number | null = null;
  private isPointerDown = false;
  private dragStartX = 0;
  private dragStartProgress = 1;

  ngOnInit(): void {
    this.startPhysicsLoop();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
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

  /** Jump camera smoothly to a specific team member card (0..9) */
  focusMember(index: number): void {
    this.targetProgress = Math.max(0, Math.min(this.teamMembers.length - 1, index));
    this.hoveredRosterIndex.set(this.targetProgress);
  }

  stepMember(delta: number): void {
    this.focusMember(Math.round(this.targetProgress) + delta);
  }

  /** Mouse wheel scrubbing on the 3D ribbon stage (just like exp.fiddle.digital) */
  onRibbonWheel(event: WheelEvent): void {
    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    // Allow natural page vertical scroll if already at the very beginning or very end
    const atStartAndScrollingUp = this.targetProgress <= 0.02 && dominantDelta < 0;
    const atEndAndScrollingDown =
      this.targetProgress >= this.teamMembers.length - 1.02 && dominantDelta > 0;

    if (atStartAndScrollingUp || atEndAndScrollingDown) {
      return;
    }

    event.preventDefault();
    const step = dominantDelta * 0.0042;
    this.targetProgress = Math.max(
      0,
      Math.min(this.teamMembers.length - 1, this.targetProgress + step)
    );
  }

  /** Pointer drag / swipe handling on the 3D ribbon */
  onPointerDown(event: PointerEvent): void {
    this.isPointerDown = true;
    this.dragStartX = event.clientX;
    this.dragStartProgress = this.targetProgress;
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isPointerDown) {
      return;
    }
    const deltaX = event.clientX - this.dragStartX;
    const cardSpacingPx = 280;
    const next = this.dragStartProgress - deltaX / cardSpacingPx;
    this.targetProgress = Math.max(0, Math.min(this.teamMembers.length - 1, next));
  }

  onPointerUp(): void {
    if (!this.isPointerDown) {
      return;
    }
    this.isPointerDown = false;
    // Snap gently to the nearest card after releasing drag
    this.targetProgress = Math.round(this.targetProgress);
  }

  /**
   * Computes the 3D cylindrical ribbon CSS transform for each member card
   * Replicates the curved 3D card arc and velocity skew of exp.fiddle.digital
   */
  getCardStyle(index: number): Record<string, string> {
    const progress = this.ribbonProgress();
    const velocity = this.ribbonVelocity();
    const offset = index - progress;
    const absOffset = Math.abs(offset);

    // Horizontal arc spread + cylindrical depth drop + Y rotation bend + velocity skew
    const translateX = offset * 295;
    const translateZ = -Math.pow(absOffset, 1.28) * 135;
    const translateY = Math.pow(absOffset, 1.6) * 14;
    const rotateY = offset * -18;
    const rotateZ = offset * 1.6 - velocity * 14;
    const scale = Math.max(0.72, 1 - absOffset * 0.065);
    const opacity = Math.max(0.12, 1 - Math.max(0, absOffset - 0.25) * 0.28);
    const zIndex = Math.round(100 - absOffset * 20);

    return {
      transform: `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
      opacity: opacity.toFixed(3),
      'z-index': String(zIndex),
    };
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
