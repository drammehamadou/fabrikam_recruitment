import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CoursesListComponent } from './pages/courses/courses-list/courses-list.component';
import { CoursesFormComponent } from './pages/courses/courses-form/courses-form.component';
import { TrainingsListComponent } from './pages/trainings/trainings-list/trainings-list.component';
import { TrainingsFormComponent } from './pages/trainings/trainings-form/trainings-form.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {EditorModule} from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import {AccordionModule} from 'primeng/accordion';

import { CoursesService } from '@nx-library/trainings';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AttendeesFormComponent } from './pages/attendees/attendees-form/attendees-form.component';
import { AttendeesListComponent } from './pages/attendees/attendees-list/attendees-list.component';
import { BookingsListComponent } from './pages/bookings/bookings-list/bookings-list.component';
import { BookingsDetailsComponent } from './pages/bookings/bookings-details/bookings-details.component';
import { AttendeesModule, AuthGuard, JwtInterceptor } from '@nx-library/attendees';
import { RecommendationComponent } from './pages/recommendation/recommendation.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: ShellComponent, canActivate: [AuthGuard],
        children: [
          { path: 'admin-dashboard', component: AdminDashboardComponent },
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
          { path: 'recommendation', component: RecommendationComponent }
  ]}
]

@NgModule({
  declarations: [
    AppComponent, 
    ShellComponent, 
    SidebarComponent, 
    CoursesListComponent, 
    CoursesFormComponent, 
    TrainingsListComponent, 
    TrainingsFormComponent, 
    AttendeesFormComponent, 
    AttendeesListComponent,  
    BookingsListComponent, 
    BookingsDetailsComponent, RecommendationComponent, AdminDashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    InputSwitchModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule,
    AccordionModule,
    AttendeesModule,
    RouterModule.forRoot(routes, 
      { initialNavigation: 'enabled' }),
  ],
  providers: [CoursesService, MessageService, ConfirmationService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
],
  bootstrap: [AppComponent],
})
export class AppModule {}
