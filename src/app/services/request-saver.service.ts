import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestSaverService {
  constructor() {}

  saveData(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  getAndDeleteData(name: string): any {
    let campData = localStorage.getItem(name);

    // TODO: Ako je proslo sat vremena od proslog puta; obrisi i vrati null
    if (false) {
      localStorage.removeItem(name);
    }

    if (!campData) {
      return null;
    }
    return JSON.parse(campData);
  }
}
