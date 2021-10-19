import { Component, OnInit } from '@angular/core';
import { Course, CoursesService } from '@nx-library/trainings';

@Component({
  selector: 'nx-library-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

courses: Course[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(cous => {
      this.courses = cous;
    });
  }

}
