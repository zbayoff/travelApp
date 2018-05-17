import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';

import { AppRoutingModule } from './/app-routing.module';
import { TripService } from './service/trip.service';
import { TripAddFormComponent } from './components/trip-add-form/trip-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripDetailComponent,
    TripAddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
