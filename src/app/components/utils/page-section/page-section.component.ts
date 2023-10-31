import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.sass']
})
export class PageSectionComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() comment: string | undefined;
  @Input() author: string | undefined;
  @Input() image: string;
  @Input() sectionIndex: number;

  constructor() {
    this.title = "Default title";
    this.description = "Default description";
    this.image = "Default image";
    this.sectionIndex = 1;
  }
}
