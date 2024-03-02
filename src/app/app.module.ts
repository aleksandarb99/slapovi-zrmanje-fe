import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
import { VerifyPageComponent } from './components/pages/verify-page/verify-page.component';
import { RejectPageComponent } from './components/pages/reject-page/reject-page.component';
import { AcceptPageComponent } from './components/pages/accept-page/accept-page.component';
import { ReservePageComponent } from './components/pages/reserve-page/reserve-page.component';
import { CancelPageComponent } from './components/pages/cancel-page/cancel-page.component';
import { SpinnerComponent } from './components/utils/spinner/spinner.component';

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
    VerifyPageComponent,
    RejectPageComponent,
    AcceptPageComponent,
    ReservePageComponent,
    CancelPageComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
