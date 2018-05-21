import { Component, OnInit, Input } from '@angular/core';
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
  // totalCost: number;

  constructor(private tripService: TripService) {
    this.add = true;

  }

  // async addTrip(form: NgForm) {
  //   // console.log(form.value);

  //   const response = await this.tripService.addTrip(formData);
  //   const responseGet = await this.tripService.getTrips();
  //   this.trips = responseGet.json();
  // }

  addCosts() {
    for (const trip of this.trips) {
      let totalCost = 0;
      for (const cost of trip.costs) {
        totalCost += cost.costAmt;
      }
      trip.totalCost = totalCost;
    }
  }

  getTrips() {
    this.tripService.getTrips().subscribe(
      data => {
        this.trips = data.json();
        this.addCosts();
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.getTrips();
  }

  // async ngOnInit() {
  //   const response = await this.tripService.getTrips();
  //   this.trips = response.json();
  //   // console.log(this.trips);

  // }

  deleteTrip(trip: Trip) {
    this.tripService.deleteTrip(trip._id).subscribe(
      res => {
        this.trips.splice(this.trips.indexOf(trip), 1);
      },
      err => console.log(err)
    );

    // const response =  this.tripService.deleteTrip(tripID);
    // const responseGet =  this.tripService.getTrips();
    // this.trips = responseGet.json();
  }

}
