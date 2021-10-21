import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, CoursesService } from '@nx-library/trainings';

@Component({
  selector: 'admin-trainings-form',
  templateUrl: './trainings-form.component.html',
  styleUrls: ['./trainings-form.component.scss']
})
export class TrainingsFormComponent implements OnInit {

  editmode : false;
  form!: FormGroup;
  isSubmitted = false;

  courses : Course[] = [];

  constructor(private formBuilder: FormBuilder,
              private coursesService: CoursesService) { 
    
  }

  ngOnInit(): void {
    this._initForm();
    this._getCourses()
  }

  //initialize the form
  private _initForm() {
    this. form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      course: ['', Validators.required],
      countInTraining: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      isFeatured: ['']
    })
  }

  private _getCourses() {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  get trainingForm() {
    return this.form.controls;
  }

  onSubmit() {
    
  }

  onCancel() {

  }

}
