import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { CampPageComponent } from './components/pages/camp-page/camp-page.component';
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
    path: 'gallery',
    component: GalleryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
