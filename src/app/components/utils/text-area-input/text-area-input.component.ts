import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.sass'],
})
export class TextAreaInputComponent {
  @Input() value: string = '';
  @Input() fill: boolean = false;
  @Input() isMobile: boolean = false;
  @Input() labelIsBlack: boolean = false;
  @Input() label: string = '';
  @Input() inputType: string = 'TEXT';
  @Output() valueChangedEvent = new EventEmitter<TextValue>();

  @ViewChild('input') input: any;

  text: LanguageLabel | undefined;

  errorRequiredPresent: boolean = false;
  errorEmailInvalidPresent: boolean = false;

  private regex: RegExp | undefined;

  constructor(protected textService: TextService) {
    this.regex = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);

    this.textService.text.subscribe((data) => (this.text = data));
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
      this.input.nativeElement.setCustomValidity('Required');

      if (textValue.value === '') {
        this.errorRequiredPresent = true;
        this.errorEmailInvalidPresent = false;
      } else {
        this.errorRequiredPresent = false;
        this.errorEmailInvalidPresent = true;
      }
    } else {
      this.input.nativeElement.setCustomValidity('');
      this.errorRequiredPresent = false;
      this.errorEmailInvalidPresent = false;
    }
  }
}
