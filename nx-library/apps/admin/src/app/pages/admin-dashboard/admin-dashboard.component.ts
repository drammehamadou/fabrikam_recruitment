import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingsService } from '@nx-library/bookings';
import { TrainingsService } from '@nx-library/trainings';
import { AttendeesService } from '@nx-library/attendees';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy{
  statistics = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private attendeeService: AttendeesService,
    private trainingService: TrainingsService,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.bookingsService.getBookingsCount(),
      this.trainingService.getTrainingsCount(),
      this.attendeeService.getAttendeesCount(),
      this.bookingsService.getTotalSales()
    ]).pipe(takeUntil(this.endsubs$))
    .subscribe((values) => {
      this.statistics = values;
    });
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}
