import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'models',
    loadComponent: () => import('./pages/models/models.page').then((m) => m.ModelsPage),
  },
  {
    path: 'models/:id',
    loadComponent: () => import('./pages/model-detail/model-detail.page').then((m) => m.ModelDetailPage),
  },
  {
    path: 'financing',
    loadComponent: () => import('./pages/financing/financing.page').then((m) => m.FinancingPage),
  },
  {
    path: 'service',
    loadComponent: () => import('./pages/service/service.page').then((m) => m.ServicePage),
  },
  {
    path: 'test-drive',
    loadComponent: () => import('./pages/test-drive/test-drive.page').then((m) => m.TestDrivePage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
