import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { CommonService } from 'src/app/services/common.service';
import { TextService } from 'src/app/services/text.service';
import { pages } from 'src/assets/texts/sections';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.sass']
})
export class MobileHeaderComponent {
  isDarkHeader: boolean = false;
  path: string = '../../../assets';
  reservationImage = `${this.path}/avatars/Reservation.png`;
  burgerImage = `${this.path}/avatars/Burger.png`;
  logoImage = `${this.path}/Logo.png`;
  languageMenuIsOpened = false;
  isBurgerSpread = false;
  text: LanguageLabel | undefined;
  @Output() sectionsEvent = new EventEmitter<LandingPageSection[]>();
  @Output() scrollUpEvent = new EventEmitter<void>();
  @Output() contactEvent = new EventEmitter<void>();

  @Input() position: string = 'fixed';

  constructor(
    private textService: TextService,
    private router: Router,
    private commonService: CommonService
  ) {
    this.checkSavedPreferableLanguage();
  }

  ngOnInit() {
    this.textService.text.subscribe((data) => (this.text = data));
  }

  checkSavedPreferableLanguage() {
    let savedLanguageIndex = localStorage.getItem('preferableLanguageIndex');
    let chosenIndex = savedLanguageIndex
      ? Number.parseInt(savedLanguageIndex)
      : 1;
    this.textService.updateText(chosenIndex);
    this.sectionsEvent.emit(pages[chosenIndex]);
  }

  selectPreferableLanguage(indexOfLanguage: number) {
    localStorage.setItem('preferableLanguageIndex', indexOfLanguage.toString());
    this.textService.updateText(indexOfLanguage);
    this.sectionsEvent.emit(pages[indexOfLanguage]);
  }

  changeBurgerFlag(event: Event) {
    this.isBurgerSpread = !this.isBurgerSpread;
    console.log(this.isBurgerSpread)
    event.stopPropagation();
  }

  revertFlags() {
    this.isBurgerSpread = false;
    this.languageMenuIsOpened = false;
  }

  openLanguageMenu(event: Event) {
    this.languageMenuIsOpened = !this.languageMenuIsOpened;
    event.stopPropagation();
  }

  changeHeaderTheme(isDarkHeader: boolean) {
    this.isDarkHeader = isDarkHeader;
    if (isDarkHeader) {
      this.reservationImage = `${this.path}/avatars/DarkReservation.png`;
      this.burgerImage = `${this.path}/avatars/DarkBurger.png`;
      this.logoImage = `${this.path}/DarkLogo.png`;
    } else {
      this.reservationImage = `${this.path}/avatars/Reservation.png`;
      this.burgerImage = `${this.path}/avatars/Burger.png`;
      this.logoImage = `${this.path}/Logo.png`;
    }
  }

  /**
   * Navigate to landing page
   * For CampPage and other pages -> switch to Landing page
   */
  navigateToLanding() {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  redirectTo(route: string) {
    this.router.navigate(['/' + route]);
  }

  moveToContactSection(): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
      setTimeout(() => {
        this.commonService.scrollToContactSectionEmit();
      }, 400);
    } else {
      this.commonService.scrollToContactSectionEmit();
    }
  }

  moveToAboutUsSection(): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
      setTimeout(() => {
        this.commonService.scrollToAboutUsSectionEmit();
      }, 400);
    } else {
      this.commonService.scrollToAboutUsSectionEmit();
    }
  }
}
