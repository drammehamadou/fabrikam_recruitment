import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.scss']
})
export class TrainingsListComponent implements OnInit {
trainings = [];
  constructor() { }

  ngOnInit(): void {
  }

  // updateTraining {

  // };
  // deleteTraining {

  // }


}
