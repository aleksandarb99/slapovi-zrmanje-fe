import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TextValue } from 'src/app/model/text-value.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.sass'],
})
export class TextInputComponent {
  @Input() value: string = '';
  @Input() fill: boolean = false;
  @Input() label: string = '';
  @Input() inputType: string = 'TEXT';
  @Output() valueChangedEvent = new EventEmitter<TextValue>();

  constructor(private commonService: CommonService) {}

  onInput(event: Event) {
    this.value = (<HTMLTextAreaElement>event.target).value;

    let textValue: TextValue = {
      label: this.label,
      value: this.value,
    };
    this.valueChangedEvent.emit(textValue);
  }
}
