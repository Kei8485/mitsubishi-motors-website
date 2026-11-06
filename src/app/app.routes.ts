import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'models',
    loadComponent: () => import('./models/models.page').then((m) => m.ModelsPage),
  },
  {
    path: 'models/:id',
    loadComponent: () => import('./model-detail/model-detail.page').then((m) => m.ModelDetailPage),
  },
  {
    path: 'financing',
    loadComponent: () => import('./financing/financing.page').then((m) => m.FinancingPage),
  },
  {
    path: 'service',
    loadComponent: () => import('./service/service.page').then((m) => m.ServicePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
