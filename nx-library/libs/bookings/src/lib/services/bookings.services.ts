import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

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

  getBookingsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLBookings}/get/count`)
      .pipe(map((objectValue: any) => objectValue.bookingCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLBookings}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
}
