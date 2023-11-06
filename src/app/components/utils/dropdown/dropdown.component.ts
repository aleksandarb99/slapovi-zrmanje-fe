import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass'],
})
export class DropdownComponent {
  divIsOpened = false;

  numberOfAdults: number = 0;
  numberOfChildren: number = 0;
  numberOfInfants: number = 0;
  numberOfPets: number = 0;

  guestLine: string = 'Choose guests';

  constructor() {}

  openDiv(event: Event) {
    this.divIsOpened = !this.divIsOpened;
    event.stopPropagation();
  }

  generateQuestLine() {
    if (
      this.numberOfAdults == 0 &&
      this.numberOfChildren == 0 &&
      this.numberOfInfants == 0 &&
      this.numberOfPets == 0
    ) {
      this.guestLine = 'Choose guests';
    } else {
      this.guestLine =
        this.numberOfAdults +
        ' Adults,' +
        this.numberOfChildren +
        ' Children,' +
        this.numberOfInfants +
        ' Infants,' +
        this.numberOfPets +
        ' Pets';
    }
  }

  lower(fieldIndex: number, event: Event) {
    if (fieldIndex == 0) {
      if (this.numberOfAdults == 0) {
        return;
      }
      this.numberOfAdults--;
    } else if (fieldIndex == 1) {
      if (this.numberOfChildren == 0) {
        return;
      }
      this.numberOfChildren--;
    } else if (fieldIndex == 2) {
      if (this.numberOfInfants == 0) {
        return;
      }
      this.numberOfInfants--;
    } else if (fieldIndex == 3) {
      if (this.numberOfPets == 0) {
        return;
      }
      this.numberOfPets--;
    }

    this.generateQuestLine();

    event.stopPropagation();
  }

  raise(fieldIndex: number, event: Event) {
    if (fieldIndex == 0) {
      this.numberOfAdults++;
    } else if (fieldIndex == 1) {
      this.numberOfChildren++;
    } else if (fieldIndex == 2) {
      this.numberOfInfants++;
    } else if (fieldIndex == 3) {
      this.numberOfPets++;
    }

    this.generateQuestLine();

    event.stopPropagation();
  }
}
