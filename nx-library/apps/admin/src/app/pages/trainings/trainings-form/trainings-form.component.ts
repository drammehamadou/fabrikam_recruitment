import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, CoursesService, Training, TrainingsService } from '@nx-library/trainings';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-trainings-form',
  templateUrl: './trainings-form.component.html',
  styleUrls: ['./trainings-form.component.scss']
})
export class TrainingsFormComponent implements OnInit {

  editmode : false;
  form: FormGroup;
  isSubmitted = false;
  imageDisplay: string | ArrayBuffer;
  currentTrainingId: string;
  courses : Course[] = [];

  constructor(private formBuilder: FormBuilder,
              private coursesService: CoursesService,
              private trainingsService: TrainingsService,
              private messageService: MessageService,
              private location: Location) { 
    
  }

  ngOnInit(): void {
    this._initForm();
    this._getCourses()
  }

  //initialize the form
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      course: ['', Validators.required],
      countInTraining: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      isFeatured: [false]
    })
  }

  private _getCourses() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  get trainingForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const trainingFormData = new FormData();
    Object.keys(this.trainingForm).map((key) => {
      trainingFormData.append(key, this.trainingForm[key].value);
    });
    // if (this.editmode) {
    //   this._updateTraining(trainingFormData);
    // } else {
    //   this._addTraining(trainingFormData);
    // }
  }

  onCancel() {

  }

  onImageUpload(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _addTraining(trainingData: FormData) {
    this.trainingsService.createTraining(trainingData).subscribe(
      (training: Training) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Training ${training.name} is created!`
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
          detail: 'Training is not created!'
        });
      }
    );
  }

  private _updateTraining(trainingFormData: FormData) {
    this.trainingsService.updateTraining(trainingFormData, this.currentTrainingId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Training is updated!'
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
          detail: 'Training is not updated!'
        });
      }
    );
  }

}
