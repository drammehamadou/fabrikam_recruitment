import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course, CoursesService } from '@nx-library/trainings';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {

courses: Course[] = [];
endsubs$: Subject<any> = new Subject();

  constructor(private coursesService: CoursesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this._getCourses()
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteCourse(courseId : string) {
//show a dialog first before delete
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Course?',
      header: 'Delete Course',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.coursesService
        .deleteCourse(courseId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe
        (() => {
          this._getCourses();
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Course successfully deleted.'});
        },
        () => {
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Course is not deleted.'
          });
        })
      },
  });
  }

  updateCourse(courseId: string) {
    this.router.navigateByUrl(`courses/form/${courseId}`)
  }

  private _getCourses() {
    this.coursesService
    .getCourses()
    .pipe(takeUntil(this.endsubs$))
    .subscribe(cous => {
      this.courses = cous;
    });
  }
}
