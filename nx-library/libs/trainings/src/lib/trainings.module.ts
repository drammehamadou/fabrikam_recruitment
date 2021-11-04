import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsSearchComponent } from './components/trainings-search/trainings-search.component';
import { CoursesBannerComponent } from './components/courses-banner/courses-banner.component';
import { FeaturedTrainingsComponent } from './components/featured-trainings/featured-trainings.component';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsItemsComponent } from './components/trainings-items/trainings-items.component'
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import { TrainingsListComponent } from './pages/trainings-list/trainings-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TrainingPageComponent } from './pages/training-page/training-page.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {RatingModule} from 'primeng/rating';
import {GalleriaModule} from 'primeng/galleria';
import { UiModule } from '@nx-library/ui';

const routes: Routes = [
{ path: 'trainings', component: TrainingsListComponent},
{ path: 'course/:courseid', component: TrainingsListComponent},
{ path: 'trainings/:trainingid', component: TrainingPageComponent}

]

@NgModule({
  imports: [CommonModule, 
    RouterModule.forChild(routes), 
    ButtonModule,
    AccordionModule,
    CheckboxModule,
    FormsModule,
    InputNumberModule,
    RatingModule,
    GalleriaModule,
    UiModule
  ],
  declarations: [
    TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent,
    TrainingsItemsComponent,
    TrainingsListComponent,
    TrainingPageComponent
  ],
  exports: [TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent,
    TrainingsItemsComponent,
    TrainingsListComponent,
    TrainingPageComponent]
})
export class TrainingsModule {}
