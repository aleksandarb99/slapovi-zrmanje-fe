import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { CommonService } from 'src/app/services/common.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit {
  line: string = '';
  divIsOpened: boolean = false;

  isLeftCalendarBackBtnClickable = false;
  isRightCalendarBackBtnClickable = false;

  @Input() isMobile: boolean = false;

  @Input() label: string = '';
  checkInLabel: string = '';
  checkOutLabel: string = '';

  @Input() fill: boolean = false;
  @Input() initialLine: string = '';

  @Output() valueChangedEvent = new EventEmitter<IntValues>();
  @Output() showDivEvent = new EventEmitter<string>();

  days: string[] = [];
  months: string[] = [];
  monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  currentDay: number;
  currentMonth: number;
  currentYear: number;

  // Left Calendar
  leftMonthCounter: number;
  leftYearCounter: number;
  leftCalendarDays: number;
  leftCalendarDaysList: number[];
  leftCalendarMonth: string = '';
  leftCalendarsDayOfFirst: number = 0;

  // Right Calendar
  rightMonthCounter: number;
  rightYearCounter: number;
  rightCalendarDays: number;
  rightCalendarDaysList: number[] = [];
  rightCalendarMonth: string = '';
  rightCalendarsDayOfFirst: number = 0;

  chosenStartDate: Date | undefined;
  chosenEndDate: Date | undefined;

  constructor(
    protected textService: TextService,
    private calendarService: CalendarService,
    private commonService: CommonService
  ) {
    let date = new Date();
    // Static reference for current month
    this.currentDay = date.getDate();
    this.currentMonth = date.getMonth() + 1; // Starts from 0 - 11 + 1 -> 1 - 12
    this.currentYear = date.getFullYear();

    this.leftMonthCounter = this.currentMonth; // Left calendar start from current month
    // this.rightMonthCounter = this.currentMonth + 1; // Right calendar is one month ahead
    this.rightMonthCounter = (this.currentMonth + 1) % 13;
    if (this.rightMonthCounter === 0) {
      this.rightMonthCounter += 1;
    }
    this.leftYearCounter = this.currentYear;
    this.rightYearCounter =
      this.rightMonthCounter === 1 ? this.currentYear + 1 : this.currentYear;
    this.leftCalendarDays = this.monthDays[this.leftMonthCounter - 1];
    this.rightCalendarDays = this.monthDays[this.rightMonthCounter - 1];
    this.leftCalendarDays += this.isLeapYearLeftCalendar();
    this.rightCalendarDays += this.isLeapYearRightCalendar();
    this.leftCalendarDaysList = [].constructor(this.leftCalendarDays).fill(0);
    this.rightCalendarDaysList = [].constructor(this.rightCalendarDays).fill(0);
    this.leftCalendarsDayOfFirst = this.calculateDayOfWeek(
      this.leftYearCounter,
      this.leftMonthCounter
    );
    this.rightCalendarsDayOfFirst = this.calculateDayOfWeek(
      this.rightYearCounter,
      this.rightMonthCounter
    );
  }

  // TODO: Disable placeholders

  ngOnInit(): void {
    this.textService.text.subscribe((data) =>
      this.saveTextAndUpdateVariables(data)
    );
    this.calendarService.startDate.subscribe(
      (startDate) => (this.chosenStartDate = startDate)
    );
    this.calendarService.endDate.subscribe(
      (endDate) => (this.chosenEndDate = endDate)
    );
    this.commonService.componentOpenedCampPage.subscribe(
      (incomingLabel) => (this.divIsOpened = this.label === incomingLabel)
    );
  }

  saveTextAndUpdateVariables(data: LanguageLabel) {
    this.days = data.calendarDays.split(',');
    this.months = data.calendarMonths.split(',');
    this.leftCalendarMonth = this.months[this.leftMonthCounter - 1];
    this.rightCalendarMonth = this.months[this.rightMonthCounter - 1];
    this.label = data.calendarLabel;
    let labelParts: string[] = this.label.split('&');
    this.checkInLabel = labelParts[0];
    this.checkOutLabel = labelParts[1];
  }

  preventEvent(event: Event) {
    event.stopPropagation();
  }

  showOrHide(event: Event) {
    if (this.divIsOpened) {
      this.divIsOpened = false;
    } else {
      this.commonService.updateComponentVisibility(this.label);
    }
    event.stopPropagation();
  }

  increaseBothCalendars() {
    this.isLeftCalendarBackBtnClickable = true;

    this.leftMonthCounter = (this.leftMonthCounter + 1) % 13;
    if (this.leftMonthCounter === 0) {
      this.leftMonthCounter += 1;
    }
    this.leftCalendarMonth = this.months[this.leftMonthCounter - 1];
    if (this.leftMonthCounter === 1) {
      this.leftYearCounter += 1;
    }
    this.leftCalendarsDayOfFirst = this.calculateDayOfWeek(
      this.leftYearCounter,
      this.leftMonthCounter
    );
    this.leftCalendarDays = this.monthDays[this.leftMonthCounter - 1];
    this.leftCalendarDays += this.isLeapYearLeftCalendar();
    const newNumber = this.increaseRightCalendar(false);
    this.regenerateCollection(
      this.leftCalendarDaysList,
      this.leftCalendarDays,
      newNumber
    );
  }

  increaseRightCalendar(isClickable: boolean): number {
    if (!this.isRightCalendarBackBtnClickable) {
      this.isRightCalendarBackBtnClickable = isClickable;
    }

    this.rightMonthCounter = (this.rightMonthCounter + 1) % 13;
    if (this.rightMonthCounter === 0) {
      this.rightMonthCounter += 1;
    }
    this.rightCalendarMonth = this.months[this.rightMonthCounter - 1];
    if (this.rightMonthCounter === 1) {
      this.rightYearCounter += 1;
    }
    this.rightCalendarsDayOfFirst = this.calculateDayOfWeek(
      this.rightYearCounter,
      this.rightMonthCounter
    );
    this.rightCalendarDays = this.monthDays[this.rightMonthCounter - 1];
    this.rightCalendarDays += this.isLeapYearRightCalendar();
    const newNumber: number = (this.rightCalendarDaysList[0] += 1);
    this.regenerateCollection(
      this.rightCalendarDaysList,
      this.rightCalendarDays,
      newNumber
    );
    return newNumber;
  }

  decreaseBothCalendars() {
    if (!this.isLeftCalendarBackBtnClickable) {
      return;
    }

    this.leftMonthCounter =
      this.leftMonthCounter === 1 ? 12 : this.leftMonthCounter - 1;
    this.leftCalendarMonth = this.months[this.leftMonthCounter - 1];
    if (this.leftMonthCounter === 12) {
      this.leftYearCounter -= 1;
    }
    if (
      this.leftMonthCounter === this.currentMonth &&
      this.leftYearCounter === this.currentYear
    ) {
      this.isLeftCalendarBackBtnClickable = false;
    }
    this.leftCalendarsDayOfFirst = this.calculateDayOfWeek(
      this.leftYearCounter,
      this.leftMonthCounter
    );
    this.leftCalendarDays = this.monthDays[this.leftMonthCounter - 1];
    this.leftCalendarDays += this.isLeapYearLeftCalendar();
    const newNumber = this.decreaseRightCalendar(false);
    this.regenerateCollection(
      this.leftCalendarDaysList,
      this.leftCalendarDays,
      newNumber
    );
  }

  decreaseRightCalendar(isInvokedByRight: boolean): number {
    if (!this.isRightCalendarBackBtnClickable && isInvokedByRight) {
      return -1;
    }

    this.rightMonthCounter =
      this.rightMonthCounter === 1 ? 12 : this.rightMonthCounter - 1;
    this.rightCalendarMonth = this.months[this.rightMonthCounter - 1];
    if (this.rightMonthCounter === 12) {
      this.rightYearCounter -= 1;
    }
    if (
      this.leftMonthCounter + 1 === this.rightMonthCounter ||
      (this.leftMonthCounter === 12 && this.rightMonthCounter === 1)
    ) {
      this.isRightCalendarBackBtnClickable = false;
    }
    this.rightCalendarsDayOfFirst = this.calculateDayOfWeek(
      this.rightYearCounter,
      this.rightMonthCounter
    );
    this.rightCalendarDays = this.monthDays[this.rightMonthCounter - 1];
    this.rightCalendarDays += this.isLeapYearRightCalendar();
    let newNumber = (this.rightCalendarDaysList[0] += 1);
    this.regenerateCollection(
      this.rightCalendarDaysList,
      this.rightCalendarDays,
      newNumber
    );
    return newNumber;
  }

  isLeapYearLeftCalendar() {
    return this.leftCalendarDays === 28 && this.leftYearCounter % 4 === 0
      ? 1
      : 0;
  }

  isLeapYearRightCalendar() {
    return this.rightCalendarDays === 28 && this.rightYearCounter % 4 === 0
      ? 1
      : 0;
  }

  /**
   * This method is used to re generate collections used to display calendar days.
   *
   * @param daysList - It can be left or right calendar passed
   * @param numberOfDays - How many days need to be displayed
   * @param newNumber - Every time new number needs to be used, otherwise
   * calendar day components won't be re rendered
   */
  regenerateCollection(
    daysList: number[],
    numberOfDays: number,
    newNumber: number
  ) {
    daysList.splice(0, daysList.length);
    for (let i = 0; i < numberOfDays; i++) {
      daysList.push(newNumber);
    }
  }

  /**
   * This method is used to calculate day of week based on passed month and year.
   *
   * @param year - Year
   * @param month - Month
   * @returns 0 - Mon, 1 - Thu, 2 - Whe, 3 - Thr, 4 - Fri, 5 - Sat, 6 - Sun
   */
  calculateDayOfWeek(year: number, month: number): number {
    let firstOfMonth = new Date(`${year}-${month}-01`);
    let dayOfWeek = firstOfMonth.getDay() === 0 ? 6 : firstOfMonth.getDay() - 1;
    return dayOfWeek;
  }

  /**
   * This method is used to display appropriate format of selected date.
   *
   * @param date - date to be displayed
   * @returns converted date
   */
  generateDateString(date: Date): string {
    const day: number = date.getDate();
    let month: number = date.getMonth();
    month = (month + 1) % 13;
    const year: number = date.getFullYear();
    return `${day}/${month === 0 ? 1 : month}/${year}`;
  }
}
