import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable, of } from 'rxjs';

import { map, filter, switchMap, catchError } from 'rxjs/operators';

import { Trip } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripService {

  getTrips() {
    // return this.http.get('http://localhost:3006/api/trip');
    return this.http.get('api/trip');
  }

  getTrip(id) {
    // return this.http.get('http://localhost:3006/api/trip/' + id);
    return this.http.get('api/trip/' + id);
  }

  addTrip(trip) {
    // return this.http.post('http://localhost:3006/api/trip/', trip);
    return this.http.post('api/trip/', trip);
  }

  putTrip(trip) {
    // return this.http.put('http://localhost:3006/api/trip/' + trip._id, trip);
    return this.http.put('api/trip/' + trip._id, trip);
  }

  deleteTrip(tripID) {
    // return this.http.delete('http://localhost:3006/api/trip/' + tripID);
    return this.http.delete('api/trip/' + tripID);
  }

  constructor(private http: Http) { }

}
