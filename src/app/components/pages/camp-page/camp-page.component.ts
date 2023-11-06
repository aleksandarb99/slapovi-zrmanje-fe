import { Component, ElementRef } from '@angular/core';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { pages } from 'src/assets/texts/sections';
import { texts } from 'src/assets/texts/texts';

@Component({
  selector: 'app-camp-page',
  templateUrl: './camp-page.component.html',
  styleUrls: ['./camp-page.component.sass'],
})
export class CampPageComponent {
  isDarkHeader: boolean = true;
  path: string = '../../../assets/';
  reservationImage = `${this.path}/avatars/DarkReservation.png`;
  burgerImage = `${this.path}/avatars/DarkBurger.png`;
  logoImage = `${this.path}/DarkLogo.png`;
  languageMenuIsOpened = false;
  isReservationSpread = false;
  isBurgerSpread = false;
  text: LanguageLabel | undefined;
  screenIsMoving = false;
  currentSectionIndex = 0;
  sections: LandingPageSection[] = [];

  divIsOpened = false;

  numberOfAdults: number = 0;
  numberOfChildren: number = 0;
  numberOfInfants: number = 0;
  numberOfPets: number = 0;

  guestLine: string = 'Empty';

  constructor(private el: ElementRef) {
    this.checkSavedPreferableLanguage();
    this.overrideWheelEvent();
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

  checkSavedPreferableLanguage() {
    let savedLanguageIndex = localStorage.getItem('preferableLanguageIndex');

    if (savedLanguageIndex !== null) {
      this.updateTexts(Number.parseInt(savedLanguageIndex));
    } else {
      this.updateTexts(1);
    }
  }

  selectPreferableLanguage(indexOfLanguage: number) {
    this.updateTexts(indexOfLanguage);

    localStorage.setItem('preferableLanguageIndex', indexOfLanguage.toString());
  }

  updateTexts(indexOfLanguage: number) {
    this.text = texts[indexOfLanguage];
    this.sections = pages[indexOfLanguage];
  }

  overrideWheelEvent() {
    document.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.scrollToSection(event.deltaY);
      },
      { passive: false }
    );
  }

  scrollToStart(): void {
    if (this.currentSectionIndex === 0) {
      return;
    }

    if (this.screenIsMoving === false) {
      this.screenIsMoving = true;

      this.currentSectionIndex = 0;

      this.scrollToElement('page' + this.currentSectionIndex);

      setTimeout(() => {
        this.screenIsMoving = false;
      }, 300);
    }
  }

  scrollToSection(deltaY: number): void {
    if (deltaY >= 0 && this.currentSectionIndex === this.sections.length + 1) {
      return;
    }
    if (deltaY < 0 && this.currentSectionIndex === 0) {
      return;
    }

    if (this.screenIsMoving === false) {
      this.screenIsMoving = true;

      if (deltaY >= 0) {
        this.currentSectionIndex += 1;
      } else {
        this.currentSectionIndex -= 1;
      }

      this.scrollToElement('page' + this.currentSectionIndex);

      setTimeout(() => {
        this.screenIsMoving = false;
      }, 300);
    }
  }

  scrollToElement(elementId: string): void {
    const element = this.el.nativeElement.querySelector(`#${elementId}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openDiv(event: Event) {
    this.divIsOpened = !this.divIsOpened;
    event.stopPropagation();
  }

  changeReservationFlag(event: Event) {
    if (this.isBurgerSpread) {
      this.isBurgerSpread = false;
      return;
    }
    this.isReservationSpread = true;
    event.stopPropagation();
  }

  changeBurgerFlag(event: Event) {
    if (this.isReservationSpread) {
      this.isReservationSpread = false;
      return;
    }
    this.isBurgerSpread = true;
    event.stopPropagation();
  }

  revertFlags() {
    this.isReservationSpread = false;
    this.isBurgerSpread = false;
    this.languageMenuIsOpened = false;

    if (this.divIsOpened) {
      this.divIsOpened = false;
    }
  }

  openLanguageMenu(event: Event) {
    this.languageMenuIsOpened = !this.languageMenuIsOpened;
    console.log(this.languageMenuIsOpened);

    event.stopPropagation();
  }
}
