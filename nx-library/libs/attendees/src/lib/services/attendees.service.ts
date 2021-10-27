import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendee } from '../models/attendee';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
  apiURLAttendees = environment.apiUrl + 'attendees';

  constructor(private http: HttpClient) {}

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
}
