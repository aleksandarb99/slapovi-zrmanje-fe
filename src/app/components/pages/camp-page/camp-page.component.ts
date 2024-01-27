import { Component, ViewChild } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { HeaderComponent } from '../../utils/header/header.component';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';
import { CommonService } from 'src/app/services/common.service';
import { ReceiptItem } from 'src/app/model/receipt-item.model';

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

  // TODO: Hardcoded values
  receiptItems: ReceiptItem[] = [
    {
      name: 'Soba 1',
      price: 10,
    },
    {
      name: 'Soba 2',
      price: 5,
    },
  ];
  totalPrice: number = 0;

  constructor(
    private textService: TextService,
    protected commonService: CommonService
  ) {}

  ngOnInit() {
    this.textService.text.subscribe((data) => (this.text = data));
    this.commonService.removeWheelEvent();
    this.headerComponent?.changeHeaderTheme(true);
  }

  calculatePrice() {
    console.log('usao');

    this.totalPrice = 0;
    this.receiptItems.forEach((item) => {
      this.totalPrice += item.price;
    });
  }

  checkAvailability() {
    console.log('checkAvailability');
  }

  saveTextValue(textValue: TextValue) {
    // TODO: Validate if email
    // console.log(textValue);
  }

  saveIntValues(intValues: IntValues) {
    // console.log(intValues);
  }

  saveCheckboxValue(booleanValue: boolean) {
    // console.log(booleanValue);
  }
}
