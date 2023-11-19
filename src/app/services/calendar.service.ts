import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private startDateSubject = new BehaviorSubject<Date | undefined>(undefined);
  private endDateSubject = new BehaviorSubject<Date | undefined>(undefined);

  startDate = this.startDateSubject.asObservable();
  endDate = this.endDateSubject.asObservable();

  constructor() { }

  public updateStartDate(startDate: Date | undefined) {
    this.startDateSubject.next(startDate);
  }

  public updateEndDate(endDate: Date | undefined) {
    this.endDateSubject.next(endDate);
  }
}
