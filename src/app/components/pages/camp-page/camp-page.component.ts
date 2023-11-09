import { Component, ElementRef } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { pages } from 'src/assets/texts/sections';
import { texts } from 'src/assets/texts/texts';
import { Subject } from 'rxjs';
import { TextValue } from 'src/app/model/text-value.model';
import { ViewportScroller } from '@angular/common';

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

  d1IsOpenedSubject = new Subject<boolean>();
  d2IsOpenedSubject = new Subject<boolean>();

  constructor(private el: ElementRef) {
    this.checkSavedPreferableLanguage();
    this.overrideWheelEvent();
  }

  checkAvailability() {
    console.log('checkAvailability');
  }

  revertFlags() {
    this.isReservationSpread = false;
    this.isBurgerSpread = false;
    this.languageMenuIsOpened = false;

    this.d1IsOpenedSubject.next(true);
    this.d2IsOpenedSubject.next(true);
  }

  saveTextValue(textValue: TextValue) {
    // TODO: Validate if email
    // console.log(textValue);
  }

  saveIntValues(intValues: IntValues) {
    // console.log(intValues);
  }

  saveCheckboxValue(booleanValue: boolean) {
    // console.log(booleanValue);
  }

  onShowDivEvent(label: string) {
    if (label === this.text!.dropdownLodgingLabel) {
      this.d1IsOpenedSubject.next(true);
    } else {
      this.d2IsOpenedSubject.next(true);
    }
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
        // event.preventDefault();
        // event.stopPropagation();
        // this.scrollToSection(event.deltaY);
      }
      // { passive: false }
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

  openLanguageMenu(event: Event) {
    this.languageMenuIsOpened = !this.languageMenuIsOpened;

    event.stopPropagation();
  }
}
