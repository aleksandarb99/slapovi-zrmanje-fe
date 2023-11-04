import { Component, ElementRef } from '@angular/core';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { pages } from 'src/assets/texts/sections';
import { texts } from 'src/assets/texts/texts';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
})
export class LandingPageComponent {
  isDarkHeader: boolean = false;
  path: string = '../../../assets/';
  reservationImage = `${this.path}/avatars/Reservation.png`;
  burgerImage = `${this.path}/avatars/Burger.png`;
  logoImage = `${this.path}/Logo.png`;
  languageMenuIsOpened = false;
  isReservationSpread = false;
  isBurgerSpread = false;
  text: LanguageLabel | undefined;
  screenIsMoving = false;
  currentSectionIndex = 0;
  sections: LandingPageSection[] = [];

  constructor(private el: ElementRef) {
    this.checkSavedPreferableLanguage();
    this.overrideWheelEvent();
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

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollTop > 600) {
      this.isDarkHeader = true;
      this.reservationImage = `${this.path}/avatars/DarkReservation.png`;
      this.burgerImage = `${this.path}/avatars/DarkBurger.png`;
      this.logoImage = `${this.path}/DarkLogo.png`;
    } else {
      this.isDarkHeader = false;
      this.reservationImage = `${this.path}/avatars/Reservation.png`;
      this.burgerImage = `${this.path}/avatars/Burger.png`;
      this.logoImage = `${this.path}/Logo.png`;
    }
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

  revertFlags() {
    this.isReservationSpread = false;
    this.isBurgerSpread = false;
    this.languageMenuIsOpened = false;
  }

  openLanguageMenu(event: Event) {
    this.languageMenuIsOpened = !this.languageMenuIsOpened;
    console.log(this.languageMenuIsOpened);

    event.stopPropagation();
  }
}
