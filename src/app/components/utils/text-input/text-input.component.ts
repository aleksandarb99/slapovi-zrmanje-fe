import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.sass'],
})
export class TextInputComponent {
  @Input() value: string = '';
  @Input() fill: boolean = false;
  @Input() isMobile: boolean = false;
  @Input() labelIsBlack: boolean = false;
  @Input() label: string = '';
  @Input() inputType: string = 'TEXT';
  @Output() valueChangedEvent = new EventEmitter<TextValue>();

  @ViewChild('input') input: any;

  private regex: RegExp | undefined;

  constructor(protected textService: TextService) {
    this.regex = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
  }

  onInput() {
    this.value = this.input.nativeElement.value;

    let textValue: TextValue = {
      label: this.label,
      value: this.value,
    };
    this.valueChangedEvent.emit(textValue);

    if (
      textValue.value === '' ||
      (this.inputType.toLowerCase() === 'email' &&
        !this.regex!.test(this.value))
    ) {
      this.input.nativeElement.setCustomValidity('Empty');
    } else {
      this.input.nativeElement.setCustomValidity('');
    }
  }
}
