import { Component, OnInit } from '@angular/core';
import { BookingsService } from '@nx-library/bookings';
import { TrainingsService } from '@nx-library/trainings';
import { AttendeesService } from '@nx-library/attendees';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  statistics = [];
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
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}
