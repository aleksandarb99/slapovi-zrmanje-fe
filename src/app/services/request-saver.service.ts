import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestSaverService {
  constructor() {}

  saveData(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
    localStorage.setItem(name + '-time', new Date().toString());
  }

  getAndDeleteData(name: string): any {
    let campData = localStorage.getItem(name);
    let time = localStorage.getItem(name + '-time');

    if (!campData || !time) {
      return null;
    }

    let differenceMs = Math.abs(
      new Date().getTime() - new Date(time).getTime()
    );
    let differenceMinutes = differenceMs / (1000 * 60);

    if (differenceMinutes > 60) {
      localStorage.removeItem(name);
      localStorage.removeItem(name + '-time');
      return null;
    }

    return JSON.parse(campData);
  }
}
