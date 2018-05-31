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
  orderField: string;
  orderDir: any;
  searchText: string;

  constructor(private tripService: TripService) {
    this.add = true;
    this.orderField = 'totalCost';
    this.orderDir = '1';
  }

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

  deleteTrip(trip: Trip) {
    this.tripService.deleteTrip(trip._id).subscribe(
      res => {
        this.trips.splice(this.trips.indexOf(trip), 1);
      },
      err => console.log(err)
    );

  }
}
