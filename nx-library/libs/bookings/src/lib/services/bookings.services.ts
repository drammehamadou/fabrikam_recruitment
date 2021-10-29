import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  apiURLBookings = environment.apiUrl + 'bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiURLBookings);
  }

  getBooking(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiURLBookings}/${bookingId}`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiURLBookings, booking);
  }

  updateBooking(bookingStatus: { status: string }, bookingId: string): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiURLBookings}/${bookingId}`, bookingStatus);
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLBookings}/${bookingId}`);
  }
}
