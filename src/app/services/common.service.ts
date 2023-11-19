import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private componentOpenedCampPageSubject = new Subject<string>();
  componentOpenedCampPage = this.componentOpenedCampPageSubject.asObservable();

  constructor() { }

  public updateComponentVisibility(openedComponent: string) {
    this.componentOpenedCampPageSubject.next(openedComponent);
  }
}
