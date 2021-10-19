import { Component, OnInit } from '@angular/core';
import { Course, CoursesService } from '@nx-library/trainings';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'nx-library-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

courses: Course[] = [];

  constructor(private coursesService: CoursesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getCourses()
  }

  deleteCourse(courseId : string) {
//show a dialog first before delete
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Course?',
      header: 'Delete Course',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.coursesService.deleteCourse(courseId).subscribe
        ((Response) => {
          this._getCourses();
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Course successfully deleted.'});
        },
        (error) => {
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Course is not deleted.'
          });
        })
      },
      reject: () => {
      }
  });
  }

  private _getCourses() {
    this.coursesService.getCourses().subscribe(cous => {
      this.courses = cous;
    });
  }
}
