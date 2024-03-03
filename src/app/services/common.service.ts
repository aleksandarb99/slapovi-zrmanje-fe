import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LandingPageComponent } from '../components/pages/landing-page/landing-page.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private componentOpenedCampPageSubject = new Subject<string>();
  private contactSubject = new Subject<void>();
  private aboutUsSubject = new Subject<void>();
  componentOpenedCampPage = this.componentOpenedCampPageSubject.asObservable();
  contactEmitter = this.contactSubject.asObservable();
  aboutUsEmitter = this.aboutUsSubject.asObservable();
  private loading: boolean = false;
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

  public scrollToContactSectionEmit() {
    this.contactSubject.next();
  }

  public scrollToAboutUsSectionEmit() {
    this.aboutUsSubject.next();
  }

  public overrideWheelEvent(landingPage: LandingPageComponent) {
    this.landingPage = landingPage;
    document.addEventListener('wheel', this.wheel, {passive: false});
  }

  public removeWheelEvent() {
    document.removeEventListener('wheel', this.wheel, false);
  }

  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  public getLoading(): boolean {
    return this.loading;
  }
}
