import { Component, ViewChild } from '@angular/core';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { HeaderComponent } from '../../utils/header/header.component';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-camp-page',
  templateUrl: './camp-page.component.html',
  styleUrls: ['./camp-page.component.sass'],
})
export class CampPageComponent {
  text: LanguageLabel | undefined;
  @ViewChild(HeaderComponent, {static : true}) headerComponent : HeaderComponent | undefined;

  divIsOpened = false;

  numberOfAdults: number = 0;
  numberOfChildren: number = 0;
  numberOfInfants: number = 0;
  numberOfPets: number = 0;

  guestLine: string = 'Empty';

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.textService.text.subscribe(data => this.text = data);
    this.headerComponent?.changeHeaderTheme(true);
  }

  generateQuestLine() {
    if (
      this.numberOfAdults == 0 &&
      this.numberOfChildren == 0 &&
      this.numberOfInfants == 0 &&
      this.numberOfPets == 0
    ) {
      this.guestLine = 'Empty';
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

  openDiv(event: Event) {
    this.divIsOpened = !this.divIsOpened;
    event.stopPropagation();
  }
}
