import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Trip } from '../models/trip';
import { TRIPS } from '../models/mock-trips';



@Injectable({ providedIn: 'root' })
export class TripService {

  getTrips(): Observable<Trip[]> {
    return of(TRIPS);
  }

  constructor() { }

}
