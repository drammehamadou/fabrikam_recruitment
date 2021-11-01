import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsSearchComponent } from './components/trainings-search/trainings-search.component';
import { CoursesBannerComponent } from './components/courses-banner/courses-banner.component';
import { FeaturedTrainingsComponent } from './components/featured-trainings/featured-trainings.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent
  ],
  exports: [TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent]
})
export class TrainingsModule {}
