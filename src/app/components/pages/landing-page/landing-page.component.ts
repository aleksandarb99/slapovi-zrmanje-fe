import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { TextService } from 'src/app/services/text.service';
import { HeaderComponent } from '../../utils/header/header.component';

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

  constructor(private el: ElementRef, private textService: TextService) {
    this.overrideWheelEvent();
  }

  ngOnInit() {
    this.textService.text.subscribe(data => this.text = data);
    this.headerComponent!.checkSavedPreferableLanguage();
  }

  setSections(sections: LandingPageSection[]) {
    this.sections = sections;
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
}
