import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course, CoursesService } from '@nx-library/trainings';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'nx-library-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: boolean = false;
  editmode = false;
  currentCourseId! : string;

  constructor(private formBuilder: FormBuilder,
              private coursesService: CoursesService,
              private messageService: MessageService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required]
    })

    this._checkEditMode();
  }

  //onsumit create course
  onSubmit() {
    //validation to show name/icon is required
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const course : Course = {
      id: this.currentCourseId,
      name: this.courseForm.name.value,
      icon: this.courseForm.icon.value,
    }
    if(this.editmode) {
      this._updateCourse(course)
    } else {
      this._addCourse(course)
    }
  }

  private _addCourse(course: Course) {
    this.coursesService.createCourse(course).subscribe(
      (course: Course) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Course ${course.name} is created!`
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
          detail: 'Course is not created!'
        });
      }
    );
  }

  private _updateCourse(course: Course) {
    this.coursesService.updateCourse(course).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course is updated!'
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
          detail: 'Course is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.editmode = true;
        this.currentCourseId = params.id;
        this.coursesService.getCourse(params.id).subscribe(course => {
          this.courseForm.name.setValue(course.name);
          this.courseForm.icon.setValue(course.icon);
        })
      }
    })
  }

  // refactoring
  get courseForm() {
    return this.form.controls;
  }

}
