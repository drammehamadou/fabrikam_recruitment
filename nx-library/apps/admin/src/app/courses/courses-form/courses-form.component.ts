import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
              private coursesService: CoursesService,
              private messageService: MessageService,
              private location: Location) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required]
    })
  }

  //onsumit create course
  onSubmit() {
    //validation to show name/icon is required
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const course : Course = {
      name: this.courseForm.name.value,
      icon: this.courseForm.icon.value,
    }
    this.coursesService.createCourse(course)
    .subscribe(Response => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Course successfully created.'});
    },
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Course is not created.'});
    });
    timer(2000).toPromise().then(done => {
      this.location.back();
    });
  }
  // refactoring
  get courseForm() {
    return this.form.controls;
  }

}
