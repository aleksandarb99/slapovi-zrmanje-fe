import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { CampPageComponent } from './components/pages/camp-page/camp-page.component';
import { RoomPageComponent } from './components/pages/room-page/room-page.component';
import { ApartmentPageComponent } from './components/pages/apartment-page/apartment-page.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';
import { VerifyPageComponent } from './components/pages/verify-page/verify-page.component';
import { RejectPageComponent } from './components/pages/reject-page/reject-page.component';
import { AcceptPageComponent } from './components/pages/accept-page/accept-page.component';
import { ReservePageComponent } from './components/pages/reserve-page/reserve-page.component';
import { CancelPageComponent } from './components/pages/cancel-page/cancel-page.component';

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
    component: VerifyPageComponent,
  },
  {
    path: 'reject',
    component: RejectPageComponent,
  },
  {
    path: 'accept',
    component: AcceptPageComponent,
  },
  {
    path: 'reserve',
    component: ReservePageComponent,
  },
  {
    path: 'cancel',
    component: CancelPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
