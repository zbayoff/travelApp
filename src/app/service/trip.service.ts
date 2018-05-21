import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';



import { Observable, of} from 'rxjs';


// import { toPromise } from 'rxjs/operator';

// import 'rxjs/add/operator/map';

// import { Observable } from 'rxjs/observable';
// import { toPromise } from 'rxjs/add/operator/toPromise';

// import 'rxjs/add/operator/toPromise';

import { map, filter, switchMap, catchError } from 'rxjs/operators';

import { Trip } from '../models/trip';
// import { TRIPS } from '../models/mock-trips';



@Injectable({ providedIn: 'root' })
export class TripService {

  // getTrips(): Observable<Trip[]> {
  //   return of(TRIPS);
  // }

  getTrips() {
    return this.http.get('http://localhost:3006/api/trip');
  }

  // getTrip(id: number): Observable<Trip> {
  //   return of (TRIPS.find(trip => trip.id === id));
  // }

  getTrip(id) {
    return this.http.get('http://localhost:3006/api/trip/' + id);
  }

  addTrip(trip) {
    return this.http.post('http://localhost:3006/api/trip/', trip);
  }

  putTrip(trip) {
    return this.http.put('http://localhost:3006/api/trip/' + trip._id, trip).toPromise();
  }

  deleteTrip(tripID) {
    return this.http.delete('http://localhost:3006/api/trip/' + tripID);
  }

  constructor(private http: Http) { }

}
