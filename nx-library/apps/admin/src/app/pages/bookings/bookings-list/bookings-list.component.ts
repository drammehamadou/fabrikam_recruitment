import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking, BookingsService } from '@nx-library/bookings';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BOOKING_STATUS } from '../booking.constants';

@Component({
  selector: 'admin-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  bookings: Booking[] = [];
  bookingStatus = BOOKING_STATUS;
  constructor(
    private bookingsService: BookingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getBookings();
  }

  _getBookings() {
    this.bookingsService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  showBooking(bookingId) {
    this.router.navigateByUrl(`bookings/${bookingId}`);
  }

  deleteBooking(bookingId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Booking?',
      header: 'Delete Booking',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookingsService.deleteBooking(bookingId).subscribe(
          () => {
            this._getBookings();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Booking is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Booking is not deleted!'
            });
          }
        );
      }
    });
  }

}