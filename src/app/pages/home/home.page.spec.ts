import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Ionic UI components across the page', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('ion-header')).toBeTruthy();
    expect(el.querySelector('ion-toolbar')).toBeTruthy();
    expect(el.querySelector('ion-content')).toBeTruthy();
    expect(el.querySelector('ion-footer')).toBeTruthy();
    expect(el.querySelectorAll('ion-button').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-card').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-card-header').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-card-title').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-card-content').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-badge').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-chip').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-grid').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-row').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-col').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-list').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('ion-icon').length).toBeGreaterThan(0);
  });
});
