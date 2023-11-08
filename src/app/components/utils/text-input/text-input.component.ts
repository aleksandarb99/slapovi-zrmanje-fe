import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TextValue } from 'src/app/model/text-value.model';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.sass'],
})
export class TextInputComponent {
  value: string = '';

  @Input() label: string = '';
  @Output() valueChangedEvent = new EventEmitter<TextValue>();

  constructor() {}

  onInput(event: Event) {
    this.value = (<HTMLTextAreaElement>event.target).value;

    let textValue: TextValue = {
      label: this.label,
      value: this.value,
    };
    this.valueChangedEvent.emit(textValue);
  }
}
