import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { PageSectionComponent } from './components/utils/page-section/page-section.component';
import { CampPageComponent } from './components/pages/camp-page/camp-page.component';
import { DropdownComponent } from './components/utils/dropdown/dropdown.component';
import { TextInputComponent } from './components/utils/text-input/text-input.component';
import { CheckboxComponent } from './components/utils/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PageSectionComponent,
    CampPageComponent,
    DropdownComponent,
    TextInputComponent,
    CheckboxComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
