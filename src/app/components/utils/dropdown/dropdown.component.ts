import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass'],
})
export class DropdownComponent implements AfterContentInit {
  line: string = '';
  divIsOpened: boolean = false;

  value1: number = 0;
  value2: number = 0;
  value3: number = 0;
  value4: number = 0;

  @Input() divIsOpenedSubject: any;

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

  constructor() {}

  ngAfterContentInit(): void {
    this.divIsOpenedSubject.subscribe({
      next: (v: boolean) => {
        if (this.divIsOpened) {
          this.divIsOpened = !this.divIsOpened;
        }
      },
    });

    this.generateQuestLine();
  }

  preventEvent(event: Event) {
    event.stopPropagation();
  }

  showOrHide(event: Event) {
    this.divIsOpened = !this.divIsOpened;
    event.stopPropagation();
  }

  generateQuestLine() {
    if (
      this.value1 == 0 &&
      this.value2 == 0 &&
      this.value3 == 0 &&
      this.value4 == 0
    ) {
      this.line = this.initialLine;
    } else {
      this.line =
        this.value1 +
        ' ' +
        this.title1 +
        ',' +
        this.value2 +
        ' ' +
        this.title2 +
        ',' +
        this.value3 +
        ' ' +
        this.title3 +
        ',' +
        this.value4 +
        ' ' +
        this.title4;
    }
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

    this.generateQuestLine();

    let object: IntValues = {
      value1: this.value1,
      value2: this.value2,
      value3: this.value3,
      value4: this.value4,
    };

    this.valueChangedEvent.emit(object);
    event.stopPropagation();
  }

  raise(fieldIndex: number, event: Event) {
    if (fieldIndex == 0) {
      this.value1++;
    } else if (fieldIndex == 1) {
      this.value2++;
    } else if (fieldIndex == 2) {
      this.value3++;
    } else if (fieldIndex == 3) {
      this.value4++;
    }

    this.generateQuestLine();

    let object: IntValues = {
      value1: this.value1,
      value2: this.value2,
      value3: this.value3,
      value4: this.value4,
    };

    this.valueChangedEvent.emit(object);
    event.stopPropagation();
  }
}
