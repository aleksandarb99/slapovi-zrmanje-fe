import { Injectable } from '@angular/core';
import { GuestsValue } from '../model/guests.value.model';
import { ApartmentLodgingValue } from '../model/apartment-lodging.model';
import { RoomLodgingValue } from '../model/room-lodging.model';
import { CampLodgingValue } from '../model/camp-lodging.model';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  validateEmail(email: string): RegExpMatchArray | null {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  validateGuests(guests: GuestsValue): boolean {
    return guests.adults !== 0 || guests.children !== 0 || guests.children !== 0 || guests.children !== 0;
  }

  validateApartments(lodging: ApartmentLodgingValue): boolean {
    return lodging.apartment1 !== 0 || lodging.apartment2 !== 0 || lodging.apartment3 !== 0;
  }

  validateRooms(lodging: RoomLodgingValue): boolean {
    return lodging.room1 !== 0 || lodging.room2 !== 0 || lodging.room3 !== 0;
  }

  validateCamp(lodging: CampLodgingValue): boolean {
    return lodging.car !== 0 || lodging.caravan !== 0 || lodging.tent !== 0 || lodging.sleepingBag !== 0;
  }
}
