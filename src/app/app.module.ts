import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { SpinnerComponent } from './components/utils/spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { RedirectPageComponent } from './components/pages/redirect-page/redirect-page.component';
import { MobileView600Directive } from './directives/mobile-view-600.directive';

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
    SpinnerComponent,
    RedirectPageComponent,
    MobileView600Directive,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
