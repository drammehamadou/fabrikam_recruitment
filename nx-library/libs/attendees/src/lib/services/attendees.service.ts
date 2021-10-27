import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendee } from '../models/attendee';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
declare const require;

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
  apiURLAttendees = environment.apiUrl + 'attendees';

  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getAttendees(): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(this.apiURLAttendees);
  }

  getAttendee(attendeeId: string): Observable<Attendee> {
    return this.http.get<Attendee>(`${this.apiURLAttendees}/${attendeeId}`);
  }

  createAttendee(attendee: Attendee): Observable<Attendee> {
    return this.http.post<Attendee>(this.apiURLAttendees, attendee);
  }

  updateAttendee(attendee: Attendee): Observable<Attendee> {
    return this.http.put<Attendee>(`${this.apiURLAttendees}/${attendee.id}`, attendee);
  }

  deleteAttendee(attendeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLAttendees}/${attendeeId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
}
