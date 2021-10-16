import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { TrainingListComponent } from './components/training-list/training-list.component';

@NgModule({
  declarations: [AppComponent, LandingComponent, TrainingListComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
