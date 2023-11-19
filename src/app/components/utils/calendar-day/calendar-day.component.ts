import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.sass']
})
export class CalendarDayComponent implements OnInit {
  isChosenDay: boolean = false;
  isBetweenDays: boolean = false;
  isForbidden: boolean = false;

  startDate: Date | undefined;
  endDate: Date | undefined;

  @Input() currentDay: number | undefined;
  @Input() currentMonth: number | undefined;
  @Input() day: number | undefined;
  @Input() month: number | undefined;
  @Input() year: number | undefined;

  date: Date = new Date();

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.date = new Date(`${this.year}-${this.month}-${this.day}`);
    if (this.day && this.currentDay && this.day < this.currentDay && this.month === this.currentMonth) {
      this.isForbidden = true;
    }
    this.calendarService.startDate.subscribe(data => this.setStartDate(data));
    this.calendarService.endDate.subscribe(data => this.setEndDate(data));
  }

  clickedButton() {
    if (this.isForbidden) {
      return;
    }

    if (!this.startDate || this.date <= this.startDate) {
      this.calendarService.updateStartDate(this.date);
      this.calendarService.updateEndDate(undefined);
      return;
    }
    if (!this.endDate) {
      this.calendarService.updateEndDate(this.date);
      return;
    }
    this.calendarService.updateStartDate(this.date);
    this.calendarService.updateEndDate(undefined);
  }

  setStartDate(incomingStartDate: Date | undefined) {
    this.startDate = incomingStartDate;
    if (this.date.getTime() === this.startDate?.getTime()) {
      this.isChosenDay = true;
      this.isBetweenDays = false;
      return;
    }
    this.isChosenDay = false;
    this.isBetweenDays = false;
  }

  setEndDate(incomingEndDate: Date | undefined) {
    this.endDate = incomingEndDate;
    if (this.date.getTime() === this.endDate?.getTime() || this.date.getTime() === this.startDate?.getTime()) {
      this.isChosenDay = true;
      return;
    }
    if (!this.startDate || !this.endDate) {
      return;
    }
    if (this.date.getTime() > this.startDate?.getTime() && this.date.getTime() < this.endDate.getTime()) {
      this.isBetweenDays = true;
    } else {
      this.isBetweenDays = false;
    }
    this.isChosenDay = false;
  }
}
