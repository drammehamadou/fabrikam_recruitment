import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsSearchComponent } from './components/trainings-search/trainings-search.component';
import { CoursesBannerComponent } from './components/courses-banner/courses-banner.component';
import { FeaturedTrainingsComponent } from './components/featured-trainings/featured-trainings.component';
import { RouterModule } from '@angular/router';
import { TrainingsItemsComponent } from './components/trainings-items/trainings-items.component'
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  imports: [CommonModule, 
    RouterModule, 
    ButtonModule,
    AccordionModule],
  declarations: [
    TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent,
    TrainingsItemsComponent
  ],
  exports: [TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent,
    TrainingsItemsComponent]
})
export class TrainingsModule {}
