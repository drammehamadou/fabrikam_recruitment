import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Attendee, AttendeesService } from '@nx-library/attendees';

@Component({
  selector: 'admin-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.scss']
})
export class AttendeesListComponent implements OnInit {
  attendees: Attendee[] = [];

  constructor(private attendeesService: AttendeesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this._getAttendees();
  }

  deleteAttendee(attendeeId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Attendee?',
      header: 'Delete Attendee',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attendeesService.deleteAttendee(attendeeId).subscribe(
          () => {
            this._getAttendees();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Attendee is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Attendee is not deleted!'
            });
          }
        );
      }
    });
  }
  updateAttendee(attendeeid: string) {
    this.router.navigateByUrl(`attendees/form/${attendeeid}`);
  }

  private _getAttendees() {
    this.attendeesService.getAttendees().subscribe((attendees) => {
      this.attendees = attendees;
    });
  }
  getCountryName(countryKey: string) {
    if (countryKey) return this.attendeesService.getCountry(countryKey);
  }
}
