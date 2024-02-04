import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { CampPageComponent } from './components/pages/camp-page/camp-page.component';
import { RoomPageComponent } from './components/pages/room-page/room-page.component';
import { ApartmentPageComponent } from './components/pages/apartment-page/apartment-page.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
