import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LandingPageComponent } from '../components/pages/landing-page/landing-page.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private componentOpenedCampPageSubject = new Subject<string>();
  componentOpenedCampPage = this.componentOpenedCampPageSubject.asObservable();

  landingPage: LandingPageComponent | undefined;
  wheel = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.landingPage?.scrollToSection(event.deltaY);
  }

  constructor() { }

  public updateComponentVisibility(openedComponent: string) {
    this.componentOpenedCampPageSubject.next(openedComponent);
  }

  public overrideWheelEvent(landingPage: LandingPageComponent) {
    this.landingPage = landingPage;
    document.addEventListener('wheel', this.wheel, {passive: false});
  }

  public removeWheelEvent() {
    document.removeEventListener('wheel', this.wheel, false);
  }
}
