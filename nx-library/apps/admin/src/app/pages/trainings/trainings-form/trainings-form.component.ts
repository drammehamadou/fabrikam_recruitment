import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, CoursesService, Training, TrainingsService } from '@nx-library/trainings';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-trainings-form',
  templateUrl: './trainings-form.component.html',
  styleUrls: ['./trainings-form.component.scss']
})
export class TrainingsFormComponent implements OnInit, OnDestroy {
  editmode: boolean = false;
  form: FormGroup;
  isSubmitted = false;
  imageDisplay: string | ArrayBuffer;
  currentTrainingId: string;
  courses : Course[] = [];
  endsubs$: Subject<any> = new Subject();

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

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  //initialize the form
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      course: ['', Validators.required],
      countInTraining: ['', Validators.required],
      description: ['', Validators.required],
      schedule: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  private _getCourses() {
    this.coursesService
    .getCourses()
    .pipe(takeUntil(this.endsubs$))
    .subscribe((courses) => {
      this.courses = courses;
    });
  }

  //add training
  private _addTraining(trainingData: FormData) {
    this.trainingsService
    .createTraining(trainingData)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(
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

  //update trainings
  private _updateTraining(trainingFormData: FormData) {
    this.trainingsService
    .updateTraining(trainingFormData, 
      this.currentTrainingId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
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
    this.route.params
    .pipe(takeUntil(this.endsubs$))
    .subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentTrainingId = params.id;
        this.trainingsService
        .getTraining(params.id)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((training) => {
          this.trainingForm.name.setValue(training.name);
          this.trainingForm.course.setValue(training.course.id);
          this.trainingForm.price.setValue(training.price);
          this.trainingForm.countInTraining.setValue(training.countInTraining);
          this.trainingForm.isFeatured.setValue(training.isFeatured);
          this.trainingForm.description.setValue(training.description);
          this.trainingForm.schedule.setValue(training.schedule);
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
    this.location.back();
  }

  //update image by creating a file reader
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
