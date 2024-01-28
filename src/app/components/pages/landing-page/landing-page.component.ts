import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { TextService } from 'src/app/services/text.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { CommonService } from 'src/app/services/common.service';
import { TextValue } from 'src/app/model/text-value.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
})
export class LandingPageComponent implements OnInit {
  text: LanguageLabel | undefined;
  screenIsMoving = false;
  currentSectionIndex = 0;
  sections: LandingPageSection[] = [];
  @ViewChild(HeaderComponent, {static : true}) headerComponent : HeaderComponent | undefined;

  constructor(private el: ElementRef, private textService: TextService, private commonService: CommonService) {
    this.commonService.overrideWheelEvent(this);
  }

  ngOnInit() {
    this.commonService.contactEmitter.subscribe(() => this.scrollToLastSection());
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

  scrollToElement(elementId: string): void {
    const element = this.el.nativeElement.querySelector(`#${elementId}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  saveTextValue(textValue: TextValue) {
    // TODO: Save input text value
  }

  sendMessage() {
    // TODO: send a message
  }
}
