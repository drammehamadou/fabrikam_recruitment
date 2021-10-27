import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
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

import { CoursesService } from '@nx-library/trainings';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AttendeesFormComponent } from './pages/attendees/attendees-form/attendees-form.component';
import { AttendeesListComponent } from './pages/attendees/attendees-list/attendees-list.component';
import { BookingsFormComponent } from './pages/bookings/bookings-form/bookings-form.component';
import { BookingsListComponent } from './pages/bookings/bookings-list/bookings-list.component';

const routes: Routes = [
  { path: '', component: ShellComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
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
          { path: 'bookings/form', component: BookingsFormComponent },
          { path: 'bookings/form/:id', component: BookingsFormComponent }
  ]}
]

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    ShellComponent, 
    SidebarComponent, 
    CoursesListComponent, 
    CoursesFormComponent, 
    TrainingsListComponent, 
    TrainingsFormComponent, AttendeesFormComponent, AttendeesListComponent, BookingsFormComponent, BookingsListComponent],
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
    RouterModule.forRoot(routes, 
      { initialNavigation: 'enabled' }),
  ],
  providers: [CoursesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
