import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { CampPageComponent } from './components/pages/camp-page/camp-page.component';
import { RoomPageComponent } from './components/pages/room-page/room-page.component';
import { ApartmentPageComponent } from './components/pages/apartment-page/apartment-page.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';
import { RedirectPageComponent } from './components/pages/redirect-page/redirect-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'camp',
    component: CampPageComponent,
  },
  {
    path: 'room',
    component: RoomPageComponent,
  },
  {
    path: 'apartment',
    component: ApartmentPageComponent,
  },
  {
    path: 'gallery',
    component: GalleryPageComponent,
  },
  {
    path: 'verify',
    component: RedirectPageComponent,
    data: {
      type: 'verify',
    },
  },
  {
    path: 'reject',
    component: RedirectPageComponent,
    data: {
      type: 'reject',
    },
  },
  {
    path: 'accept',
    component: RedirectPageComponent,
    data: {
      type: 'accept',
    },
  },
  {
    path: 'reserve',
    component: RedirectPageComponent,
    data: {
      type: 'reserve',
    },
  },
  {
    path: 'cancel',
    component: RedirectPageComponent,
    data: {
      type: 'cancel',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
