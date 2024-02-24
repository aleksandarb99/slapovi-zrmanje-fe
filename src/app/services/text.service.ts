import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageLabel } from '../model/language-label.model';
import { texts } from 'src/assets/texts/texts';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private textSubject = new BehaviorSubject<LanguageLabel>(texts[1]);
  text = this.textSubject.asObservable();

  private index: number = 1;

  constructor() {}

  public updateText(indexOfLanguage: number) {
    this.index = indexOfLanguage;
    this.textSubject.next(texts[indexOfLanguage]);
  }

  public getLanguage(): string {
    let language = 'HR';
    if (this.index == 1) {
      language = 'EN';
    }
    if (this.index == 2) {
      language = 'DE';
    }
    return language;
  }
}
