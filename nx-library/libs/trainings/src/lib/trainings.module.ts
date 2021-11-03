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

const routes: Routes = [
{ path: 'trainings', component: TrainingsListComponent},
{ path: 'course/:courseid', component: TrainingsListComponent}

]

@NgModule({
  imports: [CommonModule, 
    RouterModule.forChild(routes), 
    ButtonModule,
    AccordionModule,
    CheckboxModule,
  FormsModule],
  declarations: [
    TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent,
    TrainingsItemsComponent,
    TrainingsListComponent
  ],
  exports: [TrainingsSearchComponent,
    CoursesBannerComponent,
    FeaturedTrainingsComponent,
    TrainingsItemsComponent,
    TrainingsListComponent]
})
export class TrainingsModule {}
