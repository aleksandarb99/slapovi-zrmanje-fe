import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { CommonService } from 'src/app/services/common.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass'],
})
export class DropdownComponent implements OnChanges {
  line: string = '';
  divIsOpened: boolean = false;

  value1: number = 0;
  value2: number = 0;
  value3: number = 0;
  value4: number = 0;

  @Input() value: any;

  @Input() isMobile: boolean = false;

  @Input() max1: boolean = false;

  @Input() label: string = '';
  @Input() initialLine: string = '';
  @Input() title1: string = '';
  @Input() subtitle1: string = '';
  @Input() title2: string = '';
  @Input() subtitle2: string = '';
  @Input() title3: string = '';
  @Input() subtitle3: string = '';
  @Input() title4: string = '';
  @Input() subtitle4: string = '';

  @Output() valueChangedEvent = new EventEmitter<IntValues>();
  @Output() showDivEvent = new EventEmitter<string>();

  errorPresent: boolean = false;

  text: LanguageLabel | undefined;

  @Input()
  dropdownOn: string = '';

  constructor(
    private commonService: CommonService,
    protected textService: TextService
  ) {
    this.textService.text.subscribe((data) => (this.text = data));

    this.commonService.resetDropdownEmitter.subscribe(() => this.resetValues());
    this.commonService.componentOpenedCampPage.subscribe(
      (incomingLabel) => (this.divIsOpened = this.label === incomingLabel)
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['value']) return;
    let currentValue = changes['value'].currentValue;
    if (
      changes['value'].previousValue == undefined &&
      currentValue !== undefined
    ) {
      if (this.dropdownOn == 'apartment') {
        if (currentValue.apartment1 !== undefined) {
          this.value1 = currentValue.apartment1;
        }

        if (currentValue.adults !== undefined) {
          this.value1 = currentValue.adults;
        }
        if (currentValue.children !== undefined) {
          this.value2 = currentValue.children;
        }
        if (currentValue.infants !== undefined) {
          this.value3 = currentValue.infants;
        }
        if (currentValue.pets !== undefined) {
          this.value4 = currentValue.pets;
        }
      }
      if (this.dropdownOn == 'camp') {
        if (currentValue.tent !== undefined) {
          this.value1 = currentValue.tent;
        }
        if (currentValue.caravan !== undefined) {
          this.value2 = currentValue.caravan;
        }
        if (currentValue.car !== undefined) {
          this.value3 = currentValue.car;
        }
        if (currentValue.sleepingBag !== undefined) {
          this.value4 = currentValue.sleepingBag;
        }

        if (currentValue.adults !== undefined) {
          this.value1 = currentValue.adults;
        }
        if (currentValue.children !== undefined) {
          this.value2 = currentValue.children;
        }
        if (currentValue.infants !== undefined) {
          this.value3 = currentValue.infants;
        }
        if (currentValue.pets !== undefined) {
          this.value4 = currentValue.pets;
        }
      }
      if (this.dropdownOn == 'room') {
        if (currentValue.room1 !== undefined) {
          this.value1 = currentValue.room1;
        }
        if (currentValue.room2 !== undefined) {
          this.value2 = currentValue.room2;
        }
        if (currentValue.room3 !== undefined) {
          this.value3 = currentValue.room3;
        }

        if (currentValue.adults !== undefined) {
          this.value1 = currentValue.adults;
        }
        if (currentValue.children !== undefined) {
          this.value2 = currentValue.children;
        }
        if (currentValue.infants !== undefined) {
          this.value3 = currentValue.infants;
        }
      }
    }
  }

  preventEvent(event: Event) {
    event.stopPropagation();
  }

  ifEmptySetErrorMessage() {
    if (
      this.value1 == 0 &&
      this.value2 == 0 &&
      this.value3 == 0 &&
      this.value4 == 0
    ) {
      this.errorPresent = true;
    } else {
      this.errorPresent = false;
    }
  }

  showOrHide(event: Event) {
    if (this.divIsOpened) {
      this.divIsOpened = false;
    } else {
      this.commonService.updateComponentVisibility(this.label);
    }
    event.stopPropagation();
  }

  getLine() {
    this.line =
      this.value1 == 0 &&
      this.value2 == 0 &&
      this.value3 == 0 &&
      this.value4 == 0
        ? this.initialLine
        : this.generateLine();
    return this.line;
  }

  generateLine(): string {
    let line = '';
    if (this.value1 !== 0) {
      if (line != '') {
        line += ', ';
      }
      line += this.value1 + ' ' + this.title1;
    }
    if (this.value2 !== 0) {
      if (line != '') {
        line += ', ';
      }
      line += this.value2 + ' ' + this.title2;
    }
    if (this.value3 !== 0) {
      if (line != '') {
        line += ', ';
      }
      line += this.value3 + ' ' + this.title3;
    }
    if (this.value4 !== 0) {
      if (line != '') {
        line += ', ';
      }
      line += this.value4 + ' ' + this.title4;
    }

    return line;
  }

  lower(fieldIndex: number, event: Event) {
    if (fieldIndex == 0) {
      if (this.value1 == 0) {
        return;
      }
      this.value1--;
    } else if (fieldIndex == 1) {
      if (this.value2 == 0) {
        return;
      }
      this.value2--;
    } else if (fieldIndex == 2) {
      if (this.value3 == 0) {
        return;
      }
      this.value3--;
    } else if (fieldIndex == 3) {
      if (this.value4 == 0) {
        return;
      }
      this.value4--;
    }

    let object: IntValues = {
      value1: this.value1,
      value2: this.value2,
      value3: this.value3,
      value4: this.value4,
      label: this.label,
    };

    this.valueChangedEvent.emit(object);
    event.stopPropagation();

    this.ifEmptySetErrorMessage();
  }

  raise(fieldIndex: number, event: Event) {
    if (fieldIndex == 0) {
      if (this.max1 && this.value1 == 1) {
        return;
      }
      this.value1++;
    } else if (fieldIndex == 1) {
      if (this.max1 && this.value2 == 1) {
        return;
      }
      this.value2++;
    } else if (fieldIndex == 2) {
      if (this.max1 && this.value3 == 1) {
        return;
      }
      this.value3++;
    } else if (fieldIndex == 3) {
      if (this.max1 && this.value4 == 1) {
        return;
      }
      this.value4++;
    }

    let object: IntValues = {
      value1: this.value1,
      value2: this.value2,
      value3: this.value3,
      value4: this.value4,
      label: this.label,
    };

    this.valueChangedEvent.emit(object);
    event.stopPropagation();

    this.ifEmptySetErrorMessage();
  }

  private resetValues(): void {
    this.value1 = 0;
    this.value2 = 0;
    this.value3 = 0;
    this.value4 = 0;

    let object: IntValues = {
      value1: this.value1,
      value2: this.value2,
      value3: this.value3,
      value4: this.value4,
      label: this.label,
    };

    this.valueChangedEvent.emit(object);

    this.errorPresent = false;
  }
}
