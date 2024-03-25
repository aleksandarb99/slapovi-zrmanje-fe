import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { TextService } from 'src/app/services/text.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.sass'],
})
export class GalleryPageComponent {
  isMobile = false;
  text: LanguageLabel | undefined;
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  constructor(
    private textService: TextService,
    protected commonService: CommonService
  ) {}

  ngOnInit() {
    this.textService.text.subscribe((data) => (this.text = data));
    this.commonService.removeWheelEvent();
    this.headerComponent?.changeHeaderTheme(true);
  }

  onScreenWidth600(isMobile: boolean) {
    this.isMobile = isMobile;
    if (isMobile) {
      // Invoke your specific function here
      this.commonService.removeWheelEvent();
    }
  }
}
