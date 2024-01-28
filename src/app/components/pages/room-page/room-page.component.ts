import { Component, ViewChild } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { HeaderComponent } from '../../utils/header/header.component';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';
import { CommonService } from 'src/app/services/common.service';
import { ReceiptItem } from 'src/app/model/receipt-item.model';
import { GuestsValue } from 'src/app/model/guests.value.model';
import { RoomLodgingValue } from 'src/app/model/room-lodging.model';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.sass'],
})
export class RoomPageComponent {
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
  lodging: RoomLodgingValue = {
    room1: 0,
    room2: 0,
    room3: 0,
  };
  powerSupply: boolean = false;
  dates: string[] = [];

  constructor(
    private textService: TextService,
    protected commonService: CommonService
  ) {}

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

    // TODO: Logic here
  }

  saveTextValue(textValue: TextValue) {
    if (textValue.label === 'First Name') {
      this.firstName = textValue.value;
    }
    if (textValue.label === 'Last Name') {
      this.lastName = textValue.value;
    }
    if (textValue.label === 'Email Address') {
      this.email = textValue.value;
    }
  }

  saveIntValues(intValues: IntValues) {
    if (intValues.label === 'Lodging') {
      this.lodging = {
        room1: intValues.value1,
        room2: intValues.value2,
        room3: intValues.value3,
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

  // TODO: Uradi primanje vrednosti datuma
}
