import { Component, ViewChild } from '@angular/core';
import { IntValues } from 'src/app/model/int-values.model';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { HeaderComponent } from '../../utils/header/header.component';
import { Subject } from 'rxjs';
import { TextValue } from 'src/app/model/text-value.model';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-camp-page',
  templateUrl: './camp-page.component.html',
  styleUrls: ['./camp-page.component.sass'],
})
export class CampPageComponent {
  text: LanguageLabel | undefined;
  @ViewChild(HeaderComponent, {static : true}) headerComponent : HeaderComponent | undefined;

  divIsOpenedSubject = new Subject<string>();

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.textService.text.subscribe(data => this.text = data);
    this.headerComponent?.changeHeaderTheme(true);
  }

  checkAvailability() {
    console.log('checkAvailability');
  }

  revertFlags() {
    this.divIsOpenedSubject.next('');
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
    this.divIsOpenedSubject.next(label);
  }
}
