import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';

import { AppRoutingModule } from './/app-routing.module';
import { TripService } from './service/trip.service';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
