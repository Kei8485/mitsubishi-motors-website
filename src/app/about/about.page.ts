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
   * Continuous floating-point scroll position across the 10 cards (0 to 9).
   * Starts at 0 so "01 — Abenales, Matthew" is centered on initial load.
   */
  readonly ribbonProgress = signal<number>(0);
  readonly ribbonVelocity = signal<number>(0);
  readonly activeIndex = computed<number>(() => {
    const clamped = Math.max(0, Math.min(this.teamMembers.length - 1, Math.round(this.ribbonProgress())));
    return clamped;
  });
  readonly activeMember = computed<TeamMemberCard>(() => {
    return this.teamMembers[this.activeIndex()] ?? this.teamMembers[0];
  });

  readonly hoveredRosterIndex = signal<number>(0);

  // Internal physics state for smooth 60fps requestAnimationFrame interpolation
  private targetProgress = 0;
  private currentProgress = 0;
  private rafId: number | null = null;
  private isPointerDown = false;
  private dragStartX = 0;
  private dragStartProgress = 0;

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
