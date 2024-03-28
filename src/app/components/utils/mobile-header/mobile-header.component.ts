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
  languageMenuIsOpened = false;
  isBurgerSpread = false;
  text: LanguageLabel | undefined;
  @Output() sectionsEvent = new EventEmitter<LandingPageSection[]>();
  @Output() burgerEvent = new EventEmitter<boolean>(true);
  @Input() isLandingHeader: boolean = true;

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
    this.burgerEvent.emit(this.isBurgerSpread);
    // if (this.isBurgerSpread) {
    //   window.addEventListener('scroll', this.disableScroll, true);
    // } else {
    //   window.removeEventListener('scroll', this.disableScroll, true);
    // }
    event.stopPropagation();
  }

  disableScroll= () => {
    window.scrollTo(0, 0);
  }

  openLanguageMenu(event: Event) {
    this.languageMenuIsOpened = !this.languageMenuIsOpened;
    event.stopPropagation();
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
    this.isBurgerSpread = false;
    this.burgerEvent.emit(this.isBurgerSpread);
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    setTimeout(() => {
      this.commonService.scrollToContactSectionEmit();
    }, 400);
  }

  moveToAboutUsSection(): void {
    this.isBurgerSpread = false;
    this.burgerEvent.emit(this.isBurgerSpread);
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    setTimeout(() => {
      this.commonService.scrollToAboutUsSectionEmit();
    }, 400);
  }

  // onScroll(event: Event) {
  //   event.stopPropagation();
  // }
}
