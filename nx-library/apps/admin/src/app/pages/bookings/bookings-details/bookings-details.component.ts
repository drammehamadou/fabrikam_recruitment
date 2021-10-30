import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking, BookingsService } from '@nx-library/bookings';
import { MessageService } from 'primeng/api';
import { BOOKING_STATUS } from '../booking.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-bookings-details',
  templateUrl: './bookings-details.component.html',
  styleUrls: ['./bookings-details.component.scss']
})
export class BookingsDetailsComponent implements OnInit, OnDestroy {
  booking: Booking;
  bookingStatuses = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private bookingService: BookingsService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapBookingStatus();
    this._getBooking();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _mapBookingStatus() {
    this.bookingStatuses = Object.keys(BOOKING_STATUS).map((key) => {
      return {
        id: key,
        name: BOOKING_STATUS[key].label
      };
    });
  }

  private _getBooking() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.bookingService
        .getBooking(params.id)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((booking) => {
          this.booking = booking;
          this.selectedStatus = booking.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.bookingService
    .updateBooking({ status: event.value }, 
      this.booking.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Booking is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Booking is not updated!'
        });
      }
    );
  }

}
