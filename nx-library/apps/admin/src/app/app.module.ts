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

import { CoursesService } from '@nx-library/trainings';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TrainingsListComponent } from './pages/trainings/trainings-list/trainings-list.component';
import { TrainingsFormComponent } from './pages/trainings/trainings-form/trainings-form.component';


const routes: Routes = [
  { path: '', component: ShellComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'courses', component: CoursesListComponent },
          { path: 'courses/form', component: CoursesFormComponent },
          { path: 'courses/form/:id', component: CoursesFormComponent },
          { path: 'trainings', component: TrainingsListComponent },
          { path: 'trainings/form', component: TrainingsFormComponent },
          { path: 'trainings/form/:id', component: TrainingsFormComponent }
  ]}
]

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    ShellComponent, 
    SidebarComponent, CoursesListComponent, CoursesFormComponent, TrainingsListComponent, TrainingsFormComponent],
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
    RouterModule.forRoot(routes, 
      { initialNavigation: 'enabled' }),
  ],
  providers: [CoursesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
