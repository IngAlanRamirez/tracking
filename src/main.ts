import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cardOutline,
  sendOutline,
  closeCircleOutline,
  locationOutline,
  homeOutline,
  refreshOutline,
  alertCircleOutline,
  helpCircleOutline,
  addOutline,
  removeOutline,
  chevronBackOutline,
  callOutline
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Registrar iconos globalmente
addIcons({
  'card-outline': cardOutline,
  'send-outline': sendOutline,
  'close-circle-outline': closeCircleOutline,
  'location-outline': locationOutline,
  'home-outline': homeOutline,
  'refresh-outline': refreshOutline,
  'alert-circle-outline': alertCircleOutline,
  'help-circle-outline': helpCircleOutline,
  'add-outline': addOutline,
  'remove-outline': removeOutline,
  'chevron-back-outline': chevronBackOutline,
  'call-outline': callOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
