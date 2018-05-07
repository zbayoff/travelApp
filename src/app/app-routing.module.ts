import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsComponent } from './components/trips/trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';

import { RouterModule, Routes, Router } from '@angular/router';

const routes: Routes = [
  {path: '', component: TripsComponent, pathMatch: 'full'},
  {path: 'trip/:id', component: TripDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
