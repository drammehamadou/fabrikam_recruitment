import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training, TrainingsService } from '@nx-library/trainings';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.scss']
})
export class TrainingsListComponent implements OnInit {
  trainings: Training[] = [];
  
  constructor(private trainingsService: TrainingsService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getTrainings();
  }

  private _getTrainings() {
    this.trainingsService.getTrainings().subscribe((trainings) => {
      this.trainings = trainings;
    });
  }

  updateTraining (trainingid: string){
    this.router.navigateByUrl(`trainings/form/${trainingid}`)
  };

  deleteTraining (trainingId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Training?',
      header: 'Delete Training',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trainingsService.deleteTraining(trainingId).subscribe(
          () => {
            this._getTrainings();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Training is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Training is not deleted!'
            });
          }
        );
      }
    });
  }


}
