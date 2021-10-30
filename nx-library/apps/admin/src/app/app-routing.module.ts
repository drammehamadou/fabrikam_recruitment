import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@nx-library/attendees';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AttendeesFormComponent } from './pages/attendees/attendees-form/attendees-form.component';
import { AttendeesListComponent } from './pages/attendees/attendees-list/attendees-list.component';
import { BookingsDetailsComponent } from './pages/bookings/bookings-details/bookings-details.component';
import { BookingsListComponent } from './pages/bookings/bookings-list/bookings-list.component';
import { CoursesFormComponent } from './pages/courses/courses-form/courses-form.component';
import { CoursesListComponent } from './pages/courses/courses-list/courses-list.component';
import { RecommendationComponent } from './pages/recommendation/recommendation.component';
import { TrainingsFormComponent } from './pages/trainings/trainings-form/trainings-form.component';
import { TrainingsListComponent } from './pages/trainings/trainings-list/trainings-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
    { path: '', component: ShellComponent, canActivate: [AuthGuard],
          children: [
            { path: '', component: AdminDashboardComponent },
            { path: 'courses', component: CoursesListComponent },
            { path: 'courses/form', component: CoursesFormComponent },
            { path: 'courses/form/:id', component: CoursesFormComponent },
            { path: 'trainings', component: TrainingsListComponent },
            { path: 'trainings/form', component: TrainingsFormComponent },
            { path: 'trainings/form/:id', component: TrainingsFormComponent },
            { path: 'attendees', component: AttendeesListComponent },
            { path: 'attendees/form', component: AttendeesFormComponent },
            { path: 'attendees/form/:id', component: AttendeesFormComponent },
            { path: 'bookings', component: BookingsListComponent },
            { path: 'bookings/:id', component: BookingsDetailsComponent },
            { path: 'recommendation', component: RecommendationComponent },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
    ]}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
