import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CoursesFormComponent } from './courses/courses-form/courses-form.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';

import { CoursesService } from '@nx-library/trainings';


const routes: Routes = [
  { path: '', component: ShellComponent,
        children: [
          {
            path: 'dashboard', component: DashboardComponent
          },
          {
            path: 'courses', component: CoursesListComponent
          },
          {
            path: 'courses/form', component: CoursesFormComponent
          }
  ]}
]

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    ShellComponent, 
    SidebarComponent, CoursesListComponent, CoursesFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    RouterModule.forRoot(routes, 
      { initialNavigation: 'enabled' }),
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
