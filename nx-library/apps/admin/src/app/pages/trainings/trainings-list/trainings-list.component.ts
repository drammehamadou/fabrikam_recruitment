import { Component, OnInit } from '@angular/core';
import { Training, TrainingsService } from '@nx-library/trainings';

@Component({
  selector: 'admin-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.scss']
})
export class TrainingsListComponent implements OnInit {
  trainings: Training[] = [];
  
  constructor(private trainingsService: TrainingsService) { }

  ngOnInit(): void {
    this._getTrainings();
  }

  private _getTrainings() {
    this.trainingsService.getTrainings().subscribe((trainings) => {
      this.trainings = trainings;
    });
  }

  // updateTraining {

  // };
  // deleteTraining {

  // }


}
