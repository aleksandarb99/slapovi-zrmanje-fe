import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageLabel } from '../model/language-label.model';
import { texts } from 'src/assets/texts/texts';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private textSubject = new BehaviorSubject<LanguageLabel>(texts[1]);
  text = this.textSubject.asObservable();

  constructor() { }

  public updateText(indexOfLanguage: number) {
    this.textSubject.next(texts[indexOfLanguage]);
  }
}
