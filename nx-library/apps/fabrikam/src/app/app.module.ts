import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@nx-library/ui';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { TrainingsModule } from '@nx-library/trainings';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: LandingComponent }
]

@NgModule({
  declarations: [AppComponent, 
    LandingComponent, 
     HeaderComponent, 
     FooterComponent, 
     NavComponent],
  imports: [BrowserModule, 
            RouterModule.forRoot(routes),
            HttpClientModule,
            UiModule,
            ButtonModule,
            AccordionModule,
            BrowserAnimationsModule,
            TrainingsModule
            
          ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
