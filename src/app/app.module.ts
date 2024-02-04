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
import { HeaderComponent } from './components/utils/header/header.component';
import { CalendarComponent } from './components/utils/calendar/calendar.component';
import { CalendarDayComponent } from './components/utils/calendar-day/calendar-day.component';
import { RoomPageComponent } from './components/pages/room-page/room-page.component';
import { ApartmentPageComponent } from './components/pages/apartment-page/apartment-page.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PageSectionComponent,
    CampPageComponent,
    RoomPageComponent,
    ApartmentPageComponent,
    DropdownComponent,
    TextInputComponent,
    CheckboxComponent,
    HeaderComponent,
    CalendarComponent,
    CalendarDayComponent,
    GalleryPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
