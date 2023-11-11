import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
})
export class CheckboxComponent {
  value: boolean = false;
  @Input() label: string = '';
  @Output() valueChangedEvent = new EventEmitter<boolean>();

  constructor() {}

  onInput(event: Event) {
    this.value = !this.value;
    this.valueChangedEvent.emit(this.value);
  }
}
