import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TripsComponent } from './components/trips/trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripAddFormComponent } from './components/trip-add-form/trip-add-form.component';
import { TripEditFormComponent } from './components/trip-edit-form/trip-edit-form.component';

import { AppRoutingModule } from './/app-routing.module';
import { TripService } from './service/trip.service';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';



@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripDetailComponent,
    TripAddFormComponent,
    TripEditFormComponent,
    FilterPipe,
    OrderByPipe,
    PhotoGalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
