import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
})
export class CheckboxComponent implements OnChanges {
  value: boolean = false;
  @Input() label: string = '';
  @Output() valueChangedEvent = new EventEmitter<boolean>();

  @Input() isMobile: boolean = false;

  @Input()
  passedValue: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['passedValue']) return;
    let currentValue = changes['passedValue'].currentValue;
    if (
      changes['passedValue'].previousValue == undefined &&
      currentValue !== undefined
    ) {
      if (currentValue) {
        this.onInput(undefined);
      }
    }
  }

  onInput(event: Event | undefined) {
    this.value = !this.value;
    this.valueChangedEvent.emit(this.value);
  }
}
