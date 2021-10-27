import { Location } from '@angular/common';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendeesService, Attendee } from '@nx-library/attendees';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-attendees-form',
  templateUrl: './attendees-form.component.html',
  styleUrls: ['./attendees-form.component.scss']
})
export class AttendeesFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentAttendeeId: string;
  countries = [];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private attendeesService: AttendeesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initAttendeeForm();
    this._checkEditMode();
    this._getCountries();
  }

  private _initAttendeeForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      address1: [''],
      address2: [''],
      postCode: [''],
      county: [''],
      country: ['']
    });
  }

  private _getCountries() {
    this.countries = this.attendeesService.getCountries();
  }

  private _addAttendee(attendee: Attendee) {
    this.attendeesService.createAttendee(attendee).subscribe(
      (attendee: Attendee) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Attendee ${attendee.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Attendee is not created!'
        });
      }
    );
  }

  private _updateAttendee(attendee: Attendee) {
    this.attendeesService.updateAttendee(attendee).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Attendee is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Attendee is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentAttendeeId = params.id;
        this.attendeesService.getAttendee(params.id).subscribe((attendee) => {
          this.attendeeForm.name.setValue(attendee.name);
          this.attendeeForm.email.setValue(attendee.email);
          this.attendeeForm.phone.setValue(attendee.phone);
          this.attendeeForm.isAdmin.setValue(attendee.isAdmin);
          this.attendeeForm.street.setValue(attendee.address1);
          this.attendeeForm.apartment.setValue(attendee.address2);
          this.attendeeForm.zip.setValue(attendee.postCode);
          this.attendeeForm.city.setValue(attendee.county);
          this.attendeeForm.country.setValue(attendee.country);

          this.attendeeForm.password.setValidators([]);
          this.attendeeForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const attendee: Attendee = {
      id: this.currentAttendeeId,
      name: this.attendeeForm.name.value,
      email: this.attendeeForm.email.value,
      phone: this.attendeeForm.phone.value,
      isAdmin: this.attendeeForm.isAdmin.value,
      address1: this.attendeeForm.address1.value,
      address2: this.attendeeForm.address2.value,
      postCode: this.attendeeForm.postCode.value,
      county: this.attendeeForm.county.value,
      country: this.attendeeForm.country.value
    };
    if (this.editmode) {
      this._updateAttendee(attendee);
    } else {
      this._addAttendee(attendee);
    }
  }

  onCancle() {
    this.location.back();
  }

  get attendeeForm() {
    return this.form.controls;
  }

}
