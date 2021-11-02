import { Component, OnInit, Input } from '@angular/core';
import { Training } from '../../models/training';

@Component({
  selector: 'trainings-items',
  templateUrl: './trainings-items.component.html',
  styleUrls: ['./trainings-items.component.scss']
})
export class TrainingsItemsComponent implements OnInit {
  @Input() training!: Training;


  constructor() { }

  ngOnInit(): void {
  }

}
