import { Component, OnInit } from '@angular/core';

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
  totalCost: any;

  // getTrips(): void {
  //   console.log(this);
  //   this.tripService.getTrips()
  //     .subscribe(trips => this.trips = trips);
  // }

  constructor(private tripService: TripService) {
  }

  async ngOnInit() {
    const response = await this.tripService.getTrips();
    this.trips = response.json();

    console.log(this.trips);

    // this.totalCost = Object.values(this.trips.travelCosts[0]).reduce((accumulator: number, currentValue: number) => {
    //   return accumulator + currentValue;
    // });
  }

  async deleteTrip(tripID) {
    const response = await this.tripService.deleteTrip(tripID);
    const responseGet = await this.tripService.getTrips();
    this.trips = responseGet.json();
  }



}
