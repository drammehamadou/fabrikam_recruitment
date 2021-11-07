import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training, TrainingsService } from '@nx-library/trainings';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.scss']
})
export class TrainingsListComponent implements OnInit {
  trainings: Training[] = [];
  endsubs$: Subject<any> = new Subject();
  
  constructor(private trainingsService: TrainingsService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getTrainings();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getTrainings() {
    this.trainingsService
    .getTrainings()
    .pipe(takeUntil(this.endsubs$))
    .subscribe((trainings) => {
      this.trainings = trainings;
    });
  }

  updateTraining (trainingid: string){
    this.router.navigateByUrl(`trainings/form/${trainingid}`)
  };

  //Delete training session with confirmation
  deleteTraining (trainingId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Training session?',
      header: 'Delete Training',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trainingsService
        .deleteTraining(trainingId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
          () => {
            this._getTrainings();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Training session is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Training Session is not deleted!'
            });
          }
        );
      }
    });
  }


}
