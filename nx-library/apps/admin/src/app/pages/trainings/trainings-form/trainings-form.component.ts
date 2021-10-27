import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, CoursesService, Training, TrainingsService } from '@nx-library/trainings';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
              private location: Location,
              private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this._initForm();
    this._getCourses();
    this._checkEditMode();
  }

  //initialize the form
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      course: ['', Validators.required],
      countInTraining: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  private _getCourses() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
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

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = false;
        this.currentTrainingId = params.id;
        this.trainingsService.getTraining(params.id).subscribe((training) => {
          this.trainingForm.name.setValue(training.name);
          this.trainingForm.course.setValue(training.course.id);
          this.trainingForm.price.setValue(training.price);
          this.trainingForm.countInTraining.setValue(training.countInTraining);
          this.trainingForm.isFeatured.setValue(training.isFeatured);
          this.trainingForm.description.setValue(training.description);
          this.imageDisplay = training.image;
          this.trainingForm.image.setValidators([]);
          this.trainingForm.image.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const trainingFormData = new FormData();
    Object.keys(this.trainingForm).map((key) => {
      trainingFormData.append(key, this.trainingForm[key].value);
    });
    if (this.editmode) {
      this._updateTraining(trainingFormData);
    } else {
      this._addTraining(trainingFormData);
    }
  }

  onCancel() {
  }

  onImageUpload(event) {
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
  get trainingForm() {
    return this.form.controls;
  }

}
