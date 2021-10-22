import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, CoursesService } from '@nx-library/trainings';

@Component({
  selector: 'admin-trainings-form',
  templateUrl: './trainings-form.component.html',
  styleUrls: ['./trainings-form.component.scss']
})
export class TrainingsFormComponent implements OnInit {

  editmode! : false;
  form!: FormGroup;
  isSubmitted = false;
  imageDisplay: string | ArrayBuffer;

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

  onImageUpload(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      // this.form.patchValue({ image: file });
      // this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

}
