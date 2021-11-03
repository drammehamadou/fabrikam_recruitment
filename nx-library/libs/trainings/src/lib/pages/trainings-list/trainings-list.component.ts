import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { Training } from '../../models/training';
import { CoursesService } from '../../services/courses.service';
import { TrainingsService } from '../../services/trainings.service';

@Component({
  selector: 'trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.scss']
})
export class TrainingsListComponent implements OnInit {
  trainings: Training[] = [];
  courses: Course[] = [];
  isCoursePage = true;

  constructor(
    private trainingsService: TrainingsService,
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.courseid ? this._getTrainings([params.courseid]) : this._getTrainings();
      params.courseid ? (this.isCoursePage = true) : (this.isCoursePage = false);
    });
    this._getTrainings();
    this._getCourses();
  }

  private _getTrainings(coursesFilter?: any) {
    this.trainingsService.getTrainings(coursesFilter).subscribe((resTrainings) => {
      this.trainings = resTrainings;
    });
  }

  private _getCourses() {
    this.coursesService.getCourses().subscribe((resCourses) => {
      this.courses = resCourses;
    });
  }

  courseFilter() {
    const selectedCourses = this.courses
      .filter((course) => course.checked)
      .map((course) => course.id);

    this._getTrainings(selectedCourses);
  }

}
