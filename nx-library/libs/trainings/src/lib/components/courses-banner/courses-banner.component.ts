import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'trainings-courses-banner',
  templateUrl: './courses-banner.component.html',
  styleUrls: ['./courses-banner.component.scss']
})
export class CoursesBannerComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService
      .getCourses()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((courses) => {
        this.courses = courses;
      });
  }

  //end memory leak(subscription)
  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
