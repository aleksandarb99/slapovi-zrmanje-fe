import { Component, ViewChild } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { HeaderComponent } from '../../utils/header/header.component';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';
import { CommonService } from 'src/app/services/common.service';
import { GuestsValue } from 'src/app/model/guests.value.model';
import { CampLodgingValue } from 'src/app/model/camp-lodging.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import * as moment from 'moment';
import { CalendarService } from 'src/app/services/calendar.service';
import { PriceResponse } from 'src/app/model/price-response.model';
import { PriceItem } from 'src/app/model/price-item.model';
import { ValidatorService } from 'src/app/services/validator.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-camp-page',
  templateUrl: './camp-page.component.html',
  styleUrls: ['./camp-page.component.sass'],
})
export class CampPageComponent {
  text: LanguageLabel | undefined;
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  receiptItems: PriceItem[] = [];
  totalPrice: number = 0;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  guests: GuestsValue = {
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  };
  lodging: CampLodgingValue = {
    tent: 0,
    caravan: 0,
    car: 0,
    sleepingBag: 0,
  };
  powerSupply: boolean = false;
  dates: string[] = [];

  chosenStartDate: Date | undefined;
  chosenEndDate: Date | undefined;

  constructor(
    private accommodationService: AccommodationService,
    private textService: TextService,
    protected commonService: CommonService,
    private calendarService: CalendarService,
    private validator: ValidatorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.calendarService.startDate.subscribe(
      (data) => (this.chosenStartDate = data)
    );
    this.calendarService.endDate.subscribe(
      (data) => (this.chosenEndDate = data)
    );
    this.textService.text.subscribe((data) => (this.text = data));

    this.commonService.removeWheelEvent();
    this.headerComponent?.changeHeaderTheme(true);
    this.calendarService.updateStartDate(undefined);
    this.calendarService.updateEndDate(undefined);
  }

  calculatePrice(event: Event) {
    if (this.isCalculationDisabled()) {
      event.stopPropagation();
      return;
    }

    let data = this.generateData();

    this.accommodationService.checkPriceForCamp(data).subscribe({
      next: (data: any) => {
        let priceResponse = data as PriceResponse;
        this.receiptItems = priceResponse.priceItems;
        this.totalPrice = priceResponse.totalPrice;
      },
      error: (error) => this.notificationService.showError(error.error.message),
    });
  }

  getItemName(name: string) {
    if (name === 'Adults') {
      return this.text!.dropdownGuestsTitle1;
    }
    if (name === 'Children') {
      return this.text!.dropdownGuestsTitle2;
    }
    if (name === 'Infants') {
      return this.text!.dropdownGuestsTitle3;
    }
    if (name === 'Pets') {
      return this.text!.dropdownGuestsTitle4;
    }
    if (name === 'Caravan') {
      return this.text!.dropdownLodgingTitle2;
    }
    if (name === 'Tent') {
      return this.text!.dropdownLodgingTitle1;
    }
    if (name === 'Car') {
      return this.text!.dropdownLodgingTitle3;
    }
    if (name === 'SleepingBag') {
      return this.text!.dropdownLodgingTitle4;
    }
    if (name === 'PowerSupply') {
      return this.text!.checkBoxTitle;
    }
    return name;
  }

  getNightsWord() {
    let firstItem = this.receiptItems[0];
    if (firstItem.nights == 1) {
      return this.text!.nightWordSingluar;
    }
    return this.text!.nightWordPlural;
  }

  checkAvailability(event: Event) {
    if (this.isAvailabilityDisabled()) {
      event.stopPropagation();
      return;
    }

    if (!this.validator.validateEmail(this.email)) {
      this.notificationService.showError('Email address is invalid');
      return;
    }

    let data = this.generateData();

    this.accommodationService.checkAvailability(data).subscribe({
      complete: () => {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.commonService.resetDropdowns();
        this.calendarService.updateStartDate(undefined);
        this.calendarService.updateEndDate(undefined);
        // TODO: Prevedi sve errore i poruke
        this.notificationService.showSuccess('Uspesno poslat zahtev');
      },
      error: (error) => this.notificationService.showError(error.error.message),
    });
  }

  protected isAvailabilityDisabled(): boolean {
    return (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      this.isCalculationDisabled()
    );
  }

  protected isCalculationDisabled(): boolean {
    return (
      !this.validator.validateCamp(this.lodging) ||
      !this.validator.validateGuests(this.guests) ||
      !this.chosenStartDate ||
      !this.chosenEndDate
    );
  }

  generateData() {
    let language = this.textService.getLanguage();

    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      type: 'CAMP',
      language: language,
      powerSupply: this.powerSupply,
      guests: this.guests,
      lodging: this.lodging,
      startDate: moment(this.chosenStartDate).format('YYYY-MM-DD'),
      endDate: moment(this.chosenEndDate).format('YYYY-MM-DD'),
    };
  }

  saveTextValue(textValue: TextValue) {
    if (textValue.label === this.text!.inputFirstNameText) {
      this.firstName = textValue.value;
    }
    if (textValue.label === this.text!.inputLastNameText) {
      this.lastName = textValue.value;
    }
    if (textValue.label === this.text!.inputEmailText) {
      this.email = textValue.value;
    }
  }

  saveIntValues(intValues: IntValues) {
    if (intValues.label === this.text!.dropdownLodgingLabel) {
      this.lodging = {
        tent: intValues.value1,
        caravan: intValues.value2,
        car: intValues.value3,
        sleepingBag: intValues.value4,
      };
    } else {
      this.guests = {
        adults: intValues.value1,
        children: intValues.value2,
        infants: intValues.value3,
        pets: intValues.value4,
      };
    }
  }

  saveCheckboxValue(booleanValue: boolean) {
    this.powerSupply = booleanValue;
  }
}
