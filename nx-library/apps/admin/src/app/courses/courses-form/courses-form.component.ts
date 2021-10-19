import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nx-library-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required]
    })
  }

  onSubmit() {
    //validation to show name/icon is required
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    console.log(this.form.controls.name.value);
    console.log(this.form.controls.icon.value);
  }
  // refactoring
  get courseForm() {
    return this.form.controls;
  }

}
