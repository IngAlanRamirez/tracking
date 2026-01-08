import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tracking',
    loadComponent: () => import('./pages/tracking/tracking.page').then((m) => m.TrackingPage),
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.page').then((m) => m.FaqPage),
  },
  {
    path: '',
    redirectTo: 'tracking',
    pathMatch: 'full',
  },
];
