import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';

const routes: Routes = [
  { path: '', component: ShellComponent,
        children: [
          {
            path: 'dashboard', component: DashboardComponent
          },
          {
            path: 'courses', component: CoursesListComponent
          }
]}
]

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    ShellComponent, 
    SidebarComponent, CoursesListComponent],
  imports: [
    BrowserModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    RouterModule.forRoot(routes, 
      { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
