import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Course {
  title: string
}

@Component({
  selector: 'admin-trainings-form',
  templateUrl: './trainings-form.component.html',
  styleUrls: ['./trainings-form.component.scss']
})
export class TrainingsFormComponent implements OnInit {

  editmode : false;
  form: FormGroup;
  isSubmitted = false;

  //to be deleted
  courses : Course[] = [];
  selectedCourse!: Course;

  constructor(private formBuilder: FormBuilder) { 
    this.courses = [
      {title: 'CV writing'},
      {title: 'Presentation'},
      {title: 'IT skills'},
      {title: 'Health and safety'},
      {title: 'Customer care'},
      {title: 'Project management'},
      
  ];
  }

  ngOnInit(): void {
    this._initForm();
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

  get trainingForm() {
    return this.form.controls;
  }

  onSubmit() {}

}
