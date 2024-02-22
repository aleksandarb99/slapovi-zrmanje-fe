import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  constructor(private http: HttpClient) {}

  public checkAvailability(data: any) {
    return this.http.post<void>(
      `${env.apiUrl}/api/accommodation/check-availability`,
      data
    );
  }

  public verifyEmail(email: string, id: string, code: string) {
    return this.http.get<void>(
      `${env.apiUrl}/api/accommodation/verify?email=${email}&id=${id}&code=${code}`
    );
  }
}
