import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  constructor(private http: HttpClient) {}

  public checkPriceForCamp(data: any) {
    return this.http.post<void>(
      `${env.apiUrl}/api/accommodation/check-price/camp`,
      data
    );
  }

  public checkPriceForRoomOrApartment(data: any) {
    return this.http.post<void>(
      `${env.apiUrl}/api/accommodation/check-price/room-or-apartment`,
      data
    );
  }

  public checkAvailability(data: any) {
    return this.http.post<void>(
      `${env.apiUrl}/api/accommodation/check-availability`,
      data
    );
  }

  public verifyEmail(
    email: string,
    id: string,
    code: string,
    language: string
  ) {
    return this.http.get<void>(
      `${env.apiUrl}/api/accommodation/verify?email=${email}&id=${id}&code=${code}&language=${language}`
    );
  }

  public reject(email: string, id: string, code: string, language: string) {
    return this.http.get<void>(
      `${env.apiUrl}/api/accommodation/reject?email=${email}&id=${id}&code=${code}&language=${language}`
    );
  }

  public accept(email: string, id: string, code: string, language: string) {
    return this.http.get<void>(
      `${env.apiUrl}/api/accommodation/accept?email=${email}&id=${id}&code=${code}&language=${language}`
    );
  }

  public reserve(email: string, id: string, code: string, language: string) {
    return this.http.get<void>(
      `${env.apiUrl}/api/accommodation/reserve?email=${email}&id=${id}&code=${code}&language=${language}`
    );
  }

  public cancel(email: string, id: string, code: string, language: string) {
    return this.http.get<void>(
      `${env.apiUrl}/api/accommodation/cancel?email=${email}&id=${id}&code=${code}&language=${language}`
    );
  }

  public getInTouch(data: any) {
    return this.http.post<void>(
      `${env.apiUrl}/api/accommodation/get-in-touch`,
      data
    );
  }
}
