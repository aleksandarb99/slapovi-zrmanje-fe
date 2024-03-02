import { Component, ViewChild } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { HeaderComponent } from '../../utils/header/header.component';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';
import { CommonService } from 'src/app/services/common.service';
import { GuestsValue } from 'src/app/model/guests.value.model';
import { ApartmentLodgingValue } from 'src/app/model/apartment-lodging.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { CalendarService } from 'src/app/services/calendar.service';
import * as moment from 'moment';
import { PriceResponse } from 'src/app/model/price-response.model';
import { PriceItem } from 'src/app/model/price-item.model';

@Component({
  selector: 'app-apartment-page',
  templateUrl: './apartment-page.component.html',
  styleUrls: ['./apartment-page.component.sass'],
})
export class ApartmentPageComponent {
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
  lodging: ApartmentLodgingValue = {
    apartment1: 0,
    apartment2: 0,
    apartment3: 0,
  };
  dates: string[] = [];

  chosenStartDate: Date | undefined;
  chosenEndDate: Date | undefined;

  constructor(
    private accommodationService: AccommodationService,
    private textService: TextService,
    protected commonService: CommonService,
    private calendarService: CalendarService
  ) {
    this.calendarService.startDate.subscribe(
      (data) => (this.chosenStartDate = data)
    );
    this.calendarService.endDate.subscribe(
      (data) => (this.chosenEndDate = data)
    );
  }

  ngOnInit() {
    this.textService.text.subscribe((data) => (this.text = data));
    this.commonService.removeWheelEvent();
    this.headerComponent?.changeHeaderTheme(true);
  }

  // TODO: Do we keep this function here
  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  calculatePrice() {
    // TODO Disable button
    let data = this.generateData();

    this.accommodationService.checkPrice(data).subscribe(
      (data: any) => {
        let priceResponse = data as PriceResponse;
        console.log('Got result');
        console.log(data);
        this.receiptItems = priceResponse.priceItems;
        this.totalPrice = priceResponse.totalPrice;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generateData() {
    let language = this.textService.getLanguage();

    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      type: 'APARTMENT',
      language: language,
      powerSupply: false,
      guests: this.guests,
      lodging: this.lodging,
      startDate: moment(this.chosenStartDate).format('YYYY-MM-DD'),
      endDate: moment(this.chosenEndDate).format('YYYY-MM-DD'),
    };
  }

  checkAvailability(event: Event) {
    // TODO Extand and do for camp and room
    if (!this.firstName || !this.lastName || !this.email) {
      event.stopPropagation();
      return;
    }
    console.log('checkAvailability');

    if (!this.validateEmail(this.email)) {
      console.log('Invalid email');
      return;
    }

    let data = this.generateData();

    this.accommodationService.checkAvailability(data).subscribe(
      (data) => {
        // TODO Reset other fields
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        console.log('Uspesno poslato');
      },
      (error) => {
        console.log(error);
      }
    );
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
        apartment1: intValues.value1,
        apartment2: intValues.value2,
        apartment3: intValues.value3,
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
}
