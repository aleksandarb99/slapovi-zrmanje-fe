import { Component, ViewChild } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { HeaderComponent } from '../../utils/header/header.component';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';
import { CommonService } from 'src/app/services/common.service';
import { ReceiptItem } from 'src/app/model/receipt-item.model';
import { GuestsValue } from 'src/app/model/guests.value.model';
import { CampLodgingValue } from 'src/app/model/camp-lodging.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import * as moment from 'moment';
import { CalendarService } from 'src/app/services/calendar.service';

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

  receiptItems: ReceiptItem[] = [];
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
    speepingBag: 0,
  };
  powerSupply: boolean = false;
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
    // TODO: Uzmi podatke i salji na endpoint
    let mockedResponse = {
      items: [
        {
          name: 'Soba 1',
          price: 10,
        },
        {
          name: 'Soba 2',
          price: 5,
        },
      ],
      totalPrice: 15,
    };

    this.receiptItems = mockedResponse.items;
    this.totalPrice = mockedResponse.totalPrice;
  }

  checkAvailability() {
    console.log('checkAvailability');

    if (!this.validateEmail(this.email)) {
      console.log('Invalid email');
      return;
    }

    let language = 'HR';
    if (this.textService.index == 1) {
      language = 'EN';
    }
    if (this.textService.index == 2) {
      language = 'DE';
    }

    let data = {
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
    this.accommodationService.checkAvailability(data).subscribe(
      (data) => {
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
        tent: intValues.value1,
        caravan: intValues.value2,
        car: intValues.value3,
        speepingBag: intValues.value4,
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
