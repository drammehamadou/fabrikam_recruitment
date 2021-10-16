import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { TrainingListComponent } from './components/training-list/training-list.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'trainings', component: TrainingListComponent}
]

@NgModule({
  declarations: [AppComponent, LandingComponent, TrainingListComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
