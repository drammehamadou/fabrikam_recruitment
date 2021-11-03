import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Training } from '../../models/training';
import { TrainingsService } from '../../services/trainings.service';

@Component({
  selector: 'trainings-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.scss']
})
export class TrainingPageComponent implements OnInit, OnDestroy {
  training!: Training;
  endSubs$: Subject<any> = new Subject();
  quantity!: number;

  constructor(private trainingsService: TrainingsService, 
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.trainingid) {
        this._getTraining(params.trainingid);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  addTrainingToCart() {}

  //get the training from the backend
  private _getTraining(id: string) {
    this.trainingsService
      .getTraining(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resTraining) => {
        this.training = resTraining;
      });
  }
}
