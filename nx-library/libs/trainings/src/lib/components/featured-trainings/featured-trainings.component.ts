import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Training } from '../../models/training';
import { TrainingsService } from '../../services/trainings.service';

@Component({
  selector: 'trainings-featured-trainings',
  templateUrl: './featured-trainings.component.html',
  styleUrls: ['./featured-trainings.component.scss']
})
export class FeaturedTrainingsComponent implements OnInit, OnDestroy {
  featuredTrainings: Training[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private trainingsService: TrainingsService) {}

  ngOnInit(): void {
    this._getFeaturedTrainings();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getFeaturedTrainings() {
    this.trainingsService
      .getFeaturedTrainings(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((trainings) => {
        this.featuredTrainings = trainings;
      });
  }

}
