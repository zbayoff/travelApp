import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Trip } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trip: Trip;
  trips: Trip[];
  add: boolean;

  constructor(private tripService: TripService) {
    this.add = true;
  }

  // async addTrip(form: NgForm) {
  //   // console.log(form.value);

  //   const response = await this.tripService.addTrip(formData);
  //   const responseGet = await this.tripService.getTrips();
  //   this.trips = responseGet.json();
  // }

  async ngOnInit() {
    const response = await this.tripService.getTrips();
    this.trips = response.json();
    console.log(this.trips);

  }

  // async deleteTrip(tripID) {
  //   const response = await this.tripService.deleteTrip(tripID);
  //   const responseGet = await this.tripService.getTrips();
  //   this.trips = responseGet.json();
  // }

}
