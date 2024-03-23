import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { TextService } from 'src/app/services/text.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { CommonService } from 'src/app/services/common.service';
import { TextValue } from 'src/app/model/text-value.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
})
export class LandingPageComponent implements OnInit {
  text: LanguageLabel | undefined;
  name: string = '';
  message: string = '';
  email: string = '';
  screenIsMoving = false;
  isMobile = false;
  currentSectionIndex = 0;
  sections: LandingPageSection[] = [];
  @ViewChild(HeaderComponent, {static : true}) headerComponent : HeaderComponent | undefined;

  constructor(
    private el: ElementRef, 
    private textService: TextService, 
    private commonService: CommonService, 
    private accommodationService: AccommodationService,
    private notificationService: NotificationService) {
    this.commonService.overrideWheelEvent(this);
  }

  ngOnInit() {
    this.commonService.contactEmitter.subscribe(() => this.scrollToLastSection());
    this.commonService.aboutUsEmitter.subscribe(() => this.scrollToAboutUsSection());
    this.textService.text.subscribe(data => this.text = data);
    this.headerComponent!.checkSavedPreferableLanguage();
  }

  setSections(sections: LandingPageSection[]) {
    this.sections = sections;
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    this.headerComponent?.changeHeaderTheme(element.scrollTop > 600 ? true : false);
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
      }, 800);
    }
  }

  scrollToSection(deltaY: number): void {
    if (deltaY >= 0 && this.currentSectionIndex === this.sections.length + 2) {
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
      }, 800);
    }
  }

  scrollToLastSection(): void {
    if (this.screenIsMoving === false) {
      this.screenIsMoving = true;

      this.currentSectionIndex = this.sections.length + 2;
      this.scrollToElement('page' + this.currentSectionIndex);

      setTimeout(() => {
        this.screenIsMoving = false;
      }, 800);
    }
  }

  scrollToAboutUsSection(): void {
    if (this.screenIsMoving === false) {
      this.screenIsMoving = true;

      this.currentSectionIndex = this.sections.length + 1;
      this.scrollToElement('page' + this.currentSectionIndex);

      setTimeout(() => {
        this.screenIsMoving = false;
      }, 800);
    }
  }

  scrollToElement(elementId: string): void {
    const element = this.el.nativeElement.querySelector(`#${elementId}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  saveTextValue(textValue: TextValue) {
    if (textValue.label === this.text!.inputNameText) {
      this.name = textValue.value;
    }
    if (textValue.label === this.text!.inputMessageText) {
      this.message = textValue.value;
    }
    if (textValue.label === this.text!.inputEmailText) {
      this.email = textValue.value;
    }
  }

  sendMessage(event: Event) {
    if (!this.name || !this.email || !this.message) {
      event.stopPropagation();
      return;
    }

    let data = {
      name: this.name,
      email: this.email,
      message: this.message
    }

    this.accommodationService.getInTouch(data).subscribe({
      complete: () => {
        this.name = '';
        this.email = '';
        this.message = '';
        this.notificationService.showSuccess("Successfully sent!")},
      error: (error) => this.notificationService.showError(error.error.message)
    });
  }
  
  onScreenWidth600(isMobile: boolean) {
    this.isMobile = isMobile;
    if (isMobile) {
      // Invoke your specific function here
      this.commonService.removeWheelEvent();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    // Check if the user has scrolled
    const scrollY = window.scrollY;
    this.headerComponent?.changeHeaderTheme(scrollY > 600 ? true : false);
  }
}
